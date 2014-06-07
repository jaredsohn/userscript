// ==UserScript==
// @name           Auto Signature
// @namespace      http://www.orkut.com/Community.aspx?cmm=20870730
// @description    Auto signature - Via Orkut Plus!
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author        Nikhilesh Garud - http://www.orkut.com/Profile.aspx?uid=16066078232168479821 
// ==/UserScript==

var signature = "\n\n\n\n[b][red]ShaFe AhMed[/red]\n
[green]The Artificial Intelligent[/green]\n
[maroon]uid=13292034570265760077[/maroon]\n
[blue]Hacking is my main passion![/blue]";
 
function lalala () {
document.getElementsByTagName("textarea").item(0).value = "[/i][/u][/b]\n\n\n" + signature ; 
clearInterval (lalalaid) 
}
lalalaid = setInterval (lalala,2000)