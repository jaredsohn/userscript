//
// 07.05.2009
//

// ==UserScript==
// @name          Vkontakte Wap Photo Anchor [beta]
// @namespace     http://userscripts.org/users/chez
// @description   Additional script For "Vkontakte Hidden Photo View" script
// @include       *pda.vkontakte.ru/taggedphotos*

// ==/UserScript==


var tmp = window.location.href.split('#');
var tmp = tmp[1].split('_');
var owner_id = tmp[0];
var user_id = tmp[1];
var photo_id = tmp[2];

var elCol = document.getElementsByTagName('a');
var count = elCol.length;
var match = 'http://pda.vkontakte.ru/photo'+ owner_id +'_'+ photo_id +'?uid='+ user_id;
for (var i = 0; i < count; i++) {
    if (elCol[i].href == match || elCol[i].href == match + '&self=1') {
        var img = elCol[i].getElementsByTagName('img')[0].src;
        
        var body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = '#dddddd';
        body.innerHTML = 'Loading...';
        
        window.location.href = img;
    }
}