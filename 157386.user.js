
// ==UserScript==
// @name Facebook remove app requests
// @namespace Aditya
// @description Greasemonkey user script that adds a button to remove all application requests
// @include http://www.facebook.com/reqs.php*
// ==/UserScript==

window.addEventListener('load',function(){ load(); },true);

function getApps(){
	s = document.body.innerHTML;
	var a = s.match(/click_add_platform_app\(.*?\)/gm);
	execIgnores(a);
}

function execIgnores(getF){
	for (i=0;i<getF.length;i++){
		if (getF[i].indexOf('http://') == -1)x = eval('unsafeWindow.'+getF[i]);
	}
}

function load(){
	var btn = document.createElement('input');
	btn.addEventListener('click', function(event) { 
				if (confirm('Are you sure you want to ignore all application requests?')) getApps();
			},true);
	btn.type = 'submit';
	btn.value = 'Ignore All Apps';
	btn.setAttribute('class','inputbutton');
	
	// Add to div - "sidebar_item_body"
	var divs = document.getElementsByTagName('div');
	for (i=0;i<divs.length;i++){
		if (divs[i].getAttribute('class')=='sidebar_item_body') break;
	}
	divs[i].appendChild(btn);
}