// ==UserScript==
// @name        gwIgnoreUserMsg
// @namespace   ganjawars.ru
// @description уруру
// @include     http://www.ganjawars.ru/messages.php*
// @include      http://www.ganjawars.ru/threads.php?fid*
// @version     1
// ==/UserScript==
(function() {
    if(typeof(window.localStorage) == 'undefined' ) {
        alert('Ваш браузер не поддерживает localStorage(), удалите скрипт gwIgnoreUserMsg');
        return false;
    }

    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
    var doc = root.document;
    var sURL = window.document.URL.toString();
    var userId  = getCookie('au');

    var ntpName = 'gwforumblacklist' + userId;

    var blackList = localStorage.getItem(ntpName) ? JSON.parse(localStorage.getItem(ntpName)) : [];

    function in_array(arr, key){
        lt = arr.length
        for(j = 0; j < lt; ++j){
            if(arr[j] == key){
                return true;
            }

        }
        return false;
    }


    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    // удаляем сообщения в теме
    if(sURL.indexOf('messages.php?fid') > 0){
        var tableMsg   = doc.getElementsByClassName('begunok')[0] ? doc.getElementsByTagName('table')[3] :  doc.getElementsByTagName('table')[8];
        if(blackList.length > 0){
            divEl = doc.createElement('div');
            divEl.innerHTML = 'ЧС: ' + blackList;
            divEl.setAttribute('style','float:right;font-size:8pt;color:#C6DDBB');
            clearEl = doc.createElement('span');
            clearEl.setAttribute('style', 'display:inline-block; margin-left:20px; background:#E9F6E6; color:#C6DDBB;cursor:pointer; padding:2px 5px');
            clearEl.innerHTML = 'очистить';
            clearEl.onclick = function(){
                localStorage.removeItem(ntpName);
                location.reload(true);
            }
            divEl.appendChild(clearEl);
            var nextEl = tableMsg.nextElementSibling.nextElementSibling.nextElementSibling;
            nextEl.insertBefore(divEl, nextEl.childNodes[0]);
        }



//        nextEl.innerHTML = blackList;
        var l = tableMsg.rows.length;
        for(i = 0; i <= l; i++){
            if(i > 0){
                tr = tableMsg.rows[i];
                td = tr.childNodes[0];
                au = td.getElementsByTagName('a').length == 1 ? td.getElementsByTagName('a')[0] : td.getElementsByTagName('a')[1];
                td2 = tr.childNodes[1];
                td2 = td2.childNodes[1];
                td2 = td2.rows[0];
                td2 = td2.childNodes[5];
                if(in_array(blackList, au.innerHTML)){
                    tr.setAttribute('style','display:none');
                } else {
                    aEl = doc.createElement('a');
                    aEl.setAttribute('href','#');
                    aEl.setAttribute('title',au.innerHTML);
                    aEl.setAttribute('style','text-decoration:none;font-size:8pt;color:#99CC99;');
//                    aEl.setAttribute('style','display:block; color:#000; overflow:hidden;float:left; width:10px; height:10px;background:#000; margin-top:-30px;font-size:8px; text-decoration:none');
                    aEl.onclick = function() {
                        if(in_array(blackList, this.innerHTML)){
                            alert('уже есть');
                            return false;
                        }
                        blackList.push(this.getAttribute('title'));
                        localStorage.setItem(ntpName,JSON.stringify(blackList));
                        location.reload(true);
                        return false;
                    }
                    td2.appendChild(aEl);
                    aEl.innerHTML = '[В черный список]';
                }
            }
        }

    }
    // удаляем тему с раздела
    if(sURL.indexOf('threads.php?fid') > 0){
        var tableMsg   = doc.getElementsByClassName('begunok')[0] ? doc.getElementsByTagName('table')[3] :  doc.getElementsByTagName('table')[8];
        var l = tableMsg.rows.length;
        if(blackList.length > 0){
            divEl = doc.createElement('div');
            divEl.innerHTML = 'ЧС: ' + blackList;
            divEl.setAttribute('style','float:right;font-size:8pt;color:#C6DDBB');
            clearEl = doc.createElement('span');
            clearEl.setAttribute('style', 'display:inline-block; margin-left:20px; background:#E9F6E6; color:#C6DDBB;cursor:pointer; padding:2px 5px');
            clearEl.innerHTML = 'очистить';
            clearEl.onclick = function(){
                localStorage.removeItem(ntpName);
                location.reload(true);
            }
            divEl.appendChild(clearEl);
            var nextEl = tableMsg.nextElementSibling.nextElementSibling.nextElementSibling;
            nextEl.insertBefore(divEl, nextEl.childNodes[0]);
        }
        for(var i = 0; i < l; i++){
            if(i > 0){
                var tr = tableMsg.rows[i];
                var td = tr.childNodes[4];
                var au = td.getElementsByTagName('b')[0];
                if(in_array(blackList, au.innerHTML)){
                    tr.setAttribute('style','display:none');
                }
            }
        }
    }


})();