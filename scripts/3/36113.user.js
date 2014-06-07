// ==UserScript==
// @name           icon before city selection
// @namespace      asd
// @include        http://*.ikariam.hk/index.php?*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function ADDICON(element){
	GM_log(element.title);
		if(element.title=='奢侈資源: 硫磺'){
			img='sulfur';
		}else if(element.title=='奢侈資源: 葡萄酒'){
			img='wine';
		}else if(element.title=='奢侈資源: 大理石'){
			img='marble';
		}else{
			img='glass';
		}
		element.innerHTML='<img src="skin/resources/icon_'+img+'.gif" />'+element.innerHTML;
}

addGlobalStyle('li img{background:none !important;border:0 none !important;}');
GM_log(1);
header_cities=document.getElementsByClassName('avatarCities');
for (var i = 0; i < header_cities.length; i++) { 
	if(header_cities[i].tagName=='LI'){
		ADDICON(header_cities[i]);
	}
}