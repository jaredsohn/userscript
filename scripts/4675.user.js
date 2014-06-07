// All credits go to (http://groups.myspace.com/gmscripts)
//
// ==UserScript==
// @name          StonerKevs UNI Pre-Home Page
// @namespace     thebongripper@hotmail.com
// @description	  Customized 'Home page' for myspace.com
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

// new stylesheet
s = "#nav {position:absolute; right:10}\n";
s+= "#content {position:absolute; left:0}\n";
s+= "body {background:url(http://img65.imageshack.us/img65/9830/unihomepagebg1ce.jpg) #000000 scroll;margin-top:75px;background-repeat:no-repeat;}\n";
s+= "div, table, td, th, .heading{background:transparent!important; border:none!important;}\n";
s+= "*{font-family:verdana}\n";
s+= "a:link, a:active, a:visited {color:32782B!important; font:bold 11px verdana!important;}\n";
s+= "a:hover {text-decoration:none; color:#B0B0AA!important; background-image:url(); cursor:crosshair}\n";
s+= "a[id*='friendImageLink']:hover img {border:2px solid; width:100px; height:120px; #B0B0AA!important;}\n";
s+= "a[id*='friendImageLink'] img {border:2px solid; width:100px; height:120px; #000000}\n";
s+= "#header {visibility:hidden}\n";
s+= "#header .right {visibility:visible; color:#B0B0AA; position:relative; top:27px;}\n";
s+= "#header .right a {font-weight:normal!important; color:green;}\n";
s+= "#topnav {background:transparent!important; padding:0!important; margin-bottom:10px; color:green;}\n";
s+= "#topnav a {font:normal 11px verdana!important; color:#B0B0AA!important;}\n";
s+= "#topnav a:hover {color:ghostwhite!important;}\n";
s+= ".section {border:2px solid #4F794F!important;-moz-border-radius:10px;background-color:343834!important;padding:4px;}\n";
s+= ".heading, #splash_coolNewPeople h5.heading, .mar5 strong {font:bold 11px verdana!important;color:#B0B0AA;border:none!important;-moz-border-radius:6px;display:inline!important;padding:2!important;background-color:#4F794F!important;}\n";
s+= "#home_profileInfo .heading {font-size:12pt!important; display:inline!important; text-align:center; font-weight:bold!important; color:#B0B0AA;}\n";
s+= "#home_profileInfo img {padding-top:10px;padding-left:0px;}\n";
s+= ".left center {color:888888}\n";
s+= ".indicator img {display:none}\n";
s+= ".indicator {margin-left:10px}\n";
s+= ".indicator a, .txtRed {color:990033!important; font-weight:normal!important}\n";
s+= "a:hover .indicator {border:none!important;opacity:1;-moz-opacity:1;}\n";
s+= "#home_bulletins th {color:#B0B0AA!important;font-weight:bold!important;}\n";
s+= "#home_bulletins td {padding:3px;}\n";
s+= "td.bulletinDate {color:#B0B0AA!important;}\n";
s+= "a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";
s+= "#home_infoBar {position:absolute; right:-7px;text-align:center;}\n";
s+= "#home_infoBar {width:43%;height:163px;margin:0;}\n";
s+= "#home_infoBar strong {display:block; color:ghostwhite; font-weight:normal; margin-top:4px}\n";
s+= "#home_infoBar span {color:888888}\n";
s+= "#home_infoBar br {display:none;}\n";
s+= "#home_infoBar .heading {display:inline;width:50%;}\n";
s+= "a[href*='.listAds']:after, a[href*='=rateImage']:after, a[href*='ShowMyBulletins']:after {content:' |'; background:C5D801; color:777777; font-weight:normal}\n";
s+= "#home_friends .heading {position:absolute;visibility:hidden;}\n";
s+= ".left span a {color:1D3A1C!important; font-weight:none!important}\n";
s+= ".w120 {text-align:center;}\n";
s+= ".w120 a {background-image:none}\n";
s+= " {text-align:center; color:ghostwhite}\n";
s+= "#home_friends .heading a {visibility:visible;}\n";
s+= "a[id*='friendLink'] {display:none}\n";
s+= ".clear {font-size:0}\n";
s+= "#main{min-height:0; height:0!important}\n";
s+= "#home_additionalLinks,#home_setHomePage, #splash_coolNewPeopleBrowse, #home_schools, #home_searchAddressBook,#squareAd, iframe, #footer, a[href*='invite.history']{display:none}\n";
document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never" src= "http://img155.imageshack.us/img155/1959/xspfplayeryellowt8rn.swf?playlist_url=http://hideout.com.br/shows/allshows.xspf&autoplay=false&info_button_text=Lyrics" quality="high" bgcolor="000000" name="xspf_player" allowScriptAccess="never" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="162" width="225"></embed>';

GM_addStyle(s);
// Below is for Forums, OR other site in your home page, in a iFRAME

//ifrm = document.createElement("iframe");
//ifrm.setAttribute("src", "http://myspace.com/tehchat"); 
//ifrm.style.width = 830+"px";
//ifrm.style.height = 420+"px";
//ifrm.style.display="inline";
//ifrm.style.position="relative";
//ifrm.style.top = 525+"px"; // make this higher to move further down
//document.body.style.marginBottom=10+"px";
//document.body.style.marginTop=60+"px";
//document.getElementById('body').appendChild(ifrm);

//Below is other tweaks

//to hide user url on home page #home_userURLInfo
//to hide bulletins on home page #home_bulletins
// take out the last line(document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never" src= "http://img155.imageshack.us/img155/1959/xspfplayeryellowt8rn.swf?playlist_url=http://hideout.com.br/shows/allshows.xspf&autoplay=false&info_button_text=Lyrics" quality="high" bgcolor="000000" name="xspf_player" allowScriptAccess="never" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="162" width="225"></embed>';), if you want your 'cool new people' back.
