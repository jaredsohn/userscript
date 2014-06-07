// ==UserScript==
// @name Better Livejournal (Style=mine)
// @description In the Livejournal change href to the «style=mine»
// @include http://*.livejournal.com/*
// @exclude http://www.livejournal.com/update.bml*
// @copyright   2012+, Lomakin Anton (http://t0h.livejournal.com/)
// @version     3.7
// @licence     LGPL 3
// @grant       none
// ==/UserScript==
function GM_addScript(text) {
				var head = document.head || document.getElementsByTagName('head')[0];
				if (head) {
					var style = document.createElement("script");
					style.type = "text/javascript";
					style.appendChild(document.createTextNode(text));
					head.appendChild(style);
				}
			}
function SetLnk(item,returns){
	var href=item.href;
	if( href != "javascript:void(0);"  
      && href != ""  
      && href.indexOf('style=mine')==-1 
      && href.indexOf('livejournal.com')!=-1){ 
		add="";
		if((href.indexOf('#') + 1)){
			add=href.substring(href.indexOf('#'));
			href=href.substring(0,href.indexOf('#'));
			}
		if((href.indexOf('?') + 1))  href = href + '&style=mine'; else href = href + '?style=mine';  				
		if(returns==false)item.href=href+add;
		else return href+add;
		}
	}
window.ljstyle = new Object();
window.ljstyle = {
	setCookie: function(name, value) {
  	var date = new Date();
  	date.setTime(date.getTime()+(365*24*60*60*1000));
  	document.cookie = name + "=" + escape(value) + "; expires=" + date.toGMTString() + "; path=/; domain=.livejournal.com";
  },
	getCookie : function(name) {
		var cookie = " " + document.cookie;
		var search = " " + name + "=";
		var setStr = null;
		var offset = 0;
		var end = 0;
		if (cookie.length > 0) {
			offset = cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(";", offset)
				if (end == -1) end = cookie.length;
				setStr = unescape(cookie.substring(offset, end));
			}
		}
		return(setStr);
	},
  trim : function(str) { return str.replace(new RegExp("^[\\s]+", "g"), "").replace(new RegExp("[\\s]+$", "g"), ""); } ,
	DelLnk : function(){
		window.ljstyle.setCookie('in_my_style', 'n');
		var href=window.location.href;
		if((href.indexOf('?style=mine') + 1)) window.location=str_replace('?style=mine','',href);
		if((href.indexOf('&style=mine') + 1)) window.location=str_replace('&style=mine','',href);
		},
	reloadpage : function(){
		window.ljstyle.setCookie('in_my_style', 'y');
		window.location= SetLnk(window.location,true);
		}
	
	};
		
if( document.getElementById('friendstimes')==null){
  function str_replace ( search, replace, subject ) {	
    if(!(replace instanceof Array)){
      replace=new Array(replace);
      if(search instanceof Array)	while(search.length>replace.length)	replace[replace.length]=replace[0];
    }

    if(!(search instanceof Array))search=new Array(search);
    while(search.length>replace.length) replace[replace.length]='';

    if(subject instanceof Array){
      for(k in subject)	subject[k]=str_replace(search,replace,subject[k]);
      return subject;
    }

    for(var k=0; k<search.length; k++){
      var i = subject.indexOf(search[k]);
      while(i>-1){
        subject = subject.replace(search[k], replace[k]);
        i = subject.indexOf(search[k],i);
      }
    }
    return subject;
  }

  var checked='';
  if(window.ljstyle.getCookie('in_my_style')=='y'){ 
  	checked='checked';
  	window.ljstyle.setCookie("in_my_style", "y");
		if(window.location.href.indexOf('.bml')==-1 && window.location.href.indexOf('style=mine')==-1)
	  	window.location= SetLnk(window.location,true);
  	var elems=document.getElementsByTagName('A');
    for(var i=0; i<elems.length; i++) SetLnk(elems[i],false);
  	}
  var head=document.getElementsByClassName('w-cs-status');
	
	GM_addScript('try {window.ljstyle = new Object();\
window.ljstyle = {\
	setCookie: function(name, value) {\
  	var date = new Date();\
  	date.setTime(date.getTime()+(365*24*60*60*1000));\
  	document.cookie = name + "=" + escape(value) + "; expires=" + date.toGMTString() + "; path=/; domain=.livejournal.com";\
  },\
	getCookie : function(name) {\
		var cookie = " " + document.cookie;\
		var search = " " + name + "=";\
		var setStr = null;\
		var offset = 0;\
		var end = 0;\
		if (cookie.length > 0) {\
			offset = cookie.indexOf(search);\
			if (offset != -1) {\
				offset += search.length;\
				end = cookie.indexOf(";", offset)\
				if (end == -1) end = cookie.length;\
				setStr = unescape(cookie.substring(offset, end));\
			}\
		}\
		return(setStr);\
	},\
  trim : function(str) { return str.replace(new RegExp("^[\\s]+", "g"), "").replace(new RegExp("[\\s]+$", "g"), ""); } ,\
	DelLnk : function(){\
		window.ljstyle.setCookie(\'in_my_style\', \'n\');\
		var href=window.location.href;\
		if((href.indexOf(\'?style=mine\') + 1)) window.location=str_replace(\'?style=mine\',\'\',href);\
		if((href.indexOf(\'&style=mine\') + 1)) window.location=str_replace(\'&style=mine\',\'\',href);\
		},\
	reloadpage : function(){\
		window.ljstyle.setCookie(\'in_my_style\', \'y\');\
		window.location= SetLnk(window.location,true);\
		}	};} catch (e) {}');
	if(head.length>0){
    str=window.ljstyle.trim(head[0].innerHTML);
    head[0].innerHTML=str.substr(0,(str.length-4))
    								+' &nbsp;&nbsp;&nbsp;<label><input id="in_my_style" onchange="if(this.checked) window.ljstyle.reloadpage(); else window.ljstyle.DelLnk();'
    								+'" type="checkbox" '+checked+'> в вашем стиле</label></p>'; 
									}
	}
  else{
	setInterval(function UpdateLnk(){
	  var elems=document.getElementById('friendstimes').getElementsByTagName('A');
	  for(var i=0; i<elems.length; i++) SetLnk(elems[i],false);
		},5000);}