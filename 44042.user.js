// ==UserScript==
// @name           notpron sound
// @namespace      Woems
// @include        http://deathball.net/notpron/*
// ==/UserScript==

// http://wiki.greasespot.net/Code_snippets

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

//alert("test");
var mp3=$x('//bgsound')[0].getAttribute("src");
//alert(mp3);
if (mp3!="../stuff/mus1.mp3")
  alert("Achtung: "+mp3);
var player='<object type="application/x-shockwave-flash" data="http://www.marcreichelt.de/spezial/musicplayer/codegenerator/skins/emff_silk_button.swf" width="16" height="16">\
 <param name="movie" value="http://www.marcreichelt.de/spezial/musicplayer/codegenerator/skins/emff_silk_button.swf">\
 <param name="FlashVars" value="src='+mp3+'&amp;autostart=yes">\
</object>';
var div=document.createElement("div");
div.innerHTML=player;
document.body.appendChild(div);
