// ==UserScript==
// @name           Inject Frame into Gmail Footer
// @namespace      http://userscripts.org/users/168196
// @description    Injects an iframe at the top of the footer of Gmail (the part of Gmail right below the viewer that displays your usage info).  By default this points to tracks.tra.in, but you can easily edit the script to change this.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

// User Defined Variables
var frameURL = "http://tracks.tra.in/";
var frameWidth = "100%"
var frameHeight = "550px"


// Code you shouldn't edit unless you know what you're doing
function inject_iframe_to_gmail(gm)
{
    try  //this is to get around gmonkey calling the callback-on-load function too soon
    {
        var iframe = document.createElement("iframe");
        iframe.src = frameURL;
        iframe.width = frameWidth;
        iframe.height = frameHeight;
        gm.getFooterElement().insertBefore(iframe, gm.getFooterElement().childNodes[0]);
        gm.getFooterElement().insertBefore(document.createElement("br"), gm.getFooterElement().childNodes[0]);
    }
    catch(err)
    {
        setTimeout(inject_iframe_to_gmail, 1000, gm);
    }
}

unsafeWindow.gmonkey.load('1.0', function(gm) {inject_iframe_to_gmail(gm);});
