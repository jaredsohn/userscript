// ==UserScript==
// @name           Youtube Popup
// @namespace      http://www.tlvince.com/
// @author         Tom Vincent
// @description    Redirect Youtube pages to the popup equivalent
// @include        http*://*youtube.com/watch*
// @version        0.1.0
// ==/UserScript==

redirect();

function redirect()
{
    var current = window.location.href;
    var popup = "watch_popup?v=";
   
    // Everything after the video key
    var id = current.split("v=")[1];

    // Find the first ampersand
    var amp = id.indexOf("&");

    // Extract just the id, otherwise we already have it
    if (amp != -1) {
        id = id.substring(0, amp);
    }

    // URL components
    var url = current.split("/");

    // Only redirect if we're not already on the popup page
    if (current.indexOf(popup) == -1) {
        window.location.replace(url[0] + "//" + url[2] + "/" + popup + id);
    }
}
