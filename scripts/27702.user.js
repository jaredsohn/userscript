// ==UserScript==
// @name           Vman vigtige stats highlight
// @namespace      http://www.mathemaniac.org
// @description    Markerer vigtige stats for en given spiller
// @include        http://*virtualmanager.com/player/index.php*
// ==/UserScript==

GM_addStyle('.vigtigstat { background-color: #a4ff98 !important } ');

var xpath = '//tr[descendant::td[contains(text(), "Position")]]/td';
var it = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
var node;
var position = '';
while ((position == '') && (node = it.iterateNext())) {
    position = (node.childNodes[0].nodeValue == 'Position' ? '' : node.childNodes[0].nodeValue.replace(/, [^\s]+/,''));
}

// Tak til http://www.vman.dk/forum/topics/263127
var vigtigeStats = new Array();
vigtigeStats = {
    Keeper:["Mod","Beslutsomhed","Acceleration","Hop","Markering"],
    Forsvar:["Mod","Styrke","Acceleration","Tackling","Markering"],
    Midtbane:["Aflevering","Beslutsomhed","Udholdenhed","Kreativitet","Dribling"],
    Angreb:["Afslutning","Dribling","Acceleration","Aflevering","Kreativitet"]
};

for  each (var stat in vigtigeStats[position]) {
    xpath = '//td[text() = "'+stat+'"]';
    it = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
    node = it.iterateNext();
    node.className += ' vigtigstat';    
    node.nextSibling.className += ' vigtigstat';
}
