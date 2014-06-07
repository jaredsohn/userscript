// TF2 Forum Trollometer Live!
// version 0.1.5 BETA!
// September 30th, 2009
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
// select "TF2 Forum Trollometer Live!", and click Uninstall.
//
// --- Changelog ------------------------------------------------------
//
// --- October 1st ---
// Changed colors to better contrast with the background
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TF2 Forum Trollometer Live!
// @namespace     http://tf2app.com
// @description   Display troll ratings on posts on the Team Fortress 2 forums.
// @include       http://forums.steampowered.com/forums/showthread.php?*
// ==/UserScript==

window.setTimeout(function() { 

var spans = document.getElementsByTagName('span');
var divs = document.getElementsByTagName('div');

y=0;
for (var z = 0; z < spans.length; z++) {
lock=0;
var span = spans[z];
if (span.id.indexOf('repdisplay') == 0) {

while (lock == 0) {
	y++;
	var div = divs[y];
	if (div.id.indexOf('post_message') == 0) {
		lock = 1;
	}
}

	my_string = div.innerHTML;
	
	_s = my_string.toLowerCase(); // haystack
	_m = '♥'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	heart = _c*3;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'noob'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	noob = _c*3;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'newb'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	newb = _c*3;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'lolwut'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	lolwut = _c*3;
	
	_s = my_string.toLowerCase(); // haystack
	_m = '!!!'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	exclaim = _c*4;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'lolo'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	lolol = _c*6;
	
	_s = my_string.toLowerCase(); // haystack
	_m = '1!'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	one = _c*4;
	
	_s = my_string.toLowerCase(); // haystack
	_m = '!1'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	one2 = _c*4;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'hurr'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	hurr = _c*9;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'hurry'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	hurr_sub = _c*9;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'durr'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	durr = _c*9;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'w+m1'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	wm1 = _c*13;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'inb4'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	inb4 = _c*8;
	
	_s = my_string.toLowerCase(); // haystack
	_m = '/thread'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	thread = _c*7;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'troll'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	troll = _c*5;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'am a troll'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	atroll = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'spectate4'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	spec = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'dog'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	dog = _c*9;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'dogs'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	dogs = _c*9;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'kawai'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	kawai = _c*18;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'furry'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	furry = _c*13;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'furries'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	furries = _c*13;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'furrys'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	furrys = _c*13;
	
	_s = my_string.toLowerCase(); // haystack
	_m = "furry's"; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	furrys2 = _c*13;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'pl0x'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	pl0x = _c*16;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'plox'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	plox = _c*18;
	
	_s = my_string.toLowerCase(); // haystack
	_m = '/10'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	ten = _c*5;
	
	_s = my_string.toLowerCase(); // haystack
	_m = '10th cla'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	tenthclass = _c*5;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'cool sto'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	coolstory = _c*22;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'update is n'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	update = _c*22;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'valve su'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	valve = _c*70;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'imma let'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	imma = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'ima let'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	ima = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'yo dawg'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	yo = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'yo dog'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	yo2 = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'u did there'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	ic = _c*20;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'on nerf'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	nerf = _c*25;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'ds nerf'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	nerf2 = _c*25;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'nurf'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	nurf = _c*25;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'demoman is op'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	demo = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'demo is op'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	demo2 = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'a woman'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	woman = _c*50;
	
	_s = my_string.toLowerCase(); // haystack
	_m = 'comp players are'; // needle
	_c = 0;
	for (i=0;i<_s.length;i++) {
		if (_m.toLowerCase() == _s.substr(i,_m.length)) {
			_c++;
		}
	}
	comp = _c*25;
	
	my_length = my_string.length;
	my_shout = (my_string.replace(/[^A-Z]/g, "").length);
	shout = 0;
	if (my_length/2 < my_shout) {
		shout = 30;
	}

	
counter = heart+noob+newb+lolwut+exclaim+lolol+one+one2+hurr-hurr_sub+durr+wm1+inb4+thread+troll+atroll+spec+dog+dogs+kawai+furry+furries+furrys+furrys2+pl0x+plox+ten+tenthclass+coolstory+update+valve+imma+ima+yo+yo2+ic+nerf+nerf2+nurf+demo+demo2+woman+comp+length+shout;

if (my_length <= 30 && counter >= 15) {
	counter = counter + 30;
} else if (my_length > 30 && my_length <=50 && counter >= 15) {
	counter = counter + 20;
} else if (my_length > 50 && my_length <=100 && counter >= 15) {
	counter = counter + 10;
}

if (counter <= 5) { result = "<span style='color: #81DC69;'>"+counter+"</span>"; }
if (counter > 5 && counter <= 15 && counter != 0) { result = "<span style='color: #449E3A;'>"+counter+"</span>";}
if (counter > 15 && counter < 40) { result = "<span style='color: #EEA817;'>"+counter+"</span>";}
if (counter > 40 && counter < 70) { result = "<span style='color: #CF331D;'>"+counter+"</span>";}
if (counter >= 70) { result = "<span style='color: #000000;'>"+counter+"</span>";}

span.innerHTML = span.innerHTML+"Troll: "+result;

}
}
}, 10);