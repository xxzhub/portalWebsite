import request from "@/utils/request"

/**
 * 添加评论
 * @param {String} author 发布者
 * @param {Number} articleid 文章ID
 * @param {Number} articletype 文章类型
 * @param {String} content 评价内容
 * @param {String} ip 客户端ip 
 */
export function addComment({author,articleid,articletype,content,ip}){
    return request({
        url:"comment/addComment",
        method:"post",
        data:{
            author,
            articleid,
            articletype,
            content,
            ip
        }
    })
}

//分页获取评论详情
export function getComments({current,pageSize,articletype,articleid}){
    return request({
        url:"comment/getComments",
        method:"post",
        data:{
            current,
            pageSize,
            articletype,
            articleid
        }
    })
}

//点赞
export function giveOpinion({type,targetid}){
    return request({
        url:"knowledgeShare/giveOpinion",
        method:"post",
        data:{
            type,
            targetid
        }
    })
}