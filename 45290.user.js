// ==UserScript==
// @name           Quietube Auto-Redirect
// @namespace      cyranix
// @description    Auto-redirect YouTube, Vimeo, and Viddler videos to Quietube.
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

(function quietube_auto_redirect() {

  $(init);
  return true;
  
  function init() {
    var doConvert = true; // set to false in order to disable aggressive link modification
  
    // If site is Quietube, alter the Original Page link to include the no-redirect parameter.
    if (isQuietube()) {
      var original = getOriginalPageLink();
      var href = original.attr('href');
      original.attr('href', (/youtube\.com/.test(document.URL)) ? href + "&redirect=0" : href + "?redirect=0");
    }
    
    // If site is a supported video site and doesn't have the no-redirect parameter, redirect to Quietube.
    else if (isSupported(document.URL) && !preventRedirect(document.URL)) {
      window.location.href = "http://quietube.com/v.php/" + window.location.href;
    }
    
    // If site is neither a supported video site nor Quietube, attempt to preemptively alter links to supported video sites.
    else if (doConvert) {
      convertLinks();
    }
  }

  // Determines whether the current site is Quietube.
  function isQuietube() {
    var quietube = /^http:\/\/(www\.)?quietube\.com\/v\.php\//.test(document.URL);
  
    return quietube;
  }
  
  // Determines whether a given URL points to a Quietube-supported video site.
  function isSupported(url) {
    var youtube = /^http:\/\/(www\.)?youtube\.com\/watch\?(v=|.+&v=)/.test(url);
    var vimeo = false; // /^http:\/\/(www\.)?vimeo\.com\/(\d)+$/.test(url.split("?")[0]);
    var viddler = /^http:\/\/(www\.)?viddler\.com\/explore\/(.)+\/videos\//.test(url);
    var bbc = /^http:\/\/(www\.)?bbc\.co\.uk\/iplayer\/episode\//.test(url);
  
    return (youtube || vimeo || viddler || bbc);
  }
  
  // Determines whether a given URL should be exempt from redirection. Method extracted in case I want to modify it later.
  function preventRedirect(url) {
    var prevent = /redirect=0/.test(url);
  
    return prevent;
  }
  
  // Aggressively converts relevant links to supported video sites to their Quietube counterparts, as a form of "pre-direction".
  function convertLinks() {
    $('a[href]').each(function() {
      var link = $(this);
      var href = link.attr('href');
      if (isSupported(href)) {
        link.attr('href', "http://quietube.com/v.php/" + href);
      }
    });  
  }
  
  // Gets the Original Page link.
  function getOriginalPageLink() {
    return $('a').filter(function() {
      return $(this).text() == 'Original Page';
    }).first();
  }  

})();