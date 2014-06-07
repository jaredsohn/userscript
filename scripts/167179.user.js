// ==UserScript==
// @name        标注平台辅助
// @namespace   www.baidu.com
// @description 贴吧标注平台辅助小脚本
// @include     http://tieba.baidu.com/cuseraudit/*
// @version     0.1
// ==/UserScript==
$("input[value='0']").attr("checked",true);//自动全部标注为无问题
//$("[type]='text'").attr("value","招聘网络挂机");
if ($(".dialogJbtn").length!=0) window.top.location.reload();//遇到无帖子 自动刷新页面
//回车提交
document.onkeydown = hotkey;
function hotkey(event) 
{
if(event.keyCode == 13) 
{
event.preventDefault();
$("button").click();
}
}
