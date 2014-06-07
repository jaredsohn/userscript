// ==UserScript==
// @name       Fight List Mod
// @version    0.2
// @description  Adds the list of levels to the bottom of the page, underneath all of the bots for that level.
// @match      http://bots4.net/fight*
// @copyright  2013+, Clay_Banger
// ==/UserScript==

if(document.title == "fight list - bots4") {
    //we are in the right place. 
    
    //get the current level we are looking at, so we can remove the link in the list of levels
    var lvl = document.getElementsByClassName("botrow")[0].getElementsByTagName("td")[1].getElementsByTagName("span")[1].innerHTML;
    
    //grab the list of levels from the top
    var h2s = document.getElementById("content").getElementsByTagName("h2");
    var ps = document.getElementById("content").getElementsByTagName("p");

	//remove the hyperlink
    ps[1].innerHTML = ps[1].innerHTML.replace(" <a href=\"/fight/" + lvl + "\">" + lvl + "</a>", lvl);
    
    //replace the current fight list with the modded content
    document.getElementById("content").innerHTML = document.getElementById("content").innerHTML.replace("<!-- End page-specific content -->", "<h2>" + h2s[1].innerHTML + "</h2><p>" + ps[1].innerHTML + "</p><!-- End page-specific content -->");
}