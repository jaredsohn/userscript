// ==UserScript== 
// @name           Favicon POL
// @description    Favicon Avatar de Pol
// @namespace      http://userscripts.org/users/35001 
// @include        http://pol.teoriza.com/*
// @author         Hannibal Smith.
// ==/UserScript==

var claveApi = 'XXXXXXXXXXXX';  

var pety = 'http://pol.teoriza.com/api.php?pass='+ claveApi +'&a=debug';

    GM_xmlhttpRequest({
        method:"GET",
        url:pety,
        headers:{
                "User-Agent":"monkeyagent",
                "Accept":"text/monkey,text/xml",
            },
        onload: function(responseDetails) {               
                var resp = responseDetails.responseText;
               
                var listDebug = resp.split( '\n' );
                var userId = listDebug[1].split( '|' )[1];
                var favicon_link_html = document.createElement( "link" );
                favicon_link_html.rel = 'icon';
                favicon_link_html.href = 'http://pol.teoriza.com/img/a/'+ userId +'.jpg';
                favicon_link_html.type = 'image/x-icon';
                try { 
                    document.getElementsByTagName( 'head' )[0].appendChild( favicon_link_html ); 
                }
                catch( e ) { }
            }

    });
