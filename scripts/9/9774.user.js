// ==UserScript==
// @name           Geocaching.com Enhancements
// @namespace      http://www.splitbrain.org/greasemonkey/geocaching
// @description    Change the print link to show with all logs and decrypted hint, add a waypoint search on all pages
// @include        http://www.geocaching.com/*
// ==/UserScript==


window.addEventListener('load',function(){

	// print links
	var lnk = document.getElementById('lnkPrintFriendly');
	if(lnk){
		lnk.href = lnk.href.replace(/log=n/,'log=y');
		lnk.href = lnk.href.replace(/decrypt=/,'decrypt=y');
		lnk.innerHTML = lnk.innerHTML.replace(/no logs/,'decrypted with all logs');
	}

	// goto box
   var lgin = document.getElementById('Header1_lblLogin');
	if(lgin){
	   var inp = document.createElement('input');
		inp.style['font-size'] = '90%';
		inp.style['background-color'] = '#cccccc';
		inp.style['border'] = '1px solid #f1f1f1';
		inp.style['margin'] = '1px';
		inp.style['width']  = '80px';
		inp.style['height'] = '15px';
      inp.defaultValue = 'GCXXXX';
		inp.value        = 'GCXXXX';
		lgin.parentNode.appendChild(inp);
		inp.addEventListener('keypress',function(e){
			if(e.keyCode == 13){
				window.location.href='/seek/cache_details.aspx?wp='+inp.value;
			}
		},true);
		inp.addEventListener('focus',function(e){
			if(inp.value == inp.defaultValue){
				inp.value = "GC";
			}
		},true);

   }
}, true);
