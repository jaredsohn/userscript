// ==UserScript==
// @name           Google Search: Columnizer
// @namespace      http://arantius.com/misc/greasemonkey/
// @description    Reformat Google search results to appear in two columns
// @version        2.3
// @include        http://www.google.com/search?*
// @include        https://www.google.com/search?*
// @include        https://encrypted.google.com/search?*
// @include        http://google.multiseek.net/search?*
// @require        http://arantius.com/misc/greasemonkey/imports/dollarx.js
// ==/UserScript==

// Version 2.3, May 26, 2011:
//  - Do not run on image search result pages.
// Version 2.2, May 7, 2011:
//  - Move stuff before results (e.g. currency conversion/weather) outside columns.
// Version 2.1, Mar 31 2011:
//  - Clean up display of "blocked results" marker.
// Version 2.0, Aug 28 2010:
//  - Rearrange video results vertically, to fit well in the narrower columns.
// Version 1.0, ??? ?? ????:
//  - Previous version, history untracked.

// Do not run if these keyword(s) are in the URL (image search).
if (-1 !== document.location.href.indexOf('tbm=isch')) return;

const MAX_URL_LEN=50;

GM_addStyle(
	// Full width
	'#center_col, #cnt, #footerbox { max-width: none; } ' +
	'#tsf { margin: 0 !important } ' +
	// Columnize
	'ol.result-column { width: 48.9%; float: left; } ' +
	'ol.result-column + ol.result-column { padding-left: 2%; } ' +
	'#ires + *, #foot, #wrg, #tadsb, #botstuff { clear: both; } ' +
	'#res li { list-style: none; }'
);

var results=$x("//div[@id='ires']/ol/li[starts-with(@class, 'g')]");
var preResults=$x("./preceding-sibling::* | .[@id='newsbox']", results[0]);

var resultCont1=$x("//div[@id='ires']/ol")[0];
var resultCont2=document.createElement('ol');
resultCont1.parentNode.appendChild(resultCont2);
resultCont1.className='result-column';
resultCont2.className='result-column';

function shortenUrl(urlIn) {
	if (urlIn.length<=MAX_URL_LEN) return urlIn;
	
	// Split the URL into parts (at slashes); skip schemes and trailing slashes.
	var prefix='';
	var suffix='';
	var m=urlIn.match( /^(\w+:\/\/)?(.*?)(\/)?$/ );
	if (m) {
		prefix=m[1] || '';
		urlIn=m[2];
		suffix=m[3] || '';
	}
	var urlParts=urlIn.split('/');
	var urlOut=urlIn;

	// If there are enough parts, remove parts from the middle, always
	// leaving the first and last part.
	if (urlParts.length>3) {
		var m=urlParts[urlParts.length-2].match(/(.*)\.\.\.$/);
		if (m) {
			urlParts.splice(urlParts.length-2, 1, m[1], '...');
		} else if ('...'!=urlParts[urlParts.length-1]) {
			urlParts.splice(urlParts.length-1, 0, '...');
		}
		
		while (urlParts.length>3
			&& urlParts.join('/').length+prefix.length+suffix.length > MAX_URL_LEN
		) {
			urlParts.splice(urlParts.length-3, 2, '...');
		}
		
		urlOut=urlParts.join('/');
	}

	if (urlOut.length>MAX_URL_LEN) {
		urlOut=urlIn.substr(0, MAX_URL_LEN-3-prefix.length-suffix.length)+'...';
	}

	return prefix+urlOut+suffix;
}

// Move stuff before the first result above the columns.
for (var i=0, el=null; el=preResults[i]; i++) {
  resultCont1.parentNode.insertBefore(el, resultCont1);
}
// Move out the first result if it isn't a result (e.g. weather).
var el=results[0];
if (el.getElementsByTagName('cite').length == 0) {
  resultCont1.parentNode.insertBefore(el, resultCont1);
  results.splice(0, 1);
}

// Move past-half results to column 2.
var el, i=results.length-1;
while (resultCont2.offsetHeight < resultCont1.offsetHeight) {
	el=results[i--];
	resultCont2.insertBefore(el, resultCont2.firstChild);
}
// Move the last-moved result back, to make the first column longer ...
// IF the following element isn't supposed to be grouped with it.
if (results[i+2] && (
	!results[i+2].getAttribute('style')
	|| !results[i+2].getAttribute('style').match('margin-left')
	)
) {
	resultCont1.appendChild(el);
}


// shorten urls that might not fit in the columns
var cites=$x("//div[@id='ires']/ol/li//cite");
for (var i=0, cite=null; cite=cites[i]; i++) {
	cite.textContent=shortenUrl(cite.textContent);
}

// rearrange wide video results
var videoRows = $x(
    "//li[contains(@class, 'videobox')]/table[@class='ts']/tbody/tr");
if (videoRows) {
  var row1, row2;
  while (row1 = videoRows.pop()) {
    row2 = row1.cloneNode(true);
    row1.removeChild(row1.childNodes[0]);
    row2.removeChild(row2.childNodes[1]);
    row1.parentNode.appendChild(row2);
  }
}
