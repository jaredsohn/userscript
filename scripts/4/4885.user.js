// skin inspired by nik (http:/myspace.com/nikoru)
// first myspace homepage skin (to my knowledge) ever
//
// ==UserScript==
// @name          Chadds page
// @namespace     #Jo\n - http://myspace.com/gmscripts
// @description   Chadds home page
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://comments.myspace.com/*
// ==/UserScript==

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "body {background:url(http://www.image-upload.net/files/2115/home-page.jpg) #1E5784 no-repeat top center scroll;margin-top:125px;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:ffffff!important;font:normal 12px georgia!important;}\n";
s+= "a:hover {text-decoration:underline;color:1E5784}\n";
s+= "a:hover img {-moz-opacity:.9;opacity:.9;border:0px solid #A8A9A8!important;}\n";
s+= "#topnav {margin-left:auto;margin-right:auto;width:770px;background-color:A8A9A8!important;font-size:0;-moz-border-radius:10px;border:2px solid white!important;height:18px;padding:0!important;}\n";
s+= "#topnav a {font:normal 12px verdana;margin-left:3px;margin-right:3px;color:ffffff!important;}\n";
s+= ".section {border:2px solid white!important;-moz-border-radius:10px;background-color:A8A9A8!important;padding:2px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:normal 9px verdana!important;color:black;border:2px solid white!important;-moz-border-radius:10px;display:inline;padding:0!important;background-color:0072C9!important;}\n";
s+= "#home_profileInfo .heading {font-size:10pt!important;}\n";
s+= "#home_profileInfo img {padding-top:3px;}\n";
s+= ".indicator {height:13px;margin-left:2}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:black!important;font-weight:bold!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block;}\n";
s+= "#home_infoBar br {display:none;color:ffffff}\n";
s+= "#home_infoBar .heading {display:block;width:50%;color:ffffff}\n";
s+= "a[href*='.listAds']:after,a[href*='=rateImage']:after {content:' |';}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= "#splash_coolNewPeople {height:163px;position:relative;left:14px;}\n";
s+= "#splash_coolNewPeople {text-align:left;}\n";
s+= ".w120 {text-align:center;}\n";
s+= "#splash_coolNewPeopleBrowse {text-align:center;}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#header, #home_additionalLinks,#home_setHomePage, #home_userURLInfo,#home_schools, #home_searchAddressBook,#squareAd, iframe, #footer,a[href*='=comedian'],a[href*='=invite'],a[href*='=film'],a[href*='=vids.home'] {display:none}\n"; 


//replace cool new people
document.getElementById('squareAd').innerHTML = '<embed src= "http://www.filecabin.com/members_vb/files/58768/xspf_white.swf?playlist_url=http://www.filecabin.com/members_vb/files/58768/yayiehopepage.xml&autoplay=true&info_button_text=Lyrics" quality="high" bgcolor="black" name="xspf_player" allowScriptAccess="never" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="230" width="300">';
GM_addStyle(s);