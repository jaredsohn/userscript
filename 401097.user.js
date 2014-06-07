// ==UserScript==
// @name            MAL date fixer - Personal Version
// @version         1.1
// @description     Changes the hideous MM-DD-YY formatted dates on My Anime List to DD-MM-YY
// @match           *://myanimelist.net/*
// @updateURL       https://userscripts.org/scripts/source/401097.meta.js
// @downloadURL     https://userscripts.org/scripts/source/401097.user.js	
// @grant           none
// @author          Silveress
// @copyright       2014+, Silveress
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////
// Original script by James Wood : http://userscripts.org/users/103812 //
/////////////////////////////////////////////////////////////////////////

(function() {    
    var el = document.getElementById('contentWrapper');    
    var dateTrim = function(s) {    
        return s[0] == '0' ? s[1] : s ;    
    };    
    el.innerHTML = el.innerHTML.replace(/\d\d-\d\d-\d\d/g, function(s) {    
        var mdy = s.split('-');    
        return dateTrim(mdy[1]) + '/' + dateTrim(mdy[0]) + '/20' + mdy[2];    
    });    
})();