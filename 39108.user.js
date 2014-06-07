// ==UserScript==
// @name           XN Tool Bar
// @namespace      http://s15.zetaboards.com/thegraphicsforum/
// @description    Adds a toolbar at the top of every XN page
// @include        http://www.xboxnation.net/*
// ==/UserScript==

var logo = document.createElement("div");
logo.innerHTML = '<div id="tool" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: #3F9317; background-color: #DADADA;"> ' +
    '<table width="100%"><tr><td><p style="margin: 2px 0 1px 0;"> ' +
    'XN Toolbar: <a href="http://tinyurl.com/7uhueu">Edit Signature</a> | <a href="http://www.xboxnation.net/forums/profile.php?do=editprofile">Edit Profile</a> | <a href="http://www.xboxnation.net/forums/groups/">Social Groups</a> | <a href="http://www.xboxnation.net/forums/payments.php">Become a Sponsor!</a> ' +
    '</td> ' +
    '<td><div align="right"><a href="http://www.xboxnation.net/forums/#announcements-introductions">News & Intros</a> | <a href="http://www.xboxnation.net/forums/#xbox-gaming">Xbox Gaming</a> | <a href="http://www.xboxnation.net/forums/#games">Games</a> | <a href="http://www.xboxnation.net/forums/#general-discussion-chat">General</a></div> ' +
    '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);