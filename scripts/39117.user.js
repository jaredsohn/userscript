// ==UserScript==
// @name           Drunken Gamers (DG) Tool Bar
// @namespace      Drunken Gamers
// @creater        Donnie Ng (A.K.A. Corvito)
// @description    Adds a toolbar at the top of every Drunken Gamers (DG) page with convenient links to popular areas of the site.
// @include        http://drunkengamers.org/*
// @include        http://drunkengamers.org/
// ==/UserScript==

// Creates Toolbar and sets Background and Text color
var logo = document.createElement("div");
logo.innerHTML = '<div id="tool" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: #FF0000; background-color: #ADD8E6;"> ' +
    '<table width="100%"><tr><td><p style="margin: 2px 0 1px 0;"> ' +

// Links on the toolbar are created here
    '<b>DG Toolbar:</b> <a href="http://drunkengamers.org/phpBB3/ucp.php?i=profile&mode=signature">Edit Signature</a> | <a href="http://drunkengamers.org/phpBB3/ucp.php?i=profile&mode=profile_info">Edit Profile</a> | <a href="http://drunkengamers.org/phpBB3/medals.php">Medals</a> ' +
    '</td> ' +
    '<td><div align="right"><a href="http://drunkengamers.org/">News & Intros</a> | <a href="http://drunkengamers.org/phpBB3/viewforum.php?f=14">Gaming</a> | <a href="http://drunkengamers.org/phpBB3/viewforum.php?f=22">General</a></div> ' +
    '</p></div>';

// Sets location of the toolbar
document.body.insertBefore(logo, document.body.firstChild);