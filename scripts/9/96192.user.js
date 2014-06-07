// ==UserScript==
// @name           Molten Vote page relay out.
// @namespace      votescripts
// @description    This is to relay out the vote page so that iMacros will work right on it.
// @version        0.1.3
// @include        https://www.molten-wow.com/account/vote/#content
// @include	   https://www.molten-wow.com/account/vote/
// @require        http://sizzlemctwizzle.com/updater.php?id=96192
// ==/UserScript==

function convert(){
  var f, i, imgUrl, url;
  // Get node list of <form> elements in #content
  f = document.getElementById("content").getElementsByTagName("form");
  // Iterate through the forms from last to first (since we are blowing them away)
  for (i=f.length-1; i>=0; i--){
    // extract image file name
    imgUrl = f[i].getElementsByTagName("input")[1].getAttribute("src");
    // Clear any previously set url
    url = "";
    // Compare image names without the path to known images names, if found, set the url
    switch (imgUrl.substr(imgUrl.lastIndexOf("/")+1)){
      case "xtop100.gif":
        url = "http://www.xtremetop100.com/in.php?site=1132296123";
        break;
      case "arenatop100.gif":
        url = "http://wow.top100arena.com/in.asp?id=44178";
        break;
      case "wowtop200.gif":
        url = "http://www.gtop100.com/in.php?site=41841";
        break;
      case "gtop100.gif":
        url = "http://www.gtop100.com/in.php?site=41841";
        break;
      case "mmotop.gif":
        url = "http://www.mmorpgtoplist.com/in.php?site=27375";
        break;
      default:
        // No match, do nothing
    }
    // If a url was set, replace the form with a link
    if (url != ""){
      f[i].parentNode.innerHTML = '<a href="' + url + '" target="_blank" class="account_links"><img src="' + imgUrl + '" border="0" /></a>';
    }
  }
}