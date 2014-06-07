// ==UserScript==
// @name          SparkNotes Inline Ad remover
// @description   Remove inline ads from SparkNotes
// @include       *sparknotes.com*
// ==/UserScript==

// Much of this code has been copy and pasted with minor changes
// to make it specific to sparknotes.com. Much thanks to greasemonkey,
// diveintogreasemonkey, and userscripts.org.

// addGlobalStyle from diveintogreasemonkey
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var userstyle;

userstyle = 'div.floatingad , div.floatingad-right {display: none;}\n'
 + '.body_text {display: inline;}\n'
 + 'td.right_bar_bottom {background: #f4f7fa;}\n'
 + 'td.right_bar_bottom a , td.right_bar_bottom-toc a {display: none;}\n'
// For math equations to display right
 + '.right_bar div {display: none;} \n' + '.right_bar div.more_resources-int {display: block;}\n'
// More ad removal for literature section
 + '.bn-ad-super {display: none;}\n';
 
addGlobalStyle(userstyle);