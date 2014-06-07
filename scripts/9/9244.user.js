// ==UserScript==
// @name          iGoogle - Searchbar Transparency Edit
// @namespace     http://userstyles.org
// @description	  I love the new themes Google has added, but I wasn't fond of certain things (namely the input, tabs, etc) getting in the way of good artwork. So I modified certain parts of the page to be transparent so I can see all the goodies :) I am currently using the Springscape theme although this script is compatible with *ALL* of the Google Homepage Themes so far. *Current Script Size: 3706 bytes (3.7KB
// @author        Zathman
// @homepage      http://userstyles.org/style/show/2162
// @include       http://www.google.com/ig*
// ==/UserScript==
var css = "/* Zathman's Google Homepage Transparency Edits version 1.2 */ /* Last Updated: 15 MAY 2007 - - - - Email: zathman@gmail.com */ /* http://www.userstyles.org/style/2162/ */ @namespace url(http://www.w3.org/1999/xhtml); /** TO LOCALIZE, CHANGE THE .COM TO .CO.UK, .DE OR WHATEVER **/ /** THE FOLLOWING EDITS MAKE THE INPUT AREA TRANSPARENT **/ input#q { text-align: center ! important; border-width: 0px ! important; padding: 2px ! important; padding-top: 3px ! important; opacity:.50 ! important; -moz-opacity: 0.5 ! important; width: 346px ! important; height: 15px ! important; border: 1px #9a9a9a solid ! important; color: #000000 ! important; font-weight: bold ! important; } input#btnI { display: none ! important; } /** 15 MAY 2007 - NUMEROUS FIXES AND TRANSPARECY EDITS BELOW **/ #guser { font-size: 0.9em ! important; font-weight: bold ! important; opacity:.65 ! important; -moz-opacity: 0.65 ! important; } input#btnG, div#regular_logo, p.gseaopt a, span#more, div#featuretabs a { border: 0 ! important; opacity:.75 ! important; -moz-opacity: 0.75 ! important; } p.gseaopt a:hover, div#featuretabs a:hover, #guser a { opacity: 1 ! important; -moz-opacity: 1.0 ! important; text-decoration: none ! important; } /** THE NEXT TWO EDITS CAUSE THE TABS TO BE TRANSPARENT **/ /** WHEN YOU MOUSEOVER THEY BECOME SOLID AGAIN* **/ .unselectedtab, .unselectedtab_l, .unselectedtab_r, .spacer, .addtab, #addstuff { opacity: .5 ! important; -moz-opacity: 0.50 ! important; } #addstuff a { color: #777777 ! important; padding-left: 2px ! important; padding-right: 2px ! important; } .unselectedtab:hover, #addstuff a:hover { opacity: 1 ! important; -moz-opacity: 1.0 ! important; text-decoration: none ! important; color: #000000 ! important; } /** 06 APR 2007 - \"MORE\" TAB FIX - GOT PROBLEMS? EMAIL ME **/ /** 14 MAY 2007 - EXPANDED THE \"MORE\" POPUP TO FIT EVERYTHING **/ /** 15 MAY 2007 - I PERSONALLY DO NOT BELIEVE THE CLOSE BUTTON IS NEEDED **/ #more { margin-left: -194px ! important; position: absolute ! important; top: 111px ! important; left: 50% ! important; width: 388px ! important; background: #ffffff ! important; padding-bottom: 0 ! important; border: 0 ! important; text-align: center ! important; } #more > br { display: none ! important; } #more a { margin-right: 1em ! important; } img[src*=\"/ig/images/x2.gif\"] { visibility: hidden ! important; } /** 14 MAY 2007 - UNHID FOOTER, KEEPING \"new\" MESSAGES HIDDEN **/ /** FOOTER IS NOW TRANSPARENT, AND OPAQUE WHEN HOVERED OVER **/ .new { visibility: hidden ! important; } #footer_promos { opacity: .3 ! important; -moz-opacity: 0.30 ! important; } #footer_promos:hover { opacity: .8 ! important; -moz-opacity: 0.80 ! important; } /** THIS CAUSES 2-LINE STORIES TO JUST BE 1 LINE **/ /** DELETE THE BOTTOM TWO EDITS TO REMOVE THIS FEATURE **/ /** YOU CAN STILL SEE FULL TITLES BY EXPANDING A STORY **/ .uftl { white-space: nowrap ! important; overflow: hidden ! important; } .modboxin { padding-right: 5px ! important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
