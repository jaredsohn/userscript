// ==UserScript==

// @name Facebook Auto Refresh

// @namespace [050183]-[FBAutoRefresh]-v1.0.0

// @description This is a simple script, it will refresh the FB every x seconds

// @include http://www.facebook.com*

// @CodedBy Hendra Bowo

// @Website http://www.facebook.com/hendrabowo

// @UserScripts none

// @license Free

// @version 1.0.0

// ==/UserScript==

 

    //===[Settings]===\\

        var StRefTime = '120';  //==[Set time by seconds]

    //===[/Settings]===\\

 

    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);