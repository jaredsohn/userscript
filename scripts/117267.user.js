// ==UserScript==
// @name       Dozensonline Safe Symbols X & E
// @namespace  http://userscripts.org/users/322169
// @version    1.0
// @description  Inserts full [img] tags into Dozensonline messages, rather than :A and :B.
// @include    http://z13.invisionfree.com/DozensOnline/*
// @copyright  2011, James Wood
// ==/UserScript==

(function() {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = 'var textinput = document.querySelector(".textinput");\n'
        + 'function digitImage(tag) { doInsert(tag, "", false); textinput.selectionStart += tag.length; }';
    document.head.appendChild(script);
    
    document.querySelector('a[href="javascript:emoticon(\':A\')"]')
        .setAttribute('href', 'javascript:digitImage("[img]http://209.85.12.232/4201/70/emo/ten_doz.JPG[/img]")');
    document.querySelector('a[href="javascript:emoticon(\':B\')"]')
        .setAttribute('href', 'javascript:digitImage("[img]http://209.85.12.232/4201/70/emo/elf_doz.JPG[/img]")');
})();