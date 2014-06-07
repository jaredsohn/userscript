// ==UserScript==
// @name       mobile9.com ad remover.
// @namespace  http://4chon.net
// @version    0.2
// @description  Removes the ads on mobile9.com
// @include      *mobile9.com*
// @copyright  2013+, Joseph
// ==/UserScript==

var rightads = document.getElementsByClassName('right_ads')[0];
var seealso = document.getElementsByClassName('w970 see_also')[0];
var topads = document.getElementsByClassName('ads_leaderboard')[0];
var belowads = document.getElementById('zzadfooter');

if(rightads){
	rightads.parentNode.removeChild(rightads);
}

if(seealso){
	seealso.parentNode.removeChild(seealso);
}

if(topads){
	topads.parentNode.removeChild(topads);
}

if(belowads){
    belowads.parentNode.removeChild(belowads);
}