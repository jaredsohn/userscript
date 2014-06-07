// ==UserScript==
// @name          A9Gmap
// @namespace	  http://www.kokogiak.com/webtools/greasemonkey
// @description	  You got your A9 images in my Googlemaps! Inserts A9/Amazon Yellow Pages Local images into Googlemaps Address Balloons
// @include       http://maps.google.com*
// ==/UserScript==
     
window.a9doLookup = function (x,xurl){
	x.parentNode.name='a9';
	GM_xmlhttpRequest({
		method:'GET',
		url: xurl,
		onload:function(results){
			var pg = results.responseText;		
			if(pg.indexOf('_ypEnt1')!=-1){
				tmpRg = pg.split('_ypEnt1')
				tmpRg3 = tmpRg[1].split('/')
				tmpRg4 = tmpRg[1].split('src="')
				tmpRg5 = tmpRg4[1].split('"')
				if(tmpRg5[0].indexOf("map?")==-1){
					newElement = document.createElement('DIV');
					newElement.style.paddingTop='6px';
					newElement.style.paddingLeft='160px';
					newElement.innerHTML='<a href="http://amazon.com/o/asin/' + tmpRg3[3] + '" target="_new"><img title="Click to view this address on Amazon.com/A9.com Local Search" border=0 src='+tmpRg5[0]+' style=\'padding:4px;background-color:#fff;border-bottom:1px solid #ababab;width:69px;height:46px;\'></a>';
					x.parentNode.appendChild(newElement);					
				}
			}
		}
	})
}

window.a9query = function(){	
	var a9x=""; var a9y=""; var a9z="";
	for(i=0;i<document.getElementsByTagName('DIV').length;i++){
		if(document.getElementsByTagName('DIV')[i].innerHTML.indexOf('Directions')==0){
			b=document.getElementsByTagName('DIV')[i];
			if((b.parentNode.name!='a9')&&(b.previousSibling)){
				if (b.previousSibling.innerHTML.indexOf('<a')==0){
					a9x=b.previousSibling.previousSibling.childNodes[0].innerHTML;
					a9y=b.previousSibling.previousSibling.childNodes[1].innerHTML;
					a9z=b.previousSibling.previousSibling.previousSibling.innerHTML;
					if(a9z.indexOf("(")==0){a9z=b.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML}
				}else{
					a9x=b.previousSibling.childNodes[0].innerHTML;
					a9y=b.previousSibling.childNodes[1].innerHTML;
					a9z=b.previousSibling.previousSibling.innerHTML;
					if(a9z.indexOf("(")==0){a9z=b.previousSibling.previousSibling.previousSibling.innerHTML}
				}
				a9x=a9x.replace(' ','%20').replace(',','%2C');
				a9y=a9y.replace(' ','%20').replace(',','%2C');
				if(a9z.indexOf("Address:")==-1){
					a9z=a9z.replace(' ','%20').replace(',','%2C').replace('<b>','').replace('</b>','')+"%20";
				}else{
					a9z = "";
				}
				window.a9doLookup(b,'http://amazon.com/gp/yp/sb/yp-search-dispatch.html?index=local&keywords='+a9z+a9x+'&cityStateZip='+a9y)
			}
		}
	}
}
document.addEventListener('mousedown', function(event) { window.setTimeout("window.a9query()",150) }, true);
window.addEventListener('load', function() { window.setTimeout("window.a9query()",1000) }, true);









