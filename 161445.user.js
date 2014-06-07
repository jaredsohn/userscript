// ==UserScript==
// @name       BBF-Admin for BB
// @namespace  http://buzzer-manager.com/
// @version    0.2
// @description  Some enhancements BB for the BuzzerBeaterFrance admins
// @match      http://www.buzzerbeater.com/community/bbmail.aspx*
// @copyright  2012+, sailor_man
// ==/UserScript==

(function(d) {
    
    function addButtons() {
        var forumtoolbar = d.getElementsByClassName('forumtoolbar')[0];
        if(forumtoolbar !== null) {
            forumtoolbar.innerHTML = forumtoolbar.innerHTML +
                '&nbsp;&nbsp;';
            forumtoolbar.innerHTML = forumtoolbar.innerHTML +
                '<img src="http://www.buzzer-manager.com/api/bbf.gif" id="addMsgButton" style="cursor:pointer">';
            
            d.getElementById('addMsgButton').addEventListener("click", writeValidationMessageInTextEditor);
        }
    }
    
    function getManagerName() {
        return d.getElementById('ctl00_cphContent_tbTo').value;
    }
            
    function writeValidationMessageInTextEditor() {
        var textEditor = d.getElementById('ctl00_cphContent_tbMessage');
        if(textEditor !== null) {
            if(getManagerName().length > 0) 
                var newManagerName = " " + getManagerName();
            else 
                var newManagerName = ""
            textEditor.value = "Bonjour" + newManagerName + "," + 
        				"\n\n" +
                        "Concernant ton inscription sur le forum BBF, " + 
                        "nous t'envoyons ce BB mail afin de vérifier que tu es bien la personne qui s'est inscrite sur notre forum.\n\n" +
                        "Pour terminer la procédure, il te suffit à présent de répondre à ce BB Mail, " + 
                        "et dès que nous recevrons ta réponse, ton compte sera validé sur le forum BBF !\n\n" + 
                        "Cordialement\n" + 
                        "Le staff BBF";
        }
        var objectEditor = d.getElementById('ctl00_cphContent_tbSubject');
        if(objectEditor !== null) {
            objectEditor.value = "Validation de ton inscription sur le forum BBF";
        }
    }
    
    addButtons();
    
})(document);