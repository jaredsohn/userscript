// ==UserScript==
// @name       TCD
// @namespace  http://sergeich0.lark.ru/
// @version    0.0.4
// @description  TeedaCharacterDescription - позволяет сохранить описание своего персонажа, которое будет отображаться всем посетителям вашей страницы, установившим такой же скрипт
// @include      *teeda*user*
// @copyright  Sergeich0
// ==/UserScript==
/*
 * Страница скрипта на UserScripts.org:	
 * http://userscripts.org/scripts/show/162082
 * */
(function (window, undefined) {  
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    
    if (w.self != w.top) {
        return;
    }
    
    ttt:
    for (var i = 0; i < document.links.length; i++) {
        if (~document.links[i].pathname.indexOf('info')) {
            var oSite = i;
            break ttt;
        }
    }
    var str = document.links[oSite].pathname;
    var hashS = str.substring(str.indexOf('info')+5,str.length);
    if (~window.location.href.indexOf('user?')) {
        /*************************************************/
        //document.getElementsByClassName('space2')[1].innerHTML = '<iframe width="100%" frameborder="0" src="http://sergeich0.koding.com/teeda/adddescription.php"></iframe>';
        //document.getElementsByClassName('space2')[1].className = '';
        var ddd = '';
        ddd += '<div id="dscr" style="display:none">';
        ddd += '<iframe frameborder="0" width="100%" src="http://sergeich0.koding.com/teeda/adddescription.php?id='+hashS+'"></iframe>';
        ddd += '</div><br>';
        document.getElementsByClassName('space2')[1].innerHTML = ddd;
        document.getElementsByClassName('space2')[0].innerHTML = '<a href="javascript: var dscr=document.getElementById(\'dscr\');if(dscr.style.display==\'none\'){dscr.style.display=\'\';}else{dscr.style.display=\'none\';}">Добавить описание</a>';
        /*************************************************/
    } else {
        /*************************************************/
        var xmlhttp = getXmlHttp();
        xmlhttp.open('GET', 'http://sergeich0.koding.com/teeda/'+hashS+'.html?rnd='+Math.random(), true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    var ddd = '';
                    ddd += '<div id="dscr" style="display:none">';
                    ddd += xmlhttp.responseText;
                    ddd += '</div><br>';
                    document.getElementsByClassName('space2')[1].innerHTML = ddd;
                    document.getElementsByClassName('space2')[0].innerHTML = '<a href="javascript: var dscr=document.getElementById(\'dscr\');if(dscr.style.display==\'none\'){dscr.style.display=\'\';}else{dscr.style.display=\'none\';}">Показать описание</a>';
                }
            }
        };
        xmlhttp.send(null);
        /*************************************************/
    }
    function getXmlHttp(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
})(window);