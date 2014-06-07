// ==UserScript==
// @name       Lingr message blockquotize
// @namespace  http://aycabta.github.io/
// @version    0.3
// @description  benry
// @match      http://lingr.com/
// @copyright  2014+, You
// ==/UserScript==

(function() {
    var blockquoteButton = document.createElement("input");
    blockquoteButton.type = "button";
    blockquoteButton.value = "blockquotize";
    blockquoteButton.onclick = function(event) {
        var deliciousLunch = document.getElementsByClassName('empty')[0];
        deliciousLunch.value = deliciousLunch.value.replace(/^/gm, '> ');
        var sayForm = document.getElementsByClassName('say_form')[0];
        sayForm.getElementsByTagName('textarea')[0].focus();
    }
    blockquoteButton.style.float = "right";
    blockquoteButton.style.marginTop = "20px";
    var sayIt = document.evaluate('//input[@name="commit"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    sayIt.parentNode.insertBefore(blockquoteButton, sayIt);
})();
