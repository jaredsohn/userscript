// ==UserScript==
// @name        Antiquirk autorefresher per Forum HTML.it
// @namespace   http://www.mitalia.net/
// @description Effettua un refresh automatico se le pagine di visualizzazione forum/thread decidono che non hanno voglia di lavorare
// @include     http://forum.html.it/forum/forumdisplay.php*
// @include     http://forum.html.it/forum/editpost.php*
// @include     http://forum.html.it/forum/showthread.php*
// @include     http://forum.html.it/forum/newreply.php*
// @include     http://forum.html.it/forum/index.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.3
// ==/UserScript==

function getCookie(sKey)
{
    return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function main()
{
    var haveToRefresh=false;
    var replacementHTML='Il forum fa le bizze, aspetta che faccio qualche refresh... <img src="http://i.imgur.com/iLEA20P.gif" alt="Spinner" id="antiquirk_spinner">';

    if (document.title=="HTML.it forum | HTML.it forum")
    {
        if($("b:contains(Messaggio dal forum)").length)
        {
            var span=$("span:contains(Non hai specificato nessun)");
            if(span.length)
            {
                span.html(replacementHTML);
                haveToRefresh=true;
            }
        }
    }
    if (document.title=="HTML.it forum")
    {
        if(!getCookie("bbpassword"))
            return;
        var tdWelcome=$("td.welcome_table");
        if(tdWelcome.length)
        {
            tdWelcome.html('<span class="welcome_txt">'+replacementHTML+'</span>');
            haveToRefresh=true;
        }
    }

    if(haveToRefresh)
    {
        $("#antiquirk_spinner").load(function() {
            setTimeout(function(){document.location.reload()}, 250);
        });
    }
}

main();
