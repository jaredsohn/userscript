// ==UserScript==
// @name        moderatorBak
// @namespace   C:\Users\me\Desktop\WolfTeam\GS\giveitback.js
// @include     http://www.aeriagames.com/forums/pl/viewtopic.php?*
// @version     1
// ==/UserScript==

console.log('This script grants no special privileges, so it runs without security limitations.');

var elements = document.getElementsByClassName('topicThreads');


var temp1 = document.getElementsByTagName('form');
var temp2 = temp1[1].getAttribute('action');
var temp3 = temp2.split('=');
var tid = temp3[1];
var divy = '<li><a href="http://www.aeriagames.com/forums/pl/modcp.php?mode=delete&t='+ tid +'" title="Usuń temat"><strong>Usuń temat</strong></a></li>';
var elements2 = document.getElementsByClassName('mainTitleContainer');


for (var i=0;i<2;i++)
{
    var tmppp = elements2[i].getElementsByClassName('miniLinks');
    tmppp[0].innerHTML =divy + tmppp[0].innerHTML;
}


for (var i in elements)
{
	var id = elements[i].id;
	if (id!="")
	{
	    var div = '<li><a href="posting.php?mode=delete&amp;p='+ id +'" title="Usuń"><strong>Usuń</strong></a></li>';
	    var tmp=(elements[i].getElementsByClassName('editWrapper'))
	    var tmpp = tmp[0].getElementsByClassName('miniLinks   show  show ');
        tmpp[0].innerHTML =div + tmpp[0].innerHTML;
        //alert("This object's ID attribute is set to \"" + id + "\"."); 
	}
}


