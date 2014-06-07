// ==UserScript==
// @name           Codeforces problem's tags hider
// @description    Hide problem's tags
// @namespace      http://userscripts.org/users/lozephon
// @include        http://codeforces.*/contest/*/problem/*
// ==/UserScript==

var cl      = document.getElementsByClassName('roundbox sidebox')[3];
var parent  = cl.parentNode;
var chk     = document.createElement('a');
var txt     = document.createTextNode('Show tags');

var hide    = function() {
    if(document.getElementsByClassName('roundbox sidebox')[3].style.display != "none") {
        document.getElementsByClassName('roundbox sidebox')[3].style.display = "none";
        document.getElementById('Hide tags').childNodes[0].data = "Show tags";
    }
    else {
        document.getElementsByClassName('roundbox sidebox')[3].style.display = "block";
        document.getElementById('Hide tags').childNodes[0].data = "Hide tags";        
    }
   
    return;
};

chk.appendChild(txt);
chk.href = "#";
chk.id = "Hide tags";
chk.addEventListener("click", hide, false, true);

parent.insertBefore(chk, cl);

document.getElementsByClassName('roundbox sidebox')[3].style.display = "none";
//alert(1);