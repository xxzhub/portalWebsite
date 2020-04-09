<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-19 09:35:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\notice\notice-trends.vue
 -->
<template>
    <div style="margin: 100px 18% 40px 18%;background: #fff;padding: 20px;" >
        <notice-title :get-all-data="handleGetNoticeList"  @emitSearch="onSearchSingle" :title="title"  english="Top Notices"  :ismany="false" ></notice-title>
        <notice-item v-if="isLoading&&!isSearchData" :noticeData="noticeData"></notice-item>
        <search-item v-if="isSearchData" v-for="(item,index) in noticeData"  :search-info="item" :key="index" ></search-item>
        <div v-if="!isLoading" style="min-height: 550px;position: relative;">
            <loading></loading>
        </div>
        <div v-if="!isNoData&&isLoading" style="min-height: 550px;position: relative;">
            <no-data></no-data>
       </div>
        <el-pagination
                   background 
                  :page-size="pageSize"
                  :total="total"
                  :current-page="current"
                  layout="total,sizes,prev,pager,next,jumper"
                  :page-sizes="pageSizes"
                  prev-text="上一页"
                  next-text="下一页"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
         </el-pagination>

        
    </div>
</template>

<script>
import {NoticeItem} from '../notice'
import NoticeTitle from '@/components/title'
import { getNoticeList } from '@/api/notice'
import Loading from '@/components/loading'
import NoData from '@/components/noData'
import Long from "long"
import {searchArticles} from "@/api/home"
import SearchItem from "@/components/search"
export default {
    components:{
        NoticeItem,
        NoticeTitle,
        Loading,
        NoData,
        SearchItem
    },
    data(){
        return{
            pageSize:10,
            current:1,
            total:0,
            pageSizes:[10,20,30,40],
            noticeData:[],
            title:{
                nameLeft:"通知",
                nameRight:"公告"
            },
            isNoData:false,
            isLoading:false,
            fastsearch:null,//搜索参数
            isSearchData:false,//是否搜索数据
        }
    },
    methods:{
            // pagesize 变化回调
            handleSizeChange(val){
                this.pageSize = val
                if(this.isSearchData){
                    this.handleSearch()
                }else{
                    handleGetNoticeList
                }
            },
            //current 变化回调
            handleCurrentChange(val){
                this.current = val
                if(this.isSearchData){
                    this.handleSearch()
                }else{
                    handleGetNoticeList
                }
            },
            //获取通知列表
            handleGetNoticeList({current=this.current,pageSize=this.pageSize}={}){
                 getNoticeList(current,pageSize).then(response=>{
                    if(response.value.length > 0){
                        this.isNoData = true
                    }
                    this.isLoading = true
                    let page = response.page;
                    response.value.map(item => {
                        item.id = (Long.fromValue(item.id)).toString()
                    })
                    this.total = page.total
                    this.noticeData = response.value
                 })
            },
            //监听搜索数据
            onSearchSingle(val){
               this.fastsearch = val
               this.handleSearch()
             },
        //搜索数据 
        handleSearch({current=this.current,pageSize=this.pageSize,articletype=1,fastsearch=this.fastsearch}={}){
            this.isLoading = false
            this.isNoData = false
            this.isSearchData = true
            this.noticeData = []
        const data = {
            current,
            pageSize,
            articletype,
            fastsearch
        }
        searchArticles(data).then(response => {
            this.isLoading = true
            this.total = response.articles.page.total
            this.noticeData = response.articles.value
            if(response.articles.value && response.articles.value.length>0){
                this.isNoData = true
             }
           })
        },
    },
    mounted () {
        this.handleGetNoticeList()
    }
}
</script>