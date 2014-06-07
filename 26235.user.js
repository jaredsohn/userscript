// ==UserScript==
// @name           Site da TIM no firefox - Linux
// @namespace      tim
// @description    Permite abrir o site da tim no firefox
// @include        http://www.tim.com.br
// ==/UserScript==
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {

    var functionName = 'writeFlash';  
    if ( typeof functionName == 'string' && eval ( 'typeof ' + functionName) != 'function')  
    {  
       $('#flashcontent').css({'display':'none'}); 
    } else {  
      alert ( 'Função writeFlash indisponível.');  
    }  

      
    }
