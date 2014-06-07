// ==UserScript==
// @name          USAA Timeout Buster
// @description	  Gets rid of USAA page timeouts, primarily for USAA Web BillPay.
// @include       https://www.usaa.com/
// ==/UserScript==

// Find the META REFRESH tag

nmeta = document.getElementsByTagName('meta').length;

for ( i = 0; i < nmeta; i++ )
{
 metatag = document.getElementsByTagName('meta')[i];

 if ( metatag.httpEquiv == 'refresh' )
 {
  // Get timeout, in ms (since setTimeout uses that).  Don't use if <60 seconds;
  // that would be for other purposes than timeouts.

  timeout = metatag.content.substr( 0, metatag.content.indexOf( ';' ) ) * 1000;
  minsleft = timeout / 60000;

  if ( timeout > 60000 )
  {
   // Displays a small box on top-left side of screen, with page timeout
   TimeoutDiv = document.createElement( 'div' );
   TimeoutDiv.setAttribute( 'style','position:fixed;z-index:99;top:0px;left:0px;' +
    'width:120px;height:20px;opacity:0.40;' );
   document.body.appendChild( TimeoutDiv );
   TimeoutDiv.innerHTML = '<FONT style="font-size: x-small;">Page Timeout: ' + minsleft + 'm</FONT>';
   // Then, set a timer to stop the META REFRESH 30 seconds before it is set to trigger
   window.setTimeout( MyTimeout, timeout - 30000 );
  }
 }
}

function MyTimeout( )
{
 // 30 seconds before USAA's timeout, do my stuff

 window.stop();

 // Display a red warning box, to ensure user knows that a timeout occurred.

 WarningDiv = document.createElement( 'div' );
 WarningDiv.setAttribute( 'style','position:fixed;z-index:99;top:350px;' +
  'left:350px;background-color:#ff0000;border:3px solid #400000;' +
  'width:350px;height:100px;opacity:0.80;' );
 WarningDiv.innerHTML = "<CENTER><BR><BR><H2>WARNING:</H2>Page Timed Out</CENTER>"
 document.body.appendChild( WarningDiv );

 // Force a log file entry at USAA so they can determine that the page timed
 // out, rather than being closed.

 elem = document.createElement("script");
 elem.src = "https://www.usaa.com/USAA_Timeout_Buster-blocked-a-timeout-see-rscott.org.htm";
 elem.type="text/javascript";
 document.getElementsByTagName("head")[0].appendChild( elem );

 // Do an alert, which should get user's attention if they are somewhere else

 alert( "WARNING: USAA page timed out" );

 return;
}
