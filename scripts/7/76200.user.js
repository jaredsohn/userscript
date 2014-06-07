// ==UserScript==
// @name           novamov
// @namespace      smk
// @description    improves novamov
// @include        http://www.novamov.com/*
// ==/UserScript==

options={
	'signUp_e': 'Error: sign up button not found',
	'videoUrl_e': 'Error: video download path not found',
}

o=options

function report_e(msg){
	alert(msg);
	throw msg;
}
	
function fixVideo(){
	/**
	sample download url from flash player:
	http://s7.novamov.com/dl/40f93a84b1822ca8b7abec6cdcb01062/4be42d2b/ypqqguwmsh7aa.flv?start=0&id=JW&client=FLASH%20WIN%2010,0,45,2&version=4.2.90&width=600
	a url is also embedded into the page, this makes making a gm script instead of something like firebug possible
	*/
	if(!document.getElementById('mediaspace')) return;
	//sometimes the player is set to 'hidden', this sets it back to normal
	document.getElementById('mediaspace').style.visibility='';
	//get real download url and make this 'download this video'
	try{
		videoPath=unsafeWindow.s1.variables.file;
	}catch(e){
		report_e(o.videoUrl_e);
	}
	signUpButton=document.evaluate('//a[contains(@href,"//secure.signup-page.com/") and contains(@href,"/novamov")]',document,null,9,null).singleNodeValue;
	if(!signUpButton) report_e(o.signUp_e);
	signUpUrl=signUpButton.href;
	signUpButton.href=videoPath;
	signUpNew=document.createElement('a');
	signUpNew.href=signUpUrl;
	signUpNew.target='_blank';
	signUpNew.textContent='Sign Up';
	signUpLi=document.createElement('li');
	signUpLi.appendChild(signUpNew);
	document.evaluate('//div[@id="menu"]/ul',document,null,9,null).singleNodeValue.appendChild(signUpLi);
}

function main(){
	fixVideo();
}

main();
