// ==UserScript==
// @name            FilmSnuffelaar
// @namespace       http://www.m4rc3lv.nl
// @description     Zoekt films op IMDB die jij leuk vindt.
// @version         0.11
// @include         http://www.imdb.com/title/tt*
// @require         http://www.m4rc3lv.nl/jquery-1.6.4.min.js
// @resource hacked http://www.m4rc3lv.nl/pix/hacked.gif
// ==/UserScript==
// Juni 2012: Versie 0.1: beta-versie

$(function () {
 var Plot1="",Genre="",Plot2="";
 
 $("h4").each(function() {
  if($(this).text()==="Plot Keywords:") {
   Plot1 = $(this).next("a").text();
   Plot2 = $(this).parent().children("a:eq(1)").text();
   if(Plot1 && Plot2 && Genre)
    return false;
  }
  else if($(this).text()==="Genres:") {
   Genre = $(this).next("a").text();
   if(Plot1 && Plot2 && Genre)
    return false;
  } 
 });
 
 console.log("Plot1:"+Plot1+"Plot2:"+Plot2+", Genre:"+Genre);
 var url1, url2;
 
 Plot1 = $.trim(Plot1).toLowerCase().replace(" ","-");
 Plot2 = $.trim(Plot2).toLowerCase().replace(" ","-");
 Genre = $.trim(Genre).toLowerCase().replace(" ","-"); 
 if(Plot1 && Plot2 && Genre) {
  url1 = "http://www.imdb.com/keyword/"+Plot1+"/"+Plot2+"/?title_type=feature&genre="+Genre;
  GM_xmlhttpRequest({ method:"GET",
   url:url1,onload:function(R) {
    var Aantal = getAantal(R);
    $("h1.header").append("<br /><span style='font-size:80%' class=nobr><a style='color:#1267A8' href=\""+url1+"\">Filmsnuffelaar ["+Aantal+"]</a>");
    url2 = "http://www.imdb.com/keyword/"+Plot1+"/?title_type=feature&genre="+Genre;
    GM_xmlhttpRequest({ method:"GET",
     url:url2,onload:function(R) {     
      var Aantal = getAantal(R);
      $("h1.header").append("<br /><span style='font-size:60%' class=nobr ><a style='color:#1267A8' href=\""+url2+"\">Filmsnuffelaar (algemener) ["+Aantal+"]</a>");
     }
    });
   }
  });
 }
 
function getAantal(R) {
 var Aantal = $.trim($("#left:eq(0)",R.responseText).text().replace("titles","titels"));
 var a = Aantal.split(" ");
 if(a.length>2) {
  Aantal = a[a.length-1];
 }
 return Aantal;
}
 
});