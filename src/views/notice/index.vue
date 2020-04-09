<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-20 17:46:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\notice\index.vue
 -->
<template>
    <div >
        <notice-title :title="title"  english="Top Notices" :isSearch="false" routeSkip="notice-trends" ></notice-title>
        <notice-item v-if="isNotice" :noticeData="noticeData"></notice-item>
        <div v-else style="min-height: 250px;position: relative;">
            <loading></loading>
        </div>
        <div v-if="!isNoData&&isNotice" style="min-height: 250px;position: relative;">
            <no-data></no-data>
       </div>
    </div>
</template>

<script>
import { NoticeItem } from '../notice'
import NoticeTitle from '@/components/title'
import { getNoticeList } from '@/api/notice'
import Loading from '@/components/loading'
import NoData from '@/components/noData'
import Long from "long"
export default {
    components:{
        NoticeTitle,
        NoticeItem,
        Loading,
        NoData
    },
    data(){
        return {
            title:{
                nameLeft:'通知',
                nameRight:'公告'
            },
            noticeData:null,
            isNotice:false,
            isNoData:false,
        }
    },
    methods: {
        //获取通知列表
        handleGetNoticeList(current,pageSize){
                 getNoticeList(current,pageSize).then(response=>{
                     this.isNotice = true
                     if(response.value && response.value.length >0){
                         this.isNoData = true
                        response.value.map(item => {
                        item.id = (Long.fromValue(item.id)).toString()
                          })
                         this.noticeData = response.value
                     }
                   
                 })
            }
    },
    mounted () {
        this.handleGetNoticeList(1,6)
    }
}
</script>