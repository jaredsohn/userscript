// ==UserScript==
// @name       DOI links for Web of Knowledge
// @description  The research site Web of Knowledge currently does not link to the original publications of the cited articles. Whenever a DOI is given, this Userscript will prepend such a link (in the form of [☞]) to the DOI.
// @updateURL https://userscripts.org/scripts/source/165321.meta.js
// @downloadURL https://userscripts.org/scripts/source/165321.user.js
// @include    *.webofknowledge.com*
// @exclude    *google.com*
// @grant      none
// @version    0.1
// @copyright  2013+, Alexander Seifert
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$("span:contains('DOI:')").each( function(index) {
    doi = $(this).next();
    doi.before("<a target='_blank' href='http://dx.doi.org/" + doi.text() + "'>[&#9758;]</a>&nbsp;");
});