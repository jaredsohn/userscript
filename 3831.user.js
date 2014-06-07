// ==UserScript==
// @name           Tradera enhanced watch list
// @namespace      http://henrik.nyh.se
// @description    Makes the Tradera watch list more usable. Puts the list above the page text, adds thumbnails and removes cruft. Coming later: autologin, Remindera integration.
// @include        http://www.tradera.com/trader/trader_memorylist.aspx*
// ==/UserScript==

/* Todo:
	- ett-obj-xpath
	- autologin
		@include        http://www.tradera.com/login.aspx?url=*trader_memorylist.aspx
	- removed "filter" for convenience - might change this later
	- get e-mail from http://www.tradera.com/trader/trader_change_email.aspx and use for Remindera integration
	- add-to-list-and-bounce-back?
*/

function xp(query) { return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function xps(query) { return xp(query).snapshotItem(0); }
function before(first, last) { last.parentNode.insertBefore(first, last); }
function destroy(node) { node.parentNode.removeChild(node); }

var eIntroHead 		= xps('/html/body/font/table[2]');
var eIntroHeadBr		= xps('/html/body/font/table[2]/following-sibling::br');
var eIntroBody			= xps('/html/body/font/table[3]');
var eIntroBodyBr		= xps('/html/body/font/table[3]/following-sibling::br');
var eEndOfList			= xps('/html/body/form/form/font/table[4]');
var eEndOfEmptyList	= xps('/html/body/form/form/font/font/following-sibling::br');
var eFilter 			= xps('/html/body/form/font/table');
var eItems				= xp('/html/body/form/form/font/table[3]/tbody/tr/td[3]/a');
var eAuctionHead 		= xps('/html/body/form/form/font/table[2]/tbody/tr/td[2]');
var eFirstAuction		= xps('/html/body/form/form/font/table[3]/tbody/tr[1]/td[2]');
var eNameHead 			= xps('/html/body/form/form/font/table[2]/tbody/tr/td[3]');
var eFirstName			= xps('/html/body/form/form/font/table[3]/tbody/tr[1]/td[3]');

var reThumb				= new RegExp('http://images\\.tradera\\.com/\\d+/[\\d_]+\\.jpg');


/*
// Fix table cell widths

eAuctionHead.style.width = eFirstAuction.style.width = '100px';  // Initially 50px
eNameHead.style.width = eFirstName.style.width = '336px';  // Initially 386px


// Move intro part below the list

var eol = eEndOfList || eEndOfEmptyList;

destroy(eIntroHeadBr);
destroy(eIntroBodyBr);
destroy(eFilter);

before(eIntroBody, eol);
before(eIntroHead, eIntroBody);
before(eol, eIntroHead);

eIntroHead.style.marginTop = '20px';

*/


// Get thumbs

for (var i = 0; i < eItems.snapshotLength; i++) {

	var item = eItems.snapshotItem(i);
	
	(function(item) {
		GM_xmlhttpRequest({
			method:"GET",
			url:item.href,
			onload:function(result) {

					var thumbURL = result.responseText.match(reThumb);
					if (!thumbURL) return;
			
					var thumbLink = document.createElement('a');
					thumbLink.href = item.href;

					var thumb = document.createElement('img');
					thumb.src = thumbURL;
					thumbLink.appendChild(thumb);
					thumb.style.maxWidth = thumb.style.maxHeight = '64px';
					
					var idcell = item.parentNode.previousSibling.previousSibling;
					idcell.innerHTML = '';
					idcell.appendChild(thumbLink);

			}
		});
	})(item);
	
}