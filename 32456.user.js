// ==UserScript==
// @name           +6
// @namespace      http://pokeliga.com/*
// @include        http://pokeliga.com/articles/article.php?id=*
// @include        http://pokeliga.com/neo/neo.php?id=*
// @include        http://pokeliga.com/contests/contests.php?ans=*
// @include        http://pokeliga.com/fanart/art.php?pic=*
// ==/UserScript==

var qwer=document.getElementsByTagName("input");
var i=0;
while(qwer.item(i).value!=6)
{
	i++;
}

var br=document.createElement("br");
var text=document.createTextNode(" (!!!SUPER!!!) ");
var input=document.createElement("input");
var bal=document.createElement("b");
var balText=document.createTextNode("+6");

bal.appendChild(balText);
input.setAttribute("type","radio");
input.setAttribute("name","rate");
input.setAttribute("value","6");
qwer.item(i).parentNode.insertBefore(text,qwer.item(i).nextSibling.nextSibling.nextSibling);
qwer.item(i).parentNode.insertBefore(bal,qwer.item(i).nextSibling.nextSibling.nextSibling);
qwer.item(i).parentNode.insertBefore(input,qwer.item(i).nextSibling.nextSibling.nextSibling);
qwer.item(i).parentNode.insertBefore(br,qwer.item(i).nextSibling.nextSibling.nextSibling);
