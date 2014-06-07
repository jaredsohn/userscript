// ==UserScript==
// @name           Youku.API.Parser
// @namespace      Youku.API.Parser
// @version        0.12
// @updateURL      https://userscripts.org/scripts/source/131926.meta.js
// @downloadURL    https://userscripts.org/scripts/source/131926.user.js
// @match          http://v.youku.com/*
// ==/UserScript==

(function () {
	'use strict';
	function runScript(callback) {
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}
	function main(){
		function obj2str(a){var b=[],d;for(d in a)"function"!==typeof a[d]&&b.push(encodeURIComponent(d)+"="+encodeURIComponent(a[d]));return b.join("&")}function AjaxUtil(){}function getReadyStateHandler(a,b){return function(){4===a.readyState&&(200===a.status?b&&b(a.responseText):alert("HTTP error: "+a.status))}} AjaxUtil.prototype.sendRequest=function(a,b,d,c,g){var f="",e="";c&&(e=obj2str(c));c=new XMLHttpRequest;switch(a){case "GET":e&&(b+="?"+e);c.open(a,b,d);f=null;break;case "POST":e&&(f=e,c.open(a,b,d),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"));break;default:return!1}c.onreadystatechange=getReadyStateHandler(c,g);c.send(f)};
		var xmlhttp=new AjaxUtil();
		var CONSTANTS={
			api:'/player/getPlayList/VideoIDS/{VideoIDS}',
			url:'http://f.youku.com/player/getFlvPath/sid/{sid}_{part}/st/{st}/fileid/{fileid}?K={K}',
			map:{
				flv:'sd',
				mp4:'hd',
				hd2:'hd2'
			}
			// reg:/id_([^.]+)/
		};
		function parseYouku(VideoIDS,callback){
			function parseAPI(response){
				var json;
				try{
					json=JSON.parse(response);
				}catch(e){}
				if(json&&json.data[0]){
					var urls=getUrls(json.data[0]);
					callback(urls);
					return urls;
				}
			}
			function getUrls(data){
				var sid=new Date().getTime() + "" + (1000 + new Date().getMilliseconds()) + "" + (parseInt(Math.random() * 9000,10) + 1000);
				var map={
					flv:{
						sid:sid,
						fileid:'',
						st:'flv',
						K:[]
					},
					mp4:{
						sid:sid,
						fileid:'',
						st:'mp4',
						K:[]
					},
					hd2:{
						sid:sid,
						fileid:'',
						st:'flv',
						K:[]
					}
				};
				var urls={
					flv:[],
					mp4:[],
					hd2:[]
				};
				var streamfileids=data.streamfileids;
				var seed=data.seed;
				var segs=data.segs;
				(function(){
					for(var i in streamfileids){
						if(typeof streamfileids[i]==='string'){
							map[i].fileid=getFileid(streamfileids[i],seed);
							var segArr=segs[i];
							for(var j=0;j<segArr.length;++j){
								map[i].K.push(segArr[j].k);
							}
						}
					}
				})();
				(function(){
					for(var i in map){
						if(Object.prototype.toString.call(urls[i]).indexOf('Array')!==-1){
							var item=map[i];
							for(var j=0;j<item.K.length;++j){
								urls[i].push(getUrl({
									sid:item.sid,
									fileid:item.fileid.substring(0,8)+('0'+j).substring(-2)+item.fileid.substring(10),
									K:item.K[j],
									st:item.st,
									part:('0'+j).substring(-2)
								}));
							}
						}
					}
				})();
				return urls;
			}
			function getFileid(str,seed){
				var mixed = getMixString(seed);  
				var ids = str.split('*');  
				var fileid = "";
				var idx=0;
				for (var i = 0; i < ids.length; ++i) {  
					idx = parseInt(ids[i],10);  
					fileid += mixed.charAt(idx);  
				}  
				return fileid;  
			}
			function getMixString(seed){
				var mixed = "";
				var source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890";
				var len = source.length;
				for(var i=0;i< len;++i){
					seed = (seed * 211 + 30031) % 65536;
					var index = (seed / 65536 * source.length);
					var c = source.charAt(index);
					mixed += c;
					source = source.replace(c+'','');
				}
				return mixed;
			}
			function getUrl(param){
				//console.log(template(CONSTANTS.url,param));
				return template(CONSTANTS.url,param);
			}
			var api=template(CONSTANTS.api,{VideoIDS:VideoIDS});
			xmlhttp.sendRequest('GET', api, true,null,parseAPI);
		}
		function template(str,pairs){
			for(var i in pairs){
				if((str.indexOf(i)!==-1)&&(typeof pairs[i]==='string')){
					str=str.replace(new RegExp('{'+i+'}','g'),pairs[i]);
				}
			}
			return str;
		}
		function addCss(str) {
			var style = document.createElement('style');
			style.textContent = str;
			document.head.appendChild(style);
		}
		var g = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
		var id= g.videoId2;
		if(id){
			parseYouku(id,callback);
		}
		function callback(urls){
			var str='';
			var split='\n';
			for(var i in urls){
				if(urls[i].length){
					str+=CONSTANTS.map[i]+':'+split;
					str+=urls[i].join(split+split);
					str+=split+split;
				}
			}
			//console.log(str);
			var textarea=document.createElement('textarea');
			textarea.setAttribute('style', 'width:300px;height:200px');
			textarea.value=str;
			function onClick(){
				this.select();
				this.focus();
			}
			textarea.addEventListener('click',onClick,false);
			var holder=document.createElement('div');
			holder.innerHTML='<div class="toggle">toggle API<div>';
			addCss('.toggle{text-align:right;color:green;opacity:0.3;cursor:pointer}.toggle:hover{opacity:1}');
			holder.setAttribute('style', 'position:fixed;bottom:10px;right:10px');
			function onToggle(){
				if(holder.querySelector('textarea')){
					holder.removeChild(textarea);
				}else{
					holder.insertBefore(textarea, this);
				}
			}
			holder.querySelector('.toggle').addEventListener('click',onToggle,false);
			document.body.appendChild(holder);
		}
	}
	if (/firefox/gi.test(navigator.userAgent)) {
		main();
	} else {
		runScript(main);
	}
})();