// ==UserScript==// @name          SR
// @description    improve SR display
// @include        http://*.admin.ch/ch/d/sr/*

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





addGlobalStyle(' #logo, #kopfPortal, #navServiceBackground,#navService, #langSwitch, #spalteKontext, #navGlobalBackground, #erweiterteFunktionen, #spalteNavigation{display:none!important}');


addGlobalStyle(' #content{width:80%!important;max-width:60%!important}');
addGlobalStyle(' #spalteContentPlus{margin-left:20%!important; width:80%!important}');

addGlobalStyle(' h1 br{display:none}');


addGlobalStyle('body{background-color:#fff;color:#707070}');


addGlobalStyle('*{font-family:sans-serif!important;line-height:1.35em!important}');

addGlobalStyle('#spalteContentPlus{color:#000;background-color:#fafafa;font-size:1.1em;color:#363636;padding-left:20px!important;padding-left:20px!important;margin-bottom:45px!important}');

addGlobalStyle('a.navLevel1div, a.navLevel1, a.navLevel1:active, a.navLevel1:hover, a.navLevel1:visited, a.navLevel2, a.navLevel2divActivePortal, a.navLevel3Active, a.navLevel1SubOpenPortal, a.navLevel2, a.navLevel2:active, a.navLevel2:hover, a.navLevel2:visited, a.navLevel3, a.navLevel3:active, a.navLevel3:hover, a.navLevel3:visited, a.navLevel4, a.navLevel4:active, a.navLevel4:hover, a.navLevel4:visited {color:#707070!important;text-decoration:none;}');

addGlobalStyle('#breadcrumb {background:none}');

addGlobalStyle('#footer, #fachkontakt {display:none}');

addGlobalStyle('#navGlobalBackground, #navServiceBackground, #logo, #kopfPortal {opacity:0.8}');

addGlobalStyle('a:link, a, a:active, td a:active, a:hover, td a:hover, a:visited {color:#104E8B;text-decoration:none;}');

addGlobalStyle('a:hover{background-color:#CAE1FF; color:#3A66A7;text-decoration:none!important;}');

addGlobalStyle('h1 {font-size:22px;margin-top:25px;}');
addGlobalStyle('h2 {font-size:18px;margin-top:20px;}');
addGlobalStyle('h3 {font-size:14px;margin-top:10px;}');