// ==UserScript==
// @name          m.twitter @ auto link
// @include       http://m.twitter.com/*
// ==/UserScript==
var regex = /@(\w*)/g;
var elements = document.getElementsByTagName("li");
for (var i = 0; i < elements.length; i++) {
    var content = elements[i];
    var text = content.innerHTML;
    if (text.indexOf("@") < 0) {
        continue;
    }
    content.innerHTML = text.replace(regex, "@<a href=\"http://m.twitter.com/$1\">$1</a>");
}
