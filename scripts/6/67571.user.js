// ==UserScript==
// @name dockapps.org - Convert image ALT to TITLE, and remove redirection
// @author CrazyTerabyte 
// @version 1.1
// @description  Converts img ALT attributes to TITLE (allowing
//    browsers to show dockapp name in tooltip), removes redirect
//    urls and remove TARGET (avoiding popup) from website links.
// @ujs:modified 2006-01-04 18:00
// @include http://dockapps.org/*
// @include http://www.dockapps.org/*
// ==/UserScript==


(function () {
  var e, i, s, pos, v = document.getElementsByTagName("img");
  for( i = 0 ; e = v[i] ; i++ ){
// Next line does not work.
//    if( e.getAttribute("src").indexOf("/files/") == 0 ){
    if( e.getAttribute("src").indexOf("/files/") > -1 ){
      e.setAttribute( "title", e.getAttribute("alt") );
    }
  }

  /* Change redirection URLs for homepages to direct URLs. */
  v = document.getElementsByTagName("a");
  for( i = 0 ; e = v[i] ; i++ ){
    s = e.getAttribute("href");
    if( (pos = s.indexOf("/click.php?send=") ) > -1 ){
      // "/click.php?send=".length = 16, which is used in line below
      s = unescape( s.substring( pos + 16, s.length ) );
      // Fix for links without http:// protocol. (like this: http://dockapps.org/file.php/id/259)
      if( s.indexOf("://") == -1 ){
        s="http://"+s;
      }
      e.setAttribute( "href" , s );

      // Even though target attribute is removed, link-alert.js (for Opera)
      // and TargetAlert (for Firefox) might still display the icon as if it
      // was not removed. This may happen if this script is executed after
      // link-alert/TargetAlert.
      e.removeAttribute("target");
    }
  }
})();
