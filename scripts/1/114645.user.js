// ==UserScript==
// @name           reddit.com - Highlight comments which have been edited since you replied
// @namespace      v1
// @include        http://www.reddit.com/*/comments/*
// @include        https://www.reddit.com/*/comments/*
// ==/UserScript==

function main()
{
	// Set max number of comments to save copies of.
	// Assuming average comment lengh of 160 chars (160 is surprisingly accurate), the script will use around 500Kb of local storage.
	var maxComments = 2500;

	// Save copy of parent comment when replying
	$('.usertext-buttons .save').live( 'click',function(){
	
		// Get copy of parent comment
		var	thing	= ( $(this).parents('form').attr('onsubmit').indexOf('comment') != -1 ) // Are we making a new comment, or editing a previous one
					? $(this).thing()
					: $(this).thing().parent().thing(),
			thing_id = thing.thing_id().substring(3);
		if( thing.length == 0 || thing_id == '' ) return;
		var commentText = thing.find('div.md:first').html();

		// Get list of currently backed up comments & trim if needed.
		var	savedComments = ( localStorage.getItem( 'savedComments' ) || thing_id ).split(',');
		while( savedComments.length >= maxComments ) localStorage.removeItem( 'backup_'+ savedComments.shift() );

		// Save parent for prosperity
		if( $.inArray( thing_id, savedComments ) == -1 ) savedComments.push( thing_id );
		localStorage.setItem( 'backup_'+ thing_id, commentText );
		localStorage.setItem( 'savedComments', savedComments.join(',') );
	});

	// Highlight comments which have been edited since we replied to them
	$('.thing:not(.link) .usertext-edit').each( function(){
		
		// Check that parent exists
		var thing = $(this).thing().parent().thing(),
			thing_id = thing.thing_id().substring(3);
		if( thing.length == 0 || thing_id == '' ) return;
		
		// Check comment versions don't match
		var	oldComment = localStorage.getItem( 'backup_'+thing_id ),
			newComment = thing.find('div.md:first').html();
		if( !oldComment || oldComment == newComment ) return;

		// Add highlight & insert hidden copy of unedited comment into the DOM
		thing.addClass('edited')
			 .find('.entry:first').css('background-color','#FDD')
			 .find('div.md:first').after( '<div class="md" style="display:none">'+oldComment+'</div>' );
	});

	// Add buttons to toggle current/previous comment version
	var toggleEdit = $('<a href="javascript:void(0)" class="undo">undo</a>')
		.toggle( function(){ $(this).text('redo') }, function(){ $(this).text('undo') } )
		.click( function(){ $(this).thing().find('div.md:lt(2)').toggle() } )
		.wrap('<li />').parent();
	$('.thing.edited').find('ul.buttons:first').append( toggleEdit )
}

// Add script to the main page scope
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );