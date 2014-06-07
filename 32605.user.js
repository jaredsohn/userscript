// ==UserScript==
// @name           Last.fm: Play Album in Client
// @namespace      http://www.last.fm/
// @include        http://www.last.fm/music/*
// ==/UserScript==

//
//inline script:
//

var api_key = "c8c7b163b11f92ef2d33ba6cd3c2c3c3";

var link;

var ch = document.getElementById( 'catalogueHead' );
var albumDetails = ch.getElementsByTagName( 'h1' ).item( 0 );

var artist = null;

if( albumDetails.getElementsByTagName( 'a' ).length > 0 )
{
    artist = albumDetails.getElementsByTagName( 'a' ).item( 0 ).innerHTML;
    var album = albumDetails.childNodes[2].nodeValue;
    var div = document.createElement( "div" );
    link = document.createElement( "a" );
    link.href = "lastfm://play/tracks/";
    link.innerHTML = "Play Album in Client";
    div.appendChild( link );

    ch.parentNode.insertBefore( div, ch.nextSibling );
    
    generateLfmAlbumLink( albumDetails );
}

var charts = getElementsByClass( "chart", document, "table" );

if( artist == null )
{
    //Presumeably this isn't an album page so figure out the artist differently
    var catalogueHead = document.getElementById( "catalogueHead" );
    artist = catalogueHead.getElementsByTagName( "h1" ).item( 0 ).innerHTML;
}

for( i = 0; i < charts.length; i++ )
{
    var chart = charts[ i ];
    var trackCells = getElementsByClass( "subjectCell", chart, "td" );
    
    for( j = 0; j < trackCells.length; j++ )
    {
        if( trackCells[j].parentNode.nodeName == "THEAD" )
            continue;
        
        var trackName = trackCells[j].getElementsByTagName( "a" ).item( 0 ).innerHTML;

        getTrackId( artist, trackName, function( id, data ){ addClientPreview( id, data ); }, trackCells[j].parentNode );
    }
}


//
// Function definitions:
//

function addClientPreview( id, tr )
{
   var link = document.createElement( "a" );
   link.href = "lastfm://play/tracks/" + id;
 
   var icon = document.createElement( "img" );
   icon.src = "http://cdn.last.fm/flatness/global/icon_play.png";
   
   link.appendChild( icon );
   
   var td = getElementsByClass( "playbuttonCell", tr, "td" )[0];
   td.style.width = "50px";
   td.insertBefore( link, td.firstChild ); 
}

function generateLfmAlbumLink( albumDetails )
{   
    var getAlbumInfoUrl = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + api_key + "&artist=" + artist + "&album=" + album;

    GM_xmlhttpRequest({
        method: 'GET',
        url: getAlbumInfoUrl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/xml,text/xml',
        },
        onload: function( responseDetails ) {
            if( responseDetails.status == 200 )
            {
                parseAlbumInfoXML( responseDetails.responseText );
            }
        }
    });
}

function parseAlbumInfoXML( text ) 
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString( text, "text/xml" );
    var albumId = xmlDoc.getElementsByTagName( "id" )[0].textContent;
    
    var getPlaylistUrl = "http://ws.audioscrobbler.com/2.0/?method=playlist.fetch" +
                                                          "&playlistURL=lastfm://playlist/album/" + albumId +
                                                          "&api_key=" + api_key;
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: getPlaylistUrl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/xml,text/xml',
        },
        onload: function( responseDetails ) {
            if( responseDetails.status == 200 )
            {
                parseAlbumPlaylist( responseDetails.responseText );
            }
        }
    });
   
}

var albumTrackList = new Array();
var curAlbumTrackIndex = 0;
function parseAlbumPlaylist( text )
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString( text, "text/xml" );
    var tracks = xmlDoc.getElementsByTagName( "track" );
    
    var trackList = "";

    for( i = 0; i < tracks.length; i++ )
    {
        var track = tracks.item( i );
        var title = track.getElementsByTagName( "title" )[0].textContent;
        var creator =  track.getElementsByTagName( "creator" )[0].textContent;
        trackInfo = new Array();
        trackInfo[0] = creator;
        trackInfo[1] = title ;
        albumTrackList[i] = trackInfo;
    }
    getTrackIds( 0 );
}

function getTrackIds()
{
    getTrackId( albumTrackList[curAlbumTrackIndex][0], 
                albumTrackList[curAlbumTrackIndex][1], 
                function( trackId, data ){ link.href += trackId + ","; }, 
                null,
                function(){ curAlbumTrackIndex++; if( curAlbumTrackIndex < albumTrackList.length ) getTrackIds(); } 
              );
}

function getTrackId( creator, title, fun, data, onLoaded )
{

    var xmlRPCRequest = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                          "<methodCall>" + 
                            "<methodName>trackToId</methodName>" +
                            "<params>" +
                                "<param><value><string>" + creator + "</string></value></param>" +
                                "<param><value><string>" + title + "</string></value></param>" +
                            "</params>" +
                          "</methodCall>";
    GM_xmlhttpRequest({
        method: 'POST',
        url: "http://ws.audioscrobbler.com/1.0/rw/xmlrpc.php",
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/xml,text/xml',
        },
        data : xmlRPCRequest,
        onload: function( responseDetails ) {
            if( responseDetails.status == 200 )
            {
                var trackId = parseTrackIdInfo( responseDetails.responseText );
                if( trackId > 0 )
                {
                    fun( trackId, data );
                }
            }
            if( onLoaded != null )
            {
                onLoaded();
            }
        }
    });
}

function parseTrackIdInfo( text )
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString( text, "text/xml" );
    var members = xmlDoc.getElementsByTagName( "member" );
    var trackId = -1;
    for( i = 0; i < members.length; i++ )
    {
        var member = members.item( i );
        var memberName = member.getElementsByTagName( "name" ).item( 0 );

        if( memberName.textContent == "faultCode" )
            break;
            
        if( memberName.textContent == "isLastfm" )
        {
            var isLastfm = memberName.parentNode.getElementsByTagName( "boolean" ).item( 0 ).textContent;
            if( isLastfm == "0" )
                return -1;
        }
        
        if( memberName.textContent == "trackID" )
        {
            trackId = memberName.parentNode.getElementsByTagName( "int" ).item( 0 ).textContent;
        }
    }
    return trackId;
}

function getElementsByClass( searchClass, node, tag ) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}