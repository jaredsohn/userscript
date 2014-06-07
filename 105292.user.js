// ==UserScript==
// @name           linux firefox songtaste
// @namespace      http://userscripts.org/scripts/show/105292
// @description    loop play on songtaste.
// @include        http://songtaste.com/*
// ==/UserScript==
var embed = "\
function makemedia_html(songurl, width, height) {\n\
  var embedhtml = \"<embed src=\\\"\" + songurl + \"\\\"\" +\n\
                  \" width=\\\"\" + width + \"\\\"\" +\n\
                  \" height=\\\"\" + height + \"\\\"\" +\n\
                  \" loop=\\\"true\\\" autostart=\\\"true\\\"\" +\n\
                  \" name=\\\"MediaPlayer\\\" />\";\n\
  return embedhtml;\n\
}";
var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.innerHTML = embed;
var headtag = document.getElementsByTagName("head")[0];
if (typeof(headtag) != "undefined")
  headtag.appendChild(script);
