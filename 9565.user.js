// ==UserScript==
// @name          Show IMDB-rating on MovieMeter
// @description	  Show the IMDB-rating of movies on the site www.moviemeter.nl
// @include       http://www.moviemeter.nl/film/*
// ==/UserScript==

var sBody = document.body.innerHTML.toLowerCase();
var n1 = sBody.indexOf("a href=\"http://www.imdb.com/title/",10)+"a href=\"http://www.imdb.com/title/".length;
var n2 = sBody.indexOf("/\"",n1);

if(n2>n1) {
 // Link to IMDB found as expected
 var sIMDBTitle = sBody.substr(n1,n2-n1); // Format is: tt12345
 
 var sURL = "http://www.imdb.com/title/"+sIMDBTitle+"/";
 GM_xmlhttpRequest({
  method: 'GET',
  url: sURL,    
  onload: onLoadCallBack});
}  
 
function onLoadCallBack(responseDetails) {
 sBody = responseDetails.responseText.toLowerCase();
 n1 = sBody.indexOf("<b>user rating:</b>",20)+"<b>user rating:</b>".length;
 n1 = sBody.indexOf("<b>",n1)+"<b>".length;
 n2 = sBody.indexOf("</b>",n1); 
 if(n2>n1) {
  sRating = sBody.substr(n1,n2-n1);
   
  // Place rating on the web page (of moviemeter)
  divFilmInfo = document.getElementById("film_info");
  if(divFilmInfo) {
   s = divFilmInfo.innerHTML;
   s = "IMDB-rating: "+sRating+"<br />"+s;
   divFilmInfo.innerHTML = s;
  }   
 }
}

