// ==UserScript==
// @name           youtube hd
// @include        http://*
// @author         daemonicky
// @description    forces all youtube videos to play in HD
// @include        https://*
// @include        *
// @run-at         window-load
// ==/UserScript==

//
// youtube will try to play video in HD when url has attribute hd=1
//

links = document.getElementsByTagName( "a" );
for(i=0;i<links.length;i++) {

 // normal youtube link
 if( links[i].href.indexOf( "&hd=1" )       == -1  // repair once
  && links[i].href.indexOf( "youtube.com/watch" ) != -1 )
 {
  links[i].href += "&hd=1";
  continue;
 }
 
 // shortened youtube link
 if( links[i].href.indexOf( "youtu.be/" ) != -1 )
 {
  indx = links[i].href.indexOf( "youtu.be/" );
  links[i].href = "http://www.youtube.com/watch?v=" + links[i].href.substring( indx + 9 ) + "&hd=1";
  continue;
 }
}
// .NB not a good idea:
// if(document.location.href.indexOf("&hd=1")==-1) document.location+="&hd=1";