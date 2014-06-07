// ==UserScript==
// @name           Input2Textarea
// @namespace      http://userscripts.org
// @description    lovebox.hu tobbsoros kommentezo
// @include        http://*lovebox.hu/blograte.php*
// @version        20100314
// ==/UserScript==

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

unsafeWindow.countChars = function(element) {
    var newHTML = '';
    if(255-element.value.length <= 0){
        newHTML = '<span style="color:#f00;font-weight:bold;">' + (255-element.value.length) + '</span>';
    }else{
        newHTML = 255-element.value.length;
    }
    unsafeWindow.document.getElementById('chCount').innerHTML = newHTML;
}

window.addEventListener('load', function(e){
    $x('//input[@name="new_comment"]')[0].parentNode.innerHTML = '<textarea cols="50" rows="5" name="new_comment" onkeyup="countChars(this);"></textarea><div id="chCount">255</div>';
}, false);