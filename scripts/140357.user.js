// (c) 2012-2014, gergely012
//
// ==UserScript==
// @name          LWM Heroes 1-5 All Combat Music
// @description   Plays music during combat in the LWM game (uses HTML5) 
// @version       1.1
// @include       http://www.lordswm.com/war.php*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require  http://www.ilovecolors.com.ar/wp-content/uploads/jquery-cookies/jquery.cookie.js
// @match       http://www.lordswm.com/war.php*
// ==/UserScript==

/* Guide:
1.Install script
2.Enter combat
3.Choose music
4.Enjoy
*/
var musiccombat=$.cookie('musiccombat');
var autow=$.cookie('auto');
    cookiew = (musiccombat!='undefined')?musiccombat:3;
    auto = (autow==1)?"autoplay=autoplay":"";
    check = (autow==1)?"checked=checked":"";

function autofunc() {
	set = 0;
    if ($('#auto').attr('checked')) {
        set = 1;
    }
	$.cookie('auto', set, {
		expires: 365
	});
}

function checkCookie() {
    music = document.getElementById('music').value;
    $.cookie('musiccombat', music, {
        expires: 365
    });
	asd = $.cookie('musiccombat');
    document.getElementById('aud').innerHTML = '<audio ' + auto + ' loop=loop controls=controls><source src=http://metin2wiki.tk/' + asd + '.ogg>Your browser does not support the audio element.</audio>';
}

document.getElementById('centered').innerHTML += "<select id=music><option value=6>Heroes 1 Battle theme</option><option value=2>Heroes 2 Battle theme</option><option value=3>Heroes 3 Battle theme</option><option value=18>Heroes 3 Battle theme II</option><option value=17>Heroes 3 Battle theme III</option><option value=16>Heroes 3 Battle theme IV</option><option value=19>Heroes 4 Battle theme I</option><option value=7>Heroes 4 Battle theme II</option><option value=4>Heroes 4 Battle theme III</option><option value=20>Heroes 4 Battle theme IV</option><option value=21>Heroes 4 Battle theme V</option><option value=22>Heroes 4 Battle theme VI</option><option value=5>Heroes 5 Haven Battle theme</option><option value=11>Heroes 5 Haven Battle theme II</option><option value=8>Heroes 5 Dungeon Battle theme</option><option value=9>Heroes 5 Inferno Battle theme</option><option value=10>Heroes 5 Inferno Battle theme II</option><option value=12>Heroes 5 Necropolis Battle theme</option><option value=13>Heroes 5 Neutral Battle theme</option><option value=14>Heroes 5 Sylvan Battle theme</option><option value=15>Heroes 5 Academy Battle theme</option></select><button id=myButton>Select</button><div id=aud><audio " + auto + " loop=loop controls=controls><source src=http://alvilag.tk/" + cookiew + ".ogg>Your browser does not support the audio element.</audio></div>Autoplay: <input id=auto type=checkbox " + check + ">";

$("#myButton").click(checkCookie);
$("#music").val(cookiew);
$("#auto").click(autofunc);