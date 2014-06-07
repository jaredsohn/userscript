// ==UserScript==
// @name           rant Hide
// @namespace      craigslist
// @include        http://*.craigslist.org/*
// ==/UserScript==

//Hides rants and raves from personals
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery === 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        //alert($); // check if the dollar (jquery) function works
    }

try{
$(document).ready(function () {
    var small = $('p').find('.gc');
   $.each(small, function (_, cat) {

        if($(cat).text() === 'rants & raves') {

            $(cat).parent('p').remove();

        }

    });
});
} catch (err){ 
//if(err) {console.log(err);}
}