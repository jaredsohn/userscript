// ==UserScript==
// @name                FTDWorld-goeroe
// @namespace           http://www.m4rc3lv.nl
// @description         Goeroe-functionaliteiten voor FTDWorld-leechers
// @match               http://www.ftdworld.net/*
// @include             http://www.ftdworld.net/*
// @match               http://www.ftdworld.com/*
// @include             http://www.ftdworld.com/*
// @match               http://ftdworld.net/*
// @include             http://ftdworld.net/*
// @match               http://ftdworld.com/*
// @include             http://ftdworld.com/*
// @require             http://www.m4rc3lv.nl/jquery-1.6.4.min.js
// @require             http://www.m4rc3lv.nl/Script/jquery.tmpl.min.js
// @resource hacked     http://www.m4rc3lv.nl/pix/hacked.gif
// @resource delete     http://www.m4rc3lv.nl/pix/delete.png
// @resource mm         http://www.m4rc3lv.nl/pix/moviemeter.gif
// @resource TemplHist  http://www.m4rc3lv.nl/grease/FTDWorldGoeroe/hist.html
// @resource TemplInfo  http://www.m4rc3lv.nl/grease/FTDWorldGoeroe/postinfo.html
// @resource extlink    http://www.m4rc3lv.nl/pix/externlink.gif
// @version 1.03
// ==/UserScript==

// Dit script:
// - onthoudt welke films, muziek, enz. je al gedownload hebt (en wanneer);
// November 2012: bugfix bij tonen rating vanaf Moviemeter

var DB=null;            // Database
var MOVIEMETER_LINK=""; // MovieMeter-link van FTD-post
var MOVIEMETER_TITLE=""; 
var IMDB_LINK="";       // IMDB-link van FTD-post
var IMDB_TITLE="";
var WEBLINK="";         // Weblink van FTD-Post

var TITEL="";           // Titel van de post

$(function() {
 GM_addStyle(".MVGEEL {line-height:20px; border:solid 1px Black; background-color:yellow; font-size:18px; font-weight:bold;padding:2px}");
 GM_addStyle("#IMDBINFO, #MMINFO {font-family:Arial, Helvetica} .INL {margin-top:2px; margin-bottom:2px;font-size:18px}");
 BepaalTitelVanDePost();
 BepaalDiverseLinks();
   
 function BepaalDiverseLinks() {
  $(".infosub").each(function() { 
   if($(this).text()=="Weblink") {
    var url = $(this).next().next().first();     
    if(typeof url!="undefined" && url) {
     url = url.text();
     WEBLINK = url.toLowerCase();
     if(WEBLINK.indexOf("moviemeter")>=0) MOVIEMETER_LINK = WEBLINK;
     if(WEBLINK.indexOf("imdb.com")>=0) IMDB_LINK = WEBLINK;
    }
   }   
  });
  ToonAlgemeneInfo();
  if(!MOVIEMETER_LINK) ZoekMovieMeterLink();
  else ToonMovieMeterInfo();
  if(!IMDB_LINK) ZoekIMDBLink();
  else ToonIMDBInfo();  
 }
 
 function ToonAlgemeneInfo() {
  $(".postinfo").each(function() {
   if($(this).attr("style") && $(this).hasClass("Video_odd") && $(this).attr("style").indexOf("min-height:150px")>=0) {
    $(this).html("<table cellpadding=20><tr><td id=MVINFO width='45%' valign=top></td><td width=55% valign=top>"+$(this).html()+"</td></tr></table>" );
    return false;   
   }
   return true;
  });
  $("#MVINFO").html(GM_getResourceText("TemplInfo"));
  if(WEBLINK)
   $("#WEBLINK").attr("href",WEBLINK).html(WEBLINK+"&nbsp;<img src=\""+GM_getResourceURL("extlink")+"\" />");
  else
   $("#WEBLINK").attr("href",WEBLINK).html("(niet gevonden)");   
 }
 
 function OnChangeMM() {
  MOVIEMETER_LINK = $("#MVMMOVIE").val();
  $("#MMGIF").attr("href",MOVIEMETER_LINK);
  GM_xmlhttpRequest({method: "GET", url:MOVIEMETER_LINK, onload: function(r){
   IMDB_LINK = $(".options_links:eq(0) a",r.responseText).attr("href");
   MM_Summary(r);    
   ToonIMDBInfo();       
  }});
 }
 
 function MM_Summary(r) {
   var actors="";
   $("span[itemprop='actors']",r.responseText).each(function(){if(actors) actors+=" ";actors+=$(this).text();});
   SUMMARY_MM($("span[itemprop='description']",r.responseText).html(), 
    // MV 12-11-2012 $.trim($("span[itemprop='ratingValue']",r.responseText).html()).replace(",",".")*2,
    $.trim($("span[itemprop='average']",r.responseText).html()).replace(",",".")*2,
    $("span[itemprop='genre']",r.responseText).html(),    
    actors+".",
    $("h1",r.responseText).html()    
   );
  }
 
 function ToonMovieMeterInfo(sDropDown) { 
  // Links e.d. zijn gevonden: toon ze in de UI.  
  if($("#MVINFO").length==0) ToonAlgemeneInfo();
  if(sDropDown) {
   sDropDown = "<select id=\"MVMMOVIE\">"+sDropDown+"</select>";   
   $("#MMLINK").html(sDropDown);
   $("#MVMMOVIE").change(function() {    
    OnChangeMM();
   });
   setTimeout(OnChangeMM,10);
  }
  else 
   if(MOVIEMETER_LINK)
    $("#MMLINK").html("<a href=\""+MOVIEMETER_LINK+"\">"+MOVIEMETER_LINK+"&nbsp;<img src=\""+GM_getResourceURL("extlink")+"\" /></a>");
   else
    $("#MMLINK").html("(niet gevonden)");
   
  // Vraag nog een keer MovieMeter om de titel te achterhalen
  if(MOVIEMETER_LINK) {
   GM_xmlhttpRequest({method: "GET", url:MOVIEMETER_LINK, onload: function(r){
    var t = $.trim($("h1",r.responseText).text());
    $("#MMLINK").html("<a href=\""+MOVIEMETER_LINK+"\">"+t+"&nbsp;<img src=\""+GM_getResourceURL("extlink")+"\" /></a>");
    MM_Summary(r);   
   }});
  } 
 }
 
 function ToonIMDBInfo() {
  if($("#MVINFO").length==0) ToonAlgemeneInfo();
  if(IMDB_LINK)
   $("#IMDBLINK").attr("href",IMDB_LINK).html(IMDB_LINK+"&nbsp;<img src=\""+GM_getResourceURL("extlink")+"\" />");
  else
   $("#IMDBLINK").attr("href","").html("(niet gevonden)");
  
  // Vraag nog een keer de IMDB-op om de titel en andere details te achterhalen
  if(IMDB_LINK) {
   GM_xmlhttpRequest({method: "GET", url:IMDB_LINK, onload: function(r){
    var t = $.trim($("h1",r.responseText).text());
    var actors="";
    $("a[itemprop='actors']",r.responseText).each(function(){if(actors) actors+=" ";actors+=$(this).text();});
    var genre="";
    $("a[itemprop='genre']",r.responseText).each(function(){if(genre) genre+=" ";genre+=$(this).text();}); 
    SUMMARY_IMDB($("p[itemprop='description']",r.responseText).text(), 
     $(".star-box-giga-star",r.responseText).text(),
     genre,
     actors,t
     );
    $("#IMDBLINK").html(t+"&nbsp;<img src=\""+GM_getResourceURL("extlink")+"\" />");   
   }});
  }
 
 }
 
 function BepaalTitelVanDePost() {
  TITEL = $(".topicname table tr td:eq(1)").text();
 }
  
 // Zoek een link naar Moviemeter adhv de titel van de post
 function ZoekMovieMeterLink() {
  var sFilmTitel = TITEL;
  if(sFilmTitel.length>5) { // Haal het jaar (eventueel) van de titel af
   var n1 = sFilmTitel.indexOf("(");
   var n2 = sFilmTitel.indexOf(")");
   if(n2>n1 && n1>0) 
    sFilmTitel = sFilmTitel.substring(0,n1-1);     
  }
  function RESPONSE_MMFindURL(r) {
   // Hier komt ie als je naar een titel zocht op MovieMeter      
   var sDropDown=""; var n=0; var MovieMeterUrl="";
   $("div",r.responseText).each(function() {      
    if($(this).attr("id") && $(this).attr("id").indexOf("filmresults_row")==0) {
     n++;
     sDropDown += "<option value=\""+$("a",$(this)).attr("href")+"\">"+$(this).text()+"</option>";
     MovieMeterUrl = $("a",$(this)).attr("href"); // Onthoud de laatste url 
    }
   }); 
    
   if(n==1)  // Er was precies 1 zoekresultaat op MovieMeter   
    MOVIEMETER_LINK = MovieMeterUrl;   
   else {
    // Meerdere resultaten op MM, laat die zien in een dropdownlijst
       
   }
   ToonMovieMeterInfo(sDropDown);   
  }
  GM_xmlhttpRequest({method: "GET", url:"http://www.moviemeter.nl/film/search/"+encodeURI(sFilmTitel), onload: RESPONSE_MMFindURL});
 }
 
 function ZoekIMDBLink(Titel) {  
  var sFilmTitel = TITEL;
  if(Titel) sFilmTitel=Titel;
  if(sFilmTitel.length>5) { // Haal het jaar (eventueel) van de titel af
   var n1 = sFilmTitel.indexOf("(");
   var n2 = sFilmTitel.indexOf(")");
   if(n2>n1 && n1>0) 
    sFilmTitel = sFilmTitel.substring(0,n1-1); 
  }   
  function _IMDBFindURL(r) {
   var rowCount = $('.results:eq(0) tr',r.responseText).length;
   if(rowCount==2) { // 1 resultaat op IMDB
    IMDB_LINK="http://www.imdb.com"+$(".results:eq(0)",r.responseText).find(".title").find("a").attr("href");
    ToonIMDBInfo();
   }   
   else if(MOVIEMETER_LINK) {
    // IMDB-link niet gevonden, maar MM-link wel: scrape IMDB-link van Moviemeter pagina
    function _MMLoadPagina(r) {
     IMDB_LINK = $(".options_links:eq(0) a",r.responseText).attr("href");     
     ToonIMDBInfo();
    }
    GM_xmlhttpRequest({method: "GET", url:MOVIEMETER_LINK, onload: _MMLoadPagina}); 
   }
   ToonIMDBInfo();// Leeg   
  }
  GM_xmlhttpRequest({method: "GET", url:"http://www.imdb.com/search/title?title="+encodeURI(sFilmTitel)+"&title_type=feature", onload: _IMDBFindURL}); 
 }
 
 // *** UI ***
 function SUMMARY_IMDB(text, rating, genre, actors, t) { 
  if(0==$("#IMDBINFO").size())
   $("#MVINFO").append("<p id=IMDBINFO></p>");
  $("#IMDBINFO").html("<span class=MVGEEL>&nbsp;"+$.trim(rating)+"&nbsp;</span> (IMDB)"+
  "<h2 class=INL>"+t+"</h2>"+
  "<b>"+genre+"</b> with "+actors+"<br />"+text);  
 }
 
 function SUMMARY_MM(text, rating, genre, actors, titel) {
  if(0==$("#MMINFO").size())
   $("#MVINFO").append("<p id=MMINFO></p>");
  $("#MMINFO").html("<span class=MVGEEL>&nbsp;"+$.trim(rating)+"&nbsp;</span> (MovieMeter * 2)"+
   "<h2 class=INL>"+titel+"</h2>"+
   "<b>"+genre+"</b> met "+actors+"<br />"+text);
 }
  
  // *** Utils ***
 function getURLParam(name) { return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);}
 
});
