// ==UserScript==
// @name		Hotnews Cleaner
// @namespace		http://userscripts.org/users/65373
// @description		Hides clutter on hotnews.ro
// @version		2.0
// @include	        http://*.hotnews.ro/*
// ==/UserScript==

function hideclass(theClass, much) {
	var allPageTags=document.getElementsByTagName("*");
	for (i=0; i<allPageTags.length; i++) {
		if (allPageTags[i].className==theClass) {
			allPageTags[i].style.width=much + 'px';
		}
	}
}

function block(theClass, much) {
	var allPageTags=document.getElementsByTagName("*");
	for (i=0; i<allPageTags.length; i++) {
		if (allPageTags[i].className==theClass) {
			allPageTags[i].style.display = "none";
		}
	}
}

function posit(theClass, position_left, position_top) {
	var allPageTags=document.getElementsByTagName("*");
	for (i=0; i<allPageTags.length; i++) {
		if (allPageTags[i].className==theClass) {
			allPageTags[i].style.position = 'relative';
			allPageTags[i].style.left = position_left +'px';
			allPageTags[i].style.top = position_top +'px';
		}
	}
}
block("left_side");
block("right_side");
//block facebook, googleplus share buttons
block("addthis_toolbox addthis_default_style");
hideclass("center_side", 900);
hideclass("center", 850);
//posit("lastUpdated", -650, -20);
posit("articleAccessCount", -770, 0);

/*
HOTNEWS adblock rules

*.hotnews.ro/*##DIV[class="right_side"]
*.hotnews.ro/*##DIV[class="left_side"]
*.hotnews.ro/*##DIV[id="banner"]
*.hotnews.ro/*##DIV[class="menu"]
*.hotnews.ro/*##DIV[class="master_sus_unelte"]
*.hotnews.ro/*##DIV[id="master_sus_login"][class="master_sus_login"]
*.hotnews.ro/*##DIV[class="footerCopyright"]
*.hotnews.ro/*##DIV[id="footer"]
*.hotnews.ro/*##DIV[id="comentarii"][class="comentarii"]
*.hotnews.ro/*##DIV[class="banda_social_div"]
*.hotnews.ro/*##DIV[class="tool_top"]
*.hotnews.ro/*##DIV DIV DIV DIV DIV DIV DIV IFRAME
*.hotnews.ro/*##DIV[class="left"]
*/