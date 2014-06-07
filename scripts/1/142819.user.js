// ==UserScript==

// @name Facebook Auto 45

// @namespace [050183]-[FBAuto120]-v0.9.0

// @description Refresh FB Home page every 45 seconds

// @include http://www.facebook.com/?ref=tn_tnmn

// @CodedBy Hendra Bowo

// @Website http://www.facebook.com/hendrabowo

// @UserScripts http://userscripts.org/users/479114

// @license Free

// @version 0.9.0

// ==/UserScript==

 

    //===[Settings]===\\

        var StRefTime = '45';  //==[Set time by seconds]

    //===[/Settings]===\\

 

    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);