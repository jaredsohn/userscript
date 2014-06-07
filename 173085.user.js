// ==UserScript==
// @name        Tieba Tail-改（自用）
// @include     http://tieba.baidu.com/*
// @description 贴吧小尾巴
// @namespace	
// @version     1
// @author      
// ==/UserScript==
var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;
var style=GM_getValue('fontstyle','0');
var weiba=GM_getValue('tailstyle','0');

 
//==============尾巴修改处====================
var tail=["喵","喵喵","喵喵喵","真是肤浅","图样图森破"]; //锁定5条尾巴,按照格式修改。

//==============空格微调处====================
var lh=1; var lH=1;   //修改1h（普通）和1H（粗体）的值，值越大空格越多var lh=32; var lH=30;
var space=" ";
var Space=" ";

var color1="";		//字体part1
var color2="";		//字体part2
//判断设定空格长度

for(var i=0;i<tail.length;i++)
{
var length=tail[i].length;
if(length<lh)
{
for(var i=0;i<lh-length;i++){space+="　";}
}
}
//粗体
for(var i=0;i<tail.length;i++)
{
var length=tail[i].length;
if(length<lH)
{
for(var i=0;i<lH-length;i++){Space+="　";}
}
}

//增加下拉式列表
$(".subTip").after('<label>尾巴类型</label><select id="sltList" name="selectDropDown" style="position:relative; left:5px"><option name="style1" value="0">无</option><option name="style1" value="1">粗体</option><option name="style1" value="2">红色</option><option  name="style1" value="3">红色粗体</option></select>&nbsp;&nbsp;&nbsp;<label>选择尾巴</label><select id="tailList" name=ss style="position:relative; left:5px"><option id="tails0" name="tails">尾巴1</option><option id="tails1" name="tails">尾巴2</option><option id="tails2" name="tails">尾巴3</option><option id="tails3" name="tails">尾巴4</option><option id="tails4" name="tails">尾巴5</option></select>');
document.getElementById("tails0").value=tail[0];
document.getElementById("tails1").value=tail[1];
document.getElementById("tails2").value=tail[2];
document.getElementById("tails3").value=tail[3];
document.getElementById("tails4").value=tail[4];
//增加按钮subbtn_bg
$('.subTip:eq(0)').after('<input type="button" value="尾巴发表" class="subbtn_bg" id="Tail">');

switch(style)
{
case '0':$('option[name="style1"][value="0"]').get(0).selected = true;break;
case '1':$('option[name="style1"][value="1"]').get(0).selected = true;break;
case '2':$('option[name="style1"][value="2"]').get(0).selected = true;break;
case '3':$('option[name="style1"][value="3"]').get(0).selected = true;break;
}


switch(weiba)
{
case '0':$('option[name="tails"][id="tails0"]').get(0).selected = true;break;
case '1':$('option[name="tails"][id="tails1"]').get(0).selected = true;break;
case '2':$('option[name="tails"][id="tails2"]').get(0).selected = true;break;
case '3':$('option[name="tails"][id="tails3"]').get(0).selected = true;break;
case '4':$('option[name="tails"][id="tails4"]').get(0).selected = true;break;
}

//添加尾巴主函数
window.Tail = function()
{
//保存配置
GM_setValue('fontstyle',$('option[name="style1"]:selected').val());
style=$('option[name="style1"]:selected').val();
GM_setValue('tailstyle',$("#tailList").get(0).selectedIndex.toString());
weiba=$("#tailList").get(0).selectedIndex.toString();

var xx=$('#sltList').val();
var yy=xx;
//普通尾巴
if(yy==0)
{
color1='<p>';
color2='</p>';
}
//粗体尾巴
if(yy==1)
{
color1='<strong>';
color2='</strong>';
}
//红色尾巴
if(yy==2)
{
color1='<span class="edit_font_color">';
color2='</span>';
}
//红色粗体尾巴
if(yy==3)
{
color1='<span class="edit_font_color"><strong>';
color2='</strong></span>';
}
//空行行数"<br><br>"=2行
var cnt=$("#edit_parent").find("div.tb-editor-editarea").html();
cnt=cnt+"";

var TAIL=$('#tailList').val();

if(yy==3||yy==1) TAIL=Space+color1+"~"+TAIL+color2;
else
TAIL=color1+space+"~"+TAIL+color2;

cnt=cnt+TAIL+"<br>"
$("#edit_parent").find("div.tb-editor-editarea").html(cnt);
$('.subbtn_bg[value=" 发 表 "]').click();
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