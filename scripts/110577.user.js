// ==UserScript==
// @name Fix t.co URLs
// @namespace normal
// @description Remove 'type=js' from Twitter's t.co URLs
// @include http://t.co/*
// ==/UserScript==
//
//
//http://www.netlobo.com/url_query_string_javascript.html
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

if (gup('type') != '') {
  document.location.href = document.location.href.replace('/?type=js', '/'));
}
