// ==UserScript== 
// @name           Avatar ChatPol 0.1
// @description    Avatar Chat del Cargo 
// @namespace      http://userscripts.org/users/35001 
// @include        http://pol.teoriza.com/chat/*
// @author         Hannibal Smith.
// ==/UserScript==

var claveApi = 'XXXXXXXXXXXX'; 
var nameCargo = 'Presidente';

var petic = 'http://pol.teoriza.com/api.php?pass='+ claveApi +'&a=debug';

    GM_xmlhttpRequest({
        method:"GET",
        url: petic,
        headers:{
                "User-Agent":"monkeyagent",
                "Accept":"text/monkey,text/xml",
            },
        onload: function(responseDetails) {               
                var resp = responseDetails.responseText;
               
                var listDebug = resp.split( '\n' );
                var userId = listDebug[1].split( '|' )[1];

                var avat = 'http://pol.teoriza.com/img/a/'+ userId +'.jpg';
                setInterval( function() {
                for( i=0; i<document.images.length; i++ ) 
                     if ( document.images[i].title == nameCargo )	
                                   document.images[i].src = avat; 
                }, 8000 );
            }

    });
