(function () {
// ==UserScript==
// @name          vBulletin_Use_helvetica
// @namespace     https://rstcenter.com/forum/members/gecko/
// @author        Gecko
// @description   Use te Helvetica font instead of the default one
// @version       0.1
// @updateURL     https://userscripts.org/scripts/source/151090.meta.js
// ==/UserScript==

if ( document.URL.search(/rstcenter.com\/forum/) ) {
    document.body.style.fontFamily="Helvetica";
    document.body.style.fontFamily="Arial";
    document.body.style.fontSize="14px";
    document.getElementById("toplinks").ul.style.font="11px sans-serif";
}
})();