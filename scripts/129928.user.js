// ==UserScript==
// @name        reddit.com - Realtime Reddit
// @namespace   v2
// @include     *.reddit.com/r/*/about/unmoderated*
// @include     *.reddit.com/r/*/about/probation*
// @include     *.reddit.com/r/*/comments/
// @include     *.reddit.com/r/*/comments
// @include     *.reddit.com/comments/
// @include     *.reddit.com/comments
// @include     *.reddit.com/user/*
// @include     *.reddit.com/*/new*
// @include     *.reddit.com/new*
// ==/UserScript==

function main(){

    // Don't run if the page we're viewing is paginated or a threaded comments page
    if( location.search.match(/before|after/) || $('body.comments-page').length ) return;

    var timeout,realtime,delay = 5000,
        sitetable = $('#siteTable').css('top',0),
        initialPosition = sitetable.css('position'),
        checkbox = $('<input id="realtime" type="checkbox" style="float:right;position:relative;z-index:1000;margin-left:.4em" title="Toggle realtime mode" />');

    // Add checkbox;
    if( $('.menuarea').length ) checkbox.appendTo('.menuarea'); else checkbox.prependTo('body>.content');

    // Add new things
    function getNewThings(){

        if( !$('#realtime:checked').length ) return;
        timeout = setTimeout( getNewThings, delay );

        // Don't run when window not visible
        if( document.hidden ) return;

        // Get first thing
        var before = $('#siteTable div.thing:first').attr('data-fullname'),
            html = [];

        // Get new things, prepend to page on success
        $.get( location.pathname + '.json-html?before='+before ).success( function( response ){

            // Compress the HTML of each returned thing
            for( i in response.data ) html.push( compressHTML( response.data[i].data.content ) );
            if( !html.length ) return;

            insertHTML( html );

            // Update Ranks on link listings (if applicable)
            var n=1; $('.rank').each( function(){ this.innerHTML=n++;this.style.width='3.30ex';this.nextSibling.style.width='3ex' } );

        });
    }

    // Insert new things into sitetable.
    function insertHTML( html ){
    
        var height = sitetable.css('top').slice(0,-2),
            things = $( html.join('') )
				.find('.child').remove().end()
				.prependTo( sitetable )
                .each( function(){ height -= this.offsetHeight });
        
        // Scroll new items into view.
        sitetable.stop().css('top',height).animate({top:0},5000);
        things.css({opacity:0.2}).animate({opacity:1},2000,'linear');

        // Trim items
        $('#siteTable>div.thing:gt(99),#siteTable>.clearleft:gt(99),#siteTable tr.modactions:gt(200)').remove();

        // Run flowwit callbacks on new things.
        if( window.flowwit ) for( i in window.flowwit ) window.flowwit[i]( things.filter('.thing') )

        // Run callbacks for new things
        $(document).trigger('new_things_inserted')
    }

    // Toggle realtime view on/off
    checkbox.click( function(){

        clearTimeout( timeout );
        if( this.checked ) getNewThings();

        // Toggle promo box
        $('#siteTable_organic,.content>.infobar').css('display', (this.checked ? 'none':'block') );
        sitetable.css('position',(this.checked ? 'relative':initialPosition) );
    } );

    // .json-html returns uncompressed html, so we have to compress it manually and replace HTML entities.
    function compressHTML(src){
        return src.replace(/(\n+|\s+)?&lt;/g,'<')
                   .replace(/&gt;(\n+|\s+)?/g,'>')
                   .replace(/&amp;/g,'&')
                   .replace(/\n/g,'')
                   .replace(/child" >  False/,'child">');
    }
}

// Add script to the page
var s=document.createElement('script');s.textContent="("+main.toString()+')();';document.head.appendChild(s)