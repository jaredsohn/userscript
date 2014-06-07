// ==UserScript==
// @name        Facepunch GD Forum Sort Fix
// @description Auto redirect GD to Sort by Last Post Descending
// @include     http://facepunch.com/forumdisplay.php?f=6
// ==/UserScript==
    if(content.document.location == "http://facepunch.com/forumdisplay.php?f=6"){
            window.location.replace("http://facepunch.com/forumdisplay.php?f=6&sort=lastpost&order=desc")
}