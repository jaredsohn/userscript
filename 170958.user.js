// ==UserScript==
// @name        贴吧回复_收起#开展
// @namespace   yuxingyc
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct=*
// @include     http://tieba.baidu.com/f?kz=*
// @downloadURL	https://userscripts.org/scripts/source/170958.user.js
// @updateURL	https://userscripts.org/scripts/source/170958.meta.js
// @version     1.1
// ==/UserScript==

var $=unsafeWindow.$;

var y=1; //0默认收起 1默认展开

$("ul[class='lzl_post_hidden']").removeAttr("class");
$("p[class='lzl_more']").hide();
$("p[class*='pager_theme_2']").show();

var count=0;
$("a.lzl_link_unfold").each(function()
{	
	$(this).before("<input style='position:relative;' id='btn1_13616s"+count+"' class='btn_fold13616' type='button' value='-' >  <input style='position:relative;' id='btn2_13616s"+count+"' class='btn_unfold13616' type='button' value='+' >");
	count++;
});

if(y==0)f();

$("input[class='btn_unfold13616']").click(function()
{	
	uf();
	keepPosition(this);		
});

$("input[class='btn_fold13616']").click(function()
{		
	f();
	keepPosition(this);		
});
var count2=0;
function f()
{	
	$("a[class='lzl_link_unfold']").css({"display":"inline"});
	$("span[class='lzl_link_fold']").css({"display":"none"});	
	$("div[class*='core_reply_wrapper']").hide();	
	$("div[class*='core_reply_content']").hide();		
}
function uf(a)
{	
	$("div.core_reply_wrapper").each(function()
	{
		var s=$(this).prev().find(".lzl_link_unfold").html();;
		if(/\(/.test(s))$(this).show();		
	});	 
	$("div[class*='core_reply_content']").show();			
}
function keepPosition(This)
{
	var w=$(This).attr("id").split("s")[1];
	var num=parseFloat(w);
	var ccc=setInterval(function()
		{
			count2++;
			scrollTo(0,$(".core_reply_tail")[num+1].offsetTop);
			if(count2>16){count2=0;clearInterval(ccc);}			
		},50);
}