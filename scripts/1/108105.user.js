// ==UserScript==
// @name           Nozbe Filter
// @namespace      nfus
// @include        https://secure.nozbe.com/nozbe/account/*
// @version        0.2.0.20110827
// ==/UserScript==
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js

(function(){

	var debug = true;
	var logToFirebug = true;

	var log = function(){}

	if( debug ){
		log = GM_log
		if( logToFirebug )
			log = function( a ){ unsafeWindow && unsafeWindow.console && unsafeWindow.console.log && unsafeWindow.console.log( a ) };
	}


	function nfus_init() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout( nfus_init, 100 );
        } else {
            nfus_main( unsafeWindow.jQuery );
        }
    }
    nfus_init();


    function nfus_main( $ ) {

		log( 'nfus_main {' );

		var filteredClass = 'nfus-filtered';

		var filteredStrongClass = 'nfus-filtered-strong';

		var filteredClassList = [ filteredClass, filteredStrongClass ].join(' ');

		var actionFilter = function( item_, filterStrong ){
					actionUnfilter();

					$('#task .item').not( item_ )
							.addClass( filterStrong ? filteredStrongClass : filteredClass )
							;
					//item_.removeClass( filteredClassList );
				}

		var actionUnfilter = function(event){

					$('#task .item').removeClass( filteredClassList );
				}

		var unfilter = function(){
					actionUnfilter();
					$( filteredItem ).removeClass( filteredClass );
					filteredItem = null;
				}

		var filteredItem = null;
		var filteredStrong = false;
		var contextFilter = function( event ){

					var cnum = /context_icon_(\d+)$/.exec( this.className )[1];

					var icon_ =  $( 'div#task.content' ).find( 'span.context_icon_' + cnum );
					
					var action_ = icon_.parents( 'div.item' );

					var context_item = $( this ).parent().parent()[0];

					filter( context_item, action_ );
				}

		var projectFilter = function( event ){
					var cnum = /\d+$/.exec( this.id )[0];

					var link_ =  $( '#task' ).find( 'a.proj_' + cnum );

					var action_ = link_.parents( 'div.item' );

					var project_item = $( this ).parent().parent()[0];

					filter( project_item, action_ );
				}

		var searchFilter = function( event ){
					log( this );

					var text = $.trim( this.value );
						;
					if( ! text ){
						unfilter();
						return;
					}
					
					var filter_regex = new RegExp( text, 'i' );
					var filter_function = function(){ return filter_regex.test( $(this).text() ) }
					var name_ =  $( '#task' ).find( 'div.action_name' ).filter( filter_function  );

					var action_ = name_.parents( 'div.item' );

					filter( text, action_ );
				}


		var filter = function( filter_item, action_ ){

					log( [ filter_item, filteredItem, filteredStrong ] );

					var filter_again = ( filteredItem == filter_item );

					if( filteredStrong && filter_again ){
						unfilter();
						return;
					}

					var filterStrong = ( ! filteredStrong ) && filter_again ;

					actionFilter( action_, filterStrong );

					filteredStrong = filterStrong;

					$( filter_item ).addClass( filteredClass );

					if( filteredItem != filter_item )
						$( filteredItem ).removeClass( filteredClass );

					filteredItem = filter_item;
				}

		var prepSearchFilterTimeout;
		var prepSearchFilter = function( event ){
			if( prepSearchFilterTimeout ) clearTimeout( prepSearchFilterTimeout );
			var element = this;
			prepSearchFilterTimeout = setTimeout( function(){ searchFilter.apply( element, event ) }, 500 );
		}
		

		$("#search_field").keyup( prepSearchFilter );


		$("#context_side div.side_header").click( unfilter );

		$("#context_side_list div.col1 span.con_sidebar_icon").live( 'click', contextFilter );

		$("#project_side_list span.bulb").live( 'click', projectFilter );

		log( '} nfus_main' );
	}

})()

