// ==UserScript==
// @name           gwnotepad
// @namespace      ganjawars.ru
// @author         Снайпер Конторы http://www.ganjawars.ru/info.php?id=384647
// @description    блокнот, с функцией хранения данных в локальном хранилище, для пользователей GanjaWars
// @include        http://www.ganjawars.ru/me/*
// @include        http://www.ganjawars.ru/forum.php*
// @include        http://www.ganjawars.ru/map.php*
// @include        http://www.ganjawars.ru/warlist.php*
// @include        http://www.ganjawars.ru/wargroup.php*
// @include        http://www.ganjawars.ru/ratings.php*
// @include        http://www.ganjawars.ru/roulette.php*
// @include        http://www.ganjawars.ru/sites.php*
// @include        http://www.ganjawars.ru/realty.php*
// @include        http://www.ganjawars.ru/object.php*
// @include        http://www.ganjawars.ru/help/*
// @include        http://www.ganjawars.ru/news.php*
// @include        http://www.ganjawars.ru/messages.php*
// @include        http://www.ganjawars.ru/info.php*


// ==/UserScript==
(function() {
    var root    = (typeof unsafeWindow != 'undefined' ? unsafeWindow : window);
    var doc     = root.document;
    var table   = doc.getElementsByTagName('table')[3];
    var trow    = doc.getElementsByClassName('begunok')[0] ? doc.getElementsByClassName('begunok')[0] :  table.getElementsByTagName('div')[0];
    var userId  = getCookie('au');
    var ntpName = 'gwnotepad' + userId;

    trow.appendChild(document.createTextNode(' | '));

    var setElement = doc.createElement('a');
    setElement.setAttribute('style','color:blue;text-decoration:none; font-weight:bold');
    setElement.innerHTML = 'Блокнот';
    setElement.setAttribute('href','#');
    setElement.onclick = function(){
        el = doc.getElementById('npid');
        if(el){
            el.parentNode.removeChild(el);
        } else {
            popupWin.crWindow();
        }
        return false;
    }
    trow.appendChild(setElement);

    var area = doc.createElement('textarea');
    area.setAttribute('id','gwnotepad');
    area.setAttribute('style','width:380px; height: 380px; text-align: left');
    area.innerHTML = localStorage.getItem(ntpName);

    var close = doc.createElement('button');
    close.innerHTML = 'закрыть';
    close.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    }

    var save = doc.createElement('button');
    save.innerHTML = 'сохранить';
    save.onclick = function(){
        if(typeof(window.localStorage) == 'undefined' ) {
           alert('Ваш браузер не поддерживает localStorage()');
           return false;
        }
        try {
            localStorage[ntpName] = area.value;
        }
        catch (e) {
         if (e == QUOTA_EXCEEDED_ERR) {
            alert('Кончилось место'); //данные не сохранены, так как кончилось доступное место
         }
        }
    }

    var popupWin = {
            width: 640,
            height: 480,
            bg_colorBack: '#808080',
            crWindow: function(){
                var winElem = document.createElement('div');
                winElem.id  = "npid";
                winElem.style.backgroundColor = '#D0EED0';
                winElem.style.border = '1px solid #003300';
                winElem.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
                winElem.style.textAlign = 'center';
                winElem.style.width = '400px';
                winElem.style.height = '400px';
                winElem.style.padding = "10px";
                winElem.style.position = 'absolute';
                winElem.style.top = '50%';
                winElem.style.left = '50%';
                winElem.style.marginLeft = '-200px';
                winElem.style.marginTop  = '-300px';
                winElem.style.opacity = '0.95';
                winElem.appendChild(area);
                winElem.appendChild(close);
                winElem.appendChild(save);
                document.body.appendChild(winElem);
            }
    }

    function getCookie(name) {
    	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

})();