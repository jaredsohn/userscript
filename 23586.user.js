// ==UserScript==
// @name           Topbotlj Deep-Water Removal
// @namespace      *
// @include        http://*.livejournal.com
// @include        http://*.livejournal.com/*

function remove()
{
  // http://deep-water.ru/?http://community.livejournal.com/kinoclub/782882.html
  var links = document.getElementsByTagName("a");

  var re = /http:\/\/deep-water\.ru\/\?(.*)/;

  for (var i = 0; i < links.length; i++) 
  { 
    var href = links[i].getAttribute( "href" ); 
    if ( re.test(href) ) 
    {
      links[i].setAttribute( "href", RegExp.$1 );
    }
  }
}
remove();
// ==/UserScript==
