// ==UserScript==
// @author      Pastek
// @name        Dealabs Site
// @namespace   dealabs-site
// @grant       none
// @description Dealabs - Apporte de nouvelles fonctionnalités sur le site
// @include     http://www.dealabs.com/*
// @exclude     http://www.dealabs.com/forum*
// @version     2.0.1
// ==/UserScript==


// ------- FONCTIONS POUR COOKIE ----------//
var COOKIE_NAME = "dealabs-custom";

function setCookie(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1)
    {
    c_start = c_value.indexOf(c_name + "=");
    }
  if (c_start == -1)
    {
    c_value = null;
    }
  else
    {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1)
    {
  c_end = c_value.length;
  }
  c_value = unescape(c_value.substring(c_start,c_end));
  }
  return c_value;
}
// --------------------------------------//


// ----- FONCTION COULEUR DES COMMENTAIRES ----- //
function getColorFromNbComm(varNbComm)
{
if(varNbComm == 0)
  return "#CCCCCC";
else if(varNbComm < 5)
  return "#00BBD4";
else if(varNbComm < 10)
  return "#0099D4";
else if(varNbComm < 20)
  return "#0033D4";
else if(varNbComm < 30)
  return "#5500D4";
else if(varNbComm >= 30)
  return "#D40000";
else
  return "#1F9CB3";
}


// ----------------------------------------------
// -- Position fixe pour les onglets de gauche --
// ----------------------------------------------
$(".tab_hot").css("position","fixed");


// -------------------------------------
// --- Recopie la pagination en haut ---
// -------------------------------------
// Pour les commentaires d'un deal
$("div.barre_page_deal").after($("div.next").clone());
// Pour la page des deals
$("div.bredcrumbs").after($("div.next").clone());

// ---------------------------------------------------
// -- Copie la barre de navigation en bas des deals --
// ---------------------------------------------------
$('div.barre_page_deal').eq(1).before($('div.chemin_detail').clone());
$('div.barre_page_deal').eq(1).before($('div.chemin_detail_triangle').clone());
$('div.barre_page_deal').eq(1).before($('div.chemin_detail_2').clone());
$('div.barre_page_deal').eq(1).before($('div.chemin_detail_triangle_2').clone());
$('div.barre_page_deal').eq(1).before($('div.main_shadow p').eq(1).clone());
$('div.barre_page_deal').eq(1).before('<p style="float:right; color:#999; padding:11px 20px 0 0;"><a href="#twitter_id_RSS">Haut de la page</a></p>');


// --------------------------------------------------
// ------- Suppression de la barre de partage -------
// --------------------------------------------------
$("div.contenar_bottom_index_deal").remove();
// ---> Décommentez la ligne ci-dessus si vous souhaiter supprimer
// --- la barre de partage des deals dans les listes
// --- gain de place si vous ne l'utilisez pas)


// --------------------------------------------------
// ----- Ouverture du panneau En direct du forum ----
// --------------------------------------------------
augmente_widget_forum();



// Affichage du nombre de commentaires
$("p.talkcommentaire").each(function(){
  var nombreComm = parseInt($(this).text());
  var largeur = (nombreComm < 150 ? 2*nombreComm+10 : 320);
  var couleur = getColorFromNbComm(nombreComm);
  
  $(this).css("text-align","center");
  $(this).css("padding","0");
  $(this).css("width",largeur+"px");
  $(this).css("background-color",couleur);
  $(this).next().css("color",couleur);
});





//------------------
// MODE MOSAIQUE
//------------------

// Récupération de l'option d'affichage 
var cookieValue = getCookie(COOKIE_NAME)
var isModeMosaiqueActif = false;
if(cookieValue == "mosaique:1")
{
  isModeMosaiqueActif = true;
}

// Enregistre le choix du type d'affichage
function setModeMosaiqueActif(isActif)
{
  var valueActif = 0;
  if(isActif)
  {
    valueActif = 1;
  }
  isModeMosaiqueActif = isActif;
  setCookie(COOKIE_NAME,"mosaique:"+valueActif,365);
}

// Ajout du bouton du mode mosaïque
$("#master_cat_4").after('<div id="master_cat_0" class="fond_tab" onmouseover="change_color(\'5\',\'E3AD27\',\'\');" onmouseout="change_grey_img(\'5\',\'f6f545\',\'onglet_perso_tab.png\');"><a href=""><div class="image_text_tab"><img id="image_color_0" src="http://img11.hostingpics.net/pics/423215mosaiqueoff.png" alt="Mosaique" width="25" height="25"></img><p>Mosaique</p></div></a></div>');

$("#master_cat_0").mouseover(function(){
  if(!isModeMosaiqueActif)
  {
    $("#image_color_0").attr("src","http://img11.hostingpics.net/pics/270941mosaiqueon.png");
    $(this).css("border-left","4px solid #E3AD27");
  }
});

$("#master_cat_0").mouseout(function(){
  if(!isModeMosaiqueActif)
  {
    $("#image_color_0").attr("src","http://img11.hostingpics.net/pics/423215mosaiqueoff.png");
    $(this).css("border-left","");
  }
});

// Corrige la barre blanche pour cacher l'ombre des onglets
$("div.tab_hot").append($(".tab_hot_right"));
$(".tab_hot_right").css("height","275px");
$(".tab_hot_right").css("margin-left","36px");

// Active le mode mosaïque si activé
if(isModeMosaiqueActif)
{
  enableMosaiqueView();
}


// Affiche la valeur à afficher pour la température du vote
function getDisplayDegre(texteDegre)
{
    var degre = texteDegre.trim();
    if(degre=="Nouveau")
      degre = "-";
    return degre;
}


// Active le mode mosaïque
function enableMosaiqueView()
{    

  // Bouton marqué comme activé
  $("#master_cat_0").removeAttr('onmouseout');
  $("#master_cat_0").removeAttr('onmouseover');
  $("#master_cat_0").removeClass("fond_tab");
  $("#master_cat_0").addClass("active_tab_hot");
  $("#master_cat_0").css("border-left","4px solid #E3AD27");
  $("#image_color_0").attr("src","http://img11.hostingpics.net/pics/270941mosaiqueon.png");
  
  // Pour chaque deal
  $("article.contenar").each(function(){
  
    // On n'affiche pas les deals désactivés
    if($(this).find("div.expirer_banniere_grey").parent().css("display") != "none")
    {
      $(this).remove();
      return;
    }
    
    // Bouton pour accéder aux commentaires en indiquant leur nombre
    var nbComm = parseInt($(this).find("p.talkcommentaire").text());
    var lienComm = $(this).find("p.talkcommentaire").parent().attr("href");
    var tooltipComm = "";
    if(nbComm == 0)
      tooltipComm = "R&eacute;digez le premier commentaire";
    else if(nbComm == 1)
      tooltipComm = "Voir le commentaire";
    else
      tooltipComm = "Voir les "+nbComm+" commentaires";
    $(this).find("a.voirledeal").eq(0).after('<a title="'+tooltipComm+'" class="voircomm" href="'+lienComm+'">'+nbComm+'</a>');
    $(this).find("a.voircomm").css("background-color",getColorFromNbComm(nbComm));
    // On supprime l'ancien lien commentaires
    $(this).find("div.product-detail").next().remove();
    
    // Bouton pour afficher la T° du deal
    var degre = getDisplayDegre($(this).find("div.conteneur_arrow_center").text());
    var couleurDegre = $(this).find("div.tube_essai_color").css("background-image");
    var lienDeal = $(this).find("div.contenar-heading a").eq(3).attr("href");
    $(this).find("a.voircomm").after('<a class="voirdegre" href="'+lienDeal+'">'+degre+'</a>');
    if(degre.charAt(0)=='-')
    {
      $(this).find("a.voirdegre").css("color","#148FA6");
      $(this).find("a.voirdegre").css("background-color","white");
    }
    else
    {
      $(this).find("a.voirdegre").css("background-image",couleurDegre);  
      $(this).find("a.voirdegre").css("color","white");  
    }
    
    // Style des descriptions
    $(this).find("div.product-detail").css("-moz-hyphens","auto");
    $(this).find("div.product-detail").css("-webkit-hyphens","auto");
      
    
    // Mise à jour de la température après un vote en détectant la modification de l'ancienne T°
    $(this).find("div.tempreche-time").bind('DOMNodeInserted DOMNodeRemoved', function(event) {
        $(this).parent().parent().parent().parent().parent().prev().find("a.voirdegre").text(getDisplayDegre($(this).text()));
    });
  });

  $("article.contenar").css("width","355px");
  $("article.contenar:nth-child(odd)").css("margin-right","8px");
  $(".contenar-heading").css("font-size","14px");
  $(".contenar-heading").css("line-height","19px");
  $(".contenar-heading div").css("width","287px");
  $("div.contenar_bottom_index_deal").remove(); // Barre de partage
  $("div.contenar-top2").css("height","61px");
  $("div.temprecher").next().remove(); // Suppression de l'auteur du deal ou du hot
  
  
  // Style des boutons DEAL-COMMENTAIRES-DEGRE
  $("a.voirledeal").text("DEAL"); // Bouton d'accès au deal
  $("a.voirledeal").css({
    "padding":"3px 5px",
    "margin":"1px 4px",
    "line-height":"8px",
    "width":"40px",
    "text-align":"center"
  });
  $("a.voircomm").css({
    "position":"absolute",
    "line-height":"8px",
    "color":"white",
    "border":"1px solid #000",
    "border-radius":"3px 3px 3px 3px",
    "width":"40px",
    "line-height":"8px",
    "margin":"20px 4px 1px 4px",
    "padding":"3px 5px",
    "text-align":"center",
    "font-weight":"normal"
  });
  $("a.voirdegre").css({
    "position":"absolute",
    "line-height":"8px",
    "border":"1px solid #000",
    "border-radius":"3px 3px 3px 3px",
    "width":"40px",
    "line-height":"8px",
    "margin":"39px 4px 1px 4px",
    "padding":"3px 5px",
    "text-align":"center",
    "font-weight":"bold"
  });
  // Hack pour Chrome...
  if(window.chrome)
  {
    $("a.voircomm").css("margin","20px 4px 1px 291px");
    $("a.voirdegre").css("margin","39px 4px 1px 291px");
  }
  
  // Style pour le tube des degrés et du vote
  $("div.conteneur_arrow_center").css("display","none");
  $("div.conteneur_arrow_up").css("margin","0 3px 0 0");
  $("div.arrow_bottom_grey").css("margin","0 3px 0 0");
  $("div.conteneur_arrow_up").css("height","auto");
  $("div.conteneur_arrow").css({
    "height":"auto",
    "width":"auto",
    "padding":"0",
    "margin-top":"116px",
    "position":"absolute"
  });
  $("div.arrow_bottom").css("margin","0");
  $("div.temprecher").css({
    "width":"auto",
    "margin-top":"5px"
  });
  $("div.temprecher").parent().css({
    "width":"59px",
    "margin":"6px 1px 0 0"
  });
  $("div.test_tube").css("margin-left","6px");
  
  // Style pour l'image + prix
  $("div.cost_index").prev().css("margin-left","13px");
  
  // Style pour la description
  $("div.product-detail").parent().css({
    "width":"166px",
    "margin-top":"0",
    "border-right":"1px solid rgb(220, 220, 220)"
  });
  $("div.product-detail").css({
    "width":"auto",
    "padding":"4px 3px 0 4px",
    "margin-bottom":"4px",
    "height":"152px",
    "overflow":"hidden"
  });
  $("div.product-detail p").css("font-size","11px");
  $("div.product-detail br").remove();
  $("div.voucher").remove(); // Code de réduc
  
  // Pour chaque bloc description de deal
  $("div.contenar-top2").each(function(){
     // Style pour l'image + prix
    $(this).next().children().eq(0).css("width","124px");
    // Suppression de l'auteur du deal ou du hot
    $(this).next().children().eq(2).children().eq(1).children().eq(0).remove();//css("display","none");
  });
  
  // Remplacement du libellé des dates trop long
  $("div.product-detail p b").each(function(){
    var texte = $(this).html();
    if(texte.indexOf("Date de d")>=0)
    {
      texte = texte.replace("Date de d","D");
    }
    else if(texte.indexOf("Date de f")>=0)
    {
      texte = texte.replace("Date de f","<br />F");
    }
    $(this).html(texte);  
  });  
}

$("#master_cat_0").click(function(){
  // Si le mode Mosaique est déjà activé on le désactive et on recharge la page
  if(isModeMosaiqueActif)
  {
    setModeMosaiqueActif(false);
    return true;
  }
  else
  {
    setModeMosaiqueActif(true);
    enableMosaiqueView();
    return false;
  }
});