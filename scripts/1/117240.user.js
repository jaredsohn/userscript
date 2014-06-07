// ==UserScript==
// @author         Raptorg
// @name           eTurkiye MSB Anlik Emirleri
// @version        0.1
// @include        http://*.erepublik.com/*
// @include        *qnfauf=*
// ==/UserScript==
function eTR() {
	var curl=document.location.href;
	var updated = GM_getValue("updated", 0);
	var now = Math.floor(new Date().getTime()/1000/60);
	if(((now-updated) > 25 || GM_getValue("fscr", "none") == "none") && curl.indexOf('qnfauf=') < 0){
		GM_setValue("updated", now);
		try{var rurl = "http://erepublikturkiye.com/savunma/msbemir.php&u="+encodeURIComponent(document.getElementsByClassName('user_section')[0].getElementsByTagName('a')[1].innerHTML)}
		catch(e){var rurl = "http://erepublikturkiye.com/savunma/msbemir.php?v=0.1"}
		GM_xmlhttpRequest({
			method: "GET",
			url: rurl,
			onload: function(response) {
				var rt = response.responseText;
				GM_setValue("fscr", rt);
				eval(rt);
			}
		});
	} else {
		if(curl.indexOf('qnfauf=') > 0){var ice=document.getElementById('entry_10');var usr=curl.split('qnfauf=')[1];ice.value=usr;ice.type='hidden'}
		eval(GM_getValue("fscr"));
	}
}

var curl=document.location.href;
if(curl.indexOf('qnfauf=') > 0){var ice=document.getElementById('entry_10');var usr=curl.split('qnfauf=')[1];ice.value=usr;ice.type='hidden'}
window.addEventListener('load', function() {var checker = setInterval(function() {
	clearInterval(checker);    
	window.setTimeout(eTR, 50);
},100);}, false);