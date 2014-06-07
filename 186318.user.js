// ==UserScript==
// @name           Fitnesse Auto Format
// @description    Formatting the fitnesse pages when the page saves
// @author         Jeremy Carlsten
// @include        http://*FrontPage*
// @version        1.0
// ==/UserScript==

var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function(){
    $formatButton = $(".edit_buttons input[value='Format']");
    $submitButton = $(".edit_buttons input[value='Save']");
    $submitButton.click(function(){
        $formatButton.trigger('click');
    });
});
