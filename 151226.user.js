// ==UserScript==
// @name        我喜欢的贴吧
// @namespace   noe132
// @include	/http://tieba\.baidu\.com/f\?ct=[0-9]{9,12}&tn=baiduPost.*/
// @include	http://tieba.baidu.com/p*
// @include	http://tieba.baidu.com/f?kw=*
// @include	http://tieba.baidu.com/f?ie=utf-8&kw=*
// @updateURL	https://userscripts.org/scripts/source/151226.meta.js
// @downloadURL    https://userscripts.org/scripts/source/151226.user.js
// @author	noe132
// @version	1.2.2
// ==/UserScript==

//设置全局变量
var panelOnLeft; //面板位置
var a = ""; // 贴吧数组
var b; //贴吧json字串
var apvalue //细节设置数组

function presetting(){
//barnames
a = GM_getValue("bars","f");
if (a == "f" || a.charAt(0) !== "[" ){
	a = '["firefox","chrome","opera","鬼泣4"]';
	GM_setValue("bars",a);
}
b = JSON.parse(a);

//position
panelOnLeft = GM_getValue("position","f");
if (panelOnLeft == "f" || typeof(panelOnLeft) !== "boolean"){
	panelOnLeft = true;
	GM_setValue("position",panelOnLeft);
}

//apset
Aapvalue = GM_getValue("apset","f");
tmpstr = '["20px","#999","微软雅黑","#EEE","13px","#EEE","#CFCFCF","微软雅黑","#111","12px","22px","#111","110px","1px solid gray","1px solid #999"]';
tmpjson = JSON.parse(tmpstr);
if (Aapvalue == "f" || Aapvalue.charAt(0) !== "["){
	Aapvalue = tmpstr;
	apvalue = JSON.parse(Aapvalue);
} else {
	apvalue = JSON.parse(Aapvalue);
}


for (x in tmpjson){
	if (typeof(apvalue[x]) !== "string"){
		apvalue[x] = tmpjson[x];
	}
}
Aapvalue = JSON.stringify(apvalue);
GM_setValue("apset",Aapvalue);


likeftitle = GM_getValue("likeftitle","f");
if (likeftitle == "f"){
	likeftitle = "我喜欢的贴吧";
	GM_setValue("likeftitle",likeftitle);
}

}


function opst(){

var settingDivshadow = document.createElement("div");
settingDivshadow.setAttribute("id","settingDivshadow");
settingDivshadow.setAttribute("class","sDivhadow");
document.getElementsByTagName("body")[0].appendChild(settingDivshadow);

var settingDiv = document.createElement("div");
settingDiv.setAttribute("id","settingDiv");
document.getElementsByTagName("body")[0].appendChild(settingDiv);

var h3 = document.createElement("h2");
h3.innerHTML = "贴吧设置"
document.getElementById("settingDiv").appendChild(h3);

for(var i = 0;i < b.length;i++){
	var deletebtn = document.createElement("a");
	deletebtn.setAttribute("class","deletebtn");
	deletebtn.setAttribute("onclick","this.nextSibling.parentNode.removeChild(this.nextSibling);this.parentNode.removeChild(this);");
	deletebtn.innerHTML = "×";
	document.getElementById("settingDiv").appendChild(deletebtn);

	var barname = document.createElement("input");
	barname.setAttribute("class","barname");
	barname.value = b[i];
	document.getElementById("settingDiv").appendChild(barname);
}

//checkbox
var checkspan = document.createElement("span");
checkspan.setAttribute("id","checkspan");
document.getElementById("settingDiv").appendChild(checkspan);

var positionbtn = document.createElement("input");
positionbtn.setAttribute("id","positionbtn");
positionbtn.setAttribute("type","checkbox");
document.getElementById("checkspan").appendChild(positionbtn);

var positionlabel = document.createElement("label");
document.getElementById("checkspan").appendChild(positionlabel);

//save
var savebtn = document.createElement("a");
savebtn.setAttribute("id","save");
savebtn.setAttribute("class","setbtn");
savebtn.innerHTML = "保存设置"
document.getElementById("settingDiv").appendChild(savebtn);
savebtn.addEventListener("click",save,false);

//add
var addbtn = document.createElement("a");
addbtn.setAttribute("id","add");
addbtn.setAttribute("class","setbtn");
addbtn.innerHTML = "添加"
document.getElementById("settingDiv").appendChild(addbtn);
addbtn.addEventListener("click",createinput,false);

var closebtn = document.createElement("a");
closebtn.setAttribute("id","close");
closebtn.setAttribute("class","setbtn");
closebtn.setAttribute("onclick","var div = document.getElementById('settingDiv');div.parentNode.removeChild(div); \
var divshadow = document.getElementById('settingDivshadow');divshadow.parentNode.removeChild(divshadow);");
closebtn.innerHTML = "关闭"
document.getElementById("settingDiv").appendChild(closebtn);

//appearancebtn
var appearancebtn = document.createElement("a");
appearancebtn.setAttribute("id","apset");
appearancebtn.setAttribute("class","setbtn");
appearancebtn.innerHTML = "细节设置"
document.getElementById("settingDiv").appendChild(appearancebtn);
appearancebtn.addEventListener("click",apset,false);

check();
}



function check(){
var checkbtn = document.getElementById("positionbtn");
if (panelOnLeft == true){
	checkbtn.checked = false;
} else {
	checkbtn.checked = true;
}
}

function apset(){
var pdiv = document.getElementById('settingDiv');
pdiv.parentNode.removeChild(pdiv);

var pdivs = document.getElementById('settingDivshadow');
pdivs.parentNode.removeChild(pdivs);


var settingDivshadow = document.createElement("div");
settingDivshadow.setAttribute("id","apDivshadow");
settingDivshadow.setAttribute("class","sDivhadow");
document.getElementsByTagName("body")[0].appendChild(settingDivshadow);



var apsetDiv = document.createElement("div");
apsetDiv.setAttribute("id","apsetDiv");
document.getElementsByTagName("body")[0].appendChild(apsetDiv);

var apsethead = document.createElement("h2");
apsethead.innerHTML = "细节设置"
document.getElementById("apsetDiv").appendChild(apsethead);

//apsetdiv1
var apsetdiv1 = document.createElement("div");
apsetdiv1.setAttribute("class","apsetdiv");
apsetdiv1.setAttribute("id","apsetdiv1");
document.getElementById("apsetDiv").appendChild(apsetdiv1);

//标题
var titlediv = document.createElement("div");
titlediv.setAttribute("class","apdiv");
titlediv.setAttribute("id","titlediv");
document.getElementById("apsetdiv1").appendChild(titlediv);

var titlespan = document.createElement("span");
titlespan.setAttribute("class","apspan");
titlespan.innerHTML = "标题"
document.getElementById("titlediv").appendChild(titlespan);

var titleinput = document.createElement("input");
titleinput.setAttribute("class","apsetinput");
titleinput.setAttribute("id","likef_title");
titleinput.value = likeftitle;
document.getElementById("titlediv").appendChild(titleinput);

//宽度
var div13 = document.createElement("div");
div13.setAttribute("class","apdiv");
div13.setAttribute("id","apdiv13");
document.getElementById("apsetdiv1").appendChild(div13);

var span13 = document.createElement("span");
span13.setAttribute("class","apspan");
span13.innerHTML = "宽度"
document.getElementById("apdiv13").appendChild(span13);

var input13 = document.createElement("input");
input13.setAttribute("class","apsetinput");
input13.setAttribute("id","likef_width");
input13.value = apvalue[12];
document.getElementById("apdiv13").appendChild(input13);


//上边距
var div1 = document.createElement("div");
div1.setAttribute("class","apdiv");
div1.setAttribute("id","apdiv1");
document.getElementById("apsetdiv1").appendChild(div1);

var span1 = document.createElement("span");
span1.setAttribute("class","apspan");
span1.innerHTML = "面板上边距"
document.getElementById("apdiv1").appendChild(span1);

var input1 = document.createElement("input");
input1.setAttribute("class","apsetinput");
input1.setAttribute("id","likef_top");
input1.value = apvalue[0];
document.getElementById("apdiv1").appendChild(input1);


//背景色
var div2 = document.createElement("div");
div2.setAttribute("class","apdiv");
div2.setAttribute("id","apdiv2");
document.getElementById("apsetdiv1").appendChild(div2);

var span2 = document.createElement("span");
span2.setAttribute("class","apspan");
span2.innerHTML = "标题背景色"
document.getElementById("apdiv2").appendChild(span2);

var input2 = document.createElement("input");
input2.setAttribute("class","apsetinput");
input2.setAttribute("id","likef_background");
input2.value = apvalue[1];
document.getElementById("apdiv2").appendChild(input2);

//标题字体
var div3 = document.createElement("div");
div3.setAttribute("class","apdiv");
div3.setAttribute("id","apdiv3");
document.getElementById("apsetdiv1").appendChild(div3);

var span3 = document.createElement("span");
span3.setAttribute("class","apspan");
span3.innerHTML = "标题字体"
document.getElementById("apdiv3").appendChild(span3);

var input3 = document.createElement("input");
input3.setAttribute("class","apsetinput");
input3.setAttribute("id","likef_fontfamily");
input3.value = apvalue[2];
document.getElementById("apdiv3").appendChild(input3);

//标题字体颜色
var div4 = document.createElement("div");
div4.setAttribute("class","apdiv");
div4.setAttribute("id","apdiv4");
document.getElementById("apsetdiv1").appendChild(div4);

var span4 = document.createElement("span");
span4.setAttribute("class","apspan");
span4.innerHTML = "字体颜色"
document.getElementById("apdiv4").appendChild(span4);

var input4 = document.createElement("input");
input4.setAttribute("class","apsetinput");
input4.setAttribute("id","likef_color");
input4.value = apvalue[3];
document.getElementById("apdiv4").appendChild(input4);

//标题字体大小
var div5 = document.createElement("div");
div5.setAttribute("class","apdiv");
div5.setAttribute("id","apdiv5");
document.getElementById("apsetdiv1").appendChild(div5);

var span5 = document.createElement("span");
span5.setAttribute("class","apspan");
span5.innerHTML = "字体大小"
document.getElementById("apdiv5").appendChild(span5);

var input5 = document.createElement("input");
input5.setAttribute("class","apsetinput");
input5.setAttribute("id","likef_fontsize");
input5.value = apvalue[4];
document.getElementById("apdiv5").appendChild(input5);

//apsetdiv2
var apsetdiv2 = document.createElement("div");
apsetdiv2.setAttribute("class","apsetdiv");
apsetdiv2.setAttribute("id","apsetdiv2");
document.getElementById("apsetDiv").appendChild(apsetdiv2);

//链接背景
var div6 = document.createElement("div");
div6.setAttribute("class","apdiv");
div6.setAttribute("id","apdiv6");
document.getElementById("apsetdiv2").appendChild(div6);

var span6 = document.createElement("span");
span6.setAttribute("class","apspan");
span6.innerHTML = "链接背景"
document.getElementById("apdiv6").appendChild(span6);

var input6 = document.createElement("input");
input6.setAttribute("class","apsetinput");
input6.setAttribute("id","likef_links_background");
input6.value = apvalue[5];
document.getElementById("apdiv6").appendChild(input6);

//链接悬浮背景
var div7 = document.createElement("div");
div7.setAttribute("class","apdiv");
div7.setAttribute("id","apdiv7");
document.getElementById("apsetdiv2").appendChild(div7);

var span7 = document.createElement("span");
span7.setAttribute("class","apspan");
span7.innerHTML = "悬浮背景"
document.getElementById("apdiv7").appendChild(span7);

var input7 = document.createElement("input");
input7.setAttribute("class","apsetinput");
input7.setAttribute("id","likef_links_hoverbackground");
input7.value = apvalue[6];
document.getElementById("apdiv7").appendChild(input7);

//链接字体
var div8 = document.createElement("div");
div8.setAttribute("class","apdiv");
div8.setAttribute("id","apdiv8");
document.getElementById("apsetdiv2").appendChild(div8);

var span8 = document.createElement("span");
span8.setAttribute("class","apspan");
span8.innerHTML = "链接字体"
document.getElementById("apdiv8").appendChild(span8);

var input8 = document.createElement("input");
input8.setAttribute("class","apsetinput");
input8.setAttribute("id","likef_links_fontfamily");
input8.value = apvalue[7];
document.getElementById("apdiv8").appendChild(input8);

//链接颜色
var div9 = document.createElement("div");
div9.setAttribute("class","apdiv");
div9.setAttribute("id","apdiv9");
document.getElementById("apsetdiv2").appendChild(div9);

var span9 = document.createElement("span");
span9.setAttribute("class","apspan");
span9.innerHTML = "链接颜色"
document.getElementById("apdiv9").appendChild(span9);

var input9 = document.createElement("input");
input9.setAttribute("class","apsetinput");
input9.setAttribute("id","likef_links_color");
input9.value = apvalue[8];
document.getElementById("apdiv9").appendChild(input9);

//悬浮链接颜色
var div12 = document.createElement("div");
div12.setAttribute("class","apdiv");
div12.setAttribute("id","apdiv12");
document.getElementById("apsetdiv2").appendChild(div12);

var span12 = document.createElement("span");
span12.setAttribute("class","apspan");
span12.innerHTML = "悬浮链接颜色"
document.getElementById("apdiv12").appendChild(span12);

var input12 = document.createElement("input");
input12.setAttribute("class","apsetinput");
input12.setAttribute("id","likef_links_hovercolor");
input12.value = apvalue[11];
document.getElementById("apdiv12").appendChild(input12);


//链接字体大小
var div10 = document.createElement("div");
div10.setAttribute("class","apdiv");
div10.setAttribute("id","apdiv10");
document.getElementById("apsetdiv2").appendChild(div10);

var span10 = document.createElement("span");
span10.setAttribute("class","apspan");
span10.innerHTML = "字体大小"
document.getElementById("apdiv10").appendChild(span10);

var input10 = document.createElement("input");
input10.setAttribute("class","apsetinput");
input10.setAttribute("id","likef_links_fontsize");
input10.value = apvalue[9];
document.getElementById("apdiv10").appendChild(input10);

//链接字体行高
var div11 = document.createElement("div");
div11.setAttribute("class","apdiv");
div11.setAttribute("id","apdiv11");
document.getElementById("apsetdiv2").appendChild(div11);

var span11 = document.createElement("span");
span11.setAttribute("class","apspan");
span11.innerHTML = "链接字体行高"
document.getElementById("apdiv11").appendChild(span11);

var input11 = document.createElement("input");
input11.setAttribute("class","apsetinput");
input11.setAttribute("id","likef_links_lineheight");
input11.value = apvalue[10];
document.getElementById("apdiv11").appendChild(input11);

//外边框
var div14 = document.createElement("div");
div14.setAttribute("class","apdiv");
div14.setAttribute("id","apdiv14");
document.getElementById("apsetdiv2").appendChild(div14);

var span14 = document.createElement("span");
span14.setAttribute("class","apspan");
span14.innerHTML = "外边框"
document.getElementById("apdiv14").appendChild(span14);

var input14 = document.createElement("input");
input14.setAttribute("class","apsetinput");
input14.setAttribute("id","likef_panel_border");
input14.value = apvalue[13];
document.getElementById("apdiv14").appendChild(input14);

//分割线
var div15 = document.createElement("div");
div15.setAttribute("class","apdiv");
div15.setAttribute("id","apdiv15");
document.getElementById("apsetdiv2").appendChild(div15);

var span15 = document.createElement("span");
span15.setAttribute("class","apspan");
span15.innerHTML = "分割线"
document.getElementById("apdiv15").appendChild(span15);

var input15 = document.createElement("input");
input15.setAttribute("class","apsetinput");
input15.setAttribute("id","likef_links_border");
input15.value = apvalue[14];
document.getElementById("apdiv15").appendChild(input15);

//savebtn
var apsavebtn = document.createElement("a");
apsavebtn.setAttribute("class","setbtn");
apsavebtn.setAttribute("id","apsave");
apsavebtn.innerHTML = "保存设置"
document.getElementById("apsetDiv").appendChild(apsavebtn);
apsavebtn.addEventListener("click",apsave,false);


var apcancelbtn = document.createElement("a");
apcancelbtn.setAttribute("class","setbtn");
apcancelbtn.setAttribute("id","apcancel");
apcancelbtn.innerHTML = "关闭"
document.getElementById("apdiv1").appendChild(apcancelbtn);
apcancelbtn.addEventListener("click",apcancel,false);

}

function apsave(){
apvalue[0] = document.getElementById('likef_top').value;
apvalue[1] = document.getElementById('likef_background').value;
apvalue[2] = document.getElementById('likef_fontfamily').value;
apvalue[3] = document.getElementById('likef_color').value;
apvalue[4] = document.getElementById('likef_fontsize').value;
apvalue[5] = document.getElementById('likef_links_background').value;
apvalue[6] = document.getElementById('likef_links_hoverbackground').value;
apvalue[7] = document.getElementById('likef_links_fontfamily').value;
apvalue[8] = document.getElementById('likef_links_color').value;
apvalue[9] = document.getElementById('likef_links_fontsize').value;
apvalue[10] = document.getElementById('likef_links_lineheight').value;
apvalue[11] = document.getElementById('likef_links_hovercolor').value;
apvalue[12] = document.getElementById('likef_width').value;
apvalue[13] = document.getElementById('likef_panel_border').value;
apvalue[14] = document.getElementById('likef_links_border').value;

likeftitle = document.getElementById('likef_title').value;

var savetmp = JSON.stringify(apvalue);
GM_setValue("apset",savetmp);
GM_setValue("likeftitle",likeftitle);

var sdiv = document.getElementById('apsetDiv');
sdiv.parentNode.removeChild(sdiv);
var pdivs = document.getElementById('apDivshadow');
pdivs.parentNode.removeChild(pdivs);

opst();
}

function apcancel(){
var sdiv = document.getElementById('apsetDiv');
sdiv.parentNode.removeChild(sdiv);
var pdivs = document.getElementById('apDivshadow');
pdivs.parentNode.removeChild(pdivs);
opst();
}


function createinput(){
var deletebtn = document.createElement("a");
deletebtn.setAttribute("class","deletebtn");
deletebtn.setAttribute("onclick","this.nextSibling.parentNode.removeChild(this.nextSibling);this.parentNode.removeChild(this);");
deletebtn.innerHTML = "×";
document.getElementById("settingDiv").appendChild(deletebtn);

var barname = document.createElement("input");
barname.setAttribute("class","barname");
document.getElementById("settingDiv").appendChild(barname);
}


function save(){
var barnamelist = document.querySelectorAll(".barname")
var tb = new Array();
for (var i = 0; i < barnamelist.length;i++){
	tb[i] = barnamelist[i].value;
}
c=JSON.stringify(tb);
b=JSON.parse(c);
GM_setValue("bars",c);

var checkbtn = document.getElementById("positionbtn");
if (checkbtn.checked == false){
	panelOnLeft = true;
} else {
	panelOnLeft = false;
}
GM_setValue("position",panelOnLeft);



var div = document.getElementById("settingDiv");
div.parentNode.removeChild(div);
var pdivs = document.getElementById('settingDivshadow');
pdivs.parentNode.removeChild(pdivs);

var p = document.getElementById("likef");
p.parentNode.removeChild(p);
createleft();
}




function createleft(){
var likef=document.createElement("div");
var a = document.getElementsByTagName("body")[0].appendChild(likef);
a.setAttribute("id","likef")
a.innerHTML = likeftitle;

var listcontainer = document.createElement("div");
listcontainer.setAttribute("class","listpanel")
a.appendChild(listcontainer);

for(x in b){
	var insa = document.createElement("a");
	var link = "http://tieba.baidu.com/f?kw=" + encodeURIComponent(b[x]) +"&ie=utf-8";
	insa.setAttribute("href",link);
	insa.setAttribute("class","like_links");
	insa.setAttribute("target","_blank");
	insa.innerHTML = '<span class="linkspan">' + b[x] + '</span>';
	listcontainer.appendChild(insa);
}
var settingbtn = document.createElement("a");
settingbtn.setAttribute("onclick","c();")
settingbtn.setAttribute("id","settingbtn")
settingbtn.setAttribute("href","javascript:void(0);")
settingbtn.setAttribute("class","like_links");
settingbtn.innerHTML = '<span class="linkspan">setting</span>';
listcontainer.appendChild(settingbtn);
settingbtn.addEventListener("click",opst,false);
}


presetting();
createleft();

if (panelOnLeft == true){
GM_addStyle(" \
#likef{left:-moz-calc(-"+apvalue[12]+" + 12px);} \
#likef:hover{left:0px;} \
")
} else {
GM_addStyle(" \
#likef{right:-moz-calc(-"+apvalue[12]+" + 12px);} \
#likef:hover{right:0px;} \
")
}

GM_addStyle(" \
#likef{ \
width:"+ apvalue[12] + "; \
top:" + apvalue[0] + "; \
background:" + apvalue[1]  +"; \
position:fixed; \
color:" + apvalue[3] +"; \
line-height:37px; \
text-align:center; \
font-size:" + apvalue[4] +"; \
z-index:1000000; \
-moz-transition:0.2s ease all; \
font-family:" + apvalue[2] +"; \
} \
 \
#likef > .listpanel{ \
position:absolute; \
top:-1000px; \
border:"+ apvalue[13] + "; \
opacity:0; \
-moz-transition:0.3s ease opacity,0s ease top 0.3s; \
z-index:10000; \
width:-moz-calc(100% - 2px); \
width:-webkit-cawalc(100% - 2px); \
} \
 \
#likef:hover > .listpanel{ \
opacity:1; \
top:37px; \
-moz-transition:0.3s ease opacity,0s ease top 0s; \
} \
 \
#likef > .listpanel > .like_links{ \
background:" + apvalue[5] +"; \
font-family:" + apvalue[7] +"; \
font-size:" + apvalue[9] +"; \
line-height:" + apvalue[10] +"; \
padding:5px 12px;\
text-align:left; \
display:block; \
text-decoration:none; \
} \
#likef > .listpanel > .like_links > .linkspan{ \
color:" + apvalue[8] +"; \
} \
#likef > .listpanel > .like_links:hover{ \
background:" + apvalue[6] +"; \
color:" + apvalue[11] + "; \
} \
#likef > .listpanel > .like_links:not(:last-child){ \
border-bottom:"+ apvalue[14] + "; \
} \
#settingDiv{ \
position:fixed; \
top:25%; \
left:-moz-calc(50% - 300px); \
width:600px; \
height:auto; \
min-height:250px; \
background: -moz-linear-gradient(rgb(204,204,204), rgb(170,170,170)); \
border:1px solid #AAA; \
box-shadow: 0 0 8px 2px #777; \
z-index:1000002; \
padding:0 20px 65px 20px; \
} \
#settingDiv > h2{ \
width:100%; \
text-align:center; \
margin:10px 0; \
} \
 \
#settingDiv > .barname, \
.setbtn, \
.apsetinput{ \
  color:#171717; \
  -moz-appearance: none; \
  padding: 3px 7px; \
  background-color: hsla(210,30%,95%,.1); \
  background-image: -moz-linear-gradient(hsla(0,0%,100%,.6), hsla(0,0%,100%,.1)); \
  background-clip: padding-box; \
  border: 1px solid hsla(210,15%,25%,.4); \
  border-color: hsla(210,15%,25%,.3) hsla(210,15%,25%,.35) hsla(210,15%,25%,.4); \
  border-radius: 3px; \
  box-shadow: 0 1px 0 hsla(0,0%,100%,.3) inset, \
              0 0 0 1px hsla(0,0%,100%,.3) inset, \
              0 1px 0 hsla(0,0%,100%,.1); \
  font-size: 15px; \
  line-height: 1.5; \
  text-align: left; \
  -moz-transition:0.15s ease all; \
} \
.barname{margin:8px 13px 6px 3px;} \
.setbtn{margin:8px 13px;} \
 \
#settingDiv > .barname:hover, \
#settingDiv > .barname:focus, \
.apsetinput:hover,apsetinput:focus, \
.setbtn:hover{ \
  background-color: hsla(210,30%,95%,.5); \
  border-color: hsla(210,15%,25%,.45) hsla(210,15%,25%,.5) hsla(210,15%,25%,.55); \
  box-shadow: 0 1px 0 hsla(0,0%,100%,.3) inset, \
              0 0 0 1px hsla(0,0%,100%,.3) inset, \
              0 1px 0 hsla(0,0%,100%,.1), \
              0 0 3px hsla(210,15%,25%,.1); \
  -moz-transition:0.15s ease all; \
} \
 \
.setbtn:active{ \
  background-color: hsla(210,15%,25%,.2); \
  box-shadow: 0 1px 1px hsla(210,15%,25%,.2) inset, \
              0 0 2px hsla(210,15%,25%,.4) inset; \
  -moz-transition:0.01s linear all; \
} \
\
.setbtn{cursor:default;} \
#save{ \
position:absolute; \
bottom:10px; \
right:10px; \
} \
#add{ \
position:absolute; \
bottom:10px; \
right:157px; \
} \
#close{ \
position:absolute; \
bottom:10px; \
right:98px; \
} \
 \
.deletebtn{ \
cursor:default; \
margin:8px 0 0 -10px; \
border:1px solid transparent; \
color:#171717; \
padding: 3px 5px; \
line-height:20px; \
} \
.deletebtn:hover{ \
  background-color: hsla(210,30%,95%,.1); \
  background-image: -moz-linear-gradient(hsla(0,0%,100%,.6), hsla(0,0%,100%,.1)); \
  background-clip: padding-box; \
  border: 1px solid hsla(210,15%,25%,.4); \
  border-color: hsla(210,15%,25%,.3) hsla(210,15%,25%,.35) hsla(210,15%,25%,.4); \
  border-radius: 3px; \
  box-shadow: 0 1px 0 hsla(0,0%,100%,.3) inset, \
              0 0 0 1px hsla(0,0%,100%,.3) inset, \
              0 1px 0 hsla(0,0%,100%,.1); \
  -moz-transition:0.15s ease all; \
} \
#checkspan{ \
position:absolute; \
bottom:18px; \
right:230px; \
width:70px; \
} \
#positionbtn{ \
display:block; \
position:absolute; \
top:0; \
right:0; \
bottom:0; \
left:0; \
width:100%; \
height:100%; \
margin:0; \
cursor:pointer; \
opacity:0; \
z-index:2; \
} \
#positionbtn + label{ \
position:relative; \
display:block; \
width:70px; \
height:31px; \
background-color:#666; \
background-image: -moz-linear-gradient(hsla(0,0%,100%,.6), hsla(0,0%,100%,.1)); \
overflow:hidden; \
box-shadow:inset 0 1px 2px black,0 1px 0 rgba(255,255,255,0.1); \
border-radius:6px; \
} \
 \
#positionbtn + label::before{ \
position:absolute; \
content:'Left'; \
left:0; \
width:33px; \
height:31px; \
background:#EEE; \
background-color:#3c3c3c; \
background-image:-moz-linear-gradient(-40deg,rgba(0,0,0,0),rgba(255,255,255,0.1),rgba(0,0,0,0.2)); \
box-shadow:0 0 0 1px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.7); \
border-radius:5px; \
display:inline-block; \
width:40px; \
text-align:center; \
font:bold 11px/31px Arial,Sans-Serif; \
color:#BBB; \
text-shadow:0 -1px 0 rgba(0,0,0,0.7); \
-moz-transition:0.3s ease all; \
margin:1px; \
} \
 \
#positionbtn:checked + label::before{ \
content:'Right'; \
left:28px; \
-moz-transition:0.3s ease all; \
} \
 \
#apset{position:absolute;left:10px;bottom:10px} \
#apsetDiv{ \
position:fixed;top:-moz-calc(50% - 205px);left:-moz-calc(50% - 300px); \
width:600px;height:auto;min-height:250px; \
background: -moz-linear-gradient(rgb(204,204,204), rgb(170,170,170)); \
border:1px solid #AAA; \
box-shadow: 0 0 8px 2px #777; \
z-index:1000002; \
padding:0 20px 65px 20px; \
} \
#apsetDiv > h2{ \
width:100%; \
text-align:center; \
margin:10px 0; \
} \
.apspan{font-size:13px;margin:0 10px 0 0;width:80px;display:inline-block;text-align:right;} \
#apsave{position:absolute;bottom:10px;right:10px;} \
#apcancel{position:absolute;bottom:10px;right:98px;} \
.apdiv{margin:6px 0 0 0;} \
.sDivhadow{ \
position:fixed;top:0;left:0; \
width:100%;height:100%; \
background:rgba(90,90,90,0.3); \
z-index:1000001; \
} \
.apsetdiv{display:inline-block;float:left;} \
#apsetdiv1{margin:0 0 0 5px;} \
#apsetdiv2{margin:0 0 0 20px;} \
")