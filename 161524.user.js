// ==UserScript==
// @name       ODP-Tweaks for BB
// @namespace  http://buzzer-manager.com/
// @version    0.2
// @description  Some enhancements BB for the ODP members
// @match      http://www.buzzerbeater.com/*
// @copyright  2013+, sailor_man
// ==/UserScript==

(function(d) {
    
    // cookies
    function setGMCookie(key, value){
        GM_setValue(key, value);
    }
    
    function getGMCookie(key, defaultValue){
        var gotValue;
        gotValue = GM_getValue(key, null);
        if(gotValue == null){
            setGMCookie(key, defaultValue);
            gotValue = defaultValue;
        }
        return gotValue;
    }
    
    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
    
        return vars;
    }
    
    function addButtons() {
        var forumtoolbar = d.getElementsByClassName('forumtoolbar')[0];
        if(forumtoolbar !== null) {
            
            var language = getGMCookie("odpMsgLanguage", "francais");
            var message = getGMCookie("odpMsgMessage", "detection");
            
            var odpNode = document.createElement("div");
            odpNode.innerHTML = "<select id=\"languageSelect\">" + 
                	"<option value=\"francais\" " + (language === "francais" ? "selected=true" : "") + ">Français</option>" +
                    "<option value=\"english\" " + (language === "english" ? "selected=true" : "") + ">English</option>" +
                                "</select>" + 
                                "&nbsp;" + 
                                "<select id=\"messageSelect\">" + 
                	"<option value=\"detection\" " + (message === "detection" ? "selected=true" : "") + ">Détection</option>" +
                    "<option value=\"caracteristiques\" " + (message === "caracteristiques" ? "selected=true" : "") + ">Réception des caractéristiques</option>" +
                    "<option value=\"regles\" " + (message === "regles" ? "selected=true" : "") + ">Règles sur l'entrainement</option>" +
                    "<option value=\"archivage\" " + (message === "archivage" ? "selected=true" : "") + ">Signaler un archivage</option>" +
                                "</select>" +
                                "&nbsp;" + 
                                "<input type=\"button\" value=\"Insérer Message\" id=\"addMsgOdpButton\" class=\"button\">";
            
            forumtoolbar.appendChild(odpNode);

            document.getElementById('addMsgOdpButton').addEventListener("click", writeMessageInTextEditor);
        }
    }
            
    function writeMessageInTextEditor() {        
        var textEditor = d.getElementById('ctl00_cphContent_tbMessage');
        var objectEditor = d.getElementById('ctl00_cphContent_tbSubject');
        if(textEditor !== null && objectEditor !== null) {
            var language = d.getElementById('languageSelect').value;
            var message = d.getElementById('messageSelect').value;
            
            setGMCookie("odpMsgLanguage", language);
            setGMCookie("odpMsgMessage", message);
            
            var playerID = decodeURIComponent(getUrlVars().player_id);
            var playerName = decodeURIComponent(getUrlVars().player);
            
            console.log(playerName);
            
            var object = "";
            var messageText = "";
            
            if(language === "francais") {
                if(message === "detection") {
                    object = 		"Veux-tu de l'aide de l'ODP ?";
                    messageText = 	"Bonjour,\n\n" + 
                                    "Ton joueur, " + playerName + " [player=" + playerID + "], possède un potentiel intéressant. " + 
                                    "Il a ainsi retenu l'attention de l'ODP, organisme chargé de repérer les futures stars françaises. " +
                                    "Pour bien évaluer ton joueur, nous aurions besoin de ses caractéristiques. " + 
                                    "Elles seront stockées sur notre base de données et accessibles uniquement par les membres " + 
                                    "de l'Organisme de Détection des Potentiels et le sélectionneur.\n\n" +
                                    "Tu peux aller lire notre charte sur notre forum : " +
                                    "http://odpfrance.forumactif.com/communiques-officiels-f3/la-fondation-de-l-odp-la-charte-t4.htm\n\n" +
                                    "Suivant ses caracs, il pourra faire l'objet d'un suivi personnalisé. " + 
                                    "Dans ce cas, un membre de l'ODP prendra contact avec toi afin, si tu le désires, " +
                                    "de te conseiller sur l'évolution de ton joueur et de transmettre ses progrès via la base de données de l'ODP. " + 
                                    "Tu peux bien évidemment cesser toute coopération avec l'ODP à tout moment ! " + 
                                    "Nous sommes là pour aider l'équipe de France mais nous ne voulons pas forcer la main des managers.\n\n" + 
                                    "Bonne continuation sur BB !";
                }
                else if(message === "caracteristiques") {
                    object = 		"ODP - " + playerName;
                    messageText = 	"Bonjour,\n\n" +
                                    "Grâce aux informations que tu nous a données sur " + playerName + " [player=" + playerID +
                                    "], nous avons pu constater qu'il avait un potentiel intéressant " + 
                                    "(attention la concurrence sera rude). Aussi, " + 
                                    "afin de mettre toutes les chances de notre côté en vue d'une possible sélection en Equipe de France dans quelques saisons, " + 
                                    "je serai ton interlocuteur au sein de l'ODP.\n\n" + 
                                    "Mon rôle est de te conseiller sur l'évolution de ton joueur et de transmettre ces progrès via la base de données de l'ODP. " + 
                                    "J'aurais donc besoin que tu me contactes lorsqu'un up intervient. " + 
                                    "Si tu oublies, je t'enverrai un mail de rappel toutes les 3 semaines environ. " + 
                                    "Cependant nous avons besoin d'un investissement réel de ta part pour une totale réussite. " + 
                                    "Tu peux bien évidemment cesser toute coopération avec l'ODP à tout moment ! " + 
                                    "Nous sommes là pour aider l'équipe de France mais nous ne voulons pas forcer la main des managers.\n\n" +
                                    "Quelle que soit ta décision, merci et bonne continuation sur BuzzerBeater !";
                }
                else if(message === "regles") {
                    object = 		"ODP - " + playerName;
                    messageText = 	"Nous allons mettre en place rapidement un plan d'entrainement personnalisé pour ton joueur. " +
                                    "Avant cela nous devons te poser certaines questions sur des règles importantes.\n\n" + 
                                    "1- Après lecture des règles sur les entrainements (http://www.buzzerbeater.com/community/rules.aspx?nav=Training), " + 
                                    "peux-tu m'expliquer ce que tu as compris ?\n\n" + 
                                    "2- Pour que ton joueur ait une chance d'évoluer un jour en EDF, " + 
                                    "il faut absolument mettre en place une formation monoposte afin d'optimiser l'entrainement. " + 
                                    "D'après toi qu'est ce qu'un entrainement monoposte ?\n\n" +
                                    "3- Quel est le niveau de ton entraineur ?\n\n" + 
                                    "4- Afin d'optimiser ton entrainement pour ton club, il te faudrait entrainer 2 autres joueurs. " + 
                                    "Peux tu me dire si tu as d'autres joueurs potentiellement entrainables " + 
                                    "(tu peux m'envoyer les caracs mais ce n'est pas une obligation) ?\n\n" +
                                    "Si tu as des questions, n'hésite pas à les poser mais surtout réponds moi pour que je sache " + 
                                    "si tu as bien compris les fondamentaux du jeu ";
                }
                else if(message === "archivage") {
                    object = 		"ODP - " + playerName;
                    messageText = 	"Actuellement ton joueur est légèrement en retard par rapport aux meilleurs de son âge.\n\n" +
                                    "Nous te conseillons de poursuivre son entrainement et nous reprendrons contact avec toi en " + 
                                    "fin de saison pour connaitre son évolution.\n\n" + 
                                    "Tu peux également venir poser des questions sur notre forum, nous y répondrons avec plaisir.\n\n" + 
                                    "http://odpfrance.forumactif.com";
                }
            }
            else if(language === "english") {
                if(message === "detection") {
                    object = 		"Do you want help from the ODP ?";
                    messageText = 	"Hi!\n\n" +
                                    "Your player " + playerName + " [player=" + playerID + "] has an interesting potential. " + 
                                    "Then he caught all the attention of the ODP, organism in charge of the scouting of French rising stars. " + 
                                    "To evaluate your player to its real value, we need his skills. " + 
                                    "They will be stored in our private database in which only ODP members and NT coaches have an access.\n\n" +
                                    "According to his original skills, he may be a target of our personalized scouting. " + 
                                    "In that case, one of the ODP's member will get in touch with you, and if you need it, " + 
                                    "he'll give you pieces of advice about an optimal training, he'll update every evolution about your player in the database. " + 
                                    "Of course, you can refuse to work with us if you don't want to, and that whenever you want. " + 
                                    "Our purpose is to help the French team in the best way we are able to. Thus we never force managers.\n\n" +
                                    "Best regards, have fun on BB!";
                }
                else if(message === "caracteristiques") {
                    object = 		"ODP - " + playerName;
                    messageText = 	"Hi,\n\n" + 
                                    "Thanks for the information you gave us about " + playerName + " [player=" + playerID +
                                    "]. We realized that he has a good potential (nevertheless there is a tough competition). " + 
                                    "Then, in order to give us the best chance to make your player an U21 player, I'm gonna be your scout, and your ODP partner.\n\n" +
                                    "As I say previously, my role is to assist you in the training of your player and forward it into the database. " + 
                                    "So, I need you to keep me posted when there is any improvement in your player skills. " + 
                                    "If you forget, I'll send you a mail approximately every 3 weeks. However we need a real investment " + 
                                    "on your part for a total success.\n\n" +
                                    "Whatever your decision is, thank you, and have fun on BuzzerBeater!";
                }
                else if(message === "regles") {
                    object = 		"ODP - " + playerName;
                    messageText = 	"We're about to make a trainning plan for your player. But before I need to ask you some important things :\n\n" + 
                                    "1- After reading the training rules (http://www.buzzerbeater.com/community/rules.aspx?nav=Training), " + 
                                    "can you tell me what you understand from it?\n\n" +
                                    "2- In order to make your player become an NT player, we absolutely need you to do a mono-training. " + 
                                    "Then, do you know what mono-training is?\n\n" +
                                    "3- What is the level of your Trainer?\n\n" + 
                                    "4- In order to make the training more efficient for your team, you'll need to train 2 other players. " + 
                                    "Can you tell me if you have other players who could be trained in the mean time? " + 
                                    "(You can send me their skills, but nothing compulsory).\n\n" + 
                                    "If you have any questions, do not mind to ask me. But I really need you to answer those questions " + 
                                    "to know if you've understood the basics of the training system.";
                }
                else if(message === "archivage") {
                    object = 		"ODP - " + playerName;
                    messageText = 	"Your player is currently late in his training, and there are better players for the same age.\n\n" +
                        			"We suggest you to continue his training and we will contact you at the end of the season to check its evolution.\n\n" +
                                	"Please come on our private forum if you have any question. It'll be a pleasure to answer to them.\n\n" +
                                	"http://odpfrance.forumactif.com ";
                }
            }
            
            objectEditor.value = object;
            textEditor.value = messageText;
        }
    }
    
    var bb_page_href = window.location.href;
    
    if(bb_page_href.match(/\/bbmail\.aspx/)) {
    	addButtons(); 
    }
    else if(bb_page_href.match(/\/overview\.aspx/)) {
        if(getUrlVars().send_msg == 1) {
            var player = getUrlVars().player;
            var playerId = getUrlVars().player_id;
            var url = d.getElementById('ctl00_cphContent_SubMenu_Label3').parentNode.href;
            url = url + '&player_id=' + playerId;
            url = url + '&player=' + player;
            window.location.href = url;
        }
    }
    
})(document);