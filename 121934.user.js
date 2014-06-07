// ==UserScript==
// @name           JLU Unbias
// @version        0.0.4
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @namespace      http://userscripts.org/scripts/show/121934
// @description    Removes author info
// @include        http://japanese.stackexchange.com/*
// ==/UserScript==

function main () {
	//Hides authors on homepage
	var i = 0;
	$('.started').
		each(
			function() {
				$(this).replaceWith($('.started-link')[i]);
				$('.started-link').addClass('started');
				i++;
			}
		);

	//Hides authors on question page
	//based on cypher's jquery: http://meta.japanese.stackexchange.com/posts/615/revisions
	var hideCls = '.user-details, .user-gravatar32, .accept-rate';
	
	$('.post-signature').
		mouseover(function() {
			$(this).find(hideCls).css('visibility', 'visible');
		}).
		mouseout(function() {
			$(this).find(hideCls).css('visibility', 'hidden');
		}).
		find(hideCls).css('visibility', 'hidden');
}


//Chrome hack
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var extensionExists = 0;

if (!is_chrome){
	main();
} else { //see if Tampermonkey is installed
	var extensionImg = document.createElement("img");
	extensionImg.setAttribute("src", "chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/images/icon.png");
	
	extensionImg.addEventListener("load", function(e) {
		extensionExists = 1;
	}, false);
	extensionImg.addEventListener("error", function(e) {
		extensionExists = 0;
	}, false);
}

if (is_chrome && extensionExists == 1)
{
    main();
}else if (is_chrome && extensionExists == 0){ //Tampermonkey is not installed, so use hack
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}