// ==UserScript==
// @name           Yahoo! Answers Colorizer
// @namespace	http://userscripts.org/people/14536
// @description    Highlights questions on Yahoo! Answers profiles depending on whether they are in voting, resolved, removed or chosen as a best answer
// @include        http://answers.yahoo.com/my/*
// ==/UserScript==

var elms;
elms = document.getElementsByTagName('td');
for (var i=0; i<elms.length; i++) {
 if (elms[i].innerHTML.indexOf(' ago - In&nbsp;Voting')!=-1) { elms[i].style.padding='1px 3px'; elms[i].style.background='#ffffdd'; elms[i].style.border='1px solid #ccccaa'; }
 else if (elms[i].innerHTML.indexOf(' ago - Resolved')!=-1) { elms[i].style.padding='1px 3px'; elms[i].style.background='#ffdddd'; elms[i].style.border='1px solid #ccaaaa'; }
 else if (elms[i].innerHTML.indexOf(' ago - <span class="best-answer-notify">Best&nbsp;Answer</span>')!=-1) { elms[i].style.padding='1px 3px'; elms[i].style.background='#ddeeff'; elms[i].style.border='1px solid #aaaacc'; }
 else if (elms[i].innerHTML.indexOf('(Question has been removed)')!=-1) { elms[i].style.padding='1px 3px'; elms[i].style.background='#eeeeee'; elms[i].style.border='1px solid #aaaaaa'; }
}