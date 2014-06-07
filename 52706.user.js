// ==UserScript==
// @name           Next_Button by Oxyfen
// @include        http://*.menelgame.pl/highscore/range/*
// @description    Dodaje przycisk 'NEXT' w liscie celow.

// ==/UserScript==


var link=window.location.href;

var cut = new Array();

    cut = link.split('/');

var a = cut[5] * 1;

    a += 1;

if (a) {

		var next= '/'+cut[3] +'/'+ cut[4]+ '/' + a + '/' + cut[6];
	}
	
	else

	{

		var next= '/'+cut[3] +'/'+ cut[4]+ '/2/' + cut[5];

	}

document.getElementsByTagName("h1")[1].innerHTML += '<div class="pagination" align="center"><ul><li>Next Page <a href="' + next + '"> >> </a></li></ul></div>';