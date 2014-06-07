// ==UserScript==
// @name           Reddit xkcd blocker
// @description    Hides xkcd stories on reddit.
// @include        http://reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://reddit.com/info/*
// ==/UserScript==

(function() {
    var table = document.getElementById('siteTable');
    if (table == null) {
        return;
    }
    var trs = table.getElementsByTagName('tr');
    var tr_group = [];
    var hide = false;
    for (var i = 0; i < trs.length; i++) {
        var tr = trs[i];
        if (/^site/.test(tr.id)) {
            if (hide) {
                for (var j = 0; j < tr_group.length; j++) {
                    tr_group[j].style.display = 'none';
                }
            }
            hide = false;
            tr_group = [];
        }
        var a_elements = tr.getElementsByTagName('a');
        for (var j = 0; j < a_elements.length; j++) {
            var a = a_elements[j];
            if (/title/.test(a.className)) {
                if (/^http:\/\/(blag\.|www\.|imgs\.)?xkcd.(com|org|net)/.test(a.href)) {
                    hide = true;
                }
            }
        }
        tr_group.push(tr);
    }
    if (hide) {
        for (var j = 0; j < tr_group.length; j++) {
            tr_group[j].style.display = 'none';
        }
    }
})();
