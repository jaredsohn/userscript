// ==UserScript==
// @name           Liste des soldats (bis)
// @namespace      Ikariam
// @include        http://*.ikariam.*/*
// ==/UserScript==

var node = document.getElementById("GF_toolbar");
var node = node.childNodes[3];
var nodediv = document.createElement("li")
nodediv.setAttribute('id','lienmenu2');
node.appendChild(nodediv);
liste = document.getElementById('citySelect');
listeoption = liste.getElementsByTagName('option');
texte = "";
for(i=0;i<listeoption.length;i++)
{
texte += "&"+listeoption[i].value+"="+listeoption[i].innerHTML;
}
document.getElementById('lienmenu2').innerHTML="<a href='liste.php?nb="+listeoption.length+texte+"' onclick=''>Liste soldats</a>";