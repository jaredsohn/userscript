// ==UserScript==
// @name       BBF-Admin
// @namespace  http://buzzer-manager.com/
// @version    0.7
// @description  Some enhancements for the BuzzerBeaterFrance forum
// @match      http://buzzerbeaterfrance.forumpro.fr/*
// @copyright  2012+, sailor_man
// ==/UserScript==

(function(d) {
    
    function addButtons() {
        if(d.getElementById('textarea_content') !== null) {
            var textArea = d.getElementById('textarea_content').nextSibling;
            var submitButtons = d.getElementsByClassName('submit-buttons')[0];
            var buttons = undefined;
            if(textArea !== null) {
                buttons = textArea;
            }
            else if(submitButtons !== undefined) {
                buttons = submitButtons;
            }
                
                if(buttons !== undefined) {
                    buttons.innerHTML = '<input type="button" id="validationButton" class="button2" value="Validation">&nbsp;' + buttons.innerHTML;
                    buttons.innerHTML = '<input type="button" id="welcomeButton" class="button2" value="Bienvenue">&nbsp;' + buttons.innerHTML;
                    
                    d.getElementById('validationButton').addEventListener("click", writeValidationMessageInTextEditor);
                    d.getElementById('welcomeButton').addEventListener("click", writeWelcomeMessageInTextEditor);
                }
        }
    }
    
    function getManagerName(node) {
        if(node === null)
            return "";
        
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            
            if(child.nodeName === "STRONG") {
                if(child.childNodes[0].nodeName === "#text") {                	
                	return child.innerHTML;
            	}
            }
            
            var managerName = getManagerName(child);
            if(managerName != "")
               return managerName;
        }
        
        return "";
    }
            
    function writeValidationMessageInTextEditor() {
        var textEditor = document.getElementsByTagName('iframe')[document.getElementsByTagName('iframe').length - 1].
        			contentDocument.getElementsByTagName('p')[0];
        if(textEditor !== undefined) {
            if(document.getElementsByClassName('postprofile').length > 0) 
                var newManagerName = " " + getManagerName(document.getElementsByClassName('postprofile')[0]);
            else 
                var newManagerName = ""
                
            textEditor.innerHTML = "Bonjour" + newManagerName + "," + 
        				"<br><br>" +
                        "Bienvenue sur BBF ! " + 
                		'<img src="http://illiweb.com/fa//i/smiles/icon_smile.gif" data-sceditor-emoticon=":)" alt=":)" title=":)"><br><br>' +
                        "Un BB mail vient de t'être envoyé afin de confirmer ton inscription, " + 
                        "merci de répondre à son expéditeur. Ton compte sur ce forum sera alors validé, " + 
                        "et tu auras accès à toutes les rubriques.<br><br>" +
                        "Cordialement<br>" + 
                        "Le staff BBF";
        }
    }
    
    function writeWelcomeMessageInTextEditor() {
        var textEditor = document.getElementsByTagName('iframe')[document.getElementsByTagName('iframe').length - 1].
        			contentDocument.getElementsByTagName('p')[0];
        if(textEditor !== undefined) {
            textEditor.innerHTML = '<img src="http://r24.imgfast.net/users/2414/35/32/27/smiles/547827.gif" data-sceditor-emoticon=":welcome:" alt=":welcome:" title=":welcome:"><br><br>' + 
        				"Tu peux trouver des guides ici --> " + 
            			'<a href="http://buzzerbeaterfrance.forumpro.fr/bbf-guide-f23/">GUIDES</a><br><br>' +
        				"Si tu as besoin d'un tuteur c'est là --> " + 
                        '<a href="http://buzzerbeaterfrance.forumpro.fr/inscriptions-apprentis-f43/">TUTORAT</a><br><br>' +
                		"Si tu as un super joueur ou " + 
                        '<a href="http://odp.buzzer-manager.com/index.php?p=minimas/">un bon jeune français</a>, ' + 
                        "regarde les minimas et propose le pour l'Equipe de France --> " + 
                        '<a href="http://buzzerbeaterfrance.forumpro.fr/c13-formation/">PROPOSE TON JOUEUR</a><br><br>' +
                        "Sinon, pose des " + 
                		'<a href="http://buzzerbeaterfrance.forumpro.fr/bbf-questions-reponses-f7/">QUESTIONS</a>, ' +
                        "viens boire un coup au " +
                        '<a href="http://buzzerbeaterfrance.forumpro.fr/le-bar-f6/">BAR</a>, ' +     
                        "découvre par toi même ce beau forum. Et n'oublie pas qu'il y a une fonction " + 
                        '<a href="http://buzzerbeaterfrance.forumpro.fr/search.forum">RECHERCHER</a><br><br><br>' +
               			"Tu peux t'aider de www.buzzer-manager.com pour gravir les échelons vers la Pro A.";
        }
    }
    
    addButtons();
    
})(document);