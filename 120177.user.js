// ==UserScript==
// @name          google search url cleaner
// @author        kl
// @description   google 搜索引擎链接直接链接，不再经过Google跳转
// @include       *://*.google.com/search*
// @include       *://*.google.com.*/search*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.2
// @history       0.0.1 2012-03-11
// @history       0.0.1 2011-12-03
// ==/UserScript==

var blelement;
var i;
var blhref;
var bllink=location.href.toLowerCase(); 
var blhost=location.host.toLowerCase(); 
	
if (blhost.indexOf("google.com")>=0 && bllink.indexOf("/search")>=0){
	blelement=document.querySelectorAll("a.l"); 
	for (i=0;i<blelement.length;i++){
		blelement[i].setAttribute("onmousedown", "");
    }
    
    blelement=document.querySelectorAll('a[href^="/url\?url="]'); 
	for (i=0;i<blelement.length;i++){
		blhref=blelement[i].getAttribute("href");
		blhref=blhref.substring(9);
		if (blhref.indexOf("&rct=")>=0){
			blhref=blhref.substring(0,blhref.indexOf("&rct="));
		}
		if (blhref.indexOf('%2F')>=0){
			blhref=blhref.replace(new RegExp('%2F',"gm"),'/');
		}		
		if (blhref.indexOf('%3A')>=0){
			blhref=blhref.replace(new RegExp('%3A',"gm"),':');
		}
		if (blhref.indexOf('%3D')>=0){
			blhref=blhref.replace(new RegExp('%3D',"gm"),'=');
		}		
		if (blhref.indexOf('%3F')>=0){
			blhref=blhref.replace(new RegExp('%3F',"gm"),'?');
		}		
		blelement[i].setAttribute("href",blhref);
    }
}
