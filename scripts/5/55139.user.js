// ==UserScript==
// @name            MyAnimeList.net: Show Age In Profile
// @namespace       http://myanimelist.net/profile/N_Ox
// @description	    Add a row in profile details for the age.
// @include         http://myanimelist.net/profile*
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

birthday = $('.lightLink:contains(Birthday)').next();
if (!birthday.length) return;

var s = $.trim(birthday.text());
if (s[s.length] == ',') return;

var a = s.split('  ', 2);
a[0] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(a[0]);
a[1] = a[1].split(', ', 2);
if (a[1][1] == undefined) return;
a[2] = a[1][1];
a[1] = a[1][0];

var d = new Date();
var age = d.getFullYear() - a[2] + ((d.getMonth() - a[0]) * 12 + d.getDay() - a[1]) / 365.25
age = Math.floor(age * 100) / 100;

birthday.parent().after(
	$('<tr><td class="lightLink">Age</td></tr>').append(
		$('<td/>').text(age)
	)
);

})();
