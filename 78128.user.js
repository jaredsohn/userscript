// ==UserScript==
// @name           DCTorrent Attachments Ajax
// @namespace      http://userscripts.org/users/68396
// @description    load torrent attachments in-page using ajax
// @include        http://dctorrent.com/torrents.php*
// ==/UserScript==


unsafeWindow.loadattach = function (obj){
	
	// parentNode = smallinfo
	// previousSibling = <a href=
    var ahref = obj.parentNode.previousSibling;
    obj.innerHTML = 'Loading...';
    
    window.setTimeout(function() {  // only way to call GM_xmlhttpRequest from page/unsafeWindow
        GM_xmlhttpRequest({
          method: "GET",
          url: ahref.href, // accesses url from unsafeWindow
          /*headers: {
            "User-Agent": "Mozilla/5.0",            // If not specified, navigator.userAgent will be used.
            "Accept": "text/xml"                    // If not specified, browser defaults will be used.
          },*/
          onload: function(response) {
          
            var results = /attachmentid=([\s\S]*?)\&/gm.exec(response.responseText);

            if (results) { // if we got the id, just add the link after load attachment
                var attachmentid = results[1];
                obj.href = '/attachment.php?attachmentid='+  attachmentid +'&step=';
                obj.innerHTML = 'DL Attachment';
              
            }
          }
        });
      }, 0);
    
    
}
  
// add the preliminary links to load attachment
var smallinfo = document.getElementsByClassName("smallfont")
for (var i=0; i < smallinfo.length - 2; i++) {
	if (smallinfo[i].nodeName == 'DIV') {
		smallinfo[i].innerHTML = smallinfo[i].innerHTML + ' | <a onclick="loadattach(this)" href="javascript:;" class="loadattach">Load Attachment</a>';
	}
}