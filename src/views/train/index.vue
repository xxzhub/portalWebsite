<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-19 09:36:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\train\index.vue
 -->
<template>
    <div style="margin: 100px 18% 40px 18%;position: relative;" >
                <train-title :get-all-data="handleGetOrgTrains" @emitSearch="onSearchSingle" :title="title" english="Training Center" :ismany="false" ></train-title>      
                         <div style="background: #fff;padding: 20px;" >
                            <div v-if="isLoading&&!isSearchData">
                                <list-title></list-title>
                                <div   style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                                    <item :row="item" :index="index" goRouteName="train-details" :paramObject="{articleid:item.id}" ></item>
                               </div>
                            </div>
                            <search-item v-if="isSearchData" v-for="(item,index) in documentList"  :search-info="item" :key="index" ></search-item>
                            
                            <div v-if="!isLoading" style="min-height: 500px;position: relative;" >
                                <loading></loading>
                            </div>
                            <div v-if="!isNoData&&isLoading" style="min-height: 400px;position: relative;">
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
        
    </div>
</template>

<script>
import Item  from "@/views/components/listData/item"
import TrainTitle from '@/components/title'
import { getOrgTrains } from "@/api/train"
import Long from "long"
import Loading from "@/components/loading"
import NoData from '@/components/noData'
import {searchArticles} from "@/api/home"
import SearchItem from "@/components/search"
import ListTitle  from "@/views/components/listData/title"
export default {
    components:{
        TrainTitle,
        Item,
        Loading,
        NoData,
        SearchItem,
        ListTitle
    },
    data(){
        return {
            pageSize:10,
            current:1,
            total:0,
            pageSizes:[8,16,32],
            title:{
                nameLeft:"培训",
                nameRight:"专栏"
            },
            documentList:[],
            isLoading:false,
            isNoData:false,
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
                this.handleGetOrgTrains()
            }
           
        },
       //current 变化回调
        handleCurrentChange(val){
            this.current = val
            if(this.isSearchData){
                this.handleSearch()
            }else{
                this.handleGetOrgTrains()
            }
        },
        //分页获取培训数据
        handleGetOrgTrains({current=this.current,pageSize=this.pageSize}={}){
            getOrgTrains({current,pageSize}).then(response => {
                this.isLoading = true
                this.isSearchData = false
                let page = response.page
                this.total = page.total
                if(response && response.value.length>0){
                    this.isNoData = true
                    this.documentList = response.value.map(item =>{
                        item.id = (Long.fromValue(item.id)).toString()
                        return item
                    })
                }
            })
        },
        onSearchSingle(val){
               this.fastsearch = val
               this.handleSearch()
             },
        //搜索数据 
        handleSearch({current=this.current,pageSize=this.pageSize,articletype=2,fastsearch=this.fastsearch}={}){
            this.isLoading = false
            this.isNoData = false
            this.isSearchData = true
            this.documentList = []
        const data = {
            current,
            pageSize,
            articletype,
            fastsearch
        }
        searchArticles(data).then(response => {
            this.isLoading = true
            this.total = response.articles.page.total
            this.documentList = response.articles.value
            if(response.articles.value && response.articles.value.length>0){
                this.isNoData = true
             }
           })
        },
    },
    mounted () {
        this.handleGetOrgTrains()
    }
}
</script>
<style lang="scss" scoped >
.train-col-content {
    text-align: left;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 1px 1px 10px 1px #4c9ace;
    padding: 6px 16px 6px 16px;
    cursor: pointer;
    font-size: 16px;
    transition: all .3s;
    margin: 12px 12px;
}
.train-col-content:hover {
   transform: scale(1.1)
}
</style>