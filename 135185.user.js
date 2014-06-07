// ==UserScript==
// @name            Lesroosterhacker
// @namespace       http://www.m4rc3lv.nl
// @description     Gebruikersvriendelijker lesrooster voor FHICT
// @version         2.46
// @include         https://fhict.fontys.nl/Roosters*
// @include         https://www.fontys.nl/roosters/*
// @include         https://www.fhict.nl/Roosters/*
// @include         http://www.fontys.nl/roosters/FHI/*
// @include         https://www.fontys.nl/roosters/FHI/*
// @require         http://www.m4rc3lv.nl/Script/easy/jquery-1.8.0.min.js
// @require         http://www.m4rc3lv.nl/Script/easy/jquery.easyui.min.js
// @resource        CSSeasy http://www.m4rc3lv.nl/Script/easy/themes/default/easyui.css

// @resource hacked http://www.m4rc3lv.nl/pix/hacked.gif
// @resource blauw  http://www.m4rc3lv.nl/pix/lesroosterHackerBlauw.png

// ==/UserScript==
// Mei 2012: Versie 1.03: Weeknummers als array 
// Juni 2012: Versie 1.04: Webservice die weeknummers ophaalt
// Juni 2012: Versie 1.06: Configuratiescherm erbij gemaakt
// Juni 2012: Versie 1.07: Bugfix docenten met letters die in een andere docent-code voorkomen
// Juli 2012: Versie 1.50: Source in meerdere bestanden, inzet van div. jQuery-plugins (sinds versie 1.6 is dit weer weg)
// November 2012: Versie 1.6: Vakantieweken worden nu aangegeven (i.p.v. de rare week -1)
// Maart 2013: Versie 2.0: Toepassen van FHICT-API 
// Oktober 2013: Versie 2.44: Nieuwe API's erin gezet

var Docenten = GM_getValue("DOCENTEN","").split("|");
var Klassen = GM_getValue("KLASSEN","").split("|");

// API's
var API_AFK="https://apps.fhict.nl/api/v1/people/afkorting/" //"https://tas.fhict.nl/api/medewerker/afkorting/"; // vhz/
var API_LIJST="https://apps.fhict.nl/api/v1/people/list/";
var API_FOTO="https://apps.fhict.nl/ADS/picture/"; //i872272/

// Team S, Team M, enz. Voor een snelle link naar de FHICT-portal vanaf een docent's rooster
var Teams =[
 "Team S","https://portal.fhict.nl/IS/default.aspx",
 "Team M","https://portal.fhict.nl/IMD/default.aspx",
 "Team B","https://portal.fhict.nl/IB/default.aspx",
 "Team T","https://portal.fhict.nl/IT/default.aspx",
 "Algemeen","https://portal.fhict.nl/Pages/Welkom.aspx" ,
 "Engelstalige opleiding","https://portal.fhict.nl/es/SitePages/Home.aspx"
];

// Stijl voor de docent-info (naam, email, team, PCN):
GM_addStyle(".MVINFO{line-height:18px;font-size:13pt;color:Black} .MVINFO a {color:black}");
GM_addStyle("#MVfoto {position:absolute;display:none;z-index:5000;background-color:white");
GM_addStyle("#MVFotoHover {cursor:pointer}");

$("select[name=week]").css("width", "180px").addClass("chzn-select");
$("select[name=element]").css("width", "270px");

$("option").css("font-family","Courier");
$("select").css("font-family","Courier");

// Bugfix (workaround) afdrukken-ikoon:
setTimeout(function(){
  $("select[name=element]").css("width", "271px");
  $("a[href='$']").parent().remove();
},10);

// Verwijder bovenste frame
$("frameset").attr("rows","0,50,*,30");

/*$("body").append("<center><div style='font-size:10pt'>API-test:<br /><a href='"+API_AFK+"vhz'>"+API_AFK+"</a>"+
 "<br /><a href='"+API_LIJST+"'>"+API_LIJST+"</a></div></center>");*/

$(function () {
 // UI aanpassen: 
 //var CSSeasy = GM_getResourceText ("CSSeasy");
 //GM_addStyle(CSSeasy);
 var Lijst;
 
 function docentByAfkorting(json,afk) {  
  try {
   afk=afk.toLowerCase();
   for(var i=0; i<json.length; i++) {   
    if(json[i].personalTitle && json[i].personalTitle.toLowerCase()==afk)
     return json[i];    
   }  
   return "";
  }
  catch(e) {
   return "";
  }
 }
 
 function cmdHandler() { 
  $("select[name=element] option").each(function() {
   var docent=docentByAfkorting(Lijst,$(this).text());
   if(docent.displayName)
    $(this).html(Vijf(upperOne($(this).text()))+" "+docent.displayName);});     
  
  // Maart 2013: toon e-mailadres en foto van de docent
  var docentAfkorting=$.trim($(".tt font:eq(1)").text()); // Tsja...  
  var docent = docentByAfkorting(Lijst,docentAfkorting);  

  if(docent) {   
   try {
    $(".tt font:eq(1)").html("<div class=MVINFO>"+ 
     docent.personalTitle.toUpperCase()+": "+
     "<span id=MVFotoHover>"+docent.displayName+"<div id='MVfoto'><img src='"+API_FOTO+docent.cn.toLowerCase()+"' /></div></span>"+
     " <a target=_blank href='"+LinkvanTeam(docent.department)+"'>"+docent.department+
     "</a>, ["+docent.cn.toLowerCase()+"] <a href=mailto:'"+docent.mail+"'>"+docent.mail+"</a></div>"
    ); 
    $(".tt font:eq(2)").remove();
    
    // Foto docent    
    $("#MVFotoHover").hover(
     function(e){
      $('#MVfoto').css({'top':e.pageY,'left':e.pageX}).fadeIn('fast');
      $("#MVfoto").show();}, 
     function(){$("#MVfoto").hide();}
    );
   }
   catch(e) {
   }
  }  
 }
 
 function Vijf(s) {
  while(s.length<5) s+=" "; // TODO
  return s.replace(/ /g,"&nbsp;");
 }
 
 function upperOne(s) {
  if(s.length>=1) return s[0].toUpperCase()+s.substring(1);
  else return s;
 }
 
 function LinkvanTeam(team) {
  for(var i=0; i<Teams.length; i+=2) {
   if(Teams[i].toLowerCase()===team.toLowerCase())
    return Teams[i+1];
  }
  return "https://portal.fhict.nl/Pages/Welkom.aspx";
 }
      
 // Laadt lijst docentgegevens (JSON) middels de API
 GM_xmlhttpRequest({
   method: "POST",
   url: API_LIJST,   
   onload:function(R) {
    var data = eval("(" + R.responseText + ")"); 
    Lijst=data;   
    cmdHandler();
   }
 });

 $("select[name=week] option").each(function () {
  var txt = $(this).text().trim();  
  var parms = "datum=" + txt+"&value="+$(this).attr("value"); 
  GM_xmlhttpRequest({
   method: "POST",
   headers: {"Content-Type": "application/x-www-form-urlencoded" },
   url: "http://www.m4rc3lv.nl/GetWeekNum.ashx",
   data: parms,
   onload: function (R) {    
    var week  = R.responseText.split("|")[0]; 
    if(week==99) 
     week="Vakantie";
    else
     week ="[Week "+week+"]";
    var waarde = R.responseText.split("|")[1];
    var currHTML = $("select[name=week] option[value="+waarde+"]").html();
    $("select[name=week] option[value="+waarde+"]").html(currHTML+"&nbsp;"+week);
   },   
  }); 
 });
 
 // Ik maak sommige jQuery functies hoofdletteronafhankelijk
 $.expr[":"].contains = $.expr.createPseudo(function(arg) {
 return function( elem ) {return $(elem).text().toUpperCase().indexOf(arg.toUpperCase())>=0;};});
 
 $.expr[":"].find = $.expr.createPseudo(function(arg) {
 return function( elem ) {return $(elem).text().toUpperCase().indexOf(arg.toUpperCase())>=0;};});
 
 // Maak alle kolommen even breed 
 $(".tt table[rules='all']").attr("width", "90%");
 $(".tt table[rules='all'] tr:nth-child(1) td").attr("width", "6.66%");

 // Knoppen toevoegen: 
 var nAantalKnoppen=0;
 for (var i=0; i<Docenten.length; i++) 
  if(Docenten[i].length>0) {
   $("select[name=element]").parent().append("<input type=button value=\"" + Docenten[i] + "\" class=btnDOCENT />&nbsp;");
   nAantalKnoppen++}
 if (Klassen.length) {
  $("select[name=element]").parent().append("&nbsp;|&nbsp;");
  for (var i=0; i<Klassen.length; i++) 
   if(Klassen[i].length>0) {
    $("select[name=element]").parent().append("<input type=button value=\"" + Klassen[i] + "\" class=btnKLAS />&nbsp;");
    nAantalKnoppen}
 }

 // Configuratie
 if(location.href.indexOf("t/t")>0 || location.href.indexOf("c/c")>0 || location.href.indexOf("welcome.htm")>0) {      
  if(nAantalKnoppen==0) config();  
  $("body").prepend("<input type=button value=\"Config...\" title=\"Configuratie Lesroosterhacker\" id=btnCONFIG />&nbsp;");    
  $("#btnCONFIG").click(function() {
   config();
  });     
 }

 $("select[name=type]").change(function() {
   cmdHandler();
 });
 
 $(".btnDOCENT").click(function () {
  $("select[name=type]").val("t").change(); // Selecteer Soort=Docenten (t == Docenten)

  // Zoek de value van de docent in de "Element"-dropdown
  // Bugfix 26-6-2012 var v = $("option:contains(" + $(this).val() + ")").val();
  var v = $("option:find(" + $(this).val() + ")").val();

  $("select[name=element]").val(v).change();  // Selecteer de docent
  cmdHandler();
 });

 $(".btnKLAS").click(function () {
  $("select[name=type]").val("c").change(); // Selecteer Soort=Klas (c == Klas)

  // Zoek de value van de klas in de "Element"-dropdown
  var v = $("option:find(" + $(this).val() + ")").val();

  $("select[name=element]").val(v).change();  // Selecteer de klas
  cmdHandler();
 });

 var AANTALVELDEN=9;
 function config() {
  GM_addStyle(".WIT{color:white}");
  GM_addStyle("#centerpoint {top: 50%;left: 50%; position: absolute;z-index:9999999999}");
  GM_addStyle("#dialog {position: relative; width: 600px; margin-left: -300px; height: 400px; margin-top: -250px;background-color:#3D467A;color:White;border-style:ridge;padding:15px;"+
   "color:White;}");
  $("body").append (
   '<div id=centerpoint><div id="dialog">'+
   '<img src="'+GM_getResourceURL("hacked")+'" />&nbsp;<b>Lesrooster-hacker</b><br /> \
   <table><tr><td colspan=2 class=WIT>Vul de docent-code\'s en/of klassen in waar u in bent ge&iuml;nteresseerd.</td></tr> \
    <tr><td class=WIT>Docenten:</td><td class=WIT>Klassen:</td></tr>\
    <tr><td><input type=text id=DOCENT1 /></td><td><input type=text id=KLAS1 /></td></tr>\
    <tr><td><input type=text id=DOCENT2 /></td><td><input type=text id=KLAS2 /></td></tr>\
    <tr><td><input type=text id=DOCENT3 /></td><td><input type=text id=KLAS3 /></td></tr>\
    <tr><td><input type=text id=DOCENT4 /></td><td><input type=text id=KLAS4 /></td></tr>\
    <tr><td><input type=text id=DOCENT5 /></td><td><input type=text id=KLAS5 /></td></tr>\
    <tr><td><input type=text id=DOCENT6 /></td><td><input type=text id=KLAS6 /></td></tr>\
    <tr><td><input type=text id=DOCENT7 /></td><td><input type=text id=KLAS7 /></td></tr>\
    <tr><td><input type=text id=DOCENT8 /></td><td><input type=text id=KLAS8 /></td></tr>\
    <tr><td><input type=text id=DOCENT9 /></td><td><input type=text id=KLAS9 /></td></tr>\
   </table><div>&nbsp;</div>\
   <center><input type=button id=BTNOK value="Opslaan" />&nbsp;&nbsp;&nbsp;<input type=button id=BTNCANCEL value="Annuleren" />\
   <div style="font-size:5%">&nbsp;</div><div style="font-size:65%">Vergeet na het opslaan niet om even de pagina te verversen.</div></center>\
    \
    </div> </div>');
  var docenten=GM_getValue("DOCENTEN","").split("|"); var klassen=GM_getValue("KLASSEN","").split("|");
  for(var i=1; i<=docenten.length; i++) $("#DOCENT"+i).val(docenten[i-1]);
  for(var i=1; i<=klassen.length; i++) $("#KLAS"+i).val(klassen[i-1]);

  $("#BTNCANCEL").click(function(){$("#centerpoint").remove();});
  $("#BTNOK").click(function(){
   var docenten="",klassen="";
   for(var i=1; i<=AANTALVELDEN/*Aantal invulvelden*/; i++) {
    if($("#DOCENT"+i).val()) {
     if(docenten.length>0) docenten+="|";
     docenten+=$("#DOCENT"+i).val();
    }
    if($("#KLAS"+i).val()) {
     if(klassen.length>0) klassen+="|";
     klassen+=$("#KLAS"+i).val();
    }
   }
   GM_setValue("DOCENTEN",docenten);
   GM_setValue("KLASSEN",klassen);
   $("#centerpoint").remove();
  });
 }

});

