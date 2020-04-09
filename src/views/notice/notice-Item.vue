<template>
    <div style="margin-top: 20px;" >
        <list-title></list-title>
        <item v-for="(notice,index) in noticeData" :row="notice" goRouteName="notice-show" :paramObject="{noticeid:notice.id}" :key="index" :index="index" ></item>
    </div>
</template>

<script>
import Item  from "@/views/components/listData/item"
import ListTitle  from "@/views/components/listData/title"
export default {
    components:{
        Item,
        ListTitle
    },
    props:{
        noticeData:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
    
        }
    }
}
</script>