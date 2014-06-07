// ==UserScript==
// @name           Second Life Forums: Show first post in hover tip
// @namespace      https://blogs.secondlife.com/
// @description    When user pauses over a thread title, a little box shows text of first post
// @include        https://blogs.secondlife.com/*
// ==/UserScript==


// --- this function adds a text preview to the thread links ---
//
function btjSetHovertip(link, element) {
	console.log(link);

  var link_title, tempString;

 window.setTimeout(function() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: link,
    onload: function(page) {

      // --- this field has the text of the first post in the thread
      link_title = page.responseText.match(/_jive_plain_quote_text (.+)\;/);
      tempString = link_title[0];

      // --- make that text more readable
      tempString = tempString.replace(/\"\;$/,'');
      tempString = tempString.replace(/\\n.gt\;/g,' ');
      tempString = tempString.replace(/^.*wrote:}{quote} +/, '');
      tempString = tempString.replace(/\\/g,'');
      tempString = tempString.replace(/{[^}]*}/g,'');
      tempString = tempString.replace(/\&amp\;/g,'&');
      tempString = tempString.replace(/\&nbsp\;/g,' ');
      tempString = tempString.replace(/\&quot\;/g,'"');
      tempString = tempString.replace(/\&t\gt\;/g,'>');
      tempString = tempString.replace(/\&lt\;/g,'<');

      // --- stick that text in the link's title attribute
      element.title = tempString;
    }
  })}, 0);
}

// --- this finds the thread links, then feeds them to the function that fixes them
//
function btjFixThreadLinks() {

    // --- get all the links to threads
    //
    var allElements, thisElement, tmpStr;
    allElements = document.evaluate(
	"//td[@class='jive-table-cell-subject']/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

    for (var i = 0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);

	// --- change the link to a more usable one and call btjSetHovertip
	//
        tmpStr = thisElement.href.replace(/.tstart.*$/,'');
        tmpStr = tmpStr.replace('/thread/','/post!reply.jspa?thread=');
        btjSetHovertip(tmpStr, thisElement);
    }

    return true;
}

// --- you need this to know when the user goes to a new page
//
document.addEventListener(
  "DOMNodeInserted",
  function (event) {
    if (event.target.id != undefined) { 
      btjFixThreadLinks();
    }
  },
  false
);

// --- this calls the function in the first place
//
btjFixThreadLinks();

