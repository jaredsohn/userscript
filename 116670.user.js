// ==UserScript==
// @name          Vakvak+++
// @namespace     http://vakvaksozluk.com
// @description	  Vakvak Sözlük Geliştirme Aparatı ve Diğer Dalgametreler
// @author        Orospu Cocuuuuu EmirWasHere
// @homepage      http://vakvaksozluk.com/
// @include       http://vakvaksozluk.com/*
// @include       http://www.vakvaksozluk.com/
// @include       http://www.vakvaksozluk.com/*
// ==/UserScript==





//buton - Küçük Harf

var $;



(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		KimlerVar();
	}
}
function KimlerVar() {
$('#panel').prepend($('<td onclick="hr(a3)" class="but" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="" style="width:5%"><a href="/sozluk.php?process=t" target="main" title="kimvar" id="a3">&nbsp; K &nbsp;</a></td>'));
}




//Buton - EwH

var $;



(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Heada = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQa = document.createElement('script');

		GM_JQa.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQa.type = 'text/javascript';
		GM_JQa.async = true;

		GM_Heada.insertBefore(GM_JQa, GM_Heada.firstChild);
	}
	GM_waita();
})();
function GM_waita() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_waita, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		KimlerVara();
	}
}
function KimlerVara() {
$('#panel').prepend($('<td onclick="hr(a3)" class="but" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="" style="width:10%"><a href="/sozluk.php?process=word&q=emir%20was%20here" target="main" title="kimvar" id="a3">&nbsp; EwH &nbsp;</a></td>'));
}






// Buton - FF


var $;



(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Headaa = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQaa = document.createElement('script');

		GM_JQaa.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQaa.type = 'text/javascript';
		GM_JQaa.async = true;

		GM_Headaa.insertBefore(GM_JQaa, GM_Headaa.firstChild);
	}
	GM_waitaa();
})();
function GM_waitaa() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_waitaa, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		KimlerVaraa();
	}
}
function KimlerVaraa() {
$('#panel').prepend($('<td onclick="hr(a3)" class="but" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="" style="width:10%"><a href="/sozluk.php?process=surl" , "/sozluk.php?process=word&q=french%20fries" target="main" title="kimvaraa" id="a3">&nbsp; Url &nbsp;</a></td>'));
}





/* burası title düzenleme mevzusu */ 


function title_duzenle() {
           window.top.document.title = 'O.o'; 
           setTimeout(title_duzenle, 2000);
        }
function icon_duzenle() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';



    link.rel = 'shortcut icon';
    link.href = 'http://asset03.wlcdn.com/media/business/6296198/oaklogo.gif?1253227214';
    document.getElementsByTagName('head')[0].appendChild(link);
}

icon_duzenle();
title_duzenle();





//reklam için yapmış bu eleman, ama biz değiştiricez bunu ileride.
//önemli!

/*
var adbar = document.getElementById("reklamlar");
var wrap = document.getElementById("reklamlar");
var container = document.getElementById("reklamlar");

var removeAd = function() {
    if (wrap && adbar) {	
        wrap.style.marginRight = "0px";
        adbar.style.display = "none";
    }
}

container.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();

*/



/* resim kapatma dalgametresi */
//başarılı


var imgs = document.getElementsByTagName('img');
 
for (i=0; i<imgs.length; i++)

{
  imgs[i].style.visibility = 'hidden';

 
}




//resim açma


//resim açma dalgametresi

//başarılı

image_links = new Array();
tooltip_script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
tooltip_script.type = 'text/javascript';
if(navigator.appName=='Opera')
	tooltip_script.setAttribute('innerHTML',hoverThumb+showThumb+hideThumb+moveThumb);
else
	tooltip_script.innerHTML=hoverThumb+showThumb+hideThumb+moveThumb;
tooltip_element=document.getElementsByTagName('body')[0].appendChild(document.createElement('span'));
tooltip_element.setAttribute('style','position:absolute; visibility:hidden; z-index:1000; top:0px; left:0px; padding:0px; margin:0px; border:1px solid #aaa; background:transparent;');
tooltip_element.id='gmtooltip';
tooltip_element.innerHTML='';
function hoverThumb(el) {
	if(el.href)
	{
		tt = document.getElementById('gmtooltip');
		if(tt.style.visibility=='hidden') {
			tt.style.visibility='visible';
			tt.innerHTML='<img src=\'data:image/gif;base64,R0lGODlhGAAYAKIAAOI0bb+/v+Hh4WJiYqCgoPOtxOXl5f///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAGAAYAAADSHi63P4wyklZAaDUh/E+wTAERwd8onhcGZp+TTjCdCQQhFArhEjsh97gt7vlgMiGIBDQ7ZhMIJRkqBo+y+bBet1xgd+keExJAAAh+QQECgAAACwDAAMAEAASAAADPHi6FzOByfXePIIQceo4BQAUCvEQzROJYnlOLKBk2xSOV44FAacrPN4PGBzuesakxMA0GJvOIfTZVFqTCQAh+QQECgAAACwDAAMAEgAQAAADPHi6J0SCSUnGIHOJEGK9R2AFDMc1T2RZpTmtA7N1kziQWc4YvKEfBQCg0PPphMLiDwlQ6oLDn3RKrVqtCQAh+QQECgAAACwDAAMAEgAQAAADPni6JxGCSfneXCabU0MjRIRpzRMRw0Aw2iahKktKAiheeI4HqacvqdQPGBwqeAOfcXkoAACF5fMpnS6dUEUCACH5BAQKAAAALAUAAwAQABIAAAM8eKrWtjC6F+s8IgRRz9VaF4GBCGWbqa4CQXArMQzEesi03b52fwSz0mo26xQAgMKBOOggkb+g82k7JjsJACH5BAQKAAAALAUAAwAQABIAAAM9eLrc/tCZaeKi1R6sN+1gIwSB0JHkiXZjGSoFABSOQBDmIcsOMQwExQ5wCPwCBx8QJqP9fgcb7vEcnI6PBAAh+QQECgAAACwDAAUAEgAQAAADO3i63P4wyklpAaBIww3GW/cBIXdlpVE9wTAEjhAEAuO6zjzb9yEQhJoOtmi9DgQXwTerQZKDZeUXfCQAACH5BAQKAAAALAMABQASABAAAAM+eFcApTDK1qSFFNzL3P4gFAxDEEIkeSrpsB5j+c6SQBCCZexGRJAEHc8HPAgCgRyvB7HhYEjT8hM1rY7JSwIAOw==\'>';
		}
		el.onmouseout=hideThumb;
		el.onmousemove=moveThumb;
	}
}
function showThumb(el) {
var thumbsize = 512;
	if(el.timg && parseInt(el.timg.width)>0) {
		tt = document.getElementById('gmtooltip');
		tscale = Math.max(el.timg.width,el.timg.height);
		tscale = (thumbsize/tscale)<1?(thumbsize/tscale):1.0;
		tt.innerHTML='<img src='+el.timg.src+' style=\'width:'+el.timg.width*tscale+'px;height:'+el.timg.height*tscale+'px;\'>';
	}
	else if(el.href && !el.timg) {
		el.timg = new Image();
		el.timg.src = el.href;
	}
}
function hideThumb() {
	tt=document.getElementById('gmtooltip');
	tt.style.visibility='hidden';
	tt.innerHTML='';
}
function moveThumb(e) {
	posx=0,posy=0;
	tt=document.getElementById('gmtooltip');
	if(!e) e=window.event;
	if(e.pageX || e.pageY) {
		posx=e.pageX;
		posy=e.pageY;
	}
	else if(e.clientX||e.clientY) {
		posx = e.clientX + document.body.scrollLeft+document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop+document.documentElement.scrollTop;
	}
	tt.style.top=(posy)+'px';
	tt.style.left=(posx+15)+'px';
	if(e.target) targ = e.target;
	else if(e.srcElement) targ = e.srcElement;
	if(!targ.href && targ.parentNode && targ.parentNode.href)
		targ = targ.parentNode;
	if(targ.href) showThumb(targ);
}
function getImageLinks() {
	found=new Array();
	_allA=document.getElementsByTagName('a');
	for(i=0;i<_allA.length;i++) {
		temp=_allA[i].getAttribute('href');
		if(temp&&temp.length>3) {
			if(temp.match(/(.bmp|.gif|.jpeg|.jpg|.png)$/gi))
				if(!temp.match(/(img|view|image|display|gallery)\.(php|cgi|asp)*\?=*/gi))
					found.push(_allA[i]);
		}
	}
return found;
}
function prepareLink(el) {
	el.setAttribute('onmouseover','hoverThumb(this)');
}
image_links = getImageLinks();
for(i=0;i<image_links.length;i++) prepareLink(image_links[i]);





//burada engel muhabbeti başlıyor
//gönül bir fizy linki vermek ister ama olmuyor. neyse. ama nasıl içkiliyim


//engel 1

window.addEventListener(
	'load',
	function() {
		var entries = document.evaluate("//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < entries.snapshotLength; i++) {
			if (entries.snapshotItem(i).innerHTML.match("emir was here")) {
				entries.snapshotItem(i).innerHTML = "<button class=\"but\" onclick=\"document.getElementById('" + entries.snapshotItem(i).id + "').innerHTML=unescape('" + escape(entries.snapshotItem(i).innerHTML) + "')\";>orospu cocuuu entrysi. mal.</button>";
			}
		}
	},
false);
