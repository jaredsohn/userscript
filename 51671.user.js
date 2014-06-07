// ==UserScript==
// @name           One-click links downloader (for Jdownloader). 
// @namespace      none
// @description    Transform many direct download sites HTTP protocol to JD protocol.
// @include        *
// ==/UserScript==

function transformer(Hoster)


{ for (var i = 0; i < document.links.length; i++) {
	
	var tmp_link = String(document.links[i]);

    	if (tmp_link.match(Hoster)) {
		if (document.links[i].protocol == 'http:')
			document.links[i].protocol = 'jd:';
	}

	if (tmp_link.match(Hoster)) {
    if (document.links[i].getAttribute('target') == "_blank") {
      document.links[i].removeAttribute('target');
    }
  }

	

}
}
transformer("rapidshare\.com")
transformer("megaupload\.com")
transformer("depositfiles\.com")
transformer("filefactory\.com")
transformer("megaporn\.com")
transformer("badongo\.com")
transformer("zshare\.com")
transformer("megashares\.com")
transformer("uploading\.com")
transformer("secured\.in")
transformer("sharebee\.com")
transformer("file-upload\.net")
transformer("mediafire\.com")
