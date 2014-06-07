// ==UserScript==
// @name           YouTube No-AutoPlay Embed
// @namespace      http://userscripts.org/users/cyberdelia
// @description    No autoplay for youtube video.
// @include        *
// @author         Timothée Peignier <timothee.peignier@tryphon.org>
// @copyright      2009
// @license        BSD License
// @version        0.2
// @lastupdated    2009-05-26
// ==/UserScript==
var re = new RegExp("http:\/\/.*youtube\.com\/v\/([^(\&|$.%)]*)");
var embeds = document.evaluate("//object[@data] | //embed", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < embeds.snapshotLength; i++) {
    var embed = embeds.snapshotItem(i);
    if (embed.nodeName.toLowerCase() == 'object') {
        var url = embed.data; 
    } else {
        var url = embed.src;
    }
    var result = re.exec(url);
    if (result) {
      var parts = url.split(re);
      var videoID = parts[1];
      var link = 'http://youtube.com/v/' + videoID + "&autoplay=0";
      embed.setAttribute("src", link);
    }
}