import request from '@/utils/request'

export function fileUpload(data) {
  return request({
    url: 'files/upload',
    method: 'post',
    data: data
  })
}

export function fileDelete(picture) {
  return request({
    url: 'files/delete',
    method: 'post',
    data: {
        fid: picture.fid,
        path: picture.path,
        name: picture.name
    }
  })
}

export function fileDownload(data){
  return request({
    url:"files/download",
    method:"post",
    data,
    responseType:'blob'
  })
}
