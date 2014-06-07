// ==UserScript==
// @name        La Guerre Des Fans - Reloaded
// @namespace   lgdf-r
// @description Soutenez votre membre favori sur le Site du Zero !
// @author      Marvin Roger (nivramdu94)
// @include     http://www.siteduzero.com/*
// @version     0.9

// @downloadURL http://userscripts.org/scripts/source/140287.user.js
// @updateURL   http://userscripts.org/scripts/source/140287.meta.js

// @run-at      document-end
// ==/UserScript==

//Point d'entrée du javascript, sans celui ci le parseur bug
var main = function() {
}

//Début de l'UserScript en lui-même
var UserScript = function() {

    /*************** Constantes UI ***************/
    
    //Definit la position de la boite ou est affichee le membre que supporte l'utilisateur
    const POSITION_TOP = 1; //Au dessus de la citation du membre
    const POSITION_SIGNATURE = 2; //Au milieu (en haut) de la signature
    
    //Definit le texte qui doit etre affichee dans la boite
    const LEGEND_SOUTIEN = 1; //(Ce membre soutient %pseudo%.)
    const LEGEND_TROUE = 2; //(%pseudo% troue fane.)
    const LEGEND_LOVE = 3; //(%pseudo% <3)
    const LEGEND_VAINCRA = 4; //(%pseudo% vaincra !)
    const LEGEND_UTILISATEUR = 5; //(phrase mise en place par l'utilisateur dans sa signature)
    
    //Definit la methode qu'utilise LGDF dans la signature
    const METHOD_LINK = 1; //Affiche un lien
    const METHOD_PIXEL = 2; //Affiche un pixel non visible
    
    /** Constantes qui définissent les paramètres par défaut **/
    
    const DEFAULT_POSITION = 1;
    const DEFAULT_LEGEND = 5;
    const DEFAULT_METHOD = 1;
    
    const DEFAULT_PHRASE_UTILISATEUR = 'Fan de %pseudo% !';
    
    /*************** Constantes techniques ***************/
    
    const TECH_MPBOX = 'span.mp';
    const TECH_USERMENU = '#speedConnection li.listed .menu .simple .memberList';
    const TECH_FORUM_SIGN = 'div.signature';
    const TECH_FORUM_LGDF_NEW_LINK = /^<hr(?: \/)?><img src="http:\/\/woupix\.com\/misc\/sdz\/lgdf-r\/images\/pixel-(\d+)-(.+?)-(\d+)-(.+?)-(.+?)-1\.png" alt="Image utilisateur"><a href="\/forum-83-793477-p1-uberscript-sdz-la-guerre-des-fans-reloaded\.html">#LGDF-R: .+? vaincra !/;
    const TECH_FORUM_LGDF_PIXEL = /^<hr(?: \/)?><img src="http:\/\/woupix\.com\/misc\/sdz\/lgdf-r\/images\/pixel-(\d+)-(.+?)-(\d+)-(.+?)-(.+?)-2\.png" alt="Image utilisateur">/;
    const TECH_FORUM_MEMBER_INFOS = 'td.infos_membre';
    
    const TECH_PROFIL_GENERAL_INFOS = 'h3#profil';
    const TECH_PROFIL_NICKNAME = /^Profil du membre : +(.+)$/;
    
    const TECH_SETTINGS_LGDF_NEW_CODE = /^<image>http:\/\/woupix\.com\/misc\/sdz\/lgdf-r\/images\/pixel-\d+-.+?-\d+-.+?-.+?-1\.png<\/image><lien url="\/forum-83-793477-p1-uberscript-sdz-la-guerre-des-fans-reloaded\.html">#LGDF-R: .+? vaincra !<\/lien>\s+/;
    const TECH_SETTINGS_LGDF_PIXEL = /^<image>http:\/\/woupix\.com\/misc\/sdz\/lgdf-r\/images\/pixel-\d+-.+?-\d+-.+?-.+?-2\.png<\/image>/;
    const TECH_SETTINGS_DATA_CHALLENGE = /value="(.+?)" name="challenge"/;
    const TECH_SETTINGS_DATA_QUOTE = /id="citat" value="(.*?)"/;
    const TECH_SETTINGS_DATA_SIGN = /cols="40" rows="15">([\s\S]*?)</;
    const TECH_SETTINGS_SEE_PROFIL = /<a href="membres-294-(\d+)\.html">Voir mon profil actuel<\/a>/;
    
    var colors = ['0000FF', '8A2BE2', 'A52A2A', 'DEB887', '5F9EA0', 'D2691E',
                  'FF7F50', '6495ED', '556B2F', '00008B', '008B8B', '006400',
                  '8B008B', 'DC143C', 'FF8C00', '8B0000', '2F4F4F', '4B0082',
                  '808000', '4169E1', '9ACD32'];
    
    /*************** Initialisation des preferences ***************/
    
    var prefs = {
        position: parseInt(getConfig('LGDF-R.boxPosition', DEFAULT_POSITION)),
        legendType: parseInt(getConfig('LGDF-R.legendType', DEFAULT_LEGEND)),
        method: parseInt(getConfig('LGDF-R.method', DEFAULT_METHOD)),
        sentenceFan: getConfig('LGDF-R.sentenceFan', DEFAULT_PHRASE_UTILISATEUR)
    };
    
    
    
    
    
    
    
    
    
    
    /*************** Code principal, entree du script ***************/
    
    
    
    
    
    $(function() {
        
        /*************** Choses a faire au chargement de la page ***************/
        
        //Ajout du menu reglage
        if(UtilisateurConnecte())
        {
            AjouterMenuLGDF();
        }
        
        if(Forum())
        {
            TraiterSignatures();
        }
        
        if(Profil()) //Si il s'agit de la page de profil
        {
            TraiterProfil();
        }
    
    
        /*************** Evenements ***************/
        
        var FanDejaClique = false;
    
        $('a#laGuerreDesFansOptions').click(function() { //Au clic sur le lien d'options
            OuvrirOptions();
            
            return false; //On annule le lien
        });
    
        $('a#laGuerreDesFansOptionsSauvegarder').live('click', (function() { //Au clic sur le lien d'options
            SauvegarderOptions();
            
            return false; //On annule le lien
        }));
    
        $('a#laGuerreDesFansOptionsFermer').live('click', (function() { //Au clic sur le lien pour fermer les options
            FermerOptions();
            
            return false; //On annule le lien
        }));
        
        $('#laGuerreDesFansBeFan').click(function() { //Au clic sur le lien pour etre fan
            if(!FanDejaClique)
            {
                FanDejaClique = true;
                EtreFan($(this));
            }
        });
    });
    
    
    
    
    
    
    
    
    
    
    /*************** Fonctions du script ***************/
    
    
    
    
    
    function UtilisateurConnecte() {
        if($(TECH_MPBOX).length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function AjouterMenuLGDF() {
        $(TECH_USERMENU).append('<li><a href="#ReglagesLaGuerreDesFans" class="listedElementLink" id="laGuerreDesFansOptions">LGDF-R</a></li>'); //Lien reglages dans le menu
    }
    
    function Forum(){
        if($('#dialog_br').length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function TraiterSignatures() {
        $(TECH_FORUM_SIGN).each(function(index, element) { //On parcourt toutes les signatures du forum
            var matchNewLink = ($(element).html()).match(TECH_FORUM_LGDF_NEW_LINK); //Si on trouve une correspondance avec le nouveau LGDF
            var matchPixel = ($(element).html()).match(TECH_FORUM_LGDF_PIXEL); //Si on trouve une correspondance avec le pixel LGDF-R
            var isNewLink = false;
            var isPixel = false;
            var match = false;
    
            if (matchNewLink)
            {
                isNewLink = true;
                match = matchNewLink;
            }
            if (matchPixel)
            {
                isPixel = true;
                match = matchPixel;
            }
            
            if(match) //Si il y a une correspondance, le membre utilise l'UserScript
            {
                var mid = htmlEntities(match[1]); //L'ID du membre soutenu
                var nick = base64.decode(decodeURIComponent(match[2])); //Le pseudo du membre soutenu
                var userSentence = base64.decode(decodeURIComponent(match[5])); //La phrase du membre
                
                var text = '';
                
                switch(prefs['legendType']){
                    case LEGEND_SOUTIEN:
                        text = 'Ce membre soutient ' + nick + '.';
                        break;
                    case LEGEND_TROUE:
                        text = nick + ' troue fane.';
                        break;
                    case LEGEND_LOVE:
                        text = nick + ' <3';
                        break;
                    case LEGEND_VAINCRA:
                        text = nick + ' vaincra !';
                        break;
                    case LEGEND_UTILISATEUR:
                        if(userSentence.length > 40 || userSentence.indexOf("%pseudo%") == -1) //On teste si la phrase correspondant aux contraintes au cas ou un malin ait modifie ca...
                        {
                            userSentence == DEFAULT_PHRASE_UTILISATEUR;
                        }
    
                        userSentence = userSentence.replace(/%pseudo%/, nick); //On remplace %pseudo% par le pseudo
    
                        text = userSentence;
                        break;
                    default:
                        text = nick;
                }
                
                var textElement = $('<p></p>');
                $(textElement).text(text);
                $(textElement).css('margin', '0px');
    
                var box = $('<span></span>');
                $(box).addClass('gras blanc');
                $(box).css({
                    'border' : '1px solid rgba(0, 0, 0, 0.3)',
                    'border-radius' : '5px',
                    'display' : 'inline-block',
                    'margin' : '2px',
                    'padding' : '2px 5px',
                    'background' : '4px center no-repeat url("http://cdn1.iconfinder.com/data/icons/vector_social_media_icons/16px/star.png")',
                    'padding-left' : '24px',
                    'background-color' : '#' + colors[(nick.charCodeAt(0) ^ nick.charCodeAt(Math.round((nick.length - 1) / 2)) ^ nick.charCodeAt(nick.length - 1)) % colors.length] //Couleur selon le pseudo
                });
    
    
                var a = $('<a></a>');
                $(a).attr('href', 'http://www.siteduzero.com/membres-294-' + mid + '.html');
                $(box).html(textElement);
                $(a).html(box);
                
                var messageTr = $(element).parents('tr'); //On enregistre le tr du message pour parcourir plus facilement apres
                
                switch(prefs['position']){ //On ajoute la boite
                    case POSITION_TOP:
                        $(messageTr).find(TECH_FORUM_MEMBER_INFOS).prepend('<br />');
                        $(messageTr).find(TECH_FORUM_MEMBER_INFOS).prepend(a);
                        break;
                    case POSITION_SIGNATURE:
                        $(messageTr).find(TECH_FORUM_SIGN).find('hr').after('<br />');
                        $(messageTr).find(TECH_FORUM_SIGN).find('hr').after(a);
                        break;
                    default:
                        //parent.appendChild(a);
                }
            }
        });
    }
    
    function Profil() {
        if($(TECH_PROFIL_GENERAL_INFOS).length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function TraiterProfil() {  
        var span = $('<span></span>');
        span.attr('id', 'laGuerreDesFansBeFan');
        
        var pseudo = ($('h1').html()).match(TECH_PROFIL_NICKNAME)[1]; //Pseudo du membre idole
        
        if(pseudo == getConfig('LGDF-R.lastIdoleKnown', ''))
        {
            $(span).html(' Déjà fan. <b>Cliquez pour recharger !</b>');
        }
        else
        {
            $(span).html(' Devenir fan');
        }
        
        $(span).css({
            'background' : '4px center no-repeat url("http://cdn1.iconfinder.com/data/icons/vector_social_media_icons/16px/star.png")',
            'background-color' : 'rgba(255, 255, 255, 0.3)',
            'float' : 'right',
            'cursor' : 'pointer',
            'border' : '1px solid rgba(255, 255, 255, 0.6)',
            'border-radius' : '5px',
            'display' : 'inline-block',
            'margin-top' : '-3px',
            'padding' : '2px 5px',
            'padding-left' : '24px',
            'text-shadow' : '#000000 0px 0px 3px'
        });
    
        $(TECH_PROFIL_GENERAL_INFOS).append(span);
    }
    
    function OuvrirOptions() {
        
        var formHTML = '<div id="dialog_lgdf-r_config" style="display:none;" title="Options de La Guerre Des Fans - Reloaded">\n\
        <form method="post" action="" class="rmq">\n\
        <div class="centre">\n\
        <label for="LGDF-position">Position de la boîte notifiant que l\'utilisateur est fan de telle personne : </label><br />\n\
        <select name="LGDF-position" id="LGDF-position">\n\
        <option value="1"'+ (prefs['position'] == 1 ?  " selected" : "") +'>Au dessus de l\'avatar et de la citation</option>\n\
        <option value="2"'+ (prefs['position'] == 2 ?  " selected" : "") +'>Dans la signature</option>\n\
        </select>\n\
        <br /><br />\n\
        <label for="LGDF-legende">Légende notifiant que l\'utilisateur est fan de telle personne : </label><br />\n\
        <select name="LGDF-legende" id="LGDF-legende">\n\
        <option value="1"'+ (prefs['legendType'] == 1 ?  " selected" : "") +'>Ce membre soutient %pseudo%.</option>\n\
        <option value="2"'+ (prefs['legendType'] == 2 ?  " selected" : "") +'>%pseudo% troue fane.</option>\n\
        <option value="3"'+ (prefs['legendType'] == 3 ?  " selected" : "") +'>%pseudo% <3</option>\n\
        <option value="4"'+ (prefs['legendType'] == 4 ?  " selected" : "") +'>%pseudo% vaincra</option>\n\
        <option value="5"'+ (prefs['legendType'] == 5 ?  " selected" : "") +'>Phrase définie par l\'utilisateur lui-même. (Plus fun)</option>\n\
        </select>\n\
        <br /><br />\n\
        <label for="LGDF-methode">Vous voulez que l\'UserScript ajoute à votre signature </label><br />\n\
        <select name="LGDF-methode" id="LGDF-methode">\n\
<option value="1"'+ (prefs['method'] == 1 ?  " selected" : "") +'>un lien vers le post de LGDF-R, pour le faire connaire aux autres zéros :D</option>\n\
<option value="2"'+ (prefs['method'] == 2 ?  " selected" : "") +'>un pixel de couleur blanche, non visible donc :-(</option>\n\
        </select>\n\
        <br /><br />\n\
        <label for="LGDF-phrase">Phrase qui indiquera à l\'utilisateur que vous êtes fan de votre idole (si il a activé l\'option "Phrase définie par l\'utilisateur lui-même. (Plus fun)"). \n\
        %pseudo% sera remplacé par le pseudo de l\'utilisateur dont vous êtes fan.\n\
        Votre phrase doit contenir obligatoirement %pseudo% et faire moins de 40 caracteres. Le cas contraire, une phrase par défaut sera mise en place.\
        </label><br /><input type="text" name="LGDF-phrase" id="LGDF-phrase" value="' + prefs['sentenceFan'] + '" />\
        </div>\n\
        </form>\
        </div>';
        
        $('#dialog_lgdf-r_config').remove();
        $('body').append(formHTML);
    
        $("#dialog_lgdf-r_config").dialog({
            autoOpen: false,
            bgiframe: true,
            resizable: false,
            height:400,
            width:800,
            modal: true,
            overlay: {
                    backgroundColor: '#000',
                    opacity: 0.5
            },
            buttons: {
                'Valider': function() {
                    SauvegarderOptions();
                }
            }
        });
        $("#dialog_lgdf-r_config").dialog('open');
        event.preventDefault();
    }
    
    function SauvegarderOptions() {
    
        var erreurs = '';
    
        var positionBoite = $('#LGDF-position').val();
    
        if(positionBoite == 1 || positionBoite == 2)
        {
            setConfig('LGDF-R.boxPosition', positionBoite);
            prefs['position'] = positionBoite; //On rafraichit le parametre manuellement
        }
        else
        {
            erreurs = '- Position de la boite étant invalide, ce paramètre n\'a pas été enregistré.\n';
        }
    
        var legende = $('#LGDF-legende').val();
    
        if(legende == 1 || legende == 2 || legende == 3 || legende == 4 || legende == 5)
        {
            setConfig('LGDF-R.legendType', legende);
            prefs['legendType'] = legende; //On rafraichit le parametre manuellement
        }
        else
        {
            erreurs = erreurs + '- Légende étant invalide, ce paramètre n\'a pas été enregistré.\n';
        }
    
        var methode = $('#LGDF-methode').val();
    
        if(methode == 1 || methode == 2)
        {
            setConfig('LGDF-R.method', methode);
            prefs['method'] = methode; //On rafraichit le parametre manuellement
        }
        else
        {
            erreurs = erreurs + '- Méthode étant invalide, ce paramètre n\'a pas été enregistré.\n';
        }
    
        var phrase = $('#LGDF-phrase').val();
    
        if(phrase.length <= 40 && phrase.indexOf("%pseudo%") != -1)
        {
            setConfig('LGDF-R.sentenceFan', phrase);
            prefs['sentenceFan'] = phrase; //On rafraichit le parametre manuellement
        }
        else
        {
            erreurs = erreurs + '- La phrase utilisateur ne respectant pas le format, ce paramètre n\'a pas ete enregistré.';
        }
    
        if(erreurs == '')
        {
            alert('Paramètres enregistrés ! Notez que si vous avez changé la methode de modification de signature ou la phrase utilisateur, vous devez redevenir fan de votre idole afin que les changements soient pris en compte.');
        }
        else
        {
            alert(erreurs);
        }
        
        FermerOptions();
    }
    
    function FermerOptions() {
        $("#dialog_lgdf-r_config").dialog('close');
    }
    
    function EtreFan(textInfos) {
        var idIdole = location.href.match(/294-(\d+)/)[1]; //ID du membre idole
        var nickIdole = ($('h1').html()).match(TECH_PROFIL_NICKNAME)[1]; //Pseudo du membre idole
        
        $(textInfos).text('Chargement...');
        
        $.get('/membres-341.html', function(data){ //On recupere les donnees actuelles de l'utilisateur
            var challenge = data.match(TECH_SETTINGS_DATA_CHALLENGE)[1];
            var quote = decode(data.match(TECH_SETTINGS_DATA_QUOTE)[1]);
            var sig = decode(data.match(TECH_SETTINGS_DATA_SIGN)[1]);
    
            sig = sig.replace(TECH_SETTINGS_LGDF_NEW_CODE, ''); //On enleve les liens LGDF actuels
            sig = sig.replace(TECH_SETTINGS_LGDF_PIXEL, '');
            
            $.get('/membres-319.html?c=1', function(data){ //On recupere l'ID du membre fan
                var idFan = data.match(TECH_SETTINGS_SEE_PROFIL)[1];
                $.get('/membres-294-' + idFan + '.html', function(data){ //On recupere le pseudo du membre fan
                    var nickFan = ($(data).find('h1').html()).match(TECH_PROFIL_NICKNAME)[1];
                    
                    var lgdf = '';
                    
                    switch(prefs['method']){ //On ajoute le lien/pixel pour LGDF
                        case METHOD_LINK:
                            lgdf = '<image>http://woupix.com/misc/sdz/lgdf-r/images/pixel-' + idIdole + '-' + encodeURIComponent(base64.encode(nickIdole)) + '-' + idFan + '-' + encodeURIComponent(base64.encode(nickFan)) + '-' + encodeURIComponent(base64.encode(prefs['sentenceFan'])) + '-1.png</image><lien url="/forum-83-793477-p1-uberscript-sdz-la-guerre-des-fans-reloaded.html">#LGDF-R: ' + nickIdole + ' vaincra !</lien>\n';
                            break;
                        case METHOD_PIXEL:
                            lgdf = '<image>http://woupix.com/misc/sdz/lgdf-r/images/pixel-' + idIdole + '-' + encodeURIComponent(base64.encode(nickIdole)) + '-' + idFan + '-' + encodeURIComponent(base64.encode(nickFan)) + '-' + encodeURIComponent(base64.encode(prefs['sentenceFan'])) + '-2.png</image>';
                            break;
                        default:
                            //parent.appendChild(a);
                    }
                    
                    sig = lgdf + sig;
                    
                    var params = 'challenge=' + challenge + '&citat=' + encodeURIComponent(quote) + '&sig=' + encodeURIComponent(sig) + '&send=Envoyer';
                    
                    $.ajax({ //On poste les nouvelles donnees
                        url: "/membres-341.html",
                        type: "POST",
                        data: params
                    }).done(function() { 
                        $.ajax({ //On enregistre sur le serveur
                            url: "http://woupix.com/misc/sdz/lgdf-r/app/index.php?action=register",
                            type: "POST",
                            data: {"idIdole" : idIdole, "pseudoIdole" : nickIdole, "idFan" : idFan, "pseudoFan" : nickFan}
                        }).done(function() {
                            setConfig('LGDF-R.lastIdoleKnown', nickIdole);
                            $(textInfos).text('Bravo ! :)');
                        });
                    });
                    
                });
            });
        });
    }
    
    
    
    
    
    
    
    
    
    /*************** Fonctions tierses ***************/
    
    
    
    
    
    function decode(str){
        str = str.replace(/&amp;/g,   '&');
        str = str.replace(/&quot;/g,  '"');
        str = str.replace(/&#039;/g,  '\'');
        str = str.replace(/&lt;/g,    '<');
        str = str.replace(/&gt;/g,    '>');
        return str;
    }
    
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function setConfig(key, value) {
        localStorage.setItem(key, value);
    }

    function getConfig(key, defaultValue) {
        var value = localStorage.getItem(key);
        
        if(value == null)
        {
            value = defaultValue;
        }
        
        return value;
    }

};
//Fin de l'UserScript en lui-même

//Base 64 script

var base64 = function() {
    (function(a){function g(a){var b=[],c=0,d,e;a=encodeURI(a);d=a.length;while(c<d){e=a[c];c+=1;if("%"!==e){b.push(e.charCodeAt(0))}else{e=a[c]+a[c+1];b.push(parseInt(e,16));c+=2}}return b}function h(a){var b=[],c=0,d=a.length,e,f,g;while(c<d){e=a[c];f=a[c+1];g=a[c+2];if(128>e){b.push(String.fromCharCode(e));c+=1}else if(191<e&&e<224){b.push(String.fromCharCode((e&31)<<6|f&63));c+=2}else{b.push(String.fromCharCode((e&15)<<12|(f&63)<<6|g&63));c+=3}}return b.join("")}function i(a){var b="",c=g(a),f=c.length,h;for(h=0;h<f-2;h+=3){b+=e[c[h]>>2];b+=e[((c[h]&3)<<4)+(c[h+1]>>4)];b+=e[((c[h+1]&15)<<2)+(c[h+2]>>6)];b+=e[c[h+2]&63]}if(f%3){h=f-f%3;b+=e[c[h]>>2];if(f%3===2){b+=e[((c[h]&3)<<4)+(c[h+1]>>4)];b+=e[(c[h+1]&15)<<2];b+=d}else{b+=e[(c[h]&3)<<4];b+=d+d}}return b}function j(a){var b,e,g=0,i=[],j=0,k=0;for(g=0;g<a.length;g++){e=a.charCodeAt(g);b=f[e&127];if(-1===b){c.warn("Illegal characters (code="+e+") in position "+g)}else{k=k<<6|b;j+=6;if(j>=8){j-=8;if(d!==a.charAt(g)){i.push(k>>j&255)}k&=(1<<j)-1}}}if(j){c.error("Corrupted base64 string");return null}return h(i)}"use strict";var b=function(){},c={warn:b,error:b},d="=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789+/",f=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1];if(console){c.warn=console.warn||console.error||console.log||b;c.warn=console.error||console.warn||console.log||b}a.base64={encode:i,decode:j}})(window)
}
//Fin de base 64 script

//Injection du script dans la page (plus propre, et permet la compatibilité avec Chrome, et pas besoin de charger jQuery à la volée, le script prend directement celui du SdZ)

function loadJSByURL(url) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = url;
    script.textContent = '';
    document.body.appendChild(script);
}

function loadJSByContent(content) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.textContent = '(' + content + ')();';
    document.body.appendChild(script);
}

if(localStorage) {
    loadJSByContent(base64.toString());
    loadJSByContent(UserScript.toString());
}
else {
    alert("Votre navigateur n'est pas compatible avec l'API HTML5 et la fonction de stockage local utilisée par La Guerre Des Fans - Reloaded pour la sauvegarde des paramètres. Cet UserScript n'a donc pas été chargé. Merci de mettre à jour votre navigateur.");
}

// Remerciements par Iso
//           Merci a hilnius, Teol, @lex 3001, xababafr, Adroneus, Agbeladem, Tycale, et
//           tous les autres pour leurs bug reports.
//           Merci a delphiki pour la reouverture du topic.

// Remerciements par nivramdu94
//           Merci à Iso pour son idee geniale !
//           Merci à Dominique0796 et Jérôme Deuchnord pour leurs conseils.
//
//   --- Idee originale par Iso, repris ensuite par nivramdu94 suite a la non-maintenance du script par l'auteur devenu banni.