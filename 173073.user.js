// ==UserScript==
// @name              NVM_Blocker
// @namespace         http://gac3k.pl
// @description       Usuwa plusy od nvm_onion
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () 
{	
    $(document).ready(function($)
    {
        $('a:contains("nvm_onion")').hide();
    });
}

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);