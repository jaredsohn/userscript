// ==UserScript==
// @name        WADs clicker
// @namespace   http://wad.ojooo.com/register.php?
// @version     1.3
// @date        2014-04-08
// @author    
// @grant       none
// @grant       none
// @icon       http://wad.ojooo.com/favicon.ico
// @include    http://wad.ojooo.com/ads.php
// @include    http://wad.ojooo.com/cks.php?a=b&k=*
// @include    http://wad.ojooo.com/errors.php?err=*
// ==/UserScript==
(function(w){
function autoclicks(){
	if(w.parent.location.href.indexOf("cks.php?a=b&k=")>0){
		document.getElementById("pgl").src="about:blank";
		w.setInterval(function(){if(document.getElementById("sukces").style.display=="block"){w.parent.close(); w.parent.opener.location.reload();} return;},2000);
	}
	else if(w.parent.location.href.indexOf("ads.php")>6){
		var _t=document.createElement('script'); _t.setAttribute("type","text/javascript");
		_t.text="var advs=document.getElementsByTagName(\"a\");links=[];\n";
		_t.text+="for(m=0;m<advs.length;m++){if(advs[m].href.search(/cks\\.php\\?a=b&k=[A-Fa-f0-9]+&/)!==-1){links.push(advs[m]);}}\nadvs=[];for(m=0;m<links.length;m++){if((links[m].parentNode.parentNode.previousElementSibling.className!=\"adname_disabled\")&&(links[m].parentNode.parentNode.parentNode.style.display!=\"none\")){advs.push(links[m]);break;}}";
		_t.text+="var _c; if(!(advs.length)){window.setTimeout(function(){window.location.reload(true);},90000);}else{_c=advs.shift();_c.click();}";
		document.getElementsByTagName("head")[0].appendChild(_t);
		return;
	}
	if(w.location.href.indexOf("errors.php")>6){ w.close(); w.parent.opener.location.reload();}
}
if(document.addEventListener)
	document.addEventListener('DOMContentLoaded',autoclicks,false);
else
	w.addEventListener('load',autoclicks,false);
})(window);