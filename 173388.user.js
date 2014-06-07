// ==UserScript==
// @name        ChoualBox addons
// @namespace   choualbox.com
// @description Ignorer les box d'un utilisateur, supprimer de sa page les boxs déjà votées
// @author      Benji - http://choualbox.com/blog/benji
// @include     http://choualbox.com/*
// @version     2.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @require		http://code.jquery.com/jquery-2.0.3.min.js
// @require		http://userscripts.org/scripts/source/49700.user.js
// @updateURL 	http://userscripts.org/scripts/source/173388.user.js
// ==/UserScript==

boxWorked = new Array();
function boucle() {
    $(".box_boucle > .infos").each(function () {
        regPseudo = /blog\/(.*)/
        tabInfos = this.getElementsByTagName('a');
        for (key in tabInfos) {
            if ((regPseudo.test(tabInfos[key])) && (pseudo = regPseudo.exec(tabInfos[key])[1])) {
                idUnique = $(this).find('.medias > .nbcoms')[0].pathname;
                if ((ignoreList.indexOf(pseudo) == -1)) {
                    if (!((this.parentNode.getElementsByClassName('voted').length != 0) && (GM_config.get('delAutoVote') == true))) {
                        if (boxWorked.indexOf(idUnique) == -1) {
                            lienIgnore = document.createElement('a');
                            lienIgnore.innerHTML = 'Ignorer ses boxs';
                            lienIgnore.className = 'ignoreNickname-' + pseudo;
                            boxWorked.push(idUnique)
                            lienIgnore.href = 'javascript:void(0);';
                            lienIgnore.onclick = function () { ajoutIgnoreList(this) };
                            this.appendChild(lienIgnore);
                        }
                    }
                    else {
                        $(this).parent('.box_boucle').css('background-color', '#EFEFEF');
                        $(this).parent('.box_boucle').css('min-height', 0);
                        $(this).parent('.box_boucle').html('<a href="' + idUnique + '">Box déjà votée (' + pseudo + ')</a>');
                    }
                }
                else {
                    $(this).parent('.box_boucle').css('background-color', '#EEEEEE');
                    $(this).parent('.box_boucle').css('min-height', 0);
                    $(this).parent('.box_boucle').html('<a href="' + idUnique + '">Box ignorée (' + pseudo + ')</a>');
                }
            }
        }
    });
}
function ajoutIgnoreList(obj) {
    id = obj.className;
    regPseudo = /ignoreNickname-(.*)/
    if ((regPseudo.test(id)) && (pseudo = regPseudo.exec(id)[1]) && (!ignoreList.hasOwnProperty(pseudo)) && (ignoreList.indexOf(pseudo) == -1)) {
        ignoreList = GM_config.get('ignoreList').split(", ");
		if ("" == GM_config.get('ignoreList')) GM_config.set('ignoreList', pseudo);
        else
		{
			ignoreList.push(pseudo);
			GM_config.set('ignoreList', ignoreList.join(", "));
			GM_config.save();
		}
    }
}
function ouvrirConf() {
    GM_config.open();
    GM_config.write();
}
function fermerConf() {
    GM_config.save();
    GM_config.close();
}
ConfigConf =
{
	'delAutoVote':
	{
		'section': ['Général'],
		'label': 'Supprimer automatiquement de la page les box déjà voté',
		'type': 'checkbox',
		'default': false
	},
	'ignoreList': {
		'section': ['Utilisateurs ignorés (séparés par des virgules)'],
		'type': 'textarea',
		'default': ''
	}
};
GM_config.init('ChoualBox Addons v2.0 - Configuration', ConfigConf);
configDOM = document.createElement('li');
configDOM.className = 'with-icon tooltip-bottom';
configDOM.attributes.style = "position:relative;";
configDOMa = document.createElement('a');
configDOMa.onclick = function() {
    ouvrirConf();
}
configDOMi = document.createElement('i');
configDOMi.className = 'glyphicon glyphicon-filter';
configDOMa.appendChild(configDOMi);
configDOM.appendChild(configDOMa);
$('.navbar-nav').append(configDOM);
ignoreList = GM_config.get('ignoreList').split(", ");
setInterval(boucle, 2000);