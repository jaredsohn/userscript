// ==UserScript==
// @name        iciba划词翻译（爱词霸）
// @namespace   noe132
// @include     *
// @exclude     http://www.iciba.com*
// @updateURL      https://userscripts.org/scripts/source/157585.meta.js
// @downloadURL    https://userscripts.org/scripts/source/157585.user.js
// @icon	http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version     1
// ==/UserScript==


var actived = 1; //是否自动开启
var text;
var mouseX;
var mouseY;
var indiv = 0;
var indivcheck = 0;
var word;
var opened = 0;


var translate_div = document.createElement("div");
translate_div.id = "icibadiv";
translate_div.innerHTML = '<div id="icibasearch"><input id="icibainput"></input><a id="icibasearchbtn"></a></div><div id="shit"></div>';
document.body.appendChild(translate_div);
translate_div.style.display = "none"
translate_div.addEventListener("mouseout",function(){indiv = 0},false);
translate_div.addEventListener("mouseover",function(){indiv = 1},false);


var searchinput = document.getElementById("icibainput");
searchinput.addEventListener("keypress",inputgetdata,false);

var searchbtn = document.getElementById("icibasearchbtn");
searchbtn.addEventListener("click",btngetdata,false);

function btngetdata(){
getdata(searchinput.value);
}


var controlbtn = document.createElement("span");
controlbtn.id = "icibacontrol";
controlbtn.addEventListener("click",swichactive,false);
document.body.appendChild(controlbtn);



function inputgetdata(e){
if(e.keyCode == 13){
	getdata(searchinput.value);
}
}

checkactive();
	
	
function swichactive(){
if (actived == 1){
	actived = 0;
	checkactive();
} else {
	actived = 1;
	checkactive();
}
}


function checkactive(){
if (actived == 1){
	controlbtn.className = "active";
} else {
	controlbtn.className = "inactive";
}
}
/*
var soundobj = document.createElement("object");
soundobj.setAttribute("style","height:0px;width:0px;overflow:hidden;");
soundobj.setAttribute("classid","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
soundobj.setAttribute("codebase","http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0");
soundobj.id = "soundobj";
document.body.appendChild(soundobj);
var param1 = document.createElement("param");
param1.setAttribute("name","allowScriptAccess");
param1.setAttribute("value","always");
soundobj.appendChild(param1);

var param2 = document.createElement("param");
param2.setAttribute("name","movie");
param2.setAttribute("value","http://www.iciba.com/top/asound.swf");
soundobj.appendChild(param2);

var embed1 = document.createElement("embed");
embed1.setAttribute("src","http://www.iciba.com/top/asound.swf");
embed1.setAttribute("quality","high");
embed1.setAttribute("allowscriptaccess","always");
embed1.setAttribute("type","application/x-shockwave-flash");
embed1.setAttribute("pluginspage","http://www.macromedia.com/go/getflashplayer");
embed1.setAttribute("name","soundobj");
soundobj.appendChild(embed1);
*/


document.body.addEventListener("mousedown",get_mouse_position,false);
document.body.addEventListener("mouseup",comapre_mouse_position,false);
document.body.addEventListener("click",check_mouse,false);
function get_mouse_position(e){
mouseX = e.pageX;
mouseY = e.pageY;

if (indiv == 1){
indivcheck = 1;
} else{
indivcheck = 0;
}

}
function comapre_mouse_position(e){
if (actived == 0){return;}
if (window.getSelection().toString().length >= 150){return;}
if (word != window.getSelection().toString()){
	word = window.getSelection().toString();
	if(word.length != 0 && word.match(/\w/) != "null" && indiv == 0 && indivcheck == 0){
		if(Math.pow(e.pageX - mouseX,2)+Math.pow(e.pageY - mouseY,2) >= 25){
			document.getElementById("shit").innerHTML = "Loading......"
			getdata(word);
			set_position(mouseX,mouseY);
		} else {
			document.getElementById("shit").innerHTML = "Loading......"
			getdata(word);
			set_position(e.pageX,e.pageY);
		}
	}
}
}


function set_position(x,y){
translate_div.style.top = y + "px";
translate_div.style.left = x + "px";
translate_div.style.display = "block"
setTimeout(function(){opened = 1},50);
}

function check_mouse(){
if (opened == 1 && indiv == 0){
translate_div.style.display = "none"
opened = 0;
}
}


//window.getSelection().toString()
function getdata(keyword){
GM_xmlhttpRequest({
method:"GET",
referer:"http://www.iciba.com/",
url:"http://open.iciba.com/huaci/dict.php?word=" + keyword,
onload:function(response){
	text = response.responseText.replace(/\\/g,"");
	text = text.match(/dict\.innerHTML=\'.*\'/) + "";
	text = text.replace(/dict\.innerHTML='/g,"");
	text = text.replace(/icIBahyI-"ico_sound"/g,'"icIBahyI-ico_sound"');
	text = text.replace(/div\>'/g,"div>");
	text = text.replace(/\<([\u4E00-\u9FA5]{1,5})\>/g,"&#60;$1&#62;")
	text = text.replace(/\<>/g,"");
	text = text.replace(/hidefocus="[a-z]{4,5}"/g,"");
	text = text.replace(/ title="点击发音"/g,"");
	text = text.replace(/ title="真人发音"/g,"");
	document.getElementById("shit").innerHTML = text;
	document.getElementById("icibainput").value = keyword;
	
	var says = document.querySelectorAll(".icIBahyI-ico_sound");
	for (x in says){
		if(typeof(says[x]) != "object"){continue;}
		var mp3file = says[x].getAttribute("onclick").replace(/asplay_hanci\('/g,"").replace(/'\);/g,"")
		says[x].setAttribute("file",mp3file);
		says[x].removeAttribute("onclick");
		says[x].onclick = function(){
			window.document.soundobj.GotoFrame(1);
		}
		says[x].addEventListener("click",playsound,false);
	}
}
});

}




GM_addStyle(' \
#icibadiv{ \
border:1px solid gray; \
box-shadow:0 0 3px #999; \
padding:7px; \
width:250px; \
height:auto; \
max-height:250px; \
position:absolute; \
top:100px; \
left:100px; \
background:#F4F4F4; \
z-index:1000000000000000000000000; \
} \
#icibasearch{ \
border-bottom:1px solid #AAA; \
height:32px; \
} \
#icibainput{ \
-moz-appearance:none; \
border:1px solid gray; \
border-radius:20px; \
vertical-align:middle; \
width:243px; \
-moz-box-sizing:border-box; \
margin-left:3px; \
height:23px; \
line-height:23px; \
font-size:12px; \
padding:0 30px 0 7px; \
float:left; \
} \
#icibasearchbtn{ \
width:25px; \
height:23px; \
background:rgba(200,200,200,0.6); \
vertical-align:middle; \
margin:0 0 0 6px; \
position:absolute; \
top:8px; \
right:11px; \
border-radius:0 20px 20px 0; \
} \
 \
#shit{ /*maindiv*/ \
height:auto; \
width:250px; \
border-top:1px solid #FFF; \
padding:5px 3px 4px 3px; \
position:relative; \
} \
 \
#icIBahyI-dict_main{ /*main content*/ \
height:auto; \
display:block; \
max-height:190px; \
overflow:auto; \
} \
.icIBahyI-dictbar,.icIBahyI-simple{ \
display:block; \
} \
.icIBahyI-dictbar{ \
padding-left:5px; \
} \
.icIBahyI-group_pos > p{ \
margin:0; \
} \
.icIBahyI-eg{ /*pronounciation span*/ \
color:#666; \
font-size:12px; \
} \
.icIBahyI-fl{ /*pronounciation word*/ \
display:block; \
float:left; \
font-size:13px; \
text-align:start; \
} \
.icIBahyI-ico_sound, \
.icIBahyI-eg a{ /*pronounciation word*/ \
display:inline-block; \
float:left; \
width:16px; \
height:16px; \
margin:2px 0 0 2px; \
background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACX0lEQVQ4jZWTS08TARSF+xP8CV0IAsOUaSmd0vKoaLEhJTRgFUTSAR9UnjMUqx1eRUAXXSAJalwRSRRjQjAhGiKWQROCicaGQJ8zdKhYERbWf3BcNDGYUiI3ucvz5Z5z71UoFArF6ZrZhVzrc+TUzs0obTOnFCet3NoXaPPFUc2ug7AvpPLq55kTAc7YXsHujaG6P4S6gTB01wTkX14UcuxvqP8C5DXMo35YRIlzA/rOTZjdMZi4LagcfhDNS5NK28LxtvLtr1E3JELXsQm6awv6niCMXARmXkYZG0ARI6SIFn92WwWNi7AOSmlxbwilXBgGVwTG21GYh+KoHZdBd39GISMIBPMu01bBlbew8BL0vSEY+sIo7Y9Cy0Wh4aKg2Bi0/RIujCdgnZBQ7FwDyQiTSuaQLeLqEsx3t0GzYag6QyC7IlBzIrTubeg8cdC8DJqXYRrdQeN0EpXuAAjGz/4FFLYsw8BJyG8PguyOQOMSofPEYRhOoPzeLirG0m3xJdH0+AdMng2o2j4eAjjeQ9MlgugIQ92XFhu932C6n8R53x5qpvbBzP7CpenvoLmvUN1c8/6TAcmsgOYkqHqi0N7ZhmEkgbMPkrA83EfzsxTaX6ZQ5RWh7g4IlHNdmREiyQgwuuOguBhoXkbF2C7qpg9wY+43Gh79RIk7Ihe7QrasayRbBVTyMjQuEeUjCTQ9PUDjkz2UDUrQukUvxQaOPySSWUHVsIxzozu4OJVEBR9Cce+mQLGBzHGPBDj8sE7soGogiCLnJ5m69SX7uEcV4VgWyNZVqK5/8CoZ4UTv/Afs7mHvGao8rQAAAABJRU5ErkJggg==); \
} \
.icIBahyI-suggest, \
.icIBahyI-suggest2, \
.icIBahyI-fotter{ \
float:left; \
} \
 \
.icIBahyI-dict_content{ \
display:inline-block; \
width:100%; \
} \
 \
.icIBahyI-label_list{ \
display:inline-block; \
width:80%; \
font-size:13px; \
padding-left:5px; \
text-align:start;\
float:none; \
} \
.icIBahyI-label_list label{ \
text-align:left;\
float:left; \
line-height:19px; \
} \
.icIBahyI-footer a{ \
color:#259 !important; \
font-size:13px; \
} \
.icIBahyI-footer .icIBahyI-xx{ \
position:absolute; \
right:5px; \
bottom:0; \
font-size:0; \
} \
.icIBahyI-xx::before{ \
width:20px; \
content:">>"; \
font-size:12px; \
position:absolute; \
right:-3px; \
bottom:-6px; \
} \
.icIBahyI-new_word{ \
display:none; \
} \
#soundobj{ \
display:none !important; \
} \
#icibacontrol{ \
width:50px; \
height:25px; \
position:fixed; \
right:-40px; \
bottom:-17px; \
opacity:0.5; \
background:-moz-linear-gradient(0deg,#D54 0%,#D54 50%,#8D4 50%,#8D4); \
box-shadow:0 0 3px 2px #666; \
-moz-transition:0.3s ease all 0.3s; \
z-index:1000000000000000000000000; \
} \
#icibacontrol:hover{ \
right:0; \
bottom:0; \
opacity:1; \
-moz-transition:0.3s ease all 0s; \
} \
#icibacontrol::before{ \
width:30px; \
height:25px; \
display:block; \
content:""; \
position:absolute; \
top:0; \
background:#EEE; \
box-shadow:0 0 3px #888 inset; \
-moz-transition:0.3s; \
} \
#icibacontrol.active::before{ \
left:0; \
} \
#icibacontrol.inactive::before{ \
left:20px; \
} \
')
