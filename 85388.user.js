// ==UserScript==
// @name           KEYE
// @namespace      www.imakcreations.com
// @description    Auto-voter
// @include        http://weareaustin.upickem.net/engine/*
// ==/UserScript==

if (LoginCheck()) {
    var check = false;
    var anchors = document.getElementsByTagName("input");
    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].value == "4953345") {
            anchors[i].click();
            check = true;
        }
    }
    if (check) {
        document.getElementById('HiddenFormSubmitted').value = 'VOTE';
        document.getElementById('PageForm').submit();
    } else {
        setTimeout("document.location.reload();", 300000);
    }
}
