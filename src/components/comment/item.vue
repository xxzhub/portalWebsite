<!--
 * @Author: your name
 * @Date: 2020-03-19 16:57:02
 * @LastEditTime: 2020-03-20 11:15:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\components\comment\item.vue
 -->
<template>
    <div style="padding: 4px;background-color: #fff;border-bottom: 1px solid #cfcdcd;" >
        <div style="display: flex;justify-content: space-between;">
            <div>
                <h4>{{commentObject.author}}</h4>
            </div>
            <div >
                <span>{{commentObject.publishdate}}</span>
            </div>
         </div>
        
         <div style="font-size: 14px;">
            <span>{{commentObject.content}}</span>
         </div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props:{
            commentObject:{
                type:Object
            }
        }
    }
</script>