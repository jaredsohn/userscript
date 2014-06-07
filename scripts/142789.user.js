// ==UserScript==

// @author       	asanusta
// @name         	Streampad Player ve daire euro kaldırma
// @namespace    	http://burnandbass.com/
// @include      	*Streampad Player ve daire euro 
// @description  	tumblr.com blogdan boktan Streampad Player ve daire euro kaldırır-Removes the shitty Streampad Player and circle euro from tumblr.com blog	
// @version 		1.9.2012

// ==/UserScript==

window.alert = function(message){
   console.info(message);
}

window.alert = function(message){
   console.info(message);
}

function removejscssfile(filename, filetype){
 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement)
 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
 }
}

removejscssfile("http://o.aolcdn.com/os_merge/?file=/streampad/sp-player.js", "js");

function globalAddCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

globalAddCSS('#streampadBottomBar{display:none; visibility: hidden;}');
globalAddCSS('#outerCircleText{display:none;}');

