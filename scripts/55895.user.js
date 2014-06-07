// ==UserScript==
// @name           SongMeaningsSearchEnhancer
// @namespace      KyleTeske
// @description    Allows search for Artist and Song title on SongMeanings.net
// @include        http://www.songmeanings.net/*
// ==/UserScript==

/*--------------------------------------------
Set up input boxes and buttons
---------------------------------------------*/
/* Simply text saying "Artist"               */
var sgArtistText = document.createElement( 'span' );
sgArtistText.setAttribute( 'id', 'sgArtistTextID' );
sgArtistText.style.marginRight = '1em';
sgArtistText.style.fontSize = 'medium';
sgArtistText.innerHTML = 'Artist';

/* Artist input text box                     */
var sgArtist = document.createElement( 'input' );
sgArtist.setAttribute( 'id', 'sgArtistID' );
sgArtist.setAttribute( 'type', 'text' );
sgArtist.setAttribute( 'name', 'ArtistName' );
sgArtist.setAttribute( 'title', 'Artist' );

/* Simply text saying "Song"                 */
var sgSongText = document.createElement( 'span' );
sgSongText.setAttribute( 'id', 'sgSongTextID' );
sgSongText.style.marginLeft = '2em';
sgSongText.style.marginRight = '1em';
sgSongText.style.fontSize = 'medium';
sgSongText.innerHTML = "Song";

/* Song input text box                       */
var sgSong = document.createElement( 'input' );
sgSong.setAttribute( 'id', 'sgSongID' );
sgSong.setAttribute( 'type', 'text' );
sgSong.setAttribute( 'name', 'SongName' );
sgSong.setAttribute( 'title', 'Song' );

/* 'Go' button                              */
var sgSubmit = document.createElement( 'button' );
sgSubmit.setAttribute( 'id', 'sgButtonID' );
sgSubmit.setAttribute( 'value', 'sgValue' );
sgSubmit.innerHTML = 'Go';
sgSubmit.style.margin = '0px 2px 0px 10px';
sgSubmit.addEventListener( 'click', searchArtist, false );

/* Container for all previous elements       */    
var sgElement = document.createElement( 'td' );
sgElement.setAttribute( 'width', '100%' );
sgElement.appendChild( sgArtistText );
sgElement.appendChild( sgArtist );
sgElement.appendChild( sgSongText );
sgElement.appendChild( sgSong );
sgElement.appendChild( sgSubmit );

/*---------------------------------------
Find a known point in the page and then
insert the container into document just
after it
----------------------------------------*/
var nav = document.evaluate( "//div[@class='navigation']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
nav.parentNode.appendChild( sgElement );

/*--------------------------------------------
Determine which type of page is open
---------------------------------------------*/
var isHomePage = ( window.location.toString( ) == 'http://www.songmeanings.net/' );
var isSearchResPage = ( window.location.toString( ).match( /.*query.*/ ) != null );
var isArtistPage = ( window.location.toString( ).match( /.*artist\/view\/songs.*/ ) != null );
var isSongPage = ( window.location.toString( ).match( /.*songs\/view\/.*/ ) != null );

if ( isHomePage )
    {
    /* Reset window.name, which is used to pass the artist and song searched for */
    window.name = "sg_no_artist&sg_no_song";
    }
else if ( isSearchResPage )
    {
    var aElements = document.getElementsByTagName( 'a' );
    
    /*--------------------------------------------
    Find the link that goes to an artist's page
    and then follow that link.
    ---------------------------------------------*/
    for( var i = 0; i < aElements.length; i++ )
        {
        var elem = aElements[ i ];
        var hrefString = elem.href.toString( );
        /*--------------------------------------------
        The first such link is followed
        ---------------------------------------------*/
        if ( hrefString.match( /.*artist\/view\/songs.*/ ) != null )
            {
            window.location = elem.href;
            return;
            }        
        }
    }
else if ( isArtistPage )
    {
    /*--------------------------------------------
    Find the link going to the search song
    and follow it.
    ---------------------------------------------*/
    var artist = window.name.split( '&' )[ 0 ];
    var song = window.name.split( '&' )[ 1 ];
    
    aElements = document.getElementsByTagName( 'a' );
    for( var i = 0; i < aElements.length; i++ )
        {
        var aElements = document.getElementsByTagName( 'a' );
        var elem = aElements[ i ];
        var elemInnerHTML = elem.innerHTML;
        var regex = new RegExp( song, 'i' );
        if ( elemInnerHTML.match( regex ) )
            {
            window.location = elem.href;
            return;
            }
        }
    } 
else if ( isSongPage )
    {
    /*--------------------------------------------
    Automatically fill in artist
    ---------------------------------------------*/
    sgArtist.value = window.name.split( '&' )[ 0 ];
    }

/*******************************************************
* Function Name:
*       searchArtist
*
* Description:
*       Redirects page to the results of searching
*       for the artist name.
*
********************************************************/
function searchArtist( )
{
var prefix = 'http://www.songmeanings.net/query/?q=';
var postfix = '&type=artists&page=1&start=0&mm=1&pp=20&b=Go';

if ( sgArtist.value == "" )
    {
    return;
    }

/*--------------------------------------------
window.name is set as a means of passing
the song to search for to the next page.
Format is: <Artist>&<Song>
---------------------------------------------*/

window.name = sgArtist.value + '&';
if ( sgSong.value == "" )
    {
    window.name += "sg_no_song";
    }
else
    {
    window.name += sgSong.value;
    }
    
window.location = prefix + sgArtist.value + postfix;
}