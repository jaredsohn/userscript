// ==UserScript==
// @name       RTL/RTL2 VLC Stream
// @namespace  m36
// @version    0.2
// @description  Add vlc and rtmpdump to %path%
// @match      http*://rtl2now.rtl2.de/*film_id*
// @match      http*://rtl-now.rtl.de/*film_id*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013
// ==/UserScript==
(function () {
    var angebot = PlayerWatchdog.getParam('angebot');
    var playerurl = PlayerWatchdog.getParam('playerurl');
    var httpdom = playerurl.split('/');
    var xml = PlayerWatchdog.getParam('playerdata');
    if (xml != "") {
 		$.ajax({
 			url: xml,
 			context: document.body
 		}).done(function(data) {
            var found = (new XMLSerializer()).serializeToString(data).match(/<!\[CDATA\[rtmp.*?\]\]>/g);
            if (found.length>0) {
                var link = found[0].replace("<![CDATA[","").replace("]]>","").split(angebot+"/");
                prompt("RTMPdump Command:","rtmpdump -r \""+link[0]+angebot+"/\" -a \""+angebot+"/\" -W \""+playerurl+"\" -p \"http://"+httpdom[2]+"/\" -y \"mp4:"+link[1]+"\" --quiet | vlc -"); // -o \""+document.title+".f4v\"
            }
 		});
    }
})() ;