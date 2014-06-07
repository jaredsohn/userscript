// Bloglines Just show titles 
// version 0.1
// 2005-05-02
// Copyright (c) 2005, Martin Sarsale - martin@malditainternet.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name          Bloglines Just Show Titles 
// @namespace     http://www.n3rds.com.ar/greasemonkey
// @include       http://www.bloglines.com/myblogs_display?*sub=*
// @exclude       
// @description	  Just show the items titles instead of their bodies 
// ==/UserScript==
(function(){
var items = document.evaluate('//div[starts-with(@id,"siteItem")]', document, null, XPathResult.ANY_TYPE, null);	
childs=new Array();
headers=new Array();
while(item=items.iterateNext()){
	childsx=item.childNodes;
	for(i=0;i<childsx.length;i++){
			if (childsx[i].nodeName != 'H3'){
				if(childsx[i].style){
					childs[childs.length]=childsx[i];
				}
			}else{
				headers[headers.length]=childsx[i];
			}
	}
}
for (i=0; i<childs.length; i++){
	childs[i].style.display='none';
}
for (i=0; i<headers.length; i++){
	a=headers[i].childNodes[0];
	span=document.createElement('span');
	span.addEventListener('click',displayiframe,false);
	span.href=a.href;
	span.appendChild(document.createTextNode(a.childNodes[0].nodeValue))
	a.parentNode.replaceChild(span,a);
}
function displayiframe(e){
		if (document.getElementById(e.target.href)){
			return switchiframe(e);
		}else{
			ft=false;
			i=document.createElement('iframe');
			i.src=e.target.href;
			i.id=i.src;
			i.style.width='95%';
			i.style.height='300px';
			i.style.border='1px solid black';
			i.style.margin='none';
			i.style.marginLeft='5%';
			e.target.parentNode.parentNode.appendChild(i);
		}
		return false;
}
function switchiframe(e){
	iframe=e.target.parentNode.parentNode.lastChild;
	GM_log(iframe);
	if (iframe.style.display!='none'){
		iframe.style.display='none';
	}else{
		iframe.style.display='block';
	}
}
})()
