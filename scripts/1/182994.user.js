// ==UserScript==
// @name       Medium - Linebreak After Every Sentence
// @namespace  http://dt.in.th/
// @version    0.2
// @description  Insert a linebreak after the end of every sentence to make Medium easier to read.
// @match      https://medium.com/*
// @copyright  Thai Pangsakulyanont
// ==/UserScript==

function check() {
    var selector = '.body:not(.editable) p:not([data-parabreak])'
    var paragraphs = [].slice.call(document.querySelectorAll(selector))
    paragraphs.forEach(function(p) {
        var html = p.innerHTML
        var replaced = false
        html = html.replace(/\.\s+/g, function(all) {
            replaced = true
            return all + '<span class="paragraph-break"></span>'
        })
        p.setAttribute('data-parabreak', '1')
        if (replaced) p.innerHTML = html
    })
}

setInterval(check, 1000)
check()

GM_addStyle('span.paragraph-break { margin-top: 15px; display: block; }')
