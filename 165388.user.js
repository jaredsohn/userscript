// ==UserScript==
// @name Gecko's buddy - DVP
// @namespace http://userscripts.org/scripts/show/165388
// @description View your friends on http://chat.developpez.com/
// @include http://chat.developpez.com/
// @author Antoine Pous developpeur@toine.pro
// @version 1.8
// @website http://www.toine.pro
// ==/UserScript==
(function() {
  'use strict';
  var getGlobal, geckoBuddy;
  getGlobal = function getGlobal(callback) {
    var script;
    script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + callback.toString() + "())";
    document.body.appendChild(script);
  };
 
  geckoBuddy = function geckoBuddy() {
    var buddyVersion, buddyConfig, buddySaveConfig, buddyList, buddyCount, buddyPM, buddyRegColour, userID, buddyGetConfig, buddyLoad, buddyUpdate, buddyTool;
    buddyVersion = '1.8';
    buddyConfig = [2,0,1,0,'',0];
    buddySaveConfig = false;
    buddyList = [];
    buddyCount = 0;
    buddyPM = true;
    buddyRegColour = /[A-Fa-f0-9]{6}/gm;
    userID = 0;
    
    jQuery('#nombreConnectes + #etatConnexion').before('<span id="buddyCount">' + buddyCount + ' amis</span> - ');
    jQuery('body').append('<div id="dialogueBuddyUI" style="height:100%; display:none;"><div id="buddyPreview" style="width: 374px; border: 1px solid #475E8C; float: right; background: white; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px 10px 10px 10px; border-radius: 10px 10px 10px 10px; padding-bottom: 5px;"><a href="#" class="nomSalon">Preview</a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-niv4" title="Administrateur"></span><span style="color: #E00E0E"> Anomaly <span class="icone icone-absent" title="Non disponible"></span> (.mode = \'sleep\';)</span></a><a href="#" class="" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-niv3" title="Modérateur"></span><span style="color: #004444"> Bibeleuh </span></a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-niv3" title="Modérateur"></span><span style="color: #8800AA"> ThomasR </span></a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #459045"> Gecko <span class="icone icone-nopv" title="Pas de messages privés"></span></span></a><a href="#" class="" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #000000"> rawsrc </span></a><a href="#" class="buddyFriend" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #005EFF"> Rotrevrep <span class="icone icone-nopv" title="Pas de messages privés"></span></span></a><a href="#" class="" style="display: block; text-decoration: none; text-align: left; padding-left: 5px;"><span class="icone icone-vide" title=""></span><span style="color: #008844"> Shikiryu </span></a></div><h4 style="margin: 0 0 0 0;">Pastille</h4><i>Vous permet de distinguer vos amis grâce à une pastille</i><p id="buddyIcon" style="margin: 0 0 5px 20px;"><select id="buddySelIcon"><option value="0">Désactivé</option><option value="1">Etoile mauve</option><option value="2">Pastille +</option></select></p><h4 style="margin: 0 0 0 0;">Décoration</h4><i>Vous permet de changer le style du pseudonyme de vos amis</i><p id="buddyDecoration" style="margin: 0 0 5px 20px;"><input type="checkbox" id="buddyBold"/><label for="buddyBold"><b>Gras</b></label><input type="checkbox" id="buddyItalic"/><label for="buddyItalic"><i>Italique</i></label><input type="checkbox" id="buddyUnderline"/><label for="buddyUnderline"><u>Souligné</u></label></p><h4 style="margin: 0 0 0 0;">Highlight</h4><i>Vous permet de différencier vos amis grâce à un highlight personalisé</i><p id="buddyHighlight" style="margin: 0 0 5px 20px;"><label for="buddyHighlightColor">Code couleur #</label><input type="text" id="buddyHighlightColor" placeholder="D0F0B0" size="3" maxlength="6" /></p><h4 style="margin: 0 0 0 0;">Allow MP</h4><i>Vous permet de définir le comportement à adopter quand un ami se connecte et que vous refusez les MP</i><p style="margin: 0 0 5px 20px;"><select id="buddySelAllow"><option value="0">Désactivé</option><option value="1">Tout autoriser</option><option value="2">Tout refuser</option></select></p><h4 style="margin: 0 0 0 0;">Sauvegarde</h4><i>Vous permet de sauvegarder certaines données dans des cookies</i><p style="margin: 0 0 5px 20px;"><label for="">Configuration</label> <input type="checkbox" id="buddySaveConfig" /> <i>Sauvegarde la configuration dans anochat_buddy</i><br /></p><p class="valider"><input type="button" id="buddySubmit" value="Valider" class="bouton"></p><hr /><i>Vous pouvez me contacter pour toute suggestion ou bogue, Gecko</i></div>');
 
    jQuery('.ui-dialog-titlebar-close').hide();
    jQuery('#buddySubmit').click(function() {
      buddyConfig = [
        jQuery('#buddySelIcon').val(),
	jQuery('#buddyBold').prop('checked') ? 1 : 0,
	jQuery('#buddyItalic').prop('checked') ? 1 : 0,
	jQuery('#buddyUnderline').prop('checked') ? 1 : 0,
	jQuery('#buddyHighlightColor').val(),
	jQuery('#buddySelAllow').val()
      ];
      if(jQuery('#buddySaveConfig').is(':checked')) {
	ecrireCookie('anochat_buddy',buddyConfig,365);
	buddySaveConfig = true;
      } else {
	effacerCookie('anochat_buddy');
	buddySaveConfig = false;
      }
      jQuery('#dialogueBuddyUI').dialog('close');
      buddyUpdate();
    });
 
    jQuery('#buddySelIcon').on('change', function () {
      jQuery('.buddyFriend').find('.buddyPreviewIcon').remove();
      if (jQuery('#buddySelIcon').val() > 0) {
        jQuery('.buddyFriend > .icone').append('<img src="http://ftp.toine.pro/dvp/user_scripts/img/buddy/' + jQuery('#buddySelIcon').val() + '.png" alt="" class="buddyPreviewIcon buddyPreviewIcon' + jQuery('#buddySelIcon').val() + '" />');
      }
    });
    jQuery('#buddyBold').on('change', function () {
      jQuery('.buddyFriend').children('span:nth-child(2)').css('font-weight', jQuery(this).prop('checked') ? 'bold' : '');
    });
    jQuery('#buddyItalic').on('change', function () {
      jQuery('.buddyFriend').children('span:nth-child(2)').css('font-style', jQuery(this).prop('checked') ? 'italic' : '');
    });
    jQuery('#buddyUnderline').on('change', function () {
      jQuery('.buddyFriend').children('span:nth-child(2)').css('text-decoration', jQuery(this).prop('checked') ? 'underline' : 'none');
    });
    jQuery('#buddyHighlightColor').on('keyup', function () {
      if (jQuery(this).val().match(buddyRegColour)) {
        jQuery('.buddyFriend').css('background-color', '#' + jQuery(this).val());
      } else {
        jQuery('.buddyFriend').css('background-color', '');
      }
    });
 
    buddyGetConfig = function buddyGetConfig() {
      jQuery('.buddyFriend').find('.buddyPreviewIcon').remove();
      jQuery('#buddySelIcon').val(buddyConfig[0]);
      buddyConfig[1] == 1 ? jQuery('#buddyBold').prop('checked', 'checked') : jQuery('#buddyBold').prop('checked', '');
      buddyConfig[2] == 1 ? jQuery('#buddyItalic').prop('checked', 'checked') : jQuery('#buddyItalic').prop('checked', '');
      buddyConfig[3] == 1 ? jQuery('#buddyUnderline').prop('checked', 'checked') : jQuery('#buddyUnderline').prop('checked', '');
      jQuery('#buddyHighlightColor').val(buddyConfig[4]);
      jQuery('#buddySelAllow').val(buddyConfig[5]);
      jQuery('#buddySaveConfig').prop('checked',buddySaveConfig);
      if(buddyConfig[0] > 0) {
        jQuery('.buddyFriend').children('.icone').append('<img src="http://ftp.toine.pro/dvp/user_scripts/img/buddy/'+buddyConfig[0]+'.png" alt="" class="buddyPreviewIcon buddyPreviewIcon'+buddyConfig[0]+'" />');
      }
      jQuery('.buddyFriend').children('span:nth-child(2)').css('font-weight', jQuery('#buddyBold').prop('checked') ? 'bold' : 'normal');
      jQuery('.buddyFriend').children('span:nth-child(2)').css('font-style', jQuery('#buddyItalic').prop('checked') ? 'italic' : 'normal');
      jQuery('.buddyFriend').children('span:nth-child(2)').css('text-decoration', jQuery('#buddyUnderline').prop('checked') ? 'underline' : 'none');
      if(buddyConfig[4].match(buddyRegColour)) {
        jQuery('.buddyFriend').css('background-color','#'+buddyConfig[4]);
      }
    };

    jQuery('#dialogueBuddyUI').dialog({
      autoOpen: false,
      open: buddyGetConfig,
      title: "Gecko's buddy",
      resizable: false,
      width: 950,
      height: 575
    });

    buddyLoad = function buddyLoad() {
      jQuery(".nomConnecte").each(function(){
	var user = jQuery(this).attr('onclick').split(new RegExp("[\(\",]+", "g"));
	if(user[2] === jQuery('#zonePseudo').text()) {
	  userID = user[1];
	  if(jQuery(this).find('span.icone-nopv').length === 1 || jQuery(this).find('span.icone-niv4').length === 1 || jQuery(this).find('span.icone-niv3').length === 1) {
	    buddyPM = false;
	  }
	  jQuery.getJSON('http://www.toine.pro/dvp/uscript.php?a=friends&u='+user[1], function(data) {
	    buddyList = [];
	    $.each(data,function(key,val){ 
	      buddyList.push(val);
	    });
	  });
	}
      });
    };
 
    buddyUpdate = function buddyUpdate() {
      buddyCount = 0;
      if(lireCookie('anochat_buddy') != null) {
	buddyConfig = lireCookie('anochat_buddy').split(',');
	buddySaveConfig = true;
      }
      jQuery(".nomConnecte").each(function(){
	var user = jQuery(this).attr('onclick').split(new RegExp("[\(\",]+", "g"));
	if(jQuery.inArray(user[2],buddyList) > 0) {
          buddyCount++;
	  if(buddyConfig[0] > 0 && jQuery(this).children('.buddyFriendIcon'+buddyConfig[0]).length === 0) {
	    jQuery(this).find('.buddyFriendIcon').remove();
	    jQuery(this).children('.icone').append('<img src="http://ftp.toine.pro/dvp/user_scripts/img/buddy/'+buddyConfig[0]+'.png" alt="" class="buddyFriendIcon buddyFriendIcon'+buddyConfig[0]+'" />');
	  } else {
	    jQuery(this).find('.buddyFriendIcon').remove();
	  }
	  jQuery(this).children('span:nth-child(2)').css('font-weight', buddyConfig[1] == 1 ? 'bold' : 'normal');
	  jQuery(this).children('span:nth-child(2)').css('font-style', buddyConfig[2] == 1 ? 'italic' : 'normal');
	  jQuery(this).children('span:nth-child(2)').css('text-decoration', buddyConfig[3] == 1 ? 'underline' : 'none');
	  if(buddyConfig[4].length === 6) {
	    jQuery(this).css('background-color','#'+buddyConfig[4]);
	  }
	  if(!buddyPM && jQuery(this).find('span.icone-niv4').length === 0 && jQuery(this).find('span.icone-niv3').length === 0) {
	    if(buddyConfig[5] == 1 && jQuery(this).children('span:nth-child(2)').find('span.icone-pv').length === 0) { envoyerCommande('/ALLOW ON ' + user[2]); }
	    if(buddyConfig[5] == 2 && jQuery(this).children('span:nth-child(2)').find('span.icone-pv').length === 1) { envoyerCommande('/ALLOW OFF ' + user[2]); }
	  }
	}
      });
      jQuery('#buddyCount').text(buddyCount + ' amis');
    };
 
    buddyTool = function buddyTool() {
      jQuery.element = function(tag) {
        return jQuery(document.createElement(tag));
      };
      jQuery('#geckoBuddy').remove();
      jQuery('#barreOutils').append(
        jQuery.element('input').
          attr('type', 'button').
          attr('id', 'geckoBuddy').
          addClass('bouton').
          attr('value', 'Amis').
          click(function() {
            $('#dialogueBuddyUI').dialog('open');
          })
      );
    };
 
    jQuery('#identAction').click(function() {
      if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
        setTimeout(function() {
          jQuery.getJSON('http://www.toine.pro/dvp/uscript.php?id=165388', function(data){
            var vc = buddyVersion.replace('.','');
            var vl = data.version.replace('.','');
            if(vc < vl) {
              jQuery('#conversation0').append('<span class="notification"><span style="color: #459045">Gecko</span>\'s buddy v' + buddyVersion + ': <span style="color: #CE0001">Votre version du script est périmée, <a href="http://userscripts.org/scripts/show/165388" target="_blank">obtenir la version ' + data.version + '</a></span></span><br />');
              jQuery('#conversation0').append('<span class="notification"><span style="color: #459045">Gecko</span>\'s buddy v' + buddyVersion + ': Pour toute suggestion ou rapport de bogue <a href="#" onclick="dialoguerEnPrive(414553); return false;">contactez moi</a>, je squatte souvent dans le salon <a href="#" onclick="changerSalon(\'Développement web\'); return false">Développement Web</a><br />');
            }
            jQuery('#conversation0').append('<span class="notification"><span style="color: #459045">Gecko</span>\'s buddy v' + buddyVersion + ' chargé</span><br />');
          });
          buddyTool();
          buddyLoad();
          jQuery(document).ajaxComplete(function(event, xhr, settings) {
            if(settings.url == 'ajax.php') {
              var data = jQuery.parseJSON(xhr.responseText);
              if(data.connectes !== '' || data.salon !== '' || data.etat !== 1) { buddyUpdate(); }
            }
          });
        },500);
      } else {
        setTimeout(function() {
          jQuery('#conversation0').append('<span class="notification"><span style="color: #459045">Gecko</span>\'s buddy v' + buddyVersion + ' <span style="color: #CE0001">n\'a pas pu être chargé</span></span><br />');
          jQuery('#conversation0').append('<span class="notification"><span style="color: #459045">Gecko</span>\'s buddy v' + buddyVersion + ' <span style="color: #CE0001">ce script est incompatible avec votre navigateur</span></span><br />');
        },500);
      }
    });
  };
  
  getGlobal(geckoBuddy);
}());