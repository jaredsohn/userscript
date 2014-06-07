// ==UserScript==
// @name           Исправление недоразумения на сайте федерального агенства
// @description    Исправно плачу налоги, но мне всё равно запрещают сохранять к себе ГОСТы. Видимо, ошибся нанятый по знакомству программист. Исправил это за него.
// @include        http://protect.gost.ru/v.aspx*
// @version        0.1
// ==/UserScript==

(function () {

crapimage = document.getElementsByClassName('face');
crapbg = document.defaultView.getComputedStyle(crapimage[0], null).backgroundImage;
crapbg = crapbg.substr(4);
crapbg = crapbg.substr(0, crapbg.length - 1);
if (crapbg.substr(0,1) == '"') //для оперы
    crapbg = crapbg.substr(1, crapbg.length - 2);
crapimage[0].setAttribute('src', crapbg);

})();