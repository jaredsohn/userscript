// ==UserScript==
// @name           Narutobase.net Video Crap Remover
// @namespace      Liboicl
// @description    Removes all the crap from around the videos on Narutobase.net at the click of a button.
// @include        *narutobase.net*
// ==/UserScript==
if(document.title.match("Crap Removed!") != "Crap Removed"){
var a = document.getElementsByTagName('object')[0];
var newdiv = document.createElement('div');
newdiv.setAttribute('id', 'Crap Remover1');
newdiv.innerHTML = '<input type="button" onClick="var a = document.getElementsByTagName(\'object\')[0];var b = document.getElementById(\'Crap Remover1\');b.parentNode.removeChild(b);document.body.innerHTML=a.innerHTML;document.title=document.title + \' (Crap Removed!)\'" value="Remove Crap!">';
var newdiv2 = document.createElement('div');
newdiv2.setAttribute('id', 'Crap Remover2');
newdiv2.innerHTML = '<input type="button" onClick="var a = document.getElementsByTagName(\'embed\')[0];document.body.innerHTML=a.parentNode.innerHTML;document.title=document.title + \' (Crap Removed!)\'" value="Remove Crap!">';
if(a === undefined){
b = document.getElementsByTagName('embed');
b[0].parentNode.insertBefore(newdiv2, b[0]);
}else{
a.appendChild(newdiv);
}
}