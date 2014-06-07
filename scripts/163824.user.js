// ==UserScript==
// @name       YouTube PlayerSize
// @homepage  http://userscripts.org/scripts/show/163824
// @version    0.2
// @updateURL      https://userscripts.org/scripts/source/163824.meta.js
// @description  You can freely change video size
// @match      http://youtube.com/*
// @match      http://www.youtube.com/*
// @run-at      document-end
// @copyright   Creative Commons, All right reversed. Copyright by MarWit
// ==/UserScript==


var documentReady = setInterval( function( ) {
	if( document.readyState == 'complete' ) 
	{
		clearInterval( documentReady );
		
                var videoDiv = document.getElementById( 'player-api-legacy' );
                var playerDiv = document.getElementById( 'player-legacy' );
        
                if( videoDiv == null || playerDiv == null )
                    return 0;
        
                videoDiv.style.padding = '10px';
        
                var resizableElement = document.createElement( 'div' );
                resizableElement.setAttribute( 'id', 'resizable-player' );
                resizableElement.style.resize = 'both';
                resizableElement.style.overflow = 'hidden';
        
                playerDiv.appendChild( resizableElement );
                resizableElement.appendChild( videoDiv );
	}
}, 10 );