// ==UserScript==
// @name           Auto Signature
// @namespace      http://www.orkut.com/Community.aspx?cmm=27696295
// @description    Auto signature
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author         c0ld sn1ff3r - http://www.orkut.com/Profile.aspx?uid=13800601886784677788
// ==/UserScript==

var signature = "[b][red]c0ld sn1ff3r[b][/red]\n";
 
function lalala () {
document.getElementsByTagName("textarea").item(0).value = "[/i][/u][/b]\n\n\n" + signature ; 
clearInterval (lalalaid) 
}
lalalaid = setInterval (lalala,2000)