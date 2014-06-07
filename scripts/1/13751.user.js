// ==UserScript==
// @name          ADVANsCEne NDS release tweaks
// @namespace     uri:opaquepink@gmail.com,2007-11:ADVANsCEne
// @description   Small tweaks on the NDS release pages. Move the game icon, split the screenshot and other things.
// @include       http://advanscene.com/html/Releases/dbrelds.php?id=*
// @include       http://*.advanscene.com/html/Releases/dbrelds.php?id=*
// ==/UserScript==
// Robert Nyman - http://www.robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
function getStyle(oElm, strCssRule){ return document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule); }
// Game icon:
var ndsimg=document.getElementsByTagName('img')[1];
var girow=document.getElementsByTagName('tr')[20];
ndsimg.src=document.getElementsByTagName('img')[2].src;
ndsimg.style.position='relative';
ndsimg.style.top='-12px';
ndsimg.style.margin='0 16px -12px 4px';
girow.parentNode.removeChild(girow);
// Splitscreen:
var scrimg=document.getElementsByTagName('img')[4];
var topscr=document.createElement('div');
topscr.style.width=getStyle(scrimg,"width");
topscr.style.height=getStyle(scrimg,"height").substring(0,getStyle(scrimg,"height").length-2)/2;
topscr.style.background='url('+scrimg.src+') top left no-repeat';
topscr.style.border='1px solid #000';
topscr.style.marginBottom='5px';
var botscr=document.createElement('div');
botscr.style.width=topscr.style.width;
botscr.style.height=topscr.style.height;
botscr.style.background='url('+scrimg.src+') bottom left no-repeat';
botscr.style.border='1px solid #000';
scrimg.parentNode.insertBefore(topscr,scrimg);
scrimg.parentNode.insertBefore(botscr,scrimg);
scrimg.parentNode.removeChild(scrimg);
// Take away the not available (n/a) fields from 'extra info':
var j=27;
for(var i=21;i<j;i++){
	var row=document.getElementsByTagName('tr')[i];
	if(row.getElementsByTagName('td')[1].innerHTML=='n/a'){
		row.parentNode.removeChild(row);
		i--;
		j--;
	}
}
if(j=22){
	row=document.getElementsByTagName('tr')[20];
	row.parentNode.removeChild(row);
}