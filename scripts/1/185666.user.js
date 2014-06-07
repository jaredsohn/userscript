// ==UserScript==
// @name        Shoutbox infraction by kLeptO
// @namespace   sbinfractbutton
// @description Adds user infraction button next to the ban and prune buttons.
// @include     *.rune-server.org/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js 
// @grant       none
// ==/UserScript==
InfernoShoutbox.update_shouts_orig = InfernoShoutbox.update_shouts;
InfernoShoutbox.update_shouts = function(shouts) {
    InfernoShoutbox.update_shouts_orig(shouts);
    var shouts = document.getElementById('shoutbox_frame').getElementsByTagName('div');
    $.each(shouts, function(index, parent) {
        $.each(parent.getElementsByTagName('a'), function(i, element) {
            var onclick = new String(element.onclick);
            var index = onclick.indexOf('open_pm_tab');
            if (index != -1) {
                $(parent).prepend('<a href="http://www.rune-server.org/infraction.php?do=report&u=' + onclick.substring(index + 16).split('\'')[0] + '" target="blank"><img src="http://i.imgur.com/iDqdM.png" /></a>');
                return false;
            }
        });
    });
}