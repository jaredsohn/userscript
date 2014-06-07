// ==UserScript==
// @name           nlog - magic quotes
// @description    usuwa backslashe z edytowanych postów - zamienia \" \' na " '
// @include        http://nlog.org/login/index.php?what=edit&act=edit&mid=*
// ==/UserScript==

var tx = document.evaluate("//textarea[@name='post']", document, null, 9, null).singleNodeValue;
if (tx) {
    var value = tx.value;
    var clean = value.replace(/\\(['"])/g, '$1');
    if (value !== clean) {
        tx.value = clean;
    }
}
