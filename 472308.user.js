// ==UserScript==
// @name        Wowhead - Show DisplayID
// @namespace   http://userscripts.org/users/250039
// @description Adds the Item Display ID to Wowhead.
// @downloadURL https://userscripts.org/scripts/source/472308.user.js
// @updateURL   https://userscripts.org/scripts/source/472308.meta.js
// @include     *.wowhead.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     0.2
// @grant       none
// ==/UserScript==
$(document).ready(function () {
    if ($('#dsgndslgn464d').length) {
        var v_did = $('#dsgndslgn464d').attr('onclick');
        var v_did_result = v_did.substring(v_did.indexOf('displayId:')).substring(10).replace(/[^\d.]/g, '');
        $('#infobox-contents0 ul').append('<li><div>DisplayID: ' + v_did_result + '</div></li>');
    }
});