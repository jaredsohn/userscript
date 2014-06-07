// ==UserScript==
// @name        50cents members finder
// @namespace   https://blog.wtako.coms.hk
// @include     http://forum*.hkgolden.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description Find 50cents members on HKGolden and highlight them.
// @version     0.0.1
// @grant       none
// ==/UserScript==

function locateCentsMembers() {
    $("tr[userid]").each(function () {
        if (centsMembers.indexOf($(this).attr("userid")) !== -1) {
            $(this).find("td").css({"background-color": "#FF3333"});
            $(this).find(".repliers_left").find("div").find("div").find("img[alt='Normal'],img[alt='Advanced']").attr("src", "http://i.na.cx/CxFwE.png");
        }
    });
}

var centsMembers = ['11936', '30996', '57818', '126935', '128181', '132945', '177349', '191774', '206969', '223117', '235453', '240519', '245292', '254220', '263391', '263391', '269666', '280044', '281435', '283289', '284980', '287651', '290481', '290481', '293161', '293161', '300415', '303648', '306592', '309519', '311193', '311193', '312521', '312521', '312656', '316547', '332169', '334041', '345636', '348109', '350274', '350274', '371362', '384617', '384617', '391423', '397116', '402466', '427209'];

setInterval(function () {locateCentsMembers(); }, 1000);