// ==UserScript==
// @name           FriendFeed Service Icons
// @namespace      http://chrispeoples.com/userscripts
// @description    Adds service icons to FriendFeed site using the API (only works on public entries)
// @author         Chris Peoples
// @include        http://friendfeed.com/*
// @version        0.51
// ==/UserScript==

/*

	Author: Chris Peoples | http://chrispeoples.com | http://friendfeed.com/chrisofspades
	Contributors: Micah Wittman | http://wittman.org | http://friendfeed.com/micahwittman
	
	Versions:
		* 2009-04-08 - version 0.1 - initial release
		* 2009-04-09 - version 0.2 - added realtime support (contributed by Micah Wittman)
		* 2009-04-10 - version 0.3 - streamlined to limit API calls
		* 2009-04-29 - version 0.4 - updated to work on friendfeed.com (no more beta)
		* 2009-05-12 - version 0.5 - refactored for greasekit (Chrome, Safari, etc) compatibility
			(has better performance, though when new FriendFeed services come online, a script update will be needed);
			services object hard-coded instead of using API calls (contributed by Micah Wittman)
		* 2009-05-12 - version 0.51 - Bookmarklet service icon problem fixed.
*/


var services;

function GM_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
            jQuery = unsafeWindow.jQuery;
        }
        if(typeof unsafeWindow.realtime != 'undefined'){
            realtime = unsafeWindow.realtime;
        }
    }
    if(typeof jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = jQuery;
		GetServices();
        letsJQuery();
    }

}


if(window.location.href.indexOf('friendfeed.com/') > -1){ //greasekit doesn't support @include directs, so test URL for context
	GM_wait();
}


var realtime;
var lastSuccessPrev;

function UpdateServiceIcons_wait(){
	if(lastSuccessPrev == realtime.lastSuccess)
	{
		window.setTimeout(UpdateServiceIcons_wait,50);
	}
	else
	{
		lastSuccessPrev = realtime.lastSuccess; //sync variables
		letsJQuery();
	}
}


function letsJQuery()
{
	if(realtime == null){
		realtime = unsafeWindow.realtime;
		lastSuccessPrev = realtime.lastSuccess;
	}
	AddServiceIcons();
	UpdateServiceIcons_wait();
}

function GetServices()
{
	//Currently supported services defined at: http://friendfeed.com/api/services
	//Cache below was captured 2009-05-11
	services =  {"services":[{"url":"http://en.wikipedia.org/wiki/Web_feed","iconUrl":"http://friendfeed.com/static/images/icons/feed.png?v=7f94a63b8d2a5a538c6666540ba687f0","id":"feed","name":"Custom RSS/Atom"},{"url":"http://www.joost.com/","iconUrl":"http://friendfeed.com/static/images/icons/joost.png?v=78eb6ccea930059d5e9e96ced2076afe","id":"joost","name":"Joost"},{"url":"http://www.polyvore.com/","iconUrl":"http://friendfeed.com/static/images/icons/polyvore.png?v=321d087a6907c0d60c741272bdd9ef9f","id":"polyvore","name":"Polyvore"},{"url":"http://www.livejournal.com/","iconUrl":"http://friendfeed.com/static/images/icons/livejournal.png?v=33ef29c1a6016b182650705856c14095","id":"livejournal","name":"LiveJournal"},{"url":"http://twitter.com/","iconUrl":"http://friendfeed.com/static/images/icons/twitter.png?v=df0a0affa8100c494df42159627a38b0","id":"twitter","name":"Twitter"},{"url":"http://friendfeed.com/","iconUrl":"http://friendfeed.com/static/images/icons/festivus.png?v=0af8f2f7c42492c0eb17182ce330fb1a","id":"festivus","name":"FestivusFeed"},{"url":"http://www.dailymotion.com/","iconUrl":"http://friendfeed.com/static/images/icons/dailymotion.png?v=380c717579180ca5d636563d8fea028c","id":"dailymotion","name":"Dailymotion"},{"url":"http://www.linkedin.com/","iconUrl":"http://friendfeed.com/static/images/icons/linkedin.png?v=713dd48c4564fec4fca3a0628bce8a7b","id":"linkedin","name":"LinkedIn"},{"url":"http://www.tumblr.com/","iconUrl":"http://friendfeed.com/static/images/icons/tumblr.png?v=bd2edb3ac8b549d0ca796af3fb05a9d5","id":"tumblr","name":"Tumblr"},{"url":"http://12seconds.tv/","iconUrl":"http://friendfeed.com/static/images/icons/twelveseconds.png?v=739de3bc40ddc951da2e12be4283ecfe","id":"twelveseconds","name":"12seconds"},{"url":"http://www.hatena.ne.jp/","iconUrl":"http://friendfeed.com/static/images/icons/hatena.png?v=7b6183a66d76226242c9cbf179bae31b","id":"hatena","name":"???"},{"url":"http://delicious.com/","iconUrl":"http://friendfeed.com/static/images/icons/delicious.png?v=508c8593b0466b5ed38cce51e4d606de","id":"delicious","name":"delicious"},{"url":"http://en.wikipedia.org/wiki/Blog","iconUrl":"http://friendfeed.com/static/images/icons/blog.png?v=d3fe9e9d1dd09839623e597a92ecbb00","id":"blog","name":"Blog"},{"url":"http://www.furl.net/","iconUrl":"http://friendfeed.com/static/images/icons/furl.png?v=cb7c10774eab33db2c9324a311c98a2e","id":"furl","name":"Furl"},{"url":"http://wakoopa.com/","iconUrl":"http://friendfeed.com/static/images/icons/wakoopa.png?v=c7fae8a27dc2aa0ffbb643dc84c7e96c","id":"wakoopa","name":"Wakoopa"},{"url":"http://www.zooomr.com/","iconUrl":"http://friendfeed.com/static/images/icons/zooomr.png?v=0b09b8772b2cf8771bc960f5906ff478","id":"zooomr","name":"Zooomr"},{"url":"http://www.slideshare.net/","iconUrl":"http://friendfeed.com/static/images/icons/slideshare.png?v=72d15cab657167df4a85ea29869e02ff","id":"slideshare","name":"SlideShare"},{"url":"http://www.disqus.com/","iconUrl":"http://friendfeed.com/static/images/icons/disqus.png?v=82e8e708b4dd20b70566dea3c96b1f7e","id":"disqus","name":"Disqus"},{"url":"http://www.photobucket.com/","iconUrl":"http://friendfeed.com/static/images/icons/photobucket.png?v=d32484a3c3fad680df33c754dc94696d","id":"photobucket","name":"Photobucket"},{"url":"http://www.backtype.com/","iconUrl":"http://friendfeed.com/static/images/icons/backtype.png?v=9732c2b846991a5a9c1c95e76f64c5dd","id":"backtype","name":"Backtype"},{"url":"http://ma.gnolia.com/","iconUrl":"http://friendfeed.com/static/images/icons/magnolia.png?v=1e5962c3097569a0e8428b8d89708eac","id":"magnolia","name":"Ma.gnolia"},{"url":"http://reader.google.com/","iconUrl":"http://friendfeed.com/static/images/icons/googlereader.png?v=5996dd645157314e06bcaaf8f75b6ed9","id":"googlereader","name":"Google Reader"},{"url":"http://www.ilike.com/","iconUrl":"http://friendfeed.com/static/images/icons/ilike.png?v=1c4336e3e137ba1b9a9728a237176cdf","id":"ilike","name":"iLike"},{"url":"http://www.seesmic.com/","iconUrl":"http://friendfeed.com/static/images/icons/seesmic.png?v=820411ddbd7240fd6ce420fb9d253b5d","id":"seesmic","name":"Seesmic"},{"url":"http://meneame.net/","iconUrl":"http://friendfeed.com/static/images/icons/meneame.png?v=851e7d23ca1085f283c7a9f829e5f446","id":"meneame","name":"men?ame"},{"url":"http://smotri.com/","iconUrl":"http://friendfeed.com/static/images/icons/smotri.png?v=c60d0cc846724e858eaed00179341daa","id":"smotri","name":"Smotri.com"},{"url":"http://friendfeed.com/","iconUrl":"http://friendfeed.com/static/images/icons/internal.png?v=e471e9afdf04ae568dcbddb5584fc6c0","id":"internal","name":"FriendFeed"},{"url":"http://www.last.fm/","iconUrl":"http://friendfeed.com/static/images/icons/lastfm.png?v=997d01ec84ef5b44cbf30814b02e37c7","id":"lastfm","name":"Last.fm"},{"url":"http://pownce.com/","iconUrl":"http://friendfeed.com/static/images/icons/pownce.png?v=29dea0ac91de74a720b4b1a7b5b4cd4d","id":"pownce","name":"Pownce"},{"url":"http://www.flickr.com/","iconUrl":"http://friendfeed.com/static/images/icons/flickr.png?v=77eeaefbcb3644cec0162a0938ec28e2","id":"flickr","name":"Flickr"},{"url":"http://www.netvibes.com/","iconUrl":"http://friendfeed.com/static/images/icons/netvibes.png?v=e0f3a31f0c2a983a78c03ad69c0d9951","id":"netvibes","name":"Netvibes"},{"url":"http://www.goodreads.com/","iconUrl":"http://friendfeed.com/static/images/icons/goodreads.png?v=84260c598b3a96198047f7135988a007","id":"goodreads","name":"Goodreads"},{"url":"http://hi.baidu.com/","iconUrl":"http://friendfeed.com/static/images/icons/baidu.png?v=7eaf3a259ea44e0acabc0f5027812077","id":"baidu","name":"????"},{"url":"http://reddit.com/","iconUrl":"http://friendfeed.com/static/images/icons/reddit.png?v=594c815da00db8b1eac942abf0287674","id":"reddit","name":"Reddit"},{"url":"http://identi.ca/","iconUrl":"http://friendfeed.com/static/images/icons/identica.png?v=d3e77f9f747d1548e9b6256c69fb177e","id":"identica","name":"identi.ca"},{"url":"http://upcoming.yahoo.com/","iconUrl":"http://friendfeed.com/static/images/icons/upcoming.png?v=4bcfe0790f4b062e4b64a88f79e3e358","id":"upcoming","name":"Upcoming"},{"url":"http://www.ameba.jp/","iconUrl":"http://friendfeed.com/static/images/icons/ameba.png?v=e4a16440f314790db3e59ec0c087ddd3","id":"ameba","name":"Ameba"},{"url":"http://www.mister-wong.com/","iconUrl":"http://friendfeed.com/static/images/icons/misterwong.png?v=b9ef4bdc94a3722c06b583f27b4fa288","id":"misterwong","name":"Mister Wong"},{"url":"http://www.twine.com/","iconUrl":"http://friendfeed.com/static/images/icons/twine.png?v=39942c8e2acbcfe4e4128f5cce57939f","id":"twine","name":"Twine"},{"url":"http://www.google.com/s2/sharing/stuff","iconUrl":"http://friendfeed.com/static/images/icons/googleshared.png?v=9558dc2725e2e335acede53d0a19b9e4","id":"googleshared","name":"Google Shared Stuff"},{"url":"http://www.amazon.com/","iconUrl":"http://friendfeed.com/static/images/icons/amazon.png?v=8e061e6b10f0db689f1cbe0caa57add5","id":"amazon","name":"Amazon.com"},{"url":"http://www.skyrock.com/","iconUrl":"http://friendfeed.com/static/images/icons/skyrock.png?v=911319e1ed573ce45e6fa5dd3078834d","id":"skyrock","name":"Skyrock"},{"url":"http://www.facebook.com/","iconUrl":"http://friendfeed.com/static/images/icons/facebook.png?v=3188364f61a5caec6cea3db52bd7ee92","id":"facebook","name":"Facebook"},{"url":"http://www.jaiku.com/","iconUrl":"http://friendfeed.com/static/images/icons/jaiku.png?v=b16111ed805954ca0a29901e84c0a606","id":"jaiku","name":"Jaiku"},{"url":"http://www.fotolog.com/","iconUrl":"http://friendfeed.com/static/images/icons/fotolog.png?v=cae77e8a9bcf1f72c628fd536fe7aa0a","id":"fotolog","name":"Fotolog"},{"url":"http://www.digg.com/","iconUrl":"http://friendfeed.com/static/images/icons/digg.png?v=a7190ae91cb7d1e3b541ed8ab07fa02c","id":"digg","name":"Digg"},{"url":"http://www.librarything.com/","iconUrl":"http://friendfeed.com/static/images/icons/librarything.png?v=6969a44b7af111d762fb735d26a2f372","id":"librarything","name":"LibraryThing"},{"url":"http://www.stumbleupon.com/","iconUrl":"http://friendfeed.com/static/images/icons/stumbleupon.png?v=dbf160cc0d5ba3658cad48e4377a966d","id":"stumbleupon","name":"StumbleUpon"},{"url":"http://www.yelp.com/","iconUrl":"http://friendfeed.com/static/images/icons/yelp.png?v=1d405b96391b12d810e2c0b0dc22467b","id":"yelp","name":"Yelp"},{"url":"http://www.netflix.com/","iconUrl":"http://friendfeed.com/static/images/icons/netflix.png?v=4a3c0d92fe12451fb26f1b9c57325e9c","id":"netflix","name":"Netflix"},{"url":"http://www.vimeo.com/","iconUrl":"http://friendfeed.com/static/images/icons/vimeo.png?v=4889864b885f9b47bb2a6c6a425f17e2","id":"vimeo","name":"Vimeo"},{"url":"http://www.mixx.com/","iconUrl":"http://friendfeed.com/static/images/icons/mixx.png?v=e93dca19b3b09b596e9dbaeeaff1e25b","id":"mixx","name":"Mixx"},{"url":"http://www.youtube.com/","iconUrl":"http://friendfeed.com/static/images/icons/youtube.png?v=c6c140ea173a7cfe98e5128620164d31","id":"youtube","name":"YouTube"},{"url":"http://picasaweb.google.com/","iconUrl":"http://friendfeed.com/static/images/icons/picasa.png?v=6252bea302277f1f51e534705d2ff0bf","id":"picasa","name":"Picasa Web Albums"},{"url":"http://tipjoy.com/","iconUrl":"http://friendfeed.com/static/images/icons/tipjoy.png?v=25abe1e8ce0a57cbb26e383dd84cba8d","id":"tipjoy","name":"tipjoy"},{"url":"http://talk.google.com/","iconUrl":"http://friendfeed.com/static/images/icons/googletalk.png?v=3b074086846ac5c0a711395ebf5d464a","id":"googletalk","name":"Gmail/Google Talk"},{"url":"http://www.pandora.com/","iconUrl":"http://friendfeed.com/static/images/icons/pandora.png?v=7b57d83d65f5fccbd51e3cf3e09c6b50","id":"pandora","name":"Pandora"},{"url":"http://www.smugmug.com/","iconUrl":"http://friendfeed.com/static/images/icons/smugmug.png?v=f1a49ac8f53f5823afafe07fb3fd09e2","id":"smugmug","name":"SmugMug"},{"url":"http://brightkite.com/","iconUrl":"http://friendfeed.com/static/images/icons/brightkite.png?v=5e24d43ca46845c0063a9e4bdf9d6377","id":"brightkite","name":"brightkite.com"},{"url":"http://www.intensedebate.com/","iconUrl":"http://friendfeed.com/static/images/icons/intensedebate.png?v=3d94d28c22142932a6927d112e706640","id":"intensedebate","name":"Intense Debate"},{"url":"http://www.plurk.com/","iconUrl":"http://friendfeed.com/static/images/icons/plurk.png?v=7c798cea14c13389a615756bd9d6ffdb","id":"plurk","name":"Plurk"},{"url":"http://www.diigo.com/","iconUrl":"http://friendfeed.com/static/images/icons/diigo.png?v=77441b008df933e10668f53891b0c566","id":"diigo","name":"Diigo"}]};

	/*$.getJSON("http://friendfeed.com/api/services?callback=?",function(data) { services = data; //setting the services var here is not working});*/
}

function GetService(serviceName)
{
	var serviceMatch = null;

	$.each(services.services, function(i, service){
		if(service.name == serviceName)
		{
			serviceMatch = service;
			return false;
		}
	});
	return serviceMatch;
}

function AddServiceIcons()
{
	var entry = $('.entry');
	entry.each(function(){
		var entryInfo = $(this).find('.body .info');
		var service = null;
		var serviceTag = $(entryInfo).find('a.service');
		var iconLinkUrl = '';
		var serviceName = '';
		if(serviceTag.length == 0)
		{
			//The <a class="service"> tag was NOT found, assume FriendFeed internal entry type
			service = {"url":"http://friendfeed.com/","iconUrl":"http://friendfeed.com/static/images/icons/internal.png?v=e471e9afdf04ae568dcbddb5584fc6c0","id":"internal","name":"FriendFeed"}; //service = GetService('FriendFeed');
			iconLinkUrl = $(entryInfo).find('a.date').attr('href');
		}
		else
		{
			serviceName = serviceTag.text();
			service = GetService(serviceName);
			iconLinkUrl = serviceTag.attr('href');
			if(service == null)
			{
				//service NOT found in lookup object, assume Custom RSS
				service = {"url":"http://en.wikipedia.org/wiki/Web_feed","iconUrl":"http://friendfeed.com/static/images/icons/feed.png?v=7f94a63b8d2a5a538c6666540ba687f0","id":"feed","name":"Custom RSS/Atom"}; //GetService('Custom RSS/Atom');
			}
		}
		//console.log('-------------------'); console.log(serviceName); console.log(service);console.log('==================='); //DEBUG
		if(serviceName == 'Bookmarklet')
		{
			service = {"url":"http://friendfeed.com/share/bookmarklet","iconUrl":"http://friendfeed.com/static/images/icons/internal.png?v=e471e9afdf04ae568dcbddb5584fc6c0","id":"bookmarklet","name":"Bookmarklet"};
		}
		PrependServiceIcon(entryInfo, service, iconLinkUrl);
	});
}

function PrependServiceIcon(entryInfo, service, iconLinkUrl) 
{
    if(entryInfo.find('.ffserviceicons').length == 0){
		entryInfo.prepend('<a class="ffserviceicons icon" href="' + iconLinkUrl + '"><img style="vertical-align:middle;padding-bottom:4px" src="' + service.iconUrl + '.png" title="' + service.name + '" /></a>');
    }
}

if(typeof unsafeWindow != 'undefined')
{
	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='FriendFeed Beta Service Icons';
	scriptId='46187';
	scriptVersion=0.51;
	scriptUpdateText='[v0.51]: Bookmarklet service icon problem fixed. [v0.5]: Refactored for greasekit (Chrome, Safari, etc) compatibility (has better performance, though when new FriendFeed services come online, a script update will be needed); services object hard-coded instead of using API calls (contributed by Micah Wittman)';
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
