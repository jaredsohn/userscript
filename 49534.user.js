// anonim oy verme
// Copyleft Maxim Mladenov
// görüş ve öneri: maximmladenov@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ChangeLog
// version 1.2
// 1.2    27.08.2009
// * eusozluk v2 ile ilgili sorunlar giderildi.
// version 1.1
// 1.1    07.06.2009 
// * Hunhar ara işlemi ile bir yazarın listelenen entryleri altına anonim oy verme linkleri eklendi.
// * ID butonu ile getirilen entry altına anonim oy verme linkleri eklendi.
//
// version 1.0
// 1.0    15.05.2009

// ==UserScript==
// @name			Anonim Oy Verme
// @description		eusozluk'te entrylere anonim olarak oy vermeyi saglar.
// @namespace		eusozluk.com
// @description		Entrylere anonim or vermeyi saglar.
// @include			http://www.eusozluk.com/*
// @include			http://eusozluk.com/*
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
	
		var divList = document.getElementsByTagName('div');
		var i=0;
		for(i=0;i<divList.length; i++){
			if(divList[i].align == 'right'){
				addLinks(divList[i++]);
			}
		}
	},
false);

function addLinks(div){	
	var links=div.getElementsByTagName('font')[0].getElementsByTagName('a');
	var elementSize=links.length;
	
	var msgID=links[elementSize-2].toString().split("=")[2];
	addLink(msgID, div);
}

function addLink(msgID, div){
	var anonym = document.createElement('div');
	anonym.setAttribute('align','right');
	anonym.innerHTML = '<font face="verdana" size="1"><a href=\'http://www.eusozluk.com/sozluk.php?process=arti&id='+msgID+'\' onclick=\'http://www.eusozluk.com/sozluk.php?process=arti&id='+msgID+'\'>artı</a>   <a href=\'http://www.eusozluk.com/sozluk.php?process=eksi&id='+msgID+'\' onclick=\'http://www.eusozluk.com/sozluk.php?process=eksi&id='+msgID+'\'>eksi</a></font>';
	div.appendChild(anonym);
}

/*function process(msgID,choice){	
	window.open('http://www.eusozluk.com/sozluk.php?process='+choice+'&id='+msgID+'', 'popup', 'toolbar=0, scrollbars=0, location=0, statusbar=0, menubar=0, resizable=0, width=400, height=80, left = 300, top = 350');
}*/