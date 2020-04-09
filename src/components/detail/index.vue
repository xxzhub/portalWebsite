<!--
 * @Author: your name
 * @Date: 2020-03-15 22:01:20
 * @LastEditTime: 2020-03-23 09:30:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\components\detail\index.vue
 -->
<template>
    <div v-if="detailsData"  style="background: #fff;padding: 20px;margin-top: 40px;">
        <div>
            <h2 style="text-align: center;">{{detailsData.title}}</h2>
        </div>
        <div style="text-align: center;" >
            <span><svg-icon icon-class="dateDetail" class-name="from-like"></svg-icon>{{detailsData.publishdate}}</span>
            <span style="margin-left: 20px"><svg-icon icon-class="people" class-name="from-like" ></svg-icon>{{detailsData.author}}</span>
            <span style="margin-left: 20px" ><svg-icon icon-class="eyeball" class-name="from-like" ></svg-icon>{{detailsData.pageview}}</span>
        </div>
        <div style="width: 100%;height: 100%;background: #fff;overflow: hidden;border-top: 1px solid #666;" >
            <span v-html="detailsData.content" ></span>
        </div>
        <share v-if="isShare" :detailId="detailId" :good-num="detailsData.goodnum" :bad-num="detailsData.badnum" :cmt-count="detailsData.cmtCount"></share>

        <div style="cursor: pointer;" v-if="isFile" >
                <div style="height: 40px;background: #f3f1f1;line-height: 40px;" >
                    <h3 style="margin-left:20px;" >附件</h3>
                </div>
                <div v-for="(item,index) in detailsData.annexes" :key="index" style="position: relative;height: 80px;" >
                    <div style="position: absolute;font-size:50px;top: 50%;transform: translateY(-40%)" >
                        <i class="el-icon-document"></i>
                    </div>
                    <div style="position: absolute;left: 6%;top: 20%;" >
                        <span style="text-align:center" >{{item.name}}</span>
                    </div>
                    <div style="position: absolute;left: 6%;top: 60%" >
                           <!-- <el-button type="primary" round  >预览</el-button> -->
                           <el-button type="primary" round @click="handleFileDownLoad(item)" >下载</el-button>
                    </div>
                </div>
         </div>

         <div style="display: flex;flex-direction:column;cursor: pointer;width: 100%;border-top: #dbd8d8 solid;padding: 10px;">
             <div style="margin-bottom: 16px;" @click="handleGetKnlgeShareDetail({detailId:frontId})">
                 <span>上一条:<span>{{frontName}}</span></span>
             </div>
             <div  @click="handleGetKnlgeShareDetail({detailId:nextId})">
                <span>下一条:{{nextName}}</span>
            </div>
         </div>
        
    </div>
</template>
<script>
import { fileDownload } from '@/api/files'
import { download } from '@/utils/commonality'
import Long from "long" 
import Share from "@/components/detail/share"
    export default {
        data(){
            return{
                detailsData:null,
                isLoading:false,
                isFile:false,
                frontId:0,
                nextId:0,
                frontName:"无",
                nextName:"无",
            }
        },
        watch: {
            isLoading(){
                this.$emit("emitIsLoading",this.isLoading)
            }
        },
    
        props:{
            detailId:{
                type:String
            },
            getDetail:{
                type:Function,
            },
            detailName:{
                type:String
            },
            detailType:{
                type:Number
            },
            isShare:{
                type:Boolean,
                default:false
            }
            
        },
        components:{
            Share
        },
        methods:{
            //获取分享详情
            handleGetKnlgeShareDetail({detailId=this.detailId}={}){
            this.isFile = false
            let detailName = this.detailName
            const data = {}
            if(this.detailType !== undefined && this.detailType !== null){
                data["type"] = this.detailType
            }
             
              data[detailName] = detailId
             
              this.getDetail(data).then(response=>{
                  if(response !== undefined && response){
                       this.isLoading = true
                    
                       if(response.annexes.length > 0){
                           this.isFile = true
                           console.log(this.isFile)
                           response.annexes = response.annexes.map(item =>{
                            item.fid = (Long.fromValue(item.fid)).toString()
                            return item
                          })
                        }
                       this.detailsData = response
                      if(this.detailsData.next !== null){
                        let nextArr = this.detailsData.next.split("|")
                        this.nextId = nextArr[0]
                        this.nextName = nextArr[1]
                      }else{
                        this.nextName = "无"
                      }
                      if(this.detailsData.front !== null){
                        let frontArr = this.detailsData.front.split("|")
                        this.frontId = frontArr[0]
                        this.frontName = frontArr[1]
                      }else{
                        this.frontName = "无"
                      }
                      

                      
                    }
              })
            },
            //文件下载
            handleFileDownLoad(file){
                const fileId = (Long.fromValue(file.fid)).toString()
                fileDownload({fid:fileId}).then(response => {
                     download(response,file.name)
                })
                
            },
            
        },
        mounted(){
            this.handleGetKnlgeShareDetail()
            
        }
    }
    </script>

<style scoped>
.from-like {
    font-size: 16px;
}
</style>