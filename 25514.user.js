// ==UserScript==
// @name           SymphonyGoodTitle
// @namespace      http://userscripts.org/users/50284
// @identifier     http://userscripts.org/scripts/source/25514.user.js
// @version        0.3
// @date           2008-04-23
// @description    Set symphony windows title according with the content. Author: Jean Riche Version: 0.3
// @include        http://*.schneider-electric.com/Windchill/*
// ==/UserScript==

// ChangeLog
// 0.3 (2008-04-23)
//	Test auto-update
// 0.2 (2008-04-22)
// 	Clean up testing code.
// 	write as matrix replacement text
// 	remove spaces in Title
// 	Set auto-update compatible with autoupdate script: http://userscripts.org/scripts/show/2296

// Don't modify anything here !!
// ------------------------------------------------------
window.addEventListener('load', function() {
// check for updates every day
  if ((unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates) {
    var lastChecked = GM_getValue('LAST_UPDATE_CHECKED', null);
    var now = new Date().getTime();
    if (!lastChecked || (now - lastChecked) > 24 * 60 * 60 * 1000) {
      GM_setValue('LAST_UPDATE_CHECKED', now.toString());
      var SCRIPT = {
        name: 'SymphonyGoodTitle',
        namespace: 'http://userscripts.org/users/50284',
        description: 'Set symphony windows title according with the content. Author: Jean Riche Version: 0.3',
        source: 'http://userscripts.org/scripts/show/25514',
        identifier: 'http://userscripts.org/scripts/source/25514.user.js',
        version: "0.3",
        date: (new Date(2008, 4 -1, 23))
            .valueOf()
      };
      try {
        (unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
      } catch (ex) {}
    }
}
var doc=unsafeWindow.frames['banner'].document;
var xpath="/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td/b";
var element=doc.evaluate(xpath,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
if (element==null) {GM_log("Invalid xpath ("+xpath+")"); return;}
var replacements, regex, key;
replacements = {
// ------------------------------------------------------

// Remplacement string matrix: Add lines here in the matrix if you want add replacement types.
// exemple: 
//	"Text to be replaced" : "Replacement text",
// don't forget the "," at the end

	"Application Note VALIDATION -"		: "",
	"Application Note RELEASING -"		: "",
	"Application Note"				: "AN",
	"Releasing"						: "R4M",
	"Properties Document"				: "",
	"Properties Part"					: "",
	"Properties"					: "",
	"Treatment"						: "",
	"Released for Mfg"				: "R4M",
	"Related Tasks"					: "R-Tasks",
	"Navigate Links Document"			: "NavLinks",
	"Navigate Links Part"				: "NavLinks",
	"View All revisions history"			: "Rev history",
	"View All iteration history"			: "Iter. history",
	"View Save As history"				: "Save As history",
	"First Level Part"				: "1st Used by",
	"Multi Level Part"				: "XL Used by",
	"Multi-Level Structure Part"			: "xLevel",
	

// Don't modify all below ---------------------
};
regex = {};
for (key in replacements) {
		regex[key] = new RegExp(key, 'gi');
	}
var ititle = element.textContent;
for (key in replacements) {
		ititle = ititle.replace(regex[key], replacements[key]);
	}
//ititle = ititle.replace(/^\s*|\s*$/,"");
ititle = ititle.replace(/^\s*([\s\S]*\S+)\s*$|^\s*$/, '$1');
ititle = ititle.replace(/\s+/g," ");
document.title=ititle;
}, false);
