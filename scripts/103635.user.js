// ==UserScript==
// @name          LOR Tracker filter for G-Chrome
// @description   Remove unwanted messages from tracker.
// @include       http://www.linux.org.ru/*tracker.jsp*
// @include       http://linux.org.ru/*tracker.jsp*
// ==/UserScript==
//
// License: GPL
// Author:  sdio ( http://www.linux.org.ru/whois.jsp?nick=sdio )
//
// Version: 0.6

// a function that loads jQuery and calls a callback function i
// when jQuery has finished loading


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(main);

// the guts of this userscript
function main() {

	// Blacklist users
	var BlackList = new Array;
	BlackList['wyldrodney' ] = 1;
	BlackList['delilen'    ] = 1;

	//do not show the next categories
	var TrackList = new Array;
	TrackList['Games'          ] = 1;
	TrackList['Скриншоты'      ] = 1;
	TrackList['Документация'   ] = 1;
	TrackList['Голосования'    ] = 1;
	TrackList['Apple'          ] = 1;
	TrackList['Игры'           ] = 1;

	//TrackList['Talks'          ] = 1;
	//TrackList['Linux в России' ] = 1;




	// ------------------------------------------------------------------------





	//MAIN

	var jTR = $('div.forum table.message-table tbody tr');
	//alert(jTR.length);
	jTR.each(function() {
		var td1 = jq("td:first a.secondary", this);
		var td2 = jq("td:first", this).get(0);

		var forum = td1.text().replace(/^\s+|\s+$|\n/g,"");
		var nick  = td2.childNodes[2].textContent.replace(/[в( )\n]/g, '');

		if (TrackList[forum] || BlackList[nick]) {
			$(this).hide();
		}
	 
	});
}
