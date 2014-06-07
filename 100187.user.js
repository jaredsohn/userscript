// ==UserScript==
// @name            NYTimes Blog Ad Remover
// @include         http://www.example.com/en/forum/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready (Greasemonkey_main);

function Greasemonkey_main ()
{
    alert ("Do you see this alert?");

    var itemDivs    = $("div.entry-content");

    //--- Force blocks that contain "hrs" or "min" to block display, hide others.
    itemDivs. each 
    (
        function ()
        {
            var itemDiv = $(this);

            if (/\bmin\b|\bhrs\b/i.test (itemDiv.text()) )
                itemDiv.parent ().parent ().css ('display', 'block');
            else
                itemDiv.parent ().parent ().css ('display', 'none');
        } 
    );
}
