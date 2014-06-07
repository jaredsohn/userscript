// ==UserScript==

// @name            BingSearch

// @namespace   bing

// @description Cycle through bing searches (1-30) for Rewards

// @include         http://www.bing.com/search?*

// @version         1.1

// ==/UserScript==


if(document.getElementById("sb_form_q").value!="NaN"&&document.getElementById("sb_form_q").value!="30")

{

    setTimeout("document.getElementById('sb_form_q').value=parseInt(document.getElementById('sb_form_q').value)+1;",1500);

    setTimeout("document.getElementById('sb_form_go').click();",150);

}


if(document.getElementById("sb_form_q").value=="NaN"){

    setTimeout("document.getElementById('sb_form_q').value=1",150);

    setTimeout("document.getElementById('sb_form_go').click();",150);

}