<template>
        <div style="margin: 100px 18% 40px 18%;position: relative;" >
                 <!--头部标题-->
                    <knowledag-title :get-all-data="handleGetKnlgeShares" @emitSearch="onSearchSingle" :title="title" english="Training Center" :ismany="false"  ></knowledag-title>   

                 <div style="background: #fff;padding: 20px;" >
                        <!-- <el-button class="all-knowledge" type="primary" @click="handleGetKnlgeShares">所有文章<i class="el-icon-video-play"></i></el-button> -->
                        <el-button class="my-knowledge" type="primary" @click="handleMyKnowledge">我的文章<i class="el-icon-video-play"></i></el-button>
                        <el-button class="gorelease-button" type="primary" @click="goRelease">分享我的经验<i class="el-icon-video-play"></i></el-button>
                        
                        <div v-if="isLoading&&!isSearchData&&isMyKnow"  style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                            <items :row="item" :isMyKnow="isMyKnow" :getMyKnowledge="handleMyKnowledge"  ></items>
                        </div>

                        <el-tabs v-if="!isMyKnow" v-model="activeName" @tab-click="handleClick">
                            
                            <el-tab-pane label="所有文章" name="all">
                                <div v-if="isLoading&&!isSearchData"  style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                                    <items :row="item" :isMyKnow="isMyKnow"   ></items>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="精选文章" name="good">
                                <div v-if="isLoading&&!isSearchData"  style="line-height: 20px" v-for="(item,index) in documentList" :key="index" >
                                    <items :row="item" :isMyKnow="isMyKnow"  ></items>
                                 </div>
                            </el-tab-pane>
                       </el-tabs>

                            

                                <search-item v-if="isSearchData" v-for="(item,index) in documentList"  :search-info="item" :key="index" ></search-item>
                                
                                <div v-if="!isLoading" style="min-height: 500px;position: relative;" >
                                     <loading></loading>
                                </div>
                    
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
/*     import Item from './Item' */
    import Items from './Items'
    import KnowledagTitle from '@/components/title'
    import { mapGetters } from 'vuex'
    import Long from "long"
    import {getCurrentUserShares,getKnlgeShares,getGoodKnlgeShares } from "@/api/knowledge-sharing"
    import { isLogin } from "@/utils/validate"
    import Loading from "@/components/loading"
    import NoData from '@/components/noData'
    import {searchArticles} from "@/api/home"
    import SearchItem from "@/components/search"
    export default {
        components:{
        /*     Item, */
            KnowledagTitle,
            Items,
            Loading,
            NoData,
            SearchItem
        },
        data(){
            return {
                pageSize:5,
                current:1,
                total:0,
                pageSizes:[5,10,20,40],
                isMyKnow:false,
                title:{
                        nameLeft:"知识",
                        nameRight:'共享'
                },
                documentList:[],
                goodKnlgeShares:[],
                isLoading:false,
                isNoData:false,
                fastsearch:null,//搜索参数
                isSearchData:false,//是否搜索数据
                activeName:"all"
            }
        },
        
        methods:{
            // pagesize 变化回调
            handleSizeChange(val){
               this.pageSize = val
               if(this.activeName === "good"){
                   this.handleGetGoodKnlgeShares()
               }else if(this.activeName === "all"){
                   this.handleGetKnlgeShares()
               }

               if(this.isSearchData){
                this.handleGetKnlgeShares()
               }
            },
           //current 变化回调
            handleCurrentChange(val){
                this.current = val
                if(this.activeName === "good"){
                   this.handleGetGoodKnlgeShares()
               }else if(this.activeName === "all"){
                   this.handleGetKnlgeShares()
               }

               
               if(this.isSearchData){
                this.handleGetKnlgeShares()
               }
            },
            //去发布界面 
            goRelease(){
                    if(isLogin()){
                        this.$router.push({name:'release'})
                    }else{
                            this.$message({
                                    message:"请先登录后操作",
                                    type:'warning',
                                    duration:1500,
                            })
                    }
                   
            },
            //获取精华帖
            handleGetGoodKnlgeShares({current=this.current,pageSize=this.pageSize}={}){
                        this.isLoading = true
                        this.isMyKnow = false;//游客
                        this.isSearchData = false
                getGoodKnlgeShares({current,pageSize}).then(response=>{
                    this.total = response.page.total
                    this.documentList = response.value.map(item => {
                              item.id = (Long.fromValue(item.id)).toString()
                              return item 
                        })
                        if( this.documentList.length > 0){
                            this.isNoData = true
                        }
                })
            },
            //分页获取所有的文章列表
            handleGetKnlgeShares({current=this.current,pageSize=this.pageSize}={}){
                
                getKnlgeShares({current,pageSize}).then(response=>{
                        this.isLoading = true
                        this.isMyKnow = false;//游客
                        this.isSearchData = false
                        this.activeName = "all"
                        let page = response.page    
                        this.total  = page.total
                       
                        this.documentList = response.value.map(item => {
                              item.id = (Long.fromValue(item.id)).toString()
                              return item 
                            })
                        if( this.documentList.length > 0){
                            this.isNoData = true
                        }
                        
                
                })
            },
            handleClick(tab){
             
                if(tab.name === "all"){
                    this.handleGetKnlgeShares()
                }
                if(tab.name === "good"){
                    this.handleGetGoodKnlgeShares()
                }
            },
            //监听接收的搜索数据
            onSearchSingle(val){
               this.fastsearch = val
               this.handleSearch()
             },
           //搜索数据 
           handleSearch({current=this.current,pageSize=this.pageSize,articletype=6,fastsearch=this.fastsearch}={}){
           //状态初始化
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
            //我的文章
            handleMyKnowledge({current=this.current,pageSize=this.pageSize}={}){
                    if(isLogin()){
                          //状态初始化
                           this.isLoading = false
                           this.isNoData = false
                           this.isSearchData = false
                           this.documentList = []

                        getCurrentUserShares({current,pageSize}).then(response => {
                                this.isMyKnow = true //用户
                                this.isLoading = true
                                let page = response.page
                                this.total  = page.total
                                this.documentList = response.value.map(item => {
                                    item.id = (Long.fromValue(item.id)).toString()
                                    return item
                                })
                                if(this.documentList.length > 0){
                                    this.isNoData = true
                                }
                        })
                    }else {
                            this.$message({
                                    message:"请先登录后操作",
                                    type:"warning",
                                    duration:1500,
                            })
                    }
            },
         
        },
        mounted () {
              this.handleGetKnlgeShares()
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
    .institution-search {
                width: 20%;
                position: absolute;
                top: 1%;
                right: 0%;
    }
    .gorelease-button {
                position: absolute;
                top: 0%;
                right: 31%;
    }
    .my-knowledge {
        position: absolute;
        top: 0%;
        right: 43%;
    }
    .all-knowledge {
        position: absolute;
        top: 0%;
        right: 46%;
    }
    </style>