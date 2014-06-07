// ==UserScript==
// @name           Orkut Scrapbook Deleter
// @namespace    
http://www.devilsworkshop.org/2007/04/03/orkut-scrap-deleter-script-anti-flooding/
// @description    Cleans scrapbook too fast
// @include        http://www.orkut.*/Scrapbook.aspx*
// ==/UserScript==



window.addEventListener(
	'load',
	function() {
	
	if ( window.location.href.match("&pageSize=30") == ("&pageSize=30") ) {
			window.location.href = "javascript: _checkAll(document.scrapsForm,'scrapKeys', true); javascript: _singleDelete(function() {_submitForm(scrapsForm, 'delete')});"
		}
	else {
		window.location.href = "javascript:changePageSize('30');"
	}

	},
	true);

