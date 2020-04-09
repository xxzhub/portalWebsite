<template>
    <div >
        <el-carousel  height="500px" >
            <el-carousel-item v-for="item in 4" :key="item">
             
            </el-carousel-item>
        </el-carousel>
          <div style="margin: 18px 18%;background-color: #fff;padding: 20px;" >
            <news-title :get-all-data="handleGetNewList" @emitSearch="onSearchSingle" :title="title" english="New Information" :ismany="false" :callback="handleSearch" ></news-title>
            <div v-if="isloading&&!isSearchData" v-for="(news,index) in newsData">
               <!--  <item :row="news" :index="index" :key="index"   ></item> -->
                <item :row="news" :index="index" goRouteName="news-show" :paramObject="{newsid:news.id}" >
                    <template  #default="slotProps">
                       
                            {{slotProps.row.newsTName}}
                   
                        
                    </template>
                </item>
            </div>
            <search-item v-if="isSearchData" v-for="(item,index) in newsData"  :search-info="item" :key="index" ></search-item>
            <div v-if="!isloading" style="min-height: 400px; position: relative;">
                <loading></loading>
            </div>
            <div v-if="!isNoData&&isloading" style="min-height: 400px;position: relative;">
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
import Item from "@/views/components/listData/item"
import NewsTitle from '@/components/title'
import Breadcrumd from '@/components/breadcrumd.vue'
import { getNewList } from '@/api/news'
import Loading from '@/components/loading'
import NoData from '@/components/noData'
import Long from "long"
import {searchArticles} from "@/api/home"
import SearchItem from "@/components/search"
    export default {
        data(){
            return{
                pageSize:10,
                current:1,
                total:0,
                pageSizes:[10,20,30,40],
                newsData:[],//新闻列表数据
                isloading:false,//是否加载成功
                title:{
                    nameLeft:'新闻',
                    nameRight:'动态'
                },
                isNoData:false,
                fastsearch:null,//搜索参数
                isSearchData:false,//是否搜索数据
            }
        },
        mounted(){
            this.handleGetNewList()
        },
        components:{
            NewsTitle,
            Item,
            Breadcrumd,
            Loading,
            NoData,
            SearchItem
        },
        props:{
                id: {default:1}
        },
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){
                this.pageSize = val
                if(this.isSearchData){
                    this.handleSearch()
                }else{
                    this.handleGetNewList()
                }
               
            },
            //current 变化回调
            handleCurrentChange(val){
                this.current = val
                if(this.isSearchData){
                    this.handleSearch()
                }else{
                    this.handleGetNewList()
                }
            },
            /**
             * 获取分页新闻列表
             */
            handleGetNewList({current=this.current,pageSize=this.pageSize}={}){
                getNewList(current,pageSize).then(response=>{
                    if(response.value.length>0){
                        this.isNoData = true
                    }
                    let page = response.page
                    this.isloading = true
                    this.isSearchData = false
                    this.total = page.total
                    this.newsData = response.value
                    this.newsData.map(item=>{
                            item.id = (Long.fromValue(item.id)).toString()
                        })
                })
            },
           
            handleSearch({current=this.current,pageSize=this.pageSize,articletype=0,fastsearch=this.fastsearch}={}){
            this.isloading = false
            this.isNoData = false
            this.isSearchData = true
            this.newsData = []
          const data = {
            current,
            pageSize,
            articletype,
            fastsearch
        }
        searchArticles(data).then(response => {
            this.isloading = true
            this.total = response.articles.page.total
            this.newsData = response.articles.value
            if(response.articles.value && response.articles.value.length>0){
                this.isNoData = true
             }
           })
          },
          onSearchSingle(val){
               this.fastsearch = val
               this.handleSearch()
            },
        },
       
    }
</script>
<style>
    .el-carousel__item:nth-child(2n){
        background-image: url('../../assets/images/beijing.png')
        }
    .el-carousel__item:nth-child(2n+1){
            background-image: url('../../assets/images/banner.png')
        }
</style>