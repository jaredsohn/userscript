// ==UserScript==
// @name           Liquibet
// @description    Makes the open Liquibet number really large so that you don't miss them
// @include        *teamliquid.net*
// ==/UserScript==



document.getElementsByClassName = function(cl) 
{
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) 
    {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
}; 

var elements = document.getElementsByClassName('openlb');

for(var i=0;i<elements.length;i++) 
{
    elements[i].style.fontSize = 40+"px"

}