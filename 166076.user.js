// ==UserScript==
// @name        peka2tv
// @namespace   sc2tv.ru http://userscripts.org/users/515123
// @description sc2tv.ru redesign + extra features
// @author      Winns
// @copyright   27.04.2013, Winns
// @include     http://sc2tv.ru/*
// @version     1.2.1
// @updateURL   http://userscripts.org/scripts/source/166076.meta.js
// @downloadURL https://userscripts.org/scripts/source/166076.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @require     http://code.jquery.com/jquery-2.0.2.min.js
// @resource    peka2tv_style https://raw.github.com/Winns/p2tv/master/peka2tv/peka2tv.css
// ==/UserScript==

GM_addStyle (GM_getResourceText ("peka2tv_style"));

$(document).ready(function() {
	// variables
	var p2tv = {
		isLogged: false,
		openNews: false
	}
	
	// open news page ?
	if ( $('.pager').length ) { 
		p2tv.openNews = false; 
	} else {
		p2tv.openNews = true;
	}
	

	// login
		$('#edit-name-wrapper').find('label').remove();
		$('#edit-name').attr('placeholder', 'имя');

		// if user not logged id
		if ( $('#edit-pass').length ) {
			$('#edit-pass-wrapper').find('label').remove();
			$('#edit-pass').attr('placeholder', 'пароль');

			
			$('<div id="gamenav_new">'
					+'<div id="p2tv_login_info">'
						+'<a href="/user/register" title="Создать нового пользователя.">создать аккаунт</a>'
						+'<a href="/user/password" title="Запросить новый пароль по электронной почте.">забыли пароль?</a>'
					+'</div>'
					+'<div id="p2tv_login_wrapper">'
						+'<form action="/node?destination=node" accept-charset="UTF-8" method="post" id="user-login-form" class="p2tv_login"></form>'
					+'</div>'
				+'</div>'
			).appendTo('#header');
			
			$('#gamenav').find('input').each(function() {
				$(this).appendTo('.p2tv_login');
			});
			
			$('#gamenav').remove();
			$('#gamenav_new').attr('id', 'gamenav');
		} else {	
			p2tv.isLogged = true;
		}

	// fix fullscreen button pos
	if ( p2tv.isLogged == false ) {
		$('#chat-switch-screen-btn img').css({ 'bottom': '16px' });
	}
	
	// hide "свежие комментарии"
		$("[id*=block-sc2tv_recentcomments]").hide();

	// hide tags
		$("[id*=block-tagadelic]").hide();
		
	// news design
		// redesign news text
			$('#content p').css({
				'font-size': '12px',
				'line-height': '16px'
			});
		
		// reduce news images size
			if ( p2tv.openNews == false ) {
				$('.center img').each(function(){
					$(this).css({
						'width': ( $(this).width()/1.5 ),
						'height': ( $(this).height()/1.5 )
					});
				});
			}

		$('.fullnews').each(function() {
			// news header
				var newsHeader	= $(this).find('.list-header');
				
				// remove from cycle
				newsHeader.css('background-color', '#f0f0f0');
				
				var newsDate = newsHeader.find('.news-time').html(),
					newsAuthor = newsHeader.find('.author').html();
					
				newsHeader.find('.author').remove();
				
				var newsTags = ''
				newsHeader.find('li').each(function(){
					newsTags += $(this).html();
				});

				newsHeader.html(
					'<div class="p2tv_news_dateauthor">'+ newsAuthor +'<br>'+ newsDate +'</div>'
					+'<div class="p2tv_news_tags">'+ newsTags +'</div>'
				);

			// news body
				var news = $(this).find('.list-content'),
					newsName = news.find('h2:first').html(),
					newsVoteWidget = news.find('[id*=widget-node].vud-widget'),
					newsVoteWidgetScore = newsVoteWidget.find('.updown-current-score').html();
					
				// delete old name
				news.find('h2:first').remove();

				// print new name and vote
				news.prepend(
					'<div class="p2tv_news_name">'+ newsName +'</div>'
					+'<div class="p2tv_news_vote">'
					+'<div class="p2tv_news_vote_temp vud-widget vud-widget-updown"></div>'
					+'</div>'
					+'<div class="clear"></div>'
				);
				
				news.find('.p2tv_news_vote_temp').attr('id', newsVoteWidget.attr('id') );

				// twitter
				newsTwitter = news.find( '.twitwrap' );
				
				// vk
				newsVK = news.find( '[id*=vkshare]' );
				
				// favorite
				newsFavorite = news.find( '.btn-favorite' );
				newsFavorite.attr('title','добавить в избранное');
				newsFavorite.html('&hearts; в избранное');
				newsFavorite.addClass('p2tv_news_widgets_cell');
				
				// vote
				newsVoteWidget.find('div').first().appendTo( news.find('.p2tv_news_vote_temp') );
				
			// news footer
				var newsFooter = $(this).find('.list-footer');
				
				// create widgets wgapper
				newsFooter.append( 
					'<div class="p2tv_news_widgets_wrapper">'
						+'<div class="p2tv_news_social">'
							+'<div class="p2tv_widget_close"><em>ПОДЕЛИТСЯ</em>CLOSE</div>'
							+'<div class="p2tv_widget_content"></div>'
						+'</div>'
					+'</div>' );
				
				// push favorite
				$(newsFavorite).appendTo( newsFooter.find('.p2tv_news_widgets_wrapper') );
				
				// create social networks wrapper
				$('<div class="p2tv_news_widgets_cell p2tv_open_news_solial">соц. сети</div>').appendTo( newsFooter.find('.p2tv_news_widgets_wrapper') );
				
				// push twiter and vk
				newsTwitter.appendTo( newsFooter.find('.p2tv_news_social .p2tv_widget_content') );
				newsVK.appendTo( newsFooter.find('.p2tv_news_social .p2tv_widget_content') );
				
		});
			
		// handle "соц. сети" click
			$('.p2tv_open_news_solial').on('click', function() {
				var e = $(this).parent().find('.p2tv_news_social');
				e.css( 'left', $(this).position().left );
				if ( e.is(':visible') ) { 
					e.hide();
				} else { 
					e.show(); 
				}
			});
			$('.p2tv_news_social .p2tv_widget_close').on('click', function() {
				$(this).parent().hide();
			});

			
		// change news rating pos if not logged
			if ( p2tv.isLogged == false ) {
				$('.p2tv_news_vote_temp').find('.updown-score').css('float', 'right');
			}

	// fan streams
		$('#user-stream').prepend('<div id="p2tv_fanstreams_menu"></div>');
		$('#user-stream ul:first').addClass('p2tv_fanStreams_ul');
		
		// sort by rating button
			$('#p2tv_fanstreams_menu').append( 
				'<a href="javascript:" class="p2tv_fanstreams_sort_by_rating p2tv_tags" title="сортировать по рейтингу">'
				+'по рейтингу'
				+'</a>' 
			);
		
		// tags
			var p2tvFanStreamsTags = [];
			$('#user-stream:first .category span').each(function() {
				var tag = $.trim( $(this).text().toLowerCase() );
				if ( tag != '' ) {
					p2tvFanStreamsTags.push( tag );
				}
			});
		
		// count tags
			var p2tvTempObj = {};
			for ( var i=0; i < p2tvFanStreamsTags.length; i++ ) {
				if ( p2tvTempObj.hasOwnProperty( p2tvFanStreamsTags[i] ) ) {
					p2tvTempObj[ p2tvFanStreamsTags[i] ] += 1;
				} else {
					p2tvTempObj[ p2tvFanStreamsTags[i] ] = 1;
				}
			}
		
		// print tags
			for ( var key in p2tvTempObj ) {
				$('#p2tv_fanstreams_menu').append( 
					'<a href="javascript:" class="p2tv_tags" title="'+ key +'">'
					+ key +' <span class="p2tv_tags_count">'+ p2tvTempObj[key] +'</span>'
					+'</a>' 
				);
			}

		// restyle stream preview
			$('#user-stream ul li').not('.category li').each(function() {
					// remove "???.."
					$(this).find('.left p').remove();
					
					// print new tag
					var tag = $(this).find('.category span').text();
					if (tag != '') {
						$(this).append( '<div class="p2tv_stream_gametag_box" title="'+ tag +'">'+ tag +'</div>' );
					}

					// print new name
					var streamerName = $(this).find('.user').text();
					if (streamerName != '') {
						$(this).append( '<div class="p2tv_stream_streamer_box" title="'+ streamerName +'">'+ streamerName +'</div>' );
						
						// print rating
						var rating = $(this).find('p:contains("Рейтинг : ")');
						rating = rating.text().substr(9);
						$(this).find('.p2tv_stream_streamer_box').prepend( '<span class="p2tv_stream_rating">'+ rating +'<span><br>' );
						$(this).find('.p2tv_stream_rating').children().remove();
					}

					// wrap new preview box
					$(this).append(
						'<div class="p2tv_stream_preview_box">'
							+'<div class="p2tv_stream_preview_top"></div>'
							+'<div class="p2tv_stream_preview_bottom"></div>'
						+'</div>'
					);

					// print image
					var img = $(this).find('.left img');
					img.appendTo( $(this).find('.p2tv_stream_preview_top') );
					
					// prine title
					var title = $(this).find('.right strong:first');
					$(this).find('.p2tv_stream_preview_bottom').prepend( '<span class="p2tv_stream_title">'+ title.text() +'<span><br>' );
					
					// print description
					var desc = $(this).find('.right p').not(':contains("Рейтинг : ")');
					desc.appendTo( $(this).find('.p2tv_stream_preview_bottom') );
					
					// remove old preview box
					$(this).find('.block').remove();
					
					// cut&paste play button
					$(this).find('.hover').appendTo( $(this).find('.p2tv_stream_preview_top') ).removeClass('hover').addClass('p2tv_stream_playbtn');
				
			});
			
		// handle tag click
			function p2tv_sortByTag( frame, tag ) {
				var f = '',
					otherContainers = '';
				tag = $.trim( tag.toLowerCase() );
				
				switch ( frame ) {
					case 'fan':
						f =	{ 
							frame: $('#user-stream:first ul:first'),
							tagContainer: $('.p2tv_stream_gametag_box')
						}
						break;
				}
				
				// remove highlight from other streams if exist
				otherContainers = f.frame.find('li').not('.category li');
				otherContainers.removeClass('p2tv_sel_stream_tag');

				f.tagContainer.each(function() {
					var t = $.trim( $(this).text().toLowerCase() );
					if ( t == tag ) {
						var container = $(this).parent();
						// highlight selected streams
						container.addClass('p2tv_sel_stream_tag');
						f.frame.prepend( container );
					}
				});
			}
			
			$('.p2tv_tags').on('click', function() {
				p2tv_sortByTag( 'fan', $(this).attr('title') );
				// apply selected style
				$('.p2tv_tags').removeClass('p2tv_tags_sel');
				$(this).addClass('p2tv_tags_sel');
				
				$('.p2tv_tags_count').removeClass('p2tv_tags_count_sel');
				$(this).find('span').addClass('p2tv_tags_count_sel');
			});
			
		// handle sort by rating click
			$('.p2tv_fanstreams_sort_by_rating').on('click', function() {
				function sortByRating(a, b) {
					return  $(b).find('.p2tv_stream_rating').text() - $(a).find('.p2tv_stream_rating').text();
				}
				$('.p2tv_fanStreams_ul li').sort(sortByRating).appendTo( $('.p2tv_fanStreams_ul') );
			});
			

});
