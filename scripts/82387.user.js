// ==UserScript==
// @name           BWT Attachments Ajax
// @namespace      http://userscripts.org/users/68396
// @description    load attachments in-page using ajax
// @include        http://www.bwtorrents.com/forumdisplay.php?f=*
// ==/UserScript==

unsafeWindow.loadattach = function (obj){
	if (obj.innerHTML == 'Load Attachment') {
		var onclicktext = obj.parentNode.children[0].attributes[0].childNodes[0].wholeText;
		//console.log(onclicktext);
		var attach_num = /attachments\(([\s\S]*?)\)/gm.exec(onclicktext)[1];
		
		// parentNode = smallinfo
		// previousSibling = <a href=
	    var href = 'http://www.bwtorrents.com/misc.php?do=showattachments&t='+attach_num;
	    obj.innerHTML = 'Loading...';
	    
	    window.setTimeout(function() {  // only way to call GM_xmlhttpRequest from page/unsafeWindow
	        GM_xmlhttpRequest({
	          method: "GET",
	          url: href, // accesses url from unsafeWindow
	          /*headers: {
	            "User-Agent": "Mozilla/5.0",            // If not specified, navigator.userAgent will be used.
	            "Accept": "text/xml"                    // If not specified, browser defaults will be used.
	          },*/
	          onload: function(response) {
	          
	            var results = /attachmentid=([\s\S]*?)\"/gm.exec(response.responseText);
	
	            if (results) { // if we got the id, just add the link after load attachment
	                var attachmentid = results[1];
	                obj.href = '/attachment.php?attachmentid='+  attachmentid;
	                obj.innerHTML = 'DL Attachment';
	              
	            }
	          }
	        });
	      }, 0);
	}
}


// add the preliminary links to load attachment
allLinks = document.evaluate(
     "//a[contains(@onclick,'attach')]",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
for (var i=0; i < allLinks.snapshotLength; i++) {
	var lnk = allLinks.snapshotItem(i);
	var lnkparent = lnk.parentNode;
	lnkparent.innerHTML = lnkparent.innerHTML + ' | <a onclick="loadattach(this)" href="javascript:;" class="loadattach">Load Attachment</a>';
}
