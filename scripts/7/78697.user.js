// ==UserScript==
// @name           soundcloud dl
// @author         1allen (1all3n@gmail.com)
// @namespace      http://walk-alone.ru
// @description    soundcloud dl
// @include        http://www.sonudcloud.com/*
// @include        http://soundcloud.com/*
// ==/UserScript==

(function(){

function fix_dl_soundcloud()
{
if ( !window.location.href.match(/http:\/\/(www\.){0,1}soundcloud\.com/i) )
	return;

	var pat = /"tracks":(.+?),"comments"/;
	var dt = pat.exec($('body').html());
	if ( !!dt[1] )
	{
		dt = dt[1];
		var a = '', cnt = null;
		eval( 'a = ' + dt );	// a bit dirty :)
		
		for(track in a)
		{
			cnt = $('div[data-sc-track="'+a[track]['id']+'"] > div.info-header');	// we have jquery included anyway :)
			nu = document.createElement('A');
			nu.setAttribute('href', a[track]['streamUrl']);
			nu.innerText = '[download]';
			cnt.append(nu);
		}
	}
}

document.addEventListener('DOMContentLoaded', fix_dl_soundcloud, false);
})();