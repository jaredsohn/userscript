/*
FilmAffinityRatingChange

Version 1.0.2
10 March 2008
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

Website: http://javierarias.wordpress.com/scripts/FilmAffinityRatingChange
*/
// ==UserScript==
// @name           FilmAffinityRatingChange
// @namespace      
// @include        http://www.filmaffinity.com/es/myfriends.php
// @include        http://www.filmaffinity.com/en/myfriends.php
// ==/UserScript==

(function() {
	var maintable = document.getElementsByTagName("TABLE")[17];
	for ( var i = 1; i < maintable.rows.length-1; ++i ) {
		var userid = maintable.rows[i].cells[0].firstChild.href.split('=')[1];
		var ratedfilms = maintable.rows[i].cells[2].textContent.split('.').join('');
		var oldratedfilms = GM_getValue(userid);
		if ( typeof oldratedfilms == 'undefined' ) {
			GM_setValue(userid, ratedfilms);
		}
		else if ( oldratedfilms != ratedfilms ) {
			var dif = ratedfilms-oldratedfilms;
			var prefix = dif > 0 ? '+' : '';
			var bgcolor = dif > 0 ? 'lightgreen' : '#FF6666';
			maintable.rows[i].bgColor=bgcolor;
			maintable.rows[i].cells[2].textContent += ' (' + prefix + dif + ')';
			GM_setValue(userid, ratedfilms);
		}
		else
			null;
	}
})();
