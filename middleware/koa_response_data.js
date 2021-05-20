//处理业务逻辑的中间件，读取某个json文件的数据
const path=require('path');
const fileUtils=require('../utils/file_utils')
module.exports=(async (ctx,next)=>{
  const url = ctx.request.url;
  let filePath=url.replace('/api','');//请求路径： /api/seller 文件路径：../data/seller.json 去掉/api
  filePath='../data'+filePath+'.json';
  filePath=path.join(__dirname,filePath);
  // try {
  //   const json=await fileUtils.getFileJsonData(filePath);
  //   ctx.response.body=json;
  // } catch (error) {
  //   ctx.response.body={"success":"false"};
  // }
  // 调用工具函数读取文件内容
  try {
    const result = await fileUtils.getFileJsonData(filePath)
    // console.log('请求成功：',JSON.parse(result));
    // 设置响应体
    ctx.response.body = result
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: '读取文件内容失败,资源不存在',
      status: '404'
    }
    console.log('请求失败：',errorMsg);
    ctx.response.body = JSON.stringify(errorMsg)
  }
  await next();
})