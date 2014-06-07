// ==UserScript==
// @name           4shared download delay bypass
// @namespace      http://www.digivill.net/~joykillr
// @description    Bypass download delay on 4shared.com
// @include        http://*.4shared.com/*
// @include        http://4shared.com/*
// ==/UserScript==

//v1.2

function adddl(ff) {
	var nn = document.createElement("div");
	nn.setAttribute("id","dlink");
	nn.innerHTML = '\<a\ href\=\"'+ff+'\"\ style=\"z-index:1000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Download\ Video\ Now\!\ \<\/a\>';
	nn.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(nn,document.body.firstChild);
	}

if (document.getElementById("divDLWait")) {
document.getElementById("divDLWait").setAttribute("style", "display:none!important;visibility:hidden!important;");
}

if (document.getElementById("divDLStart")) {
document.getElementById("divDLStart").setAttribute("style", "display:block!important;visibility:visible!important;text-transform:uppercase!important;");
document.getElementById("divDLStart").setAttribute("class", "xxlarge red");
}

if (window.content.location.href.match(/4shared\.com\/file\//gi)) {
var allScrs = document.getElementsByTagName("script");
	for (screx=0;screx<allScrs.length;screx++) {
		if (allScrs[screx].textContent.indexOf('startDownload')!=-1){
			var sDL = allScrs[screx].textContent.toString();
			sDL = sDL.split("startDownload")[1].split("}")[0];
			sDL = sDL.split('"')[1].split('";')[0];
			adddl(sDL);
			break;
			}
		}
	}