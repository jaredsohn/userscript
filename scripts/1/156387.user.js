// ==UserScript==
// @name			CloseTab by DoubleClick in ContentArea
// @description		Close the active tab by double-clicking the content area
// @include		http*
// @include		about:blank
// @exclude		about:config
// @exclude		about:addons
// @version		1.3 add @exclude line
// ==/UserScript==

document.addEventListener("dblclick", function(e) {
    var localName = e.target.localName;
    if ((e.button == 0) && (/*localName == 'a' || */localName == 'input' || localName == 'textarea' | localName == 'password')) return;
          window.close();
}, false);
