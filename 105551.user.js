// ==UserScript==
// @name           De Gobb
// @namespace      marcelv.net
// @include        http://www.google.nl/*
// @include        http://www.google.com/*
// @exclude        http://www.google.nl/imag*
// @exclude        http://www.google.nl/custom*
// @require        http://blog.marcelv.net/js/jquery-1.3.2.min.js
// ==/UserScript==

// September 2010: aangepast voor Debian
// Versie 1.1 26 november 2010: fixed voor Google Instant Search
// Versie 1.2 april 2011: Mogelijkheid voor spam-sites toe te voegen met grijze achtemrgrondkleur
// Versie 1.3 juni 2011: Clean up van oude code

var bRefresh=false;

$(function(){
 // Google Afbeeldingen e.d. doe dan niks
 if( $(".gbz0l").text()!="Het internet" ) 
  return;

 $("#main").bind('DOMSubtreeModified',function(){
  refresh();
 });

 GM_addStyle(".MVa, #Wiki1, #Wiki2, #Twit{background-color:#F9F9F9}");
 GM_addStyle("#Wiki1, #Wiki2, #Twit{margin:0 0 4px 0;padding:10px}");
 GM_addStyle("#MVextra {padding:0px}");
 GM_addStyle("#Nzb {margin:0 0 4px 0;padding:10px;background-color:#F9F9F9}");
 
 GM_addStyle(".MVnl{background-color:#FFF0E0}");
 GM_addStyle(".MVspam{background-color:#BBBBBB;font-size:9px}");
 GM_addStyle(".MVi{width:111px; height:82px; margin-right:5px; border:solid 1px Silver");
 
 GM_addStyle(".MVwik ul {margin: 2px 10px 2px 20px; padding: 0; } ");    
 GM_addStyle(".MVico {width:16px;height:16px;}"); 
 GM_addStyle("#MVclosNZB {width:14px; height:14px;background:#FFF url('http://www.google.nl/images/nav_logo7.png') no-repeat fixed -164px -160px}"); 
 GM_addStyle(".MVtwI {width:32px; height:32px;} .MV3 {height:50px;min-height:50px}");
 
 GM_addStyle(".MVb{background-coarch xfcelor:Red;color:White;font-size:20px;font-weight:bold;padding:10px;}");
 
 // Waar is op gezocht?
 var keyw=$("[name=q]").val(); 
 var keywEn = encodeURIComponent(keyw);
  
 // Center-col
 $("#center_col").attr("id","mvCenterCol");
 GM_addStyle("#mvCenterCol{padding-left:200px}");
 
 // Maak omhullende div breedbeeld 
 $("#cnt").css("display","inline");
 
 // Voor de RSO komt tabel met zoekresultaten
 var res;
 if($("#res")[0])
  res = $("#res");
 else
  res = $("#rso");
 $(res).before("<table cellspacing=4 cellpadding=4 id=MVt width=100%></table>");  
  
 Doen();      
 
 // MV 12-11-2010
 $(".vsc").css("display","inline");
 // MV End

 $("a").each(function() {
  if($(this).text()=="Volgende") {
   x = $(this).attr("href");   
   if(x && x.indexOf("&num=")<0) {
    x += "&num=100";
    var w = "<span class='csb ch' style=\"background-position: -112px 0pt; margin-left: 13px; width: 45px;\"></span>";    
   }
   return false;
  }
 });
 
 // Tot hier toe geen JavaScript-errors? Verwijder het google-resultaat 
 $("#ires").remove();
 $("#res").remove();
 
});

function parseUri (str) {
 var o   = parseUri.options,  m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),  uri = {},
  i   = 14; while (i--) uri[o.key[i]] = m[i] || ""; uri[o.q.name] = {}; uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
  if ($1) uri[o.q.name][$1] = $2; }); return uri;
};parseUri.options = {
 strictMode: false, key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
 q:{ name:"queryKey",  parser: /(?:^|&)([^&=]*)=?([^&]*)/g },
 parser:{ strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
  loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
 }};
String.prototype.trim = function() {
 return this.replace(/^\s+|\s+$/g,"");
}

function Doen() {
 bRefresh=false;
 var odd=false;
 var s="";
 var e = ""; 

 $("li.g").each(function() { 
  var lnk = $(this).html(); 
  var href = $("a",lnk).attr("href"); 
  if(href) { 
  var hostname = parseUri(href).host;
  var protocol = parseUri(href).protocol;
  var c="MVa";
  if(hostname.indexOf(".nl")>1 || hostname.indexOf("nl.wikipedia")>=0) c="MVa MVnl"; 

  // Spam-sites andere kleur
  if(hostname.indexOf("bigresource.com")>1 ||
  hostname.indexOf("fanhow.com")>1
  )
   c="MVa MVspam";
  
  // Preview-image
  var sl = href.match(/:\/\/www.(\w)|:\/\/(\w)/);
  if(sl) {
   sl = sl[1] || sl[2];
   var url = "http://" + sl + ".googlepreview.com/preview?s="+ hostname;  
   var sImg = "<img class=MVi src=\""+url+"\" />";  
   // MV 12-11-2010 lnk = sImg +lnk;
   lnk = "<table width=100%><tr><td valign=top>"+sImg+"</td><td valign=top>"+lnk+"</td></tr></table>";
  }
  
  if(!odd) {
   s += "<tr><td valign=top class=\""+c+"\" width=40%>"+lnk+"</td>";   
  }
  else {
   s += "<td width=40% class=\""+c+"\" valign=top>"+lnk+"</td>"+e+"</tr>"; 
   e = "";
  }
  odd = !odd;
}
 }); 

 if(odd)
  s += "</tr>";
 $("#MVt").append(s);  
 
} 

function refresh() {
  if(!bRefresh) {
   bRefresh = true;
   setTimeout(Doen,1000); 
  }
 }
