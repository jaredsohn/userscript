// ==UserScript==
// @name             star2number
// @namespace        http://forum.nov.ru/
// @description      Заменяет противные звезды на нормальные цифры.
// @include          http://film.natm.ru/*
// @version          1.0
// @author           HeyMeXa
// ==/UserScript==

(function(){

// цвет нашего рейтинга
var COLOR = '#FF0000';

var root = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
if (root.location.href.indexOf('http://film.natm.ru/') == -1) return;

function getDivs() {
    var retval = [];
    
    var div = root.document.getElementsByTagName('div');
    for (var i = 0, l = div.length; i < l; i++) {
        if (div[i].className == 'rating-bar-small') {
            retval.push(div[i]);
        }
    }
    
    return retval;
};

var divs = getDivs();
for (var i = 0, l = divs.length; i < l; i++) {
    try {
        // рейтинг
        var rating = /([\d\.]+)%/.exec(divs[i].firstChild.style.width)[1];
        rating = Math.floor(rating * 10) / 100;
        
        // удаляем звезды
        divs[i].removeChild(divs[i].firstChild);
        with(divs[i].style) {
            background = 'none';
            textAlign = 'center';
        }
        
        // рейтинг в цифрах
        divs[i].innerHTML = '<span style="display: inline">рейтинг:</span> <span style="display: inline;color: '+ COLOR +'; font-size: 12px"">'+ rating +'</span>';
    } catch (e) {};
}

})();