// ==UserScript==
// @name          Reddit: Move subreddit tags to the end of the headline
// @description   Moves the [section labels] from links on reddit.com to the end of the headline and styles them differently.  
// @include       *reddit.com*
// ==/UserScript==

///////////////////////////////////////////////////
// FIRST, RESTYLE THE LINK SO IT STANDS OUT SOME
///////////////////////////////////////////////////

// This step is a modification of the "Reddit: Link Cleaner" userscript

(function(){
    var newSS;

	var styles = '.link_subreddit {font-size: 10px; font-weight: normal; letter-spacing: 1px; color: #d63; background-color: #fff; margin-right: 5px; }';

    newSS = window.document.createElement('link');
    newSS.rel='stylesheet';
    newSS.href='data:text/css,' + escape(styles);
    window.document.getElementsByTagName("head")[0].appendChild(newSS);})();

////////////////////////////////////////////
// THEN MOVE ALL "link_subreddit" SPANS 
////////////////////////////////////////////

var spans = document.getElementsByTagName('span');
var nrSpans = spans.length;
for (var i = 0; i < nrSpans; i++) {
	var thisSpan = spans[i];

	if (thisSpan.className.match(/link_subreddit/)) {
		var thisAnchor = thisSpan.parentNode;
		var thisTD = thisAnchor.parentNode;
		var theSource = thisAnchor.nextSibling;
		// DEBUG
		//theSource.style.backgroundColor = '#00FF00';
		//thisAnchor.style.backgroundColor = '#FFFF00';
		//thisTD.style.backgroundColor = '#F0F0F0';
		
		// relocate the link_subreddit span
		thisAnchor.removeChild(thisSpan);
		thisTD.insertBefore(thisSpan, theSource);

		// remove the extra space before the headline text
		var AnchorHTML = thisAnchor.innerHTML;
		thisAnchor.innerHTML = AnchorHTML.replace('&nbsp;','');
	}
}	

