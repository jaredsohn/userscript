// ==UserScript==
// @author      Pastek
// @name        Dealabs Forum - Marquer tout le forum en lu
// @namespace   dealabs-forum-toutlu.js
// @grant       none
// @description Marquer comme lu l'intégralité du forum et recopie le lien Retour au site en bas de page
// @include     http://www.dealabs.com/forum.html
// @version     1.1.0
// ==/UserScript==


// Ajout du bouton Marquer comme lu
$("div.tab2 a").css('margin-left','100px');
$("div.tab2 a").after('<a href="" class="tab_header_4 marquer_tout_lu" style="margin-top:25px;margin-left:20px;width:170px;">TOUT MARQUER LU</a>');

// Recopie les boutons en bas de page
$('div.main_shadow').after($('div.tab2').clone());
$('div.tab2').last().css("margin", "0 auto");
$('div.tab2').last().css("width", "600px");

// Supprime les boutons de nouveaux messages pour la catégorie dont le numéro est donné
function markAsRead(categoryNumber)
{
  $("div.master_cat_forum").eq(categoryNumber).nextUntil("p","div.contenar_forum").each(function(){
    $(this).children("div:first").children("a").children("div").children("img").remove();
  });
}

// Au clic sur le bouton Marquer comme lu
$(document).ready(function(){
  $('a.marquer_tout_lu').each(function(){
    $(this).click(function(){
      $.post("/forum/read-all-forum", $("#categorie_toutlu_1").serialize(),function () {
          markAsRead(0);
      });
      $.post("/forum/read-all-forum", $("#categorie_toutlu_2").serialize(),function () {
          markAsRead(1);
      });
      $.post("/forum/read-all-forum", $("#categorie_toutlu_3").serialize(),function () {
          markAsRead(2);
      });
    // Empêche le changement de page
    return false;
    });
  });
});