// ==UserScript==
// @author         Zari
// @name           Close window after donate
// @namespace      Erep
// @description    Automatically starts  
// @version        0.2
// @include        http://www.erepublik.com/*/economy/donate-items/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


(function($) {
    if (window.name.match("^dof")=="dof"){
        if ($('table.info_message tbody tr td').length)
            window.close();        
    }
    })(jQuery);