// ==UserScript==
// @name           Miley
// @namespace      Test
// @include        http://tweeterwall.mallplace.com/tw/fan-series/miley-cyrus-fans
// ==/UserScript==

//Vote the last 40 users in the front page

var REFRESH_INTERVAL = 1260000; // these are milliseconds 
setTimeout(function(){ location.reload(true); }, REFRESH_INTERVAL);

function getElementWithClass(node,child){
	for(var i=0,childNodes=node.childNodes,element;element=childNodes[i];i++)
		if(element.className&&element.className.indexOf(child)>=0){
			return element;
		}
}
for(var i=0,j=0,n,anchorsList=document.getElementsByTagName('a');anchor=anchorsList[i++];){
	if(anchor.parentNode.className.indexOf('tweeter-username')>=0){
				if(j > 20){					
					n=getElementWithClass(getElementWithClass(getElementWithClass(anchor.parentNode.parentNode,'tweeter-picture'),'tweeter-vote'),'vote-user');
					e=document.createEvent('MouseEvent');
					e.initMouseEvent('click',1,1,window,1,12,345,7,220,0,0,1,0,0,null);
					n.dispatchEvent(e);
				}	
				j++;
	}	
}

