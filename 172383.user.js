// ==UserScript==
// @name        make huge yahoo bar scrollable and remove logo animation
// @namespace   yahoo
// @description make huge yahoo bar scrollable and remove logo animation
// @include     *.yahoo.com/*
// @version     3
// ==/UserScript==

void function () {
 var html_obj = document.documentElement
 html_obj.setAttribute('style', 'padding-top   : 0 !important')
} ()

var hide_huge_yahoo_bar_test_id = setInterval (function () {
 var bar = document.getElementById('yucsHead')
 if (bar == null) return
 clearInterval (hide_huge_yahoo_bar_test_id)
 var body = document.body
 body.insertBefore (bar, body.childNodes[0])
 bar.setAttribute('style', 'position:relative; box-shadow:none !important; 

border-bottom: medium none !important')
}, 30)


var remove_animations_test_id = setInterval (remove_animations_test, 30)
remove_animations_test ()

function remove_animations_test () {
 var animator_div = document.getElementById('animator')
 if (animator_div == null) return
 clearInterval (remove_animations_test_id)
 animator_div.style.backgroundPosition = "0 0"
 var animator_div_2 = animator_div.cloneNode ()
 var parent = animator_div.parentNode
 parent.appendChild (animator_div_2, animator_div)
 animator_div.style.display = "none"
}
