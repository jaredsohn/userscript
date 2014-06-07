// ==UserScript==
// @name           Facebook Autolike
// @namespace      Facebook AutoLike  v2
// @description    Autolike by Pupunk
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Add me Up==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like7');
div.style.position = "fixed";
div.style.display = "block";
div.style.opacity= 0.90;
div.style.bottom = "+123px";
div.style.left = "+6px";
div.style.width = "125px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<center><a href='http://www.facebook.com/prime.hacker' target='blank'><b>By: PrimeFox</b></a></center>"

div2 = document.createElement("div");
div2.setAttribute('id','spoiler');
div2.style.position = "fixed";
div2.style.opacity= 0.90;
div2.style.bottom = "+204px";	
div2.style.left = "+6px";
div2.style.backgroundColor = "#CCD3E3";
div2.style.border = "1px dashed #555";
div2.style.padding = "2px";
div.style.width = "125px";
div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hide'>&laquo;</a> &#8226; <a style='color: #FFFFFF;' onclick='alert(\'Made by PrimeFox\');'>Hide Tab</a></center></div> "

body.appendChild(div);
body.appendChild(div2);

unsafeWindow.spoiler = function() {
var i;
for(i=1;i<=20;i++) {
var x=document.getElementById('like'+i);
if (x.style.display=="none") {
x.style.display="block";
div2.innerHTML = "<center><a onclick='spoiler()' title='Click for Hide Widget'>&laquo;</a> &#8226; <a title='Made by Pupunk'>:: Hide Tab::</a></center> "
}
else {
x.style.display="none";
div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Open'>&raquo;</a></center>"
}
}
};
}


