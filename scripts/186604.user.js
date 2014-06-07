// ==UserScript==
// @name  TinyChat Ad Removal w/ Full Screen & Google Ad Removal By Rave
// @namespace http://userscripts.org/scripts/show/186604
// @description   Tinychat Ad Removal & Google Ad Removal
// @version 1.2.3.2
// @include   http://google.com/*
// @include   http://tinychat.com/*
// @include   https://tinychat.com/*/*
// @author    Rave, Dread-Inc www.dread-inc.com
// @notes     Forged from various scripts. Rights to respected authors & Rave
// ==/UserScript==
var VERSION = "1.2.3.2";
var SCRIPT_URL = "http://userscripts.org/scripts/show/186604";

function updateCheck() {
   try {
      GM_xmlhttpRequest({
         method: 'GET',
         url: SCRIPT_URL + "?rnd="+Math.random(),
         onload: function(result) {
            if (result.status != 200) throw "status="+result.status;

            var tmp = /VERSION[\s=]+"(.*?)"/.exec(result.responseText);
            if (tmp == null) throw "parse error";

            if (VERSION != tmp[1]) {
               if (window.confirm("New version "+tmp[1]+" is available. Update ?")) location.href = SCRIPT_URL;
            } else {
               alert("No new version available");
            }

         }
      });
   } catch (error) {
      alert('Error updating: '+error);
   }
}

GM_registerMenuCommand("Check for update", updateCheck);

/**
 * @namespace global
 */
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.textAlign = "center";
styleEl.innerHTML = '#header {    display: none;}#rightblock{    display: none;}#body_footer_ad {    display: none;}#room_header {    display: none;}#footer {    display: none;}#chat {    width: 110%; height: 310%; top: 30px; align: center; valign: middle;}';
document.documentElement.appendChild(styleEl);

function resizeTinyChat()
{
    var clientHeight = (jq("body").height() - 75) + "px";
    jq("#chat").css("height", clientHeight);
}

function cleanTinyChat()
{
    jq("#wrapper").css("width","95%");
    jq("#left_block").css("width","95%");
    jq("#navigation .button:contains('Upgrade')").remove()
    jq("#navigation .button.green").remove()
    jq("#navigation .button.orange").remove()
    jq("#navigation .button.purple").remove()
    jq("#category-bar").remove();
    jq("#footer").remove();
    jq("#right_block").remove();
    jq("#room_header").remove();
    jq("#ad_banner").remove();
    jq("#body_footer_ad").remove();
    jq("#chat-info").remove();
    jq("#goods").remove();    

    
    resizeTinyChat();
    // add resize event
    jq(window).resize(resizeTinyChat);
}

var jq = $.noConflict();

cleanTinyChat();
(function() {

	// google domain only removal
	if(window.location.href.match( /http:\/\/www.google./) == 'http:\/\/www.google.')
	{
		// remove custom search engine based ads in tables
		var ad = document.evaluate("//a[contains(@href,'&adurl=http') or contains(@href,'/pagead/iclk') or contains(@href,'http://services.google.com')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; ad && i < ad.snapshotLength; i++)
		{
			var daddy = ad.snapshotItem(i);
			daddy.parentNode.removeChild(daddy);
		}
		// remove inline div based ads
		var ad = document.evaluate("//a[contains(@href,'&adurl=http') or contains(@href,'&q=http') or contains(@href,'/pagead/iclk')]/parent::div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i = 0; ad && i < ad.snapshotLength; i++)
		{
			var daddy = ad.snapshotItem(i);
			daddy.parentNode.removeChild(daddy);
		}
	}

	// get rid of iframe based ads
	var ad = document.evaluate("//iframe[contains(@name,'google_ads_frame')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < ad.snapshotLength; i++)
	{
		var daddy = ad.snapshotItem(i);
		daddy.parentNode.removeChild(daddy);
	}
})();