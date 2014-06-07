// Written by Albatross
// Feb 11, 2008

// ==UserScript==

// @name           MDAO That Woman Remover

// @namespace      mdaothatwomanremover

// @description    Removes discuss.jpg at MDAO website

// @include        http://mdao.v-cc.com/*


// ==/UserScript==

(function() {
    var pars = document.getElementsByTagName("p");

    for (var i = pars.length - 1; i >= 0; i--) {
          if (pars[i].innerHTML.indexOf("discuss.jpg") != -1) {
		pars[i].parentNode.removeChild(pars[i]);
        }
    }
}
)();
