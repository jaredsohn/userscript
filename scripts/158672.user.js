// ==UserScript==
// @name       TopIama.com Direct Links
// @namespace  reddit.com
// @version    0.6
// @description  Direct link to topiama.com from each Reddit.com/r/iama post
// @include        http://*.reddit.*/r/iama*
// @include        http://*.reddit.*/r/IAmA*
// @copyright  None of that
// @author      Sergio Kamui ft. Juan Zitronic
// ==/UserScript==


function createLinks( ) {
    var links = document.getElementsByTagName( 'a' ), i, classes, linkCode, topIamahref, topIamaLink;
    for (i in links) {
        if( links[i].className ){
            classes = links[i].className.split( ' ' );
            if( classes.indexOf( 'comments' ) > -1 ){
                linkCode = links[i].href.toLowerCase( );
                linkCode = linkCode.substring( linkCode.indexOf( '/comments/' ) + 10 );
                linkCode = linkCode.substring( 0, linkCode.indexOf( '/' ) );
                topIamahref = 'http://www.topiama.com/' + linkCode;

                topIamaLi = document.createElement( 'li' );
                topIamaLink = document.createElement( 'a' );
                topIamaLink.setAttribute( 'href', topIamahref );
                topIamaLink.innerHTML = '[topIAmA.com]';  
                topIamaLink.className = 'domain';
                topIamaLi.insertBefore ( topIamaLink);  
                links[i].parentNode.parentNode.insertBefore( topIamaLi );    

            }
        }
        
    }
}

createLinks( );