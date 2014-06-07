// ==UserScript==
// @name           Darkwarez Charger CHROME
// @namespace      http://www.darkwarez.pl
// @include        *darkwarez.pl/forum/*
// @author		   Denis Wróbel <mrWodoo>
// ==/UserScript==


/**
 * To jest wersja pod Google Chrome. Opis, jak skonfigurowac skrypt znajdziesz tutaj:
 * http://darkwarez.pl/forum/post-24183054.html#24183054
 * 
 * 
 */

function init()
{
	//Konfiguracja
	var EnableFastEdit = true; //Odblokowac szybka edycje?
	
	
	//Zmienne skryptu, nie ruszać!
	var Sid = '';
	var Location = '';
	var FindAction = '';
	var Posts = new Array();
	var DonePages = 0;
	var ActiveAuthorSeek = false;
	var Version = 0.22;
	
	//Kod naszego skryptu umieszczony musi byc w tej funkcji
	function startCharger()
	{	
	
		Location = window.location.href;
		Sid = $( 'a[href*="sid"]' ).attr( 'href' ).split( '=' )[2];
		
		var findAction = Location.split( '/' );
		
		FindAction = findAction[ findAction.length - 1 ];
		
		var Forum = findAction[ findAction.length - 2 ];
		
		if( (new RegExp( /([0-9]{1,16})\-([a-zA-Z0-9_\.\-]{1,255})\.html/ ).exec( FindAction ) ) || (new RegExp( /post\-([0-9]{1,16})\.html/ ).exec( FindAction ) ) ) //Sprawdzamy czy jestesmy w temacie
		{
			//Jestesmy w temacie
			inTopicFastEdit();
			inTopicSearchByAuthor( Forum );
		}
	}
	
	function inTopicFastEdit()
	{
		if( EnableFastEdit )
		{
			$( 'a[href*="editpost"]' ).each( function( i, value )
			{
				var PostId = $( this ).attr( 'href' ).match( 'p\=([0-9]{0,16})' )[1];
				var Parent = $( this ).parent();
				
				$( this ).click( function()
				{
					$.ajax({
						url: "http://darkwarez.pl/forum/posting.php?mode=editpost&p=" + PostId,
						type: 'GET',
						dataType: 'text',
						contentType: "application/x-www-form-urlencoded; charset=iso-8859-2",
			            beforeSend : function( xhr )
			            {
			            	//Polskie znaki to twór szatana!
			                xhr.overrideMimeType('text/html; charset=iso-8859-2');
			            },
						success: function( responseMessage ) {
							
							//Sprawdzamy, czy możemy edytować ten post
							//Minal czas
							var CantEdit = new RegExp( 'swoje posty tylko przez ([0-9]{0,5}) godziny' ).exec( responseMessage );
							
							if( CantEdit )
							{
								alert( 'Przepraszamy, ale możesz edytować swoje posty tylko przez ' + CantEdit[1] + ' godziny! Wykup dodatkowe poziomy konta lub zakup rangę Vip/Svip aby zwiększyć swój czas edycji.' );
								
								return false;
							}
							
							//Nie nasz post :)
							var CantEdit = false;
							var CantEdit = new RegExp( 'jedynie swoje posty' ).exec( responseMessage );
		
							if( CantEdit )
							{
								alert( 'Przepraszamy, ale możesz edytować jedynie swoje posty!' );
								
								return false;
							}
							
							//Post nie istnieje...
							var CantEdit = false;
							var CantEdit = new RegExp( 'nie istnieje' ).exec( responseMessage );
		
							if( CantEdit )
							{
								alert( 'Przepraszamy, ale taki post nie istnieje' );
								
								return false;
							}
							
							var TimeToGo = parseInt( /var num \= ([0-9]{0,3})\;/.exec( responseMessage )[1] );
							var Message = $( responseMessage ).find( 'textarea' ).html();
							
							Parent.append( '<div id="fastedit_box" style="width: 20%;height: 45%;position: absolute;background-color: #222222;font-size: 12px;padding: 8px;padding-bottom: 0px;border: 1px black solid;-moz-border-radius: 6px;"><div style="float: left;"><b>Nowa treść</b></div><div style="float: right;"><a href="#" id="close_editbox">[zamknij]</a></div><br /><form action="posting.php" method="POST"><textarea style="color: white;background-color: #121212;width: 100%;height: 93%;" name="message">' + Message + '</textarea><br /><input id="editp" class="post" type="submit" value="Wyślij!" name="post" /><input type="hidden" value="editpost" name="mode"><input type="hidden" value="' + Sid + '" name="sid"><input type="hidden" value="'+ PostId +'" name="p"></form></div>' );
							$( '#close_editbox' ).click( function() { $( '#fastedit_box' ).remove(); return false; } );
							
							if( TimeToGo > 0 )
							{
								$( '#editp' ).val( 'Odczekaj ' + TimeToGo + ' sekund.' );
								setInterval( (function() { if( TimeToGo > 0 ) { $( '#editp' ).val( 'Odczekaj ' + TimeToGo + ' sekund' ); TimeToGo--; } else if( TimeToGo == 0 ) { $( '#editp' ).val( 'Wyślij!' ); } }), 1000 );
							}
						},   
					});
					
					return false;
				});
			});
		}
	}
	
	function inTopicSearchByAuthor( Forum )
	{
		if( Forum == 'gry' || Forum == 'filmy' || Forum == 'seriale-tv-rip' || Forum == 'anime-bajki' || Forum == 'konsole' || Forum == 'programy' )
		{
			var Pages = $( 'span.nav:eq(2)' ).find( 'a' );
			var TopicId = parseInt( FindAction.split( '-' )[0] );
			
			if( Pages[ Pages.length - 1 ].innerHTML == 'Następny' )
			{
				var PagesNum = parseInt( Pages[ Pages.length - 2 ].innerHTML );
			}
			else
			{
				var PagesNum = parseInt( Pages[ Pages.length - 1 ].innerHTML );
			}
			
			$( 'select[name="search_keywords"]' ).parent().append( '<span id="seek_by_author_element"><small><font color="#444444">&nbsp;Szukaj postów autora:&nbsp;</font></small> <input class="post" id="search_author" /> <small><font color="#444444">Od <select id="start_from" class="post"></select> strony</font></small> <input type="button" id="submit_seek_by_author" value="Uwolnić krakena!" class="post" /></span><span id="search_progress"></span>' );
			
			for( var i = 1; i <= PagesNum; i++ )
			{
				$( '#start_from' ).append( '<option value="' + i + '">' + i + '</option>' );
			}
			
			$( '#submit_seek_by_author' ).click( function()
			{
				var Start = parseInt( $( '#start_from' ).val() );
				var Author = $( '#search_author' ).val();
				
				if( Author.length >= 3 && Start < PagesNum )
				{
					ActiveAuthorSeek = true;
					seekPostsByAuthor( Forum, TopicId, Author, PagesNum, Start, Start );
				}
			});
		}
	}
	
	function seekPostsByAuthor( Forum, TopicId, Author, PagesNum, Seek, StartFrom )
	{
		if( Seek > PagesNum )
		{
			$( '#search_progress' ).html( '<small><font color="#444444">Zakończono szukanie! Znaleziono ' + Posts.length + ' postów.</font></small> <div id="search_author_result" style="display: none;position: absolute;background-color: #232323;border: 1px black solid;width: 600px;padding: 5px;font-size: 12px;margin-top: 10px;"><div style="float: left;"><h1>Wyniki wyszukiwania wd. autora ' +  htmlspecialchars( Author ) + '</h1></div><div style="float: right;"><a href="#" id="close_search_results">zamknij</a></div><div style="clear: both;"></div><div id="found_posts"></div></div>' );
			ActiveAuthorSeek = false;
			
			
			if( Posts.length )
			{
				Posts = Posts.reverse();
				
				$( '#search_author_result' ).css( 'display', 'block' );
				
				for( i in Posts )
				{
					$( '#found_posts' ).html( $( '#found_posts' ).html() + '<div><a href="http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '">http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '</a></div>' );
				}
			}
			
			$( '#close_search_results' ).click( function() { $( '#search_author_result' ).css( 'display', 'none' ); return false; } );
			
			return;
		}
		
		if( !ActiveAuthorSeek )
		{
			return;
		}
		
		$.ajax({
			url: "http://darkwarez.pl/forum/" + Forum + "/" + TopicId + '-xaxa-' + Seek + '.html',
			type: 'GET',
			dataType: 'text',
			contentType: "application/x-www-form-urlencoded; charset=iso-8859-2",
			error: function( xhr, textStatus, thrownError )
			{
				alert( 'AJAX Problem -> ' . thrownError );
			},
			beforeSend : function( xhr )
			{
				//Polskie znaki to twór szatana!
				xhr.overrideMimeType('text/html; charset=iso-8859-2');
			},
			success: function( responseMessage ) {
				
				var SeekPosts = new RegExp( '<span class\=\"name\"\>\<a name\=\"([0-9]{1,16})\"\>\<\/a\>\<b\>\<a href\=\"profil\-([0-9]{1,16})\.html\" class\=\"genmed\"\>\<span(.*?)\>'+ Author +'\<\/span\>\<\/a\>\<\/b\>\<\/span\>', 'g' ).exec( responseMessage );
				
				if( SeekPosts )
				{
					Posts.push( parseInt( SeekPosts[1] ) );
				}
				
				DonePages++;
				var Progress = ( DonePages / ( PagesNum - StartFrom ) ) * 100;
				
				if( ActiveAuthorSeek )
				{
					$( '#seek_by_author_element' ).css( 'display', 'none' );
					$( '#search_progress' ).html( '<small><font color="#444444">Postęp szukania wd. autora: ' + parseInt( Progress ) + '% <a href="' + window.location.href + '" id="cancel_author_search">anuluj</a></span>' );
				}
				
				$( '#cancel_author_search' ).click( function()
				{
					$( '#search_progress' ).html( '<small><font color="#444444">Zakończono szukanie! Znaleziono ' + Posts.length + ' postów.</font></small> <div id="search_author_result" style="display: none;position: absolute;background-color: #232323;border: 1px black solid;width: 600px;padding: 5px;font-size: 12px;margin-top: 10px;"><div style="float: left;"><h1>Wyniki wyszukiwania wd. autora ' +  htmlspecialchars( Author ) + '</h1></div><div style="float: right;"><a href="#" id="close_search_results">zamknij</a></div><div style="clear: both;"></div><div id="found_posts"></div></div>' );
					ActiveAuthorSeek = false;
					
					
					if( Posts.length )
					{
						Posts = Posts.reverse();
						
						$( '#search_author_result' ).css( 'display', 'block' );
						
						for( i in Posts )
						{
							$( '#found_posts' ).html( $( '#found_posts' ).html() + '<div><a href="http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '">http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '</a></div>' );
						}
					}
					
					$( '#close_search_results' ).click( function() { $( '#search_author_result' ).css( 'display', 'none' ); return false; } );
					
					return false;
				});
				
				
				//Kolejna strona
				seekPostsByAuthor( Forum, TopicId, Author, PagesNum, Seek + 1, StartFrom );
			}
		});
	}
	
	function htmlspecialchars(string)
	{
		return $('<span>').text(string).html();
	}
	
	startCharger();
}

//@author       Erik Vergobbi Vold & Tyler G. Hicks-Wright
function addJQuery( callback )
{
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function()
	{
		var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	}, false);
	
	document.body.appendChild(script);
}

addJQuery(init);