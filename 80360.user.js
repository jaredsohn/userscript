// ==UserScript==
// @name           localize.drupal.org Suggestion Tool
// @namespace      Drupal
// @description    Kiterjesztések a localize.drupal.org oldalhoz
// @include        http://*localize.drupal.org/*
// @resource       icon_mail http://jslibs.googlecode.com/svn/wiki/mail.png
// ==/UserScript==


/* opera window hack */
if (typeof unsafeWindow == "undefined") { unsafeWindow = window; }
if (typeof jQuery == "undefined") { var $ = unsafeWindow.jQuery, jQuery = unsafeWindow.jQuery; }


/* opera css hack */
if (typeof GM_addStyle == "undefined") {
    GM_addStyle = function(css) {
        $('head').append('<style type="text/css">'+ css +'</style>');
    };    
}

GM_addStyle("@import url('http://ldo.mindworks.hu/css/ldo.css');");
    

$(document).ready(function(e) {

    $.getScript("http://ldo.mindworks.hu/js/ldo.js", function(){
    
        unsafeWindow.$ldo.init('all');
        
       /**************************************************************************
        *  Tömbként átadva szelektíven is megadhatóak a használni kívánt pluginek.
        *  pl.: $ldo.init(['contact_plugin', 'plugin_nev1', 'plugin_nev2']);
        *  az $ldo.init('all'); string mindet aktiválja.
        *  Sablonok hozzáadása és egyéb info:
        *  http://ldo.mindworks.hu
        **************************************************************************/
        
    });
});