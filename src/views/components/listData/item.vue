<!--
 * @Author: your name
 * @Date: 2020-03-20 16:53:29
 * @LastEditTime: 2020-03-20 17:43:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\components\listData\item.vue
 -->
<template>
    <div @click="handleGoDetail" style="display: flex;justify-content: space-between;flex-wrap: nowrap;font-size: 14px;margin: 20px 0px;color: #535151;cursor:pointer;" >
        <div style="width: 38px;position: relative;" >
            <div style="width: 18px;height: 16px;background-color:#1886d1;text-align:center;color: #fff;position: absolute;transform: translateX(-50%);left:50%;" >
                <span>{{index + 1}}</span>
            </div>
        </div>
       
        <div  style="width: 30%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: center" >
                        <span>{{row.title}}</span>
              
        </div>
        <div style="width: 30%;text-align: center" >
                <span>{{row.author}}</span>
        </div>
        <div style="width: 30%;text-align: center" >
                <span>{{publishdate}}</span>
        </div>
        <slot  :row="row">

        </slot>
    </div>
</template>
<script>
import {dateFormat} from '@/utils/commonality'
export default {
    props:{
        row:{
            type:Object,
            default:''
        },
        index:{
            type:Number,
            default:''
        },
        goRouteName:{
            type:String
        },
        paramObject:{
            type:Object
        }
    },
   
    computed: {
        publishdate(){
            return dateFormat(this.row.publishdate,this.dateStyle)
        }
    },
    data(){
        return{
            dateStyle:["/","/"],
        }
    },
    methods:{
        handleGoDetail(){
            this.$router.push({name:this.goRouteName,params:this.paramObject})
        },
        
    }
}
</script>
