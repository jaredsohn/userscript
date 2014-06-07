// ==UserScript==
// @name 神来一句转文字
// @version 3.2
// @namespace //代码@小柯_小哀@Fate Suzumiya@Yang-SKY
// @description 神来一句转文字
// @include http://tieba.baidu.com/*
// @include http://tieba.baidu.com/f*
// @updateURL      https://userscripts.org/scripts/source/166154.meta.js
// @downloadURL https://userscripts.org/scripts/source/166154.user.js
// @icon http://imgsrc.baidu.com/forum/pic/item/0c201229877a33b398250a79.jpg
// ==/UserScript==

var _type = 'day';
    // 今日最热 day
    // 本周最热 week
    // 本月最热 month
var isRandom = true;//是否随机
var _number = '50';//一次性取多少条。数量不宜设置太多




/*====================下方勿动=============================*/
var ____window = typeof unsafeWindow != 'undefined'?unsafeWindow:window;
var $ = ____window.$;
var ajax = typeof GM_xmlhttpRequest != 'undefined' ? GM_xmlhttpRequest : function(d) {
		var x = new XMLHttpRequest();
		x.open(d.method, d.url);
		x.onload = function() {
			if (x.readyState == 4) d.onload(x)
		};
		x.send()
	};
function getXiaohua(callback,postFun){
	ajax({
		method:"GET",
		url:'http://www.toutiao.com/api/essay/top/?callback=&tag=__all__&top_type='+_type+'&count='+_number+'&offset=0&_='+new Date().getTime(),
		onload:callback?callback:function(response){
			var msg=response.responseText;
			msg=eval('('+msg+')');
			var list = [];
			for(var i in msg.data){
				list.push(msg.data[i].content.replace('\n','<br>'));
			}
			localStorage['xiaohua'] = JSON.stringify(list);
			localStorage.xiaohuaCount = 0;
			localStorage['xiaohuaNumber'] = list.length;
			runXiaohua(postFun);
		}
	});
}
function runXiaohua(postFun){
	if(localStorage.xiaohua&&localStorage.xiaohua!='null'&&localStorage.xiaohuaCount<localStorage.xiaohuaNumber){
		var i = isRandom?parseInt(Math.random()*localStorage.xiaohuaNumber):localStorage.xiaohuaCount;
		localStorage.xiaohuaCount = localStorage.xiaohuaCount+1;
		var content = JSON.parse(localStorage.xiaohua)[i];
		postFun(content);
	}else{
		getXiaohua(null,postFun);
	}
}
function postReply(content){
	var data = ____window.rich_postor._getData();
	data.content = data.content +'<br><br>笑话✎_________'+ content;
	____window.PostHandler.post(____window.rich_postor._option.url,data,function(I){____window.rich_postor.showAddResult(I)},function(I){});	
}	
$(".pt_submit .subbtn_bg:last").after("<input id='xiaohua' style='margin-left:5px;'class='subbtn_bg' value='笑话' type='button'/>");
document.querySelector('#xiaohua')&&document.querySelector('#xiaohua').addEventListener('click',function(){runXiaohua(postReply)});