// ==UserScript==
// @name           Gamespot PSP
// @namespace      Gamespot
// @include        *gamespot.com/psp*index.html*
// ==/UserScript==



var Top = document.getElementById('masthead');
if (Top) {
    Top.parentNode.removeChild(Top);
}

var Search = document.getElementById('masthead_actions');
if (Search) {
    Search.parentNode.removeChild(Search);
}

var login = document.getElementById('userpanel');
if (login) {
    login.parentNode.removeChild(login);
}

var promos = document.getElementById('cnet_footer');
if (promos) {
    promos.parentNode.removeChild(promos);
}

var com = document.getElementById('commerce_module');
if (com) {
    com.parentNode.removeChild(com);
}

var gfaqs = document.getElementById('gfaqs_answers_questions');
if (gfaqs) {
    gfaqs.parentNode.removeChild(gfaqs);
}

var trailer = document.getElementById('gscpromo_module');
if (trailer) {
    trailer.parentNode.removeChild(trailer);
}

var subs = document.getElementById('gamespace_user_submissions');
if (subs) {
    subs.parentNode.removeChild(subs);
}

var union = document.getElementById('unions_module');
if (union) {
    union.parentNode.removeChild(union);
}

var tags = document.getElementById('tags_module');
if (tags) {
    tags.parentNode.removeChild(tags);
}

var sitepromos = document.getElementById('site_promos');
if (sitepromos) {
    sitepromos.parentNode.removeChild(sitepromos);
}