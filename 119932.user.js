// ==UserScript==
// @name arsbitcoin stats
// @description Swaps the stats in the header for more "useful" and auto updating statistics. 
// @include      http://arsbitcoin.com/*
// @include      https://arsbitcoin.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var api_key = '';

$(function(){
	
	$('img[src=\'images/arsbitcoinlogo.png\']').parent().css('float', 'right')
		.next().attr('style', 'float: left; background-color: #205D8C; background-color: rgba(32, 93, 140, 0.7); padding: 5px; position: absolute; top: 8px; left: 10px; z-index: 5; border-radius: 45px;');
	
	// The only original information with a use.
	var poolrate = $('#logo tr td:nth-child(2) tbody > *:first-child > *:nth-child(2)').text();
	var s = poolrate.indexOf('.');
	poolrate = poolrate.replace('.', '');
	poolrate = poolrate.replace('GH', 'MH');
	var t = poolrate.indexOf(' ') - 1;
	while ( t-s < 2 ) { t = t+1;
		console.log(poolrate);
		poolrate = poolrate.substr(0, t) + '0' + poolrate.substr(t);
	}
	
	// Asthetic
	var spacer = '<span type=\'spacer\' style=\'display: inline-block; width: 15px;\'></span>';
	
	$('#logo tr td:nth-child(2) tbody > *')
		.first().children()
			.first().text('My rate: ')
			.next().attr('id', 'hashrate')
			.text( $('#leftsidebar > i:nth-of-type(2) > b').text() )
			.parent()
		
		.next().children()
			.first().text('Balance: ')
			.next().attr('id', 'balance')
			.text( $('#leftsidebar > table:nth-of-type(1) tr:nth-of-type(5) > td:nth-of-type(2) b i').text() + ' BTC' )
			.parent()
			
		.next().children()
			.first().text('Statistics: ')
			.next().attr('id', 'stats')
			.html(
				$('#leftsidebar > b:nth-of-type(3) > i').text()
				+ ' <span style=\'color:orange;\'> -'
				+ $('#leftsidebar > b:nth-of-type(4) > i').text().split(' ')[0]
				+ ' </span>'
				+ ' / '
				+ $('#leftsidebar > i:nth-of-type(4) > b').text()
				+ ' <span style=\'color:orange;\'> -'
				+ $('#leftsidebar > i:nth-of-type(5) > b').text().split(' ')[0]
				+ ' </span>'
				)
			.parent()
		
		.next().children()
			.first().html('Pool rate: '+spacer)
			.next().attr('id', 'poolrate')
			.text( poolrate );
	
	// Queue up the checking mechanism
	setInterval ( ars_update, 7000 );
	
	
	function ars_update() {
	
		$.ajax({ url: 'https://arsbitcoin.com/api.php?api_key='+api_key,
		success: function(data) {
			data = $.parseJSON(data);
			
			$('#hashrate').text( data.hashrate + ' MH/s' );
			$('#balance').text( data.confirmed_rewards.substr(0, 10) + ' BTC' );
			$('#poolrate').text( data.poolHR + ' MH/s' );

			// Operations
			var shares = 0; var stales = 0;
			for ( w in data.workers ) {
				if( !isNaN(parseInt(data.workers[w].shares)) )
					{ shares = shares + parseInt(data.workers[w].shares); }
				if( !isNaN(parseInt(data.workers[w].staleShares)) )
					{ stales = stales + parseInt(data.workers[w].staleShares); }
			}
			
			var stats = $('#stats').html().split(' ');
			stats[0] = shares; stats[3] = '-'+stales;
			stats[6] = data.PPSShares; stats[9] = '-'+data.staleShares;
			
			stats = stats.join(' ');
			$('#stats').html(stats);
			
		}})
	
	}
	
	
});
