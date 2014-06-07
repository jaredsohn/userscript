// ==UserScript==
// @name        hide probie
// @namespace   http://rdiedrich.org/userscripts
// @author      Rüdiger Diedrich (http://www.rdiedrich.org)
// @include     http://forums.somethingawful.com/*
// @run-at      document-start
// @version     1.1
// ==/UserScript==

(function hide_probie () {
    var div_checker_id = window.setInterval(function(){
        if (document.getElementById('probation_warn')) {
            document.getElementById('probation_warn').hidden = true;
            window.clearInterval(div_checker_id);
        }
    },10);
})();