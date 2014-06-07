// ==UserScript==
// @name        Prevent Social Network
// @namespace   http://shelling.in.th
// @description Prevent from using the social network sites in working time.
// @include      *
// @version     0.7.1
// @grant         none
// ==/UserScript==

var rdr = false;

var d = new Date();
var w = d.getDay();
var h = d.getHours();
var working_init  = 9;
var working_ended = 18;

var work = 'http://localhost';	// your working site
var url	= window.location.href;
snlist = [
	'facebook', 
	'twitter',
	'pinterest',
	'plus.google'
];
sklist = [		// skipping list - e.g. facebook pages you are admin
	'sharer',	// facebook share popup
	'intent'	// twitter share widget
];
for (s=0; s<snlist.length; s++) {
	var sn = snlist[s];
	if (url.indexOf(sn)>=0) {
		if ((w>0 && w<6) && (h>=working_init && h<working_ended)) {
			rdr = true;
			for (k=0; k<sklist.length; k++) {
				var sk = sklist[k];
				if (url.indexOf(sk)>=0) {
					rdr = false;
					break;
				}
			}
		}
	}
	if (rdr) {
		window.location = work;
		break;
	}
}