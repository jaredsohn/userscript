// ==UserScript==
// @name           Facebook - Link In Facebook
// @namespace      Facebook - Link In Facebook
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/external?link=*
// ==/UserScript==

start();

function start()
{

    var c;
    var t;
    if (c = document.getElementById('content')) {
    	check();
		//if(document.location.href.indexOf(".facebook.com/external")>-1){
		//}else{
			c.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout(check, 1); }, false);
		//}
	}

    delete c;
    return false;


}

var ignoreDomains = ["socialinterview.com"];

function isntIgnored(link){
 if(ignoreDomains.indexOf(link.split(/\/+/g)[1].replace("www.",""))>-1){
	return false;
 }else{
	return true;
 }
}

function check(){

	if(document.location.href.indexOf(".facebook.com/external")>-1 && document.location.href.indexOf("*end*")==(document.location.href.length-5)){
		var iframe = document.createElement("iframe");
		iframe.src = decodeURI(document.location.href.split("/external?link=")[1].split("*end*")[0]);
		iframe.style.border = "0px";
		iframe.style.width = "100%";
		iframe.style.position = "absolute";
		iframe.style.top = "41px";
		iframe.style.bottom = "0px";
		iframe.style.zIndex = "-1";
		iframe.id = "innerFrame";
		document.title = "Facebook | " + iframe.src;
		iframe.style.height = window.innerHeight-41 + "px";
		document.getElementById("footerContainer").style.display = "none";
		document.getElementById("contentCurve").style.display = "none";
		document.getElementById("content").innerHTML = "";
		document.getElementById("content").appendChild(iframe);
		
		var linkDesc = document.createElement("div");
		linkDesc.style.padding = "5px";
		linkDesc.innerHTML = iframe.src + "&nbsp;&nbsp;<a style='color:#fff; font-weight:bold;' href='"+iframe.src+"'>Pop Out</a>";
		linkDesc.style.color = "#fff";
		linkDesc.style.backgroundColor = "#666";
		linkDesc.style.position = "absolute";
		linkDesc.style.zIndex = "100";
		linkDesc.style.left = "10px";
		linkDesc.style.top = "51px";
		
		document.getElementById("content").appendChild(linkDesc);
		
		unsafeWindow.onresize = function (){
		 iframe.style.height = window.innerHeight-40 + "px";
		}
	}else if(document.location.href.indexOf("*end*")!=(document.location.href.length-5)){
		setTimeout(function(e){
			var a = document.getElementsByTagName("a");
			var links = [];
			for(e=0; e<a.length; e++){
				if(a[e].href.indexOf(".facebook.com")==-1 && a[e].href.indexOf("/external?link=")==-1 && a[e].href != "" && a[e].href != "#" && isntIgnored(a[e].href)){
					if(a[e].target == "_blank"){a[e].target = "";}
					a.className = "passiveName";
					a[e].href = "http://www.facebook.com/external?link=" + encodeURI(a[e].href) + "*end*";
				}
			}
		},100);
	}
}
