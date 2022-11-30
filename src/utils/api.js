import axios from "./axios";

//请求示例
//get
// export const mokeGet = (data) => {
//   return axios({
//       url: "/api/xxxx",
//       method: "get",
//       data,
//       config: {
//           headers: {
//               'Request-Type': 'wechat'
//           },
//           timeout: 10000
//       }
//   })
// }
//post
export const sendEmail = (data) => {
  return axios({
      url: "/api/audio-room/v1/voicehome/subscribeemail",
      method: "post",
      data,
      config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }
  })
}