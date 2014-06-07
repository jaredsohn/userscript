// ==UserScript==
// @name           NetSpeak to English
// @namespace      #aVg
// @include        *
// @version        0.1.3
// ==/UserScript==
(function() {
if(/digg\.com/.test(document.URL))
	return;
function fix(A) 
{
	if(/(?:COD|PR)E|INPUT|BUTTON/.test(A.parentNode.tagName))
		return;
	var which = A.nodeType == 1 ? "innerHTML" : "nodeValue";
	var temp=A[which];
	for(var corr in corrs)
		temp = temp.replace(corrs[corr], corr);
	temp = temp.replace(/([\.!]|^)(\s+)([a-z])/g, function($0, $1, $2, $3) {
		return $1 + $2 + $3.toUpperCase();
	});
	A[which]=temp;
}
var ts=document.evaluate(".//text()",document.body,null,6,null), t, i=ts.snapshotLength;
var corrs = {
	this : /\bdis\b/gi,
	doing : /\bdoin'?\b/gi,
	them : /\bem\b/gi,
	yes : /\byah\b/gi,
	", " : / ,\b/gi,
	"You all" : /\by'?all\b/gi,
	to : /\b2\b/gi,
	first : /\b1st\b/gi,
	girl : /gurl/gi,
	"am not" : /\bain'?t\b/gi,
	"for sure" : /\bf[oa] ?show?\b/gi,
	good : /\bgud\b/gi,
	they : /\bdey\b/gi,
	is : /\biz\b/gi,
	"umm..." : /\bu+m+(?:\.+)?\b/,
	okay : /\b(?:a?i+ght|k)\b/gi,
	"have to" : /\bgotta\b/gi,
	"what's up" : /wa[sz]+[au]p/gi,
	just : /\bjus\b/gi,
	$1one : /([a-z]+)1\b/gi,
	that : /\bdat\b/gi,
	"that's" : /\bdat[sz]\b/gi,
	the : /\b(?:t[e3]h|da)\b/gi,
	are : /\br\b/gi,
	"you're" : /\bure\b/gi,
	yeah : /\byea\b/gi,
	your : /\by?ur\b/gi,
	"$1't" : /((?:do(?:es)?|w(?:ere|as|o)|ha(?:ve|[ds])|are|is|(?:sh|[cw])ould)n)t/gi,
	because : /\bb\/c|cuz\b/gi,
	please : /\bpl[sz]\b/gi,
	thanks : /\bth(?:an)?x\b/gi,
	sorry : /\bsr+y\b/gi,
	be : /\bb\b/gi,
	see : /\bc\b/gi,
	cool : /\bko+l\b/gi,
	you : /\bu\b/gi,
	what$1 : /\bw[au]t('?s)?\b/gi,
	why : /\by\b/gi,
	I : /\bi\b/g,
	"I don't know" : /\bidk\b/gi,
	"don't know" : /\bdunno\b/g,
	know : /\b(?:kno|noe)\b/gi,
	before : /\bb4\b/gi,
	"I'm" : /\bim\b/gi,
	// PLAIN BULLSHIT FIXER
	" {much love} " : /\b[xo]{2}\b/gi
};

while(--i >= 0)
	fix(ts.snapshotItem(i));
})();
/*
 // LAG FEST
document.addEventListener("DOMNodeInserted", function(A) {
	fix(A.relatedNode);
},false);

*/