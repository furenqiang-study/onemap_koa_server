//计算服务器响应时长的中间件
module.exports =(async (ctx,next)=>{
  //1、记录开始时间
  const start=Date.now();
  //2、让内层中间件执行
  await next();
  //3、记录结束时间
  const end=Date.now();
  //4、设置响应头 X-Response-Time
  const duration=end-start;
  ctx.set('X-Response-Time',duration+ 'ms')
})