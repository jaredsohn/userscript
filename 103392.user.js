// ==UserScript==
// @name			Plurk Reverser 
// @author			frank38
// @version			0.1
// @namespace		
// @description		Reverse the plurk
// @include			http://*.plurk.com/*
// ==/UserScript==

(function(){
	sclick = "javascript:(function(){s=document.getElementById('input_small');s.value=s.value.split('').reverse().join('');})();";
	bclick = "javascript:(function(){s=document.getElementById('input_big');s.value=s.value.split('').reverse().join('');})();";
	t = document.getElementsByClassName('qual_holder icons_holder');
	if(!t)
		return;
	var sd = document.createElement('div');
	var bd = document.createElement('div');
	sd.innerHTML = ' ';
	sd.title = 'Reverse';
	sd.style.background = 'url("http://www.gstatic.com/translate/buttons3.png") -38px -38px';
	sd.style.cssFloat = 'left';
	sd.style.margin = '4px 4px 0px 0px';
	sd.style.visibility = 'visible';
	sd.style.width = '18px';
	sd.style.height = '18px';
	sd.style.cursor = 'pointer';
	sd.setAttribute('onclick', sclick);
	
	bd.innerHTML = ' ';
	bd.title = 'Reverse';
	bd.style.background = 'url("http://www.gstatic.com/translate/buttons3.png") -38px -38px';
	bd.style.cssFloat = 'left';
	bd.style.margin = '4px 4px 0px 0px';
	bd.style.visibility = 'visible';
	bd.style.width = '18px';
	bd.style.height = '18px';
	bd.style.cursor = 'pointer';
	bd.setAttribute('onclick', bclick);
	
	if (typeof window.addEventListener != 'undefined') {
		window.addEventListener('load',function() {
			t[0].appendChild(bd);
			t[1].appendChild(sd);
		},false);
	} else {
		window.attachEvent('onload',function() {
			t[0].appendChild(bd);
			t[1].appendChild(sd);
		});
	}
	
})();