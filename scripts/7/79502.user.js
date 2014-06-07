// ==UserScript==
// @name           Howdy
// @namespace      http://userscripts.org/scripts/edit_src/79502
// @description    *****
// @include        http://www.roadraceautox.com/*
// ==/UserScript==

(function () {


var replaceWord = "Howdy";


var tags = document.getElementsByTagName('div');



for (var key in tags)



with (tags[key])

	if (id.indexOf('post_message') > -1) {

		if (innerHTML.indexOf('*****') > -1){

			innerHTML = innerHTML.replace(/\*\*\*\*\*/g, replaceWord)
		//	alert (id);

		}

	}



})();