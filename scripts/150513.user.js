// ==UserScript==
// @name        Tieba Tail
// @include     http://tieba.baidu.com/*
// @version     1
// @grant GM_getValue
// @grant GM_setValue
// @grant unsafeWindow
// ==/UserScript==
var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;

style=3;  //默认字体。1.no 2.正常 3.灰色 4.红色 5.蓝色
var tail="————来自火狐浏览器";  //尾巴
var lh=36;       //值越高空格越多
var space="　";
var color1="";		//字体part1
var color2="";		//字体part2
//判断设定空格长度
if(tail.length<lh)
{
for(var i=0;i<lh-tail.length;i++){space+="　";}
}

//增加单选框
$(".editor_users").after('<label style="display: inline;"><input type="radio" name="style1" id="no">无</label><label style="display: inline;"><input type="radio" name="style1" id="normal">正常</label><label style="display: inline;"><input type="radio" name="style1"  id="grey">灰</label><label style="display: inline;"><input type="radio"name="style1" id="red">红</label><label style="display: inline;"><input type="radio" name="style1" id="blue">蓝</label>');
//增加按钮
$('.subbtn_bg:eq(0)').after('<input type="bottom" value="Tail" class="subbtn_bg" id="Tail" >');

switch(style)
{
case 1:$('#no').get(0).checked=true;break;
case 2:$('#normal').get(0).checked=true;break;
case 3:$('#grey').get(0).checked=true;break;
case 4:$('#red').get(0).checked=true;break;
case 5:$('#blue').get(0).checked=true;break;
}

//添加尾巴函数
window.Tail = function()
{
if($('#no').get(0).checked==true)
{
$(".subbtn_bg:eq(0)").click();
}
if($('#grey').get(0).checked==true)
{
color1='<span class=\"apc_src_wrapper\">';
color2='</span>';
}
if($('#red').get(0).checked==true)
{
color1='<font color=\"#E10602\">';
color2='</font>';
}
if($('#blue').get(0).checked==true)
{
color1='<a _moz_dirty="" href="javascript:void (0)">';
color2='</a>';
}

var cnt=$("#edit_parent").find("div.tb-editor-editarea").html();
cnt=cnt+"<br><br><br><br><br>"+color1+space+"————"+tail+color2;
$("#edit_parent").find("div.tb-editor-editarea").html(cnt);
$(".subbtn_bg:eq(0)").click();
}
//事件监听
var f= document.getElementById("Tail");
f.addEventListener("click",Tail,false);
//快捷键 shift+enter
document.onkeydown = hotkey;
function hotkey(event) 
{
if(event.shiftKey && event.keyCode == 13) 
{
event.preventDefault();
Tail();
}
}
