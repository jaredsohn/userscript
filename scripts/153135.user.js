// ==UserScript==
// @name            Kittens in powerschool
// @author          Bryce Guinta
// @namespace       azrathud.com
// @description     Adds kittens to powerschool
// @license         Creative Commons Attribution License
// @version             0.1
// @include         *.powerschool.com/guardian/*
// @released        2012-11-26
// @updated         2012-11-26
// @compatible      Greasemonkey
// ==/UserScript==
 
/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
 
(function(){
    // Replace powerschool logo
    powerschool_branding = document.getElementById("branding-powerschool"); 
    logo = powerschool_branding.getElementsByTagName('img')[0];
    logo.src = "http://azrathud.com/data/power-cat.png";

    // Remove iframe
    iframe_app = document.getElementsByTagName('iframe')[0];
    iframe_app.parentNode.removeChild(iframe_app);

    // Replace kitten with legend
    legend = document.getElementById("legend");
    legend.innerHTML = "<center><img src=\"http://files.gamebanana.com/img/ico/sprays/kitten2_render.png\" /></center>";
})();
 
// you can completely copy this template, including
// the install description, have fun! :-)


