// ==UserScript==
// @name		贴吧回复提醒
// @namespace	noe132
// @version		1.5.3
// @include		http://*
// @include		https://*
// @include		ftp://*
// @updateURL	https://userscripts.org/scripts/source/156203.meta.js
// @downloadURL	https://userscripts.org/scripts/source/156203.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// ==/UserScript==


var time; //刷新间隔(秒)
var working_on_tieba_pages;  // 是否在贴吧页面工作
var opened = 0;
var msg_reply,msg_reply_old = {};

//读取设置
function load(){
	if(GM_getValue("time") == undefined){
		time = 20;
		GM_setValue("time",20);
	}else{
		time = parseInt(GM_getValue("time"));
	}
	
	if(GM_getValue("working_on_tieba_pages") == undefined){
		working_on_tieba_pages = 1;
		GM_setValue("working_on_tieba_pages",1);
	}else{
		working_on_tieba_pages = parseInt(GM_getValue("working_on_tieba_pages"));
	}
	working_on_tieba_pages = GM_getValue("working_on_tieba_pages");
}
load();


GM_registerMenuCommand("打开设置窗口（贴吧回复提醒）", openSetting);

if(working_on_tieba_pages){
	if(window.location.href.indexOf("http://tieba.baidu.com") == 0){
		GM_addStyle("#com_userbar_message{display:none !important;}");
		document.getElementById("local_flash_cnt").parentNode.removeChild(document.getElementById("local_flash_cnt"));
	}
}else{
	if(window.location.href.indexOf("http://tieba.baidu.com") == 0){
		return;
	}
}



window.onbeforeunload =function(){GM_setValue("msg_reply","-1");}
if(GM_getValue("msg_reply") == undefined){
	GM_setValue("msg_reply","-1");
}



var refersh_id =  setInterval(function(){
	if(GM_getValue("msg_reply") != -1){
		check();
		setTimeout(function(){
			GM_setValue("msg_reply","-1");
		},1000);
	}
	//console.log(GM_getValue("msg_reply"));
},100);


GetInfo();




function check(){
	//console.log("checked");
	var _tmp_list = document.getElementsByClassName("addinfodiv");
	for(x in _tmp_list){
		if(typeof(_tmp_list[x]) != "object"){
			continue;
		}
		if(_tmp_list[x].getAttribute("type") == GM_getValue("msg_reply")){
			_tmp_list[x].parentNode.removeChild(_tmp_list[x]);
		}
	}
	if(_tmp_list.length == 0){
		maindiv.parentNode.removeChild(maindiv);
	}
}


	
// 获取消息列表信息
function GetInfo() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://message.tieba.baidu.com/i/msg/get_data/",
		headers: {
			"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			msg_reply = response.responseText;
            msg_reply = msg_reply.replace(/initItiebaMessage/g, "");
            msg_reply = msg_reply.replace(/;/g, "");
            msg_reply = msg_reply.replace(/\(/g, "");
            msg_reply = msg_reply.replace(/\)/g, "");
            msg_reply = JSON.parse(msg_reply);
			var _tmp = [];
			_tmp[0] = msg_reply[0];
			_tmp[1] = msg_reply[3];
			_tmp[2] = msg_reply[4];
			_tmp[3] = msg_reply[8];
			_tmp[4] = msg_reply[9];
			msg_reply = _tmp;
			if(msg_reply.toString() != "0,0,0,0,0" && msg_reply.toString() != msg_reply_old.toString()){
				msg_reply_old = msg_reply;
				AddMainFrame();
			}
			setTimeout(GetInfo,time*1000);
		}
	});
}

// 添加框架
function AddMainFrame(){
	if (self.frameElement && self.frameElement.tagName == "IFRAME") {} else {
		if(document.getElementById("tiebamsg_replybox")){
			maindiv.parentNode.removeChild(maindiv);
		}
		maindiv = document.createElement("div");
		maindiv.id = "tiebamsg_replybox";
		maindiv.addEventListener("mouseover", function(){maindiv.setAttribute("style", "");}, false);
		closebtn = document.createElement("div");
		closebtn.id = "closebtn";
		closebtn.innerHTML = "×";
		closebtn.addEventListener("click", cleanall, false);
		document.body.appendChild(maindiv);
		maindiv.appendChild(closebtn);
		maindiv.setAttribute("style", "right:0px;opacity:0.8;");
		document.body.appendChild(maindiv);
		setTimeout(function(){
			if(maindiv.getAttribute("style") != ""){
				maindiv.setAttribute("style", "");
			}
		},3000);
		AddInfo();
	}
}


//添加信息
function AddInfo() {
    for (x in msg_reply) {
		if (typeof(msg_reply[x]) == "number" && msg_reply[x] != 0) {
            addinfo(x, msg_reply[x]);
        }
    }
}

function addinfo(x, num) {
	x = parseInt(x);
    x += 1;
	
/*
		<addinfodiv>
			<span>X个</span>
			<a><span>新回复</span></a>
		</addinfodiv>

*/

    addinfodiv = document.createElement("div");
    addinfodiv.className = "addinfodiv";
    addinfodiv.setAttribute("type",x);
	
    ispan = document.createElement("span");
	ispan.innerHTML = num + "个";
	
    iaspan = document.createElement("span");
	
    ia = document.createElement("a");
    ia.target = "_blank";
	
	
    ia.addEventListener("mouseup",
    function(e) {
		if(e.button == 1 || e.button == 0){
			setTimeout(function(){ClearData(ia)},80);
		}
    },
    false);

    if (x == 1) {
        ia.setAttribute("type", 1);
        ia.href = "http://tieba.baidu.com/i/sys/jump?&type=fans";
        iaspan.innerHTML = "新粉丝";
    }
    if (x == 2) {
        ia.setAttribute("type", 2);
        ia.href = "http://tieba.baidu.com/i/sys/jump?&type=replyme";
        iaspan.innerHTML = "新回复";
    }
    if (x == 3) {
        ia.setAttribute("type", 3);
        ia.href = "http://tieba.baidu.com/i/sys/jump?&type=feature";
        iaspan.innerHTML = "新精品";
    }
    if (x == 4) {
        ia.setAttribute("type", 4);
        ia.href = "http://tieba.baidu.com/i/sys/jump?&type=atme";
        iaspan.innerHTML = "@提到我";
    }
    if (x == 5) {
        ia.setAttribute("type", 5);
        ia.href = "http://tieba.baidu.com/pmc/recycle?tab=syste";
        iaspan.innerHTML = "回收站提醒";
    }
	
	
    maindiv.appendChild(addinfodiv);
    addinfodiv.appendChild(ispan);
    addinfodiv.appendChild(ia);
    ia.appendChild(iaspan);
}

function ClearData(num) {
	GM_setValue("msg_reply",num.getAttribute("type")+""); // 设置清理类型
	
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://message.tieba.baidu.com/i/msg/clear_data?type=" + num.getAttribute("type"),
    });
	
	var _tmp_list = document.getElementsByClassName("addinfodiv");
	if(_tmp_list.length == 1){
		maindiv.parentNode.removeChild(maindiv);
	}else{
		num.parentNode.parentNode.removeChild(num.parentNode);
	}
}


function cleanall() {

	GM_setValue("msg_reply","0"); // 设置清理类型
	
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://message.tieba.baidu.com/i/msg/clear_data?type=1",
    });
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://message.tieba.baidu.com/i/msg/clear_data?type=4",
    });
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://message.tieba.baidu.com/i/msg/clear_data?type=5",
    });
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://message.tieba.baidu.com/i/msg/clear_data?type=9",
    });
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://message.tieba.baidu.com/i/msg/clear_data?type=10",
    });
	maindiv.parentNode.removeChild(maindiv);
}


function openSetting(){
	if(opened == 1){return;}
	opened = 1;
	var settingdiv = document.createElement("div");
	settingdiv.id = "reply_settingdiv"
	document.body.appendChild(settingdiv);
	var settingdiv_shadow = document.createElement("div");
	settingdiv_shadow.id = "reply_settingdiv_shadow"
	document.body.appendChild(settingdiv_shadow);
	
	settingdiv.innerHTML = '<span class="reply_refresh_span">刷新间隔</span><input id="reply_refresh_input" /><span class="reply_refresh_span">s</span> \
	<p><br /></p><span>是否在贴吧页面工作</span><span id="reply_out" class="reply_out"><span class="reply_in" id="reply_in"></span></span>';
	
	var reply_in = document.getElementById("reply_in");
	var reply_out = document.getElementById("reply_out");
	reply_refresh_input = document.getElementById("reply_refresh_input");
	
	//读取设置
	reply_refresh_input.value = time;
	if(working_on_tieba_pages){
		reply_in.setAttribute("style","left:0;background:#8C8;");
		reply_out.setAttribute("style","background:#BCB;");
	}else{
		reply_in.setAttribute("style","left:25px;background:#C88;");
		reply_out.setAttribute("style","background:#CBB;");
	}
	
	//添加动作
	reply_in.addEventListener("click",function(){
		if(working_on_tieba_pages){
			working_on_tieba_pages = 0;
			reply_in.setAttribute("style","left:25px;background:#C88;");
			reply_out.setAttribute("style","background:#CBB;");
		}else{
			working_on_tieba_pages = 1;
			reply_in.setAttribute("style","left:0;background:#8C8;");
			reply_out.setAttribute("style","background:#BCB;");
		}
	},false);
	settingdiv_shadow.addEventListener("click",function(){
		if(reply_refresh_input.value != parseInt(reply_refresh_input.value)){
			alert("时间输入错误！");
			reply_refresh_input.value = "";
			return;
		}
		GM_setValue("time",reply_refresh_input.value);
		GM_setValue("working_on_tieba_pages",working_on_tieba_pages);
		
		time = parseInt(GM_getValue("time"));
		working_on_tieba_pages = parseInt(GM_getValue("working_on_tieba_pages"));
		
		setTimeout(function(){
			settingdiv.setAttribute("style","opacity:0;");
		},10);
		setTimeout(function(){
			settingdiv_shadow.setAttribute("style","background:rgba(0,0,0,0,0);");
		},610);
		setTimeout(function(){
			settingdiv.parentNode.removeChild(settingdiv);
			settingdiv_shadow.parentNode.removeChild(settingdiv_shadow);
			opened = 0;
		},1610);
		
	},false);
	
	//设置样式
	setTimeout(function(){
		settingdiv_shadow.setAttribute("style","background:rgba(0,0,0,0.5);");
	},100);
	setTimeout(function(){
		settingdiv.setAttribute("style","opacity:1;");
	},700);
}

GM_addStyle(" \
#tiebamsg_replybox{\
position:fixed;\
bottom:40px;\
right:-135px;\
z-index:10000000000000000000000000000000;\
border:1px solid gray;\
padding:0;\
//background:-moz-linear-gradient(rgba(234,236,239,0.93), rgba(226,229,233,0.93));\
//background:-webkit-linear-gradient(rgba(234,236,239,0.93), rgba(226,229,233,0.93));\
background:rgba(235,235,235,0.8);\
box-shadow:0 0 3px #999;\
width:auto;\
min-width:150px;\
-moz-transition:0.4s ease box-shadow,0.4s ease right 0.4s,0.4s ease opacity 0.4s;\
opacity:0.3;\
}\
#tiebamsg_replybox:hover{\
box-shadow:0 0 5px 1px #999;\
right:0px;\
-moz-transition:0.4s ease box-shadow,0.4s ease right 0s,0.4s ease opacity;\
opacity:1;\
}\
.addinfodiv{\
height:30px;\
line-height:30px;\
padding:0 8px; \
border-bottom:1px solid gray; \
}\
.addinfodiv:hover{ \
background:rgba(220,230,240,0.8) !important; \
} \
.addinfodiv:last-child{ \
border:none !Important; \
} \
#tiebamsg_replybox span,\
#tiebamsg_replybox a,\
#tiebamsg_replybox a span{\
background:none;\
border:none;\
font-size:14px;\
color:#111;\
height:30px;\
line-height:30px;\
float:left;\
text-decoration:none;\
font-weight:normal; \
}\
\
div#closebtn{\
position:absolute;\
top:1px;\
right:2px;\
background:none;\
margin:0;\
padding:0;\
height:20px;\
width:20px;\
font-size:20px;\
line-height:26px;\
color:#111;\
cursor:pointer;\
}\
\
")

GM_addStyle(" \
#reply_settingdiv{ \
    width:300px; \
    height:80px; \
    background:rgba(235,235,235,0.8); \
    box-shadow:0 0 5px 2px #999; \
    position:fixed; \
    top:-moz-calc(50% - 100px); \
    left:-moz-calc(50% - 150px); \
    top:-webkit-calc(50% - 40px); \
    left:-webkit-calc(50% - 150px); \
    padding:10px; \
    z-index:1000; \
    -moz-transition:1s; \
    -webkit-transition:1s; \
    opacity:0; \
	text-align:center; \
} \
#reply_settingdiv_shadow{ \
    top:0; \
    left:0; \
    width:200%; \
    height:200%; \
    -moz-transition:1s; \
    -webkit-transition:1s; \
    background:rgba(0,0,0,0); \
    position:fixed; \
    z-index:999; \
} \
#reply_settingdiv > p{ \
    height:15px; \
    margin:0; \
    padding:0; \
} \
#reply_settingdiv > span{ \
    font-size:20px; \
    vertical-align:middle; \
} \
#reply_refresh_input{ \
    font-size:20px; \
    height:25px; \
    line-height:25px; \
    -moz-appearance:none !important; \
    -webkit-appearance:none !important; \
    border:none; \
    margin:0 4px 0 10px; \
    width:40px; \
    text-align:center; \
    background:rgba(235,235,235,0.8); \
    box-shadow:0 0 3px 0px #999; \
    -moz-transition:0.2s; \
    -webkit-transition:0.2s; \
    vertical-align:middle; \
} \
#reply_refresh_input:focus,#reply_refresh_input:hover{ \
    box-shadow:0 0 3px 1px #999; \
} \
 \
.reply_out{ \
    display:inline-block; \
    width:60px; \
    height:30px; \
    background:#BCB; \
    vertical-align:middle; \
    margin:0 0 0 12px; \
    position:relative; \
} \
.reply_in{ \
    display:inline-block; \
    width:35px; \
    height:30px; \
    -moz-transition:0.3s; \
    -webkit-transition:0.3s; \
    position:absolute; \
} \
")