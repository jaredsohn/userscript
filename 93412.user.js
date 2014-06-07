// ==UserScript==
// @name           Kigges Forum JS
// @description    Kleine tweaks, z.B. den bekannten Auer-Kicker Link als solchen markieren^^ - by NeururerFan
// @include        http://www.kigges.de/forum/*
// ==/UserScript==

/**
 * Demaskiert den Running-Gag-Artikel, so dass er sofort ersichtlich ist.
 * Verwendet hard-coded URLs und keine RegExs um eine bessere Performance zu erreichen.
 */
(function() {

  var i             = 0,
      allLinks      = window.document.getElementsByTagName("a"),
      dim           = allLinks.length,
      currentLink;

  for( i = 0; i < dim ; i += 1 ) {

    currentLink = allLinks[i].href;
    currentLink.toLowerCase();

    if(
           currentLink === 'http://www.kicker.de/fussball/2bundesliga/startseite/artikel/286081'
        || currentLink === 'http://www.kicker.de/fussball/2bundesliga/startseite/artikel/286081/'
        || currentLink === 'http://www.kicker.de/news/fussball/2bundesliga/startseite/286081/artikel.html'
        || currentLink === 'http://bit.ly/fEKcqu'
        || currentLink === 'http://bit.ly/14pZda'
        || currentLink === 'http://tinyurl.com/thurk-mainz'
        || currentLink === 'http://tinyurl.com/3b5qt3'
        || currentLink === 'http://url9.de/kXL'
        || currentLink === 'http://tinyurl.com/hertha-erwaegt-einspruch'
        || currentLink === 'http://tinyurl.com/hertha-erwaegt-einspruch/'
        || currentLink === 'http://goo.gl/3Wq5x'
       ) {
      allLinks[i].innerHTML = 'Kicker: Auer drängt, Klopp bremst';
      allLinks[i].href      = 'http://www.kicker.de/fussball/2bundesliga/startseite/artikel/286081';
    }

  }

}());