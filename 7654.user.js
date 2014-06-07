// ==UserScript==
// @name           Custom Myspace Homepage
// @description    Changes Myspace Homepage.
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==
// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "#nav {position:absolute; right:5}\n";
s+= "#content {position:absolute; left:5}\n";
s+= "body {background-color:000000;margin-top:-110px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:arial}\n";
s+= "a:link, a:active, a:visited {color:#ff0000!important;font:bold 11px arial!important;}\n";
s+= "a:hover {text-decoration:none; color:red; border-bottom: dotted rgb(255,255,255) 1px; border-top: dotted rgb(255,255,255) 1px;}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:red; position:relative; top:118px;}\n";
s+= "#header .right a {font-weight:normal!important}\n";
s+= "#topnav {background:black!important; border:4px double white!important;-moz-border-radius:10px;padding:2px;margin-bottom:10px; color:white}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:white!important;}\n";
s+= "#topnav a:hover {color:whiteimportant;}\n";
s+= ".section {border:2px solid white!important;-moz-border-radius:10px;background-color:000000!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px arial!important;color:white;border:none!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:000000!important;}\n";
s+= "#home_profileInfo .heading {font-size:11pt!important; font-weight:bold!important; color:#ff0000}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".left center {color:white}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:#ff0000!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:#ff0000!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:white!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:white; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:#ff0000}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:block;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:black; color:white; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:white!important; font-weight:normal!important}\n";
s+= "#splash_coolNewPeople {height:163px; text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center; color:666666}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] img {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";

document.getElementById('squareAd').innerHTML = '<embed src="http://www.fileden.com/files/2023/xspf_bwhite.swf?playlist_url=http://www.fileden.com/files/2023/jesuit.xspf&autoplay=true&randomstart=true" quality="high" name="xspf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="250" width="300"></embed>';

//Change the part before title
html = document.body.innerHTML.replace(/Hello,/, "Yerrr...Wut Up "); 
document.body.innerHTML = html;

//change Friends title
html = document.body.innerHTML.replace(/My Friend Space/, "My Bitches"); 
document.body.innerHTML = html;

//change school title
html = document.body.innerHTML.replace(/Visit My School Home Page/, "Skool! :("); 
document.body.innerHTML = html;

//change bulletins title
html = document.body.innerHTML.replace(/My Bulletin Space/, "Bullet Bullet Bulletin"); 
document.body.innerHTML = html;

//change mail title
html = document.body.innerHTML.replace(/My Mail/, "Mail Time!"); 
document.body.innerHTML = html;

//takes out "Show My:"
html = document.body.innerHTML.replace(/Show My:/, ""); 
document.body.innerHTML = html;

//takes out "Your Network"
html = document.body.innerHTML.replace(/Your Network:/, "My Network"); 
document.body.innerHTML = html;

//takes out the ad in the middle of the page and replaces it with image, if you have an ad blocker, it wont be seen
//document.getElementById('squareAd').innerHTML = '<img src="http://img214.imageshack.us/img214/5798/squarexw9.jpg"/>';


GM_addStyle(s);

if (document.forms.length > 0) {

	var pattern = "//div[@class=\"section\"]//div//center//a";
	var vl = document.evaluate( pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var pl = vl.snapshotItem(0);
	if (pl)	{
		var friendID = pl.href.split("friendid=");

		var cmnts = document.createElement('a');
		cmnts.href = "http://comments.myspace.com/index.cfm?fuseaction=user.homeComments&friendID="+friendID[1];
		cmnts.innerHTML = 'Cmnts';

		var bar = document.createElement('span');
		bar.innerHTML = ' | ';

		var bloglink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyBlogHyperLink');
		bloglink.parentNode.insertBefore(cmnts, bloglink);
		bloglink.parentNode.insertBefore(bar, bloglink);

		var signout = document.createElement('a');
		signout.href = "http://collect.myspace.com/index.cfm?fuseaction=signout";
		signout.innerHTML = 'Sign Out';

		var rank = document.getElementById('ctl00_Main_ctl00_InfoBar1_EditCommentsHyperLink');
		rank.parentNode.insertBefore(signout, rank);
		
		var space = document.createElement('br');
		rank.parentNode.insertBefore(space, rank);
	}
}


