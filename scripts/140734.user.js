// ==UserScript==

// @name Facebook Auto 90

// @namespace [050183]-[FBAuto90]-v0.6.0

// @description Refresh FB Home page every 90 seconds

// @include http://www.facebook.com/?ref=tn_tnmn

// @CodedBy Hendra Bowo

// @Website http://www.facebook.com/hendrabowo

// @UserScripts http://userscripts.org/users/479114

// @license Free

// @version 0.6.0

// ==/UserScript==

 

    //===[Settings]===\\

        var StRefTime = '90';  //==[Set time by seconds]

    //===[/Settings]===\\

 

    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);