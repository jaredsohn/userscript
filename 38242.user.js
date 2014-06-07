// ==UserScript==
// @name           SA Ignore Machine
// @description    Ignores anyone who quotes a poster on your ignore list.
// @include        http://*somethingawful.com/showthread.php?*
// ==/UserScript==

var ignoreURL = 'http://forums.somethingawful.com/member2.php?action=viewlist&userlist=ignore';
var ignoreSubmitURL = 'http://forums.somethingawful.com/member2.php';

var assholeList = new Array();


function setIgnoreList() {
  var sub_data = "action=updatelist&userlist=ignore";
  for ( var i in assholeList ) {
    sub_data += '&listbits[]=' + assholeList[i];
  }
  
  GM_xmlhttpRequest( {
        method: "POST",
        url: ignoreSubmitURL,
        headers: { "Content-type" : "application/x-www-form-urlencoded" },
        data: encodeURI("action=updatelist&userlist=ignore"+sub_data)
    });
}

function scanQuotes() {
  
  for (var j = 0; j < assholeList.length; j++) {
      thisAsshole = assholeList[j];

      quoters = document.evaluate("//blockquote/ancestor::div[h4='"+thisAsshole+" posted:')]/ancestor::table[contains(@id,'post')]/descendant::dt[contains(@class,'author')]/text()",
                                  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

      for (var k = 0; k < quoters.snapshotLength; k++) {
        assholeList.unshift(quoters.snapshotItem(k).textContent);
        j++;
      }
      
  }	
}


GM_xmlhttpRequest({
	method: "GET",
	url: ignoreURL,
	onload:function(responseDetails) {
	
		ignorePage = responseDetails.responseText.replace(/\n/g,' ');;

		ignorePage = ignorePage.replace(/^.*?Edit Ignore List<\/h2>/g,'');
		ignorePage = ignorePage.replace(/<div class="inner">/,'<ROOT>');
		ignorePage = ignorePage.replace(/<br>/g,'');
		ignorePage = ignorePage.replace(/To remove.*$/,'</ROOT>');
		ignorePage = ignorePage.replace(/<input.*?value=\"(.*?)\" size.*?>/g,'<ASSHOLE>$1</ASSHOLE>');
		ignorePage = ignorePage.replace(/<input.*?>/g,'');

		var parser = new DOMParser();
		var xobj = parser.parseFromString(ignorePage,'text/xml');
		var li = xobj.getElementsByTagName('ASSHOLE');
		
		for (q = 0; q < li.length; q++) {
			assholeList.push(li[q].textContent);
		}
		
		if (assholeList.length > 0) {
          var l = assholeList.length;
          scanQuotes();
          if (assholeList.length > l) {
            setIgnoreList();
          }
		}

	}
});
