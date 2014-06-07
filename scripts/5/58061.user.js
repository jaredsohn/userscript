// ==UserScript==
// @name           pointlessCommentTrasher
// @namespace      featurelover
// @description    helps you to get rid of those crappy repetive phrases which are stated over ond over by certain political associations ;)
// @include        *
// ==/UserScript==

/* add your regexp's here -- "/i" is added by default, so all upper- / lowercase is equalized.
 * you can also match against images and other html-code. just get familar with regexp :)  */

var stupidPhrases = new Array (
				"Klarmachen[^a-z]+zum.*ndern", /* just an example -- dunno what the intention of that ones author might be */
				"ich\s+w[\&,;,a-z,0-9]{0,6}hle\sHasenpower"
				);


var hint4deleted = document.createAttribute("style");
hint4deleted.nodeValue = "border-top: 2px solid silver";


/* youtube */
if( window.location.hostname.toLowerCase().indexOf('youtube.') > 0){
	var divs = document.getElementsByClassName('watch-comment-entry');
	for (i=0; i<divs.length; i++) {
		var ihtml = divs[i].innerHTML;
		/* walk through stupidPhrases */
		for (k=0; k<stupidPhrases.length; k++){
			if (ihtml.match(new RegExp(stupidPhrases[k], "i"))){
				/* k dis stupid -- I can haz gets rid of it :) */
				divs[i].style.display="none";
				divs[i+1].setAttributeNode(hint4deleted.cloneNode(true)); 
			}
		}
	}
}
/* blogspot*/
else if( window.location.hostname.toLowerCase().indexOf('blogspot.') > 0){
	var dds = document.getElementsByClassName('comment-body');
	for (i=0; i<dds.length; i++) {
		var ihtml = dds[i].innerHTML;
		/* walk through stupidPhrases */
		for (k=0; k<stupidPhrases.length; k++){
			if (ihtml.match(new RegExp(stupidPhrases[k], "i"))){
				/* k dis stupid -- I can haz gets rid of it :) */
				if (dds[i].previousSibling.previousSibling.tagName.toUpperCase()=='DT') {
					dds[i].previousSibling.previousSibling.style.display="none";
				} else {
					dds[i].previousSibling.style.display="none";
				}
				dds[i].style.display="none";
				if (dds[i].nextSibling.nextSibling.tagName.toUpperCase()=='DD') {
					dds[i].nextSibling.nextSibling.style.display="none";
				} else {
					dds[i].nextSibling.style.display="none";
				}
				if (dds[i+1].previousSibling.previousSibling.tagName.toUpperCase()=='DT') {
					dds[i+1].previousSibling.previousSibling.setAttributeNode(hint4deleted.cloneNode(true));
				} else {
					dds[i+1].previousSibling.setAttributeNode(hint4deleted.cloneNode(true));
				}
			}
		}
	}
} else {
	/* others */
	/* this matches IDs Comment-List, comments, myfancycommentz and such ... : */
	var regs4commentWrappers = new Array ("comment");
	// search any element which has the ID or class that matches
	var possibleWrappers = new Array(
								document.getElementsByTagName('div'),
								document.getElementsByTagName('ol'),
								document.getElementsByTagName('ul')
							);
	for (i=0; i<possibleWrappers.length; i++) {
		for (k=0; k<possibleWrappers[i].length; k++) {
			var parentElm = possibleWrappers[i][k];
			for (m=0; m<regs4commentWrappers.length; m++) {
				if (parentElm.id.match(new RegExp(regs4commentWrappers[m], "i"))){
					// here might be comments
					var checkThis = parentElm;
				} else if (parentElm.className.match(new RegExp(regs4commentWrappers[m], "i"))){
					// here might be comments
					var checkThis = true;
				} else {
					var checkThis = false;
				}
			}
			// k nao check dis
			if(checkThis){
				var lis = parentElm.getElementsByTagName('li');
				for (m=0; m<lis.length; m++){
					/* walk through stupidPhrases */
					for (n=0; n<stupidPhrases.length; n++){
						if (lis[m].innerHTML.match(new RegExp(stupidPhrases[n], "i"))){
							/* k dis stupid -- I can haz gets rid of it :) */
							lis[m].style.display="none";
							lis[m+1].setAttributeNode(hint4deleted.cloneNode(true)); 
						}
					}	
				}
			var checkThis = false;
			}
		}		
	}
}

