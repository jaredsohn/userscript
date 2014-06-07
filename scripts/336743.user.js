// ==UserScript==
// @name        Secure MyWay Email
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @include     https://webmail.myway.com/cgi-bin/login_sso_myway.cgi
// @include     http://registration.myway.com/btprimary_login.jsp*
// @include     http://registration.myway.com/login.jsp*
// @include     http://registration.myway.com/logout.jsp*
// @include     http://webmail.myway.com/*/gds/index_rich.php*
// @version     1
// @grant       none
// ==/UserScript==
if(window.location.protocol == 'https:') {
    var x = document.body.onload.toString().replace('http://','https://');
    eval(x.substring(x.indexOf('JavaScript:')+11,x.lastIndexOf('}')));
} else {
    window.location='https://'+window.location.host+window.location.pathname+window.location.search;
}