// ==UserScript==
// @name           Gamespot
// @namespace      Gamespot
// @description    Gamespot
// ==/UserScript==


var Gfaqs = document.getElementById('gamespace_user_submissions');
if (Gfaqs) {
    Gfaqs.parentNode.removeChild(Gfaqs);
}



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


var sitepromos = document.getElementById('site_promos');
if (sitepromos) {
    sitepromos.parentNode.removeChild(sitepromos);
}


var eyebrow = document.getElementById('eyebrow');
if (eyebrow) {
    eyebrow.parentNode.replaceChild(blank);
}

GM_addStyle(<><![CDATA[

div.promos{
display:none !important;
}

]]></>.toString());
