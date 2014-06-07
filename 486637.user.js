// ==UserScript==
// @name           HWM_Delete_Map
// @author         Рианти
// @description    Удаляет флеш с картой, до её загрузки
// @version        1
// @include        http://www.heroeswm.ru/map.php*
// @run-at         document-end
// ==/UserScript==

var mapTable = document.querySelector('center:nth-child(2) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > center:nth-child(1) > table:nth-child(1)');
mapTable.parentNode.removeChild(mapTable);