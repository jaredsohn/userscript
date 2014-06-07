// ==UserScript==
// @name          Nick Bees' Famous Myspace Homepage
// @namespace     myspace.com/i_am_a_guardian_angel
// @description	  A cool Myspace homepage with All sorts of music(must press the name of the song to listen to it)... ooo and No cool people or any crap.  Auto update dates on messages, Comments and all alerts without refreshing for uninterrupted music play and just pure convience.
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url(http://img135.imageshack.us/img135/614/collage661pe.jpg) #FFFFFF fixed;margin-top:-50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:impact}\n";
s+= "a:link, a:active, a:visited {color:FFFFFF!important;font:bold 11px impact!important;}\n";
s+= "a:hover {text-decoration:none; color:FFFFFF!important; cursor:help}\n";
s+= "a[id*='friendImageLink']:hover img {border:3px solid #FFFFFF!important;}\n";
s+= "a[id*='friendImageLink'] img {border:3px solid #FFFFFF}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:000000; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background-image:url('http://img187.echo.cx/img187/7729/darkrain2bw.gif')!important; padding:0!important; margin-bottom:10px; color:000000}\n";
s+= "#topnav a {font:normal 11px impact!important; color:FFFFFF!important;}\n";
s+= "#topnav a:hover {color:000000!important;}\n";
s+= ".section {border:3px solid #FFFFFF!important;background-color:DC143C!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 12px impact!important;color:FFFFFF;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:DC143C!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:FFFFFF}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:FFFFFF}\n";
s+= ".indicator img {display:display}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:FFFFFF!important; font-weight:bold!important}\n";
s+= "a:hover .indicator {border:display!important;}\n";
s+= "#home_bulletins th {color:FFFFFF!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:000000!important;}\n";
s+= document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never" src="http://www.plebius.org/img/flash/player.swf" menu="false" quality="high" width="250" height="200" name="index" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="playList=http://www.plebius.org/uploads/playlist/2006-12-19/4EnFsf8vlW.xml&ShowPlaylist=1&ShowEQ=1&firstTrack=1&initVol=100" wmode="transparent" /></embed>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:42%;height:170px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:000000; font-weight:normal; margin-top:3px}\n";
s+= "#home_infoBar span {color:FFFFFF}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:DC143C; color:FFFFFF; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:000000!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:DC143C}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";


function getupdate() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://home.myspace.com/index.cfm?fuseaction=user',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'text/xml',
		},
		onload: function(responseDetails) {

			// Update Message/Friend Request/etc indicators
			var html = responseDetails.responseText.replace(/\r/g,'');
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="show/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "block";
				}
			}
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="hide/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "none";
				}
			}
		}
	});
	setTimeout(getupdate, 15000);
}

getupdate();


GM_addStyle(s);




