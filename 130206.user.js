// ==UserScript==
// @name          The Berrics Video Ad Remover
// @author        stopvideoads@gmail.com
// @description	  Removes pre-roll ads from all videos on theberrics.com, the best skateboarding site on the web.
// @include       http://www.theberrics.com/*
// @include       http://theberrics.com/*
// ==/UserScript==
var script = document.createElement("script");
script.type = "text/javascript";
script.text = 'function berricsPlayer(id, data, width, height) {var e = $(document.getElementById(id)); $(e).unbind("click");var swf_width = arguments[2] || 700; var swf_height = arguments[3] || 400;var fparams = { media_file_id: data["MediaFile"]["id"], xid: e.attr("xid"), legacy_preroll: "", legacy_postroll: data["MediaFile"]["postroll"], server: window.location.hostname, preroll_server: "LEGACY", postroll_server: "LEGACY", loader:"/swf/player/BerricsPlayer.swf?rev=John1.7"};if (data["dailyop_id"]) { fparams.dailyop_id = data["dailyop_id"];} var xiSwfUrlStr = "/swf/expressInstall.swf"; var swfVersionStr = "0.0.0"; var params = {}; params.quality = "high"; params.bgcolor = "#000000"; params.play = "true"; params.loop = "true"; params.wmode = "gpu"; params.scale = "noscale"; params.menu = "true"; params.devicefont = "false"; params.salign = ""; params.allowscriptaccess = "always"; params.allowFullScreen = "true"; var attributes = {}; attributes.id = "BerricsPlayerLoader"; attributes.name = "BerricsPlayerLoader"; attributes.align = "left"; swfobject.embedSWF( "/swf/player/BerricsPlayerLoader.swf?testing", id, swf_width, swf_height, swfVersionStr, xiSwfUrlStr, fparams, params, attributes);}';
document.getElementsByTagName("head").item(0).appendChild(script);