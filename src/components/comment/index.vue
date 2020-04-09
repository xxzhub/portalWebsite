<!--
 * @Author: your name
 * @Date: 2020-03-19 16:13:05
 * @LastEditTime: 2020-03-20 11:21:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\components\comment\index.vue
 -->
<template>
    <div style="margin-top: 40px;">
        <div>
            <div style="text-align: center;display: flex;justify-content: start;">
                <span style="line-height: 28px;width: 10%;">发布人:</span>
                <el-input style="float: right;width: 20%;margin-left: 10px;" v-model="commentObject.author"></el-input>
            </div>
           
             <div style="text-align: center;display: flex;justify-content: start;margin-top: 10px;">
                <span style="line-height: 28px;width: 10%;">评价内容:</span>
                <el-input style="width: 70%;margin-left: 10px;" type="textarea" :rows="2" placeholder="请输入内容" v-model="commentObject.content"></el-input>
             </div>
            
             <div style="margin-left: calc(10% + 10px);margin-top: 10px;" >
                <div class="pan-btn light-blue-btn" @click="handleAddComment">
                    发布
                </div>
            </div>
        </div>
         <comment-list ref="commentList" :detailId="detailId" ></comment-list>
    </div>
</template>

<script>
import {addComment} from "@/api/comment"
import {getUserIP} from "@/utils/commonality"
import CommentList from "./comment-list"
export default {
    data(){
        return {
            commentObject:{
                author:"匿名",
                articleid:"",
                articletype:6,
                content:"",
                ip:"192.168.1.1",
            }
        }
    },
    props:{
        detailId:{
            type:String
        }
    },
    methods: {
        handleAddComment(){
            this.commentObject.articleid = this.detailId
           
            addComment(this.commentObject).then(response => {
                this.$message.success("评论正在审核中,请稍后查看")
                this.commentObject.content = ""
                this.refs["commentList"].handleGetComments()
            })
        },
    },
    mounted () {
        getUserIP()
       /*  var Ip=returnCitySN['cip']
        console.log(Ip)
        localStorage.setItem('Ip', Ip)
        console.log("外网ip",localStorage.getItem('Ip')) */
     },
     components: {
        CommentList
     }
}
</script>