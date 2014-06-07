
// ==UserScript==

// @name           hprt-archives.gr downloader

// @namespace      http://userscripts.org

// @description	    download any video from ert-archives.gr

// @include        http://*hprt-archives.gr/*

// ==/UserScript==

(function() {
  var xpath = "//embed";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  var i, embed, clean;
  for (i = 0; embed = res.snapshotItem(i); ++i) {
  clean = embed.src;
  clean = clean.replace("public/shared/playerFLV2.swf?aspx=http%3a%2f%2fwww.hprt-archives.gr%2fV3%2f&ostk=1234567890&tid", "media.hFLV?tid");
  clean = clean.replace("&mst=0&cult=gr&type=PGM&autostl=1&autostart=0", "");
    var dl = document.createElement("a");
	dl.setAttribute("target","_blank");
    dl.href = clean;
    dl.appendChild(document.createTextNode("-->Download<--"));
    embed.parentNode.insertBefore(dl, embed.nextSibling);
	 
  }
})();