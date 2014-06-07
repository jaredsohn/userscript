// ==UserScript==
// @name        fb ad go away
// @namespace   fb_ad_go_away
// @include     https://www.facebook.com/
// @include     https://www.facebook.com
// @version     1
// ==/UserScript==
function kickAss() {
    var jsonp_container = document.getElementsByTagName('div');
    for (var i = 0; i < jsonp_container.length; i++) {
        if (jsonp_container[i].id.indexOf('u_') === 0 && jsonp_container[i].getAttribute('data-ft') && jsonp_container[i].getAttribute('data-ft').length > 500) {
            jsonp_container[i].style.display = 'none';
        }
    }
}
document.addEventListener("DOMNodeInserted", kickAss, true);