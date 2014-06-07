// ==UserScript==
// @name       enable right click
//@author     phgame
// @namespace http://userscripts.org/scripts/show/186712
// @version    0.2
// @description enable right click of my285
// @copyright  2012+, phgame
// @include        http://*.my285.com/*
// ==/UserScript==
function antiCopy(){
    
	var attr = ['onmousedown','ondragstart','onselectstart','onselect','oncontextmenu','onbeforecopy','oncopy'];//anticopy attribute enum
	kill = new Function("return true");
 
	var tt = document.getElementsByTagName('*');
    for (var j=0;j<attr.length;j++){
		document[attr[j]] = kill;// top attribute
    }
    for (var i = 0;i < tt.length; i++ ){// child object
        for(j = 0;j < attr.length ; j++){
        	 if(tt[i].getAttribute(attr[j]) != null){
             	tt[i].setAttribute(attr[j],'return true;');
        	}
        
        }

	}

		
	
	var antiCopyCSS = document.createElement('style');
	antiCopyCSS.innerHTML='*{-moz-user-select: auto!important; -webkit-user-select: auto!important; -ms-user-select: auto!important; -o-user-select:auto!important;user-select:auto!important}';
	document.body.appendChild(antiCopyCSS);
}
antiCopy();
