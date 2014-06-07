// ==UserScript==
// @name          Make external links in Facebook link directly there
// @namespace     kokorosenshiForNow
// @description   This will remove the Facebook 'inbetween' page (http://www.facebook.com/l.php?u= ... )that it goes to when you click on an external link (that someone has posted for example), so it instead links you straight there, by removing the 'onclick' attribute that does this. Facebook possibly records the access of the link, so this is just an attempt to preserve some privacy or make it a bit faster going to these pages.
// @include       https://www.facebook.com/*
// @version       1.0
// @grant         none
// ==/UserScript==


var homeFeed= document.getElementById("home_stream"); //Locate the News Feed element to search
homeFeed.addEventListener('DOMNodeInserted', replaceLinks, false); //Everytime the News Feed changes, it will use the function 'replaceLinks()'

function replaceLinks() //This will find the external links in the News Feed and 'sanitise' them
{
///var Links = homeFeed.getElementsByTagName("a"); //'Links' is now an array of all link elements in the News Feed
var Links = document.getElementsByTagName("a"); ///'Links' is now an array of all link elements in the page
for (var i = 0; i < Links.length; i++) //for all the items in the array ...
{ 
    if (Links[i].hasAttribute("onclick")) //and if it has such an 'onclick' attribute to later change ...
    {
        var onclickValue = Links[i].getAttribute("onclick"); //Let 'onclickValue' be what 'onclick' contains
        if (onclickValue.contains("\/l.php?")) //if it has this string in it, its an 'inbetween' link used for external hyperlinks, so...
        { 
            //alert(onclickValue) //CHECK THE LINKS THAT ARE BEING CHANGED
            Links[i].removeAttribute("onclick") //this removes the 'onclick' attribute completely
            //alert(onclickValue) //CHECK THE LINKS AFTER CHANGE
        }
    }
}
//the following was planned to check the mouseover value, but I can just check the 'onclick' values and delete it huh...
///for (var i = 0; i < Links.length; i++) { 
///    var mouseoverValue = Links[i].getAttribute("onmouseover"); 
///    if (mouseoverValue) { 
///        alert(mouseoverValue)
///    }
///    }

}//closefunction