// ==UserScript==
// @name           YouTubeKisser
// @namespace      http://www.kissyoutube.com/
// @description    Add a button to "Kiss" YouTube's Videos / Ajoute un boutton pour Kisser des videos sur YouTube
// @include        http://www.youtube.com/watch*
// @version        December 13, 2009 - 0.3
// @author         RoadKiller
// ==/UserScript==

// Functions' statement / Declaration des fonctions

function GetId( id )
{
	
	return document.getElementById( id ) ;
	
}

function AddStyle( css )
{
	
	var hashead		= document.getElementsByTagName( 'head' )[0] ;
	var parentel	= hashead || document.documentElement ;
	var newElement	= document.createElement( 'link' ) ;
	newElement.setAttribute( 'rel', 'stylesheet' ) ;
	newElement.setAttribute( 'type', 'text/css' ) ;
	newElement.setAttribute( 'href', 'data:text/css,' + encodeURIComponent( css ) ) ;
	
	if( hashead )
	{
		
		parentel.appendChild( newElement ) ;
		
	}
	else
	{
		
		parentel.insertBefore( newElement, parentel.firstChild ) ;
		
	}
	
}

function getParam( name )
{
	
	var start	= location.search.indexOf( '?' + name + '=' ) ;
	
	if( start < 0 )
	{
		
		start	= location.search.indexOf( '&' + name + '=' ) ;
		
	}
	
	if( start < 0 )
	{
		
		return '' ;
		
	}
	
	start	+= name.length + 2 ;
	var end	= location.search.indexOf( '&', start) - 1 ;
	
	if( end < 0 )
	{
		
		end	= location.search.length ;
		
	}
	
	var result = '' ;
	
	for( i = start; i <= end; i ++ )
	{
		
		var c	= location.search.charAt( i ) ;
		result	= result + ( c=='+'?' ':c ) ;
		
	}
	
	return unescape( result ) ;
	
}

// Translation's statement / Traductions

var lang_available	= new Array ( "fr", "es", "de", "en", "it", "pt" ) ;

var update_text		= new Array ( ) ;
update_text['fr']	= "Une nouvelle version de YouTubeKisser a été détectée. Recharger la page après la mise à jour." ;
update_text['es']	= "Una nueva versión de YouTubeKisser fue detectado. Recargar la página después de la actualización." ;
update_text['de']	= "Eine neue Version von YouTubeKisser erkannt wurde. Laden Sie die Seite nach dem Update." ;
update_text['en']	= "A new version of YouTubeKisser was detected. Reload the page after the update." ;
update_text['it']	= "Una nuova versione di YouTubeKisser è stato rilevato. Ricaricare la pagina dopo l'aggiornamento." ;
update_text['pt']	= "Uma nova versão do YouTubeKisser foi detectado. Recarregar a página após a atualização." ;

var button_text		= new Array ( )
button_text['fr']	= "Kisser cette vidéo" ;
button_text['es']	= "Kissar este vídeo" ;
button_text['de']	= "Kiss dieses video" ;
button_text['en']	= "Kiss this video" ;
button_text['it']	= "Kiss questo video" ;
button_text['pt']	= "Kissar este vídeo" ;

var lang	= document.getElementsByTagName ( 'html' )[0].getAttribute ( 'lang' ) ;

var ok		= false ;

for ( var i = 0; i < lang_available.length; ++i )
{
	
	if ( lang_available[i] == lang )
	{
		
		ok	= true ;
		
	}
	
}

if ( ok == false )
{
	
	lang	= 'en' ;
	
}

// Verify if an update exists / Verifie si une mise a jour existe

var update = new XMLHttpRequest() ;
update.open( 'GET', 'http://www.youtube.com/Roadkiller123', true ) ;
update.onreadystatechange = function()
{
	
	if( update.readyState == 4 && update.status == 200 )
	{
		
		var version = update.responseText.match(/Mon user-script: v((?:\d+\.)*\d)v/)[1] ;
		
		if( version != '0.3' )
		{
			
			alert( update_text[lang] ) ;
			window.open( 'http://eldeon.power-heberg.com/youtubekisser/youtubekisser.user.js' ) ;
			
		}
		
	}
	
}

update.send( null ) ;

// Displaying of download button / Affichage du bouton d'acces directe

// The first div / Le premier div

var div		= document.createElement( 'div' ) ;

div.setAttribute('id',				'kissyoutube' ) ;
div.setAttribute('class',			'reverse-tooltip-wrapper' ) ;

GetId( 'watch-longform-buttons' ).appendChild( div ) ;

// The button / Le button

var button	= document.createElement( 'button' ) ;

button.setAttribute('id',			'kissyoutube_button' ) ;
button.setAttribute('onClick',		'window.open(\'http://www.kissyoutube.com/watch?v=' + getParam( 'v' ) + '\')' ) ;
button.setAttribute('onMouseOver',	'yt.www.core.toggleSimpleTooltip(this, true)' ) ;
button.setAttribute('onMouseOut',	'yt.www.core.toggleSimpleTooltip(this, false)' ) ;

div.appendChild( button ) ;

AddStyle(	'#kissyoutube_button{'				+
				'margin: 3px 0px 0px 5px;'		+
				'width: 27px;'					+
				'height: 19px;'					+
				'background-image: url("http://eldeon.power-heberg.com/youtubekisser/kiss_off.png");'	+
				'border: 0px;'					+
				'padding: 0px;'					+
				'cursor: pointer;'				+
				'}'								+
			'#kissyoutube_button:hover{'		+
				'background-image: url("http://eldeon.power-heberg.com/youtubekisser/kiss_on.png");'	+
				'}'
) ;

// The second div / Le deuxième div

var div_2	= document.createElement( 'div' ) ;

div_2.setAttribute('class',			'reverse-tooltip-wrapper-box hid' ) ;

div.appendChild( div_2 ) ;

// The third div / Le troisième div

var div_3	= document.createElement( 'div' ) ;

div_3.setAttribute('class',			'reverse-tooltip-box' ) ;
div_3.innerHTML	= button_text[lang] ;

div_2.appendChild( div_3 ) ;

// The img / Le img

var img	= document.createElement( 'img' ) ;

img.setAttribute('class',			'reverse-tooltip-box-bot' ) ;
img.setAttribute('src',				'http://s.ytimg.com/yt/img/pixel-vfl73.gif' ) ;

div_2.appendChild( img ) ;

// Now, we have created our button, we place it correctly / Maintenant qu'on a créé notre bouton, on le place correctement !

var i = GetId( 'watch-longform-buttons' ).childNodes.length - 4 ;

GetId( 'watch-vid-title' ).setAttribute( 'class', 'title  longform' ) ;
GetId( 'watch-longform-buttons' ).insertBefore( div, GetId( 'watch-longform-buttons' ).childNodes[i] ) ;

// Have Fun !