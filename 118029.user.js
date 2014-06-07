// ==UserScript==
// @name	   	   Google Reader Share
// @namespace      http://agentsanjeev.com
// @description    Script that uses jQuery to create a share button, and when clicked, it will add the item to your feed
// @include	http://google.com/reader/*
// @author	 Sanjeev Satheesh --Special Thanks: DumpsterDoggy (Chris Missal), http://www.joanpiedra.com/jquery/greasemonkey
// ==/UserScript==

var messageText = '';
var $currentElement = undefined;

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Add md5 script
var GM_MD5 = document.createElement('script');
GM_MD5.src = 'http://agentsanjeev.com/js/md5.js';
GM_MD5.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_MD5);

// Check if jQuery's loaded
function GM_wait() {
	if((typeof unsafeWindow.jQuery == 'undefined') || (typeof unsafeWindow.hex_md5 == 'undefined'))
		window.setTimeout(GM_wait,100); 
	else {
		$ = unsafeWindow.jQuery; 
		hex_md5 = unsafeWindow.hex_md5;
		letsJQuery(); 
	}
}

GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	$('#top-bar').slideUp()
	$('#viewer-header').height('50px');
	$('#lhn-add-subscription-section').height('50px');
	
	$.currentUserEmail = hex_md5( $('.gbps2:first').text() );
	$.currentUserName = $('#gbi4m1').text();
	
	$.shared = {
		length: 0,
		contains: function(k) {
			return (typeof this[k] === 'undefined') ? false : true;
		},
		add: function(k, v) {
				if (typeof this[k] === 'undefined')
					this.length++;
				this[k] = v;
		},
		remove: function(k) {
				if (typeof this[k] !== 'undefined')
					this.length--;
				delete this[k];
		}
	}

	$.getData = function() {
		$main = $('#current-entry .entry-container .entry-main')
		$title = $main.find('.entry-title-link').text();
		$date = $main.find('.entry-date').text();
		$author = $main.find('.entry-author').text();
		$link = $main.find('.entry-title-link').attr('href');
		$body = $main.find('.entry-body').html();
		
		return {
			'title' : $title, 'date' : $date, 
			'author' : $author, 'link' : $link, 
			'body' : $body, 
			'sharer_name' : $.currentUserName,
			'sharer_enc' : $.currentUserEmail,
		};
	}	
	
	$.newHidden = function(name, value) {
		return $('<input />', {
					'type' : 'hidden',
					'name' : name,
					'value': value
				});
	}
	
	$.createForm = function( $data ){
		$('#secret-submit').remove();
		$iframe = $('<iframe />', {'display' : 'none', 'id' : 'secret-submit', 'name': 'secret-submit', 'height' : '0px', 'width' : '0px'});
		
		$form = $('<form />',{'action':'http://agentsanjeev.com/share.php','method':'POST','target':'secret-submit'})
		for(key in $data) 
			$form.append( $.newHidden(key, $data[key] ) )
		$iframe.append( $form );
		
		$('#current-entry').append( $iframe );
		$form.submit();
	}
	
	$.submitData = function($data){
		
	}

	$("#entries").bind("DOMSubtreeModified", function(event) {
		if( event.target.id == 'current-entry' && $('#current-entry .entry-actions:first').length > 0 )
		{
			$.feedData = $.getData();
			
			$('#custom-share').remove();
			$entry_actions = $('#current-entry .entry-actions:first');
			
			console.log($entry_actions)
			if( $entry_actions.find('#custom-share').length <= 0 )
			{
				$span = $('<span id="custom-share" style="cursor:pointer;"><img src="http://agentsanjeev.com/feed.png" /> Share</span>');
				$entry_actions.append($span)
				if( $.shared.contains( $.feedData.link ) )
					$entry_actions.find('img').attr({'src':'http://agentsanjeev.com/feeded.png'})
					
				$entry_actions.find('#custom-share').toggle(
					function(event){
						if( event.timeStamp != $.latestTimeStamp )
						{
							$(this).find('img').attr({'src':'http://agentsanjeev.com/feeded.png'})
							$.shared.add( $.feedData.link, $.feedData );
							$.createForm( $.feedData )
						}
					},
					function(event){
						if( event.timeStamp != $.latestTimeStamp )
						{
							$.latestTimeStamp = event.timeStamp;
							$.shared.remove( $.feedData.link );
							$(this).find('img').attr({'src':'http://agentsanjeev.com/feed.png'})
						}
					}
				)
			}
		}
	});
}
