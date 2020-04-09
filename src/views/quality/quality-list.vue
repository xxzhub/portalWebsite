<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-19 09:36:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\quality\quality-list.vue
 -->
<template>
        <div style="margin: 100px 18% 40px 18%;background: #fff;padding: 20px;" >
                <quality-title :get-all-data="handleGetQualitys" @emitSearch="onSearchSingle" :title="title" english="Quality Information" :ismany="false" ></quality-title>
                <quality-item v-if="isLoading&&!isSearchData" :qualityData="qualityData"></quality-item>
                
                <search-item v-if="isSearchData" v-for="(item,index) in qualityData"  :search-info="item" :key="index" ></search-item>
                
                <div v-if="!isLoading" style="min-height: 250px;position: relative;" >
                    <loading></loading>
                </div>
                <div v-if="!isNoData&&isLoading" style="min-height: 250px;position: relative;">
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
import {QualityItem} from '../quality'
import QualityTitle from '@/components/title'
import { getQualitys } from '@/api/quality'
import Long from 'long'
import Loading from "@/components/loading"
import NoData from '@/components/noData'
import {searchArticles} from "@/api/home"
import SearchItem from "@/components/search"
    export default {
        components:{
            QualityTitle,
            QualityItem,
            NoData,
            Loading,
            SearchItem
  
        },
        data(){
            return{
                pageSize:10,
                current:1,
                total:0,
                pageSizes:[10,20,30,40],
                title:{
                    nameLeft:"质量",
                    nameRight:"信息"
                },
                isNoData:false,
                isLoading:false,
                qualityData:[],
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
                       this.handleGetQualitys()
                    }
                   
                },
                //current 变化回调
                handleCurrentChange(val){
                    this.current = val
                    if(this.isSearchData){
                       this.handleSearch()
                    }else{
                       this.handleGetQualitys()
                    }
                },
                //分页获取质量列表
                handleGetQualitys({current=this.current,pageSize=this.pageSize}={}){
                     getQualitys({current,pageSize}).then(response => {
                          let page = response.page
                          this.total = page.total
                          this.isLoading = true
                          this.isSearchData = false
                         if(response.value.length > 0){
                             this.isNoData = true
                             this.qualityData = response.value.map(item => {
                             item.id = (Long.fromValue(item.id)).toString()
                             return item
                         })
                       }
                
                   })
               },
                //监听搜索数据
            onSearchSingle(val){
               this.fastsearch = val
               this.handleSearch()
             },
        //搜索数据 
        handleSearch({current=this.current,pageSize=this.pageSize,articletype=3,fastsearch=this.fastsearch}={}){
            this.isLoading = false
            this.isNoData = false
            this.isSearchData = true
            this.qualityData = []
        const data = {
            current,
            pageSize,
            articletype,
            fastsearch
        }
        searchArticles(data).then(response => {
            this.isLoading = true
            this.total = response.articles.page.total
            this.qualityData = response.articles.value
            if(response.articles.value && response.articles.value.length>0){
                this.isNoData = true
             }
           })
        },

        },
        mounted () {
            this.handleGetQualitys()
        }
    }
    </script>