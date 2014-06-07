// ==UserScript==
// @name            CrackHackForum - Tools
// @namespace       Pl0xd/tools
// @description     Removes the online list from Index page
// @author          Pl0xd
// @include         http://crackhackforum.com/*
// @include         http://www.crackhackforum.com/*
// @version         1.0
// ==/UserScript==


document.getElementById('navcontainer').innerHTML='<ul id="navlist"><li id="active"><form method=\"post\" action=\"search.php\"><input type=\"hidden\" name=\"action\" value=\"do_search\" /><input type=\"text\" class=\"textbox\" name=\"keywords\" size=\"31\" maxlength=\"250\" value=\"Search...\" /><input type=\"hidden\" name=\"postthread\" value=\"1\" /></li><li><a href="http://www.crackhackforum.com/index.php/shoutbox" onclick="window.open(\'http://www.crackhackforum.com/index.php/shoutbox\',\'popup\',\'width=840,height=420,scrollbars=no,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0\'); return false">Open Shoutbox</a></li><li><a href="http://www.crackhackforum.com/thread-217704.html" id="current">Download Shoutbox Popup Plugin</a></li><li><a href=\'#register-box\' class=\'register-window\'>Upload Images & Files</a><div id=\'register-box\' class=\'register-popup\'><iframe src=\'http://skidpoints.net\' scrolling=\'no\' height=\'500\' width=\'500\' frameborder=\'0\'></iframe> </div></li><li><a href="http://www.crackhackforum.com/usercp.php" id="current">User CP</a></li><li></li><li></li><li><a href="http://www.crackhackforum.com/search.php?action=getnew">View New Posts</a></li><li><a href="http://www.crackhackforum.com/search.php?action=getdaily">View Today\'s Posts</a></li><li><a href="http://www.crackhackforum.com/private.php">Private Messages</a></li><li><a href="http://www.crackhackforum.com/thread-217703.html">Check For Updates</a></li><li><a href="http://www.crackhackforum.com/member.php?action=logout&amp;logoutkey=9d2d757a5675fc0ddd7fbdc071774060">Log Out</a></li></ul>';

var regex = /http:\/\/www.crackhackforum.com\/images\/t3\/upfooter.png" alt="Top" title="Top"/;
var revised = "\"/></a></span>";
document.getElementById('footerSlideText').innerHTML= document.getElementById('footerSlideText').innerHTML.replace(regex,revised);