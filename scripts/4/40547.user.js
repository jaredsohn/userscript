// ==UserScript==
// @name           Aimbot
// @description    Marks threads ready to be snyped
// @include        http://forums.somethingawful.com/forumdisplay.php*
// ==/UserScript==

// copied this function from some google search i did
// not crediting the author hell yeah!!!!
function getElementsByStyleClass (className) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

GM_addStyle("#forum td.snype { background-color:red !important; text-align:center !important}");
GM_addStyle("#forum td.almostsnype { background-color:yellow !important; text-align:center !important}");
var repliesCells = getElementsByStyleClass ("replies")
for (var i=1; i<repliesCells.length; i++) {
    var str = repliesCells[i].innerHTML;
    var numReplies = repliesCells[i].firstChild.innerHTML;
    
    if ((numReplies ) % 40 == 39)
    {
        var threadNumber = str.substring(str.indexOf("who(") + 4, str.indexOf(")"));
        repliesCells[i].className = "snype";
        repliesCells[i].innerHTML = "<a href=\"http://forums.somethingawful.com/newreply.php?s=&action=newreply&threadid=" + threadNumber + "\">" + numReplies + "</a>" + str.substring(str.indexOf("</a>") + 4);
    }
    if ((numReplies ) % 40 == 38)
    {
        var threadNumber = str.substring(str.indexOf("who(") + 4, str.indexOf(")"));
        repliesCells[i].className = "almostsnype";
        repliesCells[i].innerHTML = "<a href=\"http://forums.somethingawful.com/newreply.php?s=&action=newreply&threadid=" + threadNumber + "\">" + numReplies + "</a>" + str.substring(str.indexOf("</a>") + 4);
    }
}







//:synpa:
