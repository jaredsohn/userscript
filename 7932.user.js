// sur voyages-sncf, après avoir choisi son trajet, et les diffèrentes options,
// un écran de publicité apparaît pendant une ? six secondes. 
//
// Ce script greasemonkey supprime cette publicité, et fait donc gagner du
// temps lors de la consultation des horaires de train, et de l'achat d'un
// billet
//
// auteur: arno. <arno.@no-log.org>
//
// ==UserScript==
// @name        voyages-sncf-skipadvertising
// @namespace   arno.fdn.fr  
// @description supprime le délai entre le choix d'un trajet et les résultats sur voyages-sncf
// @include     http://www.voyages-sncf.com/dynamic/_SvTermCommVoySaisieAttente*
// @include     http://www.voyages-sncf.com/dynamic/_SvTermConsHorSaisieAttente*
// ==/UserScript==

function skipAdvertising() {
    // at page load, timeout is set and function sendValidationCommand is called after one second
    var validationFunction = unsafeWindow.sendValidationCommand;
    // there are two types of action. 
    // 
    // either another timeout of 5 secondes is set to a function that 
    // will modify location.href. In that case, we set timeOut to 0 and call sendValidationCommand
    //
    // either an hidden form is submitted. In that case, we submit it without timeout

    if (typeof validationFunction == "function") {
        var timeOutRe = /(setTimeout\([^,]+),[^)]+\)/;
        if (validationFunction.toString().match(timeOutRe)) {
            eval(validationFunction.toString().replace(timeOutRe, "$1, 0)", "m"))
            sendValidationCommand();
        } else {
            var saisie = document.getElementById("saisie");
            if (saisie) {
                saisie.wrappedJSObject.submit(); // cannot submit directly with xpcnativewrapper
            }
        }
    }
}
skipAdvertising();
