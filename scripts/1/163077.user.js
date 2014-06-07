// ==UserScript==
// @name            FTDWorld zoek alle woorden
// @namespace       http://www.m4rc3lv.nl
// @description     Zoekfunctie die zoekt op ALLE woorden voor FTDWorld (C) M4rc3lv
// @version 1.9
// @include         http://www.ftdworld.net/*
// @include         http://ftdworld.net/*
// @require         http://www.m4rc3lv.nl/jquery-1.6.4.min.js
// @resource hacked http://www.m4rc3lv.nl/pix/hacked.gif
// ==/UserScript==
// maart 2013: eerste versie
// maart 2013: bugfix lowercase
var resultCount;

$(function () {
 $("iframe").remove(); // Reclame verwijderen
 GM_addStyle("#MVBtnZoek2 {background-color:Silver} #MVZoek2{width:240px} \
  #ftdresult{font-size:13px;font-family:arial!important;background-color:white!important;}\
  #MFinfo2{}\
  #MVDIV2{color:white; font-size:13px;font-family:arial;margin:10px 25px 0 0;padding:8px 0 10px 20px;background-color:gray; border:solid 1px black; border-radius:6px}");
 var d = "<div id=MVDIV2> \
  <div id=#MFinfo2>Zoek alle woorden:</div>\
  <input type=text id=MVZoek2 /> \
  <input type=button id=MVBtnZoek2 value='Zoeken' /> \
  <br /><input type=checkbox id=MVAlleenDVD />Alleen DVD's\
  <br /><input type=checkbox id=MVAlleenMP3 />Alleen MP3's\
 </div>";   
 
 $("#ftdresult").parent().prepend(d);
 
 $("#MVBtnZoek2").click(function() {    
  $("#ftdresult tr").remove();  
  resultCount=0;
  //http://www.ftdworld.net/category.php?search=aaa
  //http://www.ftdworld.net/category.php?customQuery=usr&ctitle=aa&ccategory=14&ctype=4,11,12
  
  var urlNext = "http://www.ftdworld.net/category.php?search="+$("#MVZoek2").val();
  if( $("#MVAlleenDVD").attr('checked') )
   urlNext = "http://www.ftdworld.net/category.php?customQuery=usr&ctitle="+$("#MVZoek2").val()+"&ccategory=14&ctype=4,11,12";

  zoek(urlNext, $("#MVZoek2").val());  
 }); 
 
 $("#MVAlleenDVD").click(function(){$("#MVAlleenMP3").removeAttr("checked");});
 $("#MVAlleenMP3").click(function(){$("#MVAlleenDVD").removeAttr("checked");});
 
});



function toon(result) {
 // Toon resultaat  
  for(var i=0; i<result.length; i++) {
   $("#ftdresult").append("<tr>"+$(result[i]).html()+"</tr>");
  }
}

function zoek(url,zoekString) { 
 GM_xmlhttpRequest({
  method: "POST",
  url: url,
  onload: function(response) {
   var result = new Array();
   $("a",response.responseText).each(function() {
    console.log("A: "+$(this).html());
    var bIsMp3=$(this).parent().parent().html().indexOf("images/2.0.gif")>=0;
    var MVAlleenMP3=$("#MVAlleenMP3").attr("checked");
    if($(this).attr("href") && $(this).attr("href").indexOf("spotinfo.php")>=0) {
     var sTitel=$(this).text().toLowerCase();
     console.log("T: "+sTitel);
     var woorden = zoekString.split(" "),bAlle=true;
     for(var i=0; i<woorden.length && bAlle; i++) {
       if(sTitel.indexOf(woorden[i].toLowerCase())<0)
        bAlle=false;
     }
     if(bAlle && ((bIsMp3 && MVAlleenMP3) || !MVAlleenMP3 )) {
      result.push($(this).parent().parent());
      resultCount++;
     }     
    }
   });
   var curPage = params(url,'p');   
   nextUrl="http://www.ftdworld.net/"+$("a[title='Next page']",response.responseText).attr("href");      
   
   toon(result);   
   if(resultCount<500 && params(nextUrl,'p')>curPage) {
    zoek(nextUrl,zoekString);   
    //setTimeout(function(){
    //  zoek(nextUrl,zoekString);  
    // },1500); 
   }
 
  }  
 });
 
}

function params(url,name) {
 return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null;
}




