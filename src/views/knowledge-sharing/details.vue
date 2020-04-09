<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-20 10:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\knowledge-sharing\details.vue
 -->
<template>
        <div style="margin:100px 18% 20px 18%;" >
                <div >
                        <breadcrumd  ></breadcrumd>
                </div>
                <!--详情-->
                <detail :is-share="true" :detailType="detailType" v-show="loading" detailName="articleid" @emitIsLoading="getLoading" :getDetail="getKnlgeShareDetail" :detailId="detailId"></detail>
               
                <comment  v-if="isOpenComment" :detailId="detailId"></comment>
                <div v-if="!loading" style="min-height: 500px;position: relative;" >
                    <loading></loading>
                </div>
         </div>
    </template>
    
    <script>
import Breadcrumd from '@/components/breadcrumd.vue'
import { getKnlgeShareDetail } from "@/api/knowledge-sharing"
import {fileDownload} from '@/api/files'
import { download } from '@/utils/commonality'
import Long from "long"
import Loading from "@/components/loading"
import Detail from "@/components/detail"
import Comment from "@/components/comment"
    export default {
        data(){
            return{
                detailsData:null,
                detailType:0,
                loading:false,
                isOpenComment:false,
            }
        },
        computed:{
            //详情id
            detailId(){
                return this.$route.params.articleid
            }
        },
        methods:{
            getKnlgeShareDetail,
            //获取加载状态
            getLoading(val){
               this.loading = true
            },
        },
        mounted(){
           this.bus.$on("isOpenComment",msg => {
               this.isOpenComment = msg
           })
            let routes = [
                {
                  name:"知识共享",
                  path:'/knowledge-sharing'
                },
                {
                  name:"分享详情",
                  path:'/knowledge-sharing/details'
                  }
                ]
            this.$store.dispatch('breadcrumd/setBreadcrumd',routes)
        },
        components:{
            Breadcrumd,
            Loading,
            Detail,
            Comment
        }
    }
    </script>
    