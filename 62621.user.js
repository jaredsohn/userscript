// ==UserScript==
// @name           Fic Density Calculator
// @namespace      http://stendec.me/
// @description    Calculates the average words per chapter and lists that next to the chapter and word count.
// @include        http://www.fanfiction.net/*
// @exclude        http://www.fanfiction.net/s/*
// @exclude        http://www.fanfiction.net/r/*
// ==/UserScript==

myScript = function() {
	
    // Default Options
    var min_length = 0;
    var max_length = -1;
    
    // Parse document.location.search
    var opts = document.location.search.substr(1).split('&');
    var oln = opts.length;
    for(var i=0; i<oln; i++) {
        // Split the option.
        var thing = opts[i].split('=');
        if ( thing[0] == 'min' ) {
            min_length = parseInt(thing[1]);
        } else if ( thing[0] == 'max' ) {
            max_length = parseInt(thing[1]);
        }
    }
    
	// Get all the z-list entries.
	var fics = document.querySelectorAll('.z-list');
	
	// Loop through them.
	var cln = fics.length;
	for(var i=0; i<cln; i++) {
		// Get the fic.
		var t,inf = fics[i].querySelector('.z-padtop2');
		if ( !inf ) { continue; }
		t = inf.innerHTML;
		
		// Find the start of the chapter count.
		var c_start = t.indexOf(' - Chapters: ') + 13;
		var c_end = t.indexOf('-',c_start);
		if ( c_start < 13 || c_end === -1 ) { continue; }
		
		// Get the chapter count.
		var chap = parseInt(t.substr(c_start,(c_end-c_start)).replace(',',''));
		
		// Get the words now.
		var w_start = t.indexOf(' - Words: ') + 10;
		var w_end = t.indexOf('-',w_start);
		if ( w_start < 10 || w_end === -1 ) { continue; }
		
		// Get the word count.
		var word = parseInt(t.substr(w_start,(w_end-w_start)).replace(',',''));
		
        // Is this fic not within the limits?
        if ( word < min_length || ( word > max_length && max_length !== -1 ) ) {
            fics[i].style.display = 'none';
            continue;
        }
        
		// Calculate the average length.
		var avg = Math.round(word / chap);
		
		inf.innerHTML = t.substr(0, w_end) +
			' - <abbr title="Average Words Per Chapter">Density</abbr>: ' + 
			avg + ' ' + t.substr(w_end);
	}
};

myScript();