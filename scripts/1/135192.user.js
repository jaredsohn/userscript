// ==UserScript==
// @name            Twitter-Hacker
// @namespace       http://www.m4rc3lv.nl
// @description     Twitter-hacker
// @version         2.17
// @include         https://www.twitter.com/*
// @include         https://twitter.com/*
// @include         http://www.twitter.com/*
// @include         http://twitter.com/*
// @exclude         http://twitter.com/*status*
// @exclude         https://twitter.com/*status*
// @require         http://www.m4rc3lv.nl/jquery-1.6.4.min.js
// @resource hacked http://www.m4rc3lv.nl/pix/hacked.gif
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_addStyle
// @grant           GM_getResourceURL
// ==/UserScript==

// Versie 1.3: bugfix Youtube
// Versie 1.41: Youtube weggehaald :-(
// Versie 1.42: Time-stamp-expandering toegevoegd
// Versie 1.5: Aangepast aan nieuwe lay-out van de Twitter-site. Opties weggehaald!
// Versie 1.51: Time-stamp gefixt 
// Versie FF1.0: Geporteerd naar Firefox
// Versie 2.00: Compleet herschreven, links en plaatjes-expandering werkend gemaakt
// Versie 2.10: Configuratiedialoog erbij gemaakt.
// Versie 2.12: Irritante reclame voor Twitter-app verwijderd (waarom krijg ik die reclame te zien als ik toch al de app heb gedownload?)
// Versie 2.15 bugfix bij bekijken grote foto's, rare teksten verwijderd
// Versie 2.16: oktober 2012bugfix Windows 8 Firefox 16, @grant-statements toegevoegd voor Greasemonkey 1.0-compatibiliteit 
// Versie 2.17: februari 2013 - Bugfix automatisch openen foto's
// Versie 2.18: maart 2013 - Alweer die bug met autom. openen foto's. Ik heb nu maar ff die hele autom. openen weggehaald. Nu is het dus niets meer dan een breedbeeld-Twitter. Ook leuk hoor.

function init() {
 $("#page-container").css("width","1100px");
 $(".content-main").css("width","778px"); 
 $(".promptbird-action-bar").remove();
 GM_addStyle(".M4rc3lvROOD{border: 4px solid GOLD;border-radius: 10px;margin:2px}");
 
 
}

var AUTO_UITKLAPPEN="AUTO_UITKLAPPEN";
var EXPAND_LINKS="EXPAND_LINKS";

$("#global-actions").append("<li>\
 <a id=MVCONFIG href=# style='background-image:url("+GM_getResourceURL("hacked")+");\
 background-repeat:no-repeat;padding-left:18px;background-position:0 11px'>Config...</a>\
 </li>");
$("#MVCONFIG").click(instellingen);
 
init();
setTimeout(check,1300);
$("#M4rc3lCONFIG").click(instellingen);

function check() { 
 init();

 if(GM_getValue(AUTO_UITKLAPPEN,"1")=="1") {
  return; // Maart 2013
  // Automatisch uitklappen van alle tweets, foto's e.d.
  $("span.expand-stream-item.js-view-details").each(function() {
   if(!$(this).hasClass("HackedByM4RC3LV") && (
    $.trim($(this).text())==="Foto weergeven"
    && $("body").html().indexOf("580px")<0 // MV 16-2-2013
   )) {
    console.log(">>"+$(this).parent().html());
    $(this).addClass("HackedByM4RC3LV").click().addClass("HackedByM4RC3LV");
   }
  });
 }

 if(GM_getValue(EXPAND_LINKS,"1")=="1") { 
  // Expanderen van links
  $("a").each(function() {
   if(!$(this).hasClass("HackedM4RC3LV2")) {
    var url = $(this).attr("data-ultimate-url"); 
    if(url) { 
     $(this).html("<img src="+GM_getResourceURL("hacked")+">"+url);
     $(this).addClass("HackedM4RC3LV2");
    }
    /*NEED else {
     url = $(this).attr("data-expanded-url"); 
     if(url) {
      $(this).html("<img src="+GM_getResourceURL("hacked")+">"+url);
      $(this).addClass("HackedM4RC3LV2");
     }
    }*/
   }
  });
 }
 
 setTimeout(check,7000); 
}

function instellingen() {
 
 GM_addStyle(".WIT{color:white}");
  GM_addStyle("#centerpoint {top: 50%;left: 50%; position: absolute;z-index:9999999}");
  GM_addStyle("#dialog {position: relative; width: 400px; margin-left: -200px; height: 200px; margin-top: -250px;background-color:#3D467A;color:White;border-style:ridge;padding:15px;"+
   "color:White;}");
  $("body").append (
   '<div id=centerpoint><div id="dialog">'+
   '<img src="'+GM_getResourceURL("hacked")+'" />&nbsp;<b>Twitter-hacker - Instellingen</b><br /><br /> \
   <table>\
    <tr><td><input type=checkbox id=UITKLAPMV /> Automatisch uitklappen van afbeeldingen.</td></tr>\
    <tr><td><input type=checkbox id=EXPANDMV /> Automatisch expanderen van links.</td></tr>\
   </table><div>&nbsp;</div><br /><br />\
   <center><input type=button id=BTNOK value="Opslaan" />&nbsp;&nbsp;&nbsp;<input type=button id=BTNCANCEL value="Annuleren" />\
   <div style="font-size:5%">&nbsp;</div><div style="font-size:65%">Vergeet na het opslaan niet om even de pagina te verversen.</div></center>\
    \
    </div> </div>');
    
  $("#UITKLAPMV").attr("checked",GM_getValue(AUTO_UITKLAPPEN,"1")=="1");
  $("#EXPANDMV").attr("checked",GM_getValue(EXPAND_LINKS,"1")=="1");  
    
  $("#BTNCANCEL").click(function(){$("#centerpoint").remove();});
  $("#BTNOK").click(function(){
   GM_setValue(AUTO_UITKLAPPEN,$("#UITKLAPMV").is(":checked")? "1" : "0");
   GM_setValue(EXPAND_LINKS,$("#EXPANDMV").is(":checked")? "1" : "0");   
   $("#centerpoint").remove();
  });
}

