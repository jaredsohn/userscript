// ==UserScript==
// @name        MBC Everywhere
// @namespace   *
// @include     http://www.leboncoin.fr/*
// @version     3.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==


var CurVersion="3.1";
var Id_Version="advzJbBgeo";
var Lastnews="Version "+CurVersion+" : <ul><li>Choix du tri sur les annonces sauvées</li>"+
"<li>Liste de choix sur les tags des annonces sauvées</li>"+
"<li>Suite à la demande : visibilité de la zone de clic de google maps accrue</li>"+
"</ul>";

//////// parser ///
(function(e){function s(){var r;if(n.app_id&&n.rest_key){return true}r="Missing app_id, or rest_key authentication parameters.\n"+"Pass these credentials to $."+t+".init\n"+"app_id = Application Id\n"+"rest_key = REST API Key";alert(r);e.error(r);return false}function o(n,r,i){e.error("$."+t+" :"+r+" "+i)}function u(t,r,o){var u;if(!s()){return false}u={contentType:"application/json",processData:false,dataType:"json",url:n.base+(i.test(r)?r:"classes/"+r),type:t,headers:{"X-Parse-Application-Id":n.app_id,"X-Parse-REST-API-Key":n.rest_key}};if(n.session_token){u.headers["X-Parse-Session-Token"]=n.session_token}if(typeof o!=="object"){return e.ajax(u)}o=e.extend({},o);if(t==="GET"){u.processData=true;if(o.where&&typeof o.where==="object"){o.where=JSON.stringify(o.where)}}else{o=JSON.stringify(o)}u.data=o;return e.ajax(u)}function a(n,r,i){typeof r==="function"&&n.done(r);i=typeof i==="function"?i:o;n.fail(i);return e[t]}function f(n,r,i){var s=["$.",t,".",n,"(",'"',r,'"'];i&&s.push(", "+(JSON?JSON.stringify(i):"data"));s=s.join("")+");";e.publish&&e.publish("parse.log",[s]);return s}var t,n,r,i;t="parse";n={base:"https://api.parse.com/1/"};r={};i=/(files|installations|login|push|roles|requestPasswordReset|users)/;r.init=function(r){e.extend(n,typeof r==="object"?r:{},true);return e[t]};e.each(["GET","POST","PUT","DELETE"],function(e,t){var n=t.toLowerCase();r[n]=function(){var e,r,i,s,o;e=arguments;r=e[0];i=e[1];s=e[2];error=e[3];if(typeof e[1]==="function"){i=false;s=e[1];error=e[2]}f(n,r,i);o=u(t,r,i);return a(o,s,error)}});e.extend(r,{signup:function(e,t,n){return this.post("users",e,t,n)},login:function(e,t,n,r){return this.get("login",{username:e,password:t},n,r)},requestPasswordReset:function(e,t,n){return this.post("requestPasswordReset",{email:e},t,n)}});e[t]=r})(jQuery)
////////////
function getCookie(w){cName="";pCOOKIES=new Array();pCOOKIES=document.cookie.split('; ');for(bb=0;bb<pCOOKIES.length;bb++){NmeVal=new Array();NmeVal=pCOOKIES[bb].split('=');if(NmeVal[0]==w){cName=unescape(NmeVal[1])}}return cName}function setCookie(a,b,c,e){var d=new Date();d.setTime(d.getTime()+(c*24*60*60*1000));var f="expires="+d.toGMTString()+"; ";var e="path="+e+"; ";document.cookie=a+"="+b+"; "+f+e}

// variables utilisateur
var MYville = window.localStorage.getItem('ville');
var MaxDistance = window.sessionStorage.getItem('maxDistance');
if (MaxDistance == null)MaxDistance="";
var MYappid = window.localStorage.getItem('appid');
var MYrestkey = window.localStorage.getItem('restkey');
// gestion débug :
var MYdebug = window.localStorage.getItem('debug');
if (!MYdebug)console.log = function() {};

// variables fonctionnelles
var viewmenu = window.localStorage.getItem('viewmenu');
var session_sync = window.localStorage.getItem('session_sync'); // gestion synchro 0 = pas fait; 1 = fait, limité à la session

if (MYrestkey && MYappid)
{
  $.parse.init({
      app_id : MYappid,
      rest_key : MYrestkey  
  });
}


function globalsync()
{

  var timestamp=Date.now();
  // time inférieur aux 30mn, donc on rafraichit : GET cookies -> del distant; synchro
  if (session_sync>timestamp) 
  {
    console.log("Globalsync() cas de MAJ distant");
   // pour chaque Local
   // si absent dans cookie, MAJ distant
   // on recharge Local (synchro complète)
   
    // tableau des annonces en cookies
    var value = getCookie("watch_ads");
    console.log("cookies : "+value);
    var reg=new RegExp("[ ,;]+", "g");
    var tableCookies=value.split(reg);
    // récup du Local et comparaison
    var retrievedData = JSON.parse(localStorage.getItem("aCook"));
    var values = new Array;
    // si présent en Local et pas en cookie, on delete le local
    for each (aData in retrievedData){
      if (tableCookies.indexOf(aData[1]) < 0)
      {
        console.log(aData[1]+ " supprimé");
        $.parse.delete('tasks/' + aData[0]);  
      } 
    }
    synccookhere("0"); // on mets à jour tout ça!
  }
  // timer supérieur au délai = 1ère conn? on importe tout : synch (distant => LOCAL/COOKIES) puis recherche
  else
  {
    console.log("Globalsync() 1ère comm? cas synchro distant -> local");
    var deltatime=timestamp+1800000; // soit 30mn ^^
    window.localStorage.setItem("session_sync", deltatime); // on marque la MAJ
    synccookhere("1"); // va MAJ le local et les cookies à partir du distant, puis recharge
    console.log("on synchro et remets à jour le timestamp");
  }
}


// récupération en local pour limiter les requêtes ( GET distant -> LOCAL + MAJ COOKIES)
function synccookhere(ifreload) 
{
  $.parse.get('tasks',{
      where : { type:'cookies' }
    },
    function(json) {
    var results = json.results;
    if (results.length === 0) {
        return false;
    }
    // on enregistre
    var aCook = new Array();
    var cook="";
    for (var i = 0; i < results.length; i++)
    {
          // Création du tableau Local
          Valeur="";
          if (results[i].Val) Valeur=results[i].Val; // juste pour nettoyer...
          var values = new Array;
          values[0] = results[i].objectId
          values[1] = results[i].body
          values[2]=results[i].Val
          values[3]=results[i].Text
          aCook.push(values);
          // Création cookies
          cook=cook + results[i].body + ',';
          
    }     
    console.log("synccookhere() : MAJ local aCook -> "+aCook);
    window.localStorage.setItem("aCook", JSON.stringify(aCook));
    // 1ère valeur pour les résultats; second pour 0=Idbdd, 1=idarticle,2=tag 

    cook=cook.substring(0,cook.length-1);
    setCookie("watch_ads", cook,180,"/");
    if ($("#myads-backup").length > 0){get_tags();} // on rafraichis la liste du filtre si on est sur cette page!
    if (ifreload=="1"){setTimeout(function(){document.location.reload();}, 1000);} // on recharge si nécessaire      
    }); 
}
//synccookhere();

function infoLocal(type,id) // fonction de fainéant pour récup les valeurs associés à un article, à partir de LocalStorage; type = type de l'id, bdd ou article
{
  var retrievedData = JSON.parse(localStorage.getItem("aCook"));
  var values = new Array;
  // cas des vides ou inexistants
  for each (aData in retrievedData){
    mytag="";
    mytext="";
    if (aData[2]) mytag=aData[2];
    if (aData[3]) mytext=aData[3];
    if (type=="ad")
    {
      if (aData[1]==id)
      { 
        values[0] = aData[0];
        values[1] = mytag;
        values[2] = mytext;
      }
    }
    else if (type=="bdd")
    {
      if (aData[0]==id)
      { 
        values[0] = aData[1];
        values[1] = mytag;
        values[2] = mytext;
      }
    }
  }
  if (!values[0]){values[0]="";values[1]="";}
  return values;
}

// 1ère install : récup cookies et injection
function save()
{
  var verif=window.confirm("Cette opération envois vos annonces locales vers la sauvegarde. Etes-vous sûr?");
  if (verif==true) {
    var value = getCookie("watch_ads");
    console.log("save() cookies : "+value);
    var reg=new RegExp("[ ,;]+", "g");
    var tableCookies=value.split(reg);
    $.parse.get('tasks',{where : { type:'cookies' }},
      function(json){
        var results = json.results;
        for each (aCookie in tableCookies){
          if (results.indexOf(aCookie) < 0)
          {
            console.log(aCookie+ " sauvé");
            $.parse.post('tasks',{ body : aCookie, type:'cookies'},function(json){console.log('post : ' + json);}); 
          } 
        }
      });
    setTimeout(function(){document.location.reload();}, 30000);
  }
}

function initmenu()
{ 
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML  = "#Divaction{position:fixed;left:"+viewmenu+";top:50px;font-weight:bold;font-size:0.8em;float:left;transition: all .5s ease-in;}"+
    " #MYDIV{background-color:#FFCE78;padding: 10px 5px;border-radius: 0 10px 10px 0; }"+
    " #MYDIV .mytitle{border-bottom: 1px solid #000000; font-size: 1.1em;padding-bottom:2px;margin-bottom:5px;}"+
    " #VIEWMYDIV{position:fixed;left:0px;top:30px;font-weight:bold;font-size:0.8em;float:left; background-color:#E3DCCD;width:75px;border-radius: 0 10px 10px 0;padding:2px;}"+
    " .detail .price{float:none !important;height:20px !important;line-height:20px !important;}"+
    " .Divnote{margin-top:5px; margin:auto;background-color:#FFCE78;float:right;margin:5px 0;padding:2px 5px;width:180px;border-radius: 4px;}"+
    " input[type=\"text\"]{margin:2px;}"+
    " input[type=\"text\"].Ctrledit, .Textedit{text-align:center;margin : 5px auto;}"+
    " input[type=\"button\"]{text-align: center; font-size:10px;color: #000; margin:2px;background: linear-gradient( #FFE4AB, #fb9e25);border:none;border-radius: 4px;text-shadow: 0px 1px 0px #fb9e25; box-shadow: 1px 1px 2px #5D2400;} "+
    " #VERSIONSPAN a.tooltip span {display:none;}"+
    " #VERSIONSPAN a.tooltip:hover span {display:inline;position:absolute;color:#111; border:1px solid #DCA; background:#fffAF0; width:400px;left:50px;padding:5px;}"+
    " ul.dropdown{position:absolute; width:82px; display:none; background-color:#BEC0A8;margin:-5px 35px;padding:5px 10px;box-shadow:1px 1px 1px black;border-radius:0 0 5px 5px;}"+
    " ul.dropdown li{list-style-type:none;}";
    document.head.appendChild(style);
    
    var referent=document.getElementsByTagName("body")[0];
    var viewmydiv=document.createElement("div"); 
    viewmydiv.innerHTML = '<div id="VIEWMYDIV">Mon menu</div>';
    var mydiv= document.createElement("div");  
    mydiv.id = "Divaction";
    HTML =  '<div id="MYDIV">';
      if (MYappid && MYrestkey){
      HTML +='<div class="mytitle">Gestion des cookies :</div>'+
      '<INPUT type="button" id="bouton_save" value="1ère sauvegarde"><br />'+
      '<br /><br /><div class="mytitle">Mes recherches:</div><span id="LISTSEARCH"></span>'+
      '<span id="FORMSEARCH" style="display:none;"><br /><FORM name="formsearch">'+
      '<INPUT type="text" size="17" name="Sname" value=""><br/>'+
      '<input type="button" id="bouton_addsearch" value="Enregistrer" class="button"/>'+
      '</FORM></span>'+
      '<span id="ADDSEARCH"><br /><input type="button" id="bouton_viewsearchform" value="Ajouter" class="button"/></span>';
    }
        
    HTML += '<br /><br /><div class="mytitle">Gestion du script :</div>'+
    '<span id="VERSIONSPAN""></span>'+
    '<span id="FORMCFG" style="display:none;"><br /><br /><FORM name="formcfg">'+
    'Ville d\'origine :<br/><INPUT type="text" size="17" name="Sville" value="'+MYville+'">'+
    '<br/>Code App_Id :<br/><INPUT type="text" size="17" name="Sappid" value="'+MYappid+'">'+
    '<br/>Code Rest_Key :<br/><INPUT type="text" size="17" name="Srestkey" value="'+MYrestkey+'">'+
    '<br/><input type="button" id="bouton_savecfg" value="Enregistrer" class="button"/></FORM></span>'+
    '<span id="VIEWFORMCFG" style="display:block;">'+    
    '<input type="button" id="bouton_viewcfgform" value="Configurer" class="button"/><br />'+
    '<input type="button" id="vote" value="Votre avis" class="button" onclick="window.open(\'https://docs.google.com/forms/d/1zXYRHePFbgzMwG71TgnTBL0S1bqJFO5OGgR6-dfxhS8/viewform\')" />'+
    '</div>';
    //<a href="http://userscripts.org/scripts/source/101151.user.js">
    mydiv.innerHTML = HTML;
    referent.appendChild(viewmydiv);
    referent.appendChild(mydiv);
    // ajout des events
    $("#VIEWMYDIV").click(hidemenu);
    $("#bouton_save").click(save);
    $("#bouton_addsearch").click(addsearch);
    $("#bouton_viewsearchform").click(function (e) {viewform('#FORMSEARCH','#ADDSEARCH')});
    // validation par ENTER sur formsearch
    $("#FORMSEARCH").keypress(function(e){if (e.keyCode == 13){e.preventDefault();addsearch();}});
    $("#bouton_savecfg").click(savecfg);    
    $("#bouton_viewcfgform").click(function (e) {viewform('#FORMCFG','#VIEWFORMCFG')});
    if (MYrestkey && MYappid){ListSearch();} 
    console.log("initmenu, before updateversion");
    updateversion();  
}

hidemenu = function()
{
  var div=document.getElementById("Divaction");
  if (div.style.left=="0px")
  {
    window.localStorage.setItem('viewmenu', '-150px');
    div.style.left="-150px";
  }
  else
  {
    window.localStorage.setItem('viewmenu', '0px');
    div.style.left="0px";
  }
}

function savecfg()
{
  window.localStorage.setItem('ville', document.forms["formcfg"].Sville.value);
  window.localStorage.setItem('appid', document.forms["formcfg"].Sappid.value);
  window.localStorage.setItem('restkey', document.forms["formcfg"].Srestkey.value);
  document.location.reload();
}

function viewform(formin, formout)
{
  $( formout ).toggle();
  $( formin ).toggle("10000000");
}

function addsearch()
{
  var name=document.forms["formsearch"].Sname.value;
  var url = document.URL;
  $.parse.post('tasks',
    { body : url, type:'search', Val:name},
    function(json){
      ListSearch();
      viewform("#ADDSEARCH", "#FORMSEARCH");
    }); 
}

function ListSearch()
{
  var divid = document.querySelector("#LISTSEARCH");
  divid.innerHTML="";
  $.parse.get('tasks',{
    where : { type:'search' },
    order : "-createdAt"
    },
  function(json) {
    var results = json.results;
    if (results.length === 0) {
        return false;
    }
    for each (item in results)
    {
      divid.innerHTML += '<li id="Search_'+item.objectId+'" style="padding: 2px;"><span class="bouton_delsearch">X</span> <a href="'+item.body+'">'+item.Val+'</a></li>';  
    }
    $(".bouton_delsearch").click(function (e) {   
        li_ads = $(this).parents('li')
        idads = li_ads.attr('id').substring(7);
        console.log("Delete "+idads);
        $.parse.delete('tasks/' + idads,function(json){$(li_ads).remove();}); 
    });
  }); 
}


// surchages en fonction des pages -----------
function surcharge_page()
{
    console.log('Début surcharge...');
    // page des favoris ---------------------
    if ($("#myads-backup").length > 0) 
    {
      // on commence par synchroniser (utile pour les suppressions)
      console.log("beforeglobalsync");
      globalsync();
      console.log("afterglobalsync");
      

      // on complète les annonces sauvées avec la div du tag
      var listsaved = document.querySelectorAll(".myads-content div.list-lbc>a");
      if (listsaved.length > 0) { 
        for (var i = 0; i < listsaved.length; i++) {
          link=listsaved[i].href;
          var regex=/\/([0-9]{8,10})\.htm/;
          var extrait=regex.exec(link); // code article
          var itemval = infoLocal('ad',extrait[1])[1];     
          var itemnote = infoLocal('ad',extrait[1])[2];         
          var notediv = document.createElement("div");  
          notediv.className="Divnote";
          notediv.innerHTML='Tag : <INPUT type="text" size="12" name="'+extrait[1]+'" class="Ctrledit" value="'+itemval+'">'+
          '<ul class="dropdown"></ul>'+
          '<br/>Notes : <INPUT type="text" size="22" name="'+extrait[1]+'" class="Textedit" value="'+itemnote+'">';
          var nextdiv=listsaved[i].nextSibling.nextSibling;
          $(notediv).insertAfter(nextdiv);
        } 
      } 

      // gestion et enregistrement des changements
      $( "input.Ctrledit, input.Textedit" ).change(function(){
        var myval = $(this).val();
        var myid = $(this).attr('name');
        var IDbdd=infoLocal('ad',myid)[0];
        console.log("surchage().myads.changeinput : envoi de tasks/"+IDbdd+" avec Val:"+myval);
        if (this.className == "Ctrledit") {$.parse.put('tasks/'+IDbdd,{ Val : myval }, function(json){synccookhere('0');});$(this).next().fadeOut(100);}
        if (this.className == "Textedit") $.parse.put('tasks/'+IDbdd,{ Text : myval }, function(json){synccookhere('0');});
        $(this).css('color','black').css('background-color','#FFFFEB');
      });
      // css et appel de la liste
      $( "input.Ctrledit" ).blur(function() { $(this).next().fadeOut(100);$(this).css('color','black').css('background-color','#FFFFEB');});    
      $( "input.Ctrledit" ).focus(function() { $(this).next().fadeIn(100); $(this).css('color','#FF4C11').css('background-color','#BEC0A8');}); 
      $( "input.Textedit" ).blur(function() {$(this).css('color','black').css('background-color','#FFFFEB');});    
      $( "input.Textedit" ).focus(function() { $(this).css('color','#FF4C11').css('background-color','#BEC0A8');});      
      
            
      // on complète avec le filtre
      
      var topsaved = document.querySelectorAll(".myads-content div.list-lbc"); // parent
      var filtrediv= document.createElement("div");  
      filtrediv.className="Divfiltre";
      filtrediv.innerHTML='<b>Tag :</b> <select id="Schoixtag" name="Schoixtag"></select> | '+
      '<b>Trier par :</b> <select id="Schoixtrie" name="Schoixtrie">'+
      '<option value="Prix">Prix</option><option value="Distance">Distance</option><option value="Note">Note</option></select><br /><br />';
      topsaved[0].insertBefore(filtrediv, topsaved[0].firstChild);
      // on récupère les valeurs pour le filtre
      get_tags();
      filtretag(); // on applique le filtre existant
      $('#Schoixtag, #Schoixtrie').on('change', function(){return filtretag();});
    
      
      // ajout des distances
      distance();
     }
    // page de recherche ---------------------------------
    else if ($(".search_box").length > 0) 
    {
      // on complète (grise) les annonces de la recherche
      var placements = document.querySelectorAll(".content-color .list-lbc a");
      if (placements.length > 0) { 
        // tableau des annonces en cookies
        var value = getCookie("watch_ads");
        var reg=new RegExp("[ ,;]+", "g");
        var tableCookies=value.split(reg);
        // traitements des items affichés
        for each (place in placements){
          link=place.href;
          var regex=/\/([0-9]{8,10})\.htm/;
          var extrait=regex.exec(link);
          if (extrait != null){
            if (tableCookies.indexOf(extrait[1]) > 0)
            {
              var placediv= place.querySelector("div.lbc");
              placediv.style.backgroundColor = '#DDDDD5';
            }  
          } 
        }    
      } 
      // ajout des distances
      // on ajoute des filtres
      var filtrediv= document.createElement("div");  
      filtrediv.className="Divfiltre";
      filtrediv.innerHTML='<div style="border-right: 1px solid #CCCCCC;float:left; padding-right:10px;">Origine :<INPUT type="text" size="17" name="Sville" value="'+MYville+'" id="FiltreVille"></div>'+
      '<div style="border-right: 1px solid #CCCCCC;float:left; padding-right:10px;">Distance max : <INPUT type="text" size="4" value="'+MaxDistance+'" id="FiltreDistance">km</div>';
      $("#searchextras").after(filtrediv);
      $( "#FiltreVille" ).on('change keypress',function(e)
        {
          if ((e.keyCode == 13)||(e.type=='change'))
          {
            window.localStorage.setItem("ville", $( "#FiltreVille" ).val());
            document.location.reload();
          }
        }
      );
      
      $( "#FiltreDistance" ).on('change keypress',function(e)
        {
          if ((e.keyCode == 13)||(e.type=='change'))
          {
            window.sessionStorage.setItem("maxDistance", $( "#FiltreDistance" ).val());
            $('[mydest]').each(function(){
              var distfiltre=$( "#FiltreDistance" ).val()*1000;
              var eledist=$(this).attr( "dist" );
              if (eledist>distfiltre) $(this).parent().parent().parent().css("display","none");
              else $(this).parent().parent().parent().css("display","block");
            });
            e.preventDefault();
          }
        }
      );
      distance();
      // et on vire la pub...
      $(".list-gallery").hide();
    }
    // page d'annonce ----------------------------------
    else if ($(".lbcContainer").length > 0) 
    {
      $("#myads_link").click(add_ads); // surcharge du bouton de sauvegarde
    }
}


function filtretag()
{
  // récup des valeurs
  if ($('#Schoixtag').val()!=="Sans tag") var Montag=$('#Schoixtag').val();
  else var Montag="";
  window.localStorage.setItem("filtre_tag", $('#Schoixtag').val());
  var Montrie=$('#Schoixtrie').val();
  console.log("trie : "+Montrie+" et tag : "+Montag);
  
  // on commence par créer de vrais bloc div ^^
  $('.myads-content div.list-lbc>a').each(function(){
      // récup des data
      link=this.href;
      var regex=/\/([0-9]{8,10})\.htm/;
      var dataad=regex.exec(link); // code article 
      var dataprix = $(this).find('.price').text().replace('€', '').replace(/ /g,'').trim();
      var datadist =$(this).find('.Divtime').text(); 
      // on créé
      var $set = $();
      $set.push(this); // le a
      $set.push(this.nextSibling); // un espace...
      $set.push(this.nextSibling.nextSibling); // le .remove
      $set.push(this.nextSibling.nextSibling.nextSibling); // le .divnote 
      $set.push(this.nextSibling.nextSibling.nextSibling.nextSibling); // encore un espace...
      $set.push(this.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling); // le .clear
      $set.wrapAll('<div class="adbox" data-nbad="'+dataad[1]+'" data-price="'+dataprix+'" data-dist="'+datadist+'" >');
  });
  
  // on trie le tableau suivant le choix
  $('.adbox').sort(function(a, b){
    if (Montrie=="Prix")return parseInt(a.dataset.price) > parseInt(b.dataset.price);
    if (Montrie=="Distance")return parseInt(a.dataset.dist) > parseInt(b.dataset.dist);
    if (Montrie=="Note")return $(a).find('input.Textedit').val()>$(b).find('input.Textedit').val();
}).appendTo('.list-lbc');

  
  // on affiche celle qui ont le tag souhaité

  $('.adbox').each(function(){
    var extrait=this.dataset.nbad;
    $(this).hide();
    if ((infoLocal('ad',extrait)[1]==Montag) || (Montag=="Tout voir")) $(this).show();
  });
}

function add_ads(){
  var url = document.URL;
  var regex=/\/([0-9]{8,10})\.htm/;
  var extrait=regex.exec(url);
    $.parse.get('tasks',{
          where : { body:extrait[1] }
        },
        function(json) {
          var results = json.results;
          console.log('add_ads().results lenght : '+results.length);
          if (results.length == 0) { // s'il n'existe pas déjà!!
            $.parse.post('tasks',
              { body : extrait[1], type:'cookies'},
              function(json){
                console.log('post : ' + json);
                synccookhere('0');
            }); 
          }
    });
}



function get_tags(){ // fonction séparée pour l'appeler sur un changement de tag
  $("#Schoixtag option").remove(); // on vire tout pour rafraichir
  $("ul.dropdown li").remove();
  var retrievedData = JSON.parse(localStorage.getItem("aCook"));
  var values = new Array;
  $('#Schoixtag').append($('<option>', { value : "Tout voir" }).text("Tout voir")); // on remets l'option tout voir
  $('#Schoixtag').append($('<option>', { value : "Sans tag" }).text("Sans tag")); // on mets l'option pour les non taggué
  for each (aData in retrievedData){
    if (values.indexOf(aData[2]) < 0)
    {
      if (aData[2]!== null) values.push(aData[2]);
    } 
  }
  values.sort();
  $.each(values, function(key, valeur) {   
     $('#Schoixtag').append($('<option>', { value : valeur }).text(valeur)); 
    // et pour l'autocomplete...
    $('.dropdown').append('<li>'+valeur+'</li>');
  });
 $('ul.dropdown li').click(function() {
    var myval=$(this).text(); // récup de la valeur
    $(this).parent().prev().val(myval);// on copie la valeur dans le input
    var myid = $(this).parent().prev().attr('name'); // récup de l'id annonce
    var IDbdd=infoLocal('ad',myid)[0];
    console.log("surchage().myads.changeinput : envoi de tasks/"+IDbdd+" avec Val:"+myval);
    $.parse.put('tasks/'+IDbdd,{ Val : myval }, function(json){synccookhere('0');});
  });
  // on récupère le filtre stocké
  var MyFiltreTag = window.localStorage.getItem('filtre_tag');
  $('#Schoixtag').val(MyFiltreTag);
}

updateversion = function()
{
  // 
  var timestamp=Date.now();
  var timer_Version = window.localStorage.getItem('timer_version');
  var last_Version = window.localStorage.getItem('last_version'); 
  var checkafter=timer_Version*1+86400000; // 24h = 86400000 
  console.log ("updateversion() - checkafter = " + checkafter + " et timestamp = "+timestamp + " soit attente de : "+ (checkafter-timestamp));  
  if ((checkafter<timestamp) || (last_Version == null))  // s'il faut contrôler le dernier numéro de version
  {
    console.log("updateversion() - boucle if = maj version");
    window.localStorage.setItem("timer_version", timestamp); // on mets à jour le timer
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://userscripts.org/scripts/source/385831.meta.js',
      onload: function(responseDetails) {
                    var Version=/@version\s+(\d+\.\d+)/.exec(responseDetails.responseText);
                    console.log("Version récupérée : "+Version[1]);
                    window.localStorage.setItem("last_version",Version[1]); // on stocke la version uptodate 
                    updateversion(); // et on relance la fonction  
                }
    });
  }
  else // sinon
  {
    if (last_Version>CurVersion) { // si pas à jour
      console.log ("différent");  
      document.querySelector("#VERSIONSPAN").innerHTML='Version '+last_Version+' disponible!<br />'+
      '<input type="button" value="Mettre à jour" id="LinkMaj" class="button"/></a><br /><br />';
      $("#LinkMaj").click(DL_maj);
    } 
    else
    {
      document.querySelector("#VERSIONSPAN").innerHTML='Version à jour ('+CurVersion+') <a href="#" class="tooltip"><img style="vertical-align:bottom;" width="15" height="15"'+ 
        'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbUlEQVQ4jXWTTUhUURTHf+/Nc0ZHUzMVSemTLDLMCIWiclGBIG4lgoiW46Ig0EW0baMhtHHatguxRYQgSAhtAlu0EfOLGSW/mmHU+X7v3XvfbTE5OA4dOHDO/57/n8OfewyOxerkjSbL8kIYug9NjwbQel5rZjzPCl8a/Bk/Om8cbSJTncNmoGa0tq2XqsYOKuvOA2Ano2TjCyQ35lAiNdI++GusTGB16tpEXdu9UP25B1QEasCz0VoUhowKMCsRdppEZJa9yFy448nyEIAPYOljx2hd650XTZcHMHUa7A20vQH2BjjbaJEAlcK0/NQ0X0c4ue6nvcnq95/3Z43lD+2tVJ/cvHj7OYbYBWcLAF/7eIk3auVloQi0oq0WFufe4qXjbaardaiupQsjF0GnFtCZaBn5UFBnoujUAkY+QkPrTRzPCFlCqv7qYCVechHEPmhVJInvDwGouDULgHYy4ObRrs2JmiZcofotKdXVgEqg7Z0i2f12t0AQdskWxV7YBCpASnXeEkLlZWbH7/OyZWsH7v8o1s7X7hJBT8YRQvksKVQ0n050Vfu9MoHDsGc60cIpwXJ2DCnVmiWFnN5LHHQFGyvLiPkvV/6t7pa9xWJZpFDTZk544d9/MijXBumUZNXAElUDS2W4cm3Wt5PYSoTNgdeJrawtxlY202jplmTRvGP4YvSAXMYZG3yT3yp+5U+vghNnGvyhC6fr/+uFVpK1rSTrMTf8aNwZgmPHNDlSNew39ejZUxbNtT7qgyYA+1lFLKWIxgWO6408fifLj6koMkyLK/0hQ3l92qCHwj3Pe9qYUUqGn02we3T+Ly24YAJThgxSAAAAAElFTkSuQmCC" /><br /><br />'+
        '<span>'+Lastnews+'</span></a>';
    }
  }
}


function DL_maj()
{
  window.open('http://userscripts.org/scripts/source/385831.user.js');
  GM_xmlhttpRequest({
    method: 'PUT',
    url: 'https://EhB5hNN5dUBprlXcfwcHm3yF0errtP7fEayyGFSY:javascript-key=iuv9TvfNy2wX5kcwSkqIxSoKxMSMY20MulN95jce@api.parse.com/1/classes/Count/'+Id_Version,
    data:'{\"Count\":{\"__op\":\"Increment\",\"amount\":1}}',
    onload: function(responseDetails) {
          var response = JSON.parse(responseDetails.responseText);
          console.log(response.Count);
        }
    });
}

/************ GESTION DES DISTANCES ********/
function gotoGoogleMap(event) {
    event.preventDefault();
    if (!MYville) {
        alert('Aucune adresse de départ spécifiée.');
        return;
    }
    window.open('http://maps.google.fr/maps?daddr=' +$(this).attr( "mydest")+'&saddr='+MYville);
};


function distance(){  
  var aDest = new Array(); // Array pour retrouver les villes
  var lDest="";  // version liste pour requête
  var placements = document.querySelectorAll(".placement");
  if (placements.length > 0) {   
    for (var i = 0; i < placements.length; i++) {
        var text = placements[i].textContent.replace(/\s+/g, "");
            
        /* Création de la div de base*/
        var mydiv= document.createElement("div");  
        mydiv.className = "Divtime";
        mydiv.style.fontWeight = 'bold';
        mydiv.style.fontSize = '0.9em';
        mydiv.style.backgroundImage = 'linear-gradient(to right, #F4F4E0, #FBFBE7)';
        mydiv.style.width='150px';
        mydiv.style.cursor='zoom-in';
        mydiv.style.padding='2px';
        mydiv.innerHTML = '...'; // texte par défaut avant calcul 
            
        placements[i].appendChild(mydiv);
        if (text.indexOf("/",0) != "-1")   // si pas de ville, pas de traitement
        {
          nbstr= text.indexOf("/",0);
          var dest=text.substring(0, nbstr); 
          dest = dest.replace("'", ""); // les accents passent mal
          $( ".Divtime:eq( "+i+" )" ).attr( "mydest", dest ); // variable pour l'event et la maj ajax
          mydiv.addEventListener('click', gotoGoogleMap, false);
          if (aDest.indexOf(dest) < 0) 
          {
            aDest.push(dest);
            lDest=lDest+dest+", France|";
          }
        }  
    }
    lDest=lDest.substring(0,lDest.length-1);
    
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+MYville+', France&destinations='+lDest+'&sensor=false&key=AIzaSyCyFzoYxbS3G3dhPqXhdzgXAHA0mQKIFZ0',
      onload: function(response) {callprint(response, aDest);}
    });
  }
}

function callprint(responseJson, aDest){
  var response = JSON.parse(responseJson.responseText);
  console.log(response.status);
  if (response.status == "OK") { 
    console.log(response);
    var results = response.rows[0].elements;
    for (var j = 0; j < results.length; j++) // pour chaque résultat
    {
      var element = results[j];
      if (element.status=="OK") /* on exclu les 0 résults */
      {
        //distance
        var distance = element.distance.text;
        // durée
        var duration = element.duration.value   
        if (duration>3600) duration = Math.floor(duration/3600) + "h" + (duration % 60);else duration = Math.floor(duration/60) + "mn"    
        // et affichage     
        affich= distance + " (" + duration + ")";   
        var ville = aDest[j]; 
        $('[mydest='+ville+']').text(affich); // affichage
        $('.adbox:has([mydest='+ville+'])').attr("data-dist",element.distance.value); // dans la box globale
        $('[mydest='+ville+']').attr("dist",element.distance.value); // pour filtrer
        if (element.distance.value<15000) $('[mydest='+ville+']').css( "color", "#00CC00" );
        else if (element.distance.value<30000)$('[mydest='+ville+']').css( "color", "#660000" );
        else $('[mydest='+ville+']').css( "color", "red" );
        var distfiltre=MaxDistance*1000; 
        //filtre sur les annonces
        if ($("#myads-backup").length == 0) 
        {
          $('[mydest]').each(function(){
            var eledist=$(this).attr( "dist" );
            if ((eledist>distfiltre) && (distfiltre != 0)) $(this).parent().parent().parent().css("display","none");
            else $(this).parent().parent().parent().css("display","block");
          });
        }      
      }
    }
  }
}

//***** TRAITEMENT **********************//
initmenu(); // création du menu global
surcharge_page(); // ajout des surchages suivant la page

