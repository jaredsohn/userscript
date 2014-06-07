// ==UserScript==
// @name           Pimp.my.Gmail Helper
// @description    Requried for some of the Pimp.my.Gmail styles to work correctly
// @author         1nfected
// @version        0.4
// @namespace      1nfected
// @include        http*://mail.google.com/*
// ==/UserScript==

(function() {

var canvas = document.getElementById('canvas_frame');
if(canvas && canvas.contentDocument) {
    var gmail = canvas.contentDocument;
    idTagger();
    window.setTimeout(idTagger,10000);
}
else return;

function idTagger() {
    var gadget = gmail.getElementsByClassName('pw');
    var label = gmail.getElementsByClassName('nJ A2');
    if(gadget) {
	var userName = gmail.getElementsByClassName('uC')[0];
	if(userName) userName = userName.textContent.replace(/\s/g,'');
	for (var i = 0, len = gadget.length ; i < len ; i++) {
            gadget[i].id = gadget[i].textContent.replace(/\s/g,'');
            if(gadget[i].textContent.replace(/\s/g,'') == userName) gadget[i].id = 'Chat';
	}
    }
    if(label) { for(var i = 0, len = label.length ; i < len ; i++) { label[i].id = label[i].textContent.toLowerCase().replace(/\s.*$/g,''); } }
}

})();