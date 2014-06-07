// ==UserScript==
// @name        进入贴吧高级搜索
// @namespace   noe132
// @include     http://tieba.baidu.com/f*
// @include     http://tieba.baidu.com/p*
// @updateURL      https://userscripts.org/scripts/source/165458.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165458.user.js
// @icon	http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @grant GM_addStyle
// @version     1.1
// ==/UserScript==



var keyword = document.getElementById("wd1").value;
var opened = 0;
if(document.querySelectorAll("#frs_old_version").length == 0){
	var html = '<li><a id="advsearch">高级搜索</a></li>';
	document.getElementById("frs_nav_wrap").firstElementChild.innerHTML += html;
} else {
	var html = '<li class="small_tab"><a id="advsearch">高级搜索</a></li>';
	document.getElementById("frs_nav_wrap").firstElementChild.innerHTML += html;
}

var button = document.getElementById("advsearch");
button.addEventListener("click",tipbox,false);

		
function tipbox(){
	if(opened  == 0){
		var box = document.createElement("div")
		box.id = "searchbox"
		box.innerHTML = '<span class="s_tip">贴吧名</span><input id="s_barname"><span class="s_tip">关键字</span></input><input id="s_keyword"></input><span class="s_tip">用户名</span><input id="s_person"></input>';
		document.getElementById("advsearch").parentNode.appendChild(box);
		document.getElementById("s_barname").value = keyword;
		setTimeout(function(){document.getElementById("searchbox").setAttribute("style","opacity:1;")},10);
		document.getElementById("s_barname").addEventListener("keypress",asd,false);
		document.getElementById("s_person").addEventListener("keypress",asd,false);
		document.getElementById("s_keyword").addEventListener("keypress",asd,false);
		opened = 1;
	} else {
		document.getElementById("searchbox").setAttribute("style","opacity:0;")
		setTimeout(function(){
			var tmp = document.getElementById("searchbox");
			tmp.parentNode.removeChild(tmp);
		},500);
		opened = 0;
	}
}

function asd(e){
	if(e.keyCode == 13){openpage();}
}
function openpage(){
	var w_barname = document.getElementById("s_barname").value;
	var w_keyword = document.getElementById("s_keyword").value;
	var w_person = document.getElementById("s_person").value;
	if (w_keyword.length == 0){
		var link = 'http://tieba.baidu.com/f/search/ures?kw=' + w_barname + '&qw=' + w_keyword +'&rn=30&un=' + w_person + '&sm=1';
	} else {
		var link	= 'http://tieba.baidu.com/f/search/res?kw=' + w_barname + '&qw=' + w_keyword +'&rn=30&un=' + w_person + '&sm=1';
	}
	window.open(link);
	var tmp = document.getElementById("searchbox");
	tmp.parentNode.removeChild(tmp);
	opened = 0;
}



GM_addStyle(".nav_left li{position:relative;overflow:visible !Important;}div#searchbox{position:absolute;top:42px;z-index:10000000;border:1px solid #999;padding:4px 9px 4px 60px;background:rgb(234,236,239);box-shadow:0 0 3px #999;-moz-transition:0.5s;opacity:0;}#searchbox span{display:inline-block !Important;line-height:33px !important;padding:1px !important;color:#111;margin:0 !important;font-size:12px;font-weight:bold;position:absolute;left:10px;}#searchbox span:nth-of-type(1){top:4px;}#searchbox span:nth-of-type(2){top:31px;}#searchbox span:nth-of-type(3){top:58px;}#searchbox input{-moz-box-sizing:border-box !Important;-moz-appearance:none;height:23px !important;border:1px solid #999;height:19px;background:#F4F4F4 !important;display:block !Important;padding:1px 3px !important;width:140px;margin:5px 0 !important;background:rgb(234,236,239);box-shadow:0 0 3px #999;color:#111;font-size:12px;-moz-transition:0.3s;}#searchbox input:hover{box-shadow:0 0 3px #555;}#searchbox input:focus{box-shadow:0 0 2px #888 inset,0 0 1px #888;}")
