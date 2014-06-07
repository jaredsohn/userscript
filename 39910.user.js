// ==UserScript==

// @name           Streak Marker

// @description    Streakmarker v.01

// @include        http://forumwarz.com/domination/vanilla

// @include        http://*.forumwarz.com/domination/vanilla

// @include        http://*.forumwarz.com/bookmarks/by_type/forums

// @include        http://forumwarz.com/bookmarks/by_type/forums

// @include        http://*.forumwarz.com/bookmarks/community

// @include        http://forumwarz.com/bookmarks/community

// ==/UserScript==



Ajax = unsafeWindow['Ajax'];

$ = unsafeWindow['window'].$;

$$ = unsafeWindow['window'].$$;



var marker = document.createElement("img");

marker.setAttribute("src","http://www.forumwarz.com/images/scoops/pistachio.png");





function processStreak(text, dom) {

	var tables = $$('table.highlighting')

	for (var table in tables) {

		if(tables[table].getElementsByTagName) {
			if(document.title.indexOf("Domination") != -1) {
				var forums = tables[table].getElementsByTagName('td');
			} else {
				var forums = tables[table].getElementsByTagName('a');
			}

			var rtext = text.responseText.toLowerCase().replace(/[^\w]/g,"");

			for (var forum in forums) {

				if(forums[forum].innerHTML && !forums[forum].innerHTML.match(/^[0-9]+$/) && rtext.indexOf(forums[forum].innerHTML.toLowerCase().replace(/[^\w]/g,"")) != -1) {

					var tmp = marker.cloneNode(true);

					//forums[forum].insertBefore(tmp);

					forums[forum].appendChild(tmp);

				}

			}
		}

	}

}

function addMarkers() {

	//new Ajax.Request('/bookmarks/streak', {asynchronous:true, evalScripts:false, onComplete:function(request) {processStreak(request)}});

	GM_xmlhttpRequest({

    method: 'GET',

    url: 'http://www.forumwarz.com/bookmarks/streak',

    onload: function(responseDetails) {

        processStreak(responseDetails);

    }

	});

}









if (document.title.indexOf("Domination") != -1) {

	window.addEventListener("load", function (e) {addMarkers();}, "false");

} else {

	addMarkers();

}