// ==UserScript== 
// @name          tuentiPic
// @version       0.1
// @namespace     http://www.tuenti.com/
// @description   Permite descargar fotos de tuenti
// @run-at        document-end
// @include       http://www.tuenti.com/* 
// @exclude              
// ==/UserScript== 
 

var timeChrome;

function text( el ) {
    return el.innerText ? el.innerText : el.textContent;
}

function contains( substring, string ) {
    return string.indexOf(substring)>=0
}

function showImage(){
	var links = document.getElementsByTagName("img");
	var parent;
	for(var i=0;i<links.length;i++){
		id=links[i].getAttribute("id");
		if(contains('save_gif',id)){	
			parent=links[i].parentNode;
			parent.removeChild(links[i]);
		}
	}
}
timeChrome = window.setInterval(showImage, 100); 

