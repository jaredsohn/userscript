// ==UserScript==
// @name        RIAA_Radar (enhanced)
// @description Attach RIAA_Radar directly to Amazon's pages (Enhanced Version)
// @include     http://*.amazon.*/*
// @version     5enhanced
// ==/UserScript==

(
 function() {
  /* pull an ASIN out of the URL (roughly edited riaa radar bookmarklet) */
  var index = location.href.indexOf( '/-/' );
  var asin = "";
  var radar = 'http://www.magnetbox.com/riaa/check.asp?asin=';

  if ( index != -1 ) {
    asin = location.href.substring( index + 3, index + 13 );
  } else {
    index = location.href.indexOf( 'ASIN' );
    if ( index != -1 ) {
      asin = location.href.substring( index + 5, index + 15 );
    }
  }

  if (asin == "") {
    regex = /\/gp\/product\/([^/]+)/;
    match = location.href.match(regex);

    if(match) {
	asin = match[1];
    }
  }
  GM_log(asin);
  /* if we've got an ASIN, check it out on RIAA Radar */
  if ( asin != "" ) {
    GM_xmlhttpRequest
      ({
            method:'GET',
            url: radar + asin,
            onload:function(results) {
              var warnurl =
                'http://www.magnetbox.com/riaa/images/button_warn.gif';
              var safeurl =
                'http://www.magnetbox.com/riaa/images/button_safe.gif';
              var status = "unknown";

              if ( results.responseText.match( 'button_warn.gif' )) {
                status = "Warning!";
              } else {
                if ( results.responseText.match( 'No album was found.' )) {
                  status = "Unknown";
                } else {
                  status = "Safe!";
                }
              }

              /* glommed from some other amazon scripts. thanks, Jon
                 Udell! */
              var origTitle =
                document.evaluate( "//b[@class='sans']",
                                   document, null,
                                   XPathResult.FIRST_ORDERED_NODE_TYPE,
                                   null ).singleNodeValue;
              var div = origTitle.parentNode;
              var titlechld = origTitle.firstChild;
              var title = titlechld.nodeValue;
              var newTitle = document.createElement('b');
              newTitle.setAttribute('class', 'sans' );
              var titleText = document.createTextNode( title );
              newTitle.appendChild( titleText );
              var sp = document.createTextNode(' ' );
              var link = document.createElement('a');
              link.setAttribute('title', "RIAA Radar" );
              link.setAttribute('href', radar + asin );

              var pic = document.createElement('img');
              pic.setAttribute('title', "RIAA Radar: " + status );
              if ( status == 'Warning!' ) {
				pic.src = "http://www.magnetbox.com/riaa/images/button_warn2.gif";
              } else if ( status == 'Safe!' ) {
				pic.src = "http://www.magnetbox.com/riaa/images/button_safe2.gif";
              } else {
				pic.src = "http://www.magnetbox.com/riaa/images/button_caution2.gif";
              }
			  pic.style.border = "0px"; 
              link.appendChild(pic);

              div.insertBefore( newTitle, origTitle );
              div.insertBefore( sp, origTitle );
              div.insertBefore( link, origTitle );
              div.removeChild( origTitle );

	      /* Put a big 'ol warning on top of the album cover */
              if(status == 'Warning!') {
                var album_elem = document.getElementById('prodImage');
	        if(album_elem) {

                  var link = document.createElement('a');
		  link.setAttribute('href',radar + asin);
		  link.setAttribute('title', 'This bitch is tainted');

                  var img = document.createElement('img');

                  img.setAttribute('src',"http://www.magnetbox.com/riaa/images/button_warn.gif");
                  img.setAttribute('title',"This bitch is tainted");

                  img.style.border = "0px";
                  img.style.MozOpacity='0.8';
                  link.appendChild(img);


		  if(album_elem.height){
	            var top_position = (album_elem.height + img.height) / -2;
                    //link.style.display  = 'block';
                    link.style.position = 'relative';
                    link.style.top      = top_position + 'px';
                  }

                  album_elem.parentNode.appendChild(link,album_elem);
                  album_elem.parentNode.href="javascript:;";
                  album_elem.onclick=function(){};
		  
                }
              }		
            },
      });
  } else {
  }
}
)();
