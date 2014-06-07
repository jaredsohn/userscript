  // ==UserScript==
// @name        go back to
// @description Redirects go back to
// @include     http://ultoo.com/msgSent.php?*
// @version     1
// ==/UserScript==
    if(content.document.location == "http://ultoo.com/msgSent.php"){
            window.location.replace("http://ultoo.com/home.php")
}