// TF2 Forum New Theme
// Version 0.2 beta
// October 3rd, 2009
// http://tf2app.com/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TF2 Forum New Theme", and click Uninstall.
//
// --- Changelog ------------------------------------------------------
//
// October 3rd.
// Updated the update image.
//
// October 4th.
// Added weapon-specific icons next to threads.
// Added compatibility for all sub-forums.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           TF2 Forum New Theme
// @namespace      http://tf2app.com
// @description    On the main forum list: Changes the color of threads, adds special images related to them, removes smilies.
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=80*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=536*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=544*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=547*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=542*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=545*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=549*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=543*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=546*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=548*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=551*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=552*
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=343*
// ==/UserScript==

window.setTimeout(function() { 

var tds = document.getElementsByTagName('td');
var as = document.getElementsByTagName('a');

y=0;
for (var z = 0; z < as.length; z++) {
lock=0;
var a = as[z];
if (a.id.indexOf('thread_title') == 0) {
	
while (lock == 0) {
	y++;
	var td = tds[y];
	if (td.id.indexOf('td_threadtitle') == 0) {
		lock = 1;
	}
}

my_str = td.title;
my_string = a.innerHTML;


// HATS //
_s = my_string.toLowerCase(); // haystack
_m = 'hat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
hat = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'gibus'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
gibus = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'halo'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
halo = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'what'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
what = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'that'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
that = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'hate'; // needle
_c = 0;
for (i=0;i<_s.length;i++) { if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
hate = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'chat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) { if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
chat = _c*1;
// -----------------------------
_s = my_str.toLowerCase(); // haystack
_m = 'hat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
hat2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'gibus'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
gibus2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'halo'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
halo2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'what'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
what2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'that'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
that2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'hate'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
hate2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'chat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
chat2 = _c*1;

// IDLING //
_s = my_string.toLowerCase(); // haystack
_m = 'idle'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
idle = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'idling'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
idling = _c*1;
// --------------------------------------
_s = my_string.toLowerCase(); // haystack
_m = 'idle'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
idle2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'idling'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
idling2 = _c*1;

// UPDATE //
_s = my_string.toLowerCase(); // haystack
_m = 'updat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
update = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'news'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
news = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'blog'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
blog = _c*1;

// --------------------------------------
_s = my_str.toLowerCase(); // haystack
_m = 'updat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
update2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'news'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
news2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'blog'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
blog2 = _c*1;

/* UNLOCKS //
_s = my_string.toLowerCase(); // haystack
_m = 'unlock'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
unlock = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'weapon'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
weapon = _c*1;

// --------------------------------------
_s = my_str.toLowerCase(); // haystack
_m = 'unlock'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
unlock2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'weapon'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
weapon2 = _c*1;*/

// SPECIFICS //
_s = my_string.toLowerCase(); // haystack
_m = 'FAN'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
fan = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'FAN'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
fan2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'force-a-nature'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
fan3 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'force-a-nature'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
fan4 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'bonk'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
bonk = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'bonk'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
bonk2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'sandman'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
sandman = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'sandman'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
sandman2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'backburner'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
backburner = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'backburner'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
backburner2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'flare'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
flare = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'flare'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
flare2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'tinguisher'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
axe = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'tinguisher'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
axe2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'natas'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
natascha = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'natas'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
natascha2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'sandvich'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
sandvich = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'sandvich'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
sandvich2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'kgb'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
kgb = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'kgb'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
kgb2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'blut'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
blut = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'blut'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
blut2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'krit'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
krit = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'krit'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
krit2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'ubersaw'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
ubersaw = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'ubersaw'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
ubersaw2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'huntsman'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
huntsman = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'huntsman'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
huntsman2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'jarate'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
jarate = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'jarate'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
jarate2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'razorback'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
razorback = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'razorback'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
razorback2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'ambass'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
ambass = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'ambass'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
ambass2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'dead ri'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
dr = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'dead ri'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
dr2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'cnd'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
cnd = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'cnd'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
cnd2 = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'cloak and'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
cnd3 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'cloak and'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {	if (_m.toLowerCase() == _s.substr(i,_m.length)) {_c++;}}
cnd4 = _c*1;


// --------------------------------------

// --------------------------------------
if ((hat+gibus+halo-what-that-hate-chat) >= 1 || (hat2+gibus2+halo2-what2-that2-hate2-chat2) >= 1) {
	a.innerHTML = "<font color='#D9D6D5'>"+a.innerHTML+"</font>";
	a.parentNode.parentNode.parentNode.childNodes[1].style.background = '#35302F';
	a.parentNode.parentNode.parentNode.childNodes[3].style.background = '#35302F';
	a.parentNode.parentNode.parentNode.childNodes[5].style.background = '#35302F';
	a.parentNode.parentNode.parentNode.childNodes[7].style.background = '#35302F';
	a.parentNode.parentNode.parentNode.childNodes[9].style.background = '#35302F';
	a.parentNode.parentNode.parentNode.childNodes[11].style.background = '#35302F';
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/hats/fedora.png' height='30px' />";
} else if ((idle+idling) >= 1 || (idle2+idling) >= 1) {
	a.innerHTML = "<font color='#CCCBCA'>"+a.innerHTML+"</font>";
	a.parentNode.parentNode.parentNode.childNodes[1].style.background = '#2B2928';
	a.parentNode.parentNode.parentNode.childNodes[3].style.background = '#2B2928';
	a.parentNode.parentNode.parentNode.childNodes[5].style.background = '#2B2928';
	a.parentNode.parentNode.parentNode.childNodes[7].style.background = '#2B2928';
	a.parentNode.parentNode.parentNode.childNodes[9].style.background = '#2B2928';
	a.parentNode.parentNode.parentNode.childNodes[11].style.background = '#2B2928';
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/images/idle.png' height='30px' />";
} else if ((update+blog+news) >= 1 || (update2+news2+blog2) >= 1) {
	a.innerHTML = "<font color='#CCD2CA'>"+a.innerHTML+"</font>";
	a.parentNode.parentNode.parentNode.childNodes[1].style.background = '#30362E';
	a.parentNode.parentNode.parentNode.childNodes[3].style.background = '#30362E';
	a.parentNode.parentNode.parentNode.childNodes[5].style.background = '#30362E';
	a.parentNode.parentNode.parentNode.childNodes[7].style.background = '#30362E';
	a.parentNode.parentNode.parentNode.childNodes[9].style.background = '#30362E';
	a.parentNode.parentNode.parentNode.childNodes[11].style.background = '#30362E';
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/images/tf2_logo.png' height='30px' />";
/*} else if (unlock+weapon >= 1 || unlock2+weapon2 >= 1) {
	a.innerHTML = "<font color='#D3D7DA'>"+a.innerHTML+"</font>";
	a.parentNode.parentNode.parentNode.childNodes[1].style.background = '#34383D';
	a.parentNode.parentNode.parentNode.childNodes[3].style.background = '#34383D';
	a.parentNode.parentNode.parentNode.childNodes[5].style.background = '#34383D';
	a.parentNode.parentNode.parentNode.childNodes[7].style.background = '#34383D';
	a.parentNode.parentNode.parentNode.childNodes[9].style.background = '#34383D';
	a.parentNode.parentNode.parentNode.childNodes[11].style.background = '#34383D';
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/jarate.png' height='30px' />";*/
} else {
	// normal
	a.parentNode.parentNode.parentNode.childNodes[1].style.background = '#3A3936';
	a.parentNode.parentNode.parentNode.childNodes[3].style.background = '#3A3936';
	a.parentNode.parentNode.parentNode.childNodes[5].style.background = '#3A3936';
	a.parentNode.parentNode.parentNode.childNodes[7].style.background = '#3A3936';
	a.parentNode.parentNode.parentNode.childNodes[9].style.background = '#3A3936';
	a.parentNode.parentNode.parentNode.childNodes[11].style.background = '#3A3936';
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "";
}
if (fan+fan3 >= 1 || fan2+fan4 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/fan.png' height='30px' />";}
if (bonk >= 1 || bonk2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/bonk.png' height='30px' />";}
if (sandman >= 1 || sandman2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/sandman.png' height='30px' />";}
if (backburner >= 1 || backburner2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/backburner.png' height='30px' />";}
if (flare >= 1 || flare2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/flare.png' height='30px' />";}
if (axe >= 1 || axe2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/axe.png' height='30px' />";}
if (natascha >= 1 || natascha2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/natascha.png' height='30px' />";}
if (sandvich >= 1 || sandvich2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/sandvich.png' height='30px' />";}
if (kgb >= 1 || kgb2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/kgb.png' height='30px' />";}
if (blut >= 1 || blut2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/blut.png' height='30px' />";}
if (krit >= 1 || krit2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/kritz.png' height='30px' />";}
if (ubersaw >= 1 || ubersaw2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/ubersaw.png' height='30px' />";}
if (huntsman >= 1 || huntsman2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/huntsman.png' height='30px' />";}
if (jarate >= 1 || jarate2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/jarate.png' height='30px' />";}
if (razorback >= 1 || razorback2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/razorback.png' height='30px' />";}
if (ambass >= 1 || ambass2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/ambassador.png' height='30px' />";}
if ((cnd+cnd3) >= 1 || (cnd2+cnd4) >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/cad.png' height='30px' />";}
if (dr >= 1 || dr2 >= 1) {
	a.parentNode.parentNode.parentNode.childNodes[3].innerHTML = "<img src='http://tf2app.com/livedrop/images/weapons/dr.png' height='30px' />";
}
}
}

}, 10);