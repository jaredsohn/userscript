// ==UserScript==
// @name          WaniKani Exporter
// @namespace     http://www.wanikani.com
// @description   WaniKani Exporter by Alucardeck
// @version 0.1
// @include       http://www.wanikani.com/dashboard
// @grant       none
// ==/UserScript==


//Functions
function get(id) {
    if (id && typeof id === 'string') {
        id = document.getElementById(id);
    }
    return id || null;
}
function apply(){
	var parser=new DOMParser();
	var srsMain = document.getElementsByClassName('srs-progress')[0];
    var srsNode = srsMain.children[0];
    
    var appNode = srsNode.children[0];
    var gurNode = srsNode.children[1];
    var masNode = srsNode.children[2];
    var enlNode = srsNode.children[3];
    var burNode = srsNode.children[4];
	
	var appData = parser.parseFromString(appNode.dataset.content,"text/xml").childNodes[0];
	var gurData = parser.parseFromString(gurNode.dataset.content,"text/xml").childNodes[0];
	var masData = parser.parseFromString(masNode.dataset.content,"text/xml").childNodes[0];
	var enlData = parser.parseFromString(enlNode.dataset.content,"text/xml").childNodes[0];
	var burData = parser.parseFromString(burNode.dataset.content,"text/xml").childNodes[0];
    
	var appRad = appData.children[0].children[0].textContent;
	var appKan = appData.children[1].children[0].textContent;
	var appVoc = appData.children[2].children[0].textContent;
	var gurRad = gurData.children[0].children[0].textContent;
	var gurKan = gurData.children[1].children[0].textContent;
	var gurVoc = gurData.children[2].children[0].textContent;
	var masRad = masData.children[0].children[0].textContent;
	var masKan = masData.children[1].children[0].textContent;
	var masVoc = masData.children[2].children[0].textContent;
	var enlRad = enlData.children[0].children[0].textContent;
	var enlKan = enlData.children[1].children[0].textContent;
	var enlVoc = enlData.children[2].children[0].textContent;
	var burRad = burData.children[0].children[0].textContent;
	var burKan = burData.children[1].children[0].textContent;
	var burVoc = burData.children[2].children[0].textContent;
	
	var separator = ';';
	var result = appRad+separator+gurRad+separator+masRad+separator+enlRad+separator+burRad+separator+separator+
		appKan+separator+gurKan+separator+masKan+separator+enlKan+separator+burKan+separator+separator+
		appVoc+separator+gurVoc+separator+masVoc+separator+enlVoc+separator+burVoc;
	
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(result));
	srsMain.appendChild(div);
}
