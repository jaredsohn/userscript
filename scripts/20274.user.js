// ==UserScript==
// @name           Auto Signature
// @namespace      http://www.orkut.com/Community.aspx?cmm=42787393
// @description    Auto signature ... bla bla bla
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author        NAYAB TAHIR - http://www.orkut.com/Profile.aspx?uid=11869396065109614733 
// ==/UserScript==

var signature = "[b][gray]●•══Dɘvιl'Ƨ WǭʁkƧhǭp══•●[b][/gray]\n";
 
function lalala () {
document.getElementsByTagName("textarea").item(0).value = "[/i][/u][/b]\n\n\n" + signature ; 
clearInterval (lalalaid) 
}
lalalaid = setInterval (lalala,2000)