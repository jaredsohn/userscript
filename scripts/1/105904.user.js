// ==UserScript==
// @name          Dailymotion AutoPlay Killa
// @author        http://userscripts.org/users/fremea
// @namespace     http://userscripts.org/scripts/show/105904
// @description   Prevents video on Dailymotion from automatically starting playing
// @icon          http://www.dailymotion.com/favicon.ico
// @date          2013/07/13
// @source        http://userscripts.org/scripts/review/105904
// @updateURL     https://userscripts.org/scripts/source/105904.meta.js
// @downloadURL   https://userscripts.org/scripts/source/105904.user.js
// @include       http://www.dailymotion.com/*
// @include       http://dailymotion.com/*
// @include       https://www.dailymotion.com/*
// @include       https://dailymotion.com/*
// @version       2.6
// @run-at        document-end
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// @grant         GM_log
// @grant         GM_registerMenuCommand
// @require       https://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// une fonction log personnalisée dans la console web (section 'journal')
function _log(info) {
    console.log('\t\t\t\t::: ' + GM_info.script.name + ' ' + GM_info.script.version + ' :::\n' + info + '\n...........................................................................');
}

// insérer paramètre à l'url puis la recharger
function insertParam(key, value) {
   key = encodeURIComponent(key); value = encodeURIComponent(value);
   
   // teste si l'url contient déjà des paramètres et les liste le cas échéant dans la variable kvp (tableau)
   var kvp = location.search.substr(1).split('&');
   
   //_log('new key = ' + key +'\nnew value = '+ value +'\nparamètres existants = '+kvp);
   
   // si l'url est vide de paramètre, alors la fonction ajoute celui donné et recharge la page
   if (kvp == '') {
       location.search = '?' + key + '=' + value;
   }
   // autrement véfifier que le paramètre donné n'est pas déjà présent
   else {

       var i = kvp.length; 
       var x; 
       
       while (i--) {
           x = kvp[i].split('=');
           //_log('paramètre existant n°' + i +'\nvaleur = '+ kvp[i]);
           
           // si c'est le cas avec la même valeur, on dégage
           if ((x[0] == key) && (x[1] == value)) {
               //_log('Le paramètre existe déjà, kassos!!!');  
               return;
           }

            // si c'est le cas et contient une autre valeur, la modifier
           else if ((x[0] == key) && (x[1] != value)) {           
               //_log('La valeur est différente et sera donc modifiée');  
               x[1] = value;
               kvp[i] = x.join('=');
               break;
           }                                 
       }

       // dans tous les cas l'ajouter aux paramètres existants
       if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

       //this will reload the page, it's likely better to store this until finished
       location.search = kvp.join('&');
   }
}

// Shortcut to document.getElementById (not equal to jquery $('#id')[0])
function $id(id) {
    return document.getElementById(id);
}

function $class(className) {
    return document.getElementsByClassName(className);
}

// Get 'Meta' attribute 'content' by selecting 'property' attribute, equivalent to the jquery $("meta[property='og:type']").attr("content");
function GetMetaValue(propname, propname_value, attr) {
    var metaTags = document.getElementsByTagName("meta");
    var counter = 0;
    for (counter; counter < metaTags.length; counter++) {
        //_log(metaTags[counter].getAttribute(propname));

        if (metaTags[counter].getAttribute(propname) == propname_value) {
           return metaTags[counter].getAttribute(attr);
        }
    }
    return "no meta found with this value";
}

function remove_id(id)
{
    return (elem=$id(id)).parentNode.removeChild(elem);
}

function remove_Class(className){
    elements = $class(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// Creates a new node with the given attributes, properties and event listeners
function createNode(type, attributes, props, evls) {

    var node = document.createElement(type);

    if (attributes) {
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
        }
    }

    if (props) {
        for (var prop in props) {
            if ((props.hasOwnProperty(prop)) && (prop in node)) node[prop] = props[prop];
        }
    }

    if (Array.isArray(evls)) {
        evls.forEach(function(evl) {
            if (Array.isArray(evl)) node.addEventListener.apply(node, evl);
        });
    }
    return node;
}

function play() { 
     // suppression des éléments du lecteur embed
     remove_id('DAK_Box');
     // et les remplacer par le lecteur embed d'origine
     _player_box.appendChild(player);
}

function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
///////////////////////////////////////////////////////////////////////////////
    //_log('- will update? : ' + GM_info.scriptWillUpdate);
    
// Prevent Execution in Frames
// Sometimes if the page you are seeing on screen contains frames with addresses that your script is set to run on (via @include and @exclude rules). You may not always want this to happen - for example alert() messages may appear multiple times or other odd behaviour.
if (!frameElement) {

    ///////////////////////////////////////////////////////////////////////////////
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    ////////////////////////////// OPTIONS UTILISATEURS /////////////////////////////

   var settings = {
       'method': {
           'section': ['Options', 'Testez la méthode "sûre" si la méthode "avancée" flanche'],
           'label': 'Méthode',
           'type': 'radio',
           'options': ['Sûre', 'Avancée'],
           'default': 'Avancée'
       },
       'profile': {
           'label': 'Supprimer la fenêtre vidéo du résumé des profils utilisateur',
           'type': 'checkbox',
           'default': true
       }
   };
   
   var configStyle = 'body {background: rgb(20, 80, 150); color: snow; margin: 5px 15px; overflow: auto;}\
                     .config_header {color: yellow; font-size: 18pt; text-shadow: 0 1px 0px rgb(0, 0, 0);}\
                     .section_header_holder {margin-top: 5px;}\
                     .section_header {background-color: rgba(20, 20, 20, 0.8); color: yellow; display: inherit; font-size: 13pt; text-decoration: none; text-shadow: 0 1px 0 rgb(200, 200, 200); width: 100%;}\
                     .section_kids {padding: 5px 0 5px 10px; width: 391px;}\
                     .config_var {display: block; margin: 0 !important; padding: 5px 0;}\
                     .field_label {display: inline-block; font-size: 12px; font-weight: bold; margin-right: 6px;}\
                     #field_method {display: inline-block; font-size: 12px; text-align: right; width: 330px;}\
                     input[type="radio"] {margin-bottom: 5px; margin-right: 20px; vertical-align: middle;}\
                     input[type="checkbox"] {vertical-align: middle;}\
                     .section_desc {background: none repeat scroll 0 0 rgb(239, 239, 239); border: 1px solid rgb(204, 204, 204); color: rgb(87, 87, 87); font-size: 10pt; margin: 0 auto; padding: 2px;}\
                     .reset, #buttons_holder, .reset a {color: red; text-align: right; text-decoration: none; text-shadow: 0px 1px 3px rgb(0, 0, 0);}\
                     .reset {margin-right: 10px;}\
                     .reset:hover, .reset:focus {color: snow;}';
   
   //_log('configStyle = ' +configStyle);

   GM_config.init('Dailymotion Autoplay Killa',settings,configStyle);
   
   GM_registerMenuCommand('Dailymotion Autoplay Killa: Configuration', GM_config.open);
   
   // variables des paramètres
   var method = GM_config.get('method');
   _log('method = ' +method);
   
   var profile = GM_config.get('profile');
   _log('profile = ' +profile);  
   
    ///////////////////////////////////////////////////////////////////////////////
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    ////////////////////////////// START OF CONSTANTS /////////////////////////////

    var dailyHost = "http://www.dailymotion.com";
    
    // Définir si la page joue une vidéo ou est un profil utilisateur
    var _isType = GetMetaValue("property", "og:type", "content");
    //_log('Type de la page = ' + _isType);

    var play_button_image = 'background-image:url(data:image/png;base64,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%3D)';

    /////////////////////////////// END OF CONSTANTS //////////////////////////////    
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    ///////////////////////////////  AUTOPLAY KILLA  //////////////////////////////    
    
// ============== MÉTHODE SÛRE ================
   if (method=='Sûre') {
       
       // vérifie que l'url contient "video"
       var dailyPath = location.pathname.split( '/' );
       
       dailyPath = dailyPath[1];
       
       //_log('dailyPath = ' + dailyPath)
       
       // si c'est le cas alors on ajoute autoplay=0 comme paramètre url et le tour est joué   
       if  (dailyPath === 'video') {
         insertParam('autoplay','0');
       } else {
         //_log('insertParam echec');
       };
   }
// ============== FIN MÉTHODE SÛRE ============== 

    
// ============== MÉTHODE AVANCÉE ===============


// ============== FIN MÉTHODE AVANCÉE ===========

// attendre le chargement de la page complet avant de lancer les fonctions suivantes (nécessaire)
window.onload = function() {

    ///////////////////////////////////////////////////////////////////////////////
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //////////////////////// START OF Cosmetic Enhancement ////////////////////////

   if (profile) {
       // ============== KILL JUKEBOX ==============
       // suppression du jukebox qui lance les vidéos sur la page 'Résumé' d'un profil utilisateur
       if (_isType === 'profile') {
           remove_Class("dmpi_box dmpi_subbox no_border_top column span-8 last");
       }    
   }

    ////////////////////// END OF Cosmetic Enhancement ////////////////////////////
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //////////////////////////// START METHODE AVANCÉE ////////////////////////////

   if (method=='Avancée') {

       // sauvegarde du lecteur par défaut qui se lance automatiquement
       if (_isType === 'video') {
           // valeur des id du player et de ses contenus
           //_player_box est une variable globale comme player par la suite
           _player_box = $id('player_box');
           var _player_main = $id('player_main');
           var _video_player_main = $id('video_player_main');
           //_log('player_box = ' + _player_box + '\n' + 'player_main = ' + _player_main + '\n' + 'video_player_main = ' + _video_player_main);

           if ((_player_box)&&(_player_main)&&(_video_player_main)) {
           // enregistrer le player dans une variable
           player = _player_main.cloneNode(true);
           //player = null
           //_log('player = ' + player);
            if (player) {
               // suppression du lecteur par défaut pour éviter qu'il apparaisse brièvement pendant les vérifications suivantes
                remove_id('player_main');
            } else {
              return;
            }
           } else {
            return;
           }

           // ============== LECTEUR EMBED ==============

           // récupérer le thumbnail qui servira de fond
           var thumbnail = GetMetaValue("property", "og:image", "content");
           //_log('thumbnail = ' + thumbnail);
           // récupérer la durée de la vidéo
           var duration = GetMetaValue("property", "video:duration", "content");
           if (duration) {
            var _s = Math.floor(duration % 60);
            if (_s < 9) {
                _s = '0' + _s;
            }
            var _m = Math.floor(Math.floor(duration / 60) % 60);
            if (_m < 9) {
                _m = '0' + _m;
            }
            var _h = Math.floor(duration / 3600);
            if (_h < 9) {
                _h = '0' + _h;
            }
            if (_h > 0) {
                duration = _h + ':' + _m + ':' + _s;
            } else {
                duration = _m + ':' + _s;
            }
            //_log('durée = ' + duration);
           } else {
            duration = '00:00:00';
           }
           // récupérer le titre
           var _title = GetMetaValue("property", "og:title", "content");
           //_log('_title = ' + _title);
           if (!_title) {
            _title = '';
           }
           // récupérer auteur depuis ex: http://www.dailymotion.com/_poster
           var _poster = GetMetaValue("property", "video:director", "content");
           //_log('_poster = ' + _poster);
           if (_poster) {
            _poster = _poster.toString();
            _poster = _poster.split('/').pop();
           } else {
            _poster = '';
           }
           // récupérer la date de release
           var _release = GetMetaValue("property", "video:release_date", "content");
           //_log('_release = ' + _release);
           if (_release) {
            _release = _release.toString();
            _release = _release.replace(/(.+)-(.+)-(.+)T(.*)[\+\-].*/g, '($1.$2.$3, $4)');
           } else {
            _release = '';
           }
           // récupérer lien de la page des vidéos
           var _vids_link = dailyHost + '/user/' + _poster + '/1';
           //_log('_vids_link = ' + _vids_link);

           // ============== ASSEMBLAGE DU LECTEUR ==============
           var _newNode = createNode("div", {id: "DAK_Box"},
                       {innerHTML: "<p class='DAK_Common' id='DAK_Button'></p>" +
                                   "<p class='DAK_Common DAK_hover' id='DAK_release'>" + _release + "</p>" +
                                   "<a title='All " + _poster + " videos' href='" + _vids_link + "' class='DAK_Common DAK_hover' id='DAK_poster' name='DAK_poster'>" + _poster + "</a>" +
                                   "<div id='DAK_title_box' class='DAK_Common DAK_hover'>" +
                                   "<div id='DAK_title_cell'>" +
                                   "<div id='DAK_title_text' title='" + _title + "'>" + _title + "</div>" +
                                   "</div>" +
                                   "</div>" +
                                   "<p class='DAK_Common DAK_hover' id='DAK_duration'>" + duration + "</p>" +
                                   "<img align='middle' width='100%' height='100%' class='DAK__del' src='" + thumbnail + "' id='DAK_IMG'>" +
                                   "<p class='DAK_hover' id='DAK_bk_bar'></p>"});
           // Insertion du lecteur
           //_log('player_box = ' + _player_box + '\n_newNode = ' + _newNode);
           _player_box.appendChild(_newNode);

           // Vérifier que DAK_Box existe pour procéder au changement de la page
           var _DAK_Box = $id('DAK_Box');
           //_log('_DAK_Box = ' + _DAK_Box);
           if (_DAK_Box) {
            // ============== START OF CSS STYLES ==============
           // Adds the CSS styles for the script to the page
           GM_addStyle("/* lecteur embed */\
               #DAK_release,#DAK_poster,#DAK_title_box,#DAK_duration{z-index:99!important}\
               #DAK_release:hover ~ #DAK_bk_bar,#DAK_poster:hover ~ #DAK_bk_bar,#DAK_title_box:hover ~ #DAK_bk_bar,#DAK_duration:hover ~ #DAK_bk_bar,#DAK_bk_bar:hover{opacity:0.8!important}\
               #DAK_Box{height:100%!important;position:relative!important;width:100%!important;margin:0 auto!important}\
               #DAK_bk_bar{background-color:black!important;bottom:0!important;height:70px!important;opacity:0.5;transition:opacity .5s!important;position:absolute!important;width:100%!important;z-index:98!important}\
               .DAK_Common{border:medium none!important;color:white!important;font-family:'Trebuchet MS','arial narrow',sans-serif!important;line-height:100%!important;position:absolute!important}\
               #DAK_release{bottom:0!important;font-size:14px!important;font-style:italic!important;font-weight:normal!important;left:5px!important;width:auto!important}\
               #DAK_poster{bottom:3px!important;color:red!important;font-size:24px!important;font-weight:bold!important;right:80px!important;text-align:right!important;width:auto!important}\
               #DAK_poster:hover{color:#FFCC00!important;text-decoration:none!important}\
               #DAK_title_box{bottom:28px!important;display:table!important;height:52px!important}\
               #DAK_title_cell{display:table-cell!important;vertical-align:middle!important}\
               #DAK_title_text{display:block!important;font-size:24px!important;font-variant:small-caps!important;font-weight:bold!important;overflow:hidden!important;padding-left:5px!important;padding-right:5px!important;text-overflow:ellipsis!important;max-height:50px!important;line-height:100%!important}\
               #DAK_duration{bottom:0!important;font-size:18px!important;font-weight:normal!important;right:5px!important;text-align:right!important;width:auto!important}\
               /* bouton play du lecteur */\
               #DAK_Button{" + play_button_image + "!important;cursor:pointer!important;background-position:center center!important;background-repeat:no-repeat!important;background-size:200px auto!important;cursor:pointer!important;height:260px!important;opacity:0.5;transition:opacity .5s!important;width:100%!important;z-index:99!important}\
               #DAK_Button:hover{opacity:0.8!important}");
            // ============== END OF CSS STYLES ==============
           } else {
             // restaurer le lecteur par défaut
              _player_box.appendChild(player);
              return;
           }

           ///////////////////////////// START OF EVENT LISTENERS //////////////////////////

           // ============== Click event to play video ==============

           //_log('player_box = ' + _player_box + '\nplayer = ' + player);
           _DAK_Button = $id('DAK_Button');
           //_log('DAK_Button = ' + _DAK_Button); 
              
           addEvent(_DAK_Button,'click', play);
         
       }
       /////////////////////////// END OF EVENT LISTENERS //////////////////////////
       // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
       /////////////////////////// END OF METHODE AVANCÉE //////////////////////////
   }
}; // end of window.onload
} // end if (!frameElement) statement