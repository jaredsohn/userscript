// ==UserScript==
// @name           OpenAccessJournals Impact Index
// @namespace      http://dit.upm.es/atapiador/greasemonkey
// @include        http://www.doaj.org/doaj*
// ==/UserScript==

function searchISSN(issn) {
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://sauwok.fecyt.es/admin-apps/JCR/JCR?RQ=LIST_SUMMARY_JOURNAL",
    data: "Search.x=12&Search.y=12&query_new=true&query_type=search_issn&query_data=" + issn,
    headers: {
    "User-Agent": "Mozilla/5.0",            // Recommend using navigator.userAgent when possible
    "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function(response) {
      if(response.status != 200){
	GM_log([
	  response.status,
	  response.statusText,
	  response.readyState,
	  response.responseHeaders,
	  response.responseText,
	  response.finalUrl,
	  response.responseXML
	].join("\n"));
	return
      }
      
//      var isiErrorXpath = '/html/body/form/center[font = "***** No matching journals were found. *****"]';
      var isiError = '<font class="error">***** No matching journals were found. *****</font>';
      var isiSuccess = 'Journals from';
      
      //var isiDocument = (new DOMParser()).parseFromString(response.responseText, 'application/xhtml+xml'); 
      
      if (response.responseText.indexOf(isiError) > 0) {
        GM_log("Not found: "+ issn);
      } else if (response.responseText.indexOf(isiSuccess) > 0) {
        GM_log("Success!!! " + issn);
//	var jcrData = response.responseText.match(/<table.*<\/table>/);
//	GM_log(jcrData.length);
	doajList.innerHTML += response.responseText;
	
      } else {
        GM_log("Error: " + num);
      	GM_log([
	  response.status,
	  response.statusText,
	  response.readyState,
	  response.responseHeaders,
	  response.responseText,
	  response.finalUrl,
	  response.responseXML
	].join("\n"));}
    }
  });
};

var doajXpath = '//p[b = "ISSN"]'
var doajListSearch = document.evaluate(doajXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (doajListSearch.snapshotLength != 1){
  GM_log("DOAJ list not found!");
  return
}

var doajList = doajListSearch.snapshotItem(0);
  
var issnTags = doajList.innerHTML.match(/<b>E?ISSN<\/b>.*\d+/g);

GM_log("Found " + issnTags.length + " *ISSN tags");

if (issnTags.length < 1)
  return;

// Replace DOAJ HTML with spans
var issns = new Array();

for(i = 0; i < issnTags.length; i++){
  var num = issnTags[i].match(/\d+/);
  issns.push(num); 
  
  searchISSN(num);
 // doajNewHTML.replace(issnTags[i], issnTags[i] + '<br><div id="issn-' + num + '">Searching...</div>');
 /*
  doajNewHTML += issnTags[i];
  doajNewHTML += '<br>';
  doajNewHTML += '<div id="issn-' + num + '">';
  doajNewHTML += searchISSN(num); 
  doajNewHTML += '</div>';
 */
}

  
