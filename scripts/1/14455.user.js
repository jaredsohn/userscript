// ==UserScript==
// @name          Stripped Down Orkut
// @author        Subbu
// @include       http://orkut.com/*
// @include       https://orkut.com/*
// @include       http://*.orkut.com/*
// @include       https://*.orkut.com/*
// ==/UserScript==
function hideClass(theClass) { 

 var allPageTags=document.getElementsByTagName("*"); 
 for (i=0; i<allPageTags.length; i++) { 
 if (allPageTags[i].className==theClass) { 
 allPageTags[i].style.display='none'; 
 } 
 } 
}
var css = "@namespace url(http://www.w3.org/1999/xhtml); a.userbutton,.listlight,.listitemlight,.listitem,.listitemchk{background-color: #F7F7F7 !important}#header li.logobg .logo{background-color: #F5F5F5 !important}.listdark,.listitemdark,.listitemsel{background-color: #FFFFFF !important}.module h2.collapse{border-color: #EEEEEE !important}.newsitem{background-color: #EAEAEA !important}.promobg{background-color: #EEEEEE !important}body,.userinfodivi,.ln,a.userbutton:hover{background-color: #E8E8E8 !important}a.userbutton{border-color: #DDDDDD !important}.googbox,.pollborder{border-color: #C2C2C2 !important}.newsitem{border-color: #B5B5B5 !important}ul.intabs li.sel,ul.intabs li.sel .ltab{background-image:none !important}.tabdivi{background-color: #A5A5A5 !important}.floatdiv .floatcontent{border-color: #999999 !important}#header li{color: #979797 !important}.percentbarinner{background-color: #999999 !important}#header,#header li.logobg,ul.intabs li.sel{background-color: #8F8F8F !important}body:before{content:url(http://files.myopera.com/paginabrasileira/usercss/1000.gif)}.listitemsel{border-color: #8F8F8F !important}div.feedparent{color: #888888 !important}.exampletxt{color: Gray !important}.ltxt,.rfdte{color: #7C7C7C !important}.formerror{color: Gray !important}.promo,.warning{color: #787878 !important}.alttxt{color: #727272 !important}.orkuttitle{color: #717171 !important}.inlineerror{color: #666666 !important}.percentbar{border-color: #666666 !important}.requiredfield{color: #626262 !important}a.userbutton,.useremail{color: #525252 !important}.floatanchorselected{background-color: #4F4F4F !important}a,.floatanchornormal{color: #4F4F4F !important}span.adsurl{color: #404040 !important}.inlinecorrect{color: #333333 !important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color: #272727 !important}a.userbutton:hover{color: #1E1E1E !important}#header li a,ul.intabs li.sel a{color:#fff !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
while((el=document.getElementsByTagName('img')).length)
{
	el[0].parentNode.removeChild(el[0])
}
	while((el=document.getElementsByTagName('h1')).length)
{
	el[0].parentNode.removeChild(el[0])
}
	while((el=document.getElementsByTagName('h2')).length)
{
	el[0].parentNode.removeChild(el[0])
}

hideClass("footer_r");
hideClass("footer_l");
hideClass("listlight promobg");
document.title="my address book";
document.getElementById("HomePage").style.display="none";