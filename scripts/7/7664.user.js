// ==UserScript==
// @name           	Plime SFW
// @namespace      http://students.cs.byu.edu/~bwb38/
// @description   	Hide link entries on plime marked NSFW, careful@work, or with other undesireable/annoying terms.  Simply edit the list to suit your workplace or preferences
// @include        	http://www.plime.com*
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                         Enter filter terms here (case insensitive)
///////////////////////////////////////////////////////////////////////////////////////////////////////

block_terms = new Array("NSFW", "@work", "sex", "orgasm", "porn", "hentai",
						"nude", "naked", "nudist", "dildo", "stripper", 
						"playboy", "rape", "bikini", "Anna Nicole Smith",
						"Spears", "Supermodel",	"g-spot", "strip", "breast",
						"thong", "underwear", "panties", "biatch", "molest",
						"bikini", "lesbian", "gay", "lesbian", "boobs", "penis", 
						"vagina", "viagra", "hooker", "cialis", "blue pill",
						"not safe for work"
						);

///////////////////////////////////////////////////////////////////////////////////////////////////////


entries = getElementsByClass('regular', null, null);
bad = 0;
var entriesLen = entries.length;
var termLen = block_terms.length;
for (i = 0; i < entriesLen; i++) 
{
    try {
       for (j=0; j < termLen; j++) {
			regexp = new RegExp(block_terms[j], "i");
			if (entries[i].innerHTML.match(regexp)) {
				bad = 1;
				break;
			}
	   }

    }
    catch(e){}
    if (bad) {
		d = entries[i].parentNode;
		d.removeChild(d.childNodes[0]);
		bad = 0;
	}
}


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}