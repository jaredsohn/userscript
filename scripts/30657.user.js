// ==UserScript==
// @name           RT Watchlist
// @namespace      http://www.jwvmods.com
// @description    Super CRAZY Awesome
// @include        http://*.roosterteeth.com/*
// @exclude        http://www.roosterteeth.com/members/index.php
// @exclude        http://www.roosterteeth.com/members/signin.php
// ==/UserScript==

if (document.getElementById('pageContent')){

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.roosterteeth.com/members/index.php',
        onload: function(responseDetails) {
        
            var rt = responseDetails.responseText;

            if(!rt.match('You have no new alerts')){

                var s = rt.split("id='Watching'>")[1].split("</div>")[0];
                var nT = document.createElement('table');
                nT.setAttribute('width','100%');
                nT.innerHTML = "<div id='Watching'>"+s+"</div>";
                var par = document.getElementById('shadow3');                    
                par.insertBefore(nT, par.firstChild);
            
            }
        
        },
        onerror: function(responseDetails) {
        
            alert('summin broke '+responseDetails.responseText);
        
        }    
    });

}