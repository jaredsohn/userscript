// ==UserScript==
// @name           BRChan - arraial e o caralho
// @include        http://*brchan.org/*/*
// @include        http://*brchan.org/*/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
(function() {
// descobrindo a board atual
var coisas = document.getElementById("postform").childNodes;
var board;
for(var i = 0; i < coisas.length; i++) {
	if(coisas[i].name == "board") {
		board = coisas[i].value;
		break;
	}
}

// tirando musica irritante
var embedArraial = document.getElementById('arraial');
if(embedArraial != undefined) {
	embedArraial.innerHTML = "";
}
console.log("aa");
var classeArraial = document.getElementsByClassName('arraial');
for(var i = 0; i < classeArraial.length; i++) {
	console.debug(classeArraial[i]);
	classeArraial[i].setAttribute('style',"");
}
console.log("bb");

// tirando imagens..
var imgs = document.getElementsByTagName('img');
for(var i = 0; i < imgs.length; i++) {
	if(imgs[i].src == "http://www.brchan.org/contents/dipaia.png") {
		imgs[i].src = "";
	}
	if(imgs[i].src == "http://www.reinodosgifs.net/festa_junina/08.gif") {
		imgs[i].src = "";
	}
	if(imgs[i].src == "http://www.picturesanimations.com/s/snake/33.gif") {
		imgs[i].src = "";
	}
	
}


}).call(this);