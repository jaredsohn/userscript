// ==UserScript==
// @name           Twitter Reload on Update
// @namespace      http://endflow.net/
// @description    reloads twitter home page after updated your status.
// @include        http://twitter.com/home
// ==/UserScript==

(function(){

var w = this.unsafeWindow || window;
setTimeout(function(){
    var doingForm = $('doingForm');
    var reloadScript = '(' + $('home_tab').onclick.toString() + ')();'
    doingForm.setAttribute('onsubmit', doingForm.getAttribute('onsubmit')
        .replace(/hide\(\);\}/, 'hide();' + reloadScript + '}'));
}, 500);
function $(id){return w.document.getElementById(id)}

})();
