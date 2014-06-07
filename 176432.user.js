// ==UserScript==
// @name        Large screen in Youku
// @namespace   Large screen in Youku
// @description Large screen in Youku
// @include     http://www.youku.com/
// @version     1.0
// @grant       none
// @author      loms126
// ==/UserScript==

    b = Element.extend(document.body);
b.addClassName('yk-w1190').removeClassName('yk-w970');



window.onresize = function(){
    b = Element.extend(document.body);
b.addClassName('yk-w1190').removeClassName('yk-w970');
    } 