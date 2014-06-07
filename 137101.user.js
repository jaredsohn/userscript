// ==UserScript==
// @id             powdertoy.co.uk-3e072605-ff8c-49d1-9c06-56bd6d64378b@boxmein.web44.net
// @name           TPT ID to ptsave link
// @version        1.0
// @namespace      boxmein.web44.net
// @author         boxmein
// @description    Adds a ptsave:ID link on next to the title on Powder Toy saves.
// @include        http://powdertoy.co.uk/Browse/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

//Requires JQuery. Chrome's GreaseMonkey has @require blocked, might not work.
var create = function() {
    $("#genLink").remove(); //Removes first instance if any.
    address = window.location.href;
    var $cl = $(".Title").eq(0);
    var id = address.toString().match(/[0-9]+/);
    if(id.length == 0) alert("Didn't get an ID. \n Address: "+address);
    $cl.append(
        $("<a href=\"ptsave:" + id + "\" id=\"genLink\" style=\"margin-left: 20px;\">(Open TPT)</a>")
    ).fadeIn("fast");
};

create();