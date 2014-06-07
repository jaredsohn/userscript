// ==UserScript==
// @name          Stackoverflow jsFiddle viewer
// @author        Sergey Shchur aka antyrat (http://stackoverflow.com/users/186535/antyrat)
// @description   Adds embedded jsFiddle preview to the questions/answers posts. 
// @include       http://www.stackoverflow.com/questions*
// @include       http://stackoverflow.com/questions/*
// @version       1.0
// ==/UserScript==

// insert jQuery to the script
var script = document.createElement( "script" );
script.type = "text/javascript";
script.textContent = "(" + addJsFiddlePreview.toString() + ")( jQuery )";
document.body.appendChild(script);

function addJsFiddlePreview( $ ) {

    // Iterate thru questions and answers body
    $( '.post-text' ).each( function( ) {
        var postLinks = $( this ).find( 'a[href]' ),
          postContainer = this;

        if( postLinks ) {
            // collect all href links in answers and (or) question
            postLinks.each( function( ) {
                var jsFiddleLink = $( this ).attr( 'href' ).match( /http:\/\/jsfiddle\.net\/([A-Za-z0-9\/_]+)/ );

                if( jsFiddleLink && jsFiddleLink[ 0 ] && jsFiddleLink[ 1 ] ) {

                    // append button
                    var buttonContainer = $( '<div></div>' ).appendTo( postContainer ),
                    jsFiddleButton = $( '<button data-visible="false">Show jsFiddle ( ' + jsFiddleLink[ 1 ] + ' ) result</button>' ).appendTo( buttonContainer );

                    // show embedded jsFiddle at bottom
                    jsFiddleButton.click( function(  ) {
                        if( $( this ).data( 'visible' ) === false) {
                            var iframeLink = jsFiddleLink[0];
                            if(iframeLink[iframeLink.length - 1] == "/") {
                                iframeLink = iframeLink.substr(0, iframeLink.length - 1);
                            } 
                            $( this ).addClass( 'disabled-button' ).data( 'visible', 'true' );
                            $( '<div><iframe src="' + iframeLink + '/embedded/" width="650" height="400" style="border:2px solid #3D668F;"></iframe></div>' ).appendTo( postContainer );
                        }
                    });
                }
            });
        }
    });
}