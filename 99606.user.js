// No More Nig Script!
// version 0.99b
// 23/03/2011
// by Yazman

// ==UserScript==

// @name No More Nig!
// @namespace No More Nig!
// @description No more racists trying to be edgy online! 
// @include * 
// @version 0.99b
// @homepage http://userscripts.org/scripts/show/99606
// ==/UserScript==

/* 

If you plan on using any part of this script (even a small part) and publishing it please give credit
to Jmaxxz for the original base work on this script. I wrote sections of it myself but he did the 
original groundwork on it that made this script possible. I got the original idea from another script
an unknown member from LL wrote that has since disappeared. Credit to you, unknown user! This script
is after much revision now drastically different from the original versions as I couldn't iron out
some bugs, but I'm still giving credit for the very early stuff I used from Jmaxxz' work even though
barely any of it is in the script now.

Jmaxxz based his work on a script in Mark Pilgram's upcoming "Dive into Greasemonkey" 
The Jmaxxz Vulgar Word Blocker can be found at: http://userscripts.org/scripts/show/2287
A Special thank you goes to rschultz2002 and Giorgio Maone for their help in the making of this script
*/ 

// This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently 

replacements = {
	


// [Place custom word list below] 

 "\\bnigger\\b": "black gentleman", 
 "\\bniggers\\b": "black gentlemen",
 "\\bnig\\b": "black guy",
 "\\bnigs\\b": "black gentlemen", 
 "\\bnigz\\b": "black gentlemen",
 "\\bniglit\\b": "black child",
 "\\bniglet\\b": "black child",
 "\\bniglets\\b": "black children",
 "\\bniglits\\b": "black children",
 "\\bnigette\\b": "black lady",
 "\\bnigettes\\b": "black ladies",
 "\\bNigger\\b": "Black gentleman", 
 "\\bNigger\\b": "Black gentlemen",
 "\\bNig\\b": "Black guy",
 "\\bNigs\\b": "Black gentlemen", 
 "\\bNigz\\b": "Black gentlemen",
 "\\bNiglit\\b": "Black child",
 "\\bNiglet\\b": "Black child",
 "\\bNiglets\\b": "Black children",
 "\\bNiglits\\b": "Black children",
 "\\bNigette\\b": "Black lady",
 "\\bNigettes\\b": "Black ladies",
 "\\bNIGGER\\b": "BLACK GENTLEMAN", 
 "\\bNIGGERS\\b": "BLACK GENTLEMEN",
 "\\bNIG\\b": "BLACK GUY",
 "\\bNIGS\\b": "BLACK GENTLEMEN", 
 "\\bNIGZ\\b": "BLACK GENTLEMEN",
 "\\bNIGLIT\\b": "BLACK CHILD",
 "\\bNIGLET\\b": "BLACK CHILD",
 "\\bNIGLETS\\b": "BLACK CHILDREN",
 "\\bNIGLITS\\b": "BLACK CHILDREN",
 "\\bNIGETTE\\b": "BLACK LADY",
 "\\bNIGETTES\\b": "BLACK LADIES"


};


var openingNumber = 0;

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	
	node = textnodes.snapshotItem(i);
	s = node.data;
	
	for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	}

	node.data = s;

}

var paragraphs = document.getElementsByTagName( 'p' );

for ( var i = 0; i < paragraphs.length; i++ )
{

	var paragraph = paragraphs[i];
	paragraph.innerHTML = openings[openingNumber] + paragraph.innerHTML;
	openingNumber++;
	if ( openingNumber == openings.length ) openingNumber = 0;

}


//Thanks to:
//Scott Reynen for the original skeleton
//zoobtoob for hosting
//thegreatsaiyaman fer fixing a good piece of the code
//A shitload of LLers for word ideas
