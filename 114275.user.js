// ==UserScript==
// @name           jQuery and jQuery UI
// @author         Tyler "-z-" Mulligan
// @version        0.5
// @namespace      http://www.doknowevil.net
// @description    jQuery 1.6.2 and jQuery UI 1.8.4 loaded from google's CDN with redmond theme.
// @include        http://www.website.com/*
//
// @resource       jQuery               https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @resource       jQueryUI             https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js
//
// @resource       jQueryUICSS          http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/jquery-ui.css
//
// @resource       ui-bg_inset-hard_100_fcfdfd_1x100.png  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_inset-hard_100_fcfdfd_1x100.png
// @resource       ui-bg_gloss-wave_55_5c9ccc_500x100.png http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_gloss-wave_55_5c9ccc_500x100.png
// @resource       ui-bg_glass_85_dfeffc_1x400.png        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_glass_85_dfeffc_1x400.png
// @resource       ui-bg_glass_75_d0e5f5_1x400.png        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_glass_75_d0e5f5_1x400.png
// @resource       ui-bg_inset-hard_100_f5f8f9_1x100.png  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_inset-hard_100_f5f8f9_1x100.png
// @resource       ui-bg_flat_55_fbec88_40x100.png        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_flat_55_fbec88_40x100.png
// @resource       ui-bg_glass_95_fef1ec_1x400.png        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_glass_95_fef1ec_1x400.png
// @resource       ui-icons_469bdd_256x240.png            http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-icons_469bdd_256x240.png
// @resource       ui-icons_469bdd_256x240.png            http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-icons_d8e7f3_256x240.png
// @resource       ui-icons_6da8d5_256x240.png            http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-icons_6da8d5_256x240.png
// @resource       ui-icons_217bc0_256x240.png            http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-icons_217bc0_256x240.png
// @resource       ui-icons_f9bd01_256x240.png            http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-icons_f9bd01_256x240.png
// @resource       ui-icons_2e83ff_256x240.png            http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-icons_2e83ff_256x240.png
// @resource       ui-icons_cd0a0a_256x240.png            http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-icons_cd0a0a_256x240.png
// @resource       ui-bg_flat_0_aaaaaa_40x100.png         http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_flat_0_aaaaaa_40x100.png
// @resource       ui-bg_flat_0_aaaaaa_40x100.png         http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/redmond/images/ui-bg_flat_0_aaaaaa_40x100.png
 
// ==/UserScript==
 
var $;
 
// Inject jQuery into page... gross hack... for now...
(function() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var head = document.getElementsByTagName('head')[0];
 
        var script = document.createElement('script');
        script.type = 'text/javascript';
 
        var jQuery = GM_getResourceText('jQuery');
        var jQueryUI = GM_getResourceText('jQueryUI');
 
        script.innerHTML = jQuery + jQueryUI;
        head.appendChild(script);
 
    }
    GM_wait();
})();
 
// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        addUIStyles();
        letsJQuery();
    }
}
 
function addUIStyles() {
    var head = document.getElementsByTagName('head')[0];
    var resources = {
        'ui-bg_inset-hard_100_fcfdfd_1x100.png': GM_getResourceURL('ui-bg_inset-hard_100_fcfdfd_1x100.png'),
        'ui-bg_gloss-wave_55_5c9ccc_500x100.png': GM_getResourceURL('ui-bg_gloss-wave_55_5c9ccc_500x100.png'),
        'ui-bg_glass_85_dfeffc_1x400.png': GM_getResourceURL('ui-bg_glass_85_dfeffc_1x400.png'),
        'ui-bg_glass_75_d0e5f5_1x400.png': GM_getResourceURL('ui-bg_glass_75_d0e5f5_1x400.png'),
        'ui-bg_inset-hard_100_f5f8f9_1x100.png': GM_getResourceURL('ui-bg_inset-hard_100_f5f8f9_1x100.png'),
        'ui-bg_flat_55_fbec88_40x100.png': GM_getResourceURL('ui-bg_flat_55_fbec88_40x100.png'),
        'ui-bg_glass_95_fef1ec_1x400.png': GM_getResourceURL('ui-bg_glass_95_fef1ec_1x400.png'),
        'ui-icons_469bdd_256x240.png': GM_getResourceURL('ui-icons_469bdd_256x240.png'),
        'ui-icons_d8e7f3_256x240.png': GM_getResourceURL('ui-icons_d8e7f3_256x240.png'),
        'ui-icons_6da8d5_256x240.png': GM_getResourceURL('ui-icons_6da8d5_256x240.png'),
        'ui-icons_217bc0_256x240.png': GM_getResourceURL('ui-icons_217bc0_256x240.png'),
        'ui-icons_f9bd01_256x240.png': GM_getResourceURL('ui-icons_f9bd01_256x240.png'),
        'ui-icons_2e83ff_256x240.png': GM_getResourceURL('ui-icons_2e83ff_256x240.png'),
        'ui-icons_cd0a0a_256x240.png': GM_getResourceURL('ui-icons_cd0a0a_256x240.png'),
        'ui-bg_flat_0_aaaaaa_40x100.png': GM_getResourceURL('ui-bg_flat_0_aaaaaa_40x100.png'),
        'ui-bg_flat_0_aaaaaa_40x100.png': GM_getResourceURL('ui-bg_flat_0_aaaaaa_40x100.png')
    };
 
    var style = document.createElement('style');
    style.type = 'text/css';
 
    var css = GM_getResourceText ('jQueryUICSS');
    $.each(resources, function(resourceName, resourceUrl) {
        console.log(resourceName + ': ' + resourceUrl);
        css = css.replace( 'images/' + resourceName, resourceUrl);
    });
 
    style.innerHTML = css;
    head.appendChild(style);
}
 
// All your GM code must be inside this function
function letsJQuery() {
    //alert($); // check if the dollar (jquery) function works
    //alert($().jquery); // check jQuery version
    $("
<div id='example' class='flora' title='This is my title'>I'm in a dialog!</div>
 
").dialog({
        buttons: {
            "Ok": function() {
                alert("Ok");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });
}