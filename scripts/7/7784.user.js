// ==UserScript==
// @name         Iwiw Reklammentesito
// @namespace    http://szb640.atw.hu
// @description  Kikapcsolja az Iwiw reklamokat
// @author       SzB640 (szb640@freemail.hu)
// @include      http://iwiw.hu/*
// ==/UserScript==

var styleind=document.styleSheets.length;
var stylecalc=0;
var s=document.createElement("style");
document.getElementsByTagName("head")[0].appendChild(s);
function addcss(name,value) //CSS hozzáadása (név/tartalom)
{
document.styleSheets[styleind].insertRule(name+"{"+value+"}",stylecalc);
stylecalc++;
}
function remtag(name,class)
{
var tmp=document.getElementsByTagName(name);
for(var i=0;i<tmp.length;i++)
{
if(tmp[i].className==class)
{
tmp[i].style.display="none";
}
}
}
addcss("#layout-table .banner_top","display:none;");
addcss(".banner_120","display:none;");
addcss(".banner_center","display:none;");
remtag("div","banner_top");
var tmp1=document.getElementById("left").childNodes;
for(var i=1;i<tmp1.length;i++)
{
tmp1[i].style.display="none";
}