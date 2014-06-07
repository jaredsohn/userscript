// ==UserScript==
// @name        贴吧检测是否在线(tieba check online)
// @namespace   noe132
// @include     http://tieba.baidu.com/p/*
// @include	/http://tieba\.baidu\.com/f\?ct=[0-9]{9,12}&tn=baiduPost.*/
// @updateURL      https://userscripts.org/scripts/source/155882.meta.js
// @downloadURL    https://userscripts.org/scripts/source/155882.user.js
// @icon	http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version     1.2.1
// ==/UserScript==

var list = document.querySelectorAll(".p_author_name");
var lzllist = document.querySelectorAll(".lzl_cnt > .at");
var pager = document.querySelectorAll(".lzl_li_pager > .j_pager > a");
var name_list = {};
var progress_list = {};
var status_list = {};

for (x in list){
if (typeof(list[x]) != "object"){break;}
getstatue(list[x],1);
}

for (x in lzllist){
if (typeof(lzllist[x]) != "object"){break;}
getstatue(lzllist[x],2);
}

for (x in pager){
if (typeof(pager[x]) != "object"){break;}
pager[x].addEventListener("click",lzlreloadtimeout,false);
}
function lzlreloadtimeout(){
setTimeout(lzlreload,700);
}

function lzlreload(){
var lzllist_tmp = document.querySelectorAll(".lzl_cnt > .at");
for (x in lzllist_tmp){
	if (typeof(lzllist_tmp[x]) != "object"){break;}
	if (lzllist_tmp[x].getAttribute("setstatus") == 1){continue;}
	getstatue(lzllist_tmp[x],2);
}

}


function getstatue(name,side){
var getname = encodeURIComponent(name.firstChild.textContent);
if (typeof(name_list[getname]) == "undefined"){ //第一次获取
	progress_list[getname] = 1;
	name_list[getname] = 1;
	GM_xmlhttpRequest({
	method: "GET",
	referer: window.location,
	url: "http://www.baidu.com/p/" + getname + "?from=tieba",
	onload:function(response){
		if(response.responseText.indexOf("user-online")!=-1){
			status_list[getname] = 1;
			progress_list[getname] = 0;
			setstatus(name,1,side)
		} else {
			status_list[getname] = 0;
			progress_list[getname] = 0;
			setstatus(name,0,side)
		}
	}
	});
} else if (name_list[getname] == 1 && progress_list[getname] == 1){ //循环等待结果
	setTimeout(function(){getstatue(name,side)},500);
	return;
} else if (name_list[getname] == 1 && progress_list[getname] == 0){ //处理
	setstatus(name,status_list[getname],side);
}

}

//设置状态
function setstatus(name,status,side){
name.setAttribute("setstatus",1);
if (side == 1){
	if(status == 1){
		var statusdiv = document.createElement("div");
		statusdiv.className="user-online";
		name.parentNode.previousElementSibling.firstElementChild.lastElementChild.appendChild(statusdiv);
	} else {
		var statusdiv = document.createElement("div");
		statusdiv.className="user-offline";
		name.parentNode.previousElementSibling.firstElementChild.lastElementChild.appendChild(statusdiv);
	}
}
if (side == 2){
	if(status == 1){
		var statusdiv = document.createElement("div");
		statusdiv.className="user-online";
		name.parentNode.previousElementSibling.appendChild(statusdiv);
	} else {
		var statusdiv = document.createElement("div");
		statusdiv.className="user-offline";
		name.parentNode.previousElementSibling.appendChild(statusdiv);
	}
}
}

GM_addStyle(" \
.user-online,.user-offline{ \
width:8px; \
height:8px; \
position:absolute; \
bottom:0; \
right:0; \
background:#77BB70; \
z-index:100; \
border:3px solid #F4F4F4; \
box-shadow:0 0 3px #555; \
} \
\
.user-online{ \
background:#77BB70; \
} \
.user-offline{ \
background:#DD7070; \
} \
.lzl_p_p { \
position:relative; \
} \
")