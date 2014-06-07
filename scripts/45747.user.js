// ==UserScript==

// @name           daum bloggernews direct link at http://www.daum.net

// @namespace      daum

// @description    bypass bloggernews intermediate page at http://www.daum.net 

// @include        http://www.daum.net/*

// ==/UserScript==



var bloggernewsid_regexp = new RegExp('info/([0-9]+)\\?', 'i');

function link_change( )

{

  var me = document.getElementById( 'open_area' );

  var items = me.getElementsByTagName("a");

  for( var i = 0; i < items.length; i++ )

  {

     var newsid = bloggernewsid_regexp.exec( items[i] );

     if ( newsid ) {

       var link = 'http://v.daum.net/link/' + newsid[1];

       items[i].href = link;

       items[i].target = '_blank';

     }

  }

}

function change( )

{

  link_change();



  var me = document.getElementById( 'open_area' );

  me.addEventListener( 'click', link_change, false );

}



change();
