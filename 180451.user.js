// ==UserScript==
// @name          tianyalist
// @namespace     http://userscripts.org/users/528121
// @description   天涯帖子列表美化，包括加大行间距、增加列表区域宽度等，并且过滤回复数小于HOT的帖子
// @version       1.0
// @include       http://bbs.tianya.cn/list-funinfo-*
// @include       http://bbs.tianya.cn/list.jsp?item=funinfo*
// ==/UserScript==

var HOT = 500;

var tb = document.getElementsByTagName('table')[0];
var trs = tb.getElementsByTagName('tr');
var bHighlight = true;
for (var i = 1; i < trs.length; i++) {
    var elmRow = trs[i];
    var comment = elmRow.cells[3].innerHTML;
    if (comment < HOT) // don't display unpopular posts
    elmRow.style.display = 'none';
    else {
        elmRow.className = bHighlight ? '' : 'bg';
        bHighlight = !bHighlight;
    }
}
  
var elmHead, elmStyle;
elmHead = document.getElementsByTagName('head')[0];
elmStyle = document.createElement('style');
elmStyle.type = 'text/css';
elmHead.appendChild(elmStyle);
css = '.tab-bbs-list tr td{padding: 5px 0 10px 0;} ';
elmStyle.innerHTML = css;