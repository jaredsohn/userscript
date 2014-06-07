// ==UserScript==
// @name        KoL_Forum_Link
// @description Greasemonkey script for adding the missing link to the KoL forums
// @include     *www.kingdomofloathing.com/topmenu.php
// @include     *www.kingdomofloathing.com/login*
// @include     *127.0.0.1:60080/topmenu.php
// @version     0.2
// @grant       none
// @author      Mr_Crac (#689692)
// ==/UserScript==

var searchstring_topmenu   = 'donate';
var searchstring_loginpage = 'Create a Character';
var anchors                = document.getElementsByTagName('a');
var forumlink              = document.createElement('a');
forumlink.href             = 'http://forums.kingdomofloathing.com/';
forumlink.target           = '_blank';

for (i=0; i<anchors.length; i++)
{
    if (anchors[i].innerHTML == searchstring_topmenu) 
    {
        var space           = document.createTextNode(' ');
        forumlink.innerHTML = 'forums';
        
        anchors[i].parentNode.insertBefore(forumlink, anchors[i].nextSibling);
        anchors[i].parentNode.insertBefore(space, forumlink);
        break;
    }
    else if (anchors[i].innerHTML == searchstring_loginpage)
    {
        var double_colon       = document.createElement('b');
        double_colon.innerHTML = ' :: ';
        forumlink.innerHTML    = 'Forums';
        
        anchors[i].parentNode.insertBefore(forumlink, anchors[i].nextSibling);
        anchors[i].parentNode.insertBefore(double_colon, forumlink);
        break;
    }
}
