// ==UserScript==
// @name           RlsLogCatSearch
// @namespace      http://www.rlslog.net/
// @description    Allows searching in specific categories
// @include        http://www.rlslog.net/*
// ==/UserScript==

if (document.querySelectorAll != undefined) {
    var x = document.querySelectorAll('.cat-item > a');
} else {
    var x = new Array();
    var li = document.getElementsByTagName('li');
    for (i in li) {
        item = li[i];
        if (item.className == undefined || item.className.indexOf('cat-item') < 0) continue;
        x.push(item.getElementsByTagName('a')[0]);
    }
}

var select = document.createElement('select');
select.size = 1;
select.setAttribute('onchange', "document.getElementById('searchform').action=this.options[this.selectedIndex].value;");

var regex = /category\/[^\/]+\/$/i;    

for (i in x) {
    var link = x[i];
    if (link.title == 'RSS' || link.href == undefined) continue;
    var option = document.createElement('option');
    option.value = link.href;
    
    if (regex.test(link.href) == true) {
        option.setAttribute('style', "font-weight:bold;");
        option.text = link.text;
    } else {
        option.text = '-- ' + link.text;
    }
    
    select.add(option, null);
}

document.getElementById('searchform').appendChild(select);
