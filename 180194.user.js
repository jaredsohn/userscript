// ==UserScript==
// @name           Get ".Torrent" back to The Pirate Bay
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// @namespace      http://userscripts.org/users/535761
// @description    Adds the option to get torrent files again.
// @include        *://thepiratebay.*/torrent/*
// @include        *://pirateproxy.*/torrent/*
// @include        *://tpb.unblocked.co/torrent/*
// @autor          John Bublee
// @version        1.0
// @run-at         document-start
// @grant          GM_getValue
// @icon           data:image/png;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA=
// ==/UserScript==
$("html").hide();var torrentName;var torrentID;var supportedProxies=["thepiratebay.se","thepiratebay.sx","pirateproxy.net","pirateproxy.se","tpb.unblocked.co", "thepiratebay.pe"];
function getProxyURL(URL){URL=URL.replace("http://","");URL=URL.replace("https://","");if($.inArray(URL,supportedProxies)==-1)URL="javascript:alert('This piratebay website dont support .torrent file downloads (only magnets).                                                                             Search for another piratebay proxy at http://proxybay.info            Or visit thepiratebay official website: http://thepiratebay.sx');";else{URL="http://torrents."+URL;URL=URL+"/"+torrentID+"/"+torrentName+
" {"+torrentID+"}"+"."+"thepiratebay.torrent"}return URL}
function addButton(){torrentName=$("#title").text().replace(/[\\\/ :*?"<>|]/g,"_");torrentID=$("#commentsform").children(".info").children("input").first().attr("value");var torrentFileURL=getProxyURL(window.location.origin);var getTorrentFileComplete='(<a id="getTorrentFileScript" href="'+torrentFileURL+'" title="Get the torrent file">Get the .torrent file</a>)';var cssGetTorrentFile={"font-size":"1.0em","color":"#008E00 !important","font-weight":"bold","text-transform":"uppercase","border-bottom":"1px dotted #80C780",
"background":"url(/static/img/icons/dl.gif) 0 0px no-repeat","padding":"0 0 0 13px"};var cssLinkProxy={"color":"#009","text-decoration":"none","cursor":"pointer"};$(".download").first().append(getTorrentFileComplete).append('<div id="proxyLinkScript" onclick="javascript:window.location.href = \'http://proxybay.info/\';"><img src="http://i.imgur.com/oD91TiI.gif" />&nbsp;[Problem downloading? Click here for pirate bay proxies]</div>');$("#getTorrentFileScript").css(cssGetTorrentFile);$("#proxyLinkScript").css(cssLinkProxy)}
document.addEventListener("DOMContentLoaded",function(){addButton();$("html").show()},false);