// ==UserScript==
// @name        tieba_Post
// @namespace   yuxingyc
// @description 在回复框发新帖子
// @include     http://tieba.baidu.com/*
// @grant		unsafeWindow
// @grant		GM_getValue
// @grant		GM_setValue
// @homepage 	http://userscripts.org/scripts/show/168681
// @downloadURL	https://userscripts.org/scripts/source/168681.user.js
// @updateURL	https://userscripts.org/scripts/source/168681.meta.js
// @version     2.1
// ==/UserScript==

(function(){
var _windowBDxx = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var	$ = _windowBDxx.$;
var p=$("#tab_forumname").attr("href");
var a="http://tieba.baidu.com"+p;
var url1=location.href
var e=$("#edit_parent").find("div.tb-editor-editarea");
var b=GM_getValue('bdurl',"");
var z=/kw=/.test(url1);
if( url1==b)
{
	var r=GM_getValue('bdtext','');
	x=r.match(/.*?<br>/);
	$('#title1').val(x[0].replace(/<.*?>/g,""));
	x[0]="";
	e.html(r.match(/<br>.*/g).join("").replace("<br>",""));
	document.querySelector('td .tb-editor-editarea').focus();
	GM_setValue('bdurl',0);
	GM_setValue("bdtext",0);
	$('.subbtn_bg').click();
}
if(!z){
GM_setValue('bdurl',a);

$('span[class="subTip"]').after('<input style=" position:relative; left:40px;" id="ccc" type="button" class="subbtn_bg" value="发到首页">');


document.getElementById('ccc').addEventListener("click",function()
{
	GM_setValue("bdtext",e.html());
	location.href=a;
},false);
}
})();
