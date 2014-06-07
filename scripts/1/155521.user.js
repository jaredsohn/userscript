// ==UserScript==
// @name       DLSite linker
// @namespace  http://dargothtranslations.wordpress.com
// @version    1.0
// @description  Changes RJ/Exxxxxx numbers to links to DLSite
// @match      http://www.ulmf.org/*
// @match      http://www.hongfire.com/*
// ==/UserScript==
// MAXIMUM LENGTH OF LEFT STRING
// "&amp;laquo;".length = 11
var MAX_LEFT_STR = 11;
var fixBalanced = function(text, leftStr)
{
    var index = -1;
    switch (leftStr.charAt(leftStr.length - 1))
    {
        case "`": index = text.indexOf("'"); break; // `  '
        case "'": index = text.indexOf("'"); break; // '  '
        case "(": index = text.indexOf(")"); break; // (  )
        case "[": index = text.indexOf("]"); break; // [  ]
    }
    if (index > -1)
    {
        return text.substring(0, index);
    }
    leftStr = leftStr.substring(leftStr.length - MAX_LEFT_STR);
    if (/&lt;$/.test(leftStr)) { index = text.indexOf("&gt;"); }                        // <  >
    else { if (/&amp;lt;$/.test(leftStr)) { index = text.indexOf("&amp;gt;"); }         // <  >
    else { if (/&amp;#60;$/.test(leftStr)) { index = text.indexOf("&amp;#62;"); }       // <  >
    else { if (/&amp;quot;$/.test(leftStr)) { index = text.indexOf("&amp;quot;"); }     // "  "
    else { if (/&amp;#34;$/.test(leftStr)) { index = text.indexOf("&amp;#34;"); }       // "  "
    else { if (/&amp;#96;$/.test(leftStr)) { index = text.indexOf("'"); }               // `  '
    else { if (/&amp;laquo;$/.test(leftStr)) { index = text.indexOf("&amp;raquo;"); }   // ≪  ≫
    else { if (/&amp;#171;$/.test(leftStr)) { index = text.indexOf("&amp;#187;"); }     // ≪  ≫
    }}}}}}}
    if (index > -1)
    {
        return text.substring(0, index);
    }
    return text;
};
var textToLink = function(nodeValue)
{
    var changesMade = false;
    nodeValue = nodeValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var DLSiteRegEx = new RegExp('r(j|e)[0-9]+','gi'); 
    var matches = null;
    var text = null;
    var index = null;
    var leftStr = null;
    var link = null;
    var anchor = null;
    var fromIndex = 0;
    while ((matches = nodeValue.substring(fromIndex).match(DLSiteRegEx)) !== null)
    {
        text = matches[0];
        index = nodeValue.indexOf(text, fromIndex);
        leftStr = nodeValue.substring(0, index);
        text = fixBalanced(text, leftStr);
        fromIndex = index + text.length;
        if (/^([aaaoou]|\.\w)/i.test(nodeValue.substring(fromIndex, fromIndex + 2)))
        {
            continue;
        }
        link = nodeValue.substring(index, index + text.length)
        if (link.match(/rj/i)) {
          anchor = "<a href=\"http://www.dlsite.com/maniax/work/=/product_id/" + link + ".html\">" + text + "</a>";
        } else {
          anchor = "<a href=\"http://www.dlsite.com/ecchi-eng/work/=/product_id/" + link + ".html\">" + text + "</a>";
        }
                       
        nodeValue = leftStr + anchor + nodeValue.substring(fromIndex);
        fromIndex = index + anchor.length;
        changesMade = true;
    }
    if (!changesMade)
    {
        return null;
    }
    else
    {
        return nodeValue;
    }
};
var main = function()
{
    document.normalize();
    var elements = null;
    var element = null;
    var nodeValue = null;
    elements = document.evaluate(".//text()[not(ancestor::a) and not(ancestor::button) and not(ancestor::label) and not(ancestor::legend) and not(ancestor::option) and not(ancestor::script) and not(ancestor::select) and not(ancestor::style) and not(ancestor::textarea) and not(ancestor::title)]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!elements || elements.snapshotLength === 0)
    {
        return;
    }
    var span = null;
    for (var i = 0; i < elements.snapshotLength; i++)
    {
        element = elements.snapshotItem(i);
        nodeValue = textToLink(element.nodeValue);
        if (nodeValue)
        {
            span = document.createElement("span");
            span.innerHTML = nodeValue;
            element.parentNode.replaceChild(span, element);
        }
    }
};
main();