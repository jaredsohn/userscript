// ==UserScript==
// @name		NGA Tags
// @namespace	ngacn
// @author		风昔
// @description	NGA Tags
// @version		1.1.9
// @match		http://bbs.ngacn.cc/*
// @include		http://bbs.ngacn.cc/*
// @match		http://nga.jctrl.org/*
// @include		http://nga.jctrl.org/*
// @updateURL	http://userscripts.org/scripts/source/178898.meta.js
// @downloadURL	http://userscripts.org/scripts/source/178898.user.js
// @run-at		document-start
// ==/UserScript==

(function(window, undefined) {
	
	'use strict';
	
	var serverUrl = "http://nga.jctrl.org",
	postTables = [],	
	encode = function(input){
		input = input.replace(/\r\n/g, "\n");
		var utftext = "";

		for ( var n = 0; n < input.length; n++) {

			var c = input.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return escape(utftext);
	}, createDom = function(html){
		var tmp = document.createElement("div");
		tmp.innerHTML = html;
		return tmp.childNodes[0];
	}, getUid = function(d){
		var list = d.getElementsByTagName("a");
		for(var i = 0; i < list.length; i++){
			if(list[i].name == "uid"){
				return list[i].innerText || list[i].textContent;
			}
		}
	}, setCookie = function(c_name,value, expire){ 
		var expiredays = expire || 1;
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}, getCookie = function (c_name){
		var cookies = document.cookie.split( ';' );
		var cookie = '';
		for(var i=0; i<cookies.length; i++) {
			cookie = cookies[i].split('=');
			if(cookie[0].replace(/^\s+|\s+$/g, '') == c_name) {
				return (cookie.length <= 1) ? "" : unescape(cookie[1].replace(/^\s+|\s+$/g, ''));
			}
		}
		return "";
	}, curId = window["__CURRENT_UID"] || getCookie("ngaPassportUid") || 0,
	Panel = function(tags, parent){
		var tag, 
		last = '',
		uid = getUid(parent),
		frame = createDom('<div style="margin-top: 5px;"><div style="clear: both;float: none;"></div></div>'),
		input = createDom('<span><input type="text" style="height:20px; width: 50px;padding: 2px;float: left; border:1px solid #FFF9E7; background-color: #EFE9D7; border-bottom: 1px solid #DFD9C7; border-right: 1px solid #DFD9C7; margin: 2px;"></input></span>');
		frame.insertBefore(input, frame.lastChild);
		
		if(tags.hasOwnProperty(uid)){
			tags = tags[uid];
		}
		
		for(var i =0; i < tags.length; i++){
			
			if(tags[i].addTo != uid){
				continue;
			}
			
			tag = createDom('<div style="color: #121C46; cursor: pointer; float: left; padding: 2px 6px 2px 6px; border-color: #FFF9E7; background-color: #EFE9D7; border-bottom: 1px solid #DFD9C7; border-right: 1px solid #DFD9C7; margin: 2px;"></div>');
			tag.title = tags[i].content;
			if(tags[i].content.length > 4){
				tag.textContent = tag.innerText = tags[i].content.substr(0,4) +"..";
			}else{
				tag.textContent = tag.innerText = tags[i].content;
			}
			
			if(getCookie(tags[i].id) == '1'){
				tag.style.cursor = "";
			}
			
			tag.onclick = (function(id, to){
				return function(){
					setCookie(id,1);
					if(this.style.cursor == "pointer"){
						this.style.cursor = "";
						
						GM_xmlhttpRequest({	method: 'GET',	url: serverUrl + "/api/tags/like?user="+ to + "&tid=" + id});
					}
				};
			})(tags[i].id, tags[i].addTo);
			
			tag.oncontextmenu = (function(id, to){
				return function(){
					setCookie(id,1);
					if(this.style.cursor == "pointer"){
						this.style.cursor = "";

						GM_xmlhttpRequest({	method: 'GET',	url: serverUrl + "/api/tags/unlike?user="+ to + "&tid=" + id});
					}
					return false;
				};
			})(tags[i].id, tags[i].addTo);

			frame.insertBefore(tag, input);		
			
		}
		
		input = input.firstChild;
		
		input.onblur = function(){
			
			if(input.value==last || input.value == ''){
				return;
			}
			
			last = input.value;
			
			var request = "from=" + curId + "&to=" + uid + "&ctx=" + encode(last); 
			GM_xmlhttpRequest({	method: 'GET',	url: serverUrl + "/api/tags/add?" + request});
		};
		
		this.append = function(){
			var place = parent.getElementsByTagName("td")[0];
			place.appendChild(frame);
			
		};
	}, scriptFilter = function(e) {
		if (/temp/.test(e.target.baseURI)) {
			e.stopPropagation();
			e.preventDefault();
		}
	};
	

	document.addEventListener('beforeload', scriptFilter , true);

	window.addEventListener("beforescriptexecute",scriptFilter, true);
	
	document.addEventListener("DOMContentLoaded", function(){
		
		
		var uidd = document.getElementsByName("uid"),
		request = "_",
		tables = document.getElementsByTagName("table");
		
		for(var i =0; i < tables.length; i++){
			if (tables[i].className == "forumbox postbox"){
				postTables.push(tables[i]);
			}
		}
		
		if(postTables.length == 0 || uidd.length == 0){
			return;
		}
		
		for(var i = 0; i < uidd.length; i++){
			request += "&users=" + (uidd[i].innerText || uidd[i].textContent);
		}
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: serverUrl + "/api/tags?" + request,
			onload: function(jsonp) {
				
				(new Function("extCallBack",jsonp.responseText))(function(tags){
					for(var i =0; i < postTables.length; i++){
						new Panel(tags.d, postTables[i]).append();			
					}
				});
			}
		});
		
	});
	
	
})(window);

