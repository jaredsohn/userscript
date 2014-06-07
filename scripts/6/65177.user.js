// ==UserScript==
// @name          Helpcenter-Extension for SpacePioneers
// @namespace
// @description   Adds context-sensitive Helpcenter Link.
// @include       http://*.sp.looki.de/*
// ==/UserScript==
(function() {
//Overwrite FAQ Link
var allLists = document.getElementsByTagName('ul');
resultList = '';
for (var i = 0; i < allLists.length; i++){
	if(allLists[i].className.indexOf('nav_linksize') >= 0 && allLists[i].innerHTML.indexOf('FAQ') >= 0) {
		var j=i;
		resultList = allLists[j];
	}
}
if(!resultList){
	var foo;
}else{
	var wikilist = document.createElement('ul');
		wikilist.setAttribute('class', 'nav nav_linksize');
		wikilist.innerHTML='<li><a class=\'nav_linkbox\' href=\'javascript:void(helplink());\'><b>Hilfecenter!</b></a></li>';
  		resultList.parentNode.replaceChild(wikilist, resultList);

}
//Inject Javscript Code
var allBodies = document.getElementsByTagName('script');
resultBody = allBodies[0];
//for (var i = 0; i < allBodies.length; i++){
	//	resultBody = allBodies[i];
//}
if(!resultBody){
	var foo;
}else{
  	var script = document.createElement('script');
  	script.setAttribute('type','text/javascript');
	script.text = 'function helplink() {\n'+
'	resultTr = document.getElementById(\'obj_mainpage\');'+
'	if(!resultTr){'+
'		var foo;'+
'	}else{'+
'		 alt=resultTr.innerHTML; regexp= /<td class=.{1}pic_head_topicmid headlines.{1}><nobr>(.+?)<.{1}nobr><.{1}td>/;'+
//Hole Ueberschrift und h�nge sie an
' 		 var nachrichten = regexp.exec(alt);'+
'		url=\'http://spwiki.looki.de/index.php/Spezial:Space-Pioneers_Hilfecenter\';'+
' 		if(nachrichten){   '+
' 			url += \'/\'+nachrichten[1].replace(/<[^>]*>/g, "").replace(/%/g, "");'+
'		}'+
//�ffne neues fenster
'		var Neufenster = window.open(url,\'_blank\');'+
'		Neufenster.focus();'+
'	}'+
'}';
	resultBody.parentNode.appendChild(script);
}
})();