// ==UserScript==
// @name          Old Skool Codex
// @namespace     http://www.bluecannonball.com/
// @description   On rpgcodex.net, restores some of the better, older design.
// @include       http://www.rpgcodex.net/*
// @include       http://rpgcodex.net/*
// ==/UserScript==

/*
Script by Jack Skellington.
Authored on 2007-11-11.
Updated on 2008-09-28.
Version: 1.0.1
*/

var css = document.createElement('style');
css.setAttribute('id', 'old_skool_codex');
document.getElementsByTagName('head')[0].appendChild(css);
var osc = document.getElementById('old_skool_codex');

osc.sheet.insertRule('.box_bottom_middle {background-image:url(/image/rpdesign/box_bottom_middle.png) !important;}', 0);
osc.sheet.insertRule('.box_bottom_left {background-image:url(/image/rpdesign/box_bottom_left.png) !important;}', 0);
osc.sheet.insertRule('.box_bottom_right {background-image:url(/image/rpdesign/box_bottom_right.png) !important;}', 0);
osc.sheet.insertRule('.menu-links, .menu-links a {color: #000000 !important; font-weight: bold !important; font-family: Tahoma, Geneva, Arial, Helvetica, sans-serif !important; font-size: 12px !important; font-style: normal !important;}', 0);

header = document.getElementsByTagName('table')[0];
header.setAttribute('background', '/images/header-line.jpg');
header.innerHTML = '<tr><td width="715"><a href="/"><img src="/images/header.jpg" alt="RPG Codex" border="0" /></a></td><td></td></tr>';
document.body.background = '/image/rpdesign/bkgrnd.gif';

nav = document.getElementsByTagName('table')[3];
links = nav.getElementsByTagName('a');
if (links.length) {
	url = links[links.length - 1].href;
}
else {
	url = '';
}

if (url.indexOf('login.php') > -1) {
	document.body.removeChild(document.getElementsByTagName('table')[1]);
	document.body.removeChild(document.getElementsByTagName('table')[1]);
	document.body.removeChild(document.getElementsByTagName('table')[1]);
}

mLinks = document.createElement("table");
mLinks.setAttribute('width', '100%');
mLinks.setAttribute('cellpadding', '0');
mLinks.setAttribute('cellspacing', '0');
mLinks.setAttribute('border', '0');
mLinks.setAttribute('id', 'n1');
mLinks.innerHTML = '<tr><td class="box_bottom_left" width="28" height="26" /><td class="box_bottom_middle" height="26" align="center"><span class="menu-links"><a href="/index.php">NEWS</a> | <a href="/phpBB/">FORUMS</a> | <a href="/listcontent.php">CONTENT</a> | <a href="/listpeople.php">PEOPLE DB</a> | <a href="/listgames.php">GAME DB</a> | <a href="/listcompanies.php">COMPANY DB</a> | <a href="/main.php?id=links">LINKS</a> | <a href="/main.php?id=irc">IRC</a> | <a href="/main.php?id=staff">STAFF</a> | <a href="/contact.php">CONTACT US!</a></span></td><td class="box_bottom_right" width="28" height="26" /></tr>';
document.body.insertBefore(mLinks, header.nextSibling);

if (url.indexOf('login.php') > -1) {
	fLinks = document.createElement("table");
	fLinks.setAttribute('width', '100%');
	fLinks.setAttribute('cellpadding', '0');
	fLinks.setAttribute('cellspacing', '0');
	fLinks.setAttribute('border', '0');
	fLinks.setAttribute('id', 'n2');
	fLinks.innerHTML = '<tr><td class="box_bottom_left" width="28" height="26" /><td class="box_bottom_middle" height="26" align="center"><span class="menu-links"><a href="faq.php">FAQ</a> | <a href="search.php">SEARCH</a> | <a href="memberlist.php">MEMBERS</a> | <a href="groupcp.php">USER GROUPS</a> | <a href="profile.php?mode=register">REGISTER</a> | <a href="profile.php?mode=editprofile">PROFILE</a> | <a href="privmsg.php?folder=inbox">MESSAGES</a> | <a href="' + url + '">LOG IN/OUT</a></span></td><td class="box_bottom_right" width="28" height="26" /></tr>';
	document.body.insertBefore(fLinks, header.nextSibling.nextSibling);
}
