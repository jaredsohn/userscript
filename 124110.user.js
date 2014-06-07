// ==UserScript==
// @name           reddit.com - flowwit
// @namespace      v3
// @include        http://www.reddit.com*
// ==/UserScript==

function main(){

    // Bail if this is the last/only page of the listing.
    if( !$('.nextprev a[rel*=next]').length ) return;
    
	var	offset	= 750,	// Distance in pixels from the bottom of the page when new content should be loaded
		limit	= 25,	// Number of new links to load whenever we fetch new content (lower values will be quicker)

		w		= $(window),
        logpage = false,
		loading	= false,
        attempt = 1,
        last    = $('#siteTable .thing, tr.modactions').eq(-attempt),
        rankwidth = 0
        
    // Check if viewing a modlog page
    if( $('div.modactionlisting').length ){
        limit   = 50;
        logpage = true;
    }

	// Add bits after 'next' link
	$('.nextprev')
		.append('<span class="error flowwit-loading" style="display:none;margin-left:10px"> loading...</span><span class="error flowwit-error" style="display:none;margin-left:10px"> error!</span>')
        .click( function(){ loading = false;} );

	// Check scroll position
	w.scroll( function(e){ if ( !loading && w.scrollTop() + w.height() + offset > last.offset().top ) loadcontent() });

	// Load next page
	function loadcontent(){

        if( !$('.nextprev').length ) return;

		last = $('#siteTable .thing, tr.modactions').eq(-attempt);
        
		var	query		= (location.search || '?') + '&count='+ last.find('.rank').text() +'&after='+ last.attr('data-fullname') +'&limit='+ limit + location.hash,
			loadingDiv	= $('.flowwit-loading').show(),
			errorDiv	= $('.flowwit-error').hide();
		loading = true;

		// Fetch log data objects
        if( logpage )
            var content = $('<div>').load( location.pathname + query +' tr.modactions', function(d,s){

                loadingDiv.hide();
                if( !loading ) return;
                loading = false;
                if( s != 'success' ) return errorDiv.show();

                var scrollPos = w.scrollTop(),
                    things    = content.find('tr.modactions').appendTo('#siteTable .generic-table tbody');
                w.scrollTop( scrollPos );
            });
            
        // Fetch regular thing objects
        else
            $.get( location.pathname +'.json-html'+ query )
                .success(function(d,s){
                    loadingDiv.hide();
                    if( !loading ) return;
                    loading = false;

                    //If no things retry using the previous thing (up to  10 retries)
                    if( !d.data.length && attempt++ < 10 ) return loadcontent();
                    attempt=1;

                    // Check if there are any more things in the listing (would be nice if json-html listings returned an 'after' parameter)
                    if( d.data.length < limit || $('#siteTable .thing[data-fullname="'+d.data[0].data.id+'"]').length ) return $('p.nextprev').remove();

                    // Build new items list, add to page
                    var things = [];
                    for( i in d.data ) things.push( compressHTML( d.data[i].data.content ) );
                    things = $(things.join('')).appendTo('#siteTable').filter('.thing');

                    // Resize vote widths and link rankings to match max value.
                    var max = 0, midcol = $('.midcol').width( function(_,w){max = Math.max(max,w)}).css('width',max);
                    var max = $('.rank:last').width(); $('.rank').width( max );

                    // Run callbacks
                    for( i in window.flowwit ) window.flowwit[i]( things );
                })
                .error(function(d){
                    loadingDiv.hide();
                    errorDiv.show();
                    loading = false;
                })
	}

	window.flowwit = window.flowwit || [];

    // .json-html returns uncompressed html, so we have to compress it manually and replace HTML entities.
    function compressHTML(src){return src.replace(/(\n+|\s+)?&lt;/g,'<').replace(/&gt;(\n+|\s+)?/g,'>').replace(/&amp;/g,'&').replace(/\n/g,'').replace(/child" >  False/,'child">') }

}

// Append script into the page scope
var script = document.createElement("script");
script.textContent = "$(" + main.toString() + ");";
document.body.appendChild( script );