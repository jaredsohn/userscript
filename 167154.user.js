// ==UserScript==
// @name        uWaterloo Learn Resize
// @namespace   tempacc
// @description Widen the webpage
// @include     https://learn.uwaterloo.ca/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       none
// @version     1.1.2
// ==/UserScript==

Resize();

// Resize
function Resize()
{
    $(".d2l-max-width").removeClass('d2l-max-width');
    $(".d2l-background-global").removeClass('d2l-background-global');
    $(".d2l-background-left").removeClass('d2l-background-left');
    $(".d2l-background-right").removeClass('d2l-background-right');
    $('.d2l-homepage > .d2l-box-layout > .d2l-box:eq(1) > .d2l-box-layout > div').eq(0).css('width', '15%');
    $('.d2l-homepage > .d2l-box-layout > .d2l-box:eq(1) > .d2l-box-layout > div').eq(1).css('width', '65%');
    $('.d2l-homepage > .d2l-box-layout > .d2l-box:eq(1) > .d2l-box-layout > div').eq(2).css('width', '20%');
}

// Replaces view links to direct downloads
// Let the browser display PDFs
function ReplaceFileLinksToDirectLink()
{
    $("a.d2l-link.d2l-outline.d2l-link-main").each(function() {
        var title = this.getAttribute("title");
        var href = this.getAttribute("href");
        var regexp = /\/d2l\/le\/content\/(\d*)\/viewContent\/(\d*)\/View/;
        var excluderegexp = /(Web Page)/;
        var match = regexp.exec(href);
        var excludematch = excluderegexp.exec(title);
          
        if (match != null && excludematch == null)
        {           
            this.setAttribute("href", "/d2l/le/content/"+ match[1] +"/topics/files/download/"+ match[2] +"/DirectFileTopicDownload");
        }
    });
}

// Refire GreaseMonkey Script after AJAX call
// http://stackoverflow.com/questions/3042264/its-there-a-way-to-reload-a-greasemonkey-script

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;
window.addEventListener ("load", MainAction, false);

function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;

        /*--- Notes:
                (1) If the ajax loads to a specific node, add this
                    listener to that, instead of the whole body.
                (2) iFrames may require different handling.
        */
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    } 
    ReplaceFileLinksToDirectLink();
}
function HandleDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 200);
}