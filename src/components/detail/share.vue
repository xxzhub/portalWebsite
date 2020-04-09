<template>
     <el-row style="height: 40px;margin-top: 10px;" :gutter="20">
         <el-col :span="3">
             <div style="cursor: pointer;line-height: 40px;text-align: center;" @click="handleClickLike">
                <svg-icon :icon-class="likeName" class-name="from-like" ></svg-icon>
                <span style="font-size: 20px;">({{goodCount}})</span>
             </div>
           
         </el-col>
         <el-col :span="3">
             <div  style="cursor: pointer;line-height: 40px;text-align: center;" @click="handleClickBad">
                <svg-icon :icon-class="badName" class-name="from-like" ></svg-icon>
                <span style="font-size: 20px;">({{badCount}})</span>
             </div>
            
         </el-col>
         <el-col :span="4">
             <div style="cursor: pointer;line-height: 40px;text-align: center;" @click="handleOpenComment">
                <svg-icon icon-class="comment" class-name="from-like" ></svg-icon>
                <span style="font-size: 20px;">{{cmtCount}}条评论</span>
             </div>
         </el-col>
     </el-row>
           
     
</template>

<script>
import {giveOpinion} from "@/api/comment"
export default {
    data(){
        return {
            likeName:"fromLike",
            badName:"fromBad",
            likeClickCount:0,
            badClickCount:0,
            isOpenComment:false,
        }
    },
    props:{
        goodNum:{
            type:Number,
            default:0
        },
        badNum:{
            type:Number,
            default:0
        },
        cmtCount:{
            type:Number,
            default:0
        },
        detailId:{
            type:String
        }
    },
    computed: {
        goodCount(){
            return this.goodNum + this.likeClickCount
        },
        badCount(){
            return this.badNum + this.badClickCount
        }
    },
    methods: {
        //点击点赞
        handleClickLike(){
            if(this.likeName === "fromLike"){
                this.likeName = "toLike"
                this.badName = "fromBad"
                this.clickLike({type:0})
            }
            /* else{
                this.likeName = "fromLike"
            } */
           
        },
        //点击不喜欢
        handleClickBad(){
            if(this.badName === "fromBad"){
                this.badName = "toBad"
                this.likeName = "fromLike"
             
                this.clickLike({type:1})

            }
            /* else{
                this.badName = "fromBad"
            } */
        },
        //点赞接口
        clickLike({type,targetid=this.detailId}={}){
            const data = {
                type,
                targetid
            }
            giveOpinion(data).then(response =>{
                if(type === 0){
                    this.likeClickCount++
                }
                if(type === 1){
                    this.badClickCount++

                }
                
            })
        },
        handleOpenComment(){
            this.isOpenComment = !this.isOpenComment
            this.bus.$emit("isOpenComment",this.isOpenComment)
        }
    }
}
</script>
<style scoped lang="scss">
.from-like {
    font-size: 20px;
}
</style>