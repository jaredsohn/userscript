// ==UserScript==
// @name           Putao.Spender
// @namespace      Putao.Spender
// @description    Putao.Spender
// @match          https://pt.sjtu.edu.cn/userdetails.php?id=*
// ==/UserScript==

(function() {
	'use strict';
	var g=typeof unsafeWindow!=='undefined'?unsafeWindow:window;
	function trim(str,find){
		if(str.indexOf(find)===0){
			str=str.substr(find.length);
		}
		if(str.lastIndexOf(find)===str.length-find.length){
			str=str.substr(0,str.length-find.length);
		}
		return str;
	}
	function str2obj(str){
		var obj={};
		str=trim(str,'?');
		var arr=str.split('&');
		var split;
		for(var i=0;i<arr.length;++i){
			split=arr[i].split('=');
			obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
		}
		return obj;
	}
	function obj2str(obj){
		var arr=[];
		for(var i in obj){
			if(typeof obj[i]!=='function'){
				arr.push(encodeURIComponent(i)+'='+encodeURIComponent(obj[i]));
			}
		}
		return arr.join('&');
	}
	function AjaxUtil() {}
	function getReadyStateHandler(req, responseHandler) {
		return function () {
			if (req.readyState === 4) {
				if (req.status === 200) {
					responseHandler&&responseHandler(req.responseText);
				} else {
					console.log("HTTP error: " + req.status);
				}
			}
		};
	}
	AjaxUtil.prototype.sendRequest = function (method, url, async, param, callback) {
		var data='';
		var sParam='';
		if(param){
			sParam=obj2str(param);
		}
		var req=new XMLHttpRequest();
		switch(method){
			case 'GET':
				if(sParam){
					url+='?'+sParam;
				}
				req.open(method, url, async);
				data=null;
				break;
			case 'POST':
				if(sParam){
					data=sParam;
					req.open(method, url, async);
					req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				}
				break;
			default:
				return false;
		}
		req.onreadystatechange = getReadyStateHandler(req, callback);
		//req.open(method, url, async);
		req.send(data);
	};
	var xmlhttp=new AjaxUtil();
	var dom = document.createElement('div');
	dom.innerHTML='<a href="#">Spend your bonus on him/her.</>';
	dom.addEventListener('click',clickHandler,false);
	var title=document.getElementsByTagName('h1')[0];
	var parent=title.parentNode;
	//console.log(parent);
	while(parent.tagName.toLowerCase()!=='table'){
		//console.log(parent.tagName);
		parent=parent.parentNode;
	}
	parent.appendChild(dom);
	var tips = document.createElement('div');
	tips.innerHTML='<span>0</span> bonus paid';
	var current=tips.getElementsByTagName('span')[0];
	function clickHandler(e){
		e.preventDefault();
		if(confirm('This action may cost all your bonus, do you want to continue?')){
			parent.appendChild(tips);
			loop();
		}
		return false;
	}
	function proc(html){
		var regA=/page=p\d+#(\d+)>\d+<\/a>/ig;
		//console.log(html.match(regA));
		var regP=/&nbsp;<a href="\/userhistory\.php\?action=viewposts&id=\d+&page=(\d+)"><b>/ig;
		var url='';
		var arr=[];
		while(url=regA.exec(html)){
			arr.push(url[1]);
		}
		var next=regP.exec(html)[1];
		var callback=next?function(){current.innerHTML=next*arr.length*10;loop(next);}:false;
		pay(arr,callback);
	}
	function pay(arr,callback){
		var cb=false;
		for(var i=0;i<arr.length;++i){
			if(callback&&i===(arr.length-1)){
				cb=callback;
			}
			var data={postid:arr[i],rewards:10};
			xmlhttp.sendRequest('POST','/postreward.php',true,data,cb);
		}
	}
	function loop(page){
		var id=str2obj(location.search).id;
		var data={action:'viewposts',id:id};
		if(page){
			data.page=page;
		}
		xmlhttp.sendRequest('GET','/userhistory.php',true,data,proc);
	}
})();