// ==UserScript==
// @name           WhatTranslate
// @namespace      http://userscripts.org
// @description    WhatTranslate
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

/* README! */

/*
When you start translating, first you need to fill in date translations.
You can find that part further down, where it says "Start translating here!".

Next, you can look for the other parts to translate. They are easy to spot.
When you translate these other parts, if a word in English is the same
in your language, leave that field BLANK. Don't write anything there.

Important! Always be careful not to miss anything in your translation!
If the original text is "Ratio:" and your translation is "Ration",
you must not forget the ":". It should be "Ration:".
Also, try to be consistent, and go for clarity over perfection.
(If a word is absolutely correct but difficult to understand,
switch it for a more clear word.)

Good luck!
*/

/* Functions: Don't alter anything - BEGIN */
function q(query) { return document.querySelectorAll(query); }

function Box(all) {
	function repl(query,from,to) {
		if (query.innerHTML.match(from)) query.innerHTML = query.innerHTML.replace(from,to);
		if (query.value == from) query.value = to;
	}
	for (var e = 0; e < all.length; e++) {
		var which = all[e][0].split('%%')[1] == null ? 0 : all[e][0].split('%%')[1];
		var from = all[e][1];
		var to = all[e][2] == '' ? from : all[e][2];

		if (which == '*') {
			var query = q(all[e][0].split('%%')[0]);
			for (var i = 0; i < query.length; i++) repl(query[i],from,to);
		}
		else { repl(q(all[e][0].split('%%')[0])[which],from,to); }
	}
}
/* Functions: Don't alter anything - END */



/* Start translating here! */

var yearsDate	=	'år';		// translate 'years'
var yearDate	=	'år'; 		// translate 'year'
var monthsDate	=	'månader';	// translate 'months'
var monthDate	=	'månad';	// translate 'month'
var weeksDate	=	'veckor'; 	// translate 'weeks'
var weekDate	=	'vecka';	// translate 'week'
var daysDate	=	'dagar';	// translate 'days'
var dayDate	=	'dag';		// translate 'day'
var hoursDate	=	'timmar'; 	// translate 'hours'
var hourDate	=	'timme';	// translate 'hour'
var minsDate	=	'min';		// translate 'mins'
var minDate	=	'min';		// translate 'min'
var justNowDate	=	'Nyss'; 	// translate 'Just Now'
var agoDate	=	'sen';		// translate 'ago'

/* The searchboxes are an exception, and are handled separately, below */
(function searchBoxes() {
	var searches = [
		['Torrents',	'Torrenter'],
		['Artists',	'Artister'],
		['Requests',	'Efterfrågningar'],
		['Forums',	'Forum'],
		['Log',		'Logg'],
		['Users',	'Användare']
	];
	for (var i = i; i < searches.length; i++) {
		var s = q('div#searchbars input[type=text]');
		s[i].value = searches[i][1];
		s[i].setAttribute('onblur',s[i].getAttribute('onblur').replace(searches[i][0],searches[i][1]));
		s[i].setAttribute('onfocus',s[i].getAttribute('onfocus').replace(searches[i][0],searches[i][1]));
	}
})();





if (document.URL.match(/http.*:\/\/.*what\.cd/)) { // renders on ALL pages
	Box([
		['li#nav_index a',		'Home',			'Hem'],
		['li#nav_torrents a',		'Torrents',		''],
		['li#nav_collages a',		'Collages',		'Collage'],
		['li#nav_requests a',		'Requests',		'Efterfrågningar'],
		['li#nav_forums a',		'Forums',		'Forum'],
		['li#nav_irc a',		'IRC',			''],
		['li#nav_top10 a', 		'Top 10',		''],
		['li#nav_rules a',		'Rules',		'Regler'],
		['li#nav_wiki a',		'Wiki',			''],
		['li#nav_staff a',		'Staff',		'Personal'],
		['li#stats_seeding a',		'Up',			'Upp'],
		['li#stats_leeching a',		'Down',			'Ner'],
		['li#stats_ratio',		'Ratio:',		'Kvot:'],
		['li#stats_required a',		'Required',		'Krävd kvot'],
		['li#fl_tokens',		'Tokens',		'Gratisbiljetter'],
		['li#nav_inbox',		'Inbox',		'Inkorg'],
		['li#nav_staffinbox',		'Staff Inbox',		'Personal Inkorg'],
		['li#nav_uploaded',		'Uploads',		'Uppladdat'],
		['li#nav_bookmarks',		'Bookmarks',		'Bokmärken'],
		['li#nav_notifications',	'Notifications',	'Notifikationer'],
		['li#nav_subscriptions',	'Subscriptions',	'Prenumerationer'],
		['li#nav_comments',		'Comments',		'Kommentarer'],
		['li#nav_friends',		'Friends',		'Vänner'],
		['li#nav_useredit a',		'Edit',			'Inställningar'],
		['li#nav_logout',		'Logout',		'Logga ut'],
		['li#nav_upload a',		'Upload',		'Lägg upp'],
		['li#nav_invite a',		'Invite',		'Bjud in'],
		['li#nav_donate a',		'Donate',		'Donera'],
		['div#footer p',		'Site and design',	'Sida och design'],
		['div#footer p a[title]',	'Last activity',	'Senast aktivitet'],

		/* Don't fill out anything inside this commented section - BEGIN */
		['div#footer p a[title]', 'years',	yearsDate],
		['div#footer p a[title]', 'year',	yearDate],
		['div#footer p a[title]', 'months',	monthsDate],
		['div#footer p a[title]', 'month',	monthDate],
		['div#footer p a[title]', 'weeks',	weeksDate],
		['div#footer p a[title]', 'week',	weekDate],
		['div#footer p a[title]', 'days',	daysDate],
		['div#footer p a[title]', 'day',	dayDate],
		['div#footer p a[title]', 'hours',	hoursDate],
		['div#footer p a[title]', 'hour',	hourDate],
		['div#footer p a[title]', 'mins',	minsDate],
		['div#footer p a[title]', 'min',	minDate],
		['div#footer p a[title]', 'Just now',	justNowDate],
		['div#footer p a[title]', 'ago',	agoDate],
		/* Don't fill out anything inside this commented section - END */
		
		['div#footer p a[title]',	'from',		'från'],
		['div#footer p strong%%0',	'Time:',	'Tid:'],
		['div#footer p strong%%1',	'Used:',	'Använt:'],
		['div#footer p strong%%2',	'Load:',	'Belastning:'],
		['div#footer p strong%%3',	'Date:',	'Datum:'],
		['div#footer p strong%%4',	'Rev:',		'Version:']

	]);
}

if (document.URL.match(/http.*:\/\/.*what\.cd\/user\.php\?id=/)) { // renders on profiles (user.php?id=)
	Box([
	//TODO: make sure it works if you don't have an avatar (use wildcards)
		['div.linkbox a%%*',				'Send Message',			'Skicka meddelande'],
		['div.linkbox a%%*',				'Add to friends',		'Lägg till som vän'],
		['div.linkbox a%%*',				'Report User',			'Rapportera användare'],
		['div.linkbox a%%*',				'RIPPY User',			'Skicka RIPPY'],
		['div.main_column div.head span[style]',	'Profile',			'Profil'],
		['div.box div[class]%%',			'Avatar',			'Profilbild'],
		['div.sidebar div.box div[class]%%1',		'Stats',			'Statistik'],
		['div.sidebar div.box%%1',			'Joined:',			'Gick med:'],
		['div.sidebar div.box%%1',			'Last Seen:',			'Sist sedd:'],
		['div.sidebar div.box%%1',			'Uploaded:',			'Uppladdat:'],
		['div.sidebar div.box%%1',			'Downloaded:',			'Nerladdat:'],
		['div.sidebar div.box%%1',			'Ratio:',			'Kvot:'],
		['div.sidebar div.box%%1',			'Required ratio:',		'Krävd kvot:'],
		['div.sidebar div.box%%1',			'Tokens',			'Gratisbiljetter'],
		['div.sidebar div.box div[class]%%2',		'Percentile Rankings',		'Percentisk rank'],
		['div.sidebar div.box%%2',			'Data uploaded:',		'Uppladdad data:'],
		['div.sidebar div.box%%2',			'Torrents uploaded:',		'Uppladdade torrents:'],
		['div.sidebar div.box%%2',			'Requests filled:',		'Fyllda efterfrågningar:'],
		['div.sidebar div.box%%2',			'Bounty spent:',		'Bounty använt:'],
		['div.sidebar div.box%%2',			'Posts made:',			'Inlägg skapade:'],
		['div.sidebar div.box%%2',			'Artists added:',		'Artister tillagda:'],
		['div.sidebar div.box%%2',			'Overall rank:',		'Helhets rankning:'],
		['div.sidebar div.box div[class]%%3',		'Personal',			'Personligt'],
		['div.sidebar div.box div[class]%%2',		'Hover for values',		'Musen över för värden'],
		['div.sidebar div.box%%3',			'Class:',			'Klass:'],
		['div.sidebar div.box%%3',			'Paranoia level:',		'Nivå av paranoia:'],// TODO: add 'Very high' etc
		['div.sidebar div.box%%3',			'Email:',			''],
		['div.sidebar div.box%%3',			'Passkey:',			''],
		['div.sidebar div.box%%3',			'Clients:',			'Klienter:'],
		['div.sidebar div.box div[class]%%4',		'Community',			'Samhälle'],
		['div.sidebar div.box%%4',			'Forum Posts:',			'Foruminlägg:'],
		['div.sidebar div.box%%4',			'Torrent Comments:',		'Torrentkommentarer:'],
		['div.sidebar div.box%%4',			'Collages started:',		'Skapade collage:'],
		['div.sidebar div.box%%4',			'Collages contributed to:',	'Collage bidragit till:'],
		['div.sidebar div.box%%4',			'Requests filled:',		'Fyllda efterfrågningar:'],
		['div.sidebar div.box%%4',			'Requests voted:',		'Röstade efterfrågningar:'],
		['div.sidebar div.box%%4',			'for',				'för'],
		['div.sidebar div.box%%4',			'for',				'för'], // yes, two times
		['div.sidebar div.box%%4',			'Uploaded:',			'Uppladdat:'],
		['div.sidebar div.box%%4',			'Unique Groups:',		'Unika grupper:'],
		['div.sidebar div.box%%4',			'"Perfect" FLACs:',		'"Perfekta" FLACs:'],
		['div.sidebar div.box%%4',			'Seeding:',			'Seedande torrents:'],
		['div.sidebar div.box%%4',			'Leeching:',			'Leechande torrents:'],
		['div.sidebar div.box%%4',			'Snatched:',			'Nerladdade torrents:'],
		['div.sidebar div.box%%4',			'Invited:',			'Inbjudna:'],

		/* Don't fill out anything inside this commented section - BEGIN */

		['div.sidebar', 'years',	yearsDate],
		['div.sidebar', 'year',		yearDate],
		['div.sidebar', 'months',	monthsDate],
		['div.sidebar', 'month',	monthDate],
		['div.sidebar', 'weeks',	weeksDate],
		['div.sidebar', 'week',		weekDate],
		['div.sidebar', 'days',		daysDate],
		['div.sidebar', 'day',		dayDate],
		['div.sidebar', 'hours',	hoursDate],
		['div.sidebar', 'hour',		hourDate],
		['div.sidebar', 'mins',		minsDate],
		['div.sidebar', 'min',		minDate],
		['div.sidebar', 'Just now',	justNowDate],
		['div.sidebar', 'ago',		agoDate],

		/* Don't fill out anything inside this commented section - END */

		['table.recent td[colspan]%%*',		'Recent Snatches',	'Senast nerladdat'],
		['table.recent td[colspan]%%*',		'Recent Uploads',	'Senast uppladdat'],
		['table.recent td[colspan]%%*',		'personal collage',	'personliga collage'],
		['table.recent td[colspan]%%*',		'see full',		'se hela'],
	]);
}