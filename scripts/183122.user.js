// ==UserScript==
// @name       megar_nolifeonline_extensions
// @id         megar_nolifeonline_extensions-eac1d65f-47d6-4042-ada5-08a28e1f558d@niki
// @namespace  megar-nolife
// @version    1.02
// @description  Toggler vu/non-vu: touche V; Voir une vidéo en fulltab: touche F
// @include    http://online.nolife-tv.com/*
// @licence    MIT
// @run-at     document-end
// @updateURL  https://userscripts.org/scripts/source/183122.user.js
// ==/UserScript==

var megar_nolifeonline_extensions = {
  toggle_fulltab_video: (function(){
	var h1=null;
      
    var keyupHandler = function(e) {
      if (e.altKey || e.ctrlKey) { return; }    // n'intercepte pas les combinaisons de touches
      if (70 !== e.keyCode) { return; }         // n'intercepte que la touche 'f'
      toggleFulltab();
    };

    var toggleFulltab = function() {
      var alreadyLoaded = document.getElementById("no-fullframe");

      if (alreadyLoaded) {
        /* supprime le <style> injecté */
        alreadyLoaded.parentNode.removeChild(alreadyLoaded);
      } else {
        /* ajoute la classe .erreur_playlistCtn au conteneur de #erreur_playlist (il contient style:width:1000px) */
        var errplayctn = document.getElementById("erreur_playlist").parentNode;
        var errplayctnCls = errplayctn.getAttribute("class");
        if (!errplayctnCls) { errplayctnCls = "" }
        if (errplayctnCls.indexOf("erreur_playlistCtn") == -1) {
          errplayctn.setAttribute("class", errplayctnCls + " erreur_playlistCtn");
        }

        /* injecte un <style id="no-fullframe"> le ID permet de l'enlever à la prochaine exécution */
        var style = document.createElement("style");
        style.setAttribute("id", "no-fullframe");
        var css =
        "\
          body {min-width:0;}\
          #footer, #header, #main_menu, #options, #user, #ariane, #tabs, #top_infos_emission, #bottom_infos_emission, .erreur_playlistCtn { display:none }\
          .content {width:auto;}\
          #player { position:absolute ; top:0 ; left:0 ; width:100% ; height:100% ; margin:0 ; z-index:100 ; }\
        ";
        style.appendChild(document.createTextNode(css));
        var head = document.getElementsByTagName("head");
        head[0].appendChild(style);
      }
    };

    var public = function(){};

    public.enable = function() {
      h1 = jQuery(window).keyup(keyupHandler);
      console.log("Fulltab video mode installé. Pour passer du mode normal au mode fulltab, et vice-versa, appuyez la touche F.");
    };

    public.disable = function() {
      if (null !== h1) {
        h1.unbind();
        console.log("Fulltab video mode désinstallé.");
      }
    };


    return public;
  })(),


  toggle_seen_flag: (function(){

    var hoverId = null;
    var h1=null, h2=null, h3=null;

    var mouseenterHandler = function(e){
      var li = jQuery(e.currentTarget);
      var i = li.attr("class");      // "id-41527 bg-abo leveltype-100"
      i = i.split(" ");              // ["id-41527", "bg-abo", "leveltype-100"]

      var id = null;
      jQuery.each(i, function(index, className) {
        var m = className.match(/^id-([0-9]+)$/);
        if (m) {
          id = m[1];              // récupère le numéro après "id-"
        }
      });
      if (null === id) { return; }
      hoverId = id;
    };

    var mouseleaveHandler = function(e) {
      hoverId = null;
    };

    var keyupHandler = function(e) {
      if (null === hoverId) { return; }         // n'intercepte que quand la souris est sur une emission
      if (e.altKey || e.ctrlKey) { return; }    // n'intercepte pas les combinaisons de touches
      if (86 !== e.keyCode) { return; }         // n'intercepte que la touche 'v'
      toggleSeen(hoverId);
     };

    var toggleSeen = function(id_switch_read) {
      var toggleSeenSuccess = function(retour_sw) {
        // provient de http://online.nolife-tv.com/cdata/js/nolife.js au 2013-11-16
        var $ = jQuery;
        if(retour_sw == 1) {
          $('.id-'+id_switch_read+' div.info-check').html('<span class="ui-icon ui-icon-check info-check" title="Émission vu" style="float:right;"></span>');
          $('.id-'+id_switch_read+' .tooltip .border-bottom').last().after('<p class="info-check"><span class="ui-icon ui-icon-check" style="float:left;"></span> Émission vu</p>');
          $('.id-'+id_switch_read+' .switch-read span.text-check').html("Marquer comme non vu");
        } else if(retour_sw == 2) {
          $('.id-'+id_switch_read+' div.info-check span.info-check').remove();
          $('.id-'+id_switch_read+' .tooltip p.info-check').remove();
          $('.id-'+id_switch_read+' .switch-read span.text-check').html("Marquer comme vu");
        }
      };

      jQuery.post(
        "http://online.nolife-tv.com/do.php",
        {a:'sr', em:id_switch_read},
        toggleSeenSuccess
      );
    };



    var public = function(){};

    public.enable = function() {
      // surveille .liste_emissions plutôt que #emissions .data_emissions ul, parce que le changement de passe détruit/recrée #emissions
      // surveille aussi #suggestions
      h1 = jQuery(".liste_emissions, #suggestions").delegate("li", "mouseenter", mouseenterHandler);
      h2 = jQuery(".liste_emissions, #suggestions").delegate("li", "mouseleave", mouseleaveHandler);
      h3 = jQuery(window).keyup(keyupHandler);
      console.log("Toggleseen installé. Changer l'état vu/non-vu en survolant une émission et en appuyant la touche V.");
    };

    public.disable = function() {
      if (null !== h1) {
        h1.unbind();
        h2.unbind();
        h3.unbind();
        console.log("Toggleseen désinstallé.");
      }
    };

    return public;
  })()
};

if (window.jQuery === undefined) { var jQuery = unsafeWindow.jQuery; }
megar_nolifeonline_extensions.toggle_fulltab_video.enable();
megar_nolifeonline_extensions.toggle_seen_flag.enable();
