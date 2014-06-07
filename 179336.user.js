// ==UserScript==
// @name        MGExp Ignore User
// @namespace   http://localhost
// @description Hides posts on MGExp by given user(s)
// @include     http://www.mgexp.com/phorum/*
// @version     1
// @grant       none
// ==/UserScript==

var blockedUsers = new Array();

blockedUsers[0] = "wyatt";
blockedUsers[1] = "AzMarc";

var postArray = document.getElementsByClassName("message");
var aArray;
var i;
var x;
var y;
var alignCheck;
var currUserName;
var classCheck;


if (window.location.pathname.indexOf("read.php") != -1)
    {
    for (i = 0; i < postArray.length; i++)
        {
        aArray = postArray[i].getElementsByTagName("a");

        for (x = 0; x < aArray.length; x++)
            {
            currUserName = aArray[x].innerHTML;

            for (y = 0; y < blockedUsers.length; y++) 
                {
                if (blockedUsers[y].toUpperCase() == currUserName.toUpperCase())
                    {
                    postArray[i].style.display = "none";
                    }
                }
            }
        }
    }
    
    