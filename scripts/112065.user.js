// ==UserScript==
// @name           Video Canal+ sans flash
// @namespace      Canal plus lecteur alternatif 
// @autor      	   Morphing
// @include        http://www.canalplus.fr/*
// ==/UserScript==

// Selecteur de class
document.getElementsByClassName = function(className)
{
	var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
	var allElements = document.getElementsByTagName("*");
	var results = [];
	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) {
		var elementClass = element.className;
		if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
			results.push(element);
	}
	return results;
}

var idVids = 0 ;

var newButton = function(href, text, id){
	document.getElementById('sectionDownload').innerHTML +=
		'<a style="margin-right:5px;margin-bottom:5px;" class="btn" id="'+id+'" href="'+href+'">'
			+'<span>'+text+'</span>'
		+'</a>';
	console.log(href);
	window.setTimeout(
	(function(idClick, href){
		return function(){
			document.getElementById(idClick).addEventListener("click", function(event){
				document.getElementsByClassName('playerVideo')[0].innerHTML =
					'<embed src="'+href+'" autostart="true" height="100%" width="100%">';
				event.preventDefault();
				return false;
			}, false);
		}
	})(id, href), 100);

};

var reloadVids = function(){
	idVids = unsafeWindow.videoEnCours;
	if(idVids >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://service.canal-plus.com/video/rest/getvideos/cplus/'+idVids,
			onload: function(responseDetails) {
				sourceHTML = responseDetails.responseText ;
				sourceVids = {
					bas_debit : sourceHTML.match(/BAS_DEBIT>([^<]+)</)  ,
					haut_debit : sourceHTML.match(/HAUT_DEBIT>([^<]+)</) ,
					HD        : sourceHTML.match(/HD>([^<]+)</)         
				};
				
				console.log(sourceVids);
				
				document.getElementById('sectionDownload').innerHTML = '<strong style="font-size:12px;">Utiliser le player systeme pour : </strong>';
				
				if(typeof bas_debit != null) newButton(sourceVids.bas_debit[1], 'Bas Débit', 'downVidsBas');
				if(typeof haut_debit != null) newButton(sourceVids.haut_debit[1], 'Haut Débit', 'downVidsHaut');
				if(typeof HD != null) newButton(sourceVids.HD[1], 'HD', 'downVidsHD');
				
			}
		});
	}
};

var elementSide;

// Quand le DOM est chargé
window.addEventListener("load",function(){
	
	elementSide = document.getElementById('mainSection');
	elementSide.innerHTML = '<div id="sectionDownload"></div>'+elementSide.innerHTML;
	
	// Verification regulière du changement de video
	setInterval(function(){
		if(unsafeWindow.videoEnCours != idVids){
			reloadVids();
		}
	}, 500);
	
}, false);


