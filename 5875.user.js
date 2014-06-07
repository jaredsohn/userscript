// ==UserScript==
// @name          joy
// @namespace     myspace.com/purchased_rebellion
// @description	  Original codes by Filthy Jesus, modified by me.
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background:url() #FFFFFF fixed;margin-top:-50px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana; font-size:9px; text-transform:lowercase}\n";
s+= "a:link, a:active, a:visited {color:269DD4!important;font:bold 9px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:269DD4!important; background-color:FFFFFF!important;}\n";
s+= "a[id*='friendImageLink']:hover img {border:3px solid #FFFFFF!important;}\n";
s+= "a[id*='friendImageLink'] img {border:3px solid #FFFFFF;margin:5px;}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:303030; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {border:0px solid #FFFFFF!important;background-color:ECECEC!important;padding:10px; margin-bottom:10px; color:303030}\n";
s+= "#topnav a {font:bold 9px verdana!important; color:808080!important; text-transform:lowercase!important;}\n";
s+= "#topnav a:hover {color:269DD!important;}\n";
s+= ".section {border:0px solid #FFFFFF!important;background-color:ECECEC!important;padding:5px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 9px verdana!important;color:808080;border:none!important;-moz-border-radius:10px;display:inline;padding:2!important;background-color:ececec!important;}\n";
s+= "#home_profileInfo .heading {font-size:9pxt!important; font-weight:bold!important; color:808080}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:808080}\n";
s+= ".indicator img {display:display}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:808080!important; font-weight:bold!important}\n";
s+= "a:hover .indicator {border:display!important;}\n";
s+= "#home_bulletins th {color:808080!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:808080!important;font-size:9px!important;}\n";
s+= "#home_infoBar {text-align:left;position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:42%;height:170px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:808080; font-weight:bold; margin-top:3px}\n";
s+= "#home_infoBar span {color:808080}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' : '; background:ECECEC; color:808080; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:269DD4!important; font-weight:bold!important}\n";
s+= "#splash_coolNewPeople {height:170px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:ECECEC}\n";
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
