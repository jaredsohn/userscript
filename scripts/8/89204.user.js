// ==UserScript==

// @name           Add to PC

// @namespace      http://what.cd

// @description    Add to PC

// @include        http*://*what.cd/torrents.php?id=*

// @include        http*://*what.cd/collages.php?id=*&addtorrent=*



// ==/UserScript==



(function(){ // jquery

	function GM_wait() {

		if (typeof unsafeWindow.jQuery == 'undefined') {

				window.setTimeout(GM_wait, 100);

		} else {

			$ = unsafeWindow.jQuery.noConflict(true);

			letsJQuery();

		}

	}

	if (typeof unsafeWindow.jQuery == 'undefined') {

		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,

		GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';

		GM_JQ.type = 'text/javascript';

		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);

	}

	GM_wait();

})(); // jquery end



function letsJQuery() {

	var base = "http://what.cd/";

	if (window.location.href.split("&addtorrent=")[0] != window.location.href) {

		$ID = window.location.href.split("&addtorrent=")[1];

		$('[name=url]').val($ID);

		$('input:[type=submit]:[value=+]').click();

	}

	if (window.location.href.split(base+"torrents.php?id=")[0] != window.location.href) {

		function load_page_then(uri, then) {

			GM_xmlhttpRequest({

				method: "GET",

				url: uri,

				onload: then



			});

		}

		$userID = $('.username').attr('href');

		var userID = $userID.split("user.php?id=")[1];

		$link = base+"user.php?id="+userID;


		load_page_then($link, function (response) {

			var m = response.responseText;

			m = m.split("\">see full</a>")[0].split("<a href=\"");

			var personalCollage = m[m.length-1];

			$addLink = base+personalCollage+"&addtorrent="+window.location.href;

			$('.linkbox').eq(0).append("<a href='"+$addLink+"'>[Add to PC]</a>");

		});

	}

}