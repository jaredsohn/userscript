// ==UserScript==
// @name           Mudar a Cor de Algumas propriedades do FaceBook
// @author         Cefa Schiati 
// @include        https*://*www.facebook.com*/
// @include        https*://*www.pt.facebook.com*/
// @include        https*://*www.facebook.com*/?ref=tn_tnmn
// @include        https*://*www.facebook.com*/?ref=tn_tnmn
// ==/UserScript==


function Alterar(){

document.getElementById('blueBar').style.backgroundColor=["black"];
document.getElementById('contentCol').style.backgroundColor=["black"];
document.getElementById('body').style.color=["blue"];
document.getElementById('leftCol').style.color=["red"];
document.getElementById('toolbarContainer').style.color=["black"];
}Alterar();