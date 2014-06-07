// ÖNEMLİ:

// bu script bana ait değildir

// asıl sahibi missile olup

// orijinal script http://userscripts.org/scripts/show/73481 adresinde mevcuttur

// ekşi sözlük'ün domain değişikliği sebebiyle include satırlarını düzenledim

// ayrıca "&cr=y" kısmı güzelinden getirdiği için sildim -ki böyle de olması gerekiyor...

// ==UserScript==

// @name            gudik tusu

// @namespace       gudik tusu

// @include         http://eksisozluk.com/top.asp

// @include         http://www.eksisozluk.com/top.asp

// ==/UserScript==

window.addEventListener("load", function() { var currentTime = new Date();

var month = currentTime.getMonth() + 1; month = (month<10) ? "0"+month.toString() : month;

var day = currentTime.getDate(); day = (day<10) ? "0"+day.toString() : day;

var year = currentTime.getFullYear();

var ssg = "a=sr&kw=&au=ssg&so=y&fd=&fm=&fy=";

var myDate = "a=sr&kw=&au=&so=g&fd="+day+"&fm="+month+"&fy="+year;

do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/rastgele bir güne git/,'bugünkü gudikleri göster',null);

do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bir gün/,'gudik',null);

do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/a=rd/,myDate,null);





do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/ortayı donat dayı/,'ssg',null);

do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/rastgele/,'ssg',null);

do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/a=rn/,ssg,null);







 }, false);



function do_modify_html_it(doc, element, match_re, replace_string) {

    match_re = new RegExp(match_re);

    if (element.innerHTML) {

element.innerHTML = element.innerHTML.replace(match_re, replace_string);

    };

};