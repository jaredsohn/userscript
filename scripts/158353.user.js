// ==UserScript==
// @name			GTS fix for chrome
// @namespace		http://www.nsn.com
// @description		Make GTS better - Chrome version
// @require1		http://code.jquery.com/jquery-1.9.0.min.js
// @match			http://diiba.netact.noklab.net/*
// @downloadURL		http://userscripts.org/scripts/source/158347.user.js
// @updateURL		http://userscripts.org/scripts/source/158347.user.js
// @version			1.2
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-1.9.0.min.js");
  script.addEventListener('load', function() {
	  var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// the guts of this userscript
function main() {
	function addDownloadLink () {
		var link = this.innerHTML.substr(5);
		return $('<a>', {
			text: link,
			title: 'Download directory',
			href: link,
		});
	}
	$(document).ready(function() {
		$('.info').children('p:contains(log)').after(addDownloadLink);
	});
}
 
// load jQuery and execute the main function
addJQuery(main);


