// ==UserScript==
// @name Better Livejournal Quick-Reply Form
// @description In the Livejournal quick-reply form, changes the "more options" button to a "preview" button, and changes the "spell check" checkbox into "don't autoformat".
// @include http://*.livejournal.com/*
// ==/UserScript==

(function () {
    var qr = document.getElementById("qrform");
    if(qr != undefined) {
        var checkbox = document.getElementById("do_spellcheck");
        checkbox.name = 'prop_opt_preformatted';

        var label = checkbox.nextSibling;
        if(label.nodeType != 1) label = label.nextSibling; // skip blank text node
        label.innerHTML = "Don't auto-format";

        var oldButton = document.getElementById("submitmoreopts");
        var newButton = document.createElement('input');
        newButton.value = "Preview";
        newButton.name = "submitpreview";
        newButton.type = "submit";
        oldButton.parentNode.insertBefore(newButton, oldButton);
        oldButton.parentNode.removeChild(oldButton);
    }
})();

//.user.js