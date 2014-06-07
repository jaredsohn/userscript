(function() {

// ==UserScript==
// @name          AjoutPaysTeleservice
// @namespace     http://localhost.localdomain
// @icon          http://www.gizmodo.fr/wp-content/uploads/2011/09/masque-anonymous.jpg
// @description   Ajoute une ligne CSV dans les champs du formulaire d'ajout d'une donnée dans une nomenclature
// @copyright     2012+, Budzi
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.1
//
// @include   http://www.iana.org/domains/example/
// @include   http://www.example.com/*
// @include   http://www.example.net/*
// @include   https://teleservices-preprod.poitou-charentes.fr/ltsub_crpc/pages/referentiel/referentiel-referentiel-valeur-modifier.sub?cid=241
//
// @exclude   https://example.com/*
// @exclude   https://example.net/*
// @exclude   https://example.org/*
//
// @require https://secure.dune.net/usocheckup/13701.js?method=update&open=window&maxage=1&custom=yes&id=usoCheckup
// @require https://userscripts.org/scripts/source/61794.user.js
//
// ==/UserScript==	
	/**
	 * Inject Prototype and Scriptaculous libraries.
	 */
console.log("ok1");
var scriptTags = document.getElementsByTagName('script');  
var addPrototype = true;  
var addScriptaculous = true;  
  
//Loop over all script tags in the page header  
//and check to see if Prototype or Scriptaculous are already being included  
for(i in scriptTags) {  
    if( scriptTags[i].src.match(/prototype.*?\.js/) ) {  
        addPrototype = false;  
    }  
    if( scriptTags[i].src.match(/scriptaculous.*?\.js/) ) {  
        addScriptaculous = false;  
    }  
}  
  console.log("ok2");
var scripts = [];  
var idx = 0;  
if(addPrototype) {  
    scripts[idx] = 'http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.3/prototype.js';  
    idx++  
}  
if(addScriptaculous) {  
    scripts[idx] = 'http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.2/scriptaculous.js';  
    idx++  
}  
  
//Add any missing script tags to the page header  
for (i in scripts) {  
    var script = document.createElement('script');  
    script.src = scripts[i];  
    document.getElementsByTagName('head')[0].appendChild(script);  
}  
  console.log("ok3");
//Handler for the window load event  
window.addEventListener('load', function(event) {  
    //Get handles to the Prototype and Scriptaculous functions we're going to use  
    $ = unsafeWindow['window'].$; 
    $$ = unsafeWindow['window'].$$; 
    Effect = unsafeWindow['window'].Effect; 
 
    $$('img').each( function(elem) { 
        Effect.Shake(elem); 
        elem.setStyle( {border:  '3px dotted red'}); 
    }); 
}, 'false');
	/**
	 * Traitements
	 */
        showInputCSV();
	console.log('Script lancé!');
	//Ajout evenement click sur id : addOrUpdateReferentielValeurLink__link	 
	$('addOrUpdateReferentielValeurLink__link').observe('click',showInputCSV);
	//Ajout fonction affichage input text
	function showInputCSV(){
            console.log("myinput");
            $('addOrUpdateReferentielValeurLink__link').hide();
        }
	//ajout fonction remplissage form Pays
	
	
	/*window.addEventListener('load', function(event) {
	 
	    // Grab a reference to the Effect object which was loaded by the scriptaculous library earlier.
	    Effect = unsafeWindow['Effect'];
	 
	    // Add a shake effect to the header bar when clicked.
	    var div = document.getElementById('p-logo');
	    var h1 = div.getElementsByTagName('h1')[0];
	    h1.id = 'p-logo-h1';
	    h1.addEventListener('click', function(event) {
	        Effect.Shake(h1.id);
	    }, 'false');
	 
	}, 'false');*/
	console.log("ok5");
})();