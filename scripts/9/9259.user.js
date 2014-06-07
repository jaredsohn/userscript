// ==UserScript==
// @name           WordPress post-slug blank check
// @namespace      http://jmblog.jp
// @description    Confirm before publishing a post which post-slug is blank.
// @include        http://*/wp-admin/post*.php*
// ==/UserScript==

// ChangeLog
// 2007-05-15 - 0.1 - initial release

var msg = "";
var slug_title = document.evaluate("//fieldset[@id='slugdiv']/h3", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.textContent;

if (slug_title.match(/投稿スラッグ/)) {
    msg = '投稿スラッグが空白です。このまま公開してよいですか？'; // Japanese message
} else {
    msg = "WARNING!\n\n" + "Post slug is blank. Are you OK?\n";   // English message
}
$('publish').addEventListener('click', function(e) {
    if ($('post_name').value == '') {
        if(!confirm(msg)){
            e.preventDefault();
        }
    }
}, true);

function $(id){
    return document.getElementById(id);
}
