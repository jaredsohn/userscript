// ==UserScript==
// @name           Drupal Localize HU
// @namespace      Drupal
// @description    Contact extension for the Hungarian Localization Team
// @include        http://*localize.drupal.org/*
// @resource       icon_mail http://jslibs.googlecode.com/svn/wiki/mail.png
// ==/UserScript==


var $ = jQuery = unsafeWindow.jQuery;

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