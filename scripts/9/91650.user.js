// ==UserScript==
// @name           The UltraLike
// @namespace      UltraLike
// @description    Ohhh, the ultralike.  So cold, so unmerciful.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

if(document.body != null)
{
    var activationPhrase = "38384040373937399897"; // Konami code
    var stringSoFar = "";
    document.addEventListener("keypress", function(e) {
        if(e.keyCode)
        {
            stringSoFar = stringSoFar + e.keyCode;
        } 
        if(e.charCode)
        {
            stringSoFar = stringSoFar + e.charCode;
        }
        if(activationPhrase.match(stringSoFar) == activationPhrase)
        {
            likeEverything();
            stringSoFar = "";
        }
        else if(activationPhrase.match(stringSoFar) == null)
        {
            stringSoFar = "";
        }
    }, true);
    function likeEverything()
    {
        var buttons = document.getElementsByTagName("button");
        var r = /^like/;
        for(i = 0; i < buttons.length; i++)
        {
            if(buttons[i].getAttribute("name") != null &&
                buttons[i].getAttribute("name").match(r) != null)
            {
                buttons[i].click();
            }
        }
    }
}
