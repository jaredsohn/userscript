// ==UserScript==
// @name           eRepublik Plasmon
// @version        v1.0
// @author         SDF_R98
// @namespace      SDF_R98
// @include        http://www.erepublik.com/*/citizen/profile/*
// ==/UserScript==
//---------------------------------------------------------------------------
// reference http://userscripts.org/scripts/show/80226
(function () {
function extractUrl(a) {
    return a.replace(/"/g, "").replace(/url\(|\)$/ig, "")
}

function fixAvatar() {
    var a = extractUrl($j("img.citizen_avatar").css("background-image")).split("_")[0] + ".jpg";
    $j("img.citizen_avatar").wrap('<a href="' + a + '" target="_blank" />')
}

fixAvatar();
})();