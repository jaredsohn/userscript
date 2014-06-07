// ==UserScript==
// @name Web Monitor
// @description This will boost your productivity by monitoring certain sites and blocking you after a certain period of time.
// @downloadURL https://www.paulchabot.ca/WebMonitor.tamper.js
// @namespace http://www.paulchabot.ca/gmscript
// @version 1.1
// @include http://imgur.com/*
// @include http://www.reddit.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @resource    jqUI_CSS  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css
// @resource    IconSet1  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/images/ui-icons_222222_256x240.png
// @resource    IconSet2  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/images/ui-icons_454545_256x240.png
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// ==/UserScript==
/////////////////////////////////////////////////////////////////////////////
//Just add includes to sites you want this to work on..
/////////////////////////////////////////////////////////////////////////////


function ScrollToTop(el) {
    $('html, body').animate({ scrollTop: $(el).offset().top - 50 }, 'slow');
}



function myTimer()
{
//--- Add our custom dialog using jQuery. Note the multi-line string syntax.
$("body").append (
    '<div id="gmOverlayDialog">                                                     \
     You have been on this website for too long..<br><br>						    \
     Stop wasting time! But hey, im a sign, not a cop.<br><br>                      \
     Click the x, or press the Escape key to close.                                 \
     </div>                                                                         \
    '
);

//--- Activate the dialog.
$("#gmOverlayDialog").dialog ( {
    modal:      true,
    title:      "STOP WASTING TIME",
    zIndex:     83666   //-- This number doesn't need to get any higher.
} );


/**********************************************************************************
    EVERYTHING BELOW HERE IS JUST WINDOW DRESSING (pun intended).
**********************************************************************************/

/*--- Process the jQuery-UI, base CSS, to work with Greasemonkey (we are not on a server)
    and then load the CSS.

    *** Kill the useless BG images:
        url(images/ui-bg_flat_0_aaaaaa_40x100.png)
        url(images/ui-bg_flat_75_ffffff_40x100.png)
        url(images/ui-bg_glass_55_fbf9ee_1x400.png)
        url(images/ui-bg_glass_65_ffffff_1x400.png)
        url(images/ui-bg_glass_75_dadada_1x400.png)
        url(images/ui-bg_glass_75_e6e6e6_1x400.png)
        url(images/ui-bg_glass_95_fef1ec_1x400.png)
        url(images/ui-bg_highlight-soft_75_cccccc_1x100.png)

    *** Rewrite the icon images, that we use, to our local resources:
        url(images/ui-icons_222222_256x240.png)
        becomes
        url("' + GM_getResourceURL ("IconSet1") + '")
        etc.
*/
var iconSet1    = GM_getResourceURL ("IconSet1");
var iconSet2    = GM_getResourceURL ("IconSet2");
var jqUI_CssSrc = GM_getResourceText ("jqUI_CSS");
jqUI_CssSrc     = jqUI_CssSrc.replace (/url\(images\/ui\-bg_.*00\.png\)/g, "");
jqUI_CssSrc     = jqUI_CssSrc.replace (/images\/ui-icons_222222_256x240\.png/g, iconSet1);
jqUI_CssSrc     = jqUI_CssSrc.replace (/images\/ui-icons_454545_256x240\.png/g, iconSet2);

GM_addStyle (jqUI_CssSrc);


//--- Add some custom style tweaks.
GM_addStyle ( (<><![CDATA[
    div.ui-widget-overlay {
        background: red;
        opacity:    0.6;
    }
]]></>).toString () );

               //scroll to top, weird things happen when the modal comes on... this was an attempt to fix that.
               /*
var focusElement = $("body");
    $(focusElement).focus();
    ScrollToTop(focusElement);
    */
}


setTimeout(function(){myTimer(); },5000);