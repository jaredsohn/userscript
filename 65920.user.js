// ==UserScript==
// @name           Mig[VK]Script User Patch
// @namespace      http://vkontakte.ru/
// @description    Пользовательский патч для Mig[vk]Script. Все ваши дополнения к скрипту пишите сюда.
// @author         Mr_Mig
// @version        0.2
// @include http://*vkontakte.ru/*
// @include http://*vk.com/*
// @exclude http://vkontakte.ru/login*
// @exclude http://vk.com/login*
// @exclude http://login.vk.com/*
// ==/UserScript==

setTimeout(function() {
    load();
}, 20);

function load() {
    MigScript = unsafeWindow.MigScript;
    if (MigScript) {
        applyPatch = function () {

            ////////////// Tut vash KOD =) //////////////////////////////////
            //////////////// Primer - gruppy v stolbik //////////////////////
            if (window.location.href.match("/id" + MigScript.myUid)) {

                var arr = MigScript.DomUtil.ge("groups").getElementsByTagName("a");
                for (var i = 0; i < arr.length; i++) {
                    arr[i].appendChild(MigScript.DomUtil.dc("br"));
                }

            }

            /////////////////////////////////////////////////////////////////
            ///////////// Nizhe ni4ego NE TROGAEM =)) ///////////////////////
            /////////////////////////////////////////////////////////////////
        }();
    } else {
        setTimeout(function() {
            load();
        }, 20);
    }
}
;
