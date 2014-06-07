// ==UserScript==
// @name         drupal.org themes shows only thumbnail available
// @namespace     http://stayple.net/
// @description	  in English: shows only thumbnail availabe themes in drupal.org theme overview page., in Japanese: drupal.orgテーマ一覧ページで，サムネイルが存在するテーマのみを表示します。
// @include       http://drupal.org/project/Themes*
// ==/UserScript==

(function() {

var debug  = false;
var themes_snap = null;

thumbfilter_init();

function thumbfilter_init() {
	
	if (debug) console.log("This url is a theme overview page.");
	
	themes_snap = document.evaluate("//div[@id='project-overview']/div[not(contains(concat(' ',@class,' '),'project-with-image'))]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// beta code
	thumbfilter_toggle(false);
}

function thumbfilter_toggle(checked) {
	for( var i = 0, len = themes_snap.snapshotLength; i < len; i++ ) {  
		themes_snap.snapshotItem(i).style.display = (checked) ? "block" : "none";  
	} 
}

// TODO
function thumbfilter_form() {
	var div = document.evaluate("//form[@id='project-release-version-filter-form']//div[@class='container-inline']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.appendChild(document.createElement('div'));

	var toggle_box = div.appendChild(document.createElement('input'));
	toggle_box.setAttribute('type', 'checkbox');
	toggle_box.setAttribute('onchange', 'toggle();');
	toggle_box.setAttribute('value', "shows only thumnail available");
	div.appendChild(document.createElement('p')).innerHTML = 'Filter by thumbnail available';
}


})();