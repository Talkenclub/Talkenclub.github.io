<template>
  <Transition name="down">
    <div class="xtx-message" :style="style[type]" v-show="visible">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{text}}</span>
    </div>
  </Transition>

</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
export default {
  name: 'XtxMessage',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'toast'
    }
  },
  setup () {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const visible = ref(false);
    const style = {
      toast: {
        icon: 'icon-warning',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,.7)',
        borderColor: 'rgba(0,0,0,.7)',
        width: 'auto',
        marginLeft: '0',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
        border: 'none',
      },
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    onMounted(()=>{
      visible.value = true
    })
    return { style, visible }
  }
}
</script>
<style scoped>
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 999999;
  left: 50%;
  margin-left: -150px;
  top: 50px;
  line-height: 45px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  
  
}
.xtx-message i {
    margin-right: 4px;
    vertical-align: middle;
  }
.xtx-message .text {
    vertical-align: middle;
  }
.down-enter-from {
  transform: translate3d(0,-75px,0);
  opacity: 0;
}
.down-enter-active {transition: all 0.5s;}
.down-enter-to { transform: none; opacity: 1;}
</style>