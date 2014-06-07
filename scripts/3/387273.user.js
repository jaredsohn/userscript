// ==UserScript==
// @name			Bash.org.pl Enhancer!
// @include			http://bash.org.pl/*
// @updateURL		http://userscripts.org/scripts/source/387273.user.js
// @description		Ulatwia korzystanie z bash.org.pl/random - jak zescrollujemy na dol to dodaje do strony kolejne losowe :D
// @version			1.2
// @grant			none
// @copyright		2014+, zygzagZ
// ==/UserScript==

var total = 0, loading = true;
function onload(a) {
	document.getElementById('content').innerHTML += a.target.response.match(/<div id="content" class="">([^]+)<div id="foot">/)[1].replace(/<\/div>\n	\n\n	\n\n\n\n			\n		<\/div>\n	<\/div>\n\n\n	$/, '');
	if (total < 10)
		load();
   	else
    	loading = false;
}	
	
function load() {
    loading = true;
	var x=new XMLHttpRequest;
	x.onload=onload;
	x.open('GET', 'http://bash.org.pl/random/', true);
	x.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	x.send();
	total++;
}
load();
window.onscroll = function() {
	if (((window.innerHeight + window.scrollY) >= document.body.scrollHeight)){
		total = 0;
        if (!loading)
			load();
	}
}