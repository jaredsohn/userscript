// ==UserScript==
// @name           Eenadu Font Fixer
// @namespace      http://www.terala.com/eenadu
// @include        http://www.eenadu.net
// @description    Use this script with Padma extension enabled. On windows machines, Vemana2000 font is used instead of the crappy Gautami font. 
// ==/UserScript==


var eenaduFontTags, fonttag;

// Replace the font to Vemana2000.
eenaduFontTags = document.evaluate("//font[@face='Eenadu']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < eenaduFontTags.snapshotLength; i++) {
    fonttag = eenaduFontTags.snapshotItem(i);
    fonttag.setAttribute("face", "Vemana2000");
}

// Reduce the size to +1
eenaduFontTags = document.evaluate("//font[@size]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < eenaduFontTags.snapshotLength; i++) {
    fonttag = eenaduFontTags.snapshotItem(i);
    fonttag.setAttribute("size", "3");
}
