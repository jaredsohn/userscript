// ==UserScript==
// @name           reddit.com - Mod Crossref
// @namespace      v2
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
// ==/UserScript==

function main(){

	// Only refresh ajax pages every minute mins.
	var ajaxcachetime = 60000;

	// Add reply form template (so we can reply to modmail messages directly in the modqueue.
	if( !$('form.usertext.cloneable').length ) $('.content:first').prepend('<form action="#" class="usertext cloneable" onsubmit="return post_form(this, \'comment\')" style="display:none" id="form-usu"><input type="hidden" name="thing_id" value=""><div class="usertext-edit" style=""><div><textarea rows="1" cols="1" name="text"></textarea></div><div class="bottom-area"><span class="help-toggle toggle" style=""><a class="option active " href="#" tabindex="100" onclick="return toggle(this, helpon, helpoff)">formatting help</a><a class="option " href="#">hide help</a></span><span class="error TOO_LONG field-text" style="display:none"></span><span class="error RATELIMIT field-ratelimit" style="display:none"></span><span class="error NO_TEXT field-text" style="display:none"></span><span class="error TOO_OLD field-parent" style="display:none"></span><span class="error DELETED_COMMENT field-parent" style="display:none"></span><span class="error DELETED_LINK field-parent" style="display:none"></span><span class="error USER_BLOCKED field-parent" style="display:none"></span><div class="usertext-buttons"><button type="submit" onclick="" class="save">save</button><button type="button" onclick="cancel_usertext(this)" class="cancel" style="display:none">cancel</button><span class="status"></span></div></div></div></form>');

	// If there are spam links and/or reported posts visible, see if there are any related mod messages...
	var spam = $('div.thing.spam, div.thing.reported');
	if( spam.length ){
		var	url			= reddit.post_site ? '/r/'+reddit.post_site+'/about/message/inbox/' : '/message/moderator/',
			cachedata	= localStorage.getItem( 'ajaxcache-'+url ),
			oldtime		= localStorage.getItem( 'ajaxcache-timestamp-'+url )*1 || 0,
			newtime		= new Date().getTime();

		// If we have cache data and it aint too old, use that, otherwise check modmail.
		if( cachedata && oldtime + ajaxcachetime >  newtime ) mailCrossRef( cachedata );
		else
			$.get( url+'.json?depth=1&limit=100', function(d){
				localStorage.setItem( 'ajaxcache-'+url, d );
				localStorage.setItem( 'ajaxcache-timestamp-'+url, new Date().getTime() );
				mailCrossRef(d);
			},'html');
	};
	
	// Cross reference each spam/reported link with modmail to see if there are any related messages
	function mailCrossRef( mailData ){
		mailData = $.parseJSON( mailData );

		spam.each( function(){
			var	thing	= $(this),
				thingID = thing.thing_id().slice(3),
				author	= thing.find('a.author').text();
		
			for( i in mailData.data.children ){
				var messageData = mailData.data.children[i].data;
				if( messageData.author == author || messageData.body.match('/'+thingID+'/') )
					return thing.find('ul.flat-list.buttons').append('<a class="pretty-button related-message" href="/message/messages/'+messageData.id+'" tabindex="1">related mod message</a>');
			}
		});
	}
	

	// If we're viewing a modmail page, do a cross reference with the spam page to check for relavent links
	if( location.href.match('/about/message/inbox') || location.href.match('/message/moderator') ){

		var reddits = {};
		if( location.href.match('/about/message/inbox/') )
			reddits[reddit.post_site] = 1;
		else 
			$('#siteTable>.thing>.entry .userattrs~a').each( function(){ reddits[ $(this).text() ] = 1; });

		for( subreddit in reddits ){
			var	url			= '/r/'+subreddit+'/about/spam/',
				cachedata	= localStorage.getItem( 'ajaxcache-'+url ),
				oldtime		= localStorage.getItem( 'ajaxcache-timestamp-'+url )*1 || 0,
				newtime		= new Date().getTime();

			// If we have cache data and it aint too old, use that, otherwise check modmail.
			if( cachedata && oldtime + ajaxcachetime >  newtime ) spamCrossRef( cachedata );
			else
				$.get( url+'.json?depth=1&limit=100', function(d){
					localStorage.setItem( 'ajaxcache-'+url, d );
					localStorage.setItem( 'ajaxcache-timestamp-'+url, new Date().getTime() );
					spamCrossRef(d);
				},'html');
		};
	};
	
	// Cross reference each modmail message to see if there are any submissions by the same author stuck in the spam filter
	function spamCrossRef( spamData ){
		spamData = $.parseJSON( spamData );

		$('#siteTable>.thing>.entry').each( function(){
			var	thing		= $(this),
				author		= thing.find('a.author:first').text(),
				subreddit	= thing.find('.userattrs~a:first').text();
			for( i in spamData.data.children ){
				var postData = spamData.data.children[i].data;

				if( postData.author == author && postData.subreddit == subreddit )
					return thing.find('ul.flat-list.buttons').after('<a class="pretty-button  related-message" href="/comments/'+postData.id+'/" tabindex="1">related post</a>');
			}
		});
	}

	// Open inline message box
	var mouseIn = false;
	$('body').append('<div class="pretty-button inline-post" style="display:none;position:absolute;line-height:12px;"/>');
	$('.inline-post').click(function(e){ e.stopPropagation() });
 
	$('a.related-message').live('click', function(e){
		$(this).blur();
		$('html').one( 'click', function(){ $('.inline-post').hide() });
		$('.inline-post').show()
			.offset($(this).offset()).text('loading...').css('min-width',$(this).width())
			.load( this.href + '?limit=1&depth=1 .sitetable>.thing:first' );
		return false;
	});
}

// Add script to the main page scope
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );