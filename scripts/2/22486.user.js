// ==UserScript==
// @name                Deep RAE
// @namespace           http://the-geek.org
// @description         Link words of a DRAE definition to its own definition
// @include             http://buscon.rae.es/*
// ==/UserScript==

var spans, thisSpan;
spans = document.evaluate(
    "//span[@class='eAcep']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < spans.snapshotLength; i++) {
    thisSpan = spans.snapshotItem(i);
    var xPathResult = document.evaluate(
     './/text()[normalize-space(.) != ""]',
     thisSpan,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null
    );
    for (var j = 0, l = xPathResult.snapshotLength; j < l; j++) {
     var textNode = xPathResult.snapshotItem(j);
     parent = textNode.parentNode;
     if(parent.getAttribute('class') != 'eAcep') {
        continue;
     }
     str = textNode.data;
     str = str.replace(/\b([\[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)\b/g,'<a style="text-decoration: none; color: black;" href="http://buscon.rae.es/draeI/SrvltGUIBusUsual?LEMA=$1&origen=RAE&TIPO_BUS=3">$1</a>');
     container = document.createElement('span');
     container.innerHTML = str;
     parent.removeChild(textNode);
     parent.appendChild(container);
    }
}