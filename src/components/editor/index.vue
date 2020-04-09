<template>
    <div>
        <div id="div1" class="toolbar">
        </div>
        <div style="padding: 5px 0; color: #ccc"></div>
        <div id="div2" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
            <p>请输入正文......</p>
        </div>
    </div>
  
</template>

<script>
import Editor from 'wangeditor'
import { fileUpload } from '@/api/files'
export default {
    name:'Editor',
    data () {
        return {
            editorContent:null,
            editor:null,
        }
    },
    props:{
        contentHtml:{
            type:String,
            default:null
        }
    },
    mounted () {
        this.editor = new Editor('#div1', '#div2')
       
         // 自定义菜单配置
         this.editor.customConfig.zIndex = 10
         this.editor.customConfig.customUploadImg = function(files, insert){
             // files 是 input 中选中的文件列表
            // insert 是获取图片 url 后，插入到编辑器的方法

            files.map(item => {
                const formdata = new FormData()
                formdata.append("myfile",item)
                fileUpload(formdata).then(response => {
                    console.log(`${process.env.VUE_APP_BASE_API}${response.path}`)
                    insert(`${process.env.VUE_APP_BASE_API}${response.path}`)
                })
                
            })
           }
           this.editor.customConfig.onchange = (html) => {
                this.editorContent = html
                this.$emit('editorContent', this.editorContent)
            }
            this.editor.create()

          //修改
          
          
    },
    watch:{
        contentHtml(){
            if(this.contentHtml !== null){
             this.editor.txt.html(this.contentHtml)
            }
        }
    }
}
</script>
<style scoped>
    .text {
      width: 100%;
      text-align: left;
      margin-left: 160px;
      min-height:600px;
      border: 1px solid #ccc;
    }
   .w-e-text-container {
      height: 200px !important;
    }
    .toolbar {
        width: 100%;
        text-align: left;
        margin-left: 160px;
        border: 1px solid #ccc;
    }
</style>