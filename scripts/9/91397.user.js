// ==UserScript==
// @name           h2 anytext assistant
// @namespace      http://twitter.com/kosugi
// @description    assists to hatena-star-comment with anytext for Firefox, Opera, etc.
// @include        http://h2.hatena.ne.jp/*
// ==/UserScript==

new function() {

    var doIt = function(e) {
        var input = e.target.querySelector('input[name="body"]');
        if (input) {
            var div = document.createElement('div');
            div.style.textAlign = 'left';
            input.form.parentNode.appendChild(div);
            input.addEventListener('keyup', function() { div.textContent = input.value; }, false);
        }
    }

    setTimeout(function() {
        doIt({target:document});
        window.addEventListener('AutoPagerize_DOMNodeInserted', doIt, false);
    }, 0);
}
