// ==UserScript==
// @name Warforum.cz 1.2
// @author LJK
// @version 1.2
// @include *warforum.cz*
// ==/UserScript==




    function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
    if(re.test(els[i].className))a.push(els[i]);
    return a;
    }




var pocet = getElementsByClassName("genmed").length;
var podretezec = "Stahuj za jeden kredit";

for(i=0;i<=pocet;i++){

if (getElementsByClassName("genmed")[i].innerHTML.indexOf(podretezec) > 0) {getElementsByClassName("genmed")[i].innerHTML = ""}


}






















