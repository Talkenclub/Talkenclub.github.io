/**
 * @desc pg report   用于上报错误  收集window.onerror
 */
// ================================onerror=====================
/* eslint-disable */
import { sensorsInit } from './sensorsData.js'
(async () => {
  if (window.PGsensors) {
    return
  }
  await sensorsInit()
})()
console.log('onerror上报')


// 获取url上的参数
function getQueryData (queryString) {
  queryString = queryString.replace(/^\?+/, "").replace(/&amp;/, "&");
  const querys = queryString.split("&");
  let i = querys.length;
  const _URLParms = {};
  while (i--) {
    const item = querys[i].split("=");
    if (item[0]) {
      let value = item[1] || "";
      try {
        value = decodeURIComponent(value);
      } catch (e) {
        value = unescape(value);
      }
      _URLParms[decodeURIComponent(item[0])] = value;
    }
  }
  return _URLParms;
}
const queryData = getQueryData(window.location.search);

const _log_list = []
const _config = {
  pageId: 1,
  random: 1,
  onReport: null, // 自定义上报的回调函数
  submit: function (obj) {
    console.info(obj)
    // 神策上报
    // console.info(obj + '=============');
    window.PGsensors.track('pcweb_onerror', {
      starttime: Date.now(),
      errormsg: obj.errorMsg,
      target: obj.target || obj.from,
      errortype: obj.errorType || 0,
      pageid: this.pageId,
      webresponsetimes: obj.webResponseTimes || 1
    });
  }
}
const T = {
  isOBJByType: function (o, type) {
    return (
      Object.prototype.toString.call(o) ===
      '[object ' + (type || 'Object') + ']'
    )
  },
  isOBJ: function (obj) {
    const type = typeof obj
    return type === 'object' && !!obj
  },
  isEmpty: function (obj) {
    if (obj === null) { return true }
    if (T.isOBJByType(obj, 'Number')) {
      return false
    }
    return !obj
  },
  extend: function (src, source) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        src[key] = source[key]
      }
    }
    return src
  },
  // 格式化错误信息
  processError: function (errObj) {
    try {
      if (errObj.stack) {
        let url = errObj.stack.match('https?://[^\n]+')
        url = url ? url[0] : ''
        let rowCols = url.match(':(\\d+):(\\d+)')
        if (!rowCols) {
          rowCols = [0, 0, 0]
        }
        const stack = T.processStackMsg(errObj)
        return {
          errormsg: stack,
          rowNum: rowCols[1],
          colNum: rowCols[2],
          target: url.replace(rowCols[0], ''),
          _orgMsg: errObj.toString()
        }
      } else {
        // ie 独有 error 对象信息，try-catch 捕获到错误信息传过来，造成没有msg
        if (errObj.name && errObj.message && errObj.description) {
          return {
            errormsg: JSON.stringify(errObj)
          }
        }
        return errObj
      }
    } catch (err) {
      return errObj
    }
  },
  // 进行格式转换
  processStackMsg: function (error) {
    let stack = error.stack
      .replace(/\n/gi, '')
      .split(/\bat\b/)
      .slice(0, 9)
      .join('@')
      .replace(/\?[^:]+/gi, '')
    const msg = error.toString()
    if (stack.indexOf(msg) < 0) {
      stack = msg + '@' + stack
    }
    return stack
  }
}
// 解决上报跨域详情
// 对removeaddEvent有影响，先注释，有新方法再打开
// try {
//   if (window.EventTarget && typeof(window.EventTarget) !== undefined) {
//     const originAddEventListener = EventTarget.prototype.addEventListener;
//     EventTarget.prototype.addEventListener = function (type, listener, options) {
//       const wrappedListener = function (...args) {
//         try {
//           return listener.apply(this, args);
//         }
//         catch (err) {
//           throw err;
//         }
//       }
//       return originAddEventListener.call(this, type, wrappedListener, options);
//     }
//   }
// }
// catch (err) {
//   throw err;
// }
// 保存原有的全局onerror事件
const orgError = window.onerror
// 重写onerror事件
window.onerror = function (msg, url, line, col, error) {
  // 排除fbclib url
  if (url.indexOf('fbclid') > -1) {
    return false;
  }

  let newMsg = msg
  if (error && error.stack) {
    newMsg = T.processStackMsg(error)
  }
  if (T.isOBJByType(newMsg, 'Event')) {
    newMsg += newMsg.type
      ? '--' +
      newMsg.type +
      '--' +
      (newMsg.target ? newMsg.target.tagName + '::' + newMsg.target.src : '')
      : ''
  }
  // 将错误信息对象推入错误队列中，执行_process_log方法进行上报
  report.push({
    errorMsg: newMsg,
    target: url,
    rowNum: line,
    colNum: col,
    _orgMsg: msg
  })
  _process_log()
  // 调用原有的全局onerror事件
  orgError && orgError.apply(window, arguments)
}
// 预缓存忽略上报
try {
  const hostHref = window.location.href;
  const isReport = (hostHref.indexOf('/app/') > 0 || hostHref.indexOf('/activity') > 0) && (JSON.stringify(queryData) === '{}' || queryData.cache)
  if (!isReport) {
    // 监听静态资源请求是否成功
    window.addEventListener('error', (error) => {
      // 排除fbclid url
      if (window.location.href.indexOf('fbclid') > -1) {
        return false;
      };
      const errType = error.type;
      const target = error.target;
      const typeName = target.localName;
      const errMessage = error.message || '';
      let errSrc = '';
      if (typeName === 'img' || typeName === 'script') {
        errSrc = target.src;
      } else if (typeName === 'link') {
        errSrc = target.href;
      }
      const srcRegex = /analytics.js|fbevents.js|.html|tags.js|esx.esxscloud.com|www.googletagmanager.com/g;
      const isRegex = errSrc.match(srcRegex);
      if (!errSrc || isRegex) {
        return false;
      }
      // 上报错误信息
      report.push({
        errorMsg: `${errType}-${typeName}: ${errSrc} - ${errMessage.toString()}`
      })
      _process_log()
    }, true)

    // 监听promise catch错误
    // window.addEventListener("unhandledrejection", function(e) {
    //   e.preventDefault()
    //   let reason = e.reason;
    //   try {
    //     reason = JSON.stringify(reason);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   const errMsg = `${e.type}:${reason}`;
    //   // if(JSON.stringify(queryData) === '{}' || queryData.cache) {
    //   //   return
    //   // }
    //   if (e.type === 'unhandledrejection') {
    //     // 上报错误信息
    //     report.push({
    //       errorMsg: errMsg
    //     })
    //     _process_log()
    //   }
    //   return true;
    // });
  }
} catch (error) {
  console.log(error);
}
let submit_log_list = []
let comboTimeout = 0
function _submit_log () {
  // 清除之前的延迟上报计时器
  clearTimeout(comboTimeout)
  // https://github.com/BetterJS/badjs-report/issues/34
  comboTimeout = 0
  if (!submit_log_list.length) {
    return
  }
  // 若用户自定义了上报方法，则使用自定义方法
  if (_config.submit) {
    _config.submit(submit_log_list[0]) // 默认情况下只有一条错误信息
  } else {
    // 否则使用img标签上报
    const _img = new Image()
    _img.src = url
  }
  submit_log_list = []
}
function _process_log (isReportNow) {
  // 取随机数，来决定是否忽略该次上报
  const randomIgnore = Math.random() >= _config.random
  console.info(_log_list)
  if (_log_list.length) {
    const isIgnore = false
    // 循环遍历
    const report_log = _log_list.shift()
    // 有效保证字符不要过长
    report_log.errormsg = (report_log.errormsg + '' || '').substr(0, 500)
    submit_log_list.push(report_log)
    // 执行上报回调函数
    _config.onReport && _config.onReport(_config.id, report_log)
  } else {
    return
  }
  _submit_log() // 立即上报
}
const report = {
  push: function (msg) {
    // 将错误推到缓存池
    const data = T.isOBJ(msg)
      ? T.processError(msg)
      : {
        errorMsg: msg
      }
    // ext 有默认值, 且上报不包含 ext, 使用默认 ext
    if (_config.ext && !data.ext) {
      data.ext = _config.ext
    }
    // 在错误发生时获取页面链接
    // https://github.com/BetterJS/badjs-report/issues/19
    if (!data.from) {
      data.from = location.href
    }
    _log_list.push(data)
    _process_log()
    return report
  },
  // 主动进行上报
  report: function (msg, isReportNow) {
    msg && report.push(msg)
    isReportNow && _process_log(true)
    return report
  },
  init: function (config) {
    // 初始化
    // 用配置参数的值覆盖_config的默认值
    if (T.isOBJ(config)) {
      for (const key in config) {
        if (config.hasOwnProperty(key)) {
          _config[key] = config[key]
        }
      }
    }
    // 没有设置id将不上报
    const id = parseInt(_config.pageId, 10)
    if (!id) {
      return false
    }
    // if had error in cache , report now
    if (_log_list.length) {
      _process_log()
    }
    return report
  },
  __onerror__: window.onerror
}

window.PGError = report;