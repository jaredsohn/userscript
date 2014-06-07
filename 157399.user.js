// ==UserScript==
// @name       RuTor.org seed graph
// @namespace  http://qmegas.info/rutor
// @version    0.2.01
// @description  Помогает визуально увидить популярность той или иной раздачи.
// @match      http://rutor.org/*
// @include    http://rutor.org/*
// @copyright  Megas (qmegas.info)
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
//
// ==/UserScript==

GM_addStyle('.qmegas-line { height: 5px; background-color: blue; }');
GM_addStyle('tr.qmegas-license td { background-color: #dfd; }');

var max_width = $(window).width()*0.6;

$('tr.gai, tr.tum').each(function(){
    var $trs = $(this).find('td'), $spans4 = $($trs.get().pop()).find('span'),
        count = parseInt($.trim($($spans4.get(0)).text())) + parseInt($.trim($($spans4.get(1)).text())),
        sp1a = ($($trs.get(1)).find('a')).get(2);
    count = Math.min(max_width, parseInt(count/10));
    $($trs.get(1)).append('<div class="qmegas-line" style="width: ' + count + 'px"></div>');
    if (sp1a.innerHTML.indexOf('Лицензия') !== -1)
        $(this).addClass('qmegas-license');
});