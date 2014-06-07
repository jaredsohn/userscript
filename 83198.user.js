// ==UserScript==
// @name           ButtonsOnSide
// @namespace      komadori
// @include        http://www.flickr.com/photos/*/*
// @exclude		   *flickr.com/photos/*/alltags*
// @exclude		   *flickr.com/photos/*/organize*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
}
addGlobalStyle('div#sidebar { margin-top: 0px !important; }');
addGlobalStyle('div#photo-story { margin-bottom: 60px !important; margin-top: 35px !important; }');
// margin-bottom 60px to make space for more user links buttons. Can be reduced to 5px if that is not used.
addGlobalStyle('ul#nav-bar { width:100% !important; padding-top: 3px !important; padding-bottom: 0px !important; text-align: left !important; }');
addGlobalStyle('ul#button-bar { width:100% !important; padding-bottom: 3px !important; text-align: left !important; }');

document.getElementById('sidebar').insertBefore(document.getElementById('nav'),document.getElementById('photo-story'));
document.getElementById('sidebar').insertBefore(document.getElementById('_more_user_links_photoNavInside'),document.getElementById('sidebar-contexts'));
