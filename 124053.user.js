// ==UserScript==
// @name           reddit.com - Mod events report generator
// @namespace      v1
// @include        http://www.reddit.com/*/about/log*
// ==/UserScript==

function main()
{
	// Add Generate Report box
	$('#siteTable').prepend(' \
		<table border="0" id="modreport-settings"> \
			<tbody> \
				<tr> \
					<td><b>Events:</b></td> \
					<td><b>Moderators:</b></td> \
				</tr> \
				<tr> \
					<td><ul id="events" style="text-transform:capitalize;"></ul></td> \
					<td><ul id="moderators"></ul></td> \
				</tr> \
				<tr> \
					<td colspan="2"><b>Date:</b></td> \
				</tr> \
				<tr> \
					<td><label for="from">From:</label><input type="date" id="modlog-dateFrom" value="'+ (localStorage.getItem('modlog-dateFrom')||'now') +'"/></td> \
					<td><label for="to">To:</label><input type="date" id="modlog-dateTo" value="'+ (localStorage.getItem('modlog-dateTo')||'1 week ago') + '"/></td> \
				</tr> \
				<tr> \
					<td style="text-align:center"><button id="generate">Generate Report</button></td> \
					<td><span class="status error">Processing page: <b></b></span></td> \
				</tr> \
			</tbody> \
		</table> \
	');

	// Add event type list
	var	eventTypeRX	= /type=(\w+)/,
	eventNames = {},
    subreddit = subreddit || location.pathname.match(/\/[rm]\/(\w+)/)[1];

	$('.modaction-drop a').each( function(){

		var	match = $(this).attr('href').match( eventTypeRX );
		if( !match || !match[1] ) return;
		
		var name = match[1],
			niceName = $(this).text(),
			checked = localStorage.getItem('modlog-event-exclude-'+name) ? '':' checked';
		$('#events').append('<li><input type="checkbox" id="modlog-event-exclude-'+name+'" name="'+name+'"'+checked+'><label for="modlog-event-exclude-'+name+'">'+niceName+'</label>');
		eventNames[name]=niceName;
	});

	// Add moderator list (load via JSON if they aren't all listed in the sidebar)
	if( !$('.sidecontentbox:has(h1:contains("MODERATORS")) li.more').length )
		$('.sidecontentbox:has(h1:contains("MODERATORS")) a.author').each( function(){
			var	name = $(this).text(),
				checked = localStorage.getItem('modlog-moderator-exclude-'+name) ? '':' checked';
			$('#moderators').append('<li><input type="checkbox" id="modlog-moderator-exclude-'+name+'" name="'+name+'"'+checked+'><label for="modlog-moderator-exclude-'+name+'">'+name+'</label>');
		});
	else
		$.getJSON('/r/'+subreddit+'/about/moderators.json',function(d){
			for( i in d.data.children ){
				var	name = d.data.children[i].name,
					checked = localStorage.getItem('modlog-moderator-exclude-'+name) ? '':' checked';
				$('#moderators').append('<li><input type="checkbox" id="modlog-moderator-exclude-'+name+'" name="'+name+'"'+checked+'><label for="modlog-moderator-exclude-'+name+'">'+name+'</label>');
			}
		});
		
	// Checkbox toggled
	$('#modreport-settings li input').live( 'click', function(e){
		if( this.checked ) return localStorage.removeItem( this.id );
		localStorage.setItem( this.id,1 );
	});

	// Date changed
	$('#modreport-settings input[type=date]').change( function(e){ localStorage.setItem( this.id,this.value ); });


	// Generate report
	window.data	 = [];
	window.cache = {};
	var	page,events,finished,next,from,to;

	// Load next page (from cache if we've already generated a report)
	function getNext( after ) {
		if( cache[after] )
			processPage( after, cache[after] );
		else
			// No .json output for /about/log/ pages, so we have to do it this sucky way instead.
			var dump = $('<div>').load( '/r/'+subreddit+'/about/log/?limit=100&after='+after+' tr.modactions,p.nextprev>a[rel*=next]',
				function() { processPage( after, dump ) }
			);
	};

	// Process page data
	function processPage( after, dump ) {

		// Add page dump to cache
		if( after ) cache[ after ] = dump;
		$('#modreport-settings .error b').text( page++ )

		// Get data for each mod event
		dump.find('tr.modactions').each( function(){
			if( finished ) return;
			var timestamp	= new Date( $(this).find('time').attr('datetime') ),
				username	= $(this).find('a[href*="mod="]').text(),
				action		= $(this).find('a.modactions').attr('class').match(/.+ (.+)/)[1];

			// add to the dump if within time parameters
			if( timestamp > from ) return;
			if( timestamp < to ) return finished = true;

			window.data.push( {timestamp:timestamp,username:username,action:action} );
		});

		// Get href for last mod event
		var href = dump.find('a[rel*=next]').attr('href'),
			lastDatetime = new Date( dump.find('time:last').attr('datetime') );

		// Check if we've finished
		if( finished || !href || lastDatetime < to) return generateReport()

		// Get next page if needed
		var after = href.match(/ModAction_[\w-]*/)
		getNext( after );
	};

	function generateReport(){
		$('#modreport-settings .status').fadeOut(1000);
		$('#siteTable .generic-table,.menuarea,.nextprev').hide();
		$('#modreport').remove();

		var hideMods=[], processEvents=[];
		$('#moderators input').not(':checked').each( function(){ hideMods.push( this.name ) });
		$('#events input:checked').each( function(){ processEvents.push( this.name ) });

		mods = {};
		events = {};

		for( i in data ){
			var	user	= data[i].username,
				action	= data[i].action,
				time	= data[i].timestamp;
				
			if( hideMods.indexOf( user ) != -1 || processEvents.indexOf( action ) == -1 ) continue;

			if(!mods[user])mods[user]={};
			if(!mods[user][action])mods[user][action]=[];
			mods[user][action].push(time);
			!events[action] ? events[action]=1 : events[action]++;
		};

		$('#siteTable').append('<table  border="1" id="modreport"><thead><tr><td /></tr></thead><tbody /><tfoot><tr><td>Total:</td></tr></tfoot></table>');
		
		//Add header icons
		for( name in events ) $('#modreport thead tr').append('<td><a class="modactions '+name+'" href="http://www.reddit.com/r/'+subreddit+'/about/log/?type='+name+'"title="'+eventNames[name]+'"></a></td>')
		$('#modreport thead tr').append('<td>Total:</td>');

		// Mod info
		for( name in mods ){
			var	td = '',total = 0;
			for( event in events ){
				var count = ( mods[name][event] ? mods[name][event].length : 0 );
				total += count;
				td += '<td>'+count+'</td>';
			}
			$('#modreport tbody').append( '<tr><td><a href="/r/'+subreddit+'/about/log/?mod='+name+'">'+name+'</a></td>'+td+'<td>'+total+'</td></tr>' );
		}

		// Add grand totals
		var grandtotal = 0;
		for( name in events ){
			grandtotal += events[name]
			$('#modreport tfoot tr').append('<td>'+ events[name] +'</td>');
		}
		$('#modreport tfoot tr').append('<td><b>'+ grandtotal +'</b></td>');
	}

	// 'generate' buton clicked
	$('#generate').click( function(){

		// Get from/to datetimes
		var d = Dateify( $('#modlog-dateFrom').val(), $('#modlog-dateTo').val() );
		if( !d.from )	$('#modlog-dateFrom').css({borderColor:'#f00',boxShadow:'0 0 10px #f00'});	else $('#modlog-dateFrom').attr('style','');
		if( !d.to )		$('#modlog-dateTo').css({borderColor:'#f00',boxShadow:'0 0 10px #f00'});	else $('#modlog-dateTo').attr('style','');
		if( !d.from || !d.to ) return;

		// Reset vars
		page = 1;
		finished = false;
		window.data = [];
		from = d.from;
		to = d.to;

		$('#modreport-settings .status').show();
		
		// Process current page
		processPage( null, $('#siteTable>table>tbody,p.nextprev') );
	});
	
	// Parse from/to dates
	window.Dateify = function( from,to ){

		to	 = to.toLowerCase();
		from = from.toLowerCase();
		from = ( from == 'today' || from == 'now' ) ? new Date() : new Date( from );
		if( from.toString()	== 'Invalid Date' ) from = false;

		var	dateRX = /(\d+) (\w+?)s? ago/,
			match = dateRX.exec( to );
		if( new Date( to ).toDateString() == 'Invalid Date' && !match ) to = false;

		if( !to || !from ) return {from:from,to:to};
		if( !match ) return {from:from,to:new Date( to )};
		
		to = new Date();
		switch( match[2] )
		{
			case 'year':	to.setFullYear( to.getFullYear()-match[1] );	return {from:from,to:to};
			case 'month':	to.setMonth( to.getMonth()-match[1] );			return {from:from,to:to};
			case 'week':	to.setDate( to.getDate()-(match[1]*7) );		return {from:from,to:to};
			case 'day':		to.setDate( to.getDate()-match[1] );			return {from:from,to:to};
			case 'hour':	to.setHours( to.getHours()-match[1] );			return {from:from,to:to};
			case 'minute':	to.setMinutes( to.getMinutes()-match[1] );		return {from:from,to:to};
		}
	}
}

// Add script to the main page scope
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );

// Add CSS
var css = document.createElement('style');
css.type = "text/css";
css.textContent = '\
	#modreport-settings {float:right;border:1px solid black;margin:5px;} \
	#modreport-settings b {font-weight:bold} \
	#modreport-settings {background-color:#ffe} \
	#modreport-settings td {padding:5px;vertical-align:top} \
	#modreport-settings .status {display:none;font-size:small} \
	#dateFrom, #dateTo {outline:none} \
	#modreport td {padding:10px;vertical-align:middle;text-align:center} \
	#modreport tr td:first-child,#modreport tr td:last-child, #modreport tfoot {font-weight:bold} ';
document.body.appendChild( css );
