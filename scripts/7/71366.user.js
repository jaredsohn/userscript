// ==UserScript==
// @name           What.CD Unread Subscriptions by Default
// @namespace      what.cd
// @include        http*://*what.cd/*
// ==/UserScript==

(function() {
    var subscriptions = document.getElementById('userinfo_minor').getElementsByTagName('li')[4];
    subscriptions.innerHTML = "<a href=\"userhistory.php?action=subscriptions&showunread=1\">Subscriptions</a>";
})();