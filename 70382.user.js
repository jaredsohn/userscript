// ==UserScript==
// @name           Amazon Wish List Export
// @namespace      muckl.com
// @description    Adds a button to the wish list for exporting EAN/UPC and Title of DVDs, HD DVDs and Blu-rays to CSV format.
// @include        http*://*amazon.at/*wishlist*
// @include        http*://*amazon.ca/*wishlist*
// @include        http*://*amazon.co.uk/*wishlist*
// @include        http*://*amazon.com/*wishlist*
// @include        http*://*amazon.de/*wishlist*
// @include        http*://*amazon.fr/*wishlist*
// @copyright      2010, Muckl (http://userscripts.org/users/Muckl)
// @license        GPL (http://www.gnu.org/copyleft/gpl.html)
// @version        0.0.2
// ==/UserScript==

/**

   ChangeLog       [REL] v0.0.2 [2010-03-31]
                   [FIX] Missing double prime at end of CSV code
                   [ADD] Error message on empty wish list
                   [FIX] Changed to work with new Amazon design
                   [ADD] Double primes in titles are replaced with quotes
                   [ADD] Show count for exported rows
                   [REL] v0.0.1 (initial release) [2010-03-03]

   DevLog          [ADD] Make popup draggable, add sticky, resizing, maximizing and minimizing buttons
                   [ADD] Support for Amazon.co.jp
                   [ADD] Translations for .co.jp, .ca/.fr and .de/.at
                   [ADD] Export priority (in case of need, grab it from the web list)
                   [ADD] Provide drop-down(s) for filtering the export (dynamically via JS)
                   [ADD] Custom user settings (other products than movies, user-defined item properties, ...)

**/

//////////////////////////////////////////////////////////////////////////////////////////
//        PARAMETERS NEED TO BE FILLED UP, OTHERWISE THIS SCRIPT DOESN'T WORK!          //
//////////////////////////////////////////////////////////////////////////////////////////

// user Amazon Access Key ID
var AWSAccessKeyId = '';

// user Amazon Secret Access Key
var AWSSecretAccessKey = '';

// user wish list id (only required, if automatic id lookup fails)
var WishListId = '';

//////////////////////////////////////////////////////////////////////////////////////////
//                       END OF CONFIG BLOCK, SCRIPT STARTS                             //
//////////////////////////////////////////////////////////////////////////////////////////

// get current domain
var tld = '', m = window.location.href.match(/amazon\.([a-z\.]+?)\//);
if (m !== null) {
	tld = m[1];
	if (tld === 'at') {
		tld = 'de';
	} else if (tld === 'co.jp') {
		tld = 'jp';
	}
}

// add export button
if (tld !== '') {
	var headline = document.getElementById('listActionMenus');
	var btn = document.createElement('img');
	btn.style.marginLeft = '20px';
	btn.style.verticalAlign = 'middle';
	btn.src = 'data:image/gif;base64,R0lGODlhTwARAOZSALu9r15mgoySmIqKWaqqhjtFcUZQd93ev6Ono7O2qPLy7KCgedLTupOYqdPTs8nKssTEs2dvhtHRsWlxiPDw39TVt8bItL7ArTpFcYGHk1JbfGFqjK%2ByqX6EkEhSfOPj21xlgcbJzJidnqiso4eNlFtkgHV8jauwuJ2hnt3f19jYukVPdlFae4eNpKCltN%2Fg3Li7wHyCj6CkoEZPdquupba5qlBZe1pifzxGdOrq3pKXmevs5J%2BksLq8prCyoomPlXF4isTHx3N6i9DQu4WKktLU1OPjv%2Fb25jA7bNrauM7Ornx8TZiYbLu7nd%2FfvPz89%2Fj47OnpxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAABPABEAAAf%2FgFJSCkMETIeIiYqLjI2Oj5CICxAKglIfBBIUT5ydnp%2BgoaKjpKWdFA4EH4MERk9QsLGys7S1tre4ubNPRgQKEBKvR8MpDcYNKcPKy8zNzs%2FMOcYwykENPMkwJ8on28NQTxIQCxRQR7EhSBvrRbq4LyGyIS%2B4Hh4tOC5Q6RseSDsukMS6F%2BschQUDXkGhECUKACQNI0qcSJFiAAESkQCo2PAhgygZJkQRYCDKASQcGGiMotJCw3PgBiQ8IvGhRBEFGCBAwiCABiQFXCIogCTAgYcaLiIp2jDAUgEWDCAx4LIjRIk7EUg0kCHK0IkxB0CZ%2BDCAWZMGJhjAGMBAT5EF%2F0QcKIDgIdQoFzNuNBEgygSRVi0W%2FQhSQxQTJihCkUnxIYDHDTlMPYC3q4C%2BKy%2FabIoxYmaMIvoGpsjBQM4okudqpSjTCNmrEXcaoJz3cpTPm%2FF2bvh5pOHRADDWNYlERMMCApBQnmiktZHnz2sggW5ExYwOBToYAcHCiJAIRpDIMDLjh3ToILRDR0LDSATwHUBAV8HevfwI3emPd1%2BgO3XoMjnwXwJLLUUCCStUgAISCZSAAQZIjOBEDEisgEEFBDqhIQlIxKChEw6iQOAKEX7oBBBIQCjhCAXaUIGGC%2BrwIXUODEBAExoaYeKOO5ZAwgUvanhBAkHu%2BMAFJl7wgIATDySw5I5DPslkAgnwuKOOTjRBwDgSJPFhEmCGKSaYNxAx5plopqnmmmhqmIQDkyhAAAFKKOGAA3XmqWeePvSw55%2BABirooIA6IIESc1aCCRM3NuHoo5BGKumklFZq6aWPLrDAKoL8gtAAS4Qq6qiklmrqqaimquoSTDRRiRSBAAA7';
	headline.appendChild(btn);
	activateBtn();
}

function initExport() {
	deactivateBtn();
	loading(headline);
	if (WishListId === '') {
		var m = document.location.href.match(/wishlist\/([A-Z0-9]+?)(?:$|\/)/i);
		if (m !== null) {
			getWishListDetails(m[1]);
		} else {
			sendRequest('&Operation=ListSearch&ListType=WishList&Name=' + document.title.split(': ')[1].replace(/\s/g, '%20'), function (r) {
				if (r.status === 200) {
					var m = r.responseText.match(/<ListId>([A-Z0-9]+?)<\/ListId>/i);
					if (m !== null) {
						getWishListDetails(m[1]);
					} else {
						loading(headline, 0);
						activateBtn();
						alert('Error: No WishList ID was found!\n\nPlease enter your wish list id inside the config block\n--> var WishListId = \'ID-COMES-HERE\'');
					}
				} else {
					alert('Error: initExport [ListSearch query] wasn\'t successful!');
				}
			});
		}
	} else {
		getWishListDetails(WishListId);
	}
}

function getWishListDetails(WishListId) {
	sendRequest('&Operation=ListLookup&ListType=WishList&ListId=' + WishListId, function (r) {
		if (r.status === 200) {
			var dom = new DOMParser().parseFromString(r.responseText, 'application/xml');
			var pages = dom.getElementsByTagName('TotalPages')[0].firstChild.nodeValue;
			if (!isNaN(pages)) {
				getWishListItems(WishListId, 1, parseInt(pages, 10), new Array());
			} else {
				loading(headline, 0);
				activateBtn();
				alert('Error: No valid value for <TotalPages> was found!\n\nThe script is aborted.');
			}
		} else {
			alert('Error: getWishListDetails [TotalPages] wasn\'t successful!');
		}
	});
}

function getWishListItems(WishListId, p, pages, array) {
	sendRequest('&Operation=ListLookup&ListType=WishList&ListId=' + WishListId + '&ProductPage=' + p + '&ResponseGroup=ItemAttributes', function (r) {
		if (r.status === 200) {
			var dom = new DOMParser().parseFromString(r.responseText, 'application/xml')
			var items = dom.getElementsByTagName('ListItem');
			if (items.length > 0) {
				for (var i = 0; i < items.length; i += 1) {
					var type = items[i].getElementsByTagName('Binding')[0];
					var title = items[i].getElementsByTagName('Title')[0].firstChild.nodeValue;
					var pgroup = items[i].getElementsByTagName('ProductGroup')[0].firstChild.nodeValue;
					if ((type === undefined && (title.indexOf('DVD') > -1 || title.indexOf('Blu-ray') > -1 || pgroup === 'DVD')) || 
						type.firstChild.nodeValue === 'DVD' || type.firstChild.nodeValue === 'HD DVD' || type.firstChild.nodeValue === 'Blu-ray') {
							array.push(items[i]);
					}
				}
				if (p < pages) {
					getWishListItems(WishListId, (p + 1), pages, array);
				} else if (p === pages) {
					formatList(array);
				}
			} else {
				loading(headline, 0);
				activateBtn();
				alert('Your Wish List is empty!\n\nIf you want to export a specific wish list, you can enter your wish list id inside the config block\n--> var WishListId = \'ID-COMES-HERE\'');
			}
		} else {
			alert('Error: getWishListItems [ListLookup query] wasn\'t successful!');
		}
	});
}

function sendRequest(params, handler) {
	url = 'http://ecs.amazonaws.' + tld + '/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=' + AWSAccessKeyId + params;
	var signedUrl = AWSQS.signQuery(url, AWSSecretAccessKey);
	GM_xmlhttpRequest({
		method: 'GET',
		url: signedUrl,
		headers: {
			'Accept': 'text/xml'
		},
		onload: handler
	});
}

function formatList(items) {
	var error = 0, csv = '"UPC","Title"\n';
	loading(headline, 0);
	for (var i = 0; i < items.length; i += 1) {
		var ean = items[i].getElementsByTagName('EAN')[0].firstChild;
		if (ean === null || ean === undefined || ean === '') {
			upc = items[i].getElementsByTagName('UPC')[0].firstChild;
			if (upc === null || upc === undefined || upc === '') {
				error += 1;
			} else {
				barcode = upc.nodeValue;
			}
		} else {
			barcode = ean.nodeValue;
		}
		var title = items[i].getElementsByTagName('Title')[0].firstChild.nodeValue.split(' [')[0].replace(/ "/g, ' “').replace(/" /g, '” ');
		csv += '"' + barcode + '","' + title + '"\n';
	}
	if (error > 0) {
		alert('Error: Missing EAN/UPC for ' + error + ' items!');
	}
	createPopup(csv.slice(0, -1), items.length);
}

function createPopup(csv, c) {
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.zIndex = '98';
	div.style.left = '300px';
	div.style.top = '195px';
	div.style.backgroundColor = '#C9E1F4';
	div.style.border = '1px solid #146EB4';
	div.style.opacity = '0.9';
	var table = document.createElement('table');
	table.cellspacing = '7';
	var tr1 = document.createElement('tr');
	var th1 = document.createElement('th');
	th1.width = '45%';
	var mark = document.createElement('img');
	mark.src = 'data:image/gif;base64,R0lGODlhMwARANU%2FALu9r15mgoqKWaqqhoeNlLO2qPLy7KCgedPTsztFcXV8jd3ev8TEs9HRsZidnomPlfDw34GHk8bItJ2hnr7ArVJbfOPj20ZQd7a5qltkgK%2ByqcnKspKXmVxlgdLTupSZrGlxiKOno9jYumFqjMbJzGZuhVFae5SZm9DQu1BZe6iso0VPdquupWdvhqCltHyCj6CkoEhSfIySmN%2FfvOPjvzA7bHx8TdrauM7OrpiYbLu7nfb25vz89%2Fj47OnpxQAAACH5BAEAAD8ALAAAAAAzABEAAAb%2FwN%2FPgBrkjsikcslsKg8Mg%2FBnGTQgvKx2y%2B16v1wIYmAZDmi8nnrNbrvf8DePNjAwGumdfs%2Fv%2B%2F%2BAfz08DQwHED07ayM1LmsxNSRxPR8fkz0kNT0jlmqKEAcCaT0QPj4BNQGmEjU1AKawsT4yMrK2ADWntT6KgwKiO7EBqAs%2BEaivAAoREj4ADgohtAsyr6YeMiAazrkBu6a%2BAj2y3gkhPhUOrj4JESAVszURALQRF8WmCgHqEri6sj1%2B2fKmQIGHGgcBLNCgQd0sVbMqJGgGS0IIXAD8ebP1iwY5GRoSOIDnasGFCyByyYAo40ICfPkSKHCl8ZspGh1p6NTZ4YGIwRoJTtCogQFDDRowjj7ooPPBAxMtdg5l8bPo0Z5Sdf5CkDUDgRklalCYUaMAhRovUtSYQSDDDLYEznJ4O2NFhrAFCqz1OkMqAgEDdLyl8XZCgRkFvrLdMGMCAceIJ7zNO0PF3LcUCHAgsGHDV8OD3%2BoYYKjBDbo3Uqtezbq169ep395AAMXAgAE4cCBAkLu379%2FAgwvvjaABjttSquQIrKO58%2BfQo0ufDv3AgTJC7IQSYKO79%2B%2Fgw4sf7z2HDik%2FggAAOw%3D%3D';
	mark.style.cursor = 'pointer';
	mark.style.cssFloat = 'left';
	mark.addEventListener('click', function (e) { textarea.focus(); textarea.select(); }, false);
	th1.appendChild(mark);
	var th2 = document.createElement('th');
	th2.align = 'center';
	th2.width = '10%';
	th2.noWrap = true;
	var count = document.createElement('span');
	count.style.zIndex = '99';
	count.style.fontFamily = 'Verdana,Arial,Helvetica,sans-serif';
	count.style.fontSize = '12px';
	count.style.color = '#303B6C';
	count.appendChild(document.createTextNode(c + ' item' + ((c === 1) ? '' : 's')));
	th2.appendChild(count);
	var th3 = document.createElement('th');
	th3.align = 'right';
	th3.width = '45%';
	var close = document.createElement('img');
	close.src = 'data:image/gif;base64,R0lGODlhEQARAMQAAJ25yey0eGiRtAxXoFGMw1%2BRuGWNqmKUwAtTm22TrRtglFqSxrHK2Mna5dvf4QtUnBdTjEqIwBhekt7q8ufv9WmWuDh0pu%2F0%2BLzR4uqYUXGZuuHp7zRqmNlyLP%2F%2F%2FwAAACH5BAAAAAAALAAAAAARABEAAAWA4LIcWmmalXYQrAZMVyzLDlBFBeDtfM8DhcrGR9xtKgLKLhPwBTI7iiC563SgS2tUUFFWrRlrh0epWIY8sZa3sZx9Yl%2F7nVb32hy0RxxeezYceV9YHn1GgWhMTliAHA1FRA0cCgmQPgkKDxwGDBien58MBhwDCAgQgamqgRIDAyEAOw%3D%3D';
	close.align = 'right';
	close.style.cursor = 'pointer';
	close.addEventListener('click', deletePopup, false);
	th3.appendChild(close);
	tr1.appendChild(th1);
	tr1.appendChild(th2);
	tr1.appendChild(th3);
	table.appendChild(tr1);
	var tr2 = document.createElement('tr');
	var td1 = document.createElement('td');
	td1.colSpan = '3';
	var textarea = document.createElement('textarea');
	textarea.value = csv;
	textarea.readOnly = true;
	textarea.style.width = Math.round(screen.availWidth / 2) + 'px';
	textarea.style.height = Math.round(screen.availHeight / 2) + 'px';
	textarea.style.border = '1px solid #146EB4';
	td1.appendChild(textarea);
	tr2.appendChild(td1);
	table.appendChild(tr2);
	div.appendChild(table);
	document.body.appendChild(div);
}

function deletePopup() {
	document.body.removeChild(document.body.lastChild);
	activateBtn();
}

function activateBtn() {
	headline.lastChild.style.opacity = '1.0';
	headline.lastChild.style.cursor = 'pointer';
	headline.lastChild.addEventListener('click', initExport, false);
}

function deactivateBtn() {
	headline.lastChild.style.opacity = '0.5';
	headline.lastChild.style.cursor = '';
	headline.lastChild.removeEventListener('click', initExport, false);
}

function loading(parent, action) {
	if (typeOf(parent) === 'object') {
		if (action === 0) {
			parent.removeChild(parent.lastChild);
		} else {
			var load = document.createElement('img');
			load.style.marginLeft = '10px';
			load.style.verticalAlign = 'middle';
			load.src = 'data:image/gif;base64,R0lGODlhEgASAMQaAHl5d66urMXFw3l5dpSUk5WVlKOjoq%2BvrsbGw6Sko7u7uaWlpbm5t3h4doiIhtLSz4aGhJaWlsbGxNHRzrCwr5SUkqKiobq6uNHRz4eHhf%2F%2F%2FwAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFAAAaACwAAAAAEgASAAAFaaAmjmRplstyrkmbrCNFaUZtaFF0HvyhWRZNYVgwBY4BEmFJOB1NlYpJoYBpHI7RZXtZZb4ZEbd7AodFDIYVAjFJJCYA4ISoI0hyuUnAF2geDxoDgwMnfBoYiRgaDQ1WiIqPJBMTkpYaIQAh%2BQQFAAAaACwBAAEAEAAQAAAFY6AmjhpFkSh5rEc6KooWzIG2LOilX3Kd%2FAnSjjcyGA0oBiNlsZAkEtcoEtEgrghpYVsQeAVSgpig8UpFlQrp8Ug5HCiMHEPK2DOkOR0A0NzxJBMTGnx8GhAQZwOLA2ckDQ0uIQAh%2BQQFAAAaACwBAAEAEAAQAAAFZKAmjpqikCh5rVc6SpLGthSFIjiiMYx2%2FAeSYCggBY4B1DB1JD0ertFiocFYMdGENnHFugxgg2YyiYosFhIAkIpEUOs1qUAvkAb4gcbh0BD%2BBCgNDRoZhhkaFRVmh4hmIxAQLiEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6aJJEoiaxIOj6PJsyCpigopmNyff0X0o43AgZJk0mKwSABAK4RhaJ5PqOH7GHAHUQD4ICm0YiKwCSHI7VYoDLwDClBT5Di8khEY%2BgbUBAQGgWEBRoWFmYEiwRmJBUVLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo7a85Aoia1YOgKAxraShMKwNk0a4iOkgXBAEhgFqEYjZSQ5HK6RQqHJWDPRi%2FZyxbq2Fw0EEhUxGKRIJEWhoArwAulAP5AIeIJmsdAE%2FgEoFRUaCYYJfoFRBowGZSQWFi4hACH5BAUAABoALAEAAQAQABAAAAVloCaOGgCQKGma6eg42iAP2vOgWZ5pTaNhQAxJtxsFhSQIJDWZkCKR1kgi0RSuBSliiyB4CVKBWKCpVKQiMWmxSCkUqIQ8QbrYLySD3qChUDR3eCQWFhoHhwcaDAxoAY4BaCSOLSEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6a45Aoma1ZOkaRxrYAgBZ4oUGQVtckgpBAGhgHqEol1WiQFgvX6PHQJK4JKWaLMXgNWq7GYpGKJhMShZKSSFCH%2BIGEqCNIgXxAo1BoBIACKHkaF4YXf4JSh4hmIwwMLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo5aFJEoWaxFOi6LRsyE5jhooidaVWmZYIZkKBpIwiHJYklBICQKxTUCADSH7IFqtQa%2BAepgPNB8qaJGg6RQpB4P1GV%2BIWHuGBK9LpFo8HkkDAwaCIYIGhMTaAKNAmgkjS4hADs%3D';
			parent.appendChild(load);
		}
	} else {
		throw new Error('loading() expects an object as first paramter [optional second paramter is 0]');
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
//                         AWS QUERY & HELPER FUNCTIONS                                 //
//////////////////////////////////////////////////////////////////////////////////////////

function typeOf(v) {
	var s = typeof v;
	if (s === 'object') {
		if (v) {
			if (v instanceof Array) {
				s = 'array';
			}
		} else {
			s = 'null';
		}
	}
	return s;
}


/*
    AWSQS = Amazon Web Services / Product Advertising API Query Signer (JavaScript)

    2009.08.19, SowaCS: fixed "bug" for POST - do not encode Signature in this case (affected fnSignatureFromArray only)
    2009.06.25, SowaCS: added getSignatureFromArray: fnSignatureFromArray.  this provides much better signing
    2009.06.12, SowaCS: adjust for ff back button / form state / dom "bug" (better this way anyway)
    2009.06.02, SowaCS: fixed 1 digit day of month handling (for ie)
    2009.05.24, SowaCS: added "getSignature" method (allows explicit verb to be passed))
    2009.05.21, SowaCS: fixed some errors picked up by http://jslint.com/
    2009.05.18, SowaCS: tweaks
    2009.05.17, SowaCS: factored more generic form & query methods
    2009.05.16, SowaCS: mods for SRE
    2009.05.11, SowaCS: original; with thanks for assistance to the folks at
        http://developer.amazonwebservices.com/connect/thread.jspa?threadID=31701

    All customary licenses and disclaimers for code posted in open forums apply.

    ============================================================================


    Dependencies - you will need to download, save & reference the following:

    - ecmanaut.base64.js from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
*/

// Based on public domain code by Tyler Akins <http://rumkin.com/>
// Original code at http://rumkin.com/tools/compression/base64.php

var Base64 = (function() {
	function encode_base64(data) {
		var out = "", c1, c2, c3, e1, e2, e3, e4;
		for (var i = 0; i < data.length; ) {
			c1 = data.charCodeAt(i++);
			c2 = data.charCodeAt(i++);
			c3 = data.charCodeAt(i++);
			e1 = c1 >> 2;
			e2 = ((c1 & 3) << 4) + (c2 >> 4);
			e3 = ((c2 & 15) << 2) + (c3 >> 6);
			e4 = c3 & 63;
			if (isNaN(c2))
				e3 = e4 = 64;
			else if (isNaN(c3))
				e4 = 64;
			out += tab.charAt(e1) + tab.charAt(e2) + tab.charAt(e3) + tab.charAt(e4);
		}
		return out;
	}

	function decode_base64(data) {
		var out = "", c1, c2, c3, e1, e2, e3, e4;
		for (var i = 0; i < data.length; ) {
			e1 = tab.indexOf(data.charAt(i++));
			e2 = tab.indexOf(data.charAt(i++));
			e3 = tab.indexOf(data.charAt(i++));
			e4 = tab.indexOf(data.charAt(i++));
			c1 = (e1 << 2) + (e2 >> 4);
			c2 = ((e2 & 15) << 4) + (e3 >> 2);
			c3 = ((e3 & 3) << 6) + e4;
			out += String.fromCharCode(c1);
			if (e3 != 64)
				out += String.fromCharCode(c2);
			if (e4 != 64)
				out += String.fromCharCode(c3);
		}
		return out;
	}

	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	return { encode:encode_base64, decode:decode_base64 };
})();

/*

    - jssha256.js from http://point-at-infinity.org/jssha256/
*/

/*
 *  jssha256 version 0.1  -  Copyright 2006 B. Poettering
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License as
 *  published by the Free Software Foundation; either version 2 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307 USA
 */

/*
 * http://point-at-infinity.org/jssha256/
 *
 * This is a JavaScript implementation of the SHA256 secure hash function
 * and the HMAC-SHA256 message authentication code (MAC).
 *
 * The routines' well-functioning has been verified with the test vectors 
 * given in FIPS-180-2, Appendix B and IETF RFC 4231. The HMAC algorithm 
 * conforms to IETF RFC 2104. 
 *
 * The following code example computes the hash value of the string "abc".
 *
 *    SHA256_init();
 *    SHA256_write("abc");
 *    digest = SHA256_finalize();  
 *    digest_hex = array_to_hex_string(digest);
 * 
 * Get the same result by calling the shortcut function SHA256_hash:
 * 
 *    digest_hex = SHA256_hash("abc");
 * 
 * In the following example the calculation of the HMAC of the string "abc" 
 * using the key "secret key" is shown:
 * 
 *    HMAC_SHA256_init("secret key");
 *    HMAC_SHA256_write("abc");
 *    mac = HMAC_SHA256_finalize();
 *    mac_hex = array_to_hex_string(mac);
 *
 * Again, the same can be done more conveniently:
 * 
 *    mac_hex = HMAC_SHA256_MAC("secret key", "abc");
 *
 * Note that the internal state of the hash function is held in global
 * variables. Therefore one hash value calculation has to be completed 
 * before the next is begun. The same applies the the HMAC routines.
 *
 * Report bugs to: jssha256 AT point-at-infinity.org
 *
 */

/******************************************************************************/

/* Two all purpose helper functions follow */

/* string_to_array: convert a string to a character (byte) array */

function string_to_array(str) {
	var len = str.length;
	var res = new Array(len);
	for(var i = 0; i < len; i++)
		res[i] = str.charCodeAt(i);
	return res;
}

/* array_to_hex_string: convert a byte array to a hexadecimal string */

function array_to_hex_string(ary) {
	var res = "";
	for(var i = 0; i < ary.length; i++)
		res += SHA256_hexchars[ary[i] >> 4] + SHA256_hexchars[ary[i] & 0x0f];
	return res;
}

/******************************************************************************/

/* The following are the SHA256 routines */

/* 
   SHA256_init: initialize the internal state of the hash function. Call this
   function before calling the SHA256_write function.
*/

function SHA256_init() {
	SHA256_H = new Array(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 
		0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);
	SHA256_buf = new Array();
	SHA256_len = 0;
}

/*
   SHA256_write: add a message fragment to the hash function's internal state. 
   'msg' may be given as string or as byte array and may have arbitrary length.

*/

function SHA256_write(msg) {
	if (typeof(msg) == "string")
		SHA256_buf = SHA256_buf.concat(string_to_array(msg));
	else
		SHA256_buf = SHA256_buf.concat(msg);
	for(var i = 0; i + 64 <= SHA256_buf.length; i += 64)
		SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf.slice(i, i + 64));
	SHA256_buf = SHA256_buf.slice(i);
	SHA256_len += msg.length;
}

/*
   SHA256_finalize: finalize the hash value calculation. Call this function
   after the last call to SHA256_write. An array of 32 bytes (= 256 bits) 
   is returned.
*/

function SHA256_finalize() {
	SHA256_buf[SHA256_buf.length] = 0x80;

	if (SHA256_buf.length > 64 - 8) {
		for(var i = SHA256_buf.length; i < 64; i++)
			SHA256_buf[i] = 0;
		SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf);
		SHA256_buf.length = 0;
	}

	for(var i = SHA256_buf.length; i < 64 - 5; i++)
		SHA256_buf[i] = 0;
	SHA256_buf[59] = (SHA256_len >>> 29) & 0xff;
	SHA256_buf[60] = (SHA256_len >>> 21) & 0xff;
	SHA256_buf[61] = (SHA256_len >>> 13) & 0xff;
	SHA256_buf[62] = (SHA256_len >>> 5) & 0xff;
	SHA256_buf[63] = (SHA256_len << 3) & 0xff;
	SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf);

	var res = new Array(32);
	for(var i = 0; i < 8; i++) {
		res[4 * i + 0] = SHA256_H[i] >>> 24;
		res[4 * i + 1] = (SHA256_H[i] >> 16) & 0xff;
		res[4 * i + 2] = (SHA256_H[i] >> 8) & 0xff;
		res[4 * i + 3] = SHA256_H[i] & 0xff;
	}

	delete SHA256_H;
	delete SHA256_buf;
	delete SHA256_len;
	return res;
}

/*
   SHA256_hash: calculate the hash value of the string or byte array 'msg' 
   and return it as hexadecimal string. This shortcut function may be more 
   convenient than calling SHA256_init, SHA256_write, SHA256_finalize 
   and array_to_hex_string explicitly.
*/

function SHA256_hash(msg) {
	var res;
	SHA256_init();
	SHA256_write(msg);
	res = SHA256_finalize();
	return array_to_hex_string(res);
}

/******************************************************************************/

/* The following are the HMAC-SHA256 routines */

/*
   HMAC_SHA256_init: initialize the MAC's internal state. The MAC key 'key'
   may be given as string or as byte array and may have arbitrary length.
*/

function HMAC_SHA256_init(key) {
	if (typeof(key) == "string")
		HMAC_SHA256_key = string_to_array(key);
	else
		HMAC_SHA256_key = new Array().concat(key);

	if (HMAC_SHA256_key.length > 64) {
		SHA256_init();
		SHA256_write(HMAC_SHA256_key);
		HMAC_SHA256_key = SHA256_finalize();
	}

	for(var i = HMAC_SHA256_key.length; i < 64; i++)
		HMAC_SHA256_key[i] = 0;
	for(var i = 0; i < 64; i++)
		HMAC_SHA256_key[i] ^=  0x36;
	SHA256_init();
	SHA256_write(HMAC_SHA256_key);
}

/*
   HMAC_SHA256_write: process a message fragment. 'msg' may be given as 
   string or as byte array and may have arbitrary length.
*/

function HMAC_SHA256_write(msg) {
	SHA256_write(msg);
}

/*
   HMAC_SHA256_finalize: finalize the HMAC calculation. An array of 32 bytes
   (= 256 bits) is returned.
*/

function HMAC_SHA256_finalize() {
	var md = SHA256_finalize();
	for(var i = 0; i < 64; i++)
		HMAC_SHA256_key[i] ^= 0x36 ^ 0x5c;
	SHA256_init();
	SHA256_write(HMAC_SHA256_key);
	SHA256_write(md);
	for(var i = 0; i < 64; i++)
		HMAC_SHA256_key[i] = 0;
	delete HMAC_SHA256_key;
	return SHA256_finalize();
}

/*
   HMAC_SHA256_MAC: calculate the HMAC value of message 'msg' under key 'key'
   (both may be of type string or byte array); return the MAC as hexadecimal 
   string. This shortcut function may be more convenient than calling 
   HMAC_SHA256_init, HMAC_SHA256_write, HMAC_SHA256_finalize and 
   array_to_hex_string explicitly.
*/

function HMAC_SHA256_MAC(key, msg) {
	var res;
	HMAC_SHA256_init(key);
	HMAC_SHA256_write(msg);
	res = HMAC_SHA256_finalize();
	return array_to_hex_string(res);
}

/******************************************************************************/

/* The following lookup tables and functions are for internal use only! */

SHA256_hexchars = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
	'a', 'b', 'c', 'd', 'e', 'f');

SHA256_K = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 
	0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 
	0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 
	0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 
	0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 
	0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 
);

function SHA256_sigma0(x) {
	return ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
}

function SHA256_sigma1(x) {
	return ((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10);
}

function SHA256_Sigma0(x) {
	return ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ 
		((x >>> 22) | (x << 10));
}

function SHA256_Sigma1(x) {
	return ((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^ 
		((x >>> 25) | (x << 7));
}

function SHA256_Ch(x, y, z) {
	return z ^ (x & (y ^ z));
}

function SHA256_Maj(x, y, z) {
	return (x & y) ^ (z & (x ^ y));
}

function SHA256_Hash_Word_Block(H, W) {
	for(var i = 16; i < 64; i++)
		W[i] = (SHA256_sigma1(W[i - 2]) +  W[i - 7] + 
			SHA256_sigma0(W[i - 15]) + W[i - 16]) & 0xffffffff;
		var state = new Array().concat(H);
		for(var i = 0; i < 64; i++) {
			var T1 = state[7] + SHA256_Sigma1(state[4]) + 
			SHA256_Ch(state[4], state[5], state[6]) + SHA256_K[i] + W[i];
			var T2 = SHA256_Sigma0(state[0]) + SHA256_Maj(state[0], state[1], state[2]);
			state.pop();
			state.unshift((T1 + T2) & 0xffffffff);
			state[4] = (state[4] + T1) & 0xffffffff;
		}
		for(var i = 0; i < 8; i++)
			H[i] = (H[i] + state[i]) & 0xffffffff;
}

function SHA256_Hash_Byte_Block(H, w) {
	var W = new Array(16);
	for(var i = 0; i < 16; i++)
		W[i] = w[4 * i + 0] << 24 | w[4 * i + 1] << 16 | 
			w[4 * i + 2] << 8 | w[4 * i + 3];
	SHA256_Hash_Word_Block(H, W);
}

/*


    Usage:

    - Reference the dependencies and this file, e.g.:

        <script language="javacript" src="jssha256.js"></script>
        <script language="javacript" src="ecmanaut.base64.js"></script>
        <script language="javacript" src="AWSQuerySigner.js"></script>

    - Call as follows, e.g.:

        AWSQS.signForm( theForm, strAWSSecretAccessKey );

        --- OR ---

        strSignedQuery = AWSQS.signQuery( strOriginalQuery, strAWSSecretAccessKey );


        Can also retrieve timestamp & signature:

        var oSign = AWSQS.getFormSignature( theForm, strAWSSecretAccessKey );
        --- OR ---
        var oSign = AWSQS.getQuerySignature( strOriginalQuery, strAWSSecretAccessKey );
        --- OR ---
        var oSign = AWSQS.getSignature( "POST", strOriginalQuery, strAWSSecretAccessKey );

        where oSign = { Timestamp: (timestamp), Signature: (signature) }



        --- OR (PREFERRED) (added 2009.06.25) ---

        var oSign = AWSQS.getSignatureFromArray( "POST", strEndpointUri, aOriginalQueryAssociativeArray, strAWSSecretAccessKey );
        where oSign = { Timestamp: (timestamp), Signature: (signature), parameters: (array of encoded "key=value") }

    Notes:

    - Intended to assist with retro-fitting existing JavaScript code for the new AWS query signing requirement
    - No error handling is provided

*/

var AWSQS = (function() {

	/* ------ privates ------ */

	function array_to_string( ary ) {
		var str = "";
		for( var i = 0; i < ary.length; i++ ) {
			str += String.fromCharCode( ary[i] );
		}
		return str;
	}

	// uses http://point-at-infinity.org/jssha256/
	function local_HMAC_SHA256_MAC( strKey, strMsg ) {
		HMAC_SHA256_init( strKey );
		HMAC_SHA256_write( strMsg );
		var aHash = HMAC_SHA256_finalize();
		return array_to_string( aHash );
	}

	function fnTranslate( str, aTranslate ) {
		for ( var i = 0; i < aTranslate.length; i++ ) {
			str = str.replace( aTranslate[i][0], aTranslate[i][1] );
		}
		return str;
	}

	function encodeURIComponentAWS( str ) {
		return fnTranslate( encodeURIComponent( str ),
			[ [/!/g, "%21"], [/'/g, "%27"], [/\(/g, "%28"], [/\)/g, "%29"], [/\*/g, "%2A"] ] );
		//'<=because the single quote in the line above messes with my syntax highlighter
	}

	function toZString( dt ) {
		// "Sun, 10 May 2009 18:45:50 UTC" to "2009-05-10T18:45:50Z":
		//  note: ff toUTCString returns "Sun, 17 May 2009 23:31:11 GMT" - !
		return dt.toUTCString().replace( /.{3}, (\d{1,2}) .{3} (\d{4}) (\d{2}:\d{2}:\d{2}) .{3}/,
			function(strMatch, strDay, strYear, strTime) {
				var strDate = (dt.getUTCDate()).toString().replace( /^(\d)$/, "0$1" );
				var strMonth = (dt.getUTCMonth()+1).toString().replace( /^(\d)$/, "0$1" );
				return strYear + "-" + strMonth + "-" + strDate + "T" + strTime + "Z";
			});
	}

	function timestamp() { return toZString( new Date() ); }

	// given method ( "POST" or "GET" ), AWS query (in GET form) and "secret access key",
	// return object with Timestamp and Signature
	// NOTE: you're better off using fnSignatureFromArray (below) !
	function fnSignature( strMethod, strQuery, strKey ) {
		var bEncode = strMethod == "GET";

		var strTimestamp = timestamp();
		strQuery += "&Timestamp=" + ( bEncode ? strTimestamp : encodeURIComponentAWS( strTimestamp ) );

		var strToSign = strQuery.replace( /(https?:\/\/)([^\/]*)(\/.*)\?(.*)/i,
			function( strMatch, strScheme, strHost, strUri, strParams ) {
				var aParams = strParams.split("&").sort();
					if ( bEncode ) {
						for ( var i = 0; i < aParams.length; i++ ) {
							var aKV = aParams[i].split("=");
							for ( var j = 0; j < aKV.length; j++ ) {
								aKV[j] = encodeURIComponentAWS( aKV[j] );
							}
							aParams[i] = aKV.join("=");
						}
					}
				strParams = aParams.join("&");
				strHost = strHost.toLowerCase();
				return ([ strMethod, strHost, strUri, strParams ]).join("\n");
			});

		// Base64 from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
		var strSignature = Base64.encode( local_HMAC_SHA256_MAC( strKey, strToSign ) );
		if ( bEncode ) {
			strSignature = encodeURIComponentAWS( strSignature );
		}

		return { Timestamp: strTimestamp, Signature: strSignature };
	}

	// given method ( "POST" or "GET" ), EndpointUri string,
	// AWS query parameters _in_an_associative_array_,
	// and "secret access key",
	// return object with Timestamp and Signature
	function fnSignatureFromArray( strMethod, strEndpointUri, aQuery, strKey ) {
		var bEncode = strMethod == "GET";

		if ( aQuery["Timestamp"] == undefined )
			aQuery["Timestamp"] = timestamp();

		if ( aQuery["Signature"] != undefined )
			delete aQuery["Signature"];

		var aParams = [];
		var strToSign = strEndpointUri.replace( /([^\/]*)(\/.*)/i,
			function( strMatch, strEndpoint, strUri ) {
				for ( key in aQuery ) {
					var aKV = [ encodeURIComponentAWS(key), encodeURIComponentAWS(aQuery[key]) ];
					aParams.push( aKV.join("=") );
				}
				strParams = aParams.sort().join("&");
				strEndpoint = strEndpoint.toLowerCase();
				return ([ strMethod, strEndpoint, strUri, strParams ]).join("\n");
			});

		// Base64 from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
		var strSignature = Base64.encode( local_HMAC_SHA256_MAC( strKey, strToSign ) );
		if ( bEncode ) {
			strSignature = encodeURIComponentAWS( strSignature );
		}

		return { Timestamp: aQuery["Timestamp"], Signature: strSignature, parameters: aParams };
	}


	/* ------ form helpers ------ */

	function encodeKV( strKey, strVal )  {
		var strK = encodeURIComponentAWS( strKey );
		var strV = encodeURIComponentAWS( strVal );
		return strK + "=" + strV;
	}

	function getKV( elem )  {
		return encodeKV( elem.name, elem.value );
	}

	// getQuery collects up all field values to be POSTed from form,
	// constructs _uri_encoded_ GET style query with form's action
	// _all_ fields must be collected, even if empty (except those not sent).
	// 2009.06.12, fn: all except for the _signature_ & _timestamp_ fields, if present !
	function getQuery( oForm )  {
		var aQuery = [];

		var colElements = oForm.elements;
		for ( var i = 0; i < colElements.length; i++ )  {
			var elem = colElements[i];
			var strType = elem.type ? elem.type.toLowerCase() : "";
			var strTag = elem.tagName.toLowerCase();

			switch( true ) {

				case elem.name == "Signature":
				case elem.name == "Timestamp":
					// SKIP!
					break;

				case strType == "hidden":
				case strType == "text":
				case strType == "checkbox" && elem.checked:
				case strType == "radio" && elem.checked:
				case strTag == "textarea":

					aQuery.push( getKV( elem ) );
					break;

				case strTag == "select":
					var bDone = false;
					for ( var j = 0; j < elem.options.length; j++ ) {
						if ( !bDone && elem.options[j].selected ) {
							aQuery.push( encodeKV( elem.name, elem.options[j].value ) );
							bDone = true;
						}
					}
					if ( !bDone ) { // or are empty selects not POSTed ?
						aQuery.push( encodeKV( elem.name, "" ) );
					}
					break;

				default:
					// nothin'
			}
		}
		return oForm.action + "?" + aQuery.join("&");
	}

	function setHidden( oForm, strName, strValue ) {
		var elem = oForm.elements[ strName ];
		if ( !elem ) {
			elem = document.createElement("input");
			elem.type = "hidden";
			elem.name = strName;
			oForm.appendChild(elem);
		}
		elem.value = strValue;
	}


	/* ------ publics ------ */

	//  get timestamp & signature for form
	function fnFormSignature( oForm, strKey ) {
		return fnSignature( oForm.method.toUpperCase(), getQuery( oForm ), strKey );
	}

	//  get timestamp & signature for query
	function fnQuerySignature( strQuery, strKey ) {
		return fnSignature( "GET", strQuery, strKey );
	}

	// sign form with key: add signature & timestamp
	function fnSignForm( oForm, strKey ) {
		var oSign = fnFormSignature( oForm, strKey );
		setHidden( oForm, "Timestamp", oSign.Timestamp );
		setHidden( oForm, "Signature", oSign.Signature );
	}

	// sign query with key: add signature & timestamp
	function fnSignQuery( strQuery, strKey ) {
		var oSign = fnQuerySignature( strQuery, strKey );
		return strQuery + "&Timestamp=" + oSign.Timestamp + "&Signature=" + oSign.Signature;
	}


	/* ------ expose publics here ------ */
	return {
				signForm: fnSignForm,
				signQuery: fnSignQuery,
				getFormSignature: fnFormSignature,
				getQuerySignature: fnQuerySignature,
				getSignature: fnSignature,
				getSignatureFromArray: fnSignatureFromArray
			};
})();
