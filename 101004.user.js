// ==UserScript==
// @name           Image shower for Eurogamer.it Forum
// @namespace      http://eurogamer.it/*
// @description    Apre in un popup qualsiasi immagine doppiocliccata
// @include        http://www.eurogamer.it/*
// @author		   demonbl@ck
// ==/UserScript==

	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = "handleImage = function(element){window.open(element.src,'Immagine','toolbar=no,menubar=no,directories=no,status=no,copyhistory=no,width='+(element.width+30)+',height='+(element.height+30));}";
	head.appendChild(script);


	for(var i=0;i<document.images.length;i++){
		document.images[i].setAttribute('ondblclick','handleImage(this);');
	}