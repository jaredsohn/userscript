// ==UserScript==
// @name        贴吧_签名亮了(需要ABP)
// @namespace   yuxingyc
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct=*
// @include     http://tieba.baidu.com/f?kz=*
// @downloadURL	https://userscripts.org/scripts/source/173579.user.js
// @updateURL	https://userscripts.org/scripts/source/173579.meta.js
// @version     1.2
// ==/UserScript==

/*

使用前请在Adblock Plus添加过滤规则tieba.baidu.com##.j_user_sign

*/

var $=unsafeWindow.$;
var num=0;  
$(".d_sign_split").each(function(){this.style.display="none"});
$(".j_user_sign").each(function(){	
	var img=document.createElement("img");     
	img.width= $(this).attr("width");
	img.height= $(this).attr("height");
	img.style.display="none";
	img.title="点击隐藏";    
	var a=document.createElement("a");
	a.style="float:right;  position: relative;  left: -45px;color:gray";
	a.href="javascript:;";
	a.innerHTML="显示签名档";     
	$(this).after(img,a);
	$(img).click(function()
	{
		this.style.display="none"; 
		$(this).next().css({"display":"block"});   
	});
	
	$(a).click(function()
	{
		$(this).hide();
		$(this).prev().css({"display":"block"});				
		$(this).prev().prev().prev().css({"display":"block"});				
		$(this).prev()[0].src=$(this).prev().prev()[0].src;     		
	});     
	var str=$(this).prev().prev().find(".j_lzl_m_w")[0].textContent;
	var test1=/签名/.test(str);
	a.style.display=test1?"block":"none";	
});
var c=$(".core_reply:eq(0)").next();
if(c[0].className=="d_sign_split")
{
	c.next().next().next()[0].style.display="block";
}
