// ==UserScript==
// @name        Hide annoying HKG members
// @include     http://forum*.hkgolden.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description Find annoying members on HKGolden and hide their posts.
// @version     0.0.1
// @grant       none
// ==/UserScript==

var i;
var annoyingMembers = [
    '407167', // 梁振鷹隊狂迷 
    '430611', //Einstein02
    '432661' //日和
];

function hideAnnoyingMembersTitle() {
    $("a[style='color: black;']").each(function () {
        for (i = 0; i < annoyingMembers.length; i++) {
            if ($(this).attr("href").indexOf(annoyingMembers[i]) !== -1) {
                $(this).parent().parent().remove();
            }
        }
    });
}

function hideAnnoyingMembersReply() {
    for (i = 0;  i < annoyingMembers.length; i++) {
        $("tr[userid='" + annoyingMembers[i] + "']").each(function () {
            $(this).remove();
        });
    }
}

$(function () {
    hideAnnoyingMembersTitle();
    hideAnnoyingMembersReply();
});

setInterval(function () {hideAnnoyingMembersTitle(); }, 500);
setInterval(function () {hideAnnoyingMembersReply(); }, 500);