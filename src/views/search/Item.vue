<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-18 10:24:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\search\Item.vue
 -->
<template>
    <div class="search-item" v-if="searchInfo" @click="handleSkipDetail"  >
        <div style="display: flex;justify-content: start;" >
            <div class="search-cla" >
                <span>{{searchInfo.articletypeStr}}</span>
            </div>
            <div class="search-title">
                <span>{{searchInfo.title}}</span>
            </div>
            <div class="search-item-date" >
                <span>{{searchInfo.publishdate}}</span>
            </div>
        </div>
        <div class="search-content"> 
                    <span>{{searchInfo.summary}}</span>
        </div>
        
    </div>
</template>

<script>
import Long from "long"
export default {
    data(){
        return {

        }
    },
    props:{
        searchInfo:{
            type:Object,
            default:null
        }
    },
    methods: {

        //跳转信息详情
        handleSkipDetail(){
            const articleid = (Long.fromValue(this.searchInfo.articleid)).toString()

            const articletype = this.searchInfo.articletype
            //跳转信息
            let skip = {
                skipName:"train-details",
                skipId:"articleid"
            }
           
        
            switch(articletype){
                case 0:{
                    skip.skipName = "news-show"
                    skip.skipId = "newsid"
                };break;
                case 1:{
                    skip.skipName = "notice-show"
                    skip.skipId = "noticeid"
                };break;
                case 2:{
                    skip.skipName = "train-details"
                };break;
                case 3:{
                    skip.skipName = "quality-details"
                };break;
                case 4:{
                    skip.skipName = "institution-details"
                };break;
                case 5:{
                    skip.skipName = "honor-details"
                };break;
                case 6:{
                    skip.skipName = "knowledge-details"
                };break;
                
            }
            let  paramsObj = {}
            paramsObj[skip.skipId] = articleid
            this.$router.push({name:skip.skipName,params:paramsObj})
        }
    }

}
</script>

<style scoped lang="scss" >

.search-item {
    position: relative;
    background: #fff;
    width: 100%;
    height: 60px;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer;
    margin-bottom: 20px;

    .search-cla {
        
        font-size: 14px;
        font-weight: 600;
        background: #1886d1;
        padding: 4px;
        color: #fff;
        border-radius: 6px;
    }

    .search-title {
        left: 60px;
        width: 80%;
        text-align: left;
        font-weight: 700;
        margin-left: 20px;
        line-height: 20px;
    }

    .search-content {
        position: absolute;
        top: 50%;
      /*   left: 10%; */
        width: 95%;
      /*   text-indent: 2rem; */
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .search-item-date {
        position: absolute;
        right:2% ;
        top: 4%;
        font-size: 14px;
        color: #888
    }
}
</style>

