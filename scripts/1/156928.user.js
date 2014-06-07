// ==UserScript==
// @name       TCH
// @namespace  http://sergeich0.lark.ru
// @version    0.4b
// @description  TeedaChatHelper - добавляет смайлики в чат тиды! 
// @match      *teeda*chat*
// @copyright  Sergeich0
// ==/UserScript==

/*
   * v0.2b: добавлена поддержка смайлика ":D".
   * v0.3b: добавлены 10 смайлов и подсветка сообщений, адресованных тебе.
   * v0.4b: добавлены ещё смайлы; 
   *        удалённые сообщения заменяются весёлыми смайлами;
   *        клик в любом месте экрана переводит фокус на окно ввода сообщения;
   *        двойной клик обновляет страницу;
   *        звезды модераторам и админам заменены на смайлики-супермены.
*/
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
    
    if (~window.location.href.indexOf('teeda')) {
        var flag = 0;
        setInterval(function() {
            flag = 0;
        },650);
        window.onclick = function() {
            document.forms[0].getElementsByTagName('input')[0].focus();
            document.forms[0].getElementsByTagName('input')[0].value += "";
            flag++;
            if (flag == 2) {
                ea:
                for (var i = 0; i < document.links.length; i++) {
                    if (~document.links[i].href.indexOf('chat/')) {
                        document.links[i].click();
                        break ea;
                    }
                }
            }
        }
        eee:
        if (~window.location.href.indexOf('od') || ~window.location.href.indexOf('spaces')) {
            for (var i = 0; i < document.links.length; i++) {
                if (~document.links[i].href.indexOf('user')) {
                    var oSite = i;
                    break eee;
                }
            }
        } else {
            var oSite = 0;
        }
        var deleted = ['http://www.kolobok.us/smiles/standart/offtopic.gif', 'http://www.kolobok.us/smiles/standart/punish2.gif', 'http://www.kolobok.us/smiles/madhouse/hang3.gif', 'http://www.kolobok.us/smiles/remake/close_tema.gif', 'http://kolobok.us/smiles/he_and_she/to_babruysk.gif']
        if (~window.location.href.indexOf('chat')) {
            var e = document.forms[document.forms.length-1];
            e.innerHTML += '<div>';
            e.innerHTML += '<img src="http://www.cyberforum.ru/images/smilies/smile3.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':)\'">';
            e.innerHTML += '<img src="http://www.cyberforum.ru/images/smilies/sad.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':(\'">';
            e.innerHTML += '<img src="http://sergeich0.lark.ru/smiles/biggrin.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':D\'">';
            e.innerHTML += '<img src="http://sergeich0.lark.ru/smiles/blum3.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':P\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/wink3.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \';)\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/acute.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \';D\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/dirol.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \'8-)\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/aggressive.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':@\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/fool.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':|\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/bad.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':!\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/cray.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':\\\'(\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/madhouse/wacko2.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \'%)\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/standart/blush.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':[\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/he_and_she/kiss2.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \':*\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/he_and_she/give_rose.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \'@}-)--\'">';
            e.innerHTML += '<img src="http://i.spaces.ru/10_shok.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \'=-O\'">';
            e.innerHTML += '<img src="http://www.kolobok.us/smiles/personal/music2.gif" onclick="javascript: document.forms[document.forms.length-1].getElementsByTagName(\'input\')[0].value += \'[:-}\'">';
            e.innerHTML += '</div>';
            var el = 'p';
            var el1 = 0;
            document.forms[0].getElementsByTagName('input')[0].focus();
            document.forms[0].getElementsByTagName('input')[0].value += "";
            for (var i = 0; i < document.getElementsByClassName('red').length -1; i++) {
                if (~document.getElementsByClassName('red')[i].innerHTML.indexOf('<a href')) {
                    var mdNick = document.getElementsByClassName('red')[i].getElementsByTagName('a')[0].innerHTML;
                    var mdHref = document.getElementsByClassName('red')[i].getElementsByTagName('a')[0].href;
                    document.getElementsByClassName('red')[i].innerHTML = '<a href="' + mdHref + '">' + '<img src="' + deleted[gRnd(0,4)] + '">' + '</a>';
                }
            }
        } 
        /*else {
        var el = 'div';
        var el1 = 2;
        }*/
        
        for (var i = 0; i < document.images.length; i++) {
            if (~document.images[i].src.indexOf('p27')) {
                document.images[i].src = 'http://www.kolobok.us/smiles/personal/superman.gif';
            }
            if (~document.images[i].src.indexOf('p26')) {
                document.images[i].src = 'http://www.kolobok.us/smiles/personal/superman2.gif';
            }
        }
        for (var i = el1; i < document.getElementsByTagName(el).length; i++) {
            if ((~document.getElementsByTagName(el)[i].innerHTML.indexOf(':')) || (~document.getElementsByTagName(el)[i].innerHTML.indexOf(';'))) {
                //alert(i + ' ' + document.getElementsByTagName('p')[i].innerHTML.indexOf(':)'));
                var t = document.getElementsByTagName(el)[i];
                
                if (~t.getElementsByTagName('span')[2].innerHTML.indexOf(document.links[oSite].innerHTML)) {
                    t.getElementsByTagName('span')[2].className = "lime";
                }
                t.innerHTML = t.innerHTML.replace(/\:\)/g,'<img src\=\"http\:\/\/www\.cyberforum\.ru\/images\/smilies\/smile3\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\(/g,'<img src\=\"http\:\/\/www\.cyberforum\.ru\/images\/smilies\/sad\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:-\)/g,'<img src\=\"http\:\/\/www\.cyberforum\.ru\/images\/smilies\/smile3\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\-\(/g,'<img src\=\"http\:\/\/www\.cyberforum\.ru\/images\/smilies\/sad\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:-D/g,'<img src\=\"http\:\/\/sergeich0\.lark\.ru\/smiles\/biggrin\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:D/g,'<img src\=\"http\:\/\/sergeich0\.lark\.ru\/smiles\/biggrin\.gif">');
                t.innerHTML = t.innerHTML.replace(/\;D/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/acute\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:Р/g,'<img src\=\"http\:\/\/sergeich0\.lark\.ru\/smiles\/blum3\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:р/g,'<img src\=\"http\:\/\/sergeich0\.lark\.ru\/smiles\/blum3\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:P/g,'<img src\=\"http\:\/\/sergeich0\.lark\.ru\/smiles\/blum3\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:p/g,'<img src\=\"http\:\/\/sergeich0\.lark\.ru\/smiles\/blum3\.gif">');
                t.innerHTML = t.innerHTML.replace(/\;\)/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/wink3\.gif">');
                t.innerHTML = t.innerHTML.replace(/\;\)/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/acute\.gif">');
                t.innerHTML = t.innerHTML.replace(/8-\)/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/dirol\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\@/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/aggressive\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\|/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/fool\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\!/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/bad\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\'\(/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/cray\.gif">');
                t.innerHTML = t.innerHTML.replace(/\;\(/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/cray\.gif">');
                t.innerHTML = t.innerHTML.replace(/\%\)/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/madhouse\/wacko2\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\[/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/blush\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:-\[/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/standart\/blush\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:-\*/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/he_and_she\/kiss2\.gif">');
                t.innerHTML = t.innerHTML.replace(/\:\*/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/he_and_she\/kiss2\.gif">');
                t.innerHTML = t.innerHTML.replace(/@}-\)--/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/he_and_she\/give_rose\.gif">');
                t.innerHTML = t.innerHTML.replace(/\=-O/g,'<img src\=\"http\:\/\/i\.spaces\.ru\/10\_shok\.gif">');
                t.innerHTML = t.innerHTML.replace(/\=-0/g,'<img src\=\"http\:\/\/i\.spaces\.ru\/10\_shok\.gif">');
                t.innerHTML = t.innerHTML.replace(/\=-О/g,'<img src\=\"http\:\/\/i\.spaces\.ru\/10\_shok\.gif">');
                t.innerHTML = t.innerHTML.replace(/\[:-}/g,'<img src\=\"http\:\/\/www\.kolobok\.us\/smiles\/personal\/music2\.gif">');
            }
        }
        
        String.prototype.replaceAll = function(search, replace){
            return this.split(search).join(replace);
        }
        
    }
    function gRnd(min, max)
    {
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
})(window);