// ==UserScript==
// @name           BlockAlfie
// @namespace      rodney
// @description    Block Alfred1 and other rightwingnuts
// @include        http://www.dvorak.org/blog/*
// ==/UserScript==


/*  a single purpose script, taken from the 'pointlessCommentTrasher' script posted by 'featurelover' and 
* reduced down .  most of the lolcats style comments are from the original script. you can continue to 
* fine tune/make changes/rewrite as you see fit.
* currently only works on the ibabuzz site, more sites to come
*/

var stupidPhrases = new Array (
				// here is the magic
				'Alfred1 said,',
				'StoopidFlanders said,'
				);

var stupidPhraseNames = new Array (
				'Alfred1',
				'StoopidFlanders'
				);

// this matches IDs Comment-List, comments, myfancycommentz and such ... : 
var regs4commentWrappers = new Array ( "coms_mid" );

// search any element which has the ID or class that matches
var possibleWrappers = new Array(
					document.getElementsByTagName('div'),
					document.getElementsByTagName('span')
				);

var count = 0;

for (i=0; i<possibleWrappers.length; i++) {
	for (k=0; k<possibleWrappers[i].length; k++) {
		var parentElm = possibleWrappers[i][k];
		for (m=0; m<regs4commentWrappers.length; m++) {
			if (parentElm.id.match(new RegExp(regs4commentWrappers[m], "ig"))){
				// here might be comments
				var checkThis = true;
				// get parent element
				var grandParentElm = parentElm.parentNode;
			} else if (parentElm.className.match(new RegExp(regs4commentWrappers[m], "ig"))){
				// here might be comments
				var checkThis = true;
				// get parent element
				var grandParentElm = parentElm.parentNode;
			} else {
				var checkThis = false;
			}
		}

		if(checkThis) {
			var lis = grandParentElm.getElementsByTagName('span');
				for (m=0; m<lis.length; m++){
					// walk through stupidPhrases 
					for (n = 0; n < stupidPhrases.length; n++){
						if (lis[m].innerHTML.match(new RegExp(stupidPhrases[n], "ig"))){
//alert("found alfie for grandParent = "+grandParentElm.className+"/"+grandParentElm.id);	
var str = "<div class='coms_top'></div> \
           <div class='coms_mid'> \
              <span class='blod-user'>" + stupidPhraseNames[n] + " has been blocked!</span> \
              <span class='blod-date'>&nbsp;</span> \
              <div class='blod-text'></div></div> \
              <div class='coms_bottom'></div>";
							grandParentElm.innerHTML=str;
						}
					}	
				}
			var checkThis = false;
		}
	}
}

