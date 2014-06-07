// ==UserScript==
// @name        IngAutoLoger
// @namespace   IngAutoLoger
// @grant 		GM_setValue
// @grant 		GM_getValue
// @description Autolog to student space
// @include     http://vie-etudiante.toulouse.ingesup.com/*
// @version     1
// @require      http://code.jquery.com/jquery-latest.min.js
// @require		 http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js

/* ##### Greasemonkey api extension ####*/
        // extend GM_setValue to be able to save Object
        (function() {
                var oldFunc = GM_setValue;

                GM_setValue = function(name, value) {
                        var wrapper = {
                                value: value,
                        };
                        oldFunc(name, uneval(wrapper));
                };
        })();

        // extend GM_getValue to be able to load Object
        (function() {
                var oldFunc = GM_getValue;

                GM_getValue = function(name, def) {
                        var wrapped = eval(oldFunc(name));
                        if (wrapped == undefined) {
                                return def;
                        }
                        return wrapped.value;
                };
        })();


		$.fn.onAvailable = function(fn){
		    var sel = this.selector;
		    var timer;
		    var self = this;
		    if (this.length > 0) {
		        fn.call(this);   
		    }
		    else {
		        timer = setInterval(function(){
		            if ($(sel).length > 0) {
		                fn.call($(sel));
		                clearInterval(timer);  
		            }
		        },100);  
		    };
		}
/* ##### #### #### ####*/

/* ##### Pronote auto login ####*/
function pronoteAutoLog(){
	$(".CelluleBoutonNomEditJQ").onAvailable(function(){
			$(this).val(config.pronote.usr);
	  });
	$(".EspaceGauche > input:not(.AvecMain)").onAvailable(function(){
			$(this).val(config.pronote.pwd);
			if(config.pronote.autoLog)pronoteAuth();
	  });
}

function pronoteAuth(){
			var btn = $(".EspaceGauche > input.AvecMain");
			btn.focus();
			btn.trigger("click");
}

function redir(page){
	window.location.replace(page);
}

function isPronoteDataDispo(){
	return (config && config.pronote && config.pronote.usr && config.pronote.pwd);
}

function watchPronoteConnexion(){
	$('body table#GInterface_T').onAvailable(function(){
		$('#btnLog').hide(1000);
	});
}

function addConfigToolsOnLoad(){
			$(document).ready(function() {
				addConfigTools();
			});
}

function addConfigTools(){
	loadJqueryUi();
		var button = 
		$("<button>")
			.attr({
				"type":"button",
				"id":"btnLog"
			})
			.text("Configurer le log automatique")
			.css({
				'padding' : '5px',
				'position' :'absolute',
				'z-index' : '10',
				'top' : '5px',
				'right' : '5px'
				})
			.button({
            	icons: {primary: "ui-icon-gear"}
        	})
        	.click(function(){
        		createConfigurationDialog();
        	});


		$(document.body).prepend(button);
}

function loadJqueryUi(){
		addCssFromAdress("http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/themes/ui-lightness/jquery-ui.css");
}

function addCssFromAdress(adress){
	var link = $("<link>")
					.attr({
						type: 'text/css',
						rel: 'stylesheet',
						href: adress
					});
	$(document.head).append(link);
}

function createConfigurationDialog(){
	var tabConfig = $(getHtmlConfiguration()).accordion({heightStyle: "content"});
	

	var divLoad = $("<div>").attr(
	{
		id : 'dialog-modal-load',
		title : '<span class="ui-icon ui-icon-gear" style="float:left;margin-right: 4px;"></span>Configuration de IngAutoLoger',
		style : "overflow:hidden;"
	}).html(tabConfig);

	divLoad.dialog({
			modal: true,
			closeOnEscape : false,
			show: {effect: 'Scale', speed: 1000 , easing:"easeOutExpo"},
			hide: {effect: "drop", duration: 1000 ,easing:"easeOutExpo"},
			closeText: 'X',
			position: 'center',
			height : '440' ,
			width : '600' ,
			buttons: {
                "Sauvegarder": function() {
                    saveConfiguration($(this));
                    $(this).dialog('close');
                },
                Annuler: function() {
                    $(this).dialog('close');
            	}
           	},
           	open : function(){
           		var btnPane = $('.ui-dialog-buttonpane');
           		btnPane.find('button:contains("Sauvegarder")').button({icons: {primary: 'ui-icon-circle-check'}});
           		btnPane.find('button:contains("Annuler")').button({icons: {primary: 'ui-icon-circle-close'}});
           		getConfiguration($(this));
           	}
        });
}

function getHtmlConfiguration(){
var html = 
'<div id="accordion">\
	<h3>Pronote</h3>\
    <div id="configPronote">\
    	<div>Vous pouvez entrer vos identifiants ici</div>\
		<div style="margin-top:15px;text-align:center;">Utilisateur <input id="cfg_pn_usr" type="text" style="margin-left:40px;"></input></div>\
		<div style="margin-top:10px;text-align:center;">Mot de passe <input id="cfg_pn_pwd" type="password" style="margin-left:20px"></input></div>\
		<div style="margin-top:10px;text-align:center;">Connexion automatique <input id="cfg_pn_auto" type="checkbox" checked="checked" style="margin-left:100px"></input></div>\
    </div>\
    <h3>Idées ?</h3>\
    <div id="configIdea">\
    	<div style="text-align:center;margin-top:0px;">Vous pouvez faire une suggestion d\'amélioration pour ce script ici : (250 caractère max)</div>\
    	<textarea id="suggestionText" style="margin-top:5px;" rows="3" cols="54" placeholder="Votre commentaire."></textarea><br>\
    	<span style="padding-right:65px;">Email (facultatif) <input type="email" id="emailText" style="margin-top:5px;" placeholder="email@email.fr"></span>\
    	<span><button type="button" id="btnSbmtComment" disabled="disabled">Valider</button></span> \
    </div>';
	return html;
}

function saveConfiguration(configContent){
	config=new Object();
	//SavePronotConfiguration
	config.pronote = new Object();
	config.pronote.usr = configContent.find('#cfg_pn_usr').val();
	config.pronote.pwd = configContent.find('#cfg_pn_pwd').val();
	config.pronote.autoLog = configContent.find('#cfg_pn_auto').is(':checked');
	GM_setValue("config", config);
}

function getConfiguration(configContent){
	//Set configuration info into the config box
	preparePronoteForm(configContent.find('#configPronote'));
	prepareIdeaForm(configContent.find('#configIdea'));

}

function preparePronoteForm(html){
		if(isPronoteDataDispo())
	{
		html.find('#cfg_pn_usr').val(config.pronote.usr);
		html.find('#cfg_pn_pwd').val(config.pronote.pwd);
		if (config.pronote.autoLog) html.find('#cfg_pn_auto').attr("checked", "checked");
	}
}

function prepareIdeaForm(html){
	textComment = html.find('#suggestionText');
	textEmail = html.find('#emailText');
	btnValid = html.find('#btnSbmtComment');

	textComment.keyup(function(){
		if($(this).val().length < 1) {
			console.log('pas bon');
			btnValid.attr('disabled' ,'disabled');
		}
		else {
			btnValid.removeAttr('disabled');
		}
	});

	btnValid
	.button({icons: {primary: "ui-icon-check"}})
	.css({
		"font-size" : "11px",
		"padding-top" : "4px"
	}).click(function(){
		alert(textComment.val() + ' + ' + textEmail.val());
/*				$.ajax({
		  type: 'POST',
		  url: 'http://mondaying2.free.fr/Scripts/IngAutoLog/suggestion.php',
		  data: {'email' :},
		  success: success,
		  dataType: dataType
		});*/
	});
}

/* ##### ############ ####*/


// ==/UserScript==
var config = GM_getValue("config");
var adress = document.location.href ;

switch(adress) {
	case "http://vie-etudiante.toulouse.ingesup.com/eleve.html":
			watchPronoteConnexion();
			if(isPronoteDataDispo()) pronoteAutoLog();
			addConfigToolsOnLoad();
	break;
	case "http://vie-etudiante.toulouse.ingesup.com/":
		watchPronoteConnexion();
		addConfigToolsOnLoad();
	break;
	default: 
		//alert("page pas encore supportée"); 	 	
	break;
}
