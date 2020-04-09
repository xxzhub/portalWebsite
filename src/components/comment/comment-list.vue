<!--
 * @Author: your name
 * @Date: 2020-03-19 22:23:21
 * @LastEditTime: 2020-03-20 11:12:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\components\comment\comment-list.vue
 -->
<template>
    <div style="margin-top: 10px;">
        <div v-for="(item,index) in commentList" :key="index">
            <item :comment-object="item"></item>
        </div>
        <el-pagination
                   background 
                  :page-size="pageSize"
                  :total="total"
                  :current-page="current"
                  layout="total,sizes,prev,pager,next,jumper"
                  prev-text="上一页"
                  next-text="下一页"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange">
         </el-pagination>
    </div>
</template>

<script>
import {getComments} from "@/api/comment"
import Item from "./item"
export default {
    data(){
        return {
            current:1,
            pageSize:10,
            total:0,
            commentList:[]
        }
    },
    components:{
        Item
    },
    methods: {
        //分页获取评论列表
        handleGetComments({current=this.current,pageSize=this.pageSize,articletype=6,articleid=this.detailId}={}){
            const data = {
                current,
                pageSize,
                articletype,
                articleid
            }
           
            getComments(data).then(response => {
                console.log(response)
                this.total = response.page.total
                if(response.value && response.value.length>0){
                    this.commentList = response.value
                }
            })

        },
        handleSizeChange(val){
            this.pageSize = val
            this.handleGetComments()
        },
        handleCurrentChange(val){
            this.current = val
            this.handleGetComments()
        }
    },
    props:{
        detailId:{
            type:String
        }
    },
    mounted () {
        this.handleGetComments()
    }
}
</script>