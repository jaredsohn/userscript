// ==UserScript==
// @name           Facebook Refresher
// @namespace      http://movxxxx.com/
// @description    Facebook page refresher
// @version        1.0.1
// @homepage       http://userscripts.org/scripts/show/61176
// @include        http://www.facebook.*
// @include        http://facebook.*
// ==/UserScript==
var hover = document.createElement('div');
hover.setAttribute('style', 'width: 100px; height: 27px; z-index: 999; position: absolute; margin-top: -27px; cursor: pointer;');
hover.setAttribute('id', 'fbrefresher');
hover.setAttribute('onmouseover', 'mouseIn()');
hover.setAttribute('onmouseout', 'mouseOut()');
hover.setAttribute('onclick', 'fbrefresh()');
hover.innerHTML = '<script>function mouseIn(){ document.getElementById("fbrefresher").style.background = "url(http://movxxxx.com/images/bg_fbrefresher.png) center top no-repeat #3B5998"; }</script>';
hover.innerHTML += '<script>function mouseOut(){ document.getElementById("fbrefresher").style.background = "transparent"; }</script>';
hover.innerHTML += '<script>function fbrefresh(){ location.href="http://google.fr"; location.href="http://www.facebook.com"; }</script>';
document.getElementById('fb_menubar_logo').appendChild(hover);