// ==UserScript==
// @name           Fix 4chan CSS
// @namespace      http://userscripts.org/users/257845
// @description    This will fix any 4chan css issues and add the css toggel bar back to the bottom if it was removed
// @include        *boards.4chan.org*
// ==/UserScript==
function fixCSS(){
	var styles={
		'Yotsuba':'http://static.4chan.org/css/yotsuba.9.css',
		'Yotsuba B':'http://static.4chan.org/css/yotsublue.9.css',
		'Futaba':'http://static.4chan.org/css/futaba.9.css',
		'Burichan':'http://static.4chan.org/css/burichan.9.css'
	}
	var Lnks=document.getElementsByTagName('link');
	for(i=0;i<Lnks.length;i++){
		for(j in styles){
			if(Lnks[i].title==j)Lnks[i].href=styles[j];
		}
	}	
	if(document.getElementsByClassName('deletebuttons')[0].parentNode.parentNode.innerHTML.indexOf('setActiveStyleSheet')==-1){
		var changer='<tr><td id="fixedStyle">Style [<a href="#" onclick="setActiveStyleSheet(\'Yotsuba\'); return false;">Yotsuba</a> | <a href="#" onclick="setActiveStyleSheet(\'Yotsuba B\'); return false;">Yotsuba B</a> | <a href="#" onclick="setActiveStyleSheet(\'Futaba\'); return false;">Futaba</a> | <a href="#" onclick="setActiveStyleSheet(\'Burichan\'); return false;">Burichan</a>]</td></tr>';
		document.getElementsByClassName('deletebuttons')[0].parentNode.parentNode.innerHTML+=changer;
		var Yotsuba=document.getElementById('fixedStyle').getElementsByTagName('a')[0];
		Yotsuba.addEventListener("click",function(){GM_setValue("style", "Yotsuba")}, true)
		var YotsubaB=document.getElementById('fixedStyle').getElementsByTagName('a')[1];
		YotsubaB.addEventListener("click",function(){GM_setValue("style", "Yotsuba B")}, true)
		var Futaba=document.getElementById('fixedStyle').getElementsByTagName('a')[2];
		Futaba.addEventListener("click",function(){GM_setValue("style", "Futaba")}, true)
		var Burichan=document.getElementById('fixedStyle').getElementsByTagName('a')[3];
		Burichan.addEventListener("click",function(){GM_setValue("style", "Burichan")}, true)
		var setStyle=''
		if(setStyle=GM_getValue("style"))window.location.href="javascript:setActiveStyleSheet('"+setStyle+"')";
	}
}

function killEmbed(){
	var E=document.getElementsByTagName('embed');
	for(i=0;i<E.length;i++){
		E[i].parentNode.removeChild(E[i]);
	}
}

killEmbed();
fixCSS();
