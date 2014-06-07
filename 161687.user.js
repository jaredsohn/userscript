// ==UserScript==
// @name       TRV
// @namespace  http://sergeich0.lark.ru
// @version    0.1.4
// @description  TeedaResourcesViewer - выводит ваши ресурсы и камни в строку с ником персонажа
// @match      *teeda*
// @copyright  Sergeich0
// ==/UserScript==

(function (window, undefined) {  
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    if (document.images[0].src!=location.protocol + '//' + location.host + '/img/icons/p4.png') {
        return;
    }
    
    if (window == top) {
        return;
    }
    
    if (~window.location.href.indexOf('teeda')) {
        
        
        var iframeRes = document.createElement('iframe');
        iframeRes.src = '/user'+'?hash'+location.search;
        iframeRes.name = "iframeRes";
        iframeRes.id = "iframeRes";
        iframeRes.width = "0";
        iframeRes.height = "0";
        iframeRes.frameBorder = "no";
        if (location.search.indexOf('?hash') == -1) {
            document.documentElement.appendChild(iframeRes);
        } 
        var i,j;
        top1:
        for (i = 0; i < document.getElementsByTagName('p').length; i++) {
            if (~document.getElementsByTagName('p')[i].innerHTML.indexOf('/img/icons/e9.png')) {
                break top1;
            }
        }
        for (j = 1; j < 4; j++) {
            if (document.getElementsByTagName('p')[i].getElementsByTagName('img')[j].src == location.protocol + '//' + location.host + '/img/items_use/r18.png') {
                var kd = document.getElementsByTagName('p')[i].getElementsByTagName('span')[j-1].innerHTML;
                if (~parent.document.getElementsByClassName('h1b')[0].innerHTML.indexOf('r18.png')) {
                    return;
                }
                parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <img src="/img/items_use/r18.png">' + kd;
            } else if (document.getElementsByTagName('p')[i].getElementsByTagName('img')[j].src == location.protocol + '//' + location.host + '/img/items_use/r16.png') {
                var kl = document.getElementsByTagName('p')[i].getElementsByTagName('span')[j-1].innerHTML;
                parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <img src="/img/items_use/r16.png">' + kl;
            } else if (document.getElementsByTagName('p')[i].getElementsByTagName('img')[j].src == location.protocol + '//' + location.host + '/img/items_use/r17.png') {
                var fm = document.getElementsByTagName('p')[i].getElementsByTagName('span')[j-1].innerHTML;
                parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <img src="/img/items_use/r17.png">' + fm;
            } 
        }
        i++;
        for (j = 1; j < 4; j++) {
            if (document.getElementsByTagName('p')[i].getElementsByTagName('img')[j].src == location.protocol + '//' + location.host + '/img/items_use/r13.png') {
                var iss = document.getElementsByTagName('p')[i].getElementsByTagName('span')[j-1].innerHTML;
                parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <img src="/img/items_use/r13.png">' + iss;
            } else if (document.getElementsByTagName('p')[i].getElementsByTagName('img')[j].src == location.protocol + '//' + location.host + '/img/items_use/r14.png') {
                var laz = document.getElementsByTagName('p')[i].getElementsByTagName('span')[j-1].innerHTML;
                parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <img src="/img/items_use/r14.png">' + laz;
            } else if (document.getElementsByTagName('p')[i].getElementsByTagName('img')[j].src == location.protocol + '//' + location.host + '/img/items_use/r15.png') {
                var bag = document.getElementsByTagName('p')[i].getElementsByTagName('span')[j-1].innerHTML;
                parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <img src="/img/items_use/r15.png">' + bag;
            } 
        }
        if (parent.document.links[1].pathname=='/mail/in') {
            var mailHTML = parent.document.links[1].innerHTML;
            parent.document.links[1].innerHTML = '';
            parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <a href="/mail/in">' + mailHTML + '</a>';
        }
        if (parent.document.links[1].pathname=='/equip') {
            var equipHTML = parent.document.links[1].innerHTML;
            parent.document.links[1].innerHTML = '';
            parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <a href="/equip">' + equipHTML + '</a>';
        }
        if (parent.document.links[1].pathname=='/bag') {
            var bagHTML = parent.document.links[1].innerHTML;
            parent.document.links[1].innerHTML = '';
            parent.document.getElementsByClassName('h1b')[0].innerHTML += ' <a href="/bag">' + bagHTML + '</a>';
        }
    }
})(window);