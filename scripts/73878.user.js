// ==UserScript==
// @name           FB-ImNotFanAndFuckYou
// @namespace      http://userscripts.org/users/83500
// @description    Pour voir le contenu SANS DEVENIR FAN des pages qui vous demandent de devenir fan pour voir ce qui est caché // To see the hidden content of fanpages that ask you to become a fan to see their content, WHITHOUT BECOMING FAN
// @include        http://*facebook.com*
// ==/UserScript==
var HLCount = 6;
function highlightImnotfanWhite(){
	HLCount--;
	ref = document.getElementById("imnotfanAnchor");
	ref.style.color = '#ffffff';
	if(HLCount > 0) window.setTimeout(highlightImnotfanBlack, 500);
}
function highlightImnotfanBlack(){
	HLCount--;
	ref = document.getElementById("imnotfanAnchor");
	ref.style.color = '#000000';
	if(HLCount > 0) window.setTimeout(highlightImnotfanWhite, 500);
}
function checkMatchRes(){
var tabContent = document.getElementById("tab_canvas");
if(tabContent){

	var matchReg = new RegExp("id=\"(app_content_[0-9]+)\"", "g");
	var matchRes = matchReg.exec(tabContent.innerHTML);
	if(matchRes){ // si l'el #app_content_[0-9]+ existe, on append un li au menu, sinon on check toutes les secondes si il y en a un
		if(!document.getElementById("imnotfanAnchor")){
			HLCount = 6;
			var newLi = document.createElement("li");
			var newAnch = document.createElement("a");
			var newContentLi = document.createTextNode("IMNOTFAN");
			newAnch.appendChild(newContentLi);
			newAnch.setAttribute('id', 'imnotfanAnchor');
			newAnch.setAttribute('title', 'Clique ici pour découvrir le contenu caché de cette page, s\'il y en a.');
			newAnch.setAttribute('href', '#');
			newAnch.setAttribute('onclick', 'var hiddenContent = document.getElementById("'+matchRes[1]+'");if(hiddenContent.innerHTML.match(/visibility: hidden/g)){ var flashContent = \'\';	var matchRegSwf = new RegExp(\'swfsrc="([^"]+)"\', \'g\');	var matchResSwf = matchRegSwf.exec(hiddenContent.innerHTML); if(matchResSwf){flashContent = \'<div style="padding: 20px; background-color: #eee; border: 2px dashed #000;">Une animation flash était cachée. Cliquez sur le lien ci-dessous pour y accéder:<br /><a href="\'+ matchResSwf[1] +\'" target="_blank">\'+ matchResSwf[1] +\'</a></div>\';} var newContent = hiddenContent.innerHTML.replace(/visibility: hidden/g,"visibility: block");	hiddenContent.innerHTML = \'<div style="border: 3px solid #000;"><p style="text-align: center; font-weight: bold; color: #000; text-decoration: underline; font-size: 18px;">Contenu caché:</p>\'+ newContent + flashContent +\'</div>\';}else{alert("IMNOTFAN : Aucun élément caché sur cette page.");}');
			newLi.appendChild(newAnch);
			document.getElementById("pageNav").appendChild(newLi);
			window.setTimeout(highlightImnotfanBlack, 500);
		}
		window.setTimeout(checkMatchRes, 1000);
	} else {
		if(document.getElementById("imnotfanAnchor")){
			imnotfanElm = document.getElementById("imnotfanAnchor");
			imnotfanElm.parentNode.removeChild(imnotfanElm);
		}
		window.setTimeout(checkMatchRes, 1000);
	}

} else {
	window.setTimeout(checkMatchRes, 1000);
}
}
checkMatchRes();