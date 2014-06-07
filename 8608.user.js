// ==UserScript==
// @name           Auto Signature
// @namespace      http://www.orkut.com/Community.aspx?cmm=20870730
// @description    Auto signature - Via Orkut Plus!
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author        Nikhilesh Garud - http://www.orkut.com/Profile.aspx?uid=16066078232168479821 
// ==/UserScript==

var signature = "\n\n\n\n[b]\n---------------------\n [b][red]Best Orkut Tips and Tricks @[/red][/b][blue][b] www&#46;orkutplus&#46;blogspot&#46;com\n\---------------------[/blue][/b]\n\n";
 
function lalala () {
document.getElementsByTagName("textarea").item(0).value = "[/i][/u][/b]\n\n\n" + signature ; 
clearInterval (lalalaid) 
}
lalalaid = setInterval (lalala,2000)