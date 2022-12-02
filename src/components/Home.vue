<template>
  <header>
    <div class="content">
      <img class="logo" src="../assets/images/logo.png" alt="logo">
      <div class="whitepaper_btn">Whitepaper</div>
    </div>
  </header>
  <div class="banner">
    <div class="content">
      <img src="../assets/images/banner.png"
        srcset="
        ../assets/images/banner@2x.png 2x,
        ../assets/images/banner@2x.png 3x
          "
        alt="banner">
      <h1>Voice club for Web3</h1>
      <p>Explore, discover, discuss, earn here</p>
      <div class="btn_box">
        <div class="download" @click="down">
          <img src="../assets/images/download_icon.png" alt="">
          download
        </div>
        <div class="whitepaper">Whitepaper</div>
      </div>
    </div>
  </div>
  <div class="talken_to_evervone">
    <div class="content tk_bg">
      <h1>Talken to Evervone</h1>
      <p>lalken Is a voice community application ir me Won… Where oeoble cal elk about hot Web3 topics and make Web3 siriends al an ime. In the nor room. Vou can earn bonuses by discussing and interacting</p>
      <img
        class="hand"
        src="../assets/images/hand.png"
        srcset="
        ../assets/images/hand@2x.png 2x,
        ../assets/images/hand@2x.png 3x
          "
        alt="hand">
    </div>
  </div>
  <div class="fconomic_system">
    <div class="content">
      <img src="../assets/images/fconomic.png"
        srcset="
        ../assets/images/fconomic@2x.png 2x,
        ../assets/images/fconomic@2x.png 3x
          "
        alt="fconomic">
      <div class="right">
        <h1>Fconomic system</h1>
        <p>In taken. peoole can get free emotes and gift assets by talking and listening send emotes and gifts to speakers in the room. and earn tokens through this interaction. Tokens come from sponsors or taken teams. and nian rom nanr snoncornn</p>
      </div>
    </div>
  </div>
  <div class="function">
    <div class="content">
      <div :class="['item',(index+1)%2 === 0 ? 'marginTop' : '']" v-for="(item, index) in functionList" :key="item.title" >
        <img :src="item.img" :alt="item.title">
        <div class="text">
          <h1>{{item.title}}</h1>
          <p>{{item.desc}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="coming_soom">
    <div class="content">
      <div class="left">
        <img src="../assets/images/ognft.png"
        srcset="
        ../assets/images/ognft@2x.png 2x,
        ../assets/images/ognft@2x.png 3x
          "
        alt="ognft">
        <h3>Coming Soom ...</h3>
      </div>
      <img src="../assets/images/coming_soom.png"
        srcset="
        ../assets/images/coming_soom@2x.png 2x,
        ../assets/images/coming_soom@2x.png 3x
          "
        alt="coming_soom">
    </div>
  </div>
  <div class="footer">
    <div class="content">
      <h1>Email subscription Get more information</h1>
      <div class="send_box">
        <input type="text" v-model="sEmail" placeholder="Please enter your email address">
        <div class="send" @click="send">Subscribe</div>
      </div>
      <p class="copyright">Copyright © 2022</p>
    </div>
  </div>
  <div class="footer_share">
    <img src="../assets/images/share_tt.png"
        srcset="
        ../assets/images/share_tt@2x.png 2x,
        ../assets/images/share_tt@2x.png 3x
          "
        alt="share_tt">
    <img src="../assets/images/share_m.png"
        srcset="
        ../assets/images/share_m@2x.png 2x,
        ../assets/images/share_m@2x.png 3x
          "
        alt="share_m">
    <img src="../assets/images/share_t.png"
        srcset="
        ../assets/images/share_t@2x.png 2x,
        ../assets/images/share_t@2x.png 3x
          "
        alt="share_t">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import icon1 from '../assets/images/icon1.png'
import icon2 from '../assets/images/icon2.png'
import icon3 from '../assets/images/icon3.png'
import icon4 from '../assets/images/icon4.png'
import axios from 'axios'
// @ts-ignore
import { sendEmail } from '../utils/api'

const emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

let sEmail = ''

// defineProps<{ msg: string }>()

onMounted(() => {
  // @ts-ignore
  // window.$toast({text:'test'})
  // console.log(import.meta.env.VITE_APP_URL)
})

function down () {
  // @ts-ignore
  window.$toast({text:'coming soon ...'})
}

function send (){
  // @ts-ignore
  if(!emailReg.test(sEmail)){
    // @ts-ignore
    window.$toast({text:'Please enter the correct email address'})
    return
  }
  axios.post('https://api.talken.club/audio-room/v1/voicehome/subscribeemail',{
    email:sEmail
  },{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  }).then(res=>{
    // @ts-ignore
    window.$toast({text:'Subscribe success'})
  }).catch(err=>{
    // @ts-ignore
    window.$toast({text:'Subscribe failed'})
  })
  
  // sendEmail({email:sEmail}).then((res: any) => {
  //   if(res.status == 200){
  //     // @ts-ignore
  //     window.$toast({text:'Subscribe successfully'})
  //   }
  //   console.log(res)
  // })
}

const count = ref(0)
const functionList = [
  {
    title:'Web3 native',
    desc:'Talken is vertical to the Web3 field, serving the Web3 community and users with a more native experience, where you can discuss Web3 hot topics and use your NFT in the community.',
    img: icon1
  },
  {
    title:'Chat with watch',
    desc:'In Talken, people can chat and follow interesting information. For example, people can chat and watch the market in the room, follow the trend of cryptocurrency, and share and follow more information.',
    img: icon2
  },
  {
    title:'Gift mining',
    desc:"In Talken you don't need to spend money to buy gifts, just chat or listen in the room, you can continue to get free gifts, you can send gifts to get bonuses.",
    img: icon3
  },
  {
    title:'Interactive 2earn',
    desc:'Talken changed the traditional economic model, created an interactive economic system, earned bonuses through effective interaction in the room, and eliminated cheating and robots.',
    img: icon4
  },
]
</script>

<style scoped>
body{
  min-width: 1349px;
}
header{
  background: #111111;
}
header .content{
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content .logo{
  width:140px;
  height: 32px;
}

.banner{
  background: #111111;
  padding-bottom: 1px;
}
.banner .content{
  width: 1349px;
  text-align: center;
}
.banner .content img{
  width: 1349px;
  height: 362px;
}
.banner .content h1{
  font-size: 64px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 78px;
  margin-top: 63px;
}
.banner .content p{
  font-size: 20px;
  font-family: Gilroy-Medium, Gilroy;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  line-height: 24px;
  margin-top: 8px;
}
.btn_box{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  height: 56px;
  margin-bottom: 92px;
}
.btn_box .download, .whitepaper{
  width: 180px;
  height: 56px;
  background: #46F989;
  border-radius: 20px;
  font-size: 16px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #111111;
  line-height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn_box .download img{
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.btn_box .whitepaper{
  background: transparent;
  border: 1px solid rgba(70, 249, 137, 0.3);
  color: #46F989;
  margin-left: 16px;
}

.whitepaper_btn{
  width: 108px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #FFFFFF;
}
.talken_to_evervone{
  width: 100%;
  background: #FBFAF3;
  /* padding-top: 1px; */
}
.content{
  width: 1200px;
  margin: 0 auto;
}
.tk_bg{
  height: 700px;
  padding-top: 1px;
  background-image: url(../assets/images/talken_to_evervone.png);
  background-position: top right;
  background-size: 817px 700px;
  background-repeat: no-repeat;
}
.tk_bg .hand{
  width: 100px;
  margin-top: 104px;
}
.tk_bg h1{
  width: 293px;
  font-size: 64px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #111111;
  line-height: 70px;
  margin-top: 136px;
}
.tk_bg p{
  width: 428px;
  font-size: 16px;
  font-family: Gilroy-Medium, Gilroy;
  font-weight: 500;
  color: rgba(17, 17, 17, 0.6);
  line-height: 19px;
  margin-top: 24px;
}

.fconomic_system .content{
  display: flex;
  padding-top: 71px;
  padding-bottom: 63px;
  align-items: center;

}
.fconomic_system .content img{
  width: 500px;
  margin-right: 186px;
}
.fconomic_system .content h1{
  width: 286px;
  font-size: 64px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #111111;
  line-height: 70px;
}
.fconomic_system .content p{
  width: 428px;
  font-size: 16px;
  font-family: Gilroy-Medium, Gilroy;
  font-weight: 400;
  color: rgba(17, 17, 17, 0.6);
  line-height: 19px;
  margin-top: 24px;
}

.function {
  background: #111111;
  padding-top: 1px;
}
.function .content{
  padding: 100px 0;
  display: flex;
}
.function .content .item{
  width: 232px;
  height: 332px;
  padding: 24px;
  background: rgba(255,255,255,0.1);
  border-radius: 36px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-right: 27px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.function .content .item:last-child{
  margin-right: 0;
}
.function .marginTop{
  margin-top: 73px;
}
.function .content .item img{
  width: 56px;
  height: 56px;
}
.function .content .item h1{
  font-size: 36px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 43px;
}
.function .content .item p{
  font-size: 14px;
  font-family: Gilroy-Regular, Gilroy;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 18px;
  margin-top: 12px;
}
.coming_soom .content{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.coming_soom .content .left img{
  width: 299px;
}
.coming_soom .content .left h3{
  font-size: 36px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #111111;
  line-height: 43px;
  margin-top: 8px;
}

.footer{
  height: 450px;
  background: url(../assets/images/footer_bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 1px;
}
.footer .content h1{
  width: 642px;
  margin: 0 auto;
  margin-top: 78px;
  font-size: 64px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #111111;
  line-height: 70px;
  text-align: center;
}
.footer .content .send_box{
  display: flex;
  justify-content: center;
  margin-top: 47px;
}
.footer .content .send_box input{
  width: 273px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 24px;
  font-size: 18px;
  font-family: Gilroy-Regular, Gilroy;
  font-weight: 400;
  color: #111111;
  line-height: 21px;
  border: none;
  margin-right: 16px;
}
.footer .content .send_box input::placeholder{
  color: rgba(17, 17, 17, 0.3);
}
.footer .content .send_box .send{
  padding: 20px 30px;
  background: #111111;
  border-radius: 24px;
  font-size: 18px;
  font-family: Gilroy-Bold, Gilroy;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 22px;
}
.footer .content .copyright{
  font-size: 12px;
  font-family: Gilroy-Regular, Gilroy;
  font-weight: 400;
  color: rgba(17, 17, 17, 0.6);
  line-height: 14px;
  text-align: center;
  margin-top:70px;
}

.footer_share{
  width: 62px;
  position: fixed;
  right: 59px;
  top: 50%;
  transform: translateY(-50%);
}
.footer_share img{
  margin-bottom: 14px;
  cursor: pointer;
}
.footer_share img:last-child{
  margin-bottom: 0;
}

.send, .whitepaper, .download, .whitepaper_btn{
  cursor: pointer;
}

@media screen and (-webkit-min-device-pixel-ratio: 2),
screen and (min--moz-device-pixel-ratio: 2) {
  .tk_bg {
    background-image: url(../assets/images/talken_to_evervone@2x.png);
  }
  .footer{
    background: url(../assets/images/footer_bg@2x.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
