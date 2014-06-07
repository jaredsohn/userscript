// ==UserScript==
// @name           cien
// @description    cien w menu
// @include        http://lo-lubaczow.pl/*
// ==/UserScript==
(function() {
if( typeof GM_addStyle != 'function' )
function GM_addStyle(css)
{
    var style = document.createElement('style');
    style.innerHTML = css;
    style.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}
GM_addStyle('ul.menu ul {background-image:none;} ul.menu ul li {width:140px; margin:0; padding:0 4px 0 12px; background-image:url(http://lo-lubaczow.pl/data/theme/img/sub_bg2.png);} ul.menu ul > :last-child {background:url(https://dl.dropbox.com/u/23709189/sub_bg3.png) bottom; padding-bottom:5px}');
})();