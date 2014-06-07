// ==UserScript==
// @version        1.0.3 //this is required for the autoupdate script to work
// @name           LinkThumb
// @namespace      LinkThumb103
// @description    displays preview thumbnails over links that point to images
// @include        http://*
// @include        https://*
// ==/UserScript==
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
var thumbsize = 192;
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
	if(!targ.href && targ.parentNode && targ.parentNode.href) //image/other element inside a link
		targ = targ.parentNode;
	if(targ.href) showThumb(targ);
}
function getImageLinks() {
	found=new Array();
	_allA=document.getElementsByTagName('a');
	for(i=0;i<_allA.length;i++) {
		temp=_allA[i].getAttribute('href');
		if(temp&&temp.length>3) {
			if(temp.match(/(.bmp|.gif|.jpg|.png)$/gi))
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