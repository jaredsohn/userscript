// ==UserScript==
// @name       LGChatHelper v2
// @namespace  http://userscripts.org/scripts/show/155745
// @version    2.2
// @description  Скрипт предназначен для игры "Легенды Крови" (http://legendsgame.ru). Этот скрипт делает окно ввода в чате легенд крови активным без дополнительных кликов мышью, а так же сильно упрощает ввод смайлов.
// @match      http://*legendsgame.ru/game/chat.php*
// @include    http://*legendsgame.ru/game/chat.php*
// @match      http://*bitva.mobi/game/chat.php*
// @include    http://*bitva.mobi/game/chat.php*
// @match      http://*bitva.my.mgates.spaces.ru/game/chat.php*
// @include    http://*bitva.my.mgates.spaces.ru/game/chat.php*
// @match      http://*legendsgame.*.pumpit.ru/game/chat.php*
// @include    http://*legendsgame.*.pumpit.ru/game/chat.php*
// @author     Sergeich0
// @copyright  Sergeich0
// ==/UserScript==
/*
 * Скелет скрипта взят с хабра
 * http://habrahabr.ru/post/129343/
 */
/*
 * ChangeLog
 * 0.1b: создание скрипта
 * 0.2b -> 1.0: Теперь фокус на окно сообщения кидается постоянно,
 *      на тот случай, если был случайный клик вне поля.
 *      Релиз.
 * 1.1: Убран постоянный фокус, вместо него можно активизировать поле ввода
 *      при помощи клика в любом месте окна.
 * 1.2: Добавлены смайлы. Исправлено ложное выделение текста внутри окна ввода.
 * 1.3: Добавлены "новые смайлы на морскую тематику".
 * 1.4 -> 2.0: Серьёзно оптимизирован код скрипта. 
 *      Теперь можно кликать по смайликам в чате, чтобы добавить их к сообщению.
 *      Добавлена поддержка некоторых площадок.
 * 2.1: Кнопка "+ Смайлы" заменена на кнопку "Бросить кубик" с соответствующим
 *      функционалом. 
 * 2.2: Добавлены совсем новые смайлы.
*/
(function (window, undefined) { 
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    if (~(w.location.href.indexOf('chat'))) {
        var addImage = function(url) {
            var pic=document.createElement('img');
            pic.src=url;
            document.getElementsByClassName('margin_bottom')[0].appendChild(pic);
        }
        var addSmiley = function(src) {
            if (/\/smiles\//.test(src)) {
                var smiley = /[\w\(\)_]*(?=\.g)/.exec(src);
                document.forms.form.getElementsByTagName('input')[0].value+=':'+smiley;
            }
        }
        addImage('../img/smiles/).gif');
        addImage('../img/smiles/(.gif');
        addImage('../img/smiles/angry.gif');
        addImage('../img/smiles/bye.gif');
        addImage('../img/smiles/D.gif');
        addImage('../img/smiles/tea.gif');
        addImage('../img/smiles/wow.gif');
        addImage('../img/smiles/rofl.gif');
        addImage('../img/smiles/heh.gif');
        addImage('../img/smiles/cool.gif');
        addImage('../img/smiles/cool2.gif');
        addImage('../img/smiles/gg.gif');
        addImage('../img/smiles/bugaga.gif');
        addImage('../img/smiles/atata.gif');
        addImage('../img/smiles/rock.gif');
        addImage('../img/smiles/friend.gif');
        addImage('../img/smiles/no.gif');
        addImage('../img/smiles/gold.gif');
        addImage('../img/smiles/dance.gif');
        addImage('../img/smiles/dance2.gif');
        addImage('../img/smiles/kiss.gif');
        addImage('../img/smiles/chmok.gif');
        addImage('../img/smiles/mrrr.gif');
        addImage('../img/smiles/oops.gif');
        addImage('../img/smiles/klass.gif');
        addImage('../img/smiles/kill.gif');
        addImage('../img/smiles/sad.gif');
        addImage('../img/smiles/drink.gif');
        addImage('../img/smiles/happyman.gif');
        addImage('../img/smiles/roza.gif');
        addImage('../img/smiles/uti.gif');
        addImage('../img/smiles/mda.gif');
        addImage('../img/smiles/P.gif');
        addImage('../img/smiles/lol.gif');
        addImage('../img/smiles/pirat.gif');
        addImage('../img/smiles/shoot.gif');
        addImage('../img/smiles/battle.gif');
        addImage('../img/smiles/invalid.gif');
        addImage('../img/smiles/smile.gif');
        addImage('../img/smiles/wave.gif');
        addImage('../img/smiles/smoke.gif');
        addImage('../img/smiles/lalala.gif');
        addImage('../img/smiles/tomato.gif');
        addImage('../img/smiles/blabla.gif');
        var j=document.images.length;
        for (var i=0;i<j;i++) {
            document.images[i].onclick = function() {
                addSmiley(this.src)
            };
        }
        document.forms.form.getElementsByTagName('input')[0].focus();
        document.forms.form.getElementsByTagName('input')[0].value += "";
        window.onclick=function() {
            document.forms.form.getElementsByTagName('input')[0].focus();
            document.forms.form.getElementsByTagName('input')[0].value += "";
        }
        var obj = document.forms.form.lastChild;
        obj.value = "Бросить кубик";
        obj.type="button";
        obj.onclick = function() {
            this.form.getElementsByTagName('input')[0].value = ":rand";
            this.form.getElementsByTagName('input')[1].click();
        };
    }
})(window);