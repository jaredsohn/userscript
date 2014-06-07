// ==UserScript==
// @name        forumGW
// @namespace   gw
// @description teet
// @include     http://www.ganjawars.ru/forum.php*
// @include     http://www.ganjawars.ru/threads.php*
// @include     http://www.ganjawars.ru/messages.php*
// @version     1
// ==/UserScript==
(function () {

    if (typeof(window.localStorage) == 'undefined') {
        alert('Ваш браузер не поддерживает localStorage(), удалите скрипт');
        return false;
    }

    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    var root = (typeof unsafeWindow != 'undefined' ? unsafeWindow : window);
    var doc = root.document;
    var act = doc.URL.split('/')[3].split('.')[0];

    var methods = {
        prependChild: function (parent, node) {
            parent.firstChild ? parent.insertBefore(node, parent.firstChild) : parent.appendChild(node);
        },
        getCookie: function (name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined
        },
        inArray: function (arr, key) {
            lt = arr.length
            for (j = 0; j < lt; ++j) {
                if (arr[j] == key) {
                    return true;
                }

            }
            return false;
        },
        removeItemBL: function (name) {
            blackList.remove(name);
            localStorage.setItem(keyBL, JSON.stringify(blackList));
        }

    }


    // localStorage

    var uid = methods.getCookie('au');
    var keyLS = 'GwForumSettingsId_' + uid;
    var keyBL = 'GwForumBlackListId_' + uid;
    var settings = localStorage.getItem(keyLS) ? JSON.parse(localStorage.getItem(keyLS)) : [];
    var blackList = localStorage.getItem(keyBL) ? JSON.parse(localStorage.getItem(keyBL)) : [];


    // start CSS
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.-gm-seetings-panel { line-height: 1.5; height:40PX; text-align:right; }'
        + '.-gm-seetings-panel a { text-decoration:none; display:inline-block; margin:0 10px 0 0;  padding:5px 10px;background:#D0EED0; border-radius:3px}'
        + '#popup-overlay {display: block;position: fixed;left: 0; top: 0; width: 100%; height: 100%;background: rgba(0,0,0,.7); text-align: center}'
        + '#popup-overlay:after {display: inline-block;height: 100%;width: 0;vertical-align: middle;content: ""}'
        + '#popup-window {display: inline-block;position: relative;width:320px;text-align:left;background: #E0FFE0;vertical-align: middle; border-radius:3px;overflow:hidden}'
        + '.-popupWtitle {text-align:center;background: #D0EED0; padding:5px 20px; font:1.45em trebushet }'
        + '#popup-window ul, #popup-window li {list-style:none;margin:0;padding:0}'
        + '#popup-window span:first-of-type {margin-top:10px;}'
        + '#popup-window span:last-of-type {margin-bottom:10px;}'
        + '#popup-window span { border-radius:3px; margin:0 10px 1px; background:#E8F8E8; padding:5px 10px; display:block}'
        + '#popup-window .close { text-decoration:none; float:right}'
        + '.-avatar {clear:both; display:block; margin:20px; max-width:75px;}'
        + '.sm-l {text-decoration:none;font-size:8pt;color:#99CC99;}';

    doc.getElementsByTagName('head')[0].appendChild(style);
    // end CSS

    // start settings panel

    blackListBtn = doc.createElement('a');
    blackListBtn.setAttribute('href', '#');
    blackListBtn.innerHTML = '<img src="http://images.ganjawars.ru/i/home/iski.gif" alt=""> Черный список';

    // black list popup
    blackListBtn.onclick = function () {

        popupOverlay = doc.querySelector('#popup-overlay');
        if (popupOverlay) {
            popupOverlay.parentNode.removeChild(popupOverlay);
            return false;
        }


        popupOverlay = doc.createElement('div');
        popupOverlay.id = 'popup-overlay';
        popupOverlay.onclick = function (event) {
            e = event || window.event
            if (e.target == this) {
                this.parentNode.removeChild(this);
//                location.reload(true);
            }
        }

        popupW = doc.createElement('div');
        popupW.id = 'popup-window';

        popupOverlay.appendChild(popupW);
        doc.querySelector('body').appendChild(popupOverlay);
        popupW.innerHTML += '<div class="-popupWtitle">Черный список</div>'
        blackListL = blackList.length;

        if (blackListL) {
            for (j = 0; j < blackList.length; j++) {

                listSpan = doc.createElement('span');

                aUser = doc.createElement('a');
                aUser.href = 'http://www.ganjawars.ru/search.php?key=' + blackList[j];
                aUser.innerHTML = blackList[j];


                aClose = doc.createElement('a');
                aClose.href = "#";
                aClose.innerHTML = '×';
                aClose.className = 'close';

                aClose.onclick = function (name) {
                    return function () {
                        this.parentNode.parentNode.removeChild(this.parentNode);
                        methods.removeItemBL(name);
                    };
                }(blackList[j]);

                listSpan.appendChild(aUser);
                listSpan.appendChild(aClose);
                popupW.appendChild(listSpan);


            }
        } else {
            popupW.innerHTML += '<p style="text-align: center">Пусто</p>';
        }


        return false;
    }


    settingsBtn = doc.createElement('a');
    settingsBtn.setAttribute('href', '#');
    settingsBtn.innerHTML = '<img src="http://images.ganjawars.ru/i/home/properties.gif" alt=""> Настройки';

    // settings popup

    settingsBtn.onclick = function () {

        popupOverlay = doc.querySelector('#popup-overlay');
        if (popupOverlay) {
            popupOverlay.parentNode.removeChild(popupOverlay);
            return false;
        }


        popupOverlay = doc.createElement('div');
        popupOverlay.id = 'popup-overlay';
        popupOverlay.onclick = function (event) {
            e = event || window.event
            if (e.target == this) {
                this.parentNode.removeChild(this);
//                location.reload(true);
            }
        }

        popupW = doc.createElement('div');
        popupW.id = 'popup-window';

        popupOverlay.appendChild(popupW);
        doc.querySelector('body').appendChild(popupOverlay);
        popupW.innerHTML += '<div class="-popupWtitle">Настройки</div>'

        var options = {
            sindZ   : 'Знак синда на синдикатных форумах',
            black   : 'Включить черный список',
            avatars : 'Показывать аватары'
        };

        for(var key in options){
            if (options.hasOwnProperty(key)) {
                listSpan = doc.createElement('span');

                sLabel = doc.createElement('label');
                sLabel.innerHTML = options[key];

                sCheck = doc.createElement('input');
                sCheck.type = 'checkbox';
                sCheck.id = 'options-'+key;
                sCheck.name = 'options-'+key;
                sCheck.value = 1;
                methods.prependChild(sLabel, sCheck);

                listSpan.appendChild(sLabel);
                popupW.appendChild(listSpan);
            }
        }






        return false;
    }

    settingPanelCol = doc.createElement('td');
    settingPanelCol.setAttribute('colspan', 3);
    settingPanelCol.setAttribute('class', '-gm-seetings-panel');
    settingPanelCol.appendChild(blackListBtn);
    settingPanelCol.appendChild(settingsBtn);

    var settingPanelRow = doc.createElement('tr');
    settingPanelRow.appendChild(settingPanelCol);

    // end settings panel


    switch (act) {

        case 'forum':
            // вытаскиваем иконки для синдикатных форумов
            if (decodeURIComponent(doc.location.search.substr(1)).split('&') == '') { // проверяем, что мы в корне
                rows = doc.querySelectorAll('body.txt > div.gw-container > table > tbody > tr > td > table> tbody > tr');
                rowsI = rows.length;
                i = 0;
                methods.prependChild(rows[0].parentNode, settingPanelRow);
                for (i; i < rowsI; i++) {
                    if (i > 5) {
                        cols = rows[i].querySelectorAll('td');
                        forumLink = cols[0].querySelector('a');
                        forumDesc = cols[0].querySelector('span');
                        forumDescPart = forumDesc.innerHTML.split('<br>');
                        if (forumDescPart[1].indexOf('Форум синдиката') == 0) {
                            znak = new Image();
                            znak.onerror = (function (i) {
                                return function () {
                                    this.src = 'http://images.ganjawars.ru/i/t.gif';
                                }
                            })(i);
                            znak.src = 'http://images.ganjawars.ru/img/synds/' + forumDescPart[1].split('#')[1] + '.gif';
                            znak.style = 'float:left; border:1px solid #e0eee0; border-width:15px 14px 14px 15px; margin-right:5px;width:20px;height:14px';
                            methods.prependChild(forumLink, znak);
                        }
                    }
                }
            } else {
                rows = doc.querySelector('body.txt > div.gw-container > table > tbody > tr > td > table> tbody > tr');
                methods.prependChild(rows.parentNode, settingPanelRow);


            }
            break;

        case 'threads':
            break;


        case 'messages':
            rows = doc.querySelectorAll('body.txt > div.gw-container > table:nth-of-type(2) > tbody > tr > td > table:nth-of-type(2)> tbody > tr');
            settingPanelCol.setAttribute('colspan', 2);
            methods.prependChild(rows[0].parentNode, settingPanelRow);
            rowsI = rows.length;
            i = 0;
            for (i; i < rowsI; i++) {
                if (i > 0) {
                    cols = rows[i].querySelectorAll('td');
                    au = cols[0].querySelectorAll('a');
                    au = au.length == 1 ? au[0] : au[1];
                    aid = au.href.replace('http://www.ganjawars.ru/info.php?id=','');

                    var pathA = '';
                    if(aid.length == 4){
                        pathA = 'http://images.ganjawars.ru/img/avatars/0/0/'+aid.substring(0,2)+'/'+aid+'.jpg';
                    } else if(aid.length == 5){
                        pathA = 'http://images.ganjawars.ru/img/avatars/0/'+aid.substring(0,1)+'/'+aid.substring(1,3)+'/'+aid+'.jpg'
                    } else if(aid.length == 6){
                        pathA = 'http://images.ganjawars.ru/img/avatars/0/'+aid.substring(0,2)+'/'+aid.substring(2,4)+'/'+aid+'.jpg'
                    } else if(aid.length == 7){
                        pathA = 'http://images.ganjawars.ru/img/avatars/'+aid.substring(0,1)+'/'+aid.substring(1,3)+'/'+aid.substring(3,5)+'/'+aid+'.jpg'
                    }

                    znak = new Image();
                    znak.onerror = (function (i) {
                        return function () {
                            this.src = 'http://images.ganjawars.ru/i/t.gif';
                        }
                    })(i);
                    znak.src = pathA;
                    znak.className = '-avatar';
                    au.parentNode.appendChild(znak);

                    if (methods.inArray(blackList, au.innerHTML)) {
                        rows[i].parentNode.removeChild(rows[i]);
                    } else {
                        al = doc.createElement('a');
                        al.innerHTML = '[В черный список]';
                        al.setAttribute('href', '#');
                        al.setAttribute('class', 'sm-l');

                        al.onclick = function (name) {
                            return function () {
                                if (methods.inArray(blackList, name)) {
                                    alert(name + ' уже есть в черном списке');
                                    return false;
                                }
                                blackList.push(name);
                                localStorage.setItem(keyBL, JSON.stringify(blackList));
                                location.reload(true);
                                return false;
                            };
                        }(au.innerHTML);
                        cols[1].querySelector('table').querySelectorAll('td')[3].appendChild(al);
                    }


                }
            }
            break;


    }

})();