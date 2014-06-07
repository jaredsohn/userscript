// ==UserScript==
// @name       Lernu! keyboard shortcuts
// @namespace  http://shouya.github.com
// @version    0.3
// @description  add keyboard shortcut for lernu!
// @match      http://*.lernu.net/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, Shou
// ==/UserScript==

jQuery(document).ready(function() {
    document.onkeypress = function(e) {
        if (e.which == 106) { /* j */
            var elem = jQuery("#enhavo").find("img[src$='pluen.gif']");
            if (elem.length != 0) {
                document.location.href=elem.parent().attr('href');
            } else if ($('input#provo').length != 0) {
                jQuery('input#provo').focus();
                jQuery('input#provo').val('');
            } else {}
        } else if (e.which == 107) { /* k */
            var elem = jQuery("#enhavo").find("img[src$='reen.gif']");
            if (elem.length != 0) {
                document.location.href=elem.parent().attr('href');
            }
        } else if (e.which == 47) { /* / */
            jQuery("#vortarokadro").contents().find("#vortariloj #modelo").val('');
            jQuery("#vortarokadro").contents().find("#vortariloj #modelo").focus();
        } else {}
        
    };
});
