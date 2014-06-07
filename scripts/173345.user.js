// ==UserScript==
// @name        Yahoo! Japan Auctions Helper
// @namespace   http://userscripts.org/users/163777
// @include     http://page*.auctions.yahoo.co.jp/show/contact*
// @include     http://page*.auctions.yahoo.co.jp/jp/show/contact*
// @require 	http://code.jquery.com/jquery.min.js
// @version     1.01
// @grant       GM_xmlhttpRequest
// ==/UserScript==

$('a[onclick][href^="/show/contact_detail"]').each(function () {
	var tr$ = $(this).closest('tr');

	GM_xmlhttpRequest({
		method: "GET",
		url: this.href,
		onload: function (response) {
			$('<tr><td class="ex_contact" colspan="4"></td></tr>').insertAfter(tr$)
				.find('td').append($(response.responseText).find('table[bgcolor="#e3e3e3"]'));
		}
	});
});
