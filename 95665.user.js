// ==UserScript==
// @name           Facebook Sponsored Ads Remover
// @namespace      http://ruifujiwara.co.cc
// @description    Membersihkan Facenook dari Iklan
// @include        http://*.facebook.com/*
// ==/UserScript==

// Note: Aplikasi ini akan membersihkan facebook anda dari iklan
/* Terkadang iklan akan tetap muncul jadi anda harus merefresh halaman facebook anda.


*/

/*
start remove ads
*/

//Listing of the different div ids that make up the ads.
var stuff_to_remove = [
    "//div[@id='fbEmu']",
    "//div[@id='.fbEmuLink']",
    "//div[@id='adInfo']",
    "//div[@id='fbEmuBlock']",
    "//div[@id='otherdiv']",
    "//div[@id='fbEmuEgoUnit']",
    "//div[@id='fbEmuEgoUnitFirst']",
    "//div[@id='fbEmuTracking']",
	"//div[@id='pagelet_ego_pane']",
	"//div[@id='c4d40e039297f99209648301']",
	"//div[@id='ego_column']",
	"//div[@id='fbEmuEgoUnitFirst']",
	"//div[@id='ego_unit']",
	"//div[@id='fbEmuBlock']",
	"//div[@id='fbEmuEgo']",
	"//div[@id='ego_section']",
	"//div[@id='adinfo']",
	"//div[@id='fbEmuPremium']",
];

// Gather em up
function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

// Knock em dead :)
stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);

/* 
end remove ads
*/