// ==UserScript==
// @name		   TesteX
// @include		http://trophymanager.com/players/*
// @exclude		http://trophymanager.com/players
// ==/UserScript==

// Não apagar
document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
};


document.getElementsByClassName("clear")[0].innerHTML = '<div class="clear"></div><center><tr id="trexma"><th>TrExMa</th><td>19.5</td></tr></center>';

