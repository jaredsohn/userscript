// ==UserScript==
// @name            eishockeyforum Moderator-B-Gone
// @author          Elbart
// @version         0.6
// @homepage       http://userscripts.org/scripts/show/156480
// @updateURL      https://userscripts.org/scripts/source/156480.user.js
// @description     Macht auch den nervigsten Moderatoren den Garaus.
// @include         http://*.eishockeyforum.com/board*
// @include         https://*.eishockeyforum.com/board*
// @include         http://eishockeyforum.com/board*
// @include         https://eishockeyforum.com/board*

// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// Basiert auf http://stackoverflow.com/questions/4733910/greasemonkey-question-hiding-divs-that-dont-contain-specific-text/4734281#4734281

$(document).ready(Greasemonkey_main);

function Greasemonkey_main()
{
 //   alert("Do you see this alert?");
    var itemDivs = $("div.messageAuthor");
    var itemDivsQuote = $("div.quoteHeader");
//==============================================================================
    var moderatoren = /\bWiPe\b|\biceman\b|\bPowerhockey\b|\bMalone\b/i;
    var spezialisten = /\bEisprinz\ \-\ das\ Original\b|\bMacStasy\b|\bHerby\ \#30\b/i;

            // Add or remove usernames here
            // Neue Usernamen hier einfügen oder löschen
            
            // ACHTUNG: Auf genaue Groß- und Kleinschreibung achten!
            // Falls der Username ein Leerzeichen oder andere Sonderzeichen (', #) enthält, MUSS diesem ein 
            // Backslash ("\") vorangestellt werden, z.B. \bHerby\ \#30\b
            
            // Außerdem muss sich vor und nach dem Namen "\b" befinden und
            // zwischen den verschiedenen Einträgen eine Pipe ("|").
            
            // Vorlage:
            // |\bName\b
            // |\bName\ Name\b
//==============================================================================
    itemDivs.each 
    (
        function()
        {
            var itemDiv = $(this);
            if (moderatoren.test(itemDiv.text()))
                itemDiv.parent().parent().css('display','none');
        } 
    );
    itemDivsQuote.each
    (
        function()
        {
            var itemDiv = $(this);
            if (moderatoren.test(itemDiv.text()) || spezialisten.test(itemDiv.text()))
                itemDiv.parent().css('display','none');
        }
    );
}



