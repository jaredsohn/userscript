// ==UserScript==
// @name           Javascript
// @namespace   
// @author         IanRos
// @include        *
// ==/UserScript==

(function() {
    var stylesheets, i, all, element;

    // this disables all externally linked stylesheets
    stylesheets = document.styleSheets;
    for (i = 0; i < stylesheets.length; i += 1) {
        stylesheets[i].disabled = true;
    }

    all = document.getElementsByTagName('*');
    for (i = 0; i < all.length; i += 1) {
        element = all[i];
        if (element.nodeName == 'STYLE') {
            // this removes <style> elements defined in the page <head>
            element.parentNode.removeChild(element);
        } else {
            // this removes per-element styles and a variety of deprecated attributes
            element.setAttribute('style', '');
            element.setAttribute('size', '');
            element.setAttribute('face', '');
            element.setAttribute('color', '');
            element.setAttribute('bgcolor', '');
            element.setAttribute('background', 'black');
        }
    }
})();