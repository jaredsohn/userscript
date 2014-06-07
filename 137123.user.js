// ==UserScript==
// @name           Auto_checkin_xiami.com
// @description    打开虾米网页面的时候自动签到。
// @version        0.32
// @author         @xavierskip
// @include        http://*.xiami.com/*
// @exclude        http://www.xiami.com/song/play?*
// @exclude        http://www.xiami.com/radio/iframe-adm/*
// @updateURL      https://userscripts.org/scripts/source/137123.meta.js
// @downloadURL    https://userscripts.org/scripts/source/137123.user.js     
// @license	       MIT License
// ==/UserScript==

var require = new XMLHttpRequest();
require.open('POST','http://www.xiami.com/task/signin',false);
require.send(null);
var response = require.responseText;

var add_widget = function(content){
	// onload css
	var elm = document.createElement('link');
	elm.setAttribute('rel','stylesheet');
	elm.setAttribute('type','text/css');
	elm.setAttribute('href','http://xavierskips.googlecode.com/svn/trunk/debug.css');
	if(typeof elm != undefined){
		document.getElementsByTagName('head')[0].appendChild(elm);
	};
    // CheckIn  tipsS
	var div = document.createElement('div');
	div.setAttribute('id','checkin_widget');
	div.innerHTML = content;
	document.getElementsByTagName('body')[0].appendChild(div);
	// close button
	var del = document.getElementById('checkin_widget'),
	    Close = document.getElementById('Close');
	// close 
    Close.onclick = function(){
    	del.parentNode.removeChild(del);
    }
};

function tip(content){
	var tip = document.getElementById("top_reg");
	tip.setAttribute('id','tip');
	tip.innerHTML = content;
}

//main
if (response == ''){
	var content = '要想自动签到请先登录>>>>';
	tip(content);
}else{
	if(location.href == "http://www.xiami.com/"&&document.getElementsByClassName("checkin text")[0] != null){
		var checkin_text = document.getElementsByClassName("checkin text")[0];
		checkin_text.className="checked text";
		checkin_text.innerHTML = response+'天<span>已连续签到</span>';
	};
	var content = '<div id="response"><span class="Font_33">' +response+ '</span><span class="Font_9">天</span><p class="Font_13">连续签到</p></div><div id="Close">×</div>';
	add_widget(content);
};