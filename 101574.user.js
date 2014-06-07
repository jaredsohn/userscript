// ==UserScript==
// @name           kik_conf
// @namespace      escilon.ru
// @include        http://escilon.ru/cooking/*
// ==/UserScript==

var table = document.getElementsByTagName('table')[3]
var tr = table.getElementsByTagName('tr')[0]
var td = document.createElement('td')
tr.appendChild(td)

var td2 = tr.getElementsByTagName('td')[2]
var a = document.createElement('a')
td2.appendChild(a)
a.className = 'a_btnr'
a.href = 'craft_meat=1'
a.innerHTML = '<b>\u0413\u043E\u0442\u043E\u0432\u0438\u0442\u044C</b>'
a.style.backgroundColor = '#7B68EE'





