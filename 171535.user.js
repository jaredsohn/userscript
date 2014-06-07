// ==UserScript==
// @name          4chan Janitor UserJS
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace     http://imgbear.com/Crap/Scripts/4chan_Janitor.user.js
// @description   Ask not what 4chan can do for you - ask what you can do for 4chan.
// @include       http://boards.4chan.org/*
// @include		  https://sys.4chan.org/j/*
// ==/UserScript==

function fixHttpsJanitorBoard()
{
	$('a[href]').each(function() { $(this).attr('href', $(this).attr('href').replace('https:', 'http:')); } );
	$('img').each(function() { $(this).attr('src', $(this).attr('src').replace('https:', 'http:')); } );
	$('link').each(function() { $(this).attr('href', $(this).attr('href').replace('https:', 'http:')); } );
}

function initJanitorTools()
{
	fixHttpsJanitorBoard();
	
	
	// Expand Janitor Tools for our functions to slide into
	var div = document.createElement('div');
	div.setAttribute('class', 'postblock');
	div.appendChild(document.createTextNode('Extended Janitor Tools'));

	$('#4chan_ext_admin_tools').append(div);
	$('#4chan_ext_admin_tools').append('<div id="4chan_janitor_tools"></div>');
	
	$('#4chan_janitor_tools').attr('style', 'padding: 3px;');
	
	$('#4chan_janitor_tools').append('Search [<a href="javascript:void(0);" id="jan_search_bn">name</a> | <a href="javascript:void(0);" id="jan_search_bt">trip</a> | <a href="javascript:void(0);" id="jan_search_bp">post</a> | <a href="javascript:void(0);" id="jan_search_bf">file</a>] [<a href="javascript:void(0);" id="jan_decelerate">decel</a><!-- | <a href="javascript:void(0);" id="jan_accelerateonly">rev</a>-->]<div id="search_expanded" style="display: none; margin-top: 3px;"></div>');
	$('#4chan_janitor_tools > a').attr('style', 'text-decoration: underline;');
	
	$('#jan_search_bn').click(function(){ openSearchDialogue('name'); });
	$('#jan_search_bt').click(function(){ openSearchDialogue('trip'); });
	$('#jan_search_bp').click(function(){ openSearchDialogue('post'); });
	$('#jan_search_bf').click(function(){ openSearchDialogue('file'); });
	$('#jan_decelerate').click(function() { selectAccelerator(); } );
	//$('#jan_accelerateonly').click(function() { selectNonAccel(); } );
	
	$('input[type="checkbox"]').click(function(event) { decelerator(event) });
	
}

//////\s[jqrxzrlf]\w(\.$|\s.+\.$) -i;\s[bcdefghjklmnopqstvwyz](\.$|\s.+\.$) -i;^\d\d\d+$;<br><br>\d\d\d+$ -h
function selectAccelerator()
{
	alertedThisRound = false;
	
	$('.filesize').each(function() {
		stuff = $(this).html();
		if( (stuff.match(/\([0-9] KB/) || stuff.match(/\([0-9]{2,} B/)) && stuff.match(/[jpg|png]">([a-z]+|[0-9]+)\.[jpg|png]/) ) {
			
			id = $(this).parent().attr('id');
			
			if( id.match('4chan_ext_thread_') ) {
				$('#' + id).attr('style', 'background-color: #fff!important;');
				id = id.split('4chan_ext_thread_')[1];
				
				if( alertedThisRound = false ) { alert('Warning, OP was selected.'); alertedThisRound = true; }
			
			}
			
			
			$('input[name="' + id + '"]').attr('checked', true);
			$('#' + id).attr('style', 'background-color: #fff!important;');
		}
	});
}

function selectNonAccel()
{
	$('td.reply').each(function() {
		stuff = $(this).html();
		if( (stuff.match(/\([0-9] KB/) && stuff.match(/jpg">([a-z]+|[0-9]+)\.jpg/)) ) {
		} else {
			id = $(this).attr('id');

			$('input[name="' + id + '"]').attr('checked', true);
			$('#' + id).attr('style', 'background-color: #fff!important;');
		}
	});
}

// Fuck you, spammer.
function decelerator(e)
{
	if( e.shiftKey == true ) {
		$('input[type="checkbox"]:not(:last-child)').each(function(index, value) {
			if( doCheckBox($(value).attr('checked')) == true ) {
				$(value).attr('checked', true);
			}
		});
		
		flag = false;
	}
}

flag = false;
function doCheckBox(value)
{
	if( value == false ) {
		if( flag == true ) {
			return true;
		} else {
			return false;
		}
	}
	
	if( value == true ) {
		if( flag == false ) {
			flag = true;
			return true;
		} else {
			flag = false;
			return false;
		}
	}
}

function openSearchDialogue(type)
{
	$('#search_expanded').html('<form id="search_by_form" style="margin: 0px; clear: none;"><input type="text" name="search_content" id="search_content" /><input type="submit" value="Search by ' + type + '"><br /><input type="checkbox" name="regex" value="regexChecked" id="regex"><label for="regex">Regex?</label></form>');
	$('#search_expanded').slideDown(100);
	
	$('#search_by_form').submit(function() {
		var val = $('#search_content').val();
		if( $('#regex:checked').length == 1 ) {
			val = new RegExp(val);
		}
		
		switch(type) {
		case "name":
			searchByName(val);
			break;
		
		case "trip":
			searchByTrip(val);
			break;
		
		case "post":
			searchByPost(val);
			break;
			
		case "file":
			searchByFile(val);
			break;
		}
		
		return false;
	});
}

function searchByPost( post )
{
	$('blockquote').each(function() {
		if( $(this).html().match(post) ) {
		
			id = $(this).parent().attr('id');
			
			$('input[name="' + id + '"]').attr('checked', true);
			
			$('#' + id).attr('style', 'background-color: #fff!important;');
		}
	});
}

function searchByName( name )
{
	if( name == 'Anonymous' ) {
		alert('Searching for "Anonymous" (Case sensitive!) is a very silly idea, this is not allowed.');
		
		$('#search_content').val('');
		return false;
	}
	
	$('.commentpostername').each(function() {
		if( $(this).html().match('linkmail') ) {
			safeName = $(this).html().split('linkmail">')[1].split('</a>')[0];
		} else {
			safeName = $(this).html();
		}

		if( safeName.match(name) ) {
			// Does this jerk have a tripcode?
			id = $(this).parent().attr('id');
			
			$('input[name="' + id + '"]').attr('checked', true);
			
			$('#' + id).attr('style', 'background-color: #fff!important;');
		}
	});
	
	$('.postername').each(function() {
		if( $(this).html().match('linkmail') ) {
			safeName = $(this).html().split('linkmail">')[1].split('</a>')[0];
		} else {
			safeName = $(this).html();
		}

		if( safeName.match(name) ) {
			// Does this jerk have a tripcode?
			id = $(this).parent().attr('id');
			cid = id.split('4chan_ext_thread_')[1];
			
			$('input[name="' + cid + '"]').attr('checked', true);

			$('#' + id).attr('style', 'background-color: #fff!important;');
		}
	});
}

function searchByTrip(trip)
{
	$('.postertrip').each(function() {
		if( $(this).html().match(trip) ) {
			id = $(this).parent().attr('id');
			$('input[name="' + id + '"]').attr('checked', true);

			$('#' + id).attr('style', 'background-color: #fff!important;');
		}
	});
}

function x(xpath, root) {
	  if (!root) root = document.body;
	  return document.evaluate(xpath, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	}

function searchByFile(file) {
	//\s(\d){8,12}.jpg; \([123456789]\sKB; \s(\d){8,12}.jpg;
	$('.filesize').each(function() {
		if( $(this).html().match(file) ) {
			id = $(this).parent().attr('id');
			$('input[name="' + id + '"]').attr('checked', true);

			$('#' + id).attr('style', 'background-color: #fff!important;');
		}
	});
}

initJanitorTools();
