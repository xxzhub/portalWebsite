<!--
 * @Author: your name
 * @Date: 2020-03-02 22:37:23
 * @LastEditTime: 2020-03-18 09:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\components\title\index.vue
 -->
<template>
    <div class="modules-titles animated fadeInDown" >
            <span>{{title.nameLeft}}<span>{{title.nameRight}}</span></span>
            <div class="modules-division" ></div>
            <div>{{english}}</div>
            <div class="modules-even" v-if="ismany" >
                <router-link :to="{name:routeSkip}">
                        <span style="color:#8f9494;" >更多>></span>
                </router-link>
            </div>
            <el-input v-model="searchVlaue" v-if="isSearch" placeholder="请输入名称"  class="institution-search" >
                <el-button slot="append" icon="el-icon-search" style="color: #fff" @click="emitSearchValue"></el-button>
                <!-- <template slot="append">
                    <i class="el-icon-search" style="color: #fff" @click="emitSearchValue" ></i>
                </template> -->
            </el-input>
            <el-button type="primary" @click="getAllData" v-if="isSearch" class="institution-all" >全部<i class="el-icon-video-play"></i></el-button>
   </div>
</template>

<script>
export default {
    data(){
        return{
            searchVlaue:null,
        }
    },
props:{
    title:{
        type:Object,
        default:{
            nameLeft:'新闻',
            nameRight:'动态'
        }
    },
    english:{
        type:String,
        default:''
    },
    ismany:{
        type:Boolean,
        default:true
    },
    routeSkip:{
        type:String,
        default:''
    },
    getAllData:{
        type:Function
    },
    isSearch:{
        type:Boolean,
        default:true,
    }
  },
  methods: {
      emitSearchValue(){
          if(this.searchVlaue === null || this.searchVlaue === ""){
              this.$message.warning("请填写搜索内容")
          }else{
            this.$emit("emitSearch",this.searchVlaue)
          }
         
      }
  }

}
</script>

