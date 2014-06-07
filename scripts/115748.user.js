// ==UserScript==
// @name           eRepublik Party Shoutbox
// @namespace      eRepublik
// @version        1.0
// @description    Add a shoutbox tab for your party!
// @include        http://www.erepublik.com/*
// ==/UserScript==

var $;

var g_new_post = null;
var g_pageNumber = 1;

function shout_close_shouter(forced)
{
	var input_field = $('textarea#shout');
	if($.trim(input_field.val()) == '' || forced) {
		($.browser.msie) ? $('.controls').hide() : $('.controls').fadeOut('fast');
		$('.shouter').css('height', $('.shouter').height());
		setTimeout(function(){
			input_field.css('height', '19px');
			if (input_field.hasClass('maxchars')) {
				input_field.removeClass('maxchars');
			}
			$('.shouter').removeClass("focused").gx({'height':'42'},150, 'Sine');
			if ($.trim(input_field.val()) == ''){
				input_field.val(input_field.data('placeholder'));
			}
		},100);
	}
}

function shout_new_post()
{
	if( $('#isPartyFeed').val() == 1 )
	{
		$('.shouter').addClass('posting');
		
		setTimeout( function()
		{
			GM_xmlhttpRequest(
			{
				method: 'POST',
				url: 'http://euslp.com/shoutbox/partys.php',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: $('#wall_post').serialize() + '&partyid=' + $('#partyId').val() + '&place=' + $('#partyPosition').val() + '&citizen=' + $('#userId').val() + '&username=' + $('#userName').val() + '&ava=' + escape( $('#userAvatar').val() ),
				onload: function( r )
				{
					var data = $.parseJSON( r.responseText );
					
					shout_close_shouter('forced');
					$('.shouter').removeClass('posting');
					$('textarea#shout').val($('textarea#shout').data('placeholder'));

					if(!data.message)
					{
						$('.wall_error').html(data.error_message);
						$('.wall_error').fadeIn('fast');
						$('.wall_error').scrollHeight;
					}
					else
					{
						var currentVisible = $('.wall_post_list > ul > li:visible').size();
						
						if( $('#partyPosition').val() == 'party_president' && data.ppu != 0 )
						{
							if( $('.wall_post_list li:first').attr('title') == 'party_president' )
							{
								$('.post_content:first p').html( data.ppu );
								$('.post_content:first em').html( 'now' );
								$('.wall_post_list li:first').after( data.success_message );
							}
							else
							{
								$('.wall_post_list > ul').prepend( data.success_message );
							}
						}
						else
						{
							if( $('.wall_post_list li:first').attr('title') == 'party_president' )
							{
								$('.wall_post_list li:first').after( data.success_message );
							}
							else
							{
								$('.wall_post_list > ul').prepend( data.success_message );
							}
						}
						
						var display = POSTS_LIMIT+1;
						
						if(currentVisible == display ) {
							$('.wall_post_list > ul > li:eq('+display+')').fadeOut('slow');
							$('.wall_post_list > ul > li:lt('+display+')').fadeIn('slow');
							$('.previous_posts > a').show();
							var posts_count = parseInt($('#posts_count').val());
							$('#posts_count').val(posts_count+1);
							window.scroll(top);
						}
					}
				}
			});
		}, 0 );
	}
	else
	{
		g_new_post();
	}
}

function shout_get_party_feeds() 
{
	g_pageNumber = 1;
	
	try
	{
		$('#show_party_feed').addClass('active');
		$('#show_regiment_feed').removeClass('active');
		$('#show_friends_feed').removeClass('active');
		$('#isGroupFeed').val(0);
		$('#isPartyFeed').val(1);
		
		$('#group_older_feeds').hide(); $('#group_older_feeds').attr('trigger', '');
		$('#citizen_older_feeds').hide();
		
		setTimeout( function()
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://euslp.com/shoutbox/party.php?party=' + $('#partyId').val(),
				onload: function( r )
				{
					$('.wall_post_list > ul').html( r.responseText );
					$('#shout').val('Say something to ' + $('#partyName').val() + ' ...');
					$('.own_pic').attr("src", $('#partyAvatar').val() );
					
					$('#party_older_feeds').show();
				}
			});
		}, 0 );
	} catch(e){;}
}

function shout_getOlderPartyPosts()
{
	setTimeout( function()
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://euslp.com/shoutbox/older.php?party=' + $('#partyId').val() + '&page=' + g_pageNumber,
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			onload: function( r )
			{
				$('.wall_post_list > ul').append( r.responseText );
					
				g_pageNumber++;
			}
		});
	}, 0 );
}

function shout_clickHandler(e)
{
	var $clicked = $(e.target);
	
	if ($clicked.attr('trigger') == 'shout_get_party_feeds') {
		shout_get_party_feeds();
	} else if ($clicked.attr('trigger') == 'previous_party_posts') {
		shout_getOlderPartyPosts();
	}
}

function appendPartyData()
{
	$('#citizen_feed ul:first').append('<li id="show_party_feed" class=""><a href="javascript:;" trigger="shout_get_party_feeds">Party</a></li>');
	$('#citizen_older_feeds').after('<div class="previous_posts" id="group_older_feeds" style="display: none;"><a href="javascript:;" title="Older Group posts" class="blue_arrow_down_medium" trigger="previous_group_posts"><span trigger="previous_group_posts">Older Group posts</span></a></div>');
	$('#citizen_older_feeds').after('<div class="previous_posts" id="party_older_feeds" style="display: none;"><a href="javascript:;" title="Older Party posts" class="blue_arrow_down_medium" trigger="previous_party_posts"><span trigger="previous_party_posts">Older Party posts</span></a></div>');
	$('#wall_master').bind('click', shout_clickHandler);
}

function shout_get_citizen_feeds()
{
	try
	{
		$('#show_friends_feed').addClass('active');
		$('#show_regiment_feed').removeClass('active');
		$('#show_party_feed').removeClass('active');
		$('#isGroupFeed').val(0);
		$('#isPartyFeed').val(0);		
	
		$('#shout').val('Say something to your friends ...');
		$('.own_pic').attr( "src", $('#userAvatar').val() );
		
		$('#group_older_feeds').hide();
		$('#party_older_feeds').hide();
		
		$.post('/en/main/wall-post/older/', {_token: $('#_token').val(), page: 0}, function(data)
		{
			$('.wall_post_list > ul').html(data);
			$('#citizen_older_feeds').show();
		});
	} catch(e){;}
}

function shout_get_group_feeds()
{
	try
	{
		$('#show_regiment_feed').addClass('active');
		$('#show_friends_feed').removeClass('active');
		$('#show_party_feed').removeClass('active');
		$('#isGroupFeed').val(1);
		$('#isPartyFeed').val(0);
		$('.blue_arrow_down_medium span').show();
		
		$('#citizen_older_feeds').hide();
		$('#party_older_feeds').hide();
		
		$.post('/en/main/group-wall/older/retrieve', {_token: $('#_token').val(), page: 0, groupId: $('#groupId').val(), part: 1}, function(data)
		{
			var startIdx = data.indexOf( "<div class=\"wall_post_list\">" ) + 28;
			var endIdx = data.indexOf( "</ul>\n\t</div>\n\t</div>" );
			var skimData = data.substr( startIdx + 7, ( endIdx - startIdx ) - 4 );
			
			$('.wall_post_list > ul').html( skimData );
			$('#shout').val('Say something to your military unit ...');
			$('.own_pic').attr( "src", $('#userAvatar').val() );
			$('#group_older_feeds').show();
		});
	} catch(e){;}
}

if( typeof( unsafeWindow.jQuery ) != 'undefined' ) 
{
	$ = unsafeWindow.jQuery;		
}

$(document).ready(function()
{
	$('#isGroupFeed').after('<input type="hidden" id="isPartyFeed" value="0" />');

	var userId = $('.user_avatar').attr('href');
	var userName = $('.user_avatar').attr('title');
	
	userId = userId.split('/');
	userId = userId[ userId.length - 1 ];
	
	$('#isGroupFeed').after('<input type="hidden" id="userId" value="' + userId + '" />');
	$('#isGroupFeed').after('<input type="hidden" id="userName" value="' + userName + '" />');
	$('#isGroupFeed').after('<input type="hidden" id="userAvatar" value="' + $('.user_avatar img').attr('src') + '" />');

	$.get('http://www.erepublik.com/en/citizen/profile/' + userId, function(x)
	{
		var partyFind = /<a href=\"\/en\/party\/(.+?)\/1">/g.exec( x );
		partyFind = partyFind[1];
		partyFind = partyFind.split('-');
		
		$('#isGroupFeed').after('<input type="hidden" id="partyId" value="' + partyFind[partyFind.length-1] + '" />');
		
		var partyAva = /<img width=\"30\" height=\"30\" src=\"http:\/\/static.erepublik.com\/uploads\/avatars\/Parties\/(.+?)\" alt="(.+?)" \/>/g.exec( x );
		
		$('#isGroupFeed').after('<input type="hidden" id="partyAvatar" value="http://static.erepublik.com/uploads/avatars/Parties/' + partyAva[1] + '" />');
		$('#isGroupFeed').after('<input type="hidden" id="partyName" value="' + partyAva[2] + '" />');
		
		var partyTitle = /<h3><img src=\"http:\/\/www.erepublik.com\/images\/modules\/_icons\/(.+?)\.png\" alt=\"\" \/>(.+?)<\/h3>/g.exec( x );
		
		$('#isGroupFeed').after('<input type="hidden" id="partyPosition" value="' + partyTitle[1] + '" />');
	});

	g_new_post = unsafeWindow.new_post;
	g_populatePreviousPosts = unsafeWindow.populatePreviousPosts;
	
	unsafeWindow.get_citizen_feeds = shout_get_citizen_feeds;
	unsafeWindow.get_group_feeds = shout_get_group_feeds;
	unsafeWindow.new_post = shout_new_post;
	
	$('#citizen_feed_friends').html(''); // Annoying shit
	
	appendPartyData();
});