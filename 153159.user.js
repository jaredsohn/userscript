// ==UserScript==
// @name 反虎复狗 Bring Goalhi back
// @description 找回我们熟悉的狗孩
// @author revassez
// @version 1.8.1
// @include http://*.hupu.com/*
// @run-at document-start
// ==/UserScript==

document.addEventListener("DOMContentLoaded",function(e) {

	// var content=document.body.innerHTML;
	// document.body.innerHTML=content.replace(/虎扑/g,"Goalhi");

	var images=document.images;
	for(var i=0;i<images.length;i++){
		if(images[i].src=="http://b3.hoopchina.com.cn/images/logo2013/v1/hp_logo_soccer.png"){
			images[i].src="data:image/jpeg;base64,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";
		}
	}

	var links=document.links;
	for(var i=0;i<links.length;i++){
		links[i].innerHTML=links[i].innerHTML.replace(/虎扑/g,"Goalhi");
	}
	var h1s=document.getElementsByTagName('h1');
	for(var i=0;i<h1s.length;i++){
		h1s[i].innerHTML=h1s[i].innerHTML.replace(/虎扑/g,"Goalhi");
	}

},false);

var flag=false;

var changeColor=function(){

if(flag){
	return;
}
flag=true;

document.title=document.title.replace(/虎扑/g,"Goalhi");

var css=" \
.hp-mainNav-B .hp-nav-bd { \
background: #1C773A; \
border-top: 1px solid #1C773A; \
border-right: 1px solid #1C773A; \
} \
.hp-mainNav-B .hp-nav .line { \
color: #1C773A; \
} \
.hp-threeNav-bd .on { \
background: #1C773A !important; \
border-color: #1C773A !important; \
color: white; \
} \
.hp-threeNav { \
border-bottom: 4px solid #1C773A !important; \
} \
.hp-mainNav-B .hp-moreNav .hp-set .setArrow { \
border-top-color: #1C773A !important; \
} \
.tabs_header .selected { \
border-top: 2px #1C773A solid !important; \
} \
.page .selected, .page .selected a, .page a:hover.selected, .page a:visited.selected { \
background: #1C773A !important; \
} \
.btns2 { \
background: #007400 !important; \
} \
.hp-mainNav-B .hp-nav { \
border: 1px solid #1C773A !important; \
} \
h3 a, h4 a.h4_t, h3 a:link, h3 a:visited, h4 a.h4_t:link, h4 a.h4_t:visited { \
color: #007400 !important; \
} \
h3 a:hover, h4 a.h4_t:hover { \
color: #0C6802 !important; \
} \
#indexSidebar .title a, #indexSidebar h4 { \
color: #0C6802 !important; \
font-size: 12px; \
} \
h3 { \
color: #0C6802 !important; \
} \
a.commend, a.no_commend, a:visited.commend { \
color: #060 !important; \
} \
a:hover.commend { \
color: #961420 !important; \
} \
#sidenav_bbs h4 { \
    color: #0C6802 !important; \
} \
.f9494, .f9494:visited, .f9494:hover, .f9494:active, .f074, .f074 a, .blk h3 a, .f074:visited, .f074:hover, .f074:active, .blk h3 a:visited, .blk h3 a:hover, .blk h3 a:active { \
    color: #0C6802 !important;\
} \
.focusText .f45af, .focusText .f45af:visited, .focusText .f45af:hover, .focusText .f45af:active { \
    color: #0C6802 !important; \
} \
";

var style = document.createElement("style");
style.type = "text/css";
style.textContent = css;
document.getElementsByTagName("HEAD").item(0).appendChild(style);

var style = document.createElement("style");
style.type = "text/css";
style.textContent = css;
document.getElementsByTagName("HEAD").item(0).appendChild(style);

var link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'data:image/jpeg;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8/r1ANvx4gAwrFkAAJkzAHjJkwDt+PEAG6RJAFq9ewDn9ewAb8WMAAyePQCf2bIAJKdQAJzXsADw+fMAzOvWAKXbtwBgv4AA+f36ADOtXADq9+4AtOHDAFG5dAADmjUAQrNoAGzEiQBpw4cAObBhANXu3QByx44A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEAAAEBAAAAAQEAAAEBAQEBAQABAQAAAAEBAAEBAAAAAQEAAQEAAAABAQABAQAAAQEBAAEBAQEBAQEAAQEAAAAAAAABAQEBAQEBAAEBAAAAAQEAAQEAAAABAQAAAQEBAQEBAAEBAAAAAQEAAAABAQEBAAABAQAAAAEBAAQAAAAAAAAAAAAAAAAAB0eGgAAAAAAAAAAAAAAABscAAwUAAAAAAAAAAAWFxgZAAAACw0OAAAQEQoHBAQSAAAAAAoEBAQEBAQEBAsMAAAAAAAABwQEBAQEBAgAAAAAAAAAAAADBAQDBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMM5AACBOQAAOTkAADEBAAA/AQAAOTkAAIE5AADDOQAAf/wAAH/5AAA/wwAAjAcAAIAPAADAPwAA4P8AAP//AAA=';
document.getElementsByTagName('head')[0].appendChild(link);

};

var ua = navigator.userAgent.toLowerCase();
if(ua.indexOf("firefox")>=0){
	document.addEventListener("beforescriptexecute",changeColor,false);
}
else if(ua.indexOf("chrome")>=0){
	document.addEventListener("DOMContentLoaded",changeColor,false);
}

