// SSL Certificates Pro
// version 2.15
// Started 30-03-2010
//
//
// ==UserScript==
// @name	radio vote
// @description	radio vote



// @include     http://vids.myspace.com/index.cfm?fuseaction=vids.individual&videoid=104332375
// @include     http://vids.myspace.com/index.cfm?fuseaction=vids.individual&videoid=104310180
// @include     http://www.myspace.com/gleeauditions?link=31589223






// ==/UserScript==


//function funcToCall()
//{
//window.location = "javascript:vtb.rateVideo(100);"
//}


//while(1){

//onload=funcToCall();    //on load, rate video 100
onload = setTimeout(function() { document.location.reload(); } , 10000);  //waits 20 seconds and refreshs

//}