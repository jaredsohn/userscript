// ==UserScript==
// @name           wikipedia.org-minimal [tweaked Darkling]
// @description    Based on "en.wikipedia.org-minimal" - Removes navigation, citations, reviews, footnotes, edit 

links, etc. -"1" enables/disables script, apply after reload or opening a new wiki page + "r" strips down current 

page, but doesnt enable the script +++ Links to "See also" & "References" and related information (are keeped)
// @include        http://*.wikipedia.org/wiki/*
// @version	   0.1b
// ==/UserScript==

var item_to_replace  = $x("//div[@id='globalWrapper']")[0];
var replace_with     = $x("//div[@id='content']")[0];
var switchReplace    = GM_getValue('switchReplace', 0);

var stuff_to_remove = [
	// "//div[@id='content']/descendant::span[@class='mw-headline' and contains(text(),'See 

also')]/following::*",
	// "//div[@id='content']/descendant::span[@class='mw-headline' and contains(text(),'See also')]",
	//"//div[@id='content']/descendant::span[@class='mw-headline' and 

contains(text(),'References')]/following::*",
	//"//div[@id='content']/descendant::span[@class='mw-headline' and contains(text(),'References')]",
	"//div[@id='siteNotice']",
	"//div[@id='contentSub']",
	"//div[@id='bodyContent']/table[@class='metadata plainlinks ambox ambox-content']",
	"//div[@id='bodyContent']/table[@class='metadata plainlinks ambox ambox-style']",
	"//h3[@id='siteSub']",
	"//span[@class='editsection']",
	"//div[@class='dablink']",
	"//div[@id='jump-to-nav']",
	"//sup[@class='reference']",
	"//div[@id='bodyContent']/div[1]",
	"//div[@id='content']/descendant::span[contains(text(),'Footnotes')][position()=last()]/following::*",
	"//div[@id='content']/descendant::span[contains(text(),'Footnotes')][position()=last()]",
	
	// My custom ones :)
	"//div[@class='noprint plainlinksneverexpand']",
	"//td[@class='navbox-abovebelow']",
	"//div[@id='bodyContent']/table[@class='metadata plainlinks ombox-small']",
];

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 

null);
	
	for (i = 0; item = xpr.snapshotItem(i); i++) {
		arr.push(item);
	};
	return arr;
}

function stripPage () {
	$x("//div[@id='content']").forEach(function(ad1) {
		ad1.style.margin = '0px';
	});

	if (item_to_replace && replace_with) {
		item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);
	};

	stuff_to_remove.forEach(
		function(xpath) {
			$x(xpath).forEach(
				function(item) {
					item.parentNode.removeChild(item);
				}
			);
		}
	);
};

window.KeyPressEvent  = function (e) {
    if (e.ctrlKey) return;
    if (e.altKey) return;
	
	switch (e.charCode) {
		case 114: // Keypress 'r'
			stripPage();
			return;
		case 49: // Keypress '1'
			if (switchReplace == 0) {
				switchReplace = 1;
				alert('Reading pleasure mode enabled')
			}
			else {
				switchReplace = 0;
				alert('Reading pleasure mode disabled');
				}
			GM_setValue('switchReplace', switchReplace);
			return;
    }
}

document.addEventListener('keypress', window.KeyPressEvent, true);

if (switchReplace == 1) {stripPage();}