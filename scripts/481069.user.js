// ==UserScript==
// @name        [TS] Voltaire Network Language Picker
// @namespace   TS:Voltaire Network
// @description Check Language(s) to display (Default English only)
// @include     http://www.voltairenet.org/*
// @version     1.0.1
// @icon        data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAcp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/9DtsP/2fDz/9nw8//G6e3/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/kNTc/////////////////026xv8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/9zx9P////////////////+d2eD/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/0m4xf///////////9bv8v//////5/X3/x2nt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/+X1t7///////j8/f9Uvcn///////////9Ru8j/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/4vT2//////+85er/HKe3/+b19///////ndng/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/UbvI////////////dsnT/xynt/+g2uH//////+f19/8dp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/53Z4P///////f7+/zKvvv8cp7f/W7/L////////////Vr3J/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/x2nt//n9ff//////87s7/8cp7f/HKe3/yCouP/y+vv//////6Pb4v8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8lqrr/Z8TP/2fEz/9Gt8T/HKe3/xynt/8cp7f/Vr3J/2fEz/9Zvsr/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/HKe3/xynt/8cp7f/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
// ==/UserScript==

/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/481069

Search for  "[VYCS]" for variable you can set.

----------------------------------------------
    Version History
----------------------------------------------
1.0.1 (2014/04/24)
 - Initial release

**********************************************************************************************/
/* [VYCS] VARIABLE YOU CAN SET
**********************************************************************************************/
//GM_setValue("Languages", JSON.stringify(["en","es"])); //Languages English and Spanish
/* Language IDs
ar      عربي
en      English
es      Español
it      Italiano
fr      Français
pt      Português
ru      Pусский
de      Deutsch
fa      فارسى
el      ελληνικά
tr      Türkçe
hy      Armenian
*/
/*********************************************************************************************/

(function ()
{

    var langs = GM_getValue("Languages", JSON.stringify(["en"]));
    langs = JSON.parse(langs);

    var articles = document.querySelectorAll("div[class='marge'] > div[id^='art']");    
    for (var i = 0; i < articles.length; i++)
    {
        articles[i].style.display = "none";        
        for (var j = 0; j < langs.length; j++)
        {            
            var re = new RegExp(" " + langs[j],"gi");
            if (articles[i].className.match(re))
            {                
                articles[i].style.display = null;
                break;
            }
        }
    }
})();