/*
  服务器入口文件
*/

//1、创建koa对象
const Koa=require('koa');

//2、编写响应函数（中间件）
const app=new Koa();
//2-1、总耗时中间件
const respDurationMiddleware=require('./middleware/koa_response_duration');
app.use(respDurationMiddleware);
//2-2、响应头中间件
const respHeaderMiddleware=require('./middleware/koa_response_header');
app.use(respHeaderMiddleware);
//2-3、业务逻辑中间件
const respDataMiddleware=require('./middleware/koa_response_data');
app.use(respDataMiddleware);

//3、绑定端口号3000
app.listen(3000);

//4、websocket的使用
//引入websocket_utils.js
const webSocketService=require('./utils/websocket_utils')
//开启服务端的监听
webSocketService.listen()