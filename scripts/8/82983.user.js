// ==UserScript==
// @name           Fix Pokemons
// @namespace      Pokemons
// @description    Fixes the pokemon table to look pretty
// @include        http://www.500mb.us/pkm.php
// ==/UserScript==

var PrettyStyles = "#table3{margin-top:20px;}#table4{margin-bottom:20px;}*    {    	padding:0;    	margin:0;    font-family:arial;}    table.ffu    {    	border-collapse:collapse; font-size:12px;    }    table.ffu tr td, table.ffu tr th    {    	border:solid 1px grey;    	padding:2px;    }    .hp    {    	background-color:#FF5959;    }    .hp th    {    	background-color:#FF0000;    }        .attack    {    	background-color:#F5AC78;    }    .attack th    {    	background-color:#F08030;    }        .attack    {    	background-color:#F5AC78;    }    .attack th    {    	background-color:#F08030;    }        .defense    {    	background-color:#FAE078;    }    .defense th    {    	background-color:#F8D030;    }        .spatk    {    	background-color:#9DB7F5;    }    .spatk th    {    	background-color:#6890F0;    }        .spdef    {    	background-color:#A7DB8D;    }    .spdef th    {    	background-color:#78C850;    }    .speed    {    	background-color:#FA92B2;    }    .speed th    {    	background-color:#F85888;    }    ";

GM_addStyle(PrettyStyles);

var $;

// Add jQuery
(function() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {

    var tables = $("form[name=PokeStats] table");
    
    tables.addClass("ffu").removeAttr("border");

    $(tables.get(0)).attr("id", "table1");
    $(tables.get(1)).attr("id", "table2");
    $(tables.get(2)).attr("id", "table3");
    $(tables.get(3)).attr("id", "table4");

    //Removes the two additional th's that make the table look weird
    $("#table1").children().children().first().children().last().detach();
    $("#table1").children().children().first().children().last().detach()

    //Removes the top row on the second table that is empty
    $("#table2").children().children().first().detach();

    //adds pretty colors to the table
    $("#table1").children().children().first().next().addClass("hp").next().addClass("attack").next().addClass("defense").next().addClass("spatk").next().addClass("spdef").next().addClass("speed");
    
}