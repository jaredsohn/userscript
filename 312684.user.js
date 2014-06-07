// ==UserScript==
// @name       UNSC WARFARE MENU SPACING
// @namespace  http://www.armorwatcher.com/
// @version    0.1
// @description  Meh, I don't like describing stuff
// @include      http://unscwarfare.com/*
// @include      http://www.unscwarfare.com/*
// @copyright  2012+, Caspar Neervoort (AssaultCommand)
// ==/UserScript==

    for (var i=0; i<document.styleSheets.length;i++) //Loop through all styles 
    {
        //Try add rule
        try 
        { 
            document.styleSheets[i].insertRule("nav li"+ ' {'+"margin-right"+':'+"33px"+'}', document.styleSheets[i].cssRules.length);
        } 
        catch(err) 
        {
            try 
            { 
                document.styleSheets[i].addRule("nav li", "margin-right"+':'+"33px");
            } catch(err) 
            {}
        }//IE
    }