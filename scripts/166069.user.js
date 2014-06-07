// ==UserScript==
// @name        度娘的尾巴_增加天气日历信息
// @include     http://tieba.baidu.com/*
// @description 百度贴吧发帖自动添加小尾巴脚本
// @version     1.1.2 　修改版20130429
// @match	*://*.baidu.com/*
// @grant	GM_xmlhttpRequest
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant 	unsafeWindow
// @downloadURL   https://userscripts.org/scripts/source/166069.user.js
// @updateURL     https://userscripts.org/scripts/source/166069.meta.js  
// @author       原作者:封印的猫  Fate·Suzumiya  修改者:yuxingyc　
// @namespace     https://userscripts.org/scripts/show/166069
// ==/UserScript==


// 原作者的namespace	https://userscripts.org/scripts/show/150512
//主要修改部分:尾巴类型功能 替换为显示外站信息功能.　具体修改在代码上有说明.
// 这个脚本和某些贴吧脚本有冲突,如不能使用,可尝试只保留一个脚本 

//==============附加小尾巴修改处====================

//锁定5条尾巴,按照格式修改。例如 tail=["尾巴1","尾巴2","尾巴3","尾巴4","尾巴5"]; 
var tail=["小尾巴功能来自http://userscripts.org/scripts/show/166069快来试一试~","通过火狐浏览器发表","来自FireFox浏览器","火狐吧","该尾巴由火狐浏览器自动生成"]; 

//- --  --　-- 修改城市-　　--- --　--   -
var cityName="广州";//更改要获取天气信息的城市名字,如"北京"  .不能加"市"字

//修改天气尾巴显示的部分内容
var weatherMsg1="腾讯网天气信息 地球上的某个城市:";
var weatherMsg2="新浪网天气信息 地球上的某个城市:";


//修改天气尾巴开头的符号
var theBr="<br>　　　　✿ ";

//修改附加的小尾巴开头符号
var theBr2="<br>　　　　---- ";

//发帖时间是否显示 设置theDate=1 添加发帖时间;theDate=0 不添加发帖时间
var dateDisplay=1;




var SinaUrl="http://weather1.sina.cn/dpool/weather_new/forecast_new.php?city="+cityName+"&cf=c&vt=1";
var SosoUrl="http://m.wap.soso.com/weather/index.jsp?city="+cityName;
var weatherPic;
var MsgTail;
//---------- --新增代码--以上虚线内---- -- -- -- -- -- -- 









var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;
var style=GM_getValue('fontstyle','0');
var weiba=GM_getValue('tailstyle','0');

 
/*--------------被删除的的代码
//==============空格微调处====================
var lh=32; var lH=30;      //修改1h（普通）和1H（粗体）的值，值越大空格越多
var space="　";
var Space="　";

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
--------------*/



//增加下拉式列表
//---修改了代码  尾巴类型修改为新浪天气腾讯天气等
$(".editor_users").after('<label>尾巴类型</label><select id="sltList" name="selectDropDown" style="position:relative; left:5px"><option name="style1" value="0">随机类型</option><option name="style1" value="1">新浪天气</option><option name="style1" value="2">腾讯天气</option><option name="style1" value="3">日历</option><option name="style1" value="4">不显信息</option></select>&nbsp;&nbsp;<small>天气信息:'+cityName+'</small>&nbsp;<label>添加</label><select id="tailList" name=ss style="position:relative; left:5px"><option id="tails0"  name="tails" value="随机">随机尾巴</option><option id="tails1" name="tails">尾巴1</option><option id="tails2" name="tails">尾巴2</option><option id="tails3" name="tails">尾巴3</option><option id="tails4" name="tails">尾巴4</option><option id="tails5" name="tails">尾巴5</option></select>');
document.getElementById("tails1").value=tail[0];
document.getElementById("tails2").value=tail[1];
document.getElementById("tails3").value=tail[2];
document.getElementById("tails4").value=tail[3];
document.getElementById("tails5").value=tail[4];
//增加按钮
$('.subbtn_bg:eq(0)').after('<input type="button" value="尾巴发表" class="subbtn_bg" id="Tail">');

switch(style)
{
case '0':$('option[name="style1"][value="0"]').get(0).selected = true;break;
case '1':$('option[name="style1"][value="1"]').get(0).selected = true;break;
case '2':$('option[name="style1"][value="2"]').get(0).selected = true;break;
case '3':$('option[name="style1"][value="3"]').get(0).selected = true;break;
case '4':$('option[name="style1"][value="4"]').get(0).selected = true;break;
case '5':$('option[name="style1"][value="5"]').get(0).selected = true;break;
case '6':$('option[name="style1"][value="6"]').get(0).selected = true;break;
}


switch(weiba)
{
case '0':$('option[name="tails"][id="tails0"]').get(0).selected = true;break;
case '1':$('option[name="tails"][id="tails1"]').get(0).selected = true;break;
case '2':$('option[name="tails"][id="tails2"]').get(0).selected = true;break;
case '3':$('option[name="tails"][id="tails3"]').get(0).selected = true;break;
case '4':$('option[name="tails"][id="tails4"]').get(0).selected = true;break;
case '5':$('option[name="tails"][id="tails5"]').get(0).selected = true;break;
}

//添加尾巴主函数
window.Tail = function()
{

/*这部分放到了addTril()
//保存配置
GM_setValue('fontstyle',$('option[name="style1"]:selected').val());
style=$('option[name="style1"]:selected').val();
GM_setValue('tailstyle',$("#tailList").get(0).selectedIndex.toString());
weiba=$("#tailList").get(0).selectedIndex.toString();
*/

var xx=$('#sltList').val();

var yy;
if(xx==0){yy=Math.floor(Math.random()*3+1)}//随机尾巴  random()*6改成了 random()*3
else{yy=xx};
//普通尾巴
if(yy==1)
{getSinaWeather();//新增 获取新浪天气
/*被删除的代码
color1='<p>';
color2='</p>';
*/
}
//粗体尾巴
if(yy==2)
{getQQweather();//新增 获取腾讯天气
/*被删除的代码
color1='<strong>';
删除color2='</strong>';
*/
}
//灰色尾巴
if(yy==3)
{getCalendar();//新增 获取新浪日历
/*被删除的代码
color1='<span class="apc_src_wrapper">';
color2='</span>';
space+="　";
*/
}
//红色尾巴
if(yy==4)
{

GM_setValue ("BaiduMsgTail","");//新增 清空保存在本地的外站信息
/*被删除的代码
color1='<span class="edit_font_color">';
color2='</span>';
*/
}
//红色粗体尾巴
if(yy==5)
{
//color1='<span class="edit_font_color"><strong>';
//color2='</strong></span>';
}
//小字尾巴
if(yy==6)
{
//color1='<span class="apc_src_wrapper"><span class="edit_font_normal">';
//color2='</span></span>';
}
/*这部分放到了addTril()
var cnt=$("#edit_parent").find("div.tb-editor-editarea").html();
cnt=cnt+"<br><br><br><br><br>";

var aa=$("#tailList").get(0).selectedIndex;
var TAIL;
if (aa==0){TAIL=tail[Math.round(Math.random()*(tail.length-1))];}
else TAIL=$('#tailList').val();
*/

//if(yy==5||yy==2) TAIL=Space+color1+"————"+TAIL+color2;
//else if(yy==3||yy==6) TAIL=color1+space+"————"+TAIL+color2+'<img class="BDE_Image" width="1" height="1" src="http://imgsrc.baidu.com/forum/pic/item/4a50db03918fa0ecbbe378e8269759ee3c6ddbab.jpg" pic_type="3">';
//else
//TAIL=color1+space+"————"+TAIL+color2;

/*这部分放到了addTril()
cnt=cnt+TAIL+"<br>"
$("#edit_parent").find("div.tb-editor-editarea").html(cnt);
$('.subbtn_bg[value=" 发 表 "]').click();*/

window.setTimeout(addTril,2000);//新增代码

}




//新增 addTril()
function addTril(){
var Weather=GM_getValue("BaiduMsgTail");
GM_setValue('fontstyle',$('option[name="style1"]:selected').val());
style=$('option[name="style1"]:selected').val();
GM_setValue('tailstyle',$("#tailList").get(0).selectedIndex.toString());
weiba=$("#tailList").get(0).selectedIndex.toString();


var cnt=$("#edit_parent").find("div.tb-editor-editarea").html();
cnt=cnt+"<br><br><br><br><br>";

var aa=$("#tailList").get(0).selectedIndex;
var TAIL;
if (aa==0){TAIL=tail[Math.round(Math.random()*(tail.length-1))];}
else TAIL=$('#tailList').val();


//发内容增加了 外站信息Weathe
if(dateDisplay==1){
cnt=cnt+Weather+theBr+"发帖时间:"+ getLocalDate()+theBr2+TAIL;
}else cnt=cnt+Weather+theBr2+TAIL;

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



//－－－－－－－以下是新增加的代码－－－－－－－－－－－－－－

//日期加"0"


//-----新增发帖时间
function getLocalDate(){
var d = new Date();
 var years = d.getFullYear();
 var month = add_zero(d.getMonth()+1);
 var days = add_zero(d.getDate());
 var hours = add_zero(d.getHours());
 var minutes = add_zero(d.getMinutes());
 var seconds=add_zero(d.getSeconds());
 var ndate =years+"/"+month+"/"+days+" "+hours+":"+minutes+":"+seconds;
return ndate;
}
function add_zero(temp)
{
 if(temp<10) return "0"+temp;
 else return temp;
}
//--------------------



function changeCity(){
alert(1);
}

//获取新浪网公历农历信息
function getCalendar(){
GM_xmlhttpRequest({
method: 'GET',
url: 'http://3g.sina.com.cn/dpool/astro/hdjr/?vt=1',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(responseDetails) {
str=responseDetails.responseText;
 str=str.replace(/(\r)?\n/g,"");
// alert(str);
ree = new RegExp("每日吉凶查询.*?<\/a><br\/>","i");
SinaCalendar=str.match(ree)[0];

SinaCalendar=SinaCalendar.replace(/<a hre.*?>/i,"").replace("<\/a>","").replace(/每日吉凶查询\">.*?2013年每日吉凶查询/,"")+"XXXX";
//SinaCalendar=String(SinaCalendar);
MsgTail=SinaCalendar.replace("<br/>XXXX","").replace(/<br\/>/g,theBr);
GM_setValue ("BaiduMsgTail",MsgTail);
}
});
}

//获取搜搜网天气信息
function getQQweather(){

GM_xmlhttpRequest({
method: 'GET',
url: SosoUrl,
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(responseDetails) {
str=responseDetails.responseText;
 str=str.replace(/(\r)?\n/g,"");
var cityeee = new RegExp("对不起","i");
if(!cityeee.test(str)){

ree = new RegExp("搜搜天气.*?更新\]","i");
qqweather=str.match(ree)[0];
qqweather=qqweather.replace("<br \/>","").replace(/<br \/>.*?其他城市/i,"")
qqweather=qqweather.replace(/<.*?>/g,"").replace(/\&#160;/g," ").replace("搜搜天气\">"," ").replace("] "," ")
qqweather=String(qqweather);

rdd = new RegExp("\" src=\".*?\gif","i");
weatherPic=str.match(rdd)[0];
 weatherPic=weatherPic.replace("\" src=\"","");
 weatherPic=String(weatherPic);
 baiduPic="<img class=\"BDE_Smiley\" src=\""+weatherPic+"\" height=\"30\" width=\"30\"></img>"

MsgTail=theBr+weatherMsg1+theBr+qqweather;
GM_setValue ("BaiduMsgTail",MsgTail);
}
else alert("腾讯网暂无"+cityName+"市天气信息");

}
});

}
//获取新浪网天气信息
function getSinaWeather(){

GM_xmlhttpRequest({
method: 'GET',
url: SinaUrl,
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(responseDetails) {
str=responseDetails.responseText;
 //str=str.replace(/(\r)?\n/g,"");
var cityfff = new RegExp("暂无当前城市","i");
if(!cityfff.test(str)){
ree = new RegExp("<img src=\".*?version","i");
weatherPic=str.match(ree)[0];
 weatherPic=weatherPic.replace("<img src=\"","").replace("\?version","");
weatherPic=String(weatherPic);
//alert(weatherPic)

rdd = new RegExp("今天.*?<br/>","i");
weatherDate=str.match(rdd)[0];
 weatherDate=weatherDate.replace("<br/>","天气预报");
 weatherDate=String(weatherDate);
// alert(weatherDate);
 
 str=str.replace(/(\r)?\n/g,"");
weatherPic=String(weatherPic);
raa = new RegExp("北京时间.*?<br/>-->","i");

weatherText=str.match(raa)[0];
baiduPic="<img class=\"BDE_Smiley\" src=\""+weatherPic+"\" height=\"50\" width=\"50\"></img>"
weatherText=weatherText.replace("北京时间","").replace("<br/>-->","发布　")

rxx = new RegExp("明天.*?<br/>","i");
tomorrow1=str.match(rxx)[0];
 tomorrow1=tomorrow1.replace(/<.*?>/g,"").replace("明天 ","明天").replace(" (","(");
 tomorrow1=String(tomorrow1);


rww = new RegExp("今天.*?生活指数","i");
today1=str.match(rww)[0];
today1=today1.replace(/<.*?>/g," ");
today1=today1.replace("-->","").replace(")   ",")").replace("生活指数",""); 

MsgTail=theBr+weatherMsg2+weatherText+theBr+today1+theBr+tomorrow1;

GM_setValue ("BaiduMsgTail",MsgTail);
}
else alert("新浪网暂无"+cityName+"市天气信息");

}
});
}


//--------------