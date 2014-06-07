// ==UserScript==
// @author      Pastek
// @name        Dealabs Forum - Barre navigation
// @namespace   dealabs-forum-barre-nav.js
// @grant       none
// @description Répète la barre de navigation en bas des pages du forum et la pagination en haut
// @include     http://www.dealabs.com/forums/*
// @version     1.2.0
// ==/UserScript==

// Récupère un paramètre GET
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}


// -----------------------------------------
// -- Copie la barre de navigation en bas --
// -----------------------------------------
$('div.barre_page_deal').eq(1).before($('div.chemin_detail').clone());
$('div.barre_page_deal').eq(1).before($('div.chemin_detail_triangle').clone());
$('div.barre_page_deal').eq(1).before($('div.chemin_detail_2').clone());
$('div.barre_page_deal').eq(1).before($('div.chemin_detail_triangle_2').clone());
$('div.barre_page_deal').eq(1).before($('div.main_shadow p').eq(1).clone());
// ----------------------------------



// ---------------------------------
// -- Copie la pagination en haut --
// ---------------------------------
$('div.mid-area-left_deal_detail').eq(0).before($('div.next').clone());
// ----------------------------------


// -------------------------------------
// -- Liste déroulante pour les pages --
// -------------------------------------

// Récupère le numéro de la page courante
var currentPage = getURLParameter("page");
if(currentPage == null)
  currentPage = 1;
  
// Récupère le numéro de la dernière page
var maxPage = $('div.next a:eq(' + ($('div.next a').length - 3) + ')').text();
  
// Construit la liste déroulante
var liste = '<select id="listePages" style="margin-right:10px;">';
for(i=1;i<=maxPage;i++)
{
  liste += "<option value="+i;
  if(currentPage == i)
    liste += ' selected="selected"';
  liste += ">Page n&deg;"+i+"</option>";
}
liste += "</select>";

// Ajoute la liste déroulante pour choisir la page
$('div.next').eq(0).children(":first").before(liste);


// Change de page suivant le numéro donné
$("#listePages").change(function () {
  document.location.href = document.location.href.replace("page="+currentPage,"page="+ $("#listePages option:selected").val()).replace("#discussed","");
});

// ----------------------------------


// ------------------------------------------------
// -- Recopie le bouton de retour au site en bas --
// ------------------------------------------------

$('div.main_shadow').after($('div.tab2').clone());
$('div.tab2').last().css("margin", "0 auto");
$('div.tab2').last().css("width", "600px");
