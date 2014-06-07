// ==UserScript==
// @name           Steam game search link fixer
// @namespace      bmeakings
// @description    Allows you to open links in a new tab by turning them into normal links
// @include        http://store.steampowered.com/search/*
// ==/UserScript==

/*
  By default, this script will get rid of the behaviour where clicking on the row will
  navigate to the game page via JavaScript. To restore it, set killJSLink to false.
*/
var killJSLink = true;

// ----------------------------------------------------------------------

var gameListItem = document.getElementsByTagName("div");

for (var i = 0; i < gameListItem.length; i++)
{
  if (gameListItem[i].className == "global_area_tabs_item")
  {
    var row = gameListItem[i];

    var linkURL = row.getAttribute("onclick");
    
    if (killJSLink)
    {
      row.setAttribute("onclick","");
      row.style.cursor = "default";
    }

    var gameName = row.getElementsByTagName("h3")[0];

    var newLink = document.createElement("a");
    newLink.innerHTML = gameName.innerHTML;
    newLink.style.fontSize = "100%";
    newLink.style.cursor = "pointer";
    newLink.setAttribute("href",linkURL.substring(15,(linkURL.length - 1)));
    gameName.innerHTML = "";
    gameName.appendChild(newLink);
  }
}