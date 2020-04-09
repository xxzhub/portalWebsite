<template>
        <div class="institution" >
             <sidebar-menu :get-regulations="handleGetRegulations" class="animated fadeInLeftBig" ></sidebar-menu>      
            <div style="margin: 100px 18% 40px 18%;position: relative;" >
                 <!--头部标题-->
                    <institution-title :get-all-data="handleGetRegulations"  @emitSearch="onSearchSingle" :title="title" english="System Document" :ismany="false"  ></institution-title>

                   <!--分页数据-->
                    <div v-if="isLoading&&!isSearchData"  style="line-height: 20px">
                         <list-title></list-title>
                         <item v-for="(item,index) in documentList" :row="item" goRouteName="institution-details" :paramObject="{articleid:item.id}" :key="index" :index="index" ></item>
                    </div>
                   
                    <!--搜索数据-->
                    <search-item v-if="isSearchData" v-for="(item,index) in documentList"  :search-info="item" :key="index" ></search-item>
                    <!--加载-->
                    <div v-if="!isLoading" style="min-height: 500px;position: relative;" >
                        <loading></loading>
                     </div>
                    <!--无数据-->
                    <div v-if="!isNoData&&isLoading" style="min-height: 500px;position: relative;">
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
import InstitutionTitle from '@/components/title'
import SidebarMenu from './sidebar-menu'
import { getRegulations } from "@/api/institution"
import Long from "long"
import Loading from "@/components/loading"
import NoData from '@/components/noData'
import {searchArticles} from "@/api/home"
import SearchItem from "@/components/search"
import Item  from "@/views/components/listData/item"
import ListTitle  from "@/views/components/listData/title"
    export default {
        components:{
            InstitutionTitle,
            SidebarMenu,
            Loading,
            NoData,
            SearchItem,
            Item,
            ListTitle
           
        },
        data(){
            return {
                pageSize:10,
                current:1,
                total:0,
                pageSizes:[10,20,30],
                title:{
                   nameLeft:'制度',
                   nameRight:'文档'
                },
                documentList:[],
                isLoading:false,
                isNoData:false,
                deptid:'-1',
                fastsearch:null,//搜索参数
                isSearchData:false,//是否搜索数据

            }
        },
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){
                this.pageSize = val 
                this.handleGetRegulations()
            },
           //current 变化回调
            handleCurrentChange(val){
                this.current = val
                this.handleGetRegulations()
            },
            //分页获取制度文档详情
            handleGetRegulations({current=this.current,pageSize=this.pageSize,deptid=this.deptid}={}){
                getRegulations({current,pageSize,deptid}).then(response => {
                this.isLoading = true
                this.documentList = []
                this.isSearchData = false
                let page = response.page
                this.total = page.total
                if(response && response.value.length === 0){
                    this.documentList=[]
                    this.isNoData = false
                }
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
        handleSearch({current=this.current,pageSize=this.pageSize,articletype=4,fastsearch=this.fastsearch}={}){
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
                this.handleGetRegulations()
        },
       
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
    .institution {
         position: relative;
         min-width: 1200px;
         height: 85vh;
    }
    </style>