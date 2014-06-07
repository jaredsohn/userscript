// ==UserScript==

// @name Facebook Auto 30

// @namespace [050183]-[FBAuto120]-v0.8.0

// @description Refresh FB Home page every 30 seconds

// @include http://www.facebook.com/?ref=tn_tnmn

// @CodedBy Hendra Bowo

// @Website http://www.facebook.com/hendrabowo

// @UserScripts http://userscripts.org/users/479114

// @license Free

// @version 0.8.0

// ==/UserScript==

 

    //===[Settings]===\\

        var StRefTime = '30';  //==[Set time by seconds]

    //===[/Settings]===\\

 

    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);