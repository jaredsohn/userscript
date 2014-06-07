// ==UserScript==
// @name        OC Remix download links
// @namespace   ocremixlinks
// @description makes download links more accesible
// @include     http://ocremix.org/*
// @version     1
// ==/UserScript==
function linked(a){
	var xmlHTTP = new XMLHttpRequest();
	try{
		xmlHTTP.open("GET", a.href, true);
		xmlHTTP.send(null);
	}
	catch(e){
		return "error";
	}
	xmlHTTP.onreadystatechange = function () {
		if(xmlHTTP.readyState==4 && xmlHTTP.status==200) {
			var source = xmlHTTP.responseText;
			var iiens = source.match(/http:\/\/ocr\.blueblue\.fr\/files\/music\/remixes\/[^.]*\.mp3/gi);
			var aplus = (source.match(/http:\/\/djpretzel\.web/)!=null)?
							source.match(/http:\/\/djpretzel\.web\.aplus\.net\/[^.]*\.mp3/gi):
							source.match(/http:\/\/iterations.org\/[^.]*\.mp3/);
			var drmhs = source.match(/http:\/\/ocremix\.dreamhosters.com\/[^.]*\.mp3/gi);
			var ocmir = source.match(/http:\/\/ocrmirror\.org\/[^.]*\.mp3/gi);
			var inject = '<div>Download<!--this has been done-->'+
			' <a href="'+iiens+'" style="color:#FFAA4F;">Mirror 1</a> '+
			'| <a href="'+aplus+'" style="color:#FFAA4F;">Mirror 2</a> '+
			'| <a href="'+drmhs+'" style="color:#FFAA4F;">Mirror 3</a> '+
			'| <a href="'+ocmir+'" style="color:#FFAA4F;">Mirror 4</a> '+
			'</div>';
			if(a.parentNode.innerHTML.match('<!--this has been done-->')==null){
				if(a.parentNode.parentNode.className=="panel-2-gray")
					a.parentNode.parentNode.innerHTML += inject;
				else
					a.parentNode.innerHTML += inject;
			}
			a.parentNode.setAttribute('matched','true');
			a.parentNode.parentNode.setAttribute("onmouseover","");
			a.parentNode.parentNode.setAttribute("onmouseout","");
		}
	}
}
if((document.location+'').substr(0,32)=="http://www.ocremix.org/remix/OCR" || (document.location+'').substr(0,28)=="http://ocremix.org/remix/OCR"){
	document.getElementById('panel-main').innerHTML = document.getElementById('panel-download').innerHTML + document.getElementById('panel-main').innerHTML;
}
var li = document.getElementsByTagName('a');
for(i=0; i<li.length; i++){
	if(li[i].href.match(/ocremix.org\/remix\//i)!=null){
		linked(li[i]);
	}
}