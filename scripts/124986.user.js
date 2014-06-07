// ==UserScript==
// @name           Mantis Tag Generator
// @namespace      sqli.steering-project.com/mantis-tag-generator
// @description    Génération automatique de TAGs Mantis lors de la visualisation d'une anomalie.
// @match          https://sqli.steering-project.com/mantis/view.php
// @match          https://sqli.steering-project.com/mantis/view.php?id=*
// @match          https://sqli.steering-project.com/mantis/bug_view_page.php?bug_id=*
// @match          https://sqli.steering-project.com/mantis/bug_view_advanced_page.php?bug_id=*
// @author         Cedric Tiaffay <cetiaffay@sqli.com>
// @icon		   http://sqli.steering-project.com/mantis/images/favicon.gif
// @version 	   1.6
// ==/UserScript==

var jQuery;

// Load jQuery
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
	var MantisGenerator ={
		trigram: null,
		pattern: null,
		patternArray: null,
		startTag: null,
		endTag: null,
		svnTag: null,
		currentProjectCode: null,
		today : new Date(),
		placeholders: null,
		init: function() {

			//debug :
			//GM_deleteValue('trigram');
			//GM_deleteValue('pattern');
		
			//retrieving plugin's stored vars
			this.trigram = GM_getValue('trigram', '');
			this.pattern = GM_getValue('pattern', '');
			
			//storing current project code
			res = /^\w+/.exec(jQuery('td.texteRouge:first').text());
			if (res) {
				this.currentProjectCode = res[0];
			} else {
				error = 'Impossible de déterminer le code projet actuel';
				alert(error);
				throw(error);
			}

			//init placeholders
			rawDay = this.today.getDate();
			this.placeholders = {
				"{{title}}"  : jQuery.trim(jQuery('tr.row-2 td[colspan=6]:first').text()),
				"{{number}}" : jQuery.trim(jQuery('tr.row-1 > td:first').text()),
				"{{day}}"	 : ((rawDay = this.today.getDate()) < 10) ? "0" + rawDay : rawDay,
				"{{month}}"  : ((rawMonth = this.today.getMonth() + 1) < 10) ? "0" + rawMonth : rawMonth,
				"{{year}}"   : this.today.getFullYear(),
				"{{trigram}}": this.trigram,
				"{{project}}": this.currentProjectCode
			};
			
			//custom css include
			this.addGlobalStyle('\
				.sqli-mantis-generator-tag {\
					float: left; \
					margin: 0; \
					padding: 0; \
					text-align: left; \
					width: 32%; \
				}\
					.sqli-mantis-generator-tag label {\
						font-weight:bold; \
						color:red; \
						line-height: 18px; \
					}\
					.sqli-mantis-generator-tag input {\
						width: 70%; \
					}\
				#sqli-mantis-generator-settings-button {\
				   color : red; \
				   line-height: 18px; \
				   font-weight:bold; \
			   }\
			   #sqli-mantis-generator-settings-layer {\
				   width: 100%; \
				   height:100%; \
				   position: absolute; \
				   background: black; \
				   opacity:0.5; \
				   top:0; \
				   display: none\
			   }\
				   #sqli-mantis-generator-settings-main-container {\
					   display: none\
				   }\
				   #sqli-mantis-generator-settings-container {\
					   position:absolute; \
					   top:40px; \
					   width: 80%; \
					   border-radius: 4px; \
					   background: white; \
					   margin: 0 0 0 10%; \
					   border: 1px solid rgb(153, 118, 144); \
					   padding: 5px 10px; \
				   }\
						#legend {\
							border-radius : 5px;\
							background: #997690;\
							color: white;\
							overflow: hidden;\
						}\
							#sqli-mantis-generator-settings-container div.box-left{\
								float:left;\
							}\
							#sqli-mantis-generator-settings-container div.box-right{\
								float:right;\
							}\
					    #sqli-mantis-generator-settings-container ul {\
						   padding: 10px; \
					    }\
					    #sqli-mantis-generator-settings-container input[type=text], #sqli-mantis-generator-settings-container textarea {\
						   background: -moz-linear-gradient(center top , #FFFFFF, #EEEEEE 1px, #FFFFFF 25px) repeat scroll 0 0 transparent; \
						   border: 1px solid #997690; \
						   box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); \
						   border-radius: 5px;\
						   font: 13px/100% Verdana,Tahoma,sans-serif; \
						   outline: 0 none; \
						   padding: 4px; \
						   width: 200px; \
						   margin-right:10px;\
						   font-size: 11px;\
					    }\
					    #sqli-mantis-generator-settings-container textarea {\
						   width: 84%; \
						   height: 200px; \
					   }\
					   #sqli-mantis-generator-settings-container label{\
						   display: block; \
						   float: left; \
						   width: 90px; \
						   padding: 5px 0; \
					   }\
					   #sqli-mantis-generator-settings-save {\
						   margin-left: 90px; \
						   background: #997690; \
						   border: 0; \
						   border-radius: 5px; \
						   color: #FFFFFF; \
						   cursor: pointer; \
						   font-size: 14px; \
						   padding: 4px 12px; \
						   width: auto; \
					   }\
		   ');

			//adding settings popup button
			jQuery('td#droit:first').before('<td id="droit">\
				<a class="sqli-mantis-generator-switch" id="sqli-mantis-generator-settings-button" href="#1" title="Paramètres Auto-Tags">[Paramètres Auto-Tags]</a>\
			</td>');

			//adding settings popup
			jQuery('body').append(
				'<div class="sqli-mantis-generator-settings-popup" id="sqli-mantis-generator-settings-layer"></div>\
				<div class="sqli-mantis-generator-settings-popup" id="sqli-mantis-generator-settings-main-container">\
					<form id="sqli-mantis-generator-settings-container">\
						<p><strong>Mantis Tag Generator</strong></p>\
						<p>Pour chacun de vos projets, vous pouvez configurer 3 tags mantis différents dans le champ "Pattern JSON" : 2 tags de code (début/fin) et un tag SVN</p>\
						<p>Des balises permettent d\'en dynamiser l\'affichage : certaines font référence à des informations générées à la volée (jour/mois/année), d\'autres à des informations récupérées sur la page courante (code projet, numéro/titre mantis) et enfin le trigramme qui doit être saisi manuellement ci-dessous.</p>\
						<p>Lors de l\'affichage d\'une mantis, si le code projet de la mantis affichée fait partie des patterns JSON, le script collectera les valeurs des balises souhaitées et génerera les tags pour les afficher dans la partie haute du site.</p>\
						<p>\
							<textarea required="required" placeholder="Tags (voir l\'exemple ci-dessous)" id="sqli-mantis-generator-settings-pattern">' + this.pattern + '</textarea><label for="sqli-mantis-generator-settings-pattern">JSON Pattern</label>\
						</p>\
						<p>\
							<input placeholder="Trigramme" type="text" id="sqli-mantis-generator-settings-trigram" value="' + this.trigram + '" /><label for="sqli-mantis-generator-settings-trigram">Trigramme</label>\
						</p>\
						<p>\
							<input type="submit" id="sqli-mantis-generator-settings-save" />\
						</p>\
						<div id="legend">\
							<div class="box-left">\
								<p><strong>Balises autorisées : </strong><br />\
									<ul>\
										<li>{{title}} : Résumé de la mantis affichée à l\'écran</li>\
										<li>{{number}} : ID de la mantis affichée à l\'écran</li>\
										<li>{{day}} : Numéro du jour du mois (dd)</li>\
										<li>{{month}} : Numéro du mois de l\'année (mm)</li>\
										<li>{{year}} : Année (YYYY)</li>\
										<li>{{trigram}} : Trigramme collab</li>\
										<li>{{project}} : Code Projet de la mantis affichée à l\'écran</li>\
									</ul>\
								</p>\
							</div>\
							<div class="box-right">\
								<p>\
								  <strong>Exemple : </strong><br />\
								  <pre>\
	{<br />\
	  "OUE1186": {<br />\
		"start" : "// {{day}}/{{month}}/{{year}} - SQLI-{{trigram}} - MANTIS-{{number}} : {{title}}",<br />\
		"end"   : "// End // {{day}}/{{month}}/{{year}} - SQLI-{{trigram}} - MANTIS-{{number}} : {{title}}",<br />\
		"svn"   : "MANTIS-{{number}} : {{title}}"<br />\
	  },<br />\
	  "OUE993": {<br />\
		"start" : "// {{day}}/{{month}}/{{year}} <<< SQLI-{{trigram}} <<< MANTIS-{{number}} : {{title}}",<br />\
		"end"   : "// End // {{day}}/{{month}}/{{year}} >>> SQLI-{{trigram}} >>> MANTIS-{{number}} : {{title}}",<br />\
		"svn"   : "MANTIS-{{number}} : {{title}}"<br />\
	  }<br />\
	}<br />\
								</pre>\
								</p>\
							</div>\
						</div>\
					</form>\
				</div>');

			//adding events to the settings popup
			var popup = jQuery('.sqli-mantis-generator-settings-popup');
			jQuery('#sqli-mantis-generator-settings-button').click(function(){
				popup.fadeIn();
			});
			jQuery('#sqli-mantis-generator-settings-layer').click(function(){
				popup.fadeOut();
			})
			
			var _this = this;
			//adding events to the settings popup save button
			jQuery('#sqli-mantis-generator-settings-container').submit(function(){
				setTimeout(function() { //workaround for GM access violation while using events
					if (_this.saveSettings(
						jQuery('input#sqli-mantis-generator-settings-trigram').val(),
						jQuery('textarea#sqli-mantis-generator-settings-pattern').val()
					)) {
						popup.fadeOut();
					}
				}, 0);
				return false; //don't refresh page
			});
		   
			//selecting container
			var container = jQuery('table.width_filter').css('margin-bottom','10px');
		   
			//adding customs HTML
			container.after('<div class="sqli-mantis-generator-tag"><label for="start-tag"> [SVN tag] </label><input readonly="readonly" onclick="select();" onfocus="select();" type="text" id="svn-tag" value="" placeholder="Code projet non reconnu" /></p>');
			container.after('<div class="sqli-mantis-generator-tag"><label for="end-tag"> [End tag] </label><input readonly="readonly" onclick="select();" onfocus="select();" type="text" id="end-tag" value="" placeholder="Code projet non reconnu"/></p>');
			container.after('<div class="sqli-mantis-generator-tag"><label for="start-tag"> [Start tag] </label><input readonly="readonly" onclick="select();" onfocus="select();" type="text" id="start-tag" value="" placeholder="Code projet non reconnu"/></p>');
		   
			if (this.trigram && this.pattern) {
				if (this.parseJson()) {
					this.refreshTags();
					this.fillInputs();
				}
			} else {
				jQuery('#sqli-mantis-generator-settings-button').trigger('click');
			}
		},
		parseJson: function() {
			try {
				this.patternArray = jQuery.parseJSON(this.pattern);
				jQuery.each(this.patternArray, function(index, pattern) {
					if (typeof(pattern['start']) == "undefined" || typeof(pattern['end']) == "undefined" || typeof(pattern['svn']) == "undefined") {
						throw('Veuillez respecter le format fourni en exemple.');
					}
				});
				return true;
			}
			catch (exception) {
				alert("JSON saisi invalide. " + exception);
				return false;
			}
		},
		saveSettings: function (trigram, pattern) {
			this.trigram = trigram;
			GM_setValue('trigram', this.trigram);
			this.placeholders["{{trigram}}"] = this.trigram;
			this.pattern = pattern;
			
			if (this.parseJson()) {
				
				GM_setValue('pattern', this.pattern);
				
				this.refreshTags();
				this.fillInputs();
								
				return true;
			}
			return false;			
		},
		isProjectReady: function() {
			return (this.patternArray[this.currentProjectCode]);
		},
		refreshTags: function() {
			if (this.isProjectReady()) {
				this.startTag = this.replacePlaceholders(this.patternArray[this.currentProjectCode]["start"]);
				this.endTag = this.replacePlaceholders(this.patternArray[this.currentProjectCode]["end"]);
				this.svnTag = this.replacePlaceholders(this.patternArray[this.currentProjectCode]["svn"]);
			} else {
				this.startTag = "";
				this.endTag = "";
				this.svnTag = "";
			}
		},
		replacePlaceholders: function (value) {
			jQuery.each(this.placeholders, function(placeholder, replacement) {
				regexp = new RegExp(placeholder);
				value = value.replace(regexp, replacement);
			});
			return value;
		},
		fillInputs: function() {
			jQuery('input#start-tag').val(this.startTag);
			jQuery('input#end-tag').val(this.endTag);
			jQuery('input#svn-tag').val(this.svnTag);
		},
		addGlobalStyle: function (css) {
			var head, style;
			head = document.getElementsByTagName('head')[0];
			if (!head) { 
				return;
			}
			style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			head.appendChild(style);
		}
	}
	
	// chrome localStorage support
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		this.GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
	}

	MantisGenerator.init();
});
