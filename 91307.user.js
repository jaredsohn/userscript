// ==UserScript==
// @name           removeRevolver
// @namespace      mafia wars
// @include     http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.com/mwfb/*#*
// @version     1.0
// @author		ngiyup
// ==/UserScript==

var LoadingBackground = document.getElementById('LoadingBackground');
if (LoadingBackground){
LoadingBackground.parentNode.removeChild(LoadingBackground);
}
var zstream_notif_div = document.getElementById('zstream_notif_div');
if (zstream_notif_div){
zstream_notif_div.parentNode.removeChild(zstream_notif_div);
}
var liveupdates = document.getElementById('liveupdates');
if (liveupdates){
liveupdates.parentNode.removeChild(liveupdates);
}
var LoadingOverlay = document.getElementById('LoadingOverlay');
if (LoadingOverlay){
LoadingOverlay.parentNode.removeChild(LoadingOverlay);
}
var zstream_div = document.getElementById ('zstream_div');
if (zstream_div){
zstream_div.parentNode.removeChild(zstream_div);
}
var LoadingRefresh = document.getElementById('LoadingRefresh');
if (LoadingRefresh){
LoadingRefresh.parentNode.removeChild(LoadingRefresh);
}
var one_true_lightbox_bg = document.getElementById('one_true_lightbox_bg');
if (one_true_lightbox_bg){
one_true_lightbox_bg.parentNode.removeChild(one_true_lightbox_bg);
}

// bookmarklet
// javascript:(function(){$('#LoadingBackground').hide();$('#LoadingOverlay').hide();$('#LoadingRefresh').hide();$('one_true_lightbox_bg').parentNode.removeChild();})();