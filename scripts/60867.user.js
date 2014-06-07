// ==UserScript==
// @name           Pennergame 4.0 Berlin Hamburg Stadtswitch
// @namespace      11235813[Kuestenpenner]
// @description    Der Shop button wird durch einen stadswitsch ausgetauscht womit man  mit einen klick die stadtwechseln kann
// @include        http://*.pennergame.de*
// ==/UserScript==


var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var tr = document.getElementById('xtra-nav').getElementsByTagName('li')[2];
tr.innerHTML = '<a href="http://berlin.pennergame.de/overview/" title="klicke auf go um nach Pennergame berlin zu gelangen"><img src="http://t2.gstatic.com/images?q=tbn:qYjGUuq84PNklM:http://www.weltkarte.com/europa/deutschland/bilder/Berlin-flagge.gif" border="0" height="20" width="35"></a>';

}

if (url.indexOf("http://pennergame")>=0) {
var gamelink = "http://pennergame.de"
var tr = document.getElementById('xtra-nav').getElementsByTagName('li')[2];
tr.innerHTML = '<a href="http://berlin.pennergame.de/overview/" title="klicke auf go um nach Pennergame berlin zu gelangen"><img src="http://t2.gstatic.com/images?q=tbn:qYjGUuq84PNklM:http://www.weltkarte.com/europa/deutschland/bilder/Berlin-flagge.gif" border="0" height="20" width="35"></a>';

}

if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var tr = document.getElementById('xtra-nav').getElementsByTagName('li')[2];
tr.innerHTML = '<a href="http://www.pennergame.de/overview/" title="klicke auf go um nach Pennergame Hamburg zu gelangen"><img src="http://t0.gstatic.com/images?q=tbn:0AdYZGNgcHOacM:http://www.flaggenparadies.de/media/images/hamburg_thb.jpg" border="0" height="20" width="35"></a>';

}

if (url.indexOf("http://www.berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var tr = document.getElementById('xtra-nav').getElementsByTagName('li')[2];
tr.innerHTML = '<a href="http://www.pennergame.de/overview/" title="klicke auf go um nach Pennergame Hamburg zu gelangen"><img src="http://t0.gstatic.com/images?q=tbn:0AdYZGNgcHOacM:http://www.flaggenparadies.de/media/images/hamburg_thb.jpg" border="0" height="20" width="35"></a>';

}



