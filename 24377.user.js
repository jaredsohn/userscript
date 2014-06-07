// ==UserScript==
// @version        1.2.4 //this is required for the autoupdate script to work
// @name           LR Hover Thumbnail
// @namespace      LRHovTN1.2.4
// @description    displays preview thumbnails over links that point to images; 
//				displays snap.com for others
//				displays openthumbshots while snap.com preview loading
// @include        *
// ==/UserScript==

LRimage_links = new Array();
tooltip_script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
tooltip_script.type = 'text/javascript';


if(navigator.appName=='Opera')
	tooltip_script.setAttribute('innerHTML',LRhoverThumb+LRshowThumb+LRhideThumb+LRmoveThumb);
else
	tooltip_script.innerHTML=LRhoverThumb+LRshowThumb+LRhideThumb+LRmoveThumb;
tooltip_element=document.getElementsByTagName('body')[0].appendChild(document.createElement('span'));
tooltip_element.setAttribute('style','position:absolute; visibility:hidden; z-index:1000; top:0px; left:0px; padding:0px; margin:0px; border:1px solid #777; background:transparent;');
tooltip_element.id='gmtooltip';
tooltip_element.innerHTML='';
function LRhoverThumb(el) {
	if(el.href)
	{
		tt = document.getElementById('gmtooltip');
		if(   (tt.style.visibility=='hidden')   &&   
		   !((el.href.match('mailto\:') && el.href[0]=='m')  ||  (el.href.match('aim\:')  && el.href[0]=='a')  
		      ||  (el.href.match('javascript\:void')  && el.href[0]=='j') )      )//ignore mailto, etc
				{   tt.style.visibility='visible';}
		//	tt.innerHTML='<img src=\'data:image/gif;base64,R0lGODlhGAAYAKIAAOI0bb+/v+Hh4WJiYqCgoPOtxOXl5f///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAGAAYAAADSHi63P4wyklZAaDUh/E+wTAERwd8onhcGZp+TTjCdCQQhFArhEjsh97gt7vlgMiGIBDQ7ZhMIJRkqBo+y+bBet1xgd+keExJAAAh+QQECgAAACwDAAMAEAASAAADPHi6FzOByfXePIIQceo4BQAUCvEQzROJYnlOLKBk2xSOV44FAacrPN4PGBzuesakxMA0GJvOIfTZVFqTCQAh+QQECgAAACwDAAMAEgAQAAADPHi6J0SCSUnGIHOJEGK9R2AFDMc1T2RZpTmtA7N1kziQWc4YvKEfBQCg0PPphMLiDwlQ6oLDn3RKrVqtCQAh+QQECgAAACwDAAMAEgAQAAADPni6JxGCSfneXCabU0MjRIRpzRMRw0Aw2iahKktKAiheeI4HqacvqdQPGBwqeAOfcXkoAACF5fMpnS6dUEUCACH5BAQKAAAALAUAAwAQABIAAAM8eKrWtjC6F+s8IgRRz9VaF4GBCGWbqa4CQXArMQzEesi03b52fwSz0mo26xQAgMKBOOggkb+g82k7JjsJACH5BAQKAAAALAUAAwAQABIAAAM9eLrc/tCZaeKi1R6sN+1gIwSB0JHkiXZjGSoFABSOQBDmIcsOMQwExQ5wCPwCBx8QJqP9fgcb7vEcnI6PBAAh+QQECgAAACwDAAUAEgAQAAADO3i63P4wyklpAaBIww3GW/cBIXdlpVE9wTAEjhAEAuO6zjzb9yEQhJoOtmi9DgQXwTerQZKDZeUXfCQAACH5BAQKAAAALAMABQASABAAAAM+eFcApTDK1qSFFNzL3P4gFAxDEEIkeSrpsB5j+c6SQBCCZexGRJAEHc8HPAgCgRyvB7HhYEjT8hM1rY7JSwIAOw==\'>';
			
		el.onmouseout=LRhideThumb;
		el.onmousemove=LRmoveThumb;
	}
}



//file sizes seem to all be undefined for some reason
//alert(el.timg.src.fileSize);
/*		if (el.timg.fileSize==2033) //thumbshots not available
			tt.innerHTML='<img src='+el.timg.src+' style=\'width:'+el.timg.width*tscale+'px;height:'+el.timg.height*tscale+'px;background:white;opacity:0.9;\'>';

		else if (el.timg.fileSize==3572)//snap: can't load pg (i.e. webdata.____)
			tt.innerHTML='<img src='+othumb+ el.href+' style=\'width:360px;height:270px;background:white;opacity:0.8;\'>';		
		else	*/		//sizes don't seem to work
		//	else if (el.timg.fileSize==9040)//snap.com loading: show ts.org in meantime - doesn't work b/c not cached so size unknown
function LRshowThumb(el) {
maxzoom='3';
othumb='http://open.thumbshots.org/image.pxf?url=';
snapprefix='http://shots.snap.com/preview/?size=large&lang=en-us&search_type=adult&tok=000247ebd31c763abd081c1aa2c950fa2d078574&url=' ;
	//if (el.timg.src==el.img.src) {test=1;} else  		//try to prevent showing thumb for embedded images

	if(el.timg) {
		tt = document.getElementById('gmtooltip');
		tscaleX= 480/el.timg.width;
		tscaleY= 350/el.timg.height;
		tscale = Math.min(tscaleX,tscaleY);
		tscale=Math.min(tscale, maxzoom);		//don't zoom more than maxzoom
			
		if (     !tt.innerHTML.match('shots.snap.com'))		//refresh if using substitute
			tt.innerHTML='<img src='+el.timg.src+' style=\'width:'+el.timg.width*tscale+'px;height:'+el.timg.height*tscale+'px;background:white;opacity:0.9;\'>';

		if (el.timg.src.match('javascript:popUp')){
			var oldelhref=el.href;
			var jsprefix='javascript\:popUp';
			var nothingLR='';
			el.href =el.href.replace(jsprefix,nothingLR);
			var jsprefix2='(%27';
			el.href=el.href.replace(jsprefix2,nothingLR);
			var jssuffix='%27)';
			el.href=el.href.replace(jssuffix,nothingLR);
			el.href=snapprefix+el.href;
			el.timg.src=el.href;
			tt.innerHTML='<img src='+el.timg.src+' style=\'width:'+el.timg.width*tscale+'px;height:'+el.timg.height*tscale+'px;background:white;opacity:0.99;\'>';
			el.href=oldelhref;
		}
var preferGP=1;
var testSkipSnap=0;
		if(    (el.timg.src.match('capturing.gif'))   ||   (parseInt(el.timg.width)<5)  //show gp in meantime if snap loading
		   ||  ((parseInt(el.timg.width)==431)&&(parseInt(el.timg.height)==257))
		   ||  (testSkipSnap)      ){
			if (preferGP){
				if (el.href[7]=='w')
					var gpletter=el.href[11];
				else
					var gpletter=el.href[7];
				tt.innerHTML='<img src=http://' + gpletter+'.googlepreview.com/preview?s=' + el.href 
								+  ' style=\'width:480px;height:300px;background:white;opacity:0.85;\'>';
								//' style=\'width:360px;height:270px;background:white;opacity:0.8;\'>';
			//	el.timg.src='http://' + gpletter+'.googlepreview.com/preview?s=' + el.href;
			//	tt.innerHTML='<img src='+el.timg.src + ' style=\'width:360px;height:270px;background:white;opacity:0.8;\'>';
			}
			else
				tt.innerHTML='<img src='+othumb+ el.href+' style=\'width:360px;height:270px;background:white;opacity:0.8;\'>';
		}
	//	if (    (el.timg.src.match('googlepreview'))   &&    (el.timg.contentType.match('gif'))        )		//use othumbs if no gpreview available
	//		tt.innerHTML='<img src='+othumb+ el.href+' style=\'width:360px;height:270px;background:white;opacity:0.8;\'>';
		else		 //show normal
			tt.innerHTML='<img src='+el.timg.src+' style=\'width:'+el.timg.width*tscale+'px;height:'+el.timg.height*tscale+'px;background:white;opacity:0.99;\'>';

	}
	else if(el.href && !el.timg) {
		el.timg = new Image();
		if(el.href.match(/(.bmp|.gif|.jpg|.png)$/gi) && (!el.href.match(/(img|view|image|display|gallery)\.(php|cgi|asp)*\?=*/gi)))
			el.timg.src = el.href;		
		else		
			el.timg.src=snapprefix+el.href;
	}
}

function LRhideThumb() {
	tt=document.getElementById('gmtooltip');
	tt.style.visibility='hidden';
	tt.innerHTML='';
}

function LRmoveThumb(e) {
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
		
	if(e.target) targ = e.target;
	else if(e.srcElement) targ = e.srcElement;
	
	
	if(!targ.href && targ.parentNode && targ.parentNode.href) //image/other element inside a link
		targ = targ.parentNode;
		
		//screws up with scrolling
	if ((document.documentElement.clientHeight-posy)<296)		
		tt.style.top=(posy-(315-(document.documentElement.clientHeight-posy)))+'px';	
	else if (posy<40)	//if near top, don't push off page edge
		tt.style.top='8px';
	else
		tt.style.top=(posy-20)+'px';
	
	if ((document.documentElement.clientWidth-posx)<500) 
			tt.style.left=(posx-500)+'px';
	else
		tt.style.left=(posx+15)+'px';

	if(targ.href) LRshowThumb(targ);
}
//		if((targ.href.match(/(.bmp|.gif|.jpg|.png)$/gi))
//		   && (!targ.href.match(/(img|view|image|display|gallery)\.(php|cgi|asp)*\?=*/gi)))	//if img, move Y more
//			tt.style.top=(posy-400)+'px';
		//	tt.style.top=(posy+(document.documentElement.clientHeight-(posy+430)))+'px';
//		else{
		/*	if ((document.documentElement.clientHeight-posy)<40)
				tt.style.top=(posy-300)+'px';
			else if ((document.documentElement.clientHeight-posy)<100)
				tt.style.top=(posy-250)+'px';
			else if ((document.documentElement.clientHeight-posy)<150)
				tt.style.top=(posy-200)+'px';
			else
				tt.style.top=(posy-100)+'px';*/

//		}
		//	tt.style.top=(posy+(document.documentElement.clientHeight-(posy+350)))+'px';
		
//		if((targ.href.match(/(.bmp|.gif|.jpg|.png)$/gi)) 
//		   && (!targ.href.match(/(img|view|image|display|gallery)\.(php|cgi|asp)*\?=*/gi)))	//if img, move X less
//			tt.style.left=(posx-490)+'px';
		//	tt.style.left=(posx+(document.documentElement.clientWidth-(posx+580)))+'px';
//		else
		//	tt.style.left=(posx+(document.documentElement.clientWidth-(posx+720)))+'px';
		
		
		
		
function LRgetImageLinks() {
	found=new Array();
	_allA=document.getElementsByTagName('a');
	for(i=0;i<_allA.length;i++) {
		temp=_allA[i].getAttribute('href');
		if(temp&&temp.length>3) 
//for testing:
//{_allA[i].href='http://shots.snap.com/preview/?size=large&lang=en-us&search_type=adult&tok=000247ebd31c763abd081c1aa2c950fa2d078574&url=' +temp;
			found.push(_allA[i]);		//}
	}
return found;
}	


function LRprepareLink(el) {
	el.setAttribute('onmouseover','LRhoverThumb(this)');
}


LRimage_links = LRgetImageLinks();
for(i=0;i<LRimage_links.length;i++) LRprepareLink(LRimage_links[i]);