// ================================页面性能上报=====================
/**
 * DNS查询耗时 ：domainLookupEnd - domainLookupStart    dnsTime
 * TCP链接耗时 ：connectEnd - connectStart
 * request请求耗时 ：responseEnd - responseStart
//  * 解析dom树耗时 ： domComplete - domInteractive
 * 白屏时间 ：responseStart - navigationStart
 * domready时间(用户可操作时间节点) ：domContentLoadedEventEnd - navigationStart
 * onload时间(总下载时间) ：loadEventEnd - navigationStart
 */


import { sensorsInit } from './sensorsData.js'
(async () => {
  if (window.PGsensors) {
    return
  }
  await sensorsInit()
})()
console.log('页面性能上报');

window.addEventListener(
  'load',
  function () {
    // 检测performace api
    if (
      this.window.PGsensors &&
      !window.performance &&
      window.performance.timing &&
      window.performance.getEntries
    ) {
      return
    }
    const fetchStart = performance.timing.fetchStart
    const navigationStart = performance.timing.navigationStart || fetchStart
    const domainLookupEnd = performance.timing.domainLookupEnd
    const domainLookupStart = performance.timing.domainLookupStart || fetchStart
    const connectEnd = performance.timing.connectEnd
    const connectStart = performance.timing.connectStart
    const responseEnd = performance.timing.responseEnd
    const responseStart = performance.timing.responseStart
    const domContentLoadedEventEnd = performance.timing.domContentLoadedEventEnd
    // var loadEventEnd = performance.timing.loadEventEnd;
    // kewlweb_performace:187 language:string dnstime:int64 onloadtime:int64 domreadytime:int64 tcptime:int64
    // requesttime:int64 whitescreentime:int64 entrieslist:string

    const timer = setInterval(function () {
      try {
        if (performance.timing.loadEventEnd !== 0) {
          const timing = performance.timing
          clearInterval(timer)
          // entrieslistJsonStr 的字符长度可能很长 目前仅抽取一个接口，一个脚本资源加载性能上报
          // console.info(performance.getEntries())
          const entries = performance.getEntries()
          const PerformanceResourceTiming = []
          const perfEntries = []
          const perfFiledsEntries = []
          let scriptEntries = null
          // requestEntries = null
          for (let i = 0, len = entries.length; i < len; i++) {
            if (entries[i].entryType === 'resource') {
              PerformanceResourceTiming.push(entries[i])
            }
          }
          for (let j = 0; j < PerformanceResourceTiming.length; j++) {
            // 抽取一个liveme.com js脚本
            if (
              !scriptEntries &&
              PerformanceResourceTiming[j].initiatorType === 'script' &&
              PerformanceResourceTiming[j].name.indexOf('liveme.com') > -1
            ) {
              scriptEntries = PerformanceResourceTiming[j]
            }
          }
          perfEntries.push(scriptEntries)
          // perfEntries.push(requestEntries)
          let temp = {}
          for (let m = 0; m < perfEntries.length; m++) {
            if (perfEntries[m] && JSON.stringify(perfEntries[m]) !== '{}') {
              temp = {
                fetchStart: perfEntries[m].fetchStart,
                name: perfEntries[m].name,
                responseEnd: perfEntries[m].responseEnd
              }
            } else {
              continue
            }
            perfFiledsEntries.push(temp)
          }
          const entrieslistJsonStr =
            perfFiledsEntries.length > 0
              ? JSON.stringify(perfFiledsEntries)
              : '';
          const utils = {
            getFcpTime: function getFcpTime () {
              /** 获取FCP时间 */
              const firstPaint = performance.getEntriesByName('first-contentful-paint') || [];

              if (firstPaint.length > 0) {
                return parseInt(firstPaint[0].startTime);
              }

              return 0;
            }
          };
          const domreadytime = domContentLoadedEventEnd > navigationStart ? domContentLoadedEventEnd - navigationStart : 0;
          const perfFiled = {
            language: navigator.language || '',
            dnstime: domainLookupEnd - domainLookupStart || 0,
            onloadtime: timing.loadEventEnd - navigationStart || 0,
            domreadytime: domContentLoadedEventEnd > navigationStart ? domContentLoadedEventEnd - navigationStart : 0,
            tcptime: connectEnd - connectStart || 0,
            requesttime: responseEnd - responseStart || 0,
            whitescreentime: responseStart - navigationStart || 0,
            entrieslist: entrieslistJsonStr || '',
            firstScreenOnloadTime: domreadytime,
            fcp: utils.getFcpTime() // 获取FCP时间
          }
          console.info(perfFiled)
          window.PGsensors.track('pcweb_performance', perfFiled);
        }
      } catch (error) {
        clearInterval(timer)
      }
    }, 5000)
  },
  false
)
