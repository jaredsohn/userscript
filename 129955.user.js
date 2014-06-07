// ==UserScript==
// @name        showSumPoints
// @version     1.0
// @namespace   OPK NSU
// @author      Fenex
// @include     http://opk.nsu.ru/students/*
// @include     http://opk.lab9.ru/students/*
// @icon        http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
var j = 0;
var main_elem = document.getElementById('content').getElementsByClassName('simple_table');

for(j=0;j<main_elem.length;j++) {
    var points = 0;
    var i = 0;
    var e = main_elem[j].getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for(i=0;i<e.length;i++) {   
        var sup = false;    
        points += parseInt(e[i].getElementsByTagName('td')[1].childNodes[0].textContent);
        if(sup = e[i].getElementsByTagName('td')[1].childNodes[1]) {
            points += parseInt(sup.textContent.replace('–', '-'));
        }
    }

    var insert_elem = main_elem[j].getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th');
    insert_elem[0].innerHTML += ' <span style="color:brown;"><b><i>('+e.length+' штук)</i></b></span>';
    insert_elem[1].innerHTML += ' <span style="color:brown;"><b><i>('+points+')</i></b></span>';
}