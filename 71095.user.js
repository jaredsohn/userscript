// ==UserScript==
// @name stevpan
// @namespace none 
// @此脚本可以修正凯迪的音乐之声中windows media player插件的错误MIME类型，让它可以在Chrome, Firefox中正确播放，修正后也可以在其他论坛博客里使用。 
// @include http://*.kdnet.net/newbbs/dispbbs.asp?boardid=27*
// @include http://*.kdnet.net/newbbs/dispbbs.asp?boardID=27*
// @include http://*.kdnet.net/newbbs/savepost.asp*
// @version 1.0.0.0
// ==/UserScript==

// 我的博客：http://blog.sina.com.cn/100aspectsofthemoon
 



// 这是一个内嵌的函数

(function() { 

// 通过前面域名包含命令，只过滤凯迪音乐之声的帖子
// 关键在这里，要有一个正则表达式来搜索确定
// windows media player的格式，
// 这个每个论坛可能都有点不同， 
var str1= document.body.innerHTML; 
var tag1="clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95"; 
var reg1 = new RegExp(tag1, "gi"); 
var result; 


function process() 
{
// 调试用的
var rawstr= "百鬼丸"; 
var newstr= "百鬼丸脚本"; 
str1= str1.replace(new RegExp(rawstr, "i"), newstr); 

// 保证正确的MIME类型
rawstr= "x-oleobject"; 
newstr= "x-mplayer2"; 
str1= str1.replace(new RegExp(rawstr, "g"), newstr); 

// 保证不大合唱
rawstr= "flename=\"mp\""; 
newstr= "autostart=0"; 
str1= str1.replace(new RegExp(rawstr, "g"), newstr); 

//保证form和table不混在一起，form必须在table前。 
// 根据最新的chrome javascript错误报告： 
// 用户不能把input输入放在一个table中，更不容把一个form放在table里，
// 这种做法多年前常见。
// 这是对Firefox/chrome导致很多错误的缘故，而凯迪恰好就正是这么做的，代码可能很多年没有改动了。
// 把纠缠的form和table用正则表达式分开真的很麻烦，凯迪实在该用div/css了。

rawstr="<table cellpadding=\"1\" cellspacing=\"1\" class=\"tableborder1\">\\s*<form id=\"Dvform\" action=\"savepost.asp\\?action=sre\\&amp;method=fastreply\\&amp;BoardID=27\" method=\"POST\" name=\"Dvform\"><\\/form>";

newstr="<form id=\"Dvform\" action=\"savepost.asp?action=sre\&amp;method=fastreply\&amp;BoardID=27\" method=\"POST\" name=\"Dvform\"><input type=\"hidden\" name=\"followup\" value=\"" + document.getElementsByName("followup")[0].value  + "\"\/><input type=\"hidden\" name=\"RootID\" value=\""+ document.getElementsByName("RootID")[0].value + "\"\/><input type=\"hidden\" name=\"star\" value=\""+ document.getElementsByName("star")[0].value + "\"\/><input type=\"hidden\" name=\"TotalUseTable\" value=\""+ document.getElementsByName("TotalUseTable")[0].value + "\"\/><table cellpadding=\"1\" cellspacing=\"1\" class=\"tableborder1\">"; 


str1= str1.replace(new RegExp(rawstr, "i"), newstr); 

rawstr="<form name=\"preview\""; 
newstr="<\/form><form name=\"preview\""; 

str1=str1.replace(new RegExp(rawstr, "i"), newstr ); 

// update the page
document.body.innerHTML= str1;  
}
function donothing()
{
}

function deplayedprocess()
{
	str1= document.body.innerHTML; 
	result= str1.match(reg1); 
	if(result!=null && result.length> 1) 
		process(); 
	else 
		donothing(); 


}
result= str1.match(reg1); 
if(result!=null && result.length>1 )  
{
	process(); 	
}
else 
{
	setTimeout("deplayedprocess()", 500); 
}






 // 通过更改embeds[0]...的属性来修正不灵，只好全部过滤。
 // 有时候需要刷新一次页面。 

})();
