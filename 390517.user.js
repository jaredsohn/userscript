// ==UserScript==
// @id             bst.bratsk.ru-fd9cca8e-25a3-4669-b43b-884f2d24e4ae@scriptish
// @name           bst.bratsk.ru poll automation
// @version        1.0
// @namespace      
// @author         MNMOTRH
// @description    Automates bst.bratsk.ru poll routine
// @include        http://bst.bratsk.ru/photo/*
// @run-at         document-end
// ==/UserScript==

var votes = document.getElementsByClassName('votes');
if (votes) {// если на текущей странице есть, за кого голосовать
    var num = votes[0].getElementsByTagName('strong')[0].textContent;
    if (parseInt(num) >= 72 && parseInt(num) <= 74) 
       votes[0].getElementsByTagName('select')[0].selectedIndex=9; //10 за няшу 
    else
       votes[0].getElementsByTagName('select')[0].selectedIndex=0; //1 за остальных
    votes[0].getElementsByTagName('input')[0].value=num; // капча
    setTimeout(function() {votes[0].getElementsByTagName('input')[3].click();}, 5000 + 5000*Math.random());
} else {
    var page = window.location.href.match(/\d/);
    if (!page || page[0] == 1)
        window.location.href = "http://bst.bratsk.ru/photo/2/";
    else if (page[0] == 2)
        window.location.href = "http://bst.bratsk.ru/photo/3/";
    else if (page[0] == 3)
        alert("Done.");
}