// ==UserScript==

// @name Facebook Auto 60

// @namespace [050183]-[FBAuto120]-v0.7.0

// @description Refresh FB Home page every 60 seconds

// @include http://www.facebook.com/?ref=tn_tnmn

// @CodedBy Hendra Bowo

// @Website http://www.facebook.com/hendrabowo

// @UserScripts http://userscripts.org/users/479114

// @license Free

// @version 0.7.0

// ==/UserScript==

 

    //===[Settings]===\\

        var StRefTime = '60';  //==[Set time by seconds]

    //===[/Settings]===\\

 

    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);