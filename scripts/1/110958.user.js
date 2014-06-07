// ==UserScript==
// @name           Google Image Direct Linker
// @namespace      http://griffeltavla.wordpress.com/
// @description    Jumps directly to the full sized image from the Google image search results, when opening the image in a new tab (e.g. middle mouse button).
// @version        1.1.0
// @author         tinjon@gmail.com
// @include        http://*.google.*/imgres?*
// @include        https://*.google.*/imgres?*
// ==/UserScript==

// Reduce flicker by hiding the google landing page, containing the preview-image.
window.document.body.setAttribute("style","display:none;");

var a = document.querySelector('#irc_fsl');
if(a) window.location = a.href;
