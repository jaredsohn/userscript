/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            US Language
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://jervw.freehostia.com/articles/art006/US_language.html
// @description     Part 2 of US Framework
// @description     Translate strings according to a language.
// @description     US Updater v2 Beta
// @copyright       2007 - 2008 Jerone
// @version         v2 Beta
// @versiontext     Cleaned up code a lot, added support for language and country codes (xx-XX), fixed bug with replacement string, updated browser language detection and updated US Update text.
// @browser         FF3
// @include         *
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Usage Instructions
// - Default Settings
// - User Script
// - Framework Check
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// [+] = added; [-] = removed; [/] = fixed; [*] = updated;
// - 02-05-2008 15:00 [v1.0 Alpha]:
//   [+] initial release;
// - 04-05-2008 18:00 [v1.1 Beta]:
//   [*] cleaned up code;
//   [+] added instructions;
// - 18-05-2008 18:00 [v1.1.1 Beta]:
//   [*] fixed wrongly usage instructions example;
// - 20-05-2008 12:00 [v1.1.2 Beta]:
//   [*] updated some translations;
// - 30-05-2008 18:00 [v1.2 Beta]:
//   [/] fixed framework check;
// - 03-06-2008 14:00 [v1.3 Beta]:
//   [/] fixed bug with new language;
// - 08-08-2008 16:00 [v1.4 Beta]:
//   [*] cleaned up code;
//   [+] added current language detection;
// - 17-08-2008 14:00 [v1.4.1 Beta]:
//   [+] added new translations;
// - 19-08-2008 16:30 [v1.4.2 Beta]:
//   [+] added new translations;
// - 23-09-2008 16:00 [v1.4.3 Beta];
//   [/] fixed bug with new locals without locals in this script;
//   [+] added new translations;
//   [+] added Spanish translation;
// - 23-09-2008 20:30 [v1.4.4 Beta];
//   [*] updated Spanish translation;
// - 21-11-2008 21:30 [v1.4.5 Beta];
//   [/] fixed small bug in framework check;
// - 10-01-2009 17:30 [v2 Beta];
//   [+] added support for language and country codes (xx-XX);
//   [/] fixed bug with replacement string;
//   [*] updated browser language detection;
//   [*] cleaned up code;
//   [*] updated US Update text;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - option to maximize number of characters to a string;
// - solution for capitalization;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script is part of a framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** USAGE INSTRUCTIONS ***//
// LANGUAGE SCRIPT
// This script lets you return a translated version of a needed string.
// Translate strings in different languages, choose which language you want to use and import that string in your script.
// There's also an option to use the browser/navigator language. If an translation string doesn't exist it will return the default string.
// Add the following code to your script and fill the correct information in, like below:
//  (please note the special characters and there places, like: ,"'(){}:; etc...)
/*\
	language = new US.language({
		langMod: "browser",				// ["browser"/"navigator"] browser/navigator language;
										// [String LANGUAGE SHORT] specified language;
		locals : {						// [Object] include new translations (optional):
			'en' : {						// [Object Language {String LANGUAGE SHORT : Object Group},{String LANGUAGE SHORT : Object Group},...] language name 1:
				'test1' : {						// [Object Group {String : Object Translation},{String : Object Translation},...] group name 1:
					'test1a' : 'test1a',			// [Object Translation {String : String},{String : String},...] translation string 1;
					'test1b' : 'test1b',			// [Object Translation {String : String},{String : String},...] translation string 2;
				},
				'test2' : {						// [Object Group {String : Object Translation},{String : Object Translation},...] group name 2:
					'test2a' : 'test2a',			// [Object Translation {String : String},{String : String},...] translation string 1;
					'test2b' : 'test2b',			// [Object Translation {String : String},{String : String},...] translation string 2;
			}},
			'nl-NL' : {						// [Object Language {String LANGUAGE SHORT : Object Group},{String LANGUAGE SHORT : Object Group},...] language name 2:
				'test1' : {						// [Object Group {String : Object Translation},{String : Object Translation},...] group name 1:
					'test1a' : 'test1a',			// [Object Translation {String : String},{String : String},...] translation string 1;
					'test1b' : 'test1b',			// [Object Translation {String : String},{String : String},...] translation string 2;
				},
				'test2' : {						// [Object Group {String : Object Translation},{String : Object Translation},...] group name 2:
					'test2a' : 'test2a',			// [Object Translation {String : String},{String : String},...] translation string 1;
					'test2b' : 'test2b',			// [Object Translation {String : String},{String : String},...] translation string 2;
	}}}});
\*/
// Note: newly added translations/locals are only available in other scripts when they are lower in the tree!
////////////////////////////////////////////////////////////////////////////
// LOCALISE STRING
// Add the following code to your script where you want the translated string be placed:
// (the word 'language' needs to be the same as above used, but can be anything) 
/*\
	language.localise([					// [Array [String,String,...]] referred object names:
						'common',			// [String] group name;
						'languageLong']		// [String] translation string;
	);
\*/
// I suggest you use this code: language.localise(['common','languageLong']);
////////////////////////////////////////////////////////////////////////////
// LOCALIZE REPLACEMENT STRING
// In addition to the above code you can insert some variables into a string.
// An example of such a string: "Update @1@ with version @version@ to version @3@?";
// (the word 'language' needs to be the same as above used, but can be anything) 
/*\
	language.localise([					// [Array [String,String,...]] referred object names:
						'USU',				// [String] group name;
						'upDate']			// [String] translation string;
					  ,{				// [Object {String : String},{String : String},...] add replacements strings (optional):
						'1' :				// [String] refers to @1@;
						'script 1',			// [String] replacement string;
						'version' :			// [String] refers to @version@;
						'v2 Beta'}			// [String] replacement string;
	);
\*/
// I suggest you use this code: language.localise(['USU','upDate'],{'1':'script 1','version':'v2 Beta'});
// Note: the 3rd replacement string in above example wasn't filled-in,
//  so that stromg stays: "Update script 1 with version v2 Beta to version @3@?";
////////////////////////////////////////////////////////////////////////////
// ALL LANGUAGES
// If you want to show all languages available add the following code:
// (the word 'language' needs to be the same as above used, but can be anything) 
/*\
	language.all();						// returns array of all object languages available;
\*/
////////////////////////////////////////////////////////////////////////////
// CURRENT LANGUAGE
// If you want to know the language that is used add the following code:
// (the word 'language' needs to be the same as above used, but can be anything) 
/*\
	language.current();					// returns string of current used languages;
\*/
////////////////////////////////////////////////////////////////////////////



//*** DEFAULT SETTINGS ***//
const USLlangModDefault		= "en";		// [String LANGUAGE SHORT] default language;



//*** USER SCRIPT ***//
window.US_language = function(data){
	if(data)this.init(data);
};
US_language.prototype = {
	language : this.default,
	default : (typeof(USLlangModDefault)=="string"?USLlangModDefault:"en").toLowerCase(),
	init : function(data){
		var tempLang = this.default;
		if(typeof(USLlangModOverRide)=="string" && USLlangModOverRide!=null && USLlangModOverRide!=""){
			tempLang = USLlangModOverRide.toLowerCase();
		}
		else if(typeof(data.langMod)=="string" && data.langMod!=null && data.langMod!=""){
			tempLang = data.langMod.toLowerCase();
		}

		if(tempLang=='navigator' || tempLang=='browser'){
			tempLang = (navigator.language ||			// All - Browser Localization;
						navigator.browserLanguage ||	// IE - Browser Localized Language;
						navigator.systemLanguage ||		// IE - Windows OS - Localized Language;
						navigator.userLanguage ||		// IE - Windows OS - Regional Settings;
						this.default).toLowerCase();
		}
		
		if(data.locals){
			for(var lang in data.locals){
				for(var key in data.locals[lang]){
					if(!this.locals[lang.toLowerCase()]){
						this.locals[lang.toLowerCase()] = data.locals[lang];
					}
					this.locals[lang.toLowerCase()][key] = data.locals[lang][key];
		}	}	}
		
		if(this.locals.hasOwnProperty(tempLang) || tempLang in this.locals){  // en->en | en-GB->en-GB;
			this.language = tempLang;
		}
		else if(/^[a-zA-Z]{2}\-[a-zA-Z]{2}$/.test(tempLang) && !!(temp=tempLang.split("-")[0]) && (this.locals.hasOwnProperty(temp) || temp in this.locals)){  // en-GB->en;
			this.language = tempLang.split("-")[0];
		}
		else if(!!check(tempLang)){  // en->en-GB;
			this.language = check(tempLang);
		}
		else this.language = this.default;  // en;
		
		function check(tempLang){
			for(var lang in data.locals){
				if(/^[a-zA-Z]{2}\-[a-zA-Z]{2}$/.test(lang) && lang.split("-")[0].toLowerCase()==tempLang){
					return lang.toLowerCase();
	}	}	}	},
	localise : function(string,params){
		if(this.language){
			var currentLang = this.locals[this.language];
			if(!currentLang){
				currentLang = this.locals[this.default];
			}
			
			var local = currentLang[string[0]];
			if(!local){
				local = this.locals[this.default][string[0]];
			} 
			if(!local){
				return 'ERROR, could not find: "'+string[0].toString()+'".';
			}
			
			local = local[string[1]];
			if(!local){
				local = this.locals[this.default][string[0]][string[1]];
			} 
			if(!local){
				return 'ERROR, could not find: "'+string.join(" -> ").toString()+'".';
			}

			if(params){
				while((matches=/@([^@]+)@/g.exec(local))){
					if(matches[1]){
						if(params[matches[1]]){
							local = local.replace(new RegExp('@'+matches[1]+'@','g'),params[matches[1]].toString());
			}	}	}	}
			return local;
		}
		else return undefined;
	},
	all : function(){
		var allLanguages=[];
		for(var lang in this.locals){
			allLanguages.push(lang);
		}
		return allLanguages;
	},
	current : function(){
		return this.language;
	},
	locals : {
		'en' : {
			'language' : {
				'languageShort'	: 'en',
				'languageLong'	: 'English',
				'translator'	: 'Jerone'},
			'common' : {
				'settings'		: 'Settings',
				'options'		: 'Options',
				'ok'			: 'OK',
				'apply'			: 'Apply',
				'cancel'		: 'Cancel',
				'reset'			: 'Reset',
				'add'			: 'Add',
				'remove'		: 'Remove',
				'edit'			: 'Edit',
				'up'			: 'Up',
				'down'			: 'Down',
				'left'			: 'Left',
				'right'			: 'Right',
				'unknown'		: 'Unknown'},
			'time' : {  // lowercase all:
				'millisecond'	: 'millisecond',	'milliseconds'	: 'milliseconds',
				'second'		: 'second',			'seconds'		: 'seconds',
				'minute'		: 'minute',			'minutes'		: 'minutes',
				'hour'			: 'hour',			'hours'			: 'hours',
				'day'			: 'day',			'days'			: 'days',
				'week'			: 'week',			'weeks'			: 'weeks',
				'year'			: 'year',			'years'			: 'years'},
			'USU' : {
				'notYetDefined'	: 'Not yet defined',
				'newUpdate'		: "A new version of @name@ is available!",
				'currentV'		: "Current version:\t@version@",  // \t is a tab;
				'publicV'		: "Public version:\t@version@",  // \t is a tab;
				'versiontext'	: "Version comment:",
				'updateNow'		: "Do you want to update?",
				'noUpdate'		: "You'll be informed again after @time@.",  // @time@ example: "2 minutes";
				'lower'			: 'is lower then',
				'equel'			: 'is equal to',
				'higher'		: 'is higher then',
				'this'			: 'this',
				'server'		: 'server',
				'unknown'		: 'unknown'}},
		'nl' : {
			'common' : {
				'languageShort'	: 'nl',
				'languageLong'	: 'Nederlands',
				'translator'	: 'Jerone'},
			'common' : {
				'settings'		: 'Instellingen',
				'options'		: 'Opties',
				'ok'			: 'OK',
				'apply'			: 'Toepassen',
				'cancel'		: 'Annuleren',
				'reset'			: 'Herstellen',
				'add'			: 'Toevoegen',
				'remove'		: 'Verwijderen',
				'edit'			: 'Bewerken',
				'up'			: 'Omhoog',
				'down'			: 'Omlaag',
				'left'			: 'Links',
				'right'			: 'Rechts',
				'unknown'		: 'Onbekend'},
			'time' : {
				'millisecond'	: 'milliseconde',	'milliseconds'	: 'milliseconden',
				'second'		: 'seconde',		'seconds'		: 'seconden',
				'minute'		: 'minuut',			'minutes'		: 'minuten',
				'hour'			: 'uur',			'hours'			: 'uren',
				'day'			: 'dag',			'days'			: 'dagen',
				'week'			: 'week',			'weeks'			: 'weken',
				'year'			: 'jaar',			'years'			: 'jaren'},
			'USU' : {
				'notYetDefined'	: 'Nog niet gespecificeerd',
				'newUpdate'		: "Een nieuwe versie van @name@ is beschikbaar!",
				'currentV'		: "Huidige versie:\t@version@",
				'publicV'		: "Publieke versie:\t@version@",
				'versiontext'	: "Versie commentaar:",
				'updateNow'		: "Wilt u nu updaten?",
				'noUpdate'		: "Je wordt opnieuw geïnformeerd na @time@.",
				'lower'			: 'is lager dan',
				'equel'			: 'is gelijk aan',
				'higher'		: 'is hoger dan',
				'this'			: 'deze',
				'server'		: 'server',
				'unknown'		: 'onbekend'}},
		'es' : {
			'language' : {
				'languageShort'	: 'es',
				'languageLong'	: 'Español',
				'translator'	: 'sanosuke'},
			'common' : {
				'settings'		: 'Configuracion',
				'options'		: 'Opciones',
				'ok'			: 'Aceptar',
				'apply'			: 'Aplicar',
				'cancel'		: 'Cancelar',
				'reset'			: 'Reiniciar',
				'add'			: 'Añadir',
				'remove'		: 'Quitar',
				'edit'			: 'Editar',
				'up'			: 'Arriba',
				'down'			: 'Abajo',
				'left'			: 'Izquierda',
				'right'			: 'Derecha',
				'unknown'		: 'Desconocido'},
			'time' : {
				'millisecond'	: 'milisegundo',	'milliseconds'	: 'milisegundos',
				'second'		: 'segundo',		'seconds'		: 'segundos',
				'minute'		: 'minuto',			'minutes'		: 'minutos',
				'hour'			: 'hora',			'hours'			: 'horas',
				'day'			: 'dia',			'days'			: 'dias',
				'week'			: 'semana',			'weeks'			: 'semanas',
				'year'			: 'año',			'years'			: 'años'},
			'USU' : {
				'notYetDefined'	: 'Aún no definido',
//				'newUpdate'		: "A new version of @name@ is available!",
//				'currentV'		: "Current version:\t@version@",  // \t is a tab;
//				'publicV'		: "Public version:\t@version@",  // \t is a tab;
//				'versiontext'	: "Version comment:",
//				'updateNow'		: "Do you want to update?",
//				'noUpdate'		: "You'll be informed again after @time@.",  // @time@ example: "2 minutes";
				'lower'			: 'es menor que',
				'equel'			: 'es igual a',
				'higher'		: 'es mayor que',
				'this'			: 'este',
				'server'		: 'servidor',
				'unknown'		: 'desconocido',
}	}	}	};



//*** FRAMEWORK CHECK ***//
window.US_languageOK="v2 Beta";
console.log('US Language ' + US_languageOK + ' correct imported!');



//*** STATISTICS ***//
// Chars (exclude spaces): 13.238
// Chars (include spaces): 16.251
// Chars (Chinese): 0
// Words: 2.035
// Lines: 410