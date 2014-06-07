// ==UserScript==
// @name           WebQQ Robot
// @namespace      WebQQ
// @description    webQQ J):hº
// @include        http://web2.qq.com/
// ==/UserScript==


GM_registerMenuCommand("ClickMonitor",function(){GMaddEventHandle();});   //选择监听窗口菜单
GM_registerMenuCommand("about",function(){alert("make by x007007007\nEmail:x007007007@126.com\n")});

function GMwriteData(name,data){     //储存记录
    rootDOM=document.getElementById("GearMonkeyByXXCtoSaveVariable");
    if(rootDOM==null){
        rootDOM=document.createElement("div");
        rootDOM.setAttribute("id","GearMonkeyByXXCtoSaveVariable");
        rootDOM.setAttribute("style","display:none");
        document.getElementsByTagName("body")[0].appendChild(rootDOM);
    }
    dataList=rootDOM.childNodes;
    for(i=0;i<dataList.length;i++){
            if(dataList[i].getAttribute("name")==name){
                dataList[i].setAttribute("value",data);
                return true;
            }
    }
    dataDOM=document.createElement("input");
    dataDOM.setAttribute("name",name);
    dataDOM.setAttribute("value",data);
    dataDOM.setAttribute("class","GearMonkeyByXXCtoSaveVariable");
    dataDOM.setAttribute("type","hidden");
    rootDOM.appendChild(dataDOM);
}

function GMreadData(name){   //读取记录,储存在网页DOM中
    rootDOM=document.getElementById("GearMonkeyByXXCtoSaveVariable")
    if(rootDOM==null)return null;
    dataList=rootDOM.childNodes;
    for(i=0;i<dataList.length;i++){
            if(dataList[i].getAttribute("name")==name)return dataList[i].getAttribute("value");
    }
    return null;
}
function chat(id,getMsg){    //id用户(窗口)唯一标示,getMsg 收到消息
sendMsg=AI(getMsg);
if(sendMsg!=null)
sendMsgById(id,sendMsg);
}

function getNewMessageFromUI(id){    //从webQQ窗口中获取消息
    LastMessageDOM=document.getElementById("chatBox_msgList_"+id).lastChild;
    time=LastMessageDOM.getAttribute("time");
    msg=LastMessageDOM.getElementsByClassName("msgBody")[0].innerHTML;
        if(time!=null){
        info=LastMessageDOM.getElementsByClassName("msgHead")[0].firstChild;
        name=info.innerHTML;
        nick=info.getAttribute("title");
        return [true,nick,msg,name,time];
        }
    return [false,msg];
}
function sendMsgById(id,msg){
document.getElementById('chatBox_textArea_'+id+'_editArea').innerHTML=msg;
clickEvent=document.createEvent("MouseEvents");
clickEvent.initEvent("click", true, true);
document.getElementById('chatBox_sendMsgButton_'+id).dispatchEvent(clickEvent);  //触发发送按钮
}

window.GMStartMonitor=function(id){        //循环扫描核心
try{
    if(GMreadData(id+"_state")!="on"){alert(id+' Stop monitor');return 0;}        //检查保持状态 不为on退出
    info=getNewMessageFromUI(id);
    if(info[0]==true){
        if(GMreadData(id+"_time")==null &&GMreadData(id+"_time")==""){
            GMwriteData(id+"_time",info[4]);
            Msg=getNewMessageFromUI(id)[2];
            chat(id,Msg);
        }else{
            if(GMreadData(id+"_time")!=info[4]){
                GMwriteData(id+"_time",info[4]);
                Msg=getNewMessageFromUI(id)[2];
                chat(id,Msg);
            }
        }
    }
}catch(e){;};
setTimeout(function() { GMStartMonitor(id) },5000); // 对新消息刷新频率,过慢会导致丢失消息,过快浪费资源;此处必须用匿名函数..原因和作用域有关,和GreaseMonkey机制有关,具体不清楚了.....
}

function StartMonitorUI(){        //手动输入ID
var ID=prompt("ID","");
GMStartMonitor(ID);
}



function GMaddEventHandle(){        //添加监听按钮
root=document.getElementsByClassName("chatBox_nameArea");
for(i=0;i<root.length;i++){
EventP=document.createElement("p");
EventP.setAttribute("style","right:10px;font-color:blue;");
EventP.setAttribute("class","GMEventHandle");
EventP.appendChild(document.createTextNode("Monitor THIS!"));
Ele=root[i].appendChild(EventP);
document.addEventListener('click', function(event) { //监听回调
if(event.target.getAttribute("class")=="GMEventHandle"){
id=event.target.parentNode.getAttribute("id");
ID=id.substring(17);            //获取ID
GMwriteData(ID+"_state","on");        //保持状态 开启
GMStartMonitor(ID);            //开始监听
GMremoveEventHandle();            //删除按钮
}
},true)
}
}

function GMremoveEventHandle(){        //删除监听按钮
root=document.getElementsByClassName("GMEventHandle");
for(i=root.length-1;i>=0;i--){
if(root[i].parentNode)root[i].parentNode.removeChild(root[i]);
}
}


function AI(listen){
//listen 是收到消息

//返回字符串将作为消息发出

//在这里对消息处理,如果不发送,请返回null


return "Robot repeart "+listen;
}