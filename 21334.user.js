// ==UserScript==
// @name           Netload.in Popup Remover and Faster Captcha
// @namespace      http://userscripts.org/users/26666
// @description    Script by marcin3k
// @include        http://netload.in/*
// ==/UserScript==


function addJS(a)
{
	var b = document.getElementsByTagName('head')[0];
	if(!b){ return }
	var c = document.createElement('script');

	c.type='text/javascript';
	c.innerHTML=a;
	b.appendChild(c)
}

function getParam(a)
{
	var b = window.location.href;
	if(a)
	{
		var c = "[\\?&]"+a+"=([^&#]*)";
		var d = new RegExp(c);
		var r = d.exec(b)
	}

	if(r)return r[1]
}

// Wait until the page is fully loaded
window.addEventListener( 'load', function( e ) {

	// If it's file -> get captcha
	if(getParam('file_id'))
	{
		addJS('change();');
	}

	// Remove annoying popups
	addJS('function popUnder(){}');

},false);