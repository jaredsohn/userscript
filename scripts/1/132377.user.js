// ==UserScript==
// @author		     Eeroz
// @name           The Pirate Bay magnet link addon
// @description    Adds magnet links to thepiratebay.ee
// @namespace      Eeroz
// @include        *thepiratebay.ee/torrent/*
// @version        1.0.1
// ==/UserScript==
var download = document.getElementsByClassName('download')[0];
var data = document.getElementById('details').innerHTML;
var title = encodeURIComponent(document.getElementById('title').innerHTML);
var regexp = /Hash:<\/dt><dd>&nbsp;<\/dd>\n\s+(.*?)\s+<\/dl>/m;
var match = data.match(regexp);
var hash = match[1];
var magnet = 'magnet:?xt=urn:btih:' + hash +'&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&dn='+title;
download.innerHTML = '<br /><a style="background-image: url(http://i48.tinypic.com/ml2f6f.gif);margin-top:15px;margin-bottom:20px;" href="'+magnet+'" title="Get this torrent">&nbsp;Get this torrent</a> <br /> <br />';
