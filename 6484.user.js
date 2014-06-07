// ==UserScript==
// @name           Black and White Homepage
// @description    Creates a new myspace homepage. Made by the grim_reaper, myspace.com/grim_reaper007
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s = "body{background:url(http://img168.imageshack.us/img168/9148/backgrooundvv0.jpg) center repeat-y #fff!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_greybox,#home_setHomePage,#home_searchAddressBook,#home_coolNewVideos,#home_featured_filmmaker,#home_featured_comedy,#home_featured_music,#home_featured_books,#splash_coolNewPeople,#home_schools,#splash_profile,th,#footer,#abipromo,#PageThemeModule,#home_activities{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#fff!important; background-color:transparent!important;border:0px!important;}\n";
s+= "a {color:#ffffff!important; text-decoration:none!important;}\n";
s+= "a:hover {color:#000!important;}\n";
s+= ".section, a img {border:2px solid #000!important;}\n";
s+= ".heading{height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= ".heading{font-size:15pt!important; line-height:18px!important; letter-spacing:-2px;font-family:georgia!important;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= "#topnav{background:#000!important; color:#fff!important;}\n";
s+= "#topnav a{color:#fff!important;}\n";
s+= "#topnav a:hover {color:#000!important;}\n";
s+= "#home_profileInfo{background:#000!important;}\n";
s+= "#home_messages{background:#000!important;}\n";
s+= "#home_messages a img {border:0!important;}\n";
s+= "#home_friends{background:#000!important; position:relative; top:-25px; width:425!important;}\n";
s+= "#home_bulletins{background:#000!important;}\n";
s+= "#StatusBox{background:#000!important;}\n";
s+= "#home_infoBar{background:#000!important;}\n";
s+= "#home_infoBar span, strong span {color:#fff!important;}\n";
s+= "#home_schools{background:#000000!important;}\n";
s+= ".indicator span {color:inherit!important;}\n";
//document.getElementById('squareAd').innerHTML = '<embed src="http://www.fileden.com/files/2023/xspf_bwhite.swf?playlist_url=http://www.fileden.com/files/2023/jesuit.xspf&autoplay=true&randomstart=true" quality="high" name="xspf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="250" width="300"></embed>';

//Change the part before title
html = document.body.innerHTML.replace(/Hello,/, "Oh shit...it's "); 
document.body.innerHTML = html;

//change Friends title
html = document.body.innerHTML.replace(/My Friend Space/, "My Hoes"); 
document.body.innerHTML = html;

//change bulletins title
html = document.body.innerHTML.replace(/My Bulletin Space/, "Surveys From Hell"); 
document.body.innerHTML = html;

//change mail title
html = document.body.innerHTML.replace(/My Mail/, "MAILTIME!"); 
document.body.innerHTML = html;

//takes out "Show My:"
html = document.body.innerHTML.replace(/Show My:/, ""); 
document.body.innerHTML = html;

//takes out "Your Network"
html = document.body.innerHTML.replace(/Your Network:/, ""); 
document.body.innerHTML = html;

//takes out "Status and Mood"
html = document.body.innerHTML.replace(/Status and Mood/, "How I'm Feelin'"); 
document.body.innerHTML = html;

//takes out the ad in the middle of the page and replaces it with image, if you have an ad blocker, it wont be seen
document.getElementById('squareAd').innerHTML = '<img src="http://img214.imageshack.us/img214/5798/squarexw9.jpg"/>';


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


