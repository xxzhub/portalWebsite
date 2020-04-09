<!--
 * @Author: your name
 * @Date: 2020-02-23 18:16:10
 * @LastEditTime: 2020-03-20 09:31:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite_UI_vue\src\views\home\carousel.vue
 -->
<template>
        <div >
            <el-carousel style="margin-top: 20px;"  height="500px" >
                <el-carousel-item v-for="item in 4" :key="item">
                 
                </el-carousel-item>
            </el-carousel>
        </div>
</template>
<style>
.el-carousel__item:nth-child(2n){
    background-image: url('../../assets/images/beijing.png');
   /*  background-size: 100% 100%; */

    }
.el-carousel__item:nth-child(2n+1){
     background-image: url('../../assets/images/banner.png');
   /*   background-size: 100% 100%; */
    }
</style>