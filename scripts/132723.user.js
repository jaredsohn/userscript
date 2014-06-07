// ==UserScript==
// @name            jsperfNoSave
// @description     Uncheck "Published" checkbox. ("uncheck if you want to fiddle around before making the page public)"
// @version         20120507174037
// @author          opsomh
// @licence         WTFPL; http://sam.zoy.org/wtfpl/
// @namespace       http://userscripts.org/users/465520/scripts
// @include         http://jsperf.com/*
// ==/UserScript==

(function(){
    var chk = document.getElementById('visible');
    if(chk){
        chk.removeAttribute('checked');
    }
})();