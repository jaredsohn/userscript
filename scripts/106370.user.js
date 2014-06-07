// ==UserScript==
// @name           Google Gallifreyan Logo
// @namespace      yijiang
// @include        http://www.google.*
// ==/UserScript==

(function(){
	var logoUrl = 'http://i.imgur.com/7Ooyc.jpg',
		smallLogoUrl = 'http://i.imgur.com/H7uFu.jpg',
		hpLogo = document.getElementById('hplogo');
	
	if(hpLogo.nodeName == 'IMG') {
		hpLogo.src = logoUrl;
	} else {
		hpLogo.style.backgroundImage = 'url(' + smallLogoUrl + ')';
		
		hpLogo.firstElementChild.style.top = '85px';
		hpLogo.firstElementChild.style.left = '225px';
	}
	
	
	document.querySelectorAll('#logo img')[0].src = logoUrl;
	
	document.querySelectorAll('input[name="btnI"]')[0].value = "I'm Feeling Wibbly";
})();

