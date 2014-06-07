// ==UserScript==
// @name           PASMOmypage
// @namespace      http://d.hatena.ne.jp/MillyC/
// @include        https://www.pasmo-mypage.jp/CardStatusWebForm.aspx
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

var base = $('td>table[width="550"][cellpadding="2"]');
base.find('tr:has(td[colspan])').remove();
base.find('tr>th:last-child').after('<th width="80" style="color:white">\u5165\u51FA\u91D1\u984D</th>');
var last = -1;
$(base.find('tr>td:last-child').get().reverse()).each(function() {
  var n = parseInt($(this).text().replace(/\*/g,''));
  $('<td align="right">').insertAfter(this).text( (last < 0) ? '' : n - last );
  last = n;
});
