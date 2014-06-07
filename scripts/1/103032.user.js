// ==UserScript==
// @name           ika_des
// @namespace      ikariam.ru
// @include        http://s*.*.ikariam.com/*
// ==/UserScript==


var alink = document.evaluate("//p[contains(., 'Как генерал')]",document,null,9,null).singleNodeValue;
//alert(alink);
alink.textContent = alink.textContent.replace(/Как генерал альянса Вы можете видеть, какие действия совершаются членами Вашего альянса в данный момент. Если какая-то атака не отвечает интересам альянса, Вы можете отдать приказ на возврат кораблей./g, '');