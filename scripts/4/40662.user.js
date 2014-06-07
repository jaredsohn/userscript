// ==UserScript==
// @name           Linkbucks Skipper
// @namespace      *.linkbucks.com/*
// @include        http://*.linkbucks.com/*
// @include        http://*baberepublic.com/*
// @include        http://*blahetc.com/*
// @include        http://*linkgalleries.net/*
// @include        http://*placepictures.net/*
// @include        http://*placepictures.com/*
// @include        http://*picturesetc.com/*
// @include        http://*qvvo.com/*
// @include        http://*realfiles.net/*
// @include        http://*seriousfiles.com/*
// @include        http://*seriousurls.com/*
// @include        http://*thatsprime.com/*
// @include        http://*thesegalleries.com/*
// @include        http://*thesefiles.com/*
// @include        http://*ubucks.net/*
// @include        http://*urlpulse.net/*
// @include        http://*viraldatabase.com/*
// @include        http://*youfap.com/*
// ==/UserScript==

function clickLink()
{
  var scripts = document.getElementsByTagName("script");

  for(i=0; i< scripts.length; i++)
  {
    if(scripts[i].innerHTML.indexOf('linkDestUrl') != -1)
    {
      var urlStart = scripts[i].innerHTML.indexOf("'", scripts[i].innerHTML.indexOf('linkDestUrl'))+1;
      var urlEnd = scripts[i].innerHTML.indexOf("'", urlStart);
      linkDestUrl = scripts[i].innerHTML.substring(urlStart, urlEnd);
      document.location = linkDestUrl;
    }
  }
}
window.addEventListener("load", function(event) { clickLink(); }, false);
