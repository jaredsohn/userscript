// ==UserScript==
// @name          pasterisVIDEO
// @namespace   
// @description	v1.0: pasterisVIDEO removes the stupid f**king unavailable in your country notice and replaces it with the actual video via proxy.
// @include         *
// ==/UserScript==
var vv = document.getElementById("watch-player-unavailable-message-container");
var vvv = document.getElementById("watch-video");

if(vv != null) {
  vv.innerHTML += "PLEASE STAND BY! pasterisVIDEO is loading the unblocker for the video.";
  vv.innerHTML += "<br><a style=\"font-size:75%;\" href=\"http://frogtunnel.com/images/vajdngq.php?u=" + window.location.href + "\">Click here to open this video in a new window</a>";
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://frogtunnel.com/images/vajdngq.php?u=' + window.location.href,
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20110626 Firefox/5.0',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var vw = responseDetails.responseText;

        var videotitle = vw.match(/<span id="eow-title" class="long-title" dir="ltr" title="([\S\s]*?)">/im);
        var clean_title = videotitle[1].replace(/&#?[a-z0-9]+;/gi, '');  // filter characters like &#202a;
        var proxyplayer = vw.match(/<div id="watch-player" class="flash-player">(<embed src[\S\s]*?>)<\/div><\/div><\/div><div id="watch-main">/im);

        vvv.innerHTML = "<div style=\"background-color:#ffffff;color:#000000;width:100%;height:100%;text-align:center;\"><b>" + videotitle[1] + "</b><br><br>" + proxyplayer[1] + "</div>";
        document.title = "[pasterisVIDEO] - " + clean_title;
    }
});
}
