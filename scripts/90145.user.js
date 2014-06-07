// ==UserScript==
// @name           indicator_zarplaty
// @namespace      http://virtonomic*.*/*/main/unit/view/*
// @include        http://virtonomic*.*/*/main/unit/view/*
// @exclude        http://virtonomic*.*/*/main/unit/view/*/*
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
if(!(/(?:Склад)/.test($('div.officePlace').prop('textContent'))))
{aaa=$('tr:gt(0)>td.title:contains("Зарплата")').next();
bbb=aaa.prop('textContent');
zarp=bbb.match(/\d[.\s\d]*(?=\$)/g);
zzz=(zarp[0].replace(/[^\d\.]/g,'')/zarp[1].replace(/[^\d\.]/g,'')*100).toFixed(0);
color=zzz<80?'red':'green';
color=zzz>80?'blue':color;
aaa.prop('textContent',bbb+" ----> "+zzz+'%').css('color',color).css('fontWeight',(zzz==80?'':'bold'));
}