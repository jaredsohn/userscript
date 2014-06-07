// ==UserScript==
// @name        reStyle
// @namespace   zx.pk.ru
// @include     http://zx.pk.ru/misc.php?do=cybstats*
// @include     http://zx-pk.ru/misc.php?do=cybstats*
// @include     http://www.zx-pk.ru/misc.php?do=cybstats*
// @include     http://www.zx.pk.ru/misc.php?do=cybstats*
// @version     0.01
// @grant       none
// ==/UserScript==
var sheet = window.document.styleSheets[0];
sheet.insertRule('.alt3 {background-color: #cee3ff; }', sheet.cssRules.length);
sheet.insertRule('.alt3 a {color: #0d2037; }', sheet.cssRules.length);
sheet.insertRule('.alt4 {background-color: #fafafa; }', sheet.cssRules.length);
sheet.insertRule('.alt4 a {color: #e4e4e4; }', sheet.cssRules.length);
var hideFlame = true;
var removeFlame = true;
var tryCount = 10;
var re = new RegExp('^(?:.)+?Loading', 'igm');
var tableResults = document.getElementById('cybstats_lpdiv');
var deleteArray = [
];
tryCheck();
function tryCheck() {
    if (re.test(tableResults.innerHTML)) {
        if (tryCount > 0) {
            tryCount--;
            setTimeout(tryCheck, 1000);
        } else {
            // хватит лохматить бабушку!
        }
    } else {
        var childrenArray = document.getElementById('cybstats_lpdiv') .firstChild.firstChild.nextElementSibling.children;
        for (var index = 0; index < childrenArray.length; index++) {
            childrenArray[index].onmouseover = function () {
                this.className = 'alt3';
            }
            childrenArray[index].firstChild.nextElementSibling.className = '';
            if (hideFlame) {
                re = new RegExp('^(?:.)+?Флейм', 'igm');
                var threadName = childrenArray[index].firstChild.nextSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
                if (re.test(threadName)) {
                    deleteArray.push(index);
                }
            }
            childrenArray[index].firstChild.nextSibling.nextElementSibling.firstChild.href = childrenArray[index].firstChild.nextSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastChild.href;
        }
        for (var index = deleteArray.length - 1; index >= 0; index--) {
            if (removeFlame) {
                childrenArray[deleteArray[index]].parentNode.removeChild(childrenArray[deleteArray[index]]);
            } else {
                var newClass = 'alt4';
                childrenArray[deleteArray[index]].className = newClass;
                childrenArray[deleteArray[index]].onmouseover = function () {
                    this.className = newClass;
                }
                childrenArray[deleteArray[index]].onmouseout = function () {
                    this.className = newClass;
                }
            }
        }
    }
}
