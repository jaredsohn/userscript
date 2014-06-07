// ==UserScript==
// @name           Auto Signature
// @namespace      http://www.orkut.com/Community.aspx?cmm=20870730
// @description    Auto signature ... first
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author         nobody - 
// ==/UserScript==

var signature = "[b][red]◥◣◢  ̲̅Я̲̅υ̲̅Թ̲̅є̲̅ร̲̅н̲̅ ◣◢◤[b][/red]\n";
 
function lalala () {
document.getElementsByTagName("textarea").item(0).value = "[/i][/u][/b]\n\n\n" + signature ; 
clearInterval (lalalaid) 
}
lalalaid = setInterval (lalala,2000)