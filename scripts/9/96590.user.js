// ==UserScript==
// @name           Mafia Wars Autounframe
// @namespace      http://userscripts.org/scripts/show/96590
// @description    Make sure your Mafia Wars game auto unframe
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include        http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
// @include        http://www.facebook.com/connect/uiserver*
// @exclude        http://mwfb.zynga.com/mwfb/*#*
// @exclude        http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude        http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude		  http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version        19.07.2011
// ==/UserScript==

function checkLoadIframe() {
var iFrameCanvas = document.evaluate("//iframe[@name='mafiawars']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
if (iFrameCanvas) {
if (/m.mafiawars.com/.test(document.location)) {
window.location.href = document.location + '?iframe=1';
} else if (/apps.facebook.com.inthemafia/.test(document.location)) {
for (var i = 0; i < document.forms.length; i++) {
if (document.forms[i].getAttribute("target") == "mafiawars") {
document.forms[i].target = '';
document.forms[i].submit();
return true;
}
}
} else if (document.getElementById('some_mwiframe')) {
window.location.href = document.getElementById('some_mwiframe').src;
return true;
}
} else {
document.body.parentNode.style.overflowY = "scroll";
document.body.style.overflowX = "auto";
document.body.style.overflowY = "auto";
try {
document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
if (typeof FB != 'undefined') {
FB.CanvasClient.stopTimerToSizeToContent;
window.clearInterval(FB.CanvasClient._timer);
FB.CanvasClient._timer = -1;
}
document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
} catch (fberr) {}
$('#LoadingBackground').hide();
$('#LoadingOverlay').hide();
$('#LoadingRefresh').hide();
}
return false;
}

checkLoadIframe();