// ==UserScript==
// @name	Amazon Video Full Height
// @include	http://www.amazon.tld/gp/product/*
// @include	https://www.amazon.tld/gp/product/*
// @include	http://amazon.tld/gp/product*
// @include	https://amazon.tld/gp/product/*
// @description	Makes Amazon Video pages use the full screen height for the in-page Flash window so you don't have to use popout/fullscreen to watch it at a decent size.
// @license	Who gives a shit?  Do whatever the fuck you want.
// @copyright	Fuck off, lawyers.
// @version	1
// ==/UserScript==


document.getElementById('gcpc_button').innerHTML = document.getElementById('gcpc_button').innerHTML +
  "&nbsp;&nbsp;&nbsp;<span id=\"embiggen\" style=\"color:white; text-decoration:underline;\"" +
  " onclick=\"if(document.getElementById('streaming') === null) alert('Play the video first to create the streaming div!'); else {" +
  " if( typeof( window.innerWidth ) == 'number' ) height = window.innerHeight;" +
  " else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) height = document.documentElement.clientHeight;" +
  " else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) height = document.body.clientHeight;" +
  " document.getElementById('streaming').style.height=height;" +
  " document.getElementById('streaming').scrollIntoView();}\"" +
  ">Embiggen! (Play video first)</span>";