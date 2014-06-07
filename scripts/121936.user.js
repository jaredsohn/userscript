// ==UserScript==
// @author         Qnfauf
// @co-author      CRoy
// @editor         Mike Ontry
// @name           eUS National Broadcast System (independent)
// @version        0.2.1
// @include        http://*.erepublik.com/*
// @include        *qnfauf=*
// ==/UserScript==
function Main() {
	var curl=document.location.href;
	var updated = GM_getValue("updated", 0);
	var now = Math.floor(new Date().getTime()/1000/60);
	if(((now-updated) > 25 || GM_getValue("fscr", "none") == "none") && curl.indexOf('qnfauf=') < 0){
		GM_setValue("updated", now);
		try{var rurl = "http://erepubliktools.clanteam.com/newplayer.php?v=0.2.1&u="+encodeURIComponent(document.getElementsByClassName('user_section')[0].getElementsByTagName('a')[1].innerHTML)}
		catch(e){var rurl = "http://erepubliktools.clanteam.com/newplayer.php?v=0.2.1"}
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
	window.setTimeout(Main, 50);
},100);}, false);