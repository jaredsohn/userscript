// ==UserScript==
// @name        ArenaBG
// @namespace   arenabg
// @include     http://arenabg.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

$.getScript( "http://www.elevateweb.co.uk/wp-content/themes/radial/jquery.elevatezoom.min.js" )
	.done(function( script, textStatus ) {
		$('#zoom').elevateZoom({
			// zoomType	: "lens",
			// lensShape	: "round",
			// lensSize	: 250
			zoomWindowWidth:300,
            zoomWindowHeight:300
		});
	})
	.fail(function( jqxhr, settings, exception ) {
		$( "div.log" ).text( "Triggered ajaxError handler." );
	});

$(document).ready(function(){
	$('#arena-line-ul-nav, #adsleft, #adsright, #banner_10, #banner_11, #banner_12').remove();
	$('#arena > #center').css({
		'float': 'none',
		'margin': '0 auto'
	});

	$('#arena > #center > #header').hide();
	if (window.location.pathname == '/'){
		window.location.href = '/torrents';	
	}

	$('#searchbox').css({
		'background': '#404040'
	})

	$('#searchbox > form').css({
		'position': 'relative',
		'overflow': 'hidden',
		'margin':'0'
	})

	$('#searchbox > form > div').css({
		'margin-top':'5px',
	});

	//Navigation changes	

	$('#navigation > #menus > li').each(function(){
		if ($(this).children('a').text() == '» Всички' || 
			$(this).children('a').text() == '» Запознанства' ||
			$(this).children('a').text() == '» Каталог' ){
			$(this).hide();
		}
	});
	$('#navigation > #menus').find('li:nth-child(1)').find('a').attr('href', '/torrents');

	$('<li class="menuparent"><a href="" class="show_tops">» Топ</a></li>').insertAfter('#navigation > #menus > li:nth-child(1)');
	$('.show_tops').on('click', function(event){
		event.preventDefault();
		$('#topcontainer').slideToggle();
	});
	
	$('#top-stats').css({
		'width': '50%'
	})
	$('#top-stats > div').last().append(' | <a href="/users/messages/">pm</a> | <a href="/users/settings/">settings</a> | <a href="/users/logout/">logout</a>')

	$('table#torrents tr').find('td:nth-child(1)').css({
		'width': '120px'
	})

	$('table#torrents tr').find('td:nth-child(1) > a').each(function(){
		$(this).html($(this).attr('title'))
	});

	$('table#torrents tr').find('td:nth-child(1)').css({
		'height':'28px',
		'text-align':'right',
		'padding-right': 10
	});
	$('table#torrents tr').find('td:nth-child(2)').css({
		'vertical-align':'middle'
	});
	$('table#torrents tr').find('td:nth-child(2) .filename').css({
		'float': 'left',
		'width': '75%'
	});
	$('table#torrents tr').find('td:nth-child(2) .filename > a').each(function(){
		$(this).text( $(this).text().substring(0,60));
	});
	$('table#torrents tr').find('td:nth-child(2) .filename > a').css({
		'font-weight':'normal',
		'color': '#fff'
	});

	$('table#torrents tr').find('td:nth-child(2) .menu').css({
		'float': 'left',
		'width': '25%',
		'margin': 0
	});

	$('table#torrents tr').find('td:nth-child(2) .menu > div').css({
		'width': '100%',
		'position':'relative',
		'overflow':'hidden',
		'height':'auto'
	});

	$('table#torrents tr').find('td:nth-child(3)').each(function(){
		$(this).html( $(this).find('span').text() );
	});

	$('#main > #top, #topcontainer').hide();
	$('#topcontainer').css({
		'width':'auto',
		'margin':0
	});

	$('#torrent').find('#poster img').css({
		'max-width': '130px',
		'height': 'auto'
	});


	var poster_url = $('#torrent').find('#poster img').attr('src');
	$('#torrent').find('#poster img').attr('data-zoom-image', poster_url);
	$('#torrent').find('#poster img').attr('id', 'zoom');


	$('#torrent').find('.pull-left').css({
		'width': 'auto',
	});
	$('#torrent > #info').css({
		'width':'780px'
	});
	$('#torrent > #info').find('div:nth-child(1)').remove();    
	$('#torrent > #info').find('div:nth-child(2)').remove();   
	$('#torrent > #info').find('div:nth-child(3)').remove();    
	$('#torrent > #info').find('div').css({
		'width':'100%'
	});

	$('#main > div > a').each(function(){
		if ($(this).attr('target') == "_blank"){
			$(this).parent().hide();
		}
	});
	
	var title = $('#main h1').find('span').text();
	title = title.substr(0,40);
	$('#main h1').find('span').text(title);

	$('form#postcomment').parent().hide();

	if( $('#main > .comments').length > 0){
		$('#main > .comments').hide();
		$('#main > h4').each(function(){
			if( $(this).find('span').text() == 'Коментари'){         
				$(this).find('span').append(' <a href="" class="show_comments">покажи</a>');
				$('.show_comments').on('click', function(event){
					event.preventDefault();
					$('#main > .comments').slideToggle();
				});
			}
		});
	}
	
	if( $('#main > #description').length > 0){
		$('#main > #description').hide();
		$('#main > h4').each(function(){
			if ($(this).find('span').text() == 'Описание'){
				$(this).toggleClass('right left');
				$(this).find('span').append(' <a href="" class="show_descr">покажи</a>');
				$('.show_descr').on('click', function(event){
					event.preventDefault();
					$('#main > #description').slideToggle();
				});
			}
		});
	}
});