// ==UserScript==
// @name        贴吧彩字闪字
// @namespace   yuxingyc
// @description 彩字闪字通过www.czxiu.com网站在线生成
// @include     http://tieba.baidu.com/*
// @downloadURL	https://userscripts.org/scripts/source/172067.user.js
// @updateURL	https://userscripts.org/scripts/source/172067.meta.js
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_xmlhttpRequest
// @version     1.4
// ==/UserScript==
$=unsafeWindow.$;
var sss="<div id='colotextdiv'><select id='bdselect2013627' value='color'/><a href='javascript:;' id='setColorText' title='设为默认'>▥</a><input id='colorText' style='width:200px'><input id='bdinput2013627' type='button' value='生成图片'><input style='display:none'  id='colorTextSubmit' type='button' value='发表'></div>";
$(".pb_footer").before(sss);


function add(text1,value1){
document.getElementById("bdselect2013627").options.add(new Option(text1, value1));
}


function textToPic(w,o,z){

GM_xmlhttpRequest({
method: "GET",
url:"http://www.czxiu.com/d.php?s=default",
headers: {
'If-Modified-Since':'0',
},
onload:function(response){
	var a=response.responseText.replace(/\n|\r/g,"");
	var czMakey=a.match(/czMakey = '(\w+)'/)[1];	
	setImg(czMakey);
	
}
});	
function setImg(czMakey){
var url1 = 'http://www.czxiu.com/m.php?k=' + czMakey + '&w=' + encodeURIComponent(w.replace(/&nbsp;| /g,".")) + '&s='+style+'&p=0';//p=1透明背景

GM_xmlhttpRequest({
method: "GET",
url:url1,
headers: {
'If-Modified-Since':'0',
},
onload:function(response){
var str=response.responseText;
var rtype = str.substring(0,2);
var rdata = str.substring(4);


if (rtype != 'OK')alert(rdata);
else
{
var url = rdata.substring(2);
url ="http://www.czxiu.com/"+url.replace(/\+/, '%20').replace(/"|'|<|>/g,'');
$("#colorTextSubmit").show();
$("#ueditor_replace").html('<img unselectable="on" src="'+url+'" class="BDE_Image" onload="EditorUI.resizeImage(this, 560)">');
o.disabled=false;
z.disabled=false;	
}
}
});	
}
}
var style="default";
function color()
{		

	var z=document.getElementById("bdselect2013627");
	var v=z[z.selectedIndex].value.split("#");
	style=v[0];
	var w=$("#colorText").val().replace(/<[^>]+>/g,"");

	if (w == '')
	{
		alert('总该说点什么吧?');
	}
	else if (w.length > parseInt(v[1]))
	{
		alert('抱歉,此风格最多'+v[1]+'字');
	}else 
	{	
	
	z.disabled=true;
	var o=document.getElementById("bdinput2013627");
	o.disabled=true;
	setTimeout(function()
	{
		o.disabled=false;
		z.disabled=false;
	},5000);
	
	textToPic(w,o,z);	
	}


}
function check(){
add(GM_getValue("text1","G风格彩字[14]"),GM_getValue("valut1","default#14"));
add("G风格彩字[14]","default#14");
add("单行彩色字[20]","2011rbcolor#20");
add("浪漫英文[20]","romaneng#20");
add("丑人举牌[10]","080330paizi#10"); 
add("丑人拎牌[12]","biantaipai#12");
add("致富标语[16]","poster_wall2#16");
add("书写快乐[12]","pinkpen#12"); 
add("可爱的心[20]","070908_mrdx#20");
add("可爱闪字[14]","lovelyshine#14");
add("漂亮闪烁[14]","starshine#14");
add("记事本[16]","080405jsb#16");
add("小便条[20]","0809note#20");


document.getElementById("setColorText").addEventListener('click',function(){
var z=document.getElementById("bdselect2013627");
var a=z[z.selectedIndex].text;
var b=z[z.selectedIndex].value;
GM_setValue("text1",a);	
GM_setValue("value1",b);
alert(a+"已设为默认");
},false);

document.getElementById("bdselect2013627").addEventListener('change',color,false);

document.getElementById("bdinput2013627").addEventListener('click',color,false);
document.getElementById("colorTextSubmit").addEventListener('click',function(){
document.querySelector(".poster_submit").click();
},false);
}
check();
setTimeout(function(){
var aa=document.getElementById("ueditor_replace");
if(aa){
$("#colotextdiv").remove();
$(aa).after(sss);
check();
}
},3000);


