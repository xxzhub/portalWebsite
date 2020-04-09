<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-16 10:14:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\quality\quality-Item.vue
 -->
<template>
    <div style="width:100%" > 
        <list-title></list-title>
        <item v-for="(quality,index) in qualityData"  goRouteName="quality-details" :paramObject="{articleid:quality.id}" :key="index" :row="quality" :index="index" ></item>
    </div>
</template>
<script>
import Item  from "@/views/components/listData/item"
import ListTitle  from "@/views/components/listData/title"
export default {
    name:'QualityItem',
    components:{
        Item,
        ListTitle
    },
    props:{
        qualityData:{
            type:Array,
            default:[]
        }
    },
}
</script>