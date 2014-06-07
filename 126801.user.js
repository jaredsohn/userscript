// ==UserScript==
// @name        TheWest-TWProCloth [SOM]
// @description TheWest-TWProCloth [SOM - Scripts-O-Maniacs]
// @author      Danosaure
// @namespace   http://scripts-o-maniacs.leforum.eu/
// @include     http://*.the-west.*/game.php*
// @include     http://userscripts.org/scripts/review/126801*
// @include     http://userscripts.org/scripts/source/126801.meta.js*
// @version     0.0.1
// @copyright   2011, Danosaure (http://scripts-o-maniacs.leforum.eu/)
// @website     http://scripts-o-maniacs.leforum.eu
// @licence     (CC); http://creativecommons.org/licenses/by-nc/2.0/fr/
//
// @history     0.0.1|2012.02.25  First import to get the script number.
// ==/UserScript==
//
// $Revision: 133 $
// $Date:: 2012-02-25 18:45:51 #$
// Numéros du script: prod:126801
//

if ((window.location.href.indexOf(".the-west.") != - 1)
        && (window.location.href.indexOf("game.php") != - 1)) {
    //Cas du script exécuté dans le jeu (ou exclusiment fenêtre principale : "game.php#")

    (
        // Création d'une fonction globale pour tout le script
        function(f) {
            var s = document.createElement('script');
            s.type = 'application/javascript';
            s.textContent = '(' + f.toString() + ')()';
            (document.body || document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s)
        }
    )(
        function() {
            var programme_principal = function() {
              // Validate SOM-CommonTools
              if (undefined == SOM) {
                  var _lien = function() {
                      try {
                          var _nav = navigator.userAgent.toLowerCase();
                          if ((_nav.indexOf('chrome') == -1) && (_nav.indexOf('safari') != -1)) {
                              window.open('http://userscripts.org/scripts/show/120825');
                          } else {
                              location.href = 'http://userscripts.org/scripts/source/120825.user.js';
                          }
                      } catch(e) {
                      }
                  };

                  var contenu = ''
                          + '<div>'
                          + '<p>This script requires:</p>'
                          + '<p style="text-align:center; font-weight:bold;"><b>The West - Common tools [SOM]</b></p>'
                          + '<p>Install?</p>'
                          + '</div>';

                  showMessage(contenu, "SOM-Tools Missing", 500, undefined, [['Yes', _lien], ['No']], true);
                  return;
              }

              if (undefined != SOM.TWProCloth) {
                  new HumanMessage("TWProCloth: Loading conflict. Disable other versions of this script.");
                  return;
              }

              SOM.TWProCloth = Object();

              SOM.TWProCloth.VERSION = '0.0.1';
              SOM.TWProCloth.NUMERO_SCRIPT = '126801';

              SOM.Tools.mettre_a_jour(SOM.TWProCloth.VERSION, SOM.TWProCloth.NUMERO_SCRIPT);
            }

            try {
                window.addEvent('domready', programme_principal);
            } catch(e) {
                alert("SOM-TWProCloth: " + e)
            }
        }
    )
} else {
    // Cas du script exécuté dans l'iframe pour la mise à jour
    (
        function(f) {
            var s = document.createElement("script");
            s.type = "application/javascript";
            s.textContent = "(" + f.toString() + ")()";
            (document.body || document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s)
        }
    )(
        function() {
            var NUMERO_SCRIPT = "126801";
            var destination = window.parent;
            message = String(escape(document.body.textContent));

            //Indiquer le n° du script pour identifier la communication
            if (destination.postMessage) {
                destination.postMessage(NUMERO_SCRIPT + message, '*');
            }
        }
    )
}

