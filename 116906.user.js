// ==UserScript==
// @name           zChangeLog
// @description    Vous permet de maintenir un changelog dans vos propres topics et messages sur le SdZ.
// @namespace      http://www.siteduzero.com/
// @include        http://www.siteduzero.com/forum-87-*.html
// @include        http://www.siteduzero.com/forum-85-*.html
// @copyright      Romain Porte (MicroJoe)
// @version        1.0.1
// @license        GPL v3 http://www.gnu.org/licenses/gpl.html
// ==/UserScript==

(function(){

// == FONCTIONS
// Formatte le paramètre en deux digits et le retourne
function digits(str)
{
    return str >= 10 ? str : '0' + str;
}

// Ajoute les éléments dans la page
function createElements()
{
    // Création du champ
    signatureElement = document.getElementById('sig');

    changelogElement = document.createElement('span');
    changelogElement.innerHTML = '<br /><br /><label class="label_cote" for="zchangelog_text">Message de commit : </label><input type="text" name="zchangelog_text" size="35" maxlength="60"/>';

    signatureElement.parentNode.insertBefore(changelogElement, signatureElement.nextSibling);
    
    // Ajout de l'eventListenner qui appelle la fonction processCommit lors de l'envoi du formulaire
    formElement = document.getElementById('texte').form;
    formElement.addEventListener('submit', processCommit, false);
}

// Parse le message de commit en zCode et l'ajoute au message
function processCommit()
{
    var commitElement = document.getElementsByName('zchangelog_text')[0];
    
    if(commitElement.value != '')
    {
        // Génération de la date (les ternaires sont là pour rajouter des zéros devant le nombre du jour et du mois au besoin)
        var date = new Date();
        var date_str = digits(date.getDate()) + '/' + digits(date.getMonth()) + '/' + date.getFullYear() + ' à ' + digits(date.getHours()) + ':' + digits(date.getMinutes());
        
        // Génération du message de commit à rajouter
        var commitMessage = '\n<taille valeur="tpetit">Édité le ' + date_str + ' : <italique>' + commitElement.value + '</italique></taille>';
        
        // Ecriture du message à la fin du topic
        var contentElement = document.getElementById('texte');
        contentElement.value += commitMessage;
    }
}

// == MAIN
createElements();

})();