// ==UserScript==
// @name           JOURNALREDIRECT
// @namespace      jrd@kwierso.com
// @description    Redirects a specific journal's post box to go to another journal entry.
// @include        http://*.roosterteeth.com/members/journal/entry.php?id=2352859*
// ==/UserScript==

(function(){
    document.forms.namedItem('post').elements.namedItem('to').value = "/members/journal/commentPost.php?id=2352815";
    document.forms.namedItem('post').elements.namedItem('return').value = "/members/journal/commentPost.php?id=2352815";
    document.forms.namedItem('post').elements.namedItem('previewTitle').value = "LordCanti's Journal Comment";
    document.forms.namedItem('post').action = "/members/journal/commentPost.php?id=2352815";
}());