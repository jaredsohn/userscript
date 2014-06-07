// ==UserScript==
// @name           Prev & Next by <<-Wu-Tang Clan->>
// @author		   <<-Wu-Tang Clan->>
// @include        http://*.menelgame.pl/highscore/range/*
// @description    Dodaje przycisk 'PREV' i 'NEXT' w liscie celow.

// ==/UserScript==


var link=window.location.href;

var cut = new Array();

    cut = link.split('/');

var a = cut[5] * 1;

    a += 1;
    
    b = a - 2;
    
    if (b>0) {

    	var prev= '/'+cut[3] +'/'+ cut[4]+ '/' + b + '/' + cut[6];
    	
    	}
    	
    	else
    	
    	{
    	
    	var prev='';
    	
    	}

if (a) {

		var next= '/'+cut[3] +'/'+ cut[4]+ '/' + a + '/' + cut[6];
		
		var cur= cut[5] * 1;
		
	}
	
	else

	{

		var next= '/'+cut[3] +'/'+ cut[4]+ '/2/' + cut[5];

		var cur= 1;
		
	}

document.getElementsByTagName("h1")[1].innerHTML += '<div class="pagination" align="center"><ul><li><a href="' + prev + '"> << </a> Prev (' + cur + ') Next <a href="' + next + '"> >> </a></li></ul></div>';