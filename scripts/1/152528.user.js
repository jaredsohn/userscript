// ==UserScript==
// @name        Wikipedia.com - Better contents panel
// @namespace   v1
// @include     *wikipedia.org/wiki/*
// @run-at document-start
// ==/UserScript==

function bettapedia() {

    $('#toc').css({display:'block'}).insertAfter('#p-logo');

    var ids = [];
    $( '#toctitle+ul a' ).each( function(){
        var id = this.href.split('#')[1];
        ids.push({
            link:$(this),
            id:id,
            elem:$( document.getElementById( id ) ) 
        })
    });

    function getTopID(){
        for( i in ids )
            if( ids[i].elem.offset().top - window.scrollY > 0 ){
                $( '#toc a' ).removeClass( 'not-patrolled' );
                ids[i].link.addClass( 'not-patrolled' );
                break;
            }
    }
    getTopID();

    $( window ).resize( getTopID );
    $( window ).scroll( getTopID );
    $( '#toc a' ).click( getTopID );
}

// Add script to the page
document.addEventListener('DOMContentLoaded',function(e){var s=document.createElement('script');s.textContent="("+bettapedia.toString()+')();';document.head.appendChild(s)});

// Add CSS
(function addcss(){
    if( !document.head ) return setTimeout( addcss );

    // Add to all pages
    var css = '\
        #toc{ font-size:80%; width:17.7em; display:none }\n\
        #mw-panel{ position:fixed!important; width:15em!important }\n\
        #content, #mw-head-base{ margin-left:16em!important }\n\
        #mw-head{ left:5em }\n\
        #p-logo{ left:3em }\n';

    s=document.createElement('style');s.type="text/css";s.textContent=css;document.head.appendChild(s);
})();