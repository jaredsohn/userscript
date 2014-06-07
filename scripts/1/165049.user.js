// ==UserScript==
// @name        贴吧获取楼层链接
// @namespace   noe132
// @include     http://tieba.baidu.com/p*
// @include     http://tieba.baidu.com/f?ct=*
// @updateURL      https://userscripts.org/scripts/source/165049.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165049.user.js
// @icon	http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @grant GM_addStyle
// @version     1.1
// ==/UserScript==

var mainPost = document.getElementsByClassName("l_post");
var lzlPost = document.getElementsByClassName("lzl_single_post");
var lastAnchor;

for (x in mainPost){
if(typeof(mainPost[x]) != "object"){break;}
var mainAnchor = document.createElement("div");
mainAnchor.className = "mainanchor";
mainAnchor.addEventListener("mouseover",enter,false);
mainPost[x].firstElementChild.nextElementSibling.nextElementSibling.appendChild(mainAnchor);
}

function enter(){
a = document.location.href;
anchor = this.parentNode.parentNode.firstElementChild.name
if (a.match("http://tieba.baidu.com/p")){
	postID = a.match(/[0-9]{8,11}/) + ""
} else {
	postID = ((a.match(/&z=[0-9]{8,11}/)) + "").replace(/&z=/g,"")
}
if (anchor == lastAnchor){
return;
}
lastAnchor = anchor;

try{
	var tmpE = document.getElementById("cFlash");
	tmpE.parentNode.removeChild(tmpE);
} catch(e){

}

var flashOBJ = document.createElement("embed");
flashOBJ.class = "cFlash";
flashOBJ.id = "cFlash";
flashOBJ.setAttribute("allowscriptaccess","always");
flashOBJ.setAttribute("loop","false");
flashOBJ.setAttribute("play","true");
flashOBJ.setAttribute("wmode","transparent");
flashOBJ.type = "application/x-shockwave-flash";
flashOBJ.setAttribute("pluginspage","http://www.macromedia.com/go/getflashplayer");
flashOBJ.setAttribute("allowfullscreen","false");
flashOBJ.style = "display:block;";
flashOBJ.width = 15;
flashOBJ.height = 15;
flashOBJ.src = "http://noe132.duapp.com/test.swf";
flashOBJ.setAttribute("flashvars","anchor="+anchor+"&postid="+postID);
this.appendChild(flashOBJ);
}

var text = ' \
function success(){ \
var target = document.getElementById("cFlash"); \
var tip = document.createElement("div"); \
tip.className = "successtip"; \
tip.innerHTML = "复制成功!"; \
target.parentNode.appendChild(tip); \
setTimeout(function(){tip.parentNode.removeChild(tip)},1400); \
} \
'
var sc = document.createElement("script");
sc.type = "text/javascript";
sc.innerHTML = text;
document.head.appendChild(sc)

GM_addStyle(" \
.d_post_content_main{ \
position:relative; \
} \
.mainanchor{ \
width:15px; \
height:15px; \
background:#68B; \
position:absolute; \
top:0; \
right:-16px; \
} \
.mainanchor embed{ \
width:15px; \
height:15px; \
position:absolute; \
top:0; \
left:0; \
z-index:100000000000000; \
} \
.successtip{ \
position:absolute; \
top:-3px; \
left:60px; \
width:70px; \
height:22px; \
line-height:22px; \
text-align:center; \
background:#FFF; \
border:1px solid rgb(77,154,27); \
outline:1px solid #FFF; \
border-radius:3px; \
-moz-outline-radius:3px; \
-webkit-outline-radius:3px; \
outline-radius:3px; \
z-index:10000000000; \
opacity:0; \
-moz-transition:0.4s ease left,0.3s ease opacity; \
-moz-animation:this 1.4s; \
-webkit-transition:0.4s ease left,0.3s ease opacity; \
-webkit-animation:this 1.4s; \
} \
 \
@-moz-keyframes this{ \
0%{left:0px;} \
28%{left:30px;opacity:1;} \
71%{left:30px;} \
79%{opacity:1;} \
100%{left:60px;} \
} \
@-webkit-keyframes this{ \
0%{left:0px;} \
28%{left:30px;opacity:1;} \
71%{left:30px;} \
79%{opacity:1;} \
100%{left:60px;} \
} \
")