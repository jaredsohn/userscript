// ==UserScript==
// @name          Tieba_Weather_Tail
// @include       http://tieba.baidu.com/*
// @description   百度贴吧发帖自动添加小尾巴脚本（灌水只需点击“尾巴发表”&“Shift+Enter”）
// @version       2013.5.11
// @match         *://*.baidu.com/*
// @grant         GM_xmlhttpRequest
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         unsafeWindow
// @downloadURL   http://userscripts.org/scripts/source/167984.user.js
// @updateURL     http://userscripts.org/scripts/source/167984.user.js
// @author        XiaotianChen
// @namespace     http://userscripts.org/users/XiaotianChen
// ==/UserScript==

// 原作者的updateURL      https://userscripts.org/scripts/source/150512.meta.js
// 原作者的downloadURL    https://userscripts.org/scripts/source/150512.user.js
// 原作者的namespace      https://userscripts.org/scripts/show/150512
// yuxingyc的updateURL    http://userscripts.org/scripts/source/166069.user.js
// yuxingyc的downloadURL  http://userscripts.org/scripts/source/166069.user.js
// yuxingyc的namespace    http://userscripts.org/scripts/show/166069
//主要修改部分:尾巴类型功能 替换为显示外站信息功能.　具体修改在代码上有说明.
// 这个脚本和某些贴吧脚本有冲突,如不能使用,可尝试只保留一个脚本 



//定义城市
var cityName = "广州";

//修改天气尾巴显示的部分内容
var weatherMsg1="腾讯网天气信息 羊城:";
var weatherMsg2="新浪网天气信息 羊城:";

//修改天气尾巴开头的符号
var theBr="<br>　　　　✿ ";

var SinaUrl="http://weather1.sina.cn/dpool/weather_new/forecast_new.php?city="+cityName+"&cf=c&vt=1";
var SosoUrl="http://m.wap.soso.com/weather/index.jsp?city="+cityName;
var weatherPic;
var MsgTail;
//------------新增代码--以上虚线内---- -- -- -- -- -- --

//--------------------

//-----新增发帖中文时间函数
Date.prototype.pattern=function(fmt) {         
       var o = {         
       "M+" : this.getMonth()+1, //月份         
       "d+" : this.getDate(), //日         
       //"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //12小时制         
       "h+" : this.getHours(), //24小时制         
       "H+" : this.getHours(), //小时         
       "m+" : this.getMinutes(), //分         
       "s+" : this.getSeconds(), //秒         
       "q+" : Math.floor((this.getMonth()+3)/3), //季度         
       "S" : this.getMilliseconds() //毫秒         
       };        
      var week = {         
       "0" : "天",         
       "1" : "一",         
       "2" : "二",         
       "3" : "三",         
       "4" : "四",         
       "5" : "五",         
       "6" : "六"        
       };         
       if(/(y+)/.test(fmt)){         
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
       }         
       if(/(E+)/.test(fmt)){        
         fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);         
       }         
       for(var k in o){         
           if(new RegExp("("+ k +")").test(fmt)){         
               fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
           }         
       }         
       return fmt;         
}       
//定义时间    
var date =new Date().pattern("现在是yyyy年MM月dd日 第q季度 EEE hh时mm分ss秒S毫秒");      
//-------------------------------------------------------------
//新增获取本地信息尾巴
//获取操作系统信息
var imfor="你使用的是:";
userAgent=window.navigator.userAgent.toLowerCase();

if(userAgent.indexOf("windows nt 6.1")>=1){var OS=" “优越”的 Windows 7系统 ";}
else
  if(userAgent.indexOf("windows nt 6.0")>=1){var OS=" “稍显逊色”的 Windows Vista系统 ";}
else
  if(userAgent.indexOf("windows nt 5.1")>=1){var OS=" 深藏功名的 Windows XP系统 ";}
else
  if(userAgent.indexOf("windows nt 5.2")>=1){var OS=" “过时”的 Windows 2003系统 ";}
else
  if(userAgent.indexOf("linux")>=1){var OS=" “稳定强悍”的 Linux系统 ";}
else
  if(userAgent.indexOf("mac")>=1){var OS=" “倍有面子”的 MacOS系统 ";}
else
  var OS="“非主流”系统，";
/*else {
var name=navigator.appName;
if(name=="Microsoft Internet Explorer"){"你用的是IE浏览器！";}
}*/

//获取浏览器信息
var logo="";
var fxlogo='<img class="BDE_Image" src="http://h.hiphotos.baidu.com/album/s%3D1100%3Bq%3D90/sign=3b084daba2cc7cd9fe2d30d809311a4e/aec379310a55b3197c63d43342a98226cefc17d9.jpg"></img>';
var chlogo='<img class="BDE_Image" src="http://a.hiphotos.baidu.com/album/s%3D1100%3Bq%3D90/sign=8499f45596dda144de0968b38287ebd3/d043ad4bd11373f00a4c3fd9a50f4bfbfbed0400.jpg"></img>';
var ielogo='<img class="BDE_Image" src="http://d.hiphotos.baidu.com/album/s%3D1100%3Bq%3D90/sign=ab7153b19e3df8dca23d8b90fd2149fa/d6ca7bcb0a46f21f65b70315f7246b600d33aef1.jpg"></img>';
var oplogo='<img class="BDE_Image" src="http://c.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=20949075908fa0ec7bc7660916ac28d3/9d82d158ccbf6c81c24e7eaebd3eb13533fa407e.jpg"></img>';


//document.write("你用的是火狐浏览器！版本是：Firefox/"+versionName+"<br>");


if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('microsoft internet explorer') < 0)){
logo=ielogo;
var Findex=userAgent.indexOf("msie ");
var versionName=userAgent.substr(Findex+"MSIE ".length,4);
var Browser="&“简洁华丽”的 MSIE"+versionName+"浏览器"+logo;
}
else
  if (navigator.userAgent.indexOf('Firefox') >= 0){
  logo=fxlogo;
  var Findex=userAgent.indexOf("firefox/");
  var versionName=userAgent.substr(Findex+"Firefox/".length,4);
  var Browser="&“耐操”的 Firefox/"+versionName+"浏览器"+logo;
  }
else
  if (navigator.userAgent.indexOf('Opera') >= 0){
  logo=oplogo;
  var Findex=userAgent.indexOf("opera ");
  var versionName=userAgent.substr(Findex+"Opera ".length,4);
  var Browser="&“昔日猛将”的 Opera"+versionName+"浏览器"+logo;
  }
else
  if (navigator.userAgent.indexOf('Chrome') >= 0){
  logo=chlogo;
  var Findex=userAgent.indexOf("chrome/");
    var versionName=userAgent.substr(Findex+"chrome/".length,4);
  var Browser="&“简便之至”的 Chrome/"+versionName+"浏览器"+logo;
  }
else
  {var Browser="&“非主流”浏览器";}

var imfor=imfor+OS+Browser;
//------------------------------------------------------------------------------
//自定义添加文字
var joke = "<br><b>>>>我读书少，乃们不要骗我<br>——女儿：妈妈，这个单词Chrome怎么读<br>——妈妈：这个呀~读/fai:ə'fɔks/，译为“火狐”<br>——灰太狼：嘿嘿~你会读吗~~~？<br>——女儿：Firefox！<br>！##%……&￥&￥&啊啊啊。。。。。。。。。。。。。" + new Date().pattern("<br><br>——观众朋友们晚上好，今天是yyyy年MM月dd日 EEE，荒淫收看装电视台。");
//添加类似贴吧签名虚线图片
var Bookmark='<img class="BDE_Image" height="11" width="560" src="http://imgsrc.baidu.com/forum/w%3D580/sign=6ca77dcee5dde711e7d243fe97edcef4/b03533fa828ba61e111605e44134970a314e5905.jpg"></img>';


//==============尾巴修改处====================
//锁定6条尾巴,按照格式修改。尾巴可自行组合。
var tail=[theBr+window.location.href+theBr+"发帖时间:"+date,
theBr+window.location.href+theBr+imfor+theBr+"发帖时间:"+date,
joke,
""];






var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;
var style=GM_getValue('fontstyle','0');
var weiba=GM_getValue('tailstyle','0');

//增加下拉式列表
//---修改了代码  尾巴类型修改为新浪天气腾讯天气等
$(".editor_users").after('<b>&nbsp;'+cityName+'<label>天气&日历</label><select id="sltList" name="selectDropDown" style="position:relative; left:5px"><option name="style1" value="0">随机外站信息</option><option name="style1" value="1">日历</option><option name="style1" value="2">新浪天气</option><option name="style1" value="3">腾讯天气</option><option name="style1" value="4">日历(红)</option><option name="style1" value="5">新浪天气(红)</option><option name="style1" value="6">腾讯天气(红)</option><option name="style1" value="7">日历(红/粗)</option><option name="style1" value="8">新浪天气(红/粗)</option><option name="style1" value="9">腾讯天气(红/粗)</option><option name="style1" value="10">不显示</option></select>&nbsp;&nbsp;<label>添加</label><select id="tailList" name=ss style="position:relative; left:5px"><option id="tails0"  name="tails" value="随机">随机尾巴</option><option id="tails1" name="tails">网址/时间</option><option id="tails2" name="tails">网址/OS&Bro/时间</option><option id="tails3" name="tails">Joke"读书少"</option><option id="tails4" name="tails">不显示</option></select>'+'</b>');


document.getElementById("tails1").value=tail[0];
document.getElementById("tails2").value=tail[1];
document.getElementById("tails3").value=tail[2];
document.getElementById("tails4").value=tail[3];

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
case '7':$('option[name="style1"][value="7"]').get(0).selected = true;break;
case '8':$('option[name="style1"][value="8"]').get(0).selected = true;break;
case '9':$('option[name="style1"][value="9"]').get(0).selected = true;break;
case '10':$('option[name="style1"][value="10"]').get(0).selected = true;break;
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

var xx=$('#sltList').val();

var yy;
if(xx==0){yy=Math.floor(Math.random()*2+1)}//随机尾巴 //原来的代码Math.floor(Math.random()*6+1)
else{yy=xx};

//新浪日历尾巴
if(yy==1)
{
  getCalendar();//新增 获取新浪日历
  color1='<p>';
  color2='</p>';
}

//新浪天气
if(yy==2)
{
  getSinaWeather();//新增 获取新浪天气
  color1='<p>';
  color2='</p>';
}

//腾讯天气
if(yy==3)
{
  getQQweather();//新增 获取腾讯天气
  color1='<p>';
  color2='</p>';
}

/*if(yy==3)
{
//被删除的代码 //灰色尾巴
color1='<span class="apc_src_wrapper">';
color2='</span>';
space+="　";
}*/

//新浪日历红色尾巴
if(yy==4)
{
  getCalendar();
  color1='<span class="edit_font_color">';
  color2='</span>';
}

//新浪天气红色尾巴
if(yy==5)
{
  getSinaWeather();
  color1='<span class="edit_font_color">';
  color2='</span>';
}

//腾讯天气红色尾巴
if(yy==6)
{
  getQQweather();
  color1='<span class="edit_font_color">';
  color2='</span>';
}

//新浪日历红色粗体尾巴
if(yy==7)
{
  getCalendar();
  color1='<span class="edit_font_color"><strong>';
  color2='</strong></span>';
}

//新浪天气红色粗体尾巴
if(yy==8)
{
  getSinaWeather();
  color1='<span class="edit_font_color"><strong>';
  color2='</strong></span>';
}

//腾讯天气红色粗体尾巴
if(yy==9)
{
  getQQweather();
  color1='<span class="edit_font_color"><strong>';
  color2='</strong></span>';
}

//不显示天气&日历
if(yy==10)
{
GM_setValue ("BaiduMsgTail","");//新增 清空保存在本地的外站信息
color1='<span class="edit_font_color">';
color2='</span>';
}

window.setTimeout(addTril,2000);//新增代码  设置超时时间

}




//新增 addTril()
function addTril(){
var Weather=GM_getValue("BaiduMsgTail");
GM_setValue('fontstyle',$('option[name="style1"]:selected').val());
style=$('option[name="style1"]:selected').val();
GM_setValue('tailstyle',$("#tailList").get(0).selectedIndex.toString());
weiba=$("#tailList").get(0).selectedIndex.toString();


var cnt=$("#edit_parent").find("div.tb-editor-editarea").html();
cnt=cnt+"<br><br><br><br>";

var aa=$("#tailList").get(0).selectedIndex;
var TAIL;
if (aa==0){TAIL=tail[Math.round(Math.random()*(tail.length-1))];}
else TAIL=$('#tailList').val();


//尾巴显示控制(天气&日历/网页信息尾巴)
cnt=cnt+Bookmark+color1+Weather+TAIL+color2;


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
function add_zero(temp)
{
 if(temp<10) return "0"+temp;
 else return temp;
}

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


//获取腾讯网天气信息
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
 baiduPic="<img class=\"BDE_Image\" src=\""+weatherPic+"\" height=\"30\" width=\"30\"></img>"

MsgTail=theBr+weatherMsg1+baiduPic+theBr+qqweather;
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
baiduPic="<img class=\"BDE_Image\" src=\""+weatherPic+"\" height=\"50\" width=\"50\"></img>"
weatherText=weatherText.replace("北京时间","").replace("<br/>-->","发布　")

rxx = new RegExp("明天.*?<br/>","i");
tomorrow1=str.match(rxx)[0];
 tomorrow1=tomorrow1.replace(/<.*?>/g,"").replace("明天 ","明天").replace(" (","(");
 tomorrow1=String(tomorrow1);


rww = new RegExp("今天.*?生活指数","i");
today1=str.match(rww)[0];
today1=today1.replace(/<.*?>/g," ");
today1=today1.replace("-->","").replace(")   ",")").replace("生活指数",""); 

MsgTail=theBr+weatherMsg2+weatherText+baiduPic+theBr+today1+theBr+tomorrow1;

GM_setValue ("BaiduMsgTail",MsgTail);
}
else alert("新浪网暂无"+cityName+"市天气信息");

}
});
}


