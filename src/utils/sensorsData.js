import sensors from 'sa-sdk-javascript'

/* eslint-disable */
// window.sensors = sensors
const uid = localStorage.getItem('uid')
// const deviceId = localStorage.getItem('deviceId')
const sensorsInit = async () => {
	// console.log(process.env.AXIOS_ENV,'----------process.env.AXIOS_ENV')
	const pgName = import.meta.env.MODE === 'development' ? 'PG_test' : 'PG'
	console.log(import.meta.env.MODE,'----------import.meta.env.MODE')
	sensors.init({
		server_url: 'https://livemesensor.liveme.com/sa?project=' + pgName,
		is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
		use_client_time: true,
		send_type: 'beacon',
		show_log: true,
		get_vtrack_config: false,
		heatmap: {
			// 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
			clickmap: 'default',
			// 是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
			scroll_notice_map: 'default'
		}
	})
	sensors.quick('autoTrack') // 用于采集 $pageview 事件。
	// 注册公共属性
	sensors.registerPage({
		uid: uid || '',
		product: 'web3',
		url: window.location.href,
	})
	// 获取预置属性
	sensors.quick('isReady', function () {
		sensors.getPresetProperties()
		// if (uid) {
		//   sensors.identify(uid, true)
		// }else if (deviceId) {
		//   sensors.identify(deviceId, true)
		// }
	});
	window.PGsensors = sensors
}

// 例子： Track('webimgSave', { save_result: 1, feature: 33, device_type: checkDeviceType() })
const track = function (eventName, params) {
	window.PGsensors.track(eventName, params)
}

export {
	sensorsInit,
	track
}