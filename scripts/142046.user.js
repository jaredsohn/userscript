// ==UserScript==
// @name          Kronos MCAnime R/a/dio
// @description	  Agrega el reproductor de R-a-d.io a Kronos.
// @namespace     Kronos MCAnime/Zeyth
// @include       http://kronos.mcanime.net/
// @include       http://kronos.mcanime.net/portada
// @include       http://kronos.mcanime.net/mcradio
// @include       http://mcanimeradio.com/Djs/parse.php
// @version       1.2
// @grant		  GM_XMLHttpRequest
// ==/UserScript==

(function() {
if (document.getElementById('iconbar') != null) {
var icons = document.getElementById('iconbar');
var icon = document.createElement("div");
	icon.setAttribute("class","icon ib-home");
	link = '<a href="http://r-a-d.io/" target="_blank" style="background-image: url(data:image/png;base64,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) !important;">MCRadio</a>';
	link += '<div class="ib-tip hide" style="left: -42px;"><span style="background-position: 50px center;"></span><p>Visita la Página de R/a/dio!</p></div>';
	icon.innerHTML = link;
	icons.appendChild(icon);

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@id='tab-menu']/ul",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);
			var span = document.createElement("li");
			popup = '<a target="_blank" onclick="$(\'#mcradio\').remove(); window.open(\'mcradio\');" style="float:left; margin:0 !important; padding:0 !important; margin-right:2px !important; margin-top:1px !important;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8xNy8xMniXvJkAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAAAbElEQVQoka2TWQ6AIAxEp4azcie57PihMQjdRCdpApTXhUVIYlXbMgmgpHY1mcurlBxcKVqgd2U3YR+oPBxRxn6OsefB6YEAAJKn7eA97s1aJ4OerYyXbHgElTOxYSdjDCf04/PU7tqRfPlVB6eiUCbhcoo6AAAAAElFTkSuQmCC"/></a>';
			embed_code = '<embed width="300" height="20" flashvars="type=mp3&amp;file=http://stream.r-a-d.io:1130/main.mp3&amp;autostart=false&amp;backcolor=0x0000000&amp;frontcolor=0xFFFFFF" quality="high" name="undefined" src="http://www.shoutcheap.com/flashplayer/player.swf" type="application/x-shockwave-flash" style="z-index:-1000 !important;" id="undefined" wmode="opaque" />';
			span.innerHTML = popup + embed_code;
			span.setAttribute("style","float:right; background:none !important; border:none !important; margin:0 !important; padding:0 !important; z-index:-1000 !important;");
			span.id = "mcradio";
			thisDiv.appendChild(span);
		}
		};
		    if(document.URL.indexOf("mcradio") >= 0) {
			var con = document.getElementById('content');
			player = ('<div style="width:310px; margin:0 auto 0 auto; text-align:center; padding:22px; overflow:hidden !important;"><div style="background:black; overflow:hidden !important;"><embed width="310" height="20" flashvars="type=mp3&amp;file=http://stream.r-a-d.io:1130/main.mp3&amp;autostart=true&amp;backcolor=0x0000000&amp;frontcolor=0xFFFFFF"quality="high" name="undefined" src="http://www.shoutcheap.com/flashplayer/player.swf" type="application/x-shockwave-flash" style="undefined" id="undefined"></div></div>').toString();
			frame = ('<div style="width:100%; height:300px;"><iframe width="100%" height="295" frameborder="0" src="http://r-a-d.io/#/search/1/" border="0" style="padding-top:3px;"></div>').toString();
			con.innerHTML = player;
			con.innerHTML += frame;
    }
	
			if(document.URL.indexOf("mcanimeradio.com/Djs/parse.php") >= 0) {
			var style="#stream {width:240px !important;}";
			var head=document.getElementsByTagName("HEAD")[0];
			var el=window.document.createElement('link');
			el.rel='stylesheet';
			el.type='text/css';
			el.href='data:text/css;charset=utf-8,'+escape(style);
			head.appendChild(el);
    }

})();