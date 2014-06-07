// ==UserScript==
// @name           Twitteru twitterovo
// @namespace      http://kapranoff.ru
// @description    Improve FriendFeed. 1) Brings service icons back, 2) also, link them
// @include        http://friendfeed.com/*
// @version        0.4
// ==/UserScript==

(function() {

$ = unsafeWindow.$;

window.addCss = function(cssCode) {
var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
};

addCss('a.service { padding-left: 20px; background: url("/static/images/icons/feed.png?v=7f94") no-repeat left center; } a.service.feed{background-image:url("/static/images/icons/feed.png?v=7f94")} a.service.joost{background-image:url("/static/images/icons/joost.png?v=78eb")} a.service.polyvore{background-image:url("/static/images/icons/polyvore.png?v=321d")} a.service.livejournal{background-image:url("/static/images/icons/livejournal.png?v=33ef")} a.service.twitter{background-image:url("/static/images/icons/twitter.png?v=df0a")} a.service.festivus{background-image:url("/static/images/icons/festivus.png?v=0af8")} a.service.dailymotion{background-image:url("/static/images/icons/dailymotion.png?v=380c")} a.service.linkedin{background-image:url("/static/images/icons/linkedin.png?v=713d")} a.service.tumblr{background-image:url("/static/images/icons/tumblr.png?v=bd2e")} a.service.twelveseconds{background-image:url("/static/images/icons/twelveseconds.png?v=739d")} a.service.hatena{background-image:url("/static/images/icons/hatena.png?v=7b61")} a.service.delicious{background-image:url("/static/images/icons/delicious.png?v=508c")} a.service.blog{background-image:url("/static/images/icons/blog.png?v=d3fe")} a.service.furl{background-image:url("/static/images/icons/furl.png?v=cb7c")} a.service.wakoopa{background-image:url("/static/images/icons/wakoopa.png?v=c7fa")} a.service.zooomr{background-image:url("/static/images/icons/zooomr.png?v=0b09")} a.service.slideshare{background-image:url("/static/images/icons/slideshare.png?v=72d1")} a.service.disqus{background-image:url("/static/images/icons/disqus.png?v=82e8")} a.service.photobucket{background-image:url("/static/images/icons/photobucket.png?v=d324")} a.service.backtype{background-image:url("/static/images/icons/backtype.png?v=9732")} a.service.magnolia{background-image:url("/static/images/icons/magnolia.png?v=1e59")} a.service.googlereader{background-image:url("/static/images/icons/googlereader.png?v=5996")} a.service.ilike{background-image:url("/static/images/icons/ilike.png?v=1c43")} a.service.seesmic{background-image:url("/static/images/icons/seesmic.png?v=8204")} a.service.meneame{background-image:url("/static/images/icons/meneame.png?v=851e")} a.service.smotri{background-image:url("/static/images/icons/smotri.png?v=c60d")} a.service.internal{background-image:url("/static/images/icons/internal.png?v=e471")} a.service.lastfm{background-image:url("/static/images/icons/lastfm.png?v=997d")} a.service.pownce{background-image:url("/static/images/icons/pownce.png?v=29de")} a.service.flickr{background-image:url("/static/images/icons/flickr.png?v=77ee")} a.service.netvibes{background-image:url("/static/images/icons/netvibes.png?v=e0f3")} a.service.goodreads{background-image:url("/static/images/icons/goodreads.png?v=8426")} a.service.baidu{background-image:url("/static/images/icons/baidu.png?v=7eaf")} a.service.reddit{background-image:url("/static/images/icons/reddit.png?v=594c")} a.service.identica{background-image:url("/static/images/icons/identica.png?v=d3e7")} a.service.upcoming{background-image:url("/static/images/icons/upcoming.png?v=4bcf")} a.service.ameba{background-image:url("/static/images/icons/ameba.png?v=e4a1")} a.service.misterwong{background-image:url("/static/images/icons/misterwong.png?v=b9ef")} a.service.twine{background-image:url("/static/images/icons/twine.png?v=3994")} a.service.googleshared{background-image:url("/static/images/icons/googleshared.png?v=9558")} a.service.amazon{background-image:url("/static/images/icons/amazon.png?v=8e06")} a.service.skyrock{background-image:url("/static/images/icons/skyrock.png?v=9113")} a.service.facebook{background-image:url("/static/images/icons/facebook.png?v=3188")} a.service.jaiku{background-image:url("/static/images/icons/jaiku.png?v=b161")} a.service.fotolog{background-image:url("/static/images/icons/fotolog.png?v=cae7")} a.service.digg{background-image:url("/static/images/icons/digg.png?v=a719")} a.service.librarything{background-image:url("/static/images/icons/librarything.png?v=6969")} a.service.stumbleupon{background-image:url("/static/images/icons/stumbleupon.png?v=dbf1")} a.service.yelp{background-image:url("/static/images/icons/yelp.png?v=1d40")} a.service.netflix{background-image:url("/static/images/icons/netflix.png?v=4a3c")} a.service.vimeo{background-image:url("/static/images/icons/vimeo.png?v=4889")} a.service.mixx{background-image:url("/static/images/icons/mixx.png?v=e93d")} a.service.youtube{background-image:url("/static/images/icons/youtube.png?v=c6c1")} a.service.picasa{background-image:url("/static/images/icons/picasa.png?v=6252")} a.service.tipjoy{background-image:url("/static/images/icons/tipjoy.png?v=25ab")} a.service.googletalk{background-image:url("/static/images/icons/googletalk.png?v=3b07")} a.service.pandora{background-image:url("/static/images/icons/pandora.png?v=7b57")} a.service.smugmug{background-image:url("/static/images/icons/smugmug.png?v=f1a4")} a.service.brightkite{background-image:url("/static/images/icons/brightkite.png?v=5e24")} a.service.intensedebate{background-image:url("/static/images/icons/intensedebate.png?v=3d94")} a.service.plurk{background-image:url("/static/images/icons/plurk.png?v=7c79")} a.service.diigo{background-image:url("/static/images/icons/diigo.png?v=7744")}');

window.frf_process_entry = function() {
    var entry = this;

    var s = $('div.body div.info a.service', entry);
    if (!s || s.length < 1) return;

    var lc = s.text().toLowerCase();
    var author = $('div.profile a.l_profile', entry).attr('href').substr(1);

    s.attr('href', "/search?q=from:" + author + "+service:" + lc);

    s.addClass(lc);
}

window.frf_process = function(el) {
    $('div.entry', el).each( frf_process_entry );
    $('a.l_morecomment', el).click();
};

window.frf_process();

document.addEventListener("DOMNodeInserted", function(event) {
  if (window.IN_SM) return;
  window.IN_SM = true;
  window.frf_process(event.target)
  window.IN_SM = false;
}, false);

if(typeof unsafeWindow != 'undefined')
{

	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='Twitteru Twitterovo';
	scriptId='47831';
	scriptVersion=0.4;
	scriptUpdateText="[v0.4]: optimizations";
	// === Stop editing here. ===

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
				var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
					var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
					if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
						GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
						newversion = document.createElement("div");
						newversion.setAttribute('id', 'gm_update_alert');
						newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
							document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					}
				}
		});
	}
}


})();
