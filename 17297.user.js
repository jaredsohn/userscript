// ==UserScript==
// @name           Auto Signature
// @namespace      http://www.orkut.com/Community.aspx?cmm=20870730
// @description    Auto signature ... bla bla bla
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author        Nikhilesh Garud - http://www.orkut.com/Profile.aspx?uid=16066078232168479821 
// ==/UserScript==

var signature = "[red]mSg:[/red][teal]reDialing....[/teal];
 

function lalala () {
document.getElementsByTagName("textarea").item(0).value = "[b][teal]Scanning_-_-_-_-_-_-_-_-_-_-_-_-_[/teal][red][i]Disconnecting.....[/red][/i] " + signature ; 
clearInterval (lalalaid)
}
lalalaid = setInterval (lalala,2000)