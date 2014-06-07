// ==UserScript==
// @name        Reddit Realtime Comments
// @namespace   v1
// @include     *.reddit.com/new*
// @include     *.reddit.com/*/new*
// @include     *.reddit.com/comments*
// @include     *.reddit.com/*/comments*
// @include     *.reddit.com/r/*/about/modqueue*
// @include     *.reddit.com/r/*/about/reports*
// @include     *.reddit.com/r/*/about/spam*
// @include     *.reddit.com/r/*/about/log*
// @include     *.reddit.com/user/*
// ==/UserScript==

function main(){
    // Don't run if the page we're viewing is paginated, or if we're viewing a 'rising' page.
    if( location.search.match(/before|after/ ) ) return;
    if( location.pathname.match(/\/new|user/) && !$('.menuarea .dropdown.lightdrop .selected:contains(new), .menuarea .flat-list.hover .selected:contains(new)').length ) return;3

	var pathArray = window.location.pathname.split( '/' );
	var url = "http://www.reddit.com/r/" + pathArray[2] + "/comments/#" +  pathArray[4];

    var realtime = localStorage.getItem('realtime'),
        delay = 120000, // Default 2 min delay between requests.
		link = $('<a href='+ url +'>realtime comments</a>'),
        sitetable = $('#siteTable').css('top',0),
        sitePos = sitetable.css('position'),

        numcomments = +(sitetable.find('a.comments').text().match(/\d+/)||0),
        timeout;

	//if there's a hash in the url, turn realtime on
	var hash = "";
	if(window.location.hash){
		var hash = window.location.hash.substring(1);
		hash = hash.replace("'", "");
		hash = hash.replace('"', "");
		removeThreads(hash);
		var checkbox = $('<label id="realtime-label" for="realtime" title="Current interval: '+timeago(delay)+'">realtime: <input id="realtime" type="checkbox" '+( realtime ? ' checked="1"' : '' )+'checked/></label>');
	}
	else
		var checkbox = $('<label id="realtime-label" for="realtime" title="Current interval: '+timeago(delay)+'">realtime: <input id="realtime" type="checkbox" '+( realtime ? ' checked="1"' : '' )+'/></label>');

    if( location.pathname.match(/\/comments\/\w+\/?(\w+\/?)?/) ){
		if( $('.tabmenu').length ) {
			link.wrap('<li><a>').parent().parent().appendTo('.tabmenu'); 
		}
		else 
			link.wrap('<div style="float:right">').parent().appendTo('.menuarea');
	}
	else
		if( $('.tabmenu').length ) checkbox.wrap('<li><a>').parent().parent().appendTo('.tabmenu'); else checkbox.wrap('<div style="float:right">').parent().appendTo('.menuarea');

    // Update fuzzy time values for all 'time' elements, update refresh delay
    function updateTime(){
        if( !realtime ) return;
        var max=0, min=Infinity, num = $('#siteTable time:visible').each(function(){
                var delta = new Date() - new Date(this.title) + 15000;
                if( delta > max ) max = delta; if( delta < min ) min = delta;
                this.textContent = timeago( delta )
            }).length;
        delay = Math.max(5000, Math.min(300000, Math.floor( (max-min)/num )));
        checkbox.attr('title','Current interval: '+timeago(delay) )
    }
    updateTime(); setInterval(updateTime,1000);
    
    // Add new things
    function getNewThings(){
        if(!realtime) return;

		//show the flair in text form
		showFlair();

        // Get first thing
        var before = $('#siteTable div.thing:first, #siteTable tr.modactions:first').attr('data-fullname'),
            html = [],
			nhtml = [];

        // For comment trees, load the thing first to get the comment count, then if it's different, load the comments page again.
        // Only operate if the page has less than 500 comments.
        if( location.pathname.match(/\/comments\/\w+\/?(\w+\/?)?/) )
            return;

        // For /new or /comment pages, get new things, prepend to page
        if( location.pathname.match(/\/new|comments|user/) )
            $.get( location.pathname + '.json-html?before='+before ).success( function( response ){

                // Compress the HTML of each returned thing
                for (i in response.data){
					html.push(compressHTML(response.data[i].data.content));
				}

                if( !html.length ) return;

				//if there's a hash in the url, filter the results
				if(window.location.hash){
					for(var x in html)
					{
						var m = html[x].replace('"', "");
						var temp = m.replace("'", "");
						if (temp.indexOf(hash) != -1)
							nhtml.push(html[x]);
					}
					insertHTML(nhtml);
				}else{
					insertHTML(html);
				}

                // Update Ranks on link listings (if applicable)
                var n=1; 
				$('.rank').each( function(){ 
					this.innerHTML=n++;
					this.style.width='3.30ex';
					this.nextSibling.style.width='3ex';
				});	
				
				//show the flair in text form for new comments
				showFlair();
            });

        // For modqueue pages, reload the entire thing, prepend things which aren't already listed.
        if( location.pathname.match(/\/about\/(modqueue|reports|spam|trials)/) )
            $.get( location.pathname + '.json-html' ).success( function( response ){

                // Get list of thing ids of elements already on the page
                var ids=[];$('#siteTable div.thing').each(function(){ids.push(this.getAttribute('data-fullname') ) });

                // Get any things whos ids aren't already listed and compress their HTML
                for( i in response.data ) if( ids.indexOf( response.data[i].data.id )==-1 ) html.push( compressHTML( response.data[i].data.content ) )
                if( !html.length ) return;

                //Prepend to siteTable
                insertHTML( html )
            });

        // For modlog pages, load regular modlog HTML (as there's no JSON output), trim off the header, footer & sidebar, prepend new items
        if( location.pathname.match(/\/about\/log/) ) 
            var container = $('<span>').load( location.pathname+ '?before='+before+ ' #siteTable tr.modactions',function(d){
                var html = container.html();
                if( !html.length ) return;
                insertHTML( [html] );

            });

        timeout = setTimeout( getNewThings, delay );
    }

    // Insert new things into sitetable.
    function insertHTML( html ){
        var height = sitetable.css('top').slice(0,-2),
            things = $( html.join('') )
				.find('.child').remove().end()
				.prependTo( sitetable )
                .each( function(){height-=this.offsetHeight});
        
        // Scroll new items into view.
        sitetable.stop().css('top',height).animate({top:0},5000);
        things.css({opacity:0.2}).animate({opacity:1},2000,'linear');

        // Trim items
        //$('#siteTable>div.thing:gt(99),#siteTable>.clearleft:gt(99),#siteTable tr.modactions:gt(200)').remove();

        // Run flowwit callbacks on new things.
        if( window.flowwit ) for( i in window.flowwit ) window.flowwit[i]( things.filter('.thing') )
    }

	function strip(html)
	{
	   var tmp = document.createElement("DIV");
	   tmp.innerHTML = html;
	   return tmp.textContent||tmp.innerText;
	}

	function showFlair(){
		$(".flair").each(function() {
			var flair = $(this).text();
			$(this).replaceWith("[" + flair + "] ");
		});
	}

	function removeThreads(hash){
		$('div[class^="thing id"]').each(function(){
			var a = compressHTML($(this).html());
			var b = a.replace('"', "");
			var c = b.replace("'", "");
			if (c.indexOf(hash) == -1)
				$(this).remove();
		});
	}
    
    // Toggle realtime view on/off
    $('#realtime').click( toggleRealtime )
    function toggleRealtime(){
        localStorage.setItem( 'realtime',realtime=$('#realtime').attr('checked')?1:'' );
        clearTimeout( timeout );

        if( !realtime ) return sitetable.css('position',sitePos);

        sitetable.css('position','relative');
        updateTime();
        getNewThings();
    };
    toggleRealtime()

    // .json-html returns uncompressed html, so we have to compress it manually and replace HTML entities.
    function compressHTML(src){return src.replace(/(\n+|\s+)?&lt;/g,'<').replace(/&gt;(\n+|\s+)?/g,'>').replace(/&amp;/g,'&').replace(/\n/g,'').replace(/child" >  False/,'child">') }

    // Simple fuzzy time function. Probably not 100% accurate, but near enough.
    function timeago( t ){
        var d={year:31556925960,month:2629743830,day:86400000,hour:3600000,minute:60000,second:1000},u;
        for(s in d)if((u=Math.floor(t/d[s]))>0)return Math.max(0,u)+' '+s+(u==1?'':'s');
        return Math.max(0,t)+' milliseconds';
    }
}

// Add script to the page
var s=document.createElement('script');s.textContent="("+main.toString()+')();';document.head.appendChild(s)