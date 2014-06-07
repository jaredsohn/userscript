// ==UserScript==
// @name           LeproElkraniosDreamScript
// @namespace      http://kt.pri.ee/lepra
// @description    http://leprosorium.ru/comments/924297
// @include        http://leprosorium.ru/my/
// ==/UserScript==

xpathMany = function(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

insertAfter = function(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
}

var mtb = xpathMany("//a[contains(@onmouseover, 'del_from_my_things')]");
for (var i = 0; i < mtb.snapshotLength; i++) {
    var span = mtb.snapshotItem(i).parentNode;
    var newSpan = span.cloneNode(true);
    var a = newSpan.childNodes[1];
    a.innerHTML = 'с негодованием стереть из моих вещей';
    a.setAttribute('onmouseup', "alert('НЕГОДОВАНИЕ! Волны негодования накрыли Лепру! ААААААРРРГХХ!!!'); " + a.getAttribute('onmouseup'));
    var newSpan2 = span.cloneNode(true);
    a = newSpan2.childNodes[1];
    a.innerHTML = 'стереть из моих вещей, потому что вы там все тупые, и в споре я выиграл';
    a.setAttribute('onmouseup', "alert('ОНИ ВСЕ ТУПЫЕ! Ты абсолютно прав! Не трать на них свое время!'); " + a.getAttribute('onmouseup'));
    var space = document.createTextNode(' ');
    insertAfter(span, space);
    insertAfter(space, newSpan);
    space = space.cloneNode(true);
    insertAfter(newSpan, space);
    insertAfter(space, newSpan2);
}
