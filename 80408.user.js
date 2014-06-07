// ==UserScript==
// @name           playyourturn
// @namespace      playyourturn
// @include        http://www.playyourturn.com/*
// ==/UserScript==
var h2s = document.getElementById("l_sidebar").getElementsByTagName("h2");
for ( var i in h2s )
{
	h2s[i].id= "navh2_"+i;
	/*h2s[i].title= i;
	var inner = h2s[i].innerHTML;
	h2s[i].innerHTML = "<a href='#' title='"+i+"' onclick='alert(\"test\");document.getElementById(\"navul_"+i+"\").display=\"inline\";return false;'>"+inner+"</a>";
	h2s[i].onmouseover = swap;*/
}

var uls = document.getElementById("l_sidebar").getElementsByTagName("ul");

for ( var i in uls )
{
	uls[i].id= "navul_"+i;
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('img,#searchform, #l_sidebar br,#navh2_3,#l_sidebar { display:none; }');
addGlobalStyle('#post-17 { display:none; }');
addGlobalStyle('.avatar_container img { display:inline; }');
addGlobalStyle('#content img { display:inline; }');

document.getElementById("header").innerHTML = '<div align=center><a href="http://www.playyourturn.com"><h1>PlayYourTurn - Easy on the Eyes</h1></a></div>';
var l_inner = document.getElementById("l_sidebar").innerHTML;
document.getElementById("r_sidebar").innerHTML = document.getElementById("r_sidebar").innerHTML + l_inner;
/*
addGlobalStyle('#l_sidebar ul { display:none;position:relative;width:125px;z-index: 100; float: left;background:black}');
addGlobalStyle('#l_sidebar h2 { float:left;margin: 0 10px; }');
addGlobalStyle('#l_sidebar { float:none;min-height: inherit;height: 30px;width:1024px;padding:10px 0; text-align: left;}');
*/


//document.getElementById("l_sidebar").style.display="none";
document.getElementById("footer").style.display="none";
document.getElementById("content").style.margin=0;
document.getElementById("content").style.width="750px";
document.body.style.backgroundColor="#243954";
document.getElementById("r_sidebar").style.backgroundColor="#58677C";
document.getElementById("container").style.backgroundColor="#333333";

var ins = document.body.getElementsByTagName("ins");

for ( var i in ins )
{
    ins[i].style.display = "none" ;
}