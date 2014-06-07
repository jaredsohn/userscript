// ==UserScript==
// @id             docs.phalconphp.com
// @name           Phalcon framework docs improver
// @version        1.0
// @namespace      meouw
// @author         Clive Calmeyer
// @description    Makes the Phalcon framework docs usable
// @include        http://docs.phalconphp.com/en/latest/*
// @run-at         document-end
// ==/UserScript==

GM_addStyle('\
#sections, #api {\
    border: 1px solid #ccc;\
    padding: 4px 1%;\
    background: #fff;\
    margin: 20px 3% 0;\
    width: 92%;\
}\
\
#sidenav {\
    position: fixed;\
    top: 0;\
    left: 0;\
    bottom: 0;\
    width: 350px;\
    overflow: auto;\
    border-right: 1px solid #ccc;\
}\
\
#content {\
    margin: 0 0 0 350px;\
    padding: 20px;\
}\
');
(function( $ ){
    // make boxes for the content we're interested in
    var sidenav   = $( '<div id="sidenav"/>' ).html( $( '.primary-box>ul>li>ul' )[0] );
    var content = $( '<div id="content"/>' ).html( $( '.second-box' ).html() );

    // delete everything else and add the boxes
    $( document.body ).html( '' ).append( sidenav ).append( content );

    // load the main nav from the index and make a dropdown
    $.get(
        'http://docs.phalconphp.com/en/latest/index.html'
    )
    .done( function( page ) {
        page = $( page );

        // just get the main section links
        var links = page.find( '.toctree-l1>a' );
        
        // make the dropdown (lazy way)
        var sections = $( '<select id="sections"><option value="#">Sections</option></select>' );
        
        // make options from the main links
        links.each( function() {
            var href = 'http://docs.phalconphp.com/en/latest/reference/'+this.href.replace( /^.*\//, '' );
            sections.append( '<option value="'+href+'">'+this.innerHTML+'</option>' );
        });
        
        // add at the top of the section nav
        sidenav.prepend( sections );
        
        // cock
        sections.change( function() {
            window.location = $( this ).val();
        });
        
    });

    // make a search for the API

    $.get(
        'http://docs.phalconphp.com/en/latest/api/index.html'
    )
    .done( function( page ) {
        page = $( page );

        // get the api links
        var links = page.find( '.toctree-l1>a' );

        // make the dropdown
        var api = $( '<select id="api"><option value="#">API</option></select>' );
        
        // make options from the links
        links.each( function() {
        
            var page = this.href.replace( /^.*\//, '' );
            var href = 'http://docs.phalconphp.com/en/latest/api/'+page;
            var cls  = page.replace( 'Phalcon_', '' ).replace( /_/g, '\\' ).replace( '.html', '' );
            
            api.append( '<option value="'+href+'">'+cls+'</option>' );
        });
        
        // add at the top of the section nav
        sidenav.prepend( api );
        
        // cock
        api.change( function() {
            window.location = $( this ).val();
        });
        
    });
})( unsafeWindow.jQuery );
