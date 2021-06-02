//4、websocket的使用
//引入websocket
const WebSocket=require('ws')
//引入path模块
const path=require('path')
//引入根据地址读取文件数据模块
const fileUtils=require('./file_utils')
//4-1、创建对象，绑定端口
const wss=new WebSocket.Server({
  port:9998
});

//服务端开启了监听
//4-2、监听连接事件
module.exports.listen=()=>{
  wss.on('connection',(client)=>{
    console.log("客户端连接成功。。。");
    //4-3、监听接收消息事件
    client.on('message',async (msg)=>{
      console.log("接收到来着客户端的信息："+msg);
      const msgJson=JSON.parse(msg)
      const action=msgJson.action
      if(action==='getData'){
        //如果是获取数据请求
        let filePath='../data/'+msgJson.chartName+'.json'
        filePath=path.join(__dirname,filePath)
        let jsonData= await fileUtils.getFileJsonData(filePath)
        msgJson.data=jsonData
        //客户端往服务端发送读取的数据
        client.send(JSON.stringify(msgJson))
      }else{
        //如果是全屏或者主题切换,就将数据分别发给所有客户端
        wss.clients.forEach(elient => {
          elient.send(msg)
        });
      }
    })
  })
}
