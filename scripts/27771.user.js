// ==UserScript==
// @name           NicoDic Link Editor Names
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @include        http://dic.nicovideo.jp/revs/*
// ==/UserScript==
var table_exp = document.createExpression(
    'descendant-or-self::table[contains(concat(" ", @class, " "), " revisions ")]', null);
var idx_exp = document.createExpression(
    'count(./thead//th[contains(text(), "編集者")]/preceding-sibling::th)', null);

function addLinks(nodes) {
    nodes.forEach(function(node) {
        var table = table_exp.evaluate(node, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(table == null)
            return;
        var idx = idx_exp.evaluate(table, XPathResult.NUMBER_TYPE, null).numberValue + 1;
        var result = document.evaluate('./tbody/tr/td[' + idx + ']/text()[1][normalize-space(.) != ""]',
            table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        
        if(result != null) {
            for(var i = 0, len = result.snapshotLength; i < len; i++)
            {
                var node = result.snapshotItem(i);
                var link = document.createElement('a');
                link.href = 'http://www.nicochart.jp/name/' + encodeURI(node.nodeValue);;
                node.parentNode.replaceChild(link, node);
                link.appendChild(node);
            }
        }
    });
}

addLinks([document]);

if(window.AutoPagerize)
    window.AutoPagerize.addFilter(addLinks);

