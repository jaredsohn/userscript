// ==UserScript==
// @name       我跟你讲，紫荆的种子，赞！
// @namespace  http://userscripts.org/users/hsinchu
// @version    1.2
// @description  紫荆点赞党们，来战个痛
// @match      http://zijingbt.njuftp.org/index.*
// @copyright  2012+, Hsinchu
// ==/UserScript==

var started_id,ended_id,torrentid,keeping_thx;
var td_tool=document.getElementById("tdTool");
var start,state;

function thank_one(){
	state.innerText="正在赞"+torrentid+"号";
	showToolLeft('tdTool','tdToolTrigger');
    thank(torrentid);
	torrentid++;
    if(torrentid>ended_id){
        clearInterval(keeping_thx);
        alert("从"+started_id+"到"+ended_id+"的种子已经赞完了。");
        location.href = "http://zijingbt.njuftp.org/index.html";           //赞完之后刷新回到主页面。
    }
}

function start_thx (){
    showToolLeft('tdTool','tdToolTrigger');
	started_id = prompt("请在下面输入开始的种子id",2162);
    showToolLeft('tdTool','tdToolTrigger');
    ended_id = prompt("请在下面输入结束的种子id",2162);
    started_id++;started_id--;ended_id++;ended_id--; //如果没有这一行下面判断大小有可能出错，原理应该是这样处理了一下变量类型，但又似乎不是，因为从我测试来看出错的几率较小。
	showToolLeft('tdTool','tdToolTrigger');
    
    
	if(started_id<=ended_id){
        
        state=document.createElement("a");
		state.setAttribute("class","top_menu");
        td_tool.removeChild(start);
        td_tool.appendChild(state);
        torrentid = started_id;
		keeping_thx = setInterval(thank_one,50);  //每0.05秒调用一次，不能简单把上面的thank_one函数整合在一起使用循环，因为这是要向服务器发送信息。再快我也没试过，还是不要太快的好，还是觉得每秒20次太快了点。
		
	}
    
    
}

start=document.createElement("a");
start.setAttribute("class","top_menu");
start.setAttribute("href","#");
start.innerText="我可要开始赞了";
start.onclick=start_thx;

td_tool.appendChild(start);               //点赞功能的启动键被我放在工具图标的附属菜单最底部。
