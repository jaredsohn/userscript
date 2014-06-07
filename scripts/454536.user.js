// ==UserScript==
// @name       CC Games together
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http*://www.conquerclub.com/forum/memberlist.php?mode=viewprofile&u=*
// @copyright  2012+, You
// ==/UserScript==

var u1=getUsername();
function createGamesTogether(){
    var d = document.getElementById("page-body");
    d = d.getElementsByTagName("dl")[1].children;
    var u2 = d[1].children[0].innerHTML;
    d[7].innerHTML+=' | <strong><a href="../player.php?mode=find&amp;submit=Search&amp;p1='+u2+'&amp;p2='+u1+'&amp;so=D">Show all games together</a></strong>'
    
}
function getUsername() {
    return encodeURI(/logout.php\">[^"\r\n]*\s<b>([^"\r\n]*)<\/b>/.exec(document.getElementById("leftColumn").innerHTML)[1]);
}
createGamesTogether();