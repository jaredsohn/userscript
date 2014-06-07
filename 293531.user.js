// ==UserScript==
// @id             nasdaq-no-ticker-focus
// @name           NASDAQ no ticker focus
// @version        1.0
// @namespace      
// @author         peterph
// @description    unfocus stock search on nasdaq.com and fix broken display of header (in SeaMonkey at least)
// @include        http://www.nasdaq.com/*
// @include        http://*.nasdaq.com/*
// @run-at         document-end
// ==/UserScript==
//

// display properly on narrow displays
header_el = document.getElementsByTagName('header')[0].getElementsByTagName('div')[0];
header_el.style = "width: 100%;";

// remove default focus on stock search
inp = document.getElementById('stock-search-text');
inp.disabled = "disabled";

function inp_enable () {
    inp.disabled = "";
}
window.setTimeout(inp_enable, 200);
