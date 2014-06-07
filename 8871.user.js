// ==UserScript==
// @name           CueBrainz v1.3
// @namespace      naja.nitewinds.org
// @description    Generate a cue sheet directly from musicbrainz.org
// @include        http://*musicbrainz.org/release/*
// @include        http://*musicbrainz.org/show/release/*
// @include        http://*musicbrainz.org/album/*
// ==/UserScript==

// Add our link to the page
//=========================



//Select the right td field to add our link

var node = document.evaluate( '//table [@class = "releaselinks"] // td [@class = "links"] // td [@class = "info"]',
                               document,
                               null,
                               XPathResult.FIRST_ORDERED_NODE_TYPE,
                               null ).singleNodeValue;

node.removeChild( node.lastChild ); //get rid of the ']'

sepText = document.createTextNode( " | " );
endText = document.createTextNode( " ] " );
ourLinkText = document.createTextNode( "Generate Cue-Sheet" );
link = document.createElement( "a" );

link.href = "javascript: var dfd1fFCF;"; //we just need some href attribute to keep it a link. This shouldn't do nothing,
link.appendChild( ourLinkText );         //however, we still prevent it later with event.preventdefault();
                                         //If you wonder why it needs to be a link; just so we dont have to care about the style.
node.appendChild( sepText ); 
node.appendChild( link ); 
node.appendChild( endText ); 

//Create our function to generate the cue sheet
//This function is big, because it has to hold everything after the greasemonkey
//script stops running, this way, we don't have to use unsafeWindow
//==============================================================================

link.addEventListener( "click", function( event )
{   

  //Retrieve the MBID from the link in the Release section.
  //don't use the document.location because this exists also:
  //http://musicbrainz.org/show/release/?releaseid=532461

  var linkText = document.evaluate( '//table [ @class = "releasebegin" ] // a [ contains( @id,"link::" ) ]',
                                     document,
                                    null,
                                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                                    null ).singleNodeValue.href;

  var expr = /\/release\/([^\.]+)/; //Get everything between "/release/" and "."
  expr.test( linkText );
  var MBID = RegExp.$1;
  
  //Request the album info from musicbrainz webservice
  var req = new XMLHttpRequest();

  try
  {
    req.open("GET", "http://" + document.domain + "/ws/1/release/" + MBID + "?type=xml&inc=tracks+artist", true);  
  } 
  catch( oException )
  {
    alert( "We encountered a javascript exception while trying to request data from musicbrainz.org.\n"  + 
           "If this error persists, please write to: najamelan->gmail.com with information on how\n" +
           "to reproduce it.\n\n" +
           "Now follows the exception thrown by the mozilla javascript engine:\n\"" +
           oException + "\"" );
  }

  req.setRequestHeader( "User-agent", "Mozilla/4.0 (compatible) Greasemonkey/ Cue-Sheet Generator v1.0 / najamelan->gmail.com" );
  req.setRequestHeader( "Accept", "application/xml, text/xml" );
  
  req.onreadystatechange = function (aEvt)
  {
    if( req.readyState == 4 ) //If it's fully loaded
    {
      if( req.status == 200 ) //And it was succesfull
      {
        var dom = req.responseXML;
        
        //Add the disc info to the cuesheet
        //=================================
        //make sure it has no double quotes, cause that fucks up bad style
        
        
        
        var cueSheet = "REM Cue-Sheet generated from musicbrainz.org\r\n" 

        if( performer = dom.getElementsByTagName("artist")[0].getElementsByTagName("name")[0].firstChild.nodeValue.replace( /"/g, "''") )
        {
           cueSheet  += "PERFORMER \"" + performer;
        }
        
        if( cdTitle = dom.getElementsByTagName("title")[0].firstChild.nodeValue.replace( /"/g, "''") )
        {
          cueSheet   += "\"\r\nTITLE \"" + cdTitle;
        }
        
        cueSheet += "\"\r\nFILE \"PUT YOUR FILENAME HERE\" WAVE\r\n";
        
        //Add our tracks
        //==============
        function convDuration( x )
          //Convert duration in milliseconds from musicbrains to mm:ss:ff (frames) for cuesheets
          //thanx to Sven Hoffmeister for the convertion code
        {
          var frames = Math.round( x*0.075 ) % 75;                                 //  calculate inaccurate frames (0.075 is the ratio frames/ms)
          var msec   = frames / 0.075;                                             // calculate accurate  equivalent of frames
          var sec    = Math.round( ( x - msec ) / 1000 ) % 60;
          var min    = Math.round( ( x - msec - ( sec*1000 ) ) / (60 * 1000) );
          
          return ( min <10 ? "0" + min : min ) + ":" + ( sec <10 ? "0" + sec : sec ) + ":" + ( frames <10 ? "0" + frames : frames );
        }
       
        var trackList = dom.getElementsByTagName( "track" ); //get a list of all the tracks
        var trackCount = trackList.length;
        var timeOffset = 0;
        var duration = 0;
        var timeProblemFlag = 0; //For when time for certain tracks is unknown, we should stop writing indexes
        
        for( var i = 1; i <= trackCount; ++i )
           //Iterate trough the tracks, to build the entries
        {
 
           cueSheet += "  TRACK " + ( i <10 ? "0" + i : i ) + " AUDIO\r\n"; 

           //For various artist discs, include the performer with the track.           
           if( trackList[i-1].getElementsByTagName("artist")[0] )
           {
             var trPerformer = trackList[i-1].getElementsByTagName("name")[0].firstChild.nodeValue.replace( /"/g, "''")
             cueSheet += "    PERFORMER \"" + trPerformer + "\"\r\n"
           }
 
           if( trackList[i-1].getElementsByTagName("title")[0] )
           {
             var trTitle = trackList[i-1].getElementsByTagName("title")[0].firstChild.nodeValue.replace( /"/g, "''");
             cueSheet += "    TITLE \"" + trTitle + "\" \r\n";
           }
           
           if( timeProblemFlag ) //if there have been tracks without duration
           {
              cueSheet +=  "    INDEX 01 ??:??:??\r\n";
              continue;
           }

           cueSheet +=  "    INDEX 01 " + convDuration( duration + timeOffset ) + "\r\n";//so far so good, so write it.

           if ( !trackList[i-1].getElementsByTagName("duration")[0] && !timeProblemFlag ) //if this is the first one without duration
           {
              timeProblemFlag = 1;
           }
           
           if( !timeProblemFlag ) //calculate values for the next track
           {
             timeOffset += duration;         
             duration = parseInt( trackList[i-1].getElementsByTagName("duration")[0].firstChild.nodeValue );
           }
        }
        
        //Give a save as box to download the CueSheet
	      document.location = "data:text/CueSheet;charset=utf-8," + encodeURI( cueSheet ); //dataURL
      }
      
      else alert( "We encountered an error trying to retrieve data from musicbrainz.org\n"  + 
                  "If this error persists, and musicbrainz is not down, please write to:\n" +
                  "najamelan->gmail.com with information on how to reproduce it.\n\n"          +
                  "Now follows the error message retrieved from musicbrainz.org:\n\n"         +
                  req.responseText ); // if the status code was not 200
    }
  }; //end of our XMLHttpRequest onreadystatechange
  
  try
  {
    req.send(null);  
  }
  catch( exception )
  {
    alert( "We encountered a javascript exception while trying to request data from musicbrainz.org.\n"  + 
           "If this error persists, please write to: najamelan@gmail.com with information on how\n" +
           "to reproduce it.\n\n" +
           "Now follows the exception thrown by the mozilla javascript engine:\n" +
           "=======================================================\n" +
           exception + "\"" );
  }
 
  event.preventDefault();

}, true ); //end of our addEventListener()
