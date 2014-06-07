  // ==UserScript==
// @name        go back
// @description Redirects go back
// @include     http://ultoo.com/msgSent.php?*
// @version     1
// ==/UserScript==
    if(content.document.location == "http://ultoo.com/msgSent.php"){
            window.location.replace("http://ultoo.com/home.php")

}