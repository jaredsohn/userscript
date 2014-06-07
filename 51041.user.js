//
// 08.06.2009
//

// ==UserScript==
// @name          Vkontakte Ad Remove
// @namespace     ad_remove
// @description   Removes Ad From Vkontakte.ru
// @include       *vkontakte.ru*

// ==/UserScript==

var elCol = document.getElementsByTagName('div');
for (var i = 0; i < elCol.length; i++) {
    if (elCol[i].id.indexOf('banner') > -1) {
        elCol[i].parentNode.removeChild(elCol[i]);
    }
}

var styles = document.createElement('style');
styles.innerHTML = '.ad_box{display:none !important;}';
document.getElementsByTagName('head')[0].appendChild(styles);

var elCol = document.getElementsByTagName('a');
for (var i = 0; i < elCol.length; i++) {
    if (elCol[i].href.indexOf('page=target') > -1) {
        elCol[i].parentNode.removeChild(elCol[i]);
    }
}