// ==UserScript==
// @name	    Xtense-GM
// @version     2.5.6.1
// @author      OGSteam
// @namespace	xtense.ogsteam.fr
// @updateURL   http://userscripts.org/scripts/source/112690.meta.js
// @downloadURL https://userscripts.org/scripts/source/112690.user.js
// @include     http://*.ogame.*/game/index.php*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @description Cette extension permet d'envoyer des données du site Ogame à votre serveur OGSPY d'alliance
// ==/UserScript==

// Variables Xtense
var VERSION = "2.5.6.1";
var TYPE = "GM-";
var PLUGIN_REQUIRED = "2.5.0";
var callback = null;
var nomScript = 'Xtense';

var Xlang = {};
var XtenseLocales = { };

//Variables globales pour la mise à jour.
var start_time = (new Date()).getTime() /1000;
var freqMaj = 4 * 3600;

//Variables globales pour les status - Type d'erreur
var XLOG_WARNING = 1, XLOG_ERROR = 2, XLOG_NORMAL = 3, XLOG_SUCCESS = 4, XLOG_COMMENT = 5, XLOG_SEND = 6;


// Navigateurs
var isFirefox = (window.navigator.userAgent.indexOf('Firefox') > -1) ? true : false;
var isChrome = (window.navigator.userAgent.indexOf('Chrome') > -1) ? true : false;
var isOpera = (window.navigator.userAgent.indexOf('Opera') > -1) ? true : false;
var isTamper = false;

if(isFirefox){
	TYPE+="FF";
} else if(isChrome){
	TYPE+="GC";
}else if(isOpera){
    TYPE+="OP";
}

// Variables globales données ogame
var url = location.href;// Adresse en cours sur la barre d'outils
var urlUnivers = url.match(new RegExp('(.*)\/game'))[1];
var numUnivers = urlUnivers.match(new RegExp('s(.*)-fr.ogame'))[1];
var langUnivers = urlUnivers.match(new RegExp('-(.*).ogame'))[1];
var cookie = nomScript + "-" + numUnivers + "-";
var prefix_GMData = langUnivers + numUnivers +".";

/*********************** Compatibilité Chrome ***************************/
if (isChrome || isOpera){
    function GM_getValue(key,defaultVal) 
    {
        var retValue = localStorage.getItem(key);
        if ( !retValue ) 
        {
            return defaultVal;
        }
        return retValue;
    }

    function GM_setValue(key,value) 
    {
        localStorage.setItem(key, value);
    }    
    function GM_deleteValue(value)
    {
        localStorage.removeItem(value);
    }    
}
/********************** Fin Compatibilité Chrome ************************/

/***************************** Utilities ********************************/
/* Fonctions sur strings */
String.prototype.trim = function () {
	return this.replace(/^\s*/, '').replace(/\s*$/, '');
}
String.prototype.trimAll = function () {
	return this.replace(/\s*/g, '');
}
String.prototype.trimInt = function() {
	string = this.replace(/([^-\d])/g,'');
	return string ? parseInt(string) : 0;
}
String.prototype.trimZeros = function() {
	return this.replace(/^0+/g,'');
}
String.prototype.getInts = function (/*separator*/) {
	/*if(typeof separator!="undefined")reg=new Regexp("[0-9("+separator+")]+","g");
	else reg=new Regexp("[0-9("+separator+")]+","g");*/
	var v = this.match(/[0-9][0-9.]*/g);
	v.forEach(function (el, index, arr) { arr[index] = parseInt(el.replace(/\./g, '')); });
	return v;
}
// converti un nombre de la forme xxx.xxx.xxx en xxxxxxxxx
function parseNB(monText){
  return (monText.replace(/\./g,""));  
}

//Affichage des Logs dans Firebug
function log(message){
	if(GM_getValue(prefix_GMData +'debug.mode','false').toString() == 'true') { console.log(nomScript + " says : " + message); }
}
//Gestion de l'icone
function setStatus(type,message){
	var icone = XPath.getSingleNode(document,"//img[@id='xtense.icone']");
	if(icone!=null){
		if(type==XLOG_SUCCESS){
			if(document.getElementById('messagebox') || document.getElementById('combatreport')){
				icone.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAADeSURBVDhPnZLbDoIwDIa3GWGMxdPtTECdF+ID+2S+DVp3xLExSCD5Q2jXr3/LcCMf3afv32jFA+j7ROf2Dqt0sXUJQEgJg27SHBLXfyxulgDQC0EoDYtjBtpa+OQIviB042PewSxAKOshJC4OxzAORGPtJPOpcYxN9x7n3QiM70D9wbz0Tubyi8V+qTQLWuh+dH8l7yID0J1rJezy+VECAAsO6wLivnlwN1InkYPoIpkdTcU8CBMCWgubnssjoIwr1VBQBkVZDdoWJRCyGQljbPO0slB+OHVru/P9ofsBDq4pvQ3QWXEAAAAASUVORK5CYII%3D";
			} else { 	
				icone.src="data:image/gif;base64,R0lGODlhJgAdAPcAAAAAAAECAgYHCQYICQcICgcJCwcKCwkKCwkJDAkLDQkLDgkMDQoMDgoMDwoNEAsOEQwPEAwPEQ0PEgwQEg8SFQ8SFhATFhAUFxEVGBIVGRIWGRYaHhcbHxoeIhsfIxsgIxsgJBwgJBwgJR0hJh0iJx8kKR8lKiAjKACXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAmAB0AAAj/AP8JNCGioMGDCBOaEMiwocMSCSNKFGHig8OL/whO3HjwwwaMDTdwHCmCxEeQAkWSlEii4EmUGzogREGzpsGaKA6CEPESpMqCLQvaNHhCBE2dIHpi/Jnw6EGnBkEkRZly4lCjORGG4En13wYPB0c8zWp0otKLXzceJRvxrMMNTJteTcjBbUMCcPPqzUtzr98BXQEIHkx4cM3CiAMjLowTxeLBih8LdgyApmQAkR9Trmz5cWbEnSeHHhwAM1XJo0V7Pr04tejNhD9zxkmYdmLWiEtfXixbsO7dhbsOACAAOPCuChYkSF7AAIHn0CU/H3AAQdd/EyREiPDAgfcG4MMzJQDPwDuABxDSXxeoIcOFCxbiU5hPv8J8+xTsY8Cwvr///wCuFxAAOw==";
			}
		} else if(type==XLOG_NORMAL){
			if(document.getElementById('messagebox') || document.getElementById('combatreport')){
				icone.src="data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAEBAQACAAECAgICAwUGBwYHCQAIAAAKAAAMAAYICQYICggKCwgKDAoMDgARABsfJBsgJBsiJBskJBwgJBwgJQAm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAhyAP9VGEiwYEGBBhMqrDChoYQKEhoutEDRwoSKFipESEix4cWMGhNK6EgxIQSDGUEOpFDBAYCXMAFYiEmTZsUDNWtaeDAzZ0wLCF72rBmUogAACSj6xCizIswBA3zmbMBggYGrBQhoJRDAgAIA/6TS/BcQADs=";
			} else { 	
				icone.src="data:image/gif;base64,R0lGODlhJgAdAPcAAAAAAAECAgYHCQYICQcICgcJCwcKCwkKCwkJDAkLDQkLDgkMDQoMDgoMDwoNEAsOEQwPEAwPEQ0PEgwQEg8SFQ8SFhATFhAUFxEVGBIVGRIWGRYaHhcbHxoeIhsfIxsgIxsgJBwgJBwgJR0hJh0iJx8kKR8lKiAjKAAm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAmAB0AAAj/AP8JNCGioMGDCBOaEMiwocMSCSNKFGHig8OL/whO3HjwwwaMDTdwHCmCxEeQAkWSlEii4EmUGzogREGzpsGaKA6CEPESpMqCLQvaNHhCBE2dIHpi/Jnw6EGnBkEkRZly4lCjORGG4En13wYPB0c8zWp0otKLXzceJRvxrMMNTJteTcjBbUMCcPPqzUtzr98BXQEIHkx4cM3CiAMjLowTxeLBih8LdgyApmQAkR9Trmz5cWbEnSeHHhwAM1XJo0V7Pr04tejNhD9zxkmYdmLWiEtfXixbsO7dhbsOACAAOPCuChYkSF7AAIHn0CU/H3AAQdd/EyREiPDAgfcG4MMzJQDPwDuABxDSXxeoIcOFCxbiU5hPv8J8+xTsY8Cwvr///wCuFxAAOw==";
			}
		} else if(type==XLOG_WARNING){
			if(document.getElementById('messagebox') || document.getElementById('combatreport')){
				icone.src="data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAEBAQACAAECAgICAwUGBwYHCQAIAAAKAAAMAAYICQYICggKCwgKDAoMDgARABsfJBsgJBsiJBskJBwgJBwgJf+HBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAhyAP9VGEiwYEGBBhMqrDChoYQKEhoutEDRwoSKFipESEix4cWMGhNK6EgxIQSDGUEOpFDBAYCXMAFYiEmTZsUDNWtaeDAzZ0wLCF72rBmUogAACSj6xCizIswBA3zmbMBggYGrBQhoJRDAgAIA/6TS/BcQADs=";
			} else { 	
				icone.src="data:image/gif;base64,R0lGODlhJgAdAPcAAAAAAAECAgYHCQYICQcICgcJCwcKCwkKCwkJDAkLDQkLDgkMDQoMDgoMDwoNEAsOEQwPEAwPEQ0PEgwQEg8SFQ8SFhATFhAUFxEVGBIVGRIWGRYaHhcbHxoeIhsfIxsgIxsgJBwgJBwgJR0hJh0iJx8kKR8lKiAjKP+HBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAmAB0AAAj/AP8JNCGioMGDCBOaEMiwocMSCSNKFGHig8OL/whO3HjwwwaMDTdwHCmCxEeQAkWSlEii4EmUGzogREGzpsGaKA6CEPESpMqCLQvaNHhCBE2dIHpi/Jnw6EGnBkEkRZly4lCjORGG4En13wYPB0c8zWp0otKLXzceJRvxrMMNTJteTcjBbUMCcPPqzUtzr98BXQEIHkx4cM3CiAMjLowTxeLBih8LdgyApmQAkR9Trmz5cWbEnSeHHhwAM1XJo0V7Pr04tejNhD9zxkmYdmLWiEtfXixbsO7dhbsOACAAOPCuChYkSF7AAIHn0CU/H3AAQdd/EyREiPDAgfcG4MMzJQDPwDuABxDSXxeoIcOFCxbiU5hPv8J8+xTsY8Cwvr///wCuFxAAOw==";
			}
		} else if(type==XLOG_ERROR){
			if(document.getElementById('messagebox') || document.getElementById('combatreport')){
				icone.src="data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAEBAQACAAECAgICAwUGBwYHCQAIAAAKAAAMAAYICQYICggKCwgKDAoMDgARABsfJBsgJBsiJBskJBwgJBwgJf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAhyAP9VGEiwYEGBBhMqrDChoYQKEhoutEDRwoSKFipESEix4cWMGhNK6EgxIQSDGUEOpFDBAYCXMAFYiEmTZsUDNWtaeDAzZ0wLCF72rBmUogAACSj6xCizIswBA3zmbMBggYGrBQhoJRDAgAIA/6TS/BcQADs=";
			} else { 	
				icone.src="data:image/gif;base64,R0lGODlhJgAdAPcAAAAAAAECAgYHCQYICQcICgcJCwcKCwkKCwkJDAkLDQkLDgkMDQoMDgoMDwoNEAsOEQwPEAwPEQ0PEgwQEg8SFQ8SFhATFhAUFxEVGBIVGRIWGRYaHhcbHxoeIhsfIxsgIxsgJBwgJBwgJR0hJh0iJx8kKR8lKiAjKP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAmAB0AAAj/AP8JNCGioMGDCBOaEMiwocMSCSNKFGHig8OL/whO3HjwwwaMDTdwHCmCxEeQAkWSlEii4EmUGzogREGzpsGaKA6CEPESpMqCLQvaNHhCBE2dIHpi/Jnw6EGnBkEkRZly4lCjORGG4En13wYPB0c8zWp0otKLXzceJRvxrMMNTJteTcjBbUMCcPPqzUtzr98BXQEIHkx4cM3CiAMjLowTxeLBih8LdgyApmQAkR9Trmz5cWbEnSeHHhwAM1XJo0V7Pr04tejNhD9zxkmYdmLWiEtfXixbsO7dhbsOACAAOPCuChYkSF7AAIHn0CU/H3AAQdd/EyREiPDAgfcG4MMzJQDPwDuABxDSXxeoIcOFCxbiU5hPv8J8+xTsY8Cwvr///wCuFxAAOw==";
			}
		} else if(type==XLOG_SEND){	
			icone.src="data:image/gif;base64,R0lGODlhJgAdAPcAAAAAAAECAgYHCQYICQcICgcJCwcKCwkKCwkJDAkLDQkLDgkMDQoMDgoMDwoNEAsOEQwPEAwPEQ0PEgwQEg8SFQ8SFhATFhAUFxEVGBIVGRIWGRYaHhcbHxoeIhsfIxsgIxsgJBwgJBwgJR0hJh0iJx8kKR8lKiAjKDU4Oh57AyeAAymCCjOHCjaHCDuLDzOHFTSJGDaIGzyLED2MET+NEkCNEkGOE0KOFEOPFUaPGEmRG1GXIVeYKFubKV6fOlygPGKdMGOfMWSeMWWfMmagM2ihNGujN2miOW6jOG+lPXCmPl+hQ2KjRmalSGilRnSrT3yvVYGzWoCzYYK1Z4W2ZoW2aom4a4q4bIu5bYy5bY25bo66b5C8dJbBgJfCgpjCg57FiKHGiqLGi6THjKXIjajKkKrLkavLkqvMkqzMk63NlLDOlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAmAB0AAAj/AP8JNCGioMGDCBOaEMiwocMSCSNKFGHig8OL/whO3HjwwwaMDTdwHCmCxEeQAkWSlEii4EmUGzogREGzpsGaKA6CEPESpMqCLQvaNHhCBE2dIHpi/Jnw6EGnBkEkRZly4lCjORGG4En13wYPB0c8zWrUoBIhB5Ve/LrxKFkRR6LwMKjW4YYNSZAUAVKkLxEiQ4YIAUK4MBQzT3KI4FC3IYENRtaoMaOmcpo0aNCcMcO5cxkuYZy02DCgKwAAQdRssbKltRYtWbBcsUK7NhUpU778UAHANIAeZciEIUN8zBgxyMMoXw6mipcmL0773qEDhwsc2G/YqEFjhgwX4MH7lujCBMbp3lTPq1eP4nzN0yyWxFDve7379vfbr0hxPgB6lPbdZx9NAf4HUoEEDpjgevXl956DATaonn8FVihhfxVaSNUAAAiQ4YfndaXAAgmMWIABBKSoYoUpDnAAAl39M4EEEUTwgAM4NqDjjgzoyACOADwAwZAxCqRBBhdcYMGSFDTpZAVNQkkBlBhgUOSVWGapZZEBAQA7";
		}/* else {
			icone.src=urlIcone;
		}*/
		icone.title=message;
	} else {
		log(message);
	}
}//Fin Gestion de l'icone

//Requete Ajax
function Xajax(obj) {
    if(isOpera|| isChrome){
        
    xhr = new XMLHttpRequest();
	url = obj.url || '';
	post = obj.post || '';
    
    xhr.open("POST", url, true);
	//xhr.setRequestHeader('User-Agent', 'Xtense2');
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send(post);
    var response;
	
	xhr.onreadystatechange =  function() {
		if(xhr.readyState == 4) {
            handleResponse(xhr);
		}
	};

    }else{
          GM_xmlhttpRequest({
          method: "POST",
          url: obj.url || '',
          data: obj.post || '',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          onload: function(response) {
           handleResponse(response);
          }
        });
    }
}

// Récupère les messages de retours et locales
function Xl(name) {
		try {
			if (!Xlang[name]) {
				log('Unknow locale "'+name+'"');
				return '[Chaine non disponible]';
			}
			
			var locale = Xlang[name];
			for (var i = 1, len = arguments.length; i < len; i++) {
				locale = locale.replace('$'+i, arguments[i]);
			}
			return locale;
		} catch (e) { alert(e); return false; }
}
// Permet de connaitre les locales du jeu suivant la langue (FR,ENG, ...)
function l(id){
	return XtenseLocales[XtenseMetas.getLanguage()][id];
}
// Permet de récuper le time d'une date
function XtenseParseDate(dateString,handler) {
	var date = new Date();
	var m = dateString.match(new RegExp(handler.regexp));
	var time = new Date();
	if(m) {
		if(handler.fields.year!=-1)
			time.setYear(m[handler.fields.year]);
		if(handler.fields.month!=-1)
			time.setMonth(m[handler.fields.month]*1-1);
		//Xconsole('month:'+m[handler.fields.month]+'|'+parseInt(m[handler.fields.month].trimZeros()));
		if(handler.fields.day!=-1)
			time.setDate(m[handler.fields.day]);
		if(handler.fields.hour!=-1)
			time.setHours(m[handler.fields.hour]);
		if(handler.fields.min!=-1)
			time.setMinutes(m[handler.fields.min]);
		if(handler.fields.sec!=-1)
			time.setSeconds(m[handler.fields.sec]);
	}
	time =  Math.floor(time.getTime()/1000);//division par 1000 pour un timestamp php
	return time;
}
// Fonction SHA et MD5
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('l 3Q(w){l P(n,s){e 2w=(n<<s)|(n>>>(32-s));f 2w};l 2z(1w){e 1c="";e i;e 2d;e 1Y;J(i=0;i<=6;i+=2){2d=(1w>>>(i*4+4))&1X;1Y=(1w>>>(i*4))&1X;1c+=2d.1N(16)+1Y.1N(16)}f 1c};l 1a(1w){e 1c="";e i;e v;J(i=7;i>=0;i--){v=(1w>>>(i*4))&1X;1c+=v.1N(16)}f 1c};l 1K(q){q=q.2q(/\\r\\n/g,"\\n");e u="";J(e n=0;n<q.T;n++){e c=q.L(n);Y(c<X){u+=M.N(c)}1e Y((c>2k)&&(c<2r)){u+=M.N((c>>6)|2s);u+=M.N((c&1b)|X)}1e{u+=M.N((c>>12)|2t);u+=M.N(((c>>6)&1b)|X);u+=M.N((c&1b)|X)}}f u};e 1E;e i,j;e W=2o 1L(3B);e 1r=2i;e 1x=2j;e 1i=2f;e 1h=2g;e 1B=3F;e A,B,C,D,E;e K;w=1K(w);e O=w.T;e S=2o 1L();J(i=0;i<O-3;i+=4){j=w.L(i)<<24|w.L(i+1)<<16|w.L(i+2)<<8|w.L(i+3);S.1j(j)}3G(O%4){1Q 0:i=3T;1M;1Q 1:i=w.L(O-1)<<24|3r;1M;1Q 2:i=w.L(O-2)<<24|w.L(O-1)<<16|2F;1M;1Q 3:i=w.L(O-3)<<24|w.L(O-2)<<16|w.L(O-1)<<8|2n;1M}S.1j(i);2p((S.T%16)!=14)S.1j(0);S.1j(O>>>29);S.1j((O<<3)&R);J(1E=0;1E<S.T;1E+=16){J(i=0;i<16;i++)W[i]=S[1E+i];J(i=16;i<=2h;i++)W[i]=P(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);A=1r;B=1x;C=1i;D=1h;E=1B;J(i=0;i<=19;i++){K=(P(A,5)+((B&C)|(~B&D))+E+W[i]+3c)&R;E=D;D=C;C=P(B,30);B=A;A=K}J(i=20;i<=39;i++){K=(P(A,5)+(B^C^D)+E+W[i]+3s)&R;E=D;D=C;C=P(B,30);B=A;A=K}J(i=3U;i<=2N;i++){K=(P(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+2V)&R;E=D;D=C;C=P(B,30);B=A;A=K}J(i=2Y;i<=2h;i++){K=(P(A,5)+(B^C^D)+E+W[i]+2R)&R;E=D;D=C;C=P(B,30);B=A;A=K}1r=(1r+A)&R;1x=(1x+B)&R;1i=(1i+C)&R;1h=(1h+D)&R;1B=(1B+E)&R}e K=1a(1r)+1a(1x)+1a(1i)+1a(1h)+1a(1B);f K.2v()}l 33(q){l 1v(1z,2c){f(1z<<2c)|(1z>>>(32-2c))}l h(1W,1U){e 1V,1T,1d,1f,18;1d=(1W&2a);1f=(1U&2a);1V=(1W&1O);1T=(1U&1O);18=(1W&2u)+(1U&2u);Y(1V&1T){f(18^2a^1d^1f)}Y(1V|1T){Y(18&1O){f(18^3a^1d^1f)}1e{f(18^1O^1d^1f)}}1e{f(18^1d^1f)}}l F(x,y,z){f(x&y)|((~x)&z)}l G(x,y,z){f(x&z)|(y&(~z))}l H(x,y,z){f(x^y^z)}l I(x,y,z){f(y^(x|(~z)))}l o(a,b,c,d,x,s,U){a=h(a,h(h(F(b,c,d),x),U));f h(1v(a,s),b)};l t(a,b,c,d,x,s,U){a=h(a,h(h(G(b,c,d),x),U));f h(1v(a,s),b)};l m(a,b,c,d,x,s,U){a=h(a,h(h(H(b,c,d),x),U));f h(1v(a,s),b)};l p(a,b,c,d,x,s,U){a=h(a,h(h(I(b,c,d),x),U));f h(1v(a,s),b)};l 2e(q){e Z;e 1C=q.T;e 26=1C+8;e 2m=(26-(26%2l))/2l;e 1P=(2m+1)*16;e V=1L(1P-1);e 1y=0;e Q=0;2p(Q<1C){Z=(Q-(Q%4))/4;1y=(Q%4)*8;V[Z]=(V[Z]|(q.L(Q)<<1y));Q++}Z=(Q-(Q%4))/4;1y=(Q%4)*8;V[Z]=V[Z]|(2n<<1y);V[1P-2]=1C<<3;V[1P-1]=1C>>>29;f V};l 1q(1z){e 1S="",1R="",27,1t;J(1t=0;1t<=3;1t++){27=(1z>>>(1t*8))&3u;1R="0"+27.1N(16);1S=1S+1R.3w(1R.T-2,2)}f 1S};l 1K(q){q=q.2q(/\\r\\n/g,"\\n");e u="";J(e n=0;n<q.T;n++){e c=q.L(n);Y(c<X){u+=M.N(c)}1e Y((c>2k)&&(c<2r)){u+=M.N((c>>6)|2s);u+=M.N((c&1b)|X)}1e{u+=M.N((c>>12)|2t);u+=M.N(((c>>6)&1b)|X);u+=M.N((c&1b)|X)}}f u};e x=1L();e k,2b,1Z,25,28,a,b,c,d;e 1o=7,1m=12,1n=17,1p=22;e 1I=5,1J=9,1k=14,1u=20;e 1g=4,1A=11,1F=16,1D=23;e 1s=6,1l=10,1G=15,1H=21;q=1K(q);x=2e(q);a=2i;b=2j;c=2f;d=2g;J(k=0;k<x.T;k+=16){2b=a;1Z=b;25=c;28=d;a=o(a,b,c,d,x[k+0],1o,2B);d=o(d,a,b,c,x[k+1],1m,2C);c=o(c,d,a,b,x[k+2],1n,2E);b=o(b,c,d,a,x[k+3],1p,2G);a=o(a,b,c,d,x[k+4],1o,2H);d=o(d,a,b,c,x[k+5],1m,2I);c=o(c,d,a,b,x[k+6],1n,2K);b=o(b,c,d,a,x[k+7],1p,2L);a=o(a,b,c,d,x[k+8],1o,3j);d=o(d,a,b,c,x[k+9],1m,3k);c=o(c,d,a,b,x[k+10],1n,2O);b=o(b,c,d,a,x[k+11],1p,2P);a=o(a,b,c,d,x[k+12],1o,2U);d=o(d,a,b,c,x[k+13],1m,2T);c=o(c,d,a,b,x[k+14],1n,2W);b=o(b,c,d,a,x[k+15],1p,31);a=t(a,b,c,d,x[k+1],1I,34);d=t(d,a,b,c,x[k+6],1J,35);c=t(c,d,a,b,x[k+11],1k,36);b=t(b,c,d,a,x[k+0],1u,38);a=t(a,b,c,d,x[k+5],1I,3b);d=t(d,a,b,c,x[k+10],1J,3d);c=t(c,d,a,b,x[k+15],1k,3e);b=t(b,c,d,a,x[k+4],1u,3g);a=t(a,b,c,d,x[k+9],1I,3i);d=t(d,a,b,c,x[k+14],1J,3l);c=t(c,d,a,b,x[k+3],1k,3m);b=t(b,c,d,a,x[k+8],1u,3n);a=t(a,b,c,d,x[k+13],1I,3o);d=t(d,a,b,c,x[k+2],1J,3q);c=t(c,d,a,b,x[k+7],1k,3t);b=t(b,c,d,a,x[k+12],1u,3x);a=m(a,b,c,d,x[k+5],1g,3y);d=m(d,a,b,c,x[k+8],1A,3z);c=m(c,d,a,b,x[k+11],1F,3C);b=m(b,c,d,a,x[k+14],1D,3E);a=m(a,b,c,d,x[k+1],1g,3H);d=m(d,a,b,c,x[k+4],1A,3I);c=m(c,d,a,b,x[k+7],1F,3K);b=m(b,c,d,a,x[k+10],1D,3L);a=m(a,b,c,d,x[k+13],1g,3M);d=m(d,a,b,c,x[k+0],1A,3N);c=m(c,d,a,b,x[k+3],1F,3P);b=m(b,c,d,a,x[k+6],1D,3S);a=m(a,b,c,d,x[k+9],1g,2x);d=m(d,a,b,c,x[k+12],1A,2A);c=m(c,d,a,b,x[k+15],1F,2D);b=m(b,c,d,a,x[k+2],1D,2M);a=p(a,b,c,d,x[k+0],1s,2Q);d=p(d,a,b,c,x[k+7],1l,2S);c=p(c,d,a,b,x[k+14],1G,2Z);b=p(b,c,d,a,x[k+5],1H,37);a=p(a,b,c,d,x[k+12],1s,3f);d=p(d,a,b,c,x[k+3],1l,3D);c=p(c,d,a,b,x[k+10],1G,3p);b=p(b,c,d,a,x[k+1],1H,3v);a=p(a,b,c,d,x[k+8],1s,3A);d=p(d,a,b,c,x[k+15],1l,3J);c=p(c,d,a,b,x[k+6],1G,3O);b=p(b,c,d,a,x[k+13],1H,2y);a=p(a,b,c,d,x[k+4],1s,2J);d=p(d,a,b,c,x[k+11],1l,2X);c=p(c,d,a,b,x[k+2],1G,3h);b=p(b,c,d,a,x[k+9],1H,3R);a=h(a,2b);b=h(b,1Z);c=h(c,25);d=h(d,28)}e K=1q(a)+1q(b)+1q(c)+1q(d);f K.2v()}',62,243,'||||||||||||||var|return||AddUnsigned||||function|HH||FF|II|string|||GG|utftext||msg|||||||||||||for|temp|charCodeAt|String|fromCharCode|msg_len|rotate_left|lByteCount|0x0ffffffff|word_array|length|ac|lWordArray||128|if|lWordCount|||||||||lResult||cvt_hex|63|str|lX8|else|lY8|S31|H3|H2|push|S23|S42|S12|S13|S11|S14|WordToHex|H0|S41|lCount|S24|RotateLeft|val|H1|lBytePosition|lValue|S32|H4|lMessageLength|S34|blockstart|S33|S43|S44|S21|S22|Utf8Encode|Array|break|toString|0x40000000|lNumberOfWords|case|WordToHexValue_temp|WordToHexValue|lY4|lY|lX4|lX|0x0f|vl|BB||||||CC|lNumberOfWords_temp1|lByte|DD||0x80000000|AA|iShiftBits|vh|ConvertToWordArray|0x98BADCFE|0x10325476|79|0x67452301|0xEFCDAB89|127|64|lNumberOfWords_temp2|0x80|new|while|replace|2048|192|224|0x3FFFFFFF|toLowerCase|t4|0xD9D4D039|0x4E0811A1|lsb_hex|0xE6DB99E5|0xD76AA478|0xE8C7B756|0x1FA27CF8|0x242070DB|0x08000|0xC1BDCEEE|0xF57C0FAF|0x4787C62A|0xF7537E82|0xA8304613|0xFD469501|0xC4AC5665|59|0xFFFF5BB1|0x895CD7BE|0xF4292244|0xCA62C1D6|0x432AFF97|0xFD987193|0x6B901122|0x8F1BBCDC|0xA679438E|0xBD3AF235|60|0xAB9423A7||0x49B40821||MD5|0xF61E2562|0xC040B340|0x265E5A51|0xFC93A039|0xE9B6C7AA||0xC0000000|0xD62F105D|0x5A827999|0x2441453|0xD8A1E681|0x655B59C3|0xE7D3FBC8|0x2AD7D2BB|0x21E1CDE6|0x698098D8|0x8B44F7AF|0xC33707D6|0xF4D50D87|0x455A14ED|0xA9E3E905|0xFFEFF47D|0xFCEFA3F8|0x0800000|0x6ED9EBA1|0x676F02D9|255|0x85845DD1|substr|0x8D2A4C8A|0xFFFA3942|0x8771F681|0x6FA87E4F|80|0x6D9D6122|0x8F0CCC92|0xFDE5380C|0xC3D2E1F0|switch|0xA4BEEA44|0x4BDECFA9|0xFE2CE6E0|0xF6BB4B60|0xBEBFBC70|0x289B7EC6|0xEAA127FA|0xA3014314|0xD4EF3085|SHA1|0xEB86D391|0x4881D05|0x080000000|40'.split('|'),0,{}))
//Fonction pour récupérer les nodes par nom de classe : http://www.developpez.net/forums/d620166/webmasters-developpement-web/javascript/dom-javascript-getelement-class/
function getElementByAttr(e,attr,value)
{
	var tab = [];
	if (e.getAttribute && e.getAttribute(attr)==value)
	  tab.push(e);
 
	var n = e.firstChild;
	if (n==null || typeof n=='undefined') return tab;
	do
	{
	  var tab2 = getElementByAttr(n,attr,value);
		tab = tab.concat(tab2);
	}while((n = n.nextSibling)!=null)
	return tab;
}
/************************** Fin Utilities *******************************/

/******************************* Main ***********************************/

initOGSpyCommunication();
initParsers();
initLocales();    
displayXtense();
setStatus(XLOG_NORMAL,Xl('Xtense_activated'));
handle_current_page();
//exit !!
/***************************** Fin Main *********************************/

/************************ Gestion des pages *****************************/

function handle_current_page(){
	// Expressions régulières des pages
	var regGalaxy = new RegExp(/(galaxy)/);
	var regOverview = new RegExp(/(overview)/);
	var regOption = new RegExp(/(xtense=Options)/);
	var regResearch = new RegExp(/(research)/);
	var regBuildings = new RegExp(/(resources)/);
	var regStation = new RegExp(/(station)/);
	var regShipyard = new RegExp(/(shipyard)/);
	var regFleet1 = new RegExp(/(fleet1)/);
	var regDefense = new RegExp(/(defense)/);
	var regMessages = new RegExp(/(messages)/);
	var regAlliance = new RegExp(/(alliance)/);
	var regStats = new RegExp(/(highscore)/);
	
	if(regOption.test(url)){ displayOptions();}
	else if(regGalaxy.test(url))  	{ if(GM_getValue(prefix_GMData +'handle.system','false').toString() == 'true'|| GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){GM_setValue(prefix_GMData +'lastAction','');get_galaxycontent();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regOverview.test(url))	{ save_my_planets_coords(); if(GM_getValue(prefix_GMData +'handle.overview','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){get_planet_details();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regResearch.test(url))	{ if(GM_getValue(prefix_GMData +'handle.researchs','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){parse_researchs();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regBuildings.test(url))	{ if(GM_getValue(prefix_GMData +'handle.buildings','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){parse_buildings();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regStation.test(url))	{ if(GM_getValue(prefix_GMData +'handle.station','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){parse_station();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regShipyard.test(url) || regFleet1.test(url))	{ if(GM_getValue(prefix_GMData +'handle.shipyard','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){parse_shipyard();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regDefense.test(url))	{ if(GM_getValue(prefix_GMData +'handle.defense','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){parse_defense();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regMessages.test(url))	{ if(GM_getValue(prefix_GMData +'handle.msg.msg','false').toString() == 'true' ||
                                        GM_getValue(prefix_GMData +'handle.msg.ally','false').toString() == 'true' ||
                                        GM_getValue(prefix_GMData +'handle.msg.spy','false').toString() == 'true' ||
                                        GM_getValue(prefix_GMData +'handle.msg.ennemy.spy','false').toString() == 'true' ||
                                        GM_getValue(prefix_GMData +'handle.msg.rc.cdr','false').toString() == 'true' ||
                                        GM_getValue(prefix_GMData +'handle.msg.expeditions','false').toString() == 'true' ||
                                        GM_getValue(prefix_GMData +'handle.msg.commerce','false').toString() == 'true' 
                                        ){get_message_content();}} 
	else if(regAlliance.test(url))	{ if(GM_getValue(prefix_GMData +'handle.alliance','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){GM_setValue(prefix_GMData +'lastAction','');get_ally_content();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }}
	else if(regStats.test(url))	{ if(GM_getValue(prefix_GMData +'handle.stats','false').toString() == 'true' || GM_getValue(prefix_GMData +'manual.send','false').toString() == 'true'){GM_setValue(prefix_GMData +'lastAction','');get_ranking_content();GM_setValue(prefix_GMData +'manual.send','false');} else { manual_send(); }} 
	else { setStatus(XLOG_NORMAL,Xl('unknow_page'));}
}

/************************ PARSINGS DES PAGES  ***************************/

/* Fonction appelée lors d'évenement sur le chargement du contenu galaxie */
function parse_galaxy_system_inserted(event){
	log("In parse_galaxy_system_inserted()");
	//var doc = event.target.ownerDocument;
	var paths = XtenseXpaths.galaxy; //Référence Xpaths
	var galaxy = XPath.getSingleNode(document, paths.galaxy_input).value.trim(); //Récupération Galaxie
	var system = XPath.getSingleNode(document, paths.system_input).value.trim(); //Récupération SS
	var rows = XPath.getUnorderedSnapshotNodes(document,paths.rows);
	
	//log("lastAction : "+GM_getValue(prefix_GMData +'lastAction',''));
	if (GM_getValue(prefix_GMData +'lastAction','') != 's:'+galaxy+':'+system){
		var coords = [galaxy, system];
		if (isNaN(coords[0]) || isNaN(coords[1])) {
			log('invalid system'+' '+coords[0]+' '+coords[1]);
			return;
		}
		setStatus(XLOG_NORMAL,Xl('system_detected',coords[0],coords[1]));
		if(rows.snapshotLength > 0) {
			//var XtenseRequest = new XtenseRequest(null, null, null);
			log(rows.snapshotLength+' rows found in galaxy');
			var rowsData = [];
			for (var i = 0; i < rows.snapshotLength ; i++) {
				var row = rows.snapshotItem(i);
				
				var name = XPath.getStringValue(document,paths.planetname,row).trim().replace(/\($/,'');
				var name_l = XPath.getStringValue(document,paths.planetname_1,row).trim().replace(/\($/,'');
				var name_tooltip = XPath.getStringValue(document,paths.planetname_tooltip,row).trim().replace(/\($/,'');
				var player = XPath.getStringValue(document, paths.playername,row).trim();
				var player2 = XPath.getStringValue(document,paths.playername2,row).trim();
				var player_tooltip = XPath.getStringValue(document,paths.playername_tooltip,row).trim();
				
				if (player_tooltip == '') {
					if (player == '') {
						if (player2 == '') {
							log('row ' + (i + 1) + ' has no player name');
							continue;
						} else
							player = player2;
					}
				} else
					player = player_tooltip;
				if (name_tooltip == '') {
					if (name == '') {
						if (name_l == '') {
							log('row ' + (i + 1) + ' has no planet name');
							continue;
						} else
							name = name_l;
					}
				} else
					name = name_tooltip;
				
				//var position = i+1;
				var position = XPath.getNumberValue(document,paths.position,row);
				if(isNaN(position)) {
					log('position '+position+' is not a number');
					continue;
				}
	
				var moon = XPath.getUnorderedSnapshotNodes(document,paths.moon,row);
				moon = moon.snapshotLength > 0 ? 1 : 0;
                
                var statusNodes = XPath.getUnorderedSnapshotNodes(document,paths.status,row);
				var status="";
					if(statusNodes.snapshotLength>0){
						for (var j = 0; j < statusNodes.snapshotLength ; j++) {
							status+=statusNodes.snapshotItem(j).textContent.trimAll();
						}
					} else {
						 status = "";
					}
				var banned = XPath.getStringValue(document,paths.status_baned,row).trim();
				status=banned+status;
                                
				var activity = XPath.getStringValue(document,paths.activity,row).trim();
				if(!activity) {
					activity = (XPath.getStringValue(document, paths.activity15, row) ? 0 : -1); //If contains 'minutes15' in class
				}
				
				var activityMoon = XPath.getStringValue(document, paths.activity_m, row).trim();
				if(!activityMoon) {
					activityMoon = (XPath.getStringValue(document, paths.activity15_m, row) ? 0 : -1); //If contains 'minutes15' in class
				}
                
				var allytag = XPath.getStringValue(document,paths.allytag,row).trim();
				var debris = [];
				for(var j = 0; j < 2; j++) {
					debris[XtenseDatabase['resources'][601+j]] = 0;
				}
				var debrisCells = XPath.getUnorderedSnapshotNodes(document,paths.debris,row);
				for (var j = 0; j < debrisCells.snapshotLength ; j++) {
					debris[XtenseDatabase['resources'][601+j]] = debrisCells.snapshotItem(j).innerHTML.trimInt();
				}
				
				var player_id = XPath.getStringValue(document,paths.player_id,row).trim();
				if (player_id != '' ) {
					player_id = player_id.match(/\&to\=(.*)\&ajax/);
					player_id = player_id[1];
				//} else if(doc.cookie.match(/login_(.*)=U_/)){
				} else if(player){
					//player_id = doc.cookie.match(/login_(.*)=U_/)[1];
					player_id = XtenseMetas.getPlayerId();  
				}
				
                var allyid = XPath.getStringValue(document,paths.ally_id,row).trim();
				if (allyid != '' ) {
					allyid = allyid.match(/allianceId\=(.*)/);
					allyid = allyid[1];
				}
				else {
					allyid = '0';
				}
				
				var planet_id = XPath.getStringValue(document, paths.planet_id, row).trim();
				var moon_id = XPath.getStringValue(document, paths.moon_id, row).trim();
                
				log('row '+position+' > player_id:'+player_id+',planet_name:'+name+',planet_id:'+planet_id+',moon_id:'+moon_id+',moon:'+moon+',player_name:'+player+',status:'+status+',ally_id:'+allyid+',ally_tag:'+allytag+',debris:('+debris[XtenseDatabase['resources'][601]]+'/'+debris[XtenseDatabase['resources'][602]]+'),activity:'+activity+',activity_moon:'+activityMoon);	
				var r = {player_id:player_id,planet_name:name,planet_id:planet_id,moon_id:moon_id,moon:moon,player_name:player,status:status,ally_id:allyid,ally_tag:allytag,debris:debris,activity:activity,activityMoon:activityMoon};
				rowsData[position]=r;
			}
			XtenseRequest.set(
				{
					row : rowsData,
					galaxy : coords[0],
					system : coords[1],
					type : 'system'
				}
			);
			XtenseRequest.set('lang',langUnivers);
			XtenseRequest.send();
			GM_setValue(prefix_GMData +'lastAction','s:'+coords[0]+':'+coords[1]);
		}
	}
}

/* Fonction appelée lors d'évenement sur le chargement de la page d'alliance */
function parse_ally_inserted() {
			//log("last_action="+GM_getValue(prefix_GMData +'lastAction',''));
			if (GM_getValue(prefix_GMData +'lastAction','') != 'ally_list'){
				setStatus(XLOG_NORMAL,Xl('ally_list_detected'));
				
				var paths = XtenseXpaths.ally_members_list;
				var rows = XPath.getOrderedSnapshotNodes(document,paths.rows);
				var rowsData = [];
				
				log(rows.snapshotLength+" membres à envoyer !");
				
				for (var i = 0; i < rows.snapshotLength; i++) {
					var row = rows.snapshotItem(i);
					var player = XPath.getStringValue(document,paths.player,row).trim();
					var points = XPath.getStringValue(document,paths.points,row).trimInt();
					var rank = XPath.getStringValue(document,paths.rank,row).trimInt();
					var coords = XPath.getStringValue(document,paths.coords,row).trim();
					coords = coords.match(new RegExp(XtenseRegexps.coords))[1];
					
					var r = {player:player,points:points,coords:coords,rank:rank};
					rowsData[i]=r;
				}
	
				if(rowsData.length > 0){
					//XnewOgame.Tab.setStatus(Xl('ally_list detected'), XLOG_NORMAL, {url: this.url});
					var tag = XPath.getStringValue(document,paths.tag);
					XtenseRequest.set(
						{
							n : rowsData,
							type : 'ally_list',
							tag : tag
						}
					);
					XtenseRequest.set('lang', langUnivers);
					XtenseRequest.send();
					GM_setValue(prefix_GMData +'lastAction','ally_list')
				}
				get_ally_content();
			}
}

/* Fonction appelée lors d'évenement sur le chargement des classements */
function parse_ranking_inserted(event) {
       
    log("Entering parse_ranking_inserted");
    var paths = XtenseXpaths.ranking;
    var rows = XPath.getOrderedSnapshotNodes(document,paths.rows,null);

    if(rows.snapshotLength > 0){
        //Récupération de la date courante du jeu
        var timeText = XPath.getStringValue(document,paths.time).trim();
        timeText = timeText.match(/(\d+).(\d+).(\d+)[^\d]+(\d+):\d+:\d+/);
        
        //Conversion dans la plage de 8 (0-8-16)
        var time = new Date();
        time.setHours((Math.floor(time.getHours())/8)*8);
        time.setMinutes(0);
        time.setSeconds(0);
        if(timeText) {
            time.setYear(timeText[3]);
            time.setMonth(parseInt(timeText[2].trimZeros())-1);
            time.setDate(timeText[1]);
            time.setHours(Math.floor(parseInt(timeText[4].trimZeros())/8)*8);
        }
        time =  Math.floor(time.getTime()/1000);
        
        //Détermination du type de classement
        var type = new Array();
        type[0] = XPath.getStringValue(document,paths.who);
        type[1] = XPath.getStringValue(document,paths.type);
        type[2] = XPath.getStringValue(document,paths.subnav_fleet);
        type[0] = (type[0] != '') ? type[0] : 'player';
        type[0] = (type[0] == 'alliance') ? 'ally' : type[0];
        type[1] = (type[1] != '') ? type[1] : 'points';

        
        var length = 0;
        //var rows = XPath.getOrderedSnapshotNodes(document,paths.rows,null);
        var offset = 0;
        log('time:'+time+',type1:'+type[0]+',type2:'+type[1]+',type3: '+type[2]+',nombreLignes:'+rows.snapshotLength);	
            
        //if(rows.snapshotLength > 0){ //Double sécurité
        var rowsData = [];
        for (var i = 0; i < rows.snapshotLength; i++) {
            var row = rows.snapshotItem(i);
            var n = XPath.getStringValue(document,paths.position,row).trimInt();
            
            if (i == 1) {
                offset = Math.floor(n/100)*100+1;//parce que le nouveau classement ne commence pas toujours pile a la centaine et OGSpy toujours a 101,201...
            }
            
            var ally = XPath.getStringValue(document,paths.allytag,row).trim().replace(/\]|\[/g,'');
            var ally_id = XPath.getStringValue(document,paths.ally_id,row).trim();
            if (ally_id != '' && !ally_id.match(/page\=alliance/)) { //Pas d'id sur le lien de sa propre alliance (dans les classements alliances)
                ally_id = ally_id.match(/allianceId\=(.*)/);
                ally_id = ally_id[1];
            } else if (ally){
                ally_id = XtenseMetas.getAllyId();
            }
            var points = XPath.getStringValue(document,paths.points,row).trimInt();
            
            if (type[0] == 'player') {
                var name = XPath.getStringValue(document,paths.player.playername,row).trim();
                var player_id = XPath.getStringValue(document,paths.player.player_id,row).trim();
                
                if (player_id != '' ) {
                    player_id = player_id.match(/\&to\=(.*)\&ajax/);
                    player_id = player_id[1];
                }
                else if(document.cookie.match(/login_(.*)=U_/))
                    player_id = document.cookie.match(/login_(.*)=U_/)[1];
                    
                /*Nombre de vaisseaux*/    
                if (type[1] == 'fleet') {
                    var NbVaisseaux = XPath.getStringValue(document,paths.nb_vaisseaux, row).trimInt();
                    log('row '+n+' > player_id:'+player_id+',player_name:'+name+',ally_id:'+ally_id+',ally_tag:'+ally+',points:'+points+',NbVaisseaux:'+NbVaisseaux);
                    var r = {player_id:player_id,player_name:name,ally_id:ally_id,ally_tag:ally,points:points,nb_spacecraft:NbVaisseaux};
                }else{
                    log('row '+n+' > player_id:'+player_id+',player_name:'+name+',ally_id:'+ally_id+',ally_tag:'+ally+',points:'+points);
                    var r = {player_id:player_id,player_name:name,ally_id:ally_id,ally_tag:ally,points:points};
                }
                
            } else if(type[0] == 'ally') {
                var members = XPath.getStringValue(document,paths.ally.members,row).trim().getInts();
                var moy = XPath.getStringValue(document,paths.ally.points_moy,row).replace("|.", "").trimInt();
                
                log('row '+n+' > ally_id:'+ally_id+',ally_tag:'+ally+',members:'+members+',points:'+points+',mean:'+moy);
                var r = {ally_id:ally_id,ally_tag:ally,members:members,points:points,mean:moy};
            }
            rowsData[n]=r;
            length ++;
        }
        if(GM_setValue(prefix_GMData +'lastAction','') != 'r:'+type[0]+':'+type[1]+':'+offset){				
            setStatus(XLOG_NORMAL,Xl('ranking_detected', Xl('ranking_'+type[0]), Xl('ranking_'+type[1])));
            GM_setValue(prefix_GMData +'lastAction','r:'+type[0]+':'+type[1]+':'+offset);
            if (offset != 0 && length != 0) {
                XtenseRequest.set(
                    {
                        n : rowsData,
                        type : 'ranking',
                        offset : offset,
                        type1 : type[0],
                        type2 : type[1],
                        type3 : type[2],
                        time: time
                    }
                );
                XtenseRequest.set('lang',langUnivers);
                XtenseRequest.send();
            }
        

        }

    }

}//Fin Fonction

/* Page Overview */
function parse_overview(event){

	if(typeof( delaytodisplay_overview ) != "undefined") { clearInterval(delaytodisplay_overview);} //Supression du setinterval si il existe
	
	var temperatures = XPath.getStringValue(document,XtenseXpaths.overview.temperatures);
	if((temperatures != null) && (temperatures != "")){
		var planetData = getPlanetData();
		if (GM_getValue(prefix_GMData + 'lastAction', '') != 'planet_name:' + planetData.planet_name){
			var cases = XPath.getStringValue(document,XtenseXpaths.overview.cases).trimInt();
			var temperature_max = temperatures.match(/\d+[^\d-]*(-?\d+)[^\d]/)[1];
			var temperature_min = temperatures.match(/(-?\d+)/)[1];
			var resources = getResources();
			
			XtenseRequest.set(
				{
					type: 'overview',
					fields: cases,
					temperature_min: temperature_min,
					temperature_max: temperature_max,
					ressources: resources
				},
				planetData
			);
				
			XtenseRequest.set('lang',langUnivers);
			XtenseRequest.send();
			GM_setValue(prefix_GMData +'lastAction','planet_name:'+planetData.planet_name);
		}
	} else {
        log("Temperature Content is not there! Retrying...");
		delaytodisplay_overview = setInterval( get_planet_details, 50); // Necessaire car la page est remplie par des scripts JS. (Au premier passage les balises contenant les infomations sont vides)
	}
}

/* Page Buildings */
function parse_buildings() {
	setStatus(XLOG_NORMAL, Xl('buildings_detected'));
	
	var paths = XtenseXpaths.levels;
	
	XtenseRequest.set('type', 'buildings');
	var levels = XPath.getOrderedSnapshotNodes(document,paths.level,null);
	var tabLevel = new Array();
	
	if(levels.snapshotLength > 0){
	   	for(var lvl=0;lvl<levels.snapshotLength;lvl++){
	   		var level = levels.snapshotItem(lvl).nodeValue.trim().replace(".", "");
			
	   		if(level!=""){
	   			tabLevel.push(level);
	   		}
	   	}
	}
	
	XtenseRequest.set(getPlanetData());
	XtenseRequest.set(
		{
			"M": tabLevel[0],
			"C": tabLevel[1],
			"D": tabLevel[2],
			"CES": tabLevel[3],
			"CEF": tabLevel[4],
			"SAT": tabLevel[5],
			"HM": tabLevel[6],
			"HC": tabLevel[7],
			"HD": tabLevel[8],
			"CM": tabLevel[9],
			"CC": tabLevel[10],
			"CD": tabLevel[11]
		}
	);
	
	XtenseRequest.send();
}

/* Page Stations */
function parse_station() {
	setStatus(XLOG_NORMAL,Xl('installations_detected'));
		var paths = XtenseXpaths.levels;
		XtenseRequest.set('type', 'buildings');
		
		var levels = XPath.getOrderedSnapshotNodes(document,paths.level,null);
		var tabLevel = new Array();
		if(levels.snapshotLength > 0){
		   	for(var lvl=0;lvl<levels.snapshotLength;lvl++){
		   		var level = levels.snapshotItem(lvl).nodeValue.trim();
		   		if(level!=""){
		   			tabLevel.push(level);
		   		}
		   	}
		}
		var send;
		XtenseRequest.set(getPlanetData());
		if(!isMoon()){
			send = {
				"UdR": tabLevel[0],
				"CSp": tabLevel[1],
				"Lab": tabLevel[2],
				"DdR": tabLevel[3],
				"Silo": tabLevel[4],
				"UdN": tabLevel[5],
				"Ter": tabLevel[6]
			};
		} else {
			send = {
				"UdR": tabLevel[0],
				"CSp": tabLevel[1],
				"BaLu": tabLevel[2],
				"Pha": tabLevel[3],
				"PoSa": tabLevel[4]
			};
		}
		XtenseRequest.set(send);
		XtenseRequest.send();
}

/* Page Researchs */
function parse_researchs(){		
		setStatus(XLOG_NORMAL, Xl('researchs_detected'));
		
			XtenseRequest.set('type', 'researchs');
			var levels = XPath.getOrderedSnapshotNodes(document,XtenseXpaths.levels.level,null);
			var tabLevel = new Array();
			
			if(levels.snapshotLength > 0){
			   	for(var lvl=0;lvl<levels.snapshotLength;lvl++){
			   		var level = levels.snapshotItem(lvl).nodeValue.trim();
			   		if(level!=""){
			   			tabLevel.push(level);
			   		}
			   	}
			}
			
			XtenseRequest.set(getPlanetData());
			XtenseRequest.set(
				{
					"NRJ": tabLevel[0],
					"Laser": tabLevel[1],
					"Ions": tabLevel[2],
					"Hyp": tabLevel[3],
					"Plasma": tabLevel[4],
					"RC": tabLevel[5],
					"RI": tabLevel[6],
					"PH": tabLevel[7],
					"Esp": tabLevel[8], 
					"Ordi": tabLevel[9],
					"Astrophysique": tabLevel[10],
					"RRI": tabLevel[11],
					"Graviton": tabLevel[12],
					"Armes": tabLevel[13],
					"Bouclier": tabLevel[14],
					"Protection": tabLevel[15]
				}
			);
			XtenseRequest.send();
			//setStatus(XLOG_SUCCESS,Xl('success_research'));
}

/* Page Shipyard */
function parse_shipyard(){
	setStatus(XLOG_NORMAL, Xl('fleet_detected'));
	
	var paths = XtenseXpaths.levels;
	XtenseRequest.set('type', 'fleet');
	var levels = XPath.getOrderedSnapshotNodes(document,paths.level,null);
	var tabLevel = new Array();
	
	if(levels.snapshotLength > 0){
	   	for(var lvl=0;lvl<levels.snapshotLength;lvl++){
	   		var level = levels.snapshotItem(lvl).nodeValue.trim().replace(".", "");
	   		if(level!=""){
	   			tabLevel.push(level);
	   		}
	   	}
	}
	var req = "";
		req={
			"CLE": tabLevel[0],
			"CLO": tabLevel[1],
			"CR": tabLevel[2],
			"VB": tabLevel[3],
			"TRA": tabLevel[4],
			"BMD": tabLevel[5],
			"DST": tabLevel[6],
			"EDLM": tabLevel[7],
			"PT": tabLevel[8],
			"GT": tabLevel[9],
			"VC": tabLevel[10],
			"REC": tabLevel[11],
			"SE": tabLevel[12]};
	
	XtenseRequest.set(getPlanetData());
	XtenseRequest.set(req);
	XtenseRequest.send();
}

/* Page Defense */
function parse_defense(){		
	setStatus(XLOG_NORMAL,Xl('defense_detected'));
	
		var paths = XtenseXpaths.levels;
		
		XtenseRequest.set('type', 'defense');
		var levels = XPath.getOrderedSnapshotNodes(document,paths.level,null);
		var tabLevel = new Array();
		
		if(levels.snapshotLength > 0){
		   	for(var lvl=0;lvl<levels.snapshotLength;lvl++){
		   		var level = levels.snapshotItem(lvl).nodeValue.trim().replace(".", "");
		   		if(level!=""){
		   			tabLevel.push(level);
		   		}
		   	}
		}
		
		XtenseRequest.set(getPlanetData());
		XtenseRequest.set(
			{
				"LM": tabLevel[0],
				"LLE": tabLevel[1],
				"LLO": tabLevel[2],
				"CG": tabLevel[3],
				"AI": tabLevel[4],
				"LP": tabLevel[5],
				"PB": tabLevel[6],
				"GB": tabLevel[7],
				"MIC": tabLevel[8],
				"MIP": tabLevel[9]
			}
		);
		
		XtenseRequest.send();
}

/* Page Battle Report */
function parse_rc() {
	var paths = XtenseXpaths.rc;
	log("RC detected");
	var rcStrings = l('combat report');
	var data = {};
	var rnds = {};
	var rslt = {};

    var date = null;
    
	var infos = XPath.getOrderedSnapshotNodes(document,paths.list_infos);
    log(infos.snapshotLength.toString());
	if(infos.snapshotLength > 0){
		//Heure et rounds
		var rounds = XPath.getOrderedSnapshotNodes(document,paths.list_rounds);
		var nbrounds = rounds.snapshotLength;
		if(nbrounds > 0){
			for(var div=0;div<nbrounds;div++){
				var round = rounds.snapshotItem(div).textContent.trim();
				
				if(div == 0){
					var m = round.match(new RegExp(rcStrings['regxps']['time']));
					if(m){
						// Calcul heure d'ete => offset = -120 & heure d'hiver  => offset = -60
						var diff = new Date(Date.UTC(m[3], (m[2]-1), m[1], m[4], m[5], m[6])).getTimezoneOffset();
						var correction = 0;
						if(diff==-120){
							correction = 2;
						} else if(diff==-60){
							correction = 1;
						}
                            date = (Date.UTC(m[3], (m[2]-1), m[1], (parseInt(m[4].replace(new RegExp("0(\\d)"), "$1")) - correction), m[5], m[6])) / 1000;

					} else {
                            date = Math.ceil((new Date().getTime()) / 1000);
					}
				} else {
					var rnd = {};
					for (var i in rcStrings['regxps']['round']) {
						var m = round.match(new RegExp(rcStrings['regxps']['round'][i]));
						if(m)
							rnd[i] = m[1].replace(/\./g, '');
					}
					rnds[div] = rnd;
				}
			}
		}

		//Vaisseaux/Défenses/Joueur/Coordonnées/Technos
		var rc_temp = eval(GM_getValue(prefix_GMData +'rc-temp')); //Coordonnées de destination
	   	for(var table=0;table<infos.snapshotLength;table++){
			var dat = {};
			var val = {};
			var weap = {};
			var info = infos.snapshotItem(table);
			var nbJoueurs=infos.snapshotLength/nbrounds;
			
			//Nombre d'unités
			var values = XPath.getOrderedSnapshotNodes(document,paths.list_values, info);
			if(values.snapshotLength > 0){
				for(var td=1;td<values.snapshotLength;td++){
					var value = values.snapshotItem(td).textContent.trim();
					if(value){
						val[td] = value.replace(/\./g, '');
					}
				}
			}
			
			//Type de l'unité
			var types = XPath.getOrderedSnapshotNodes(document,paths.list_types, info);
			if(types.snapshotLength > 0){
				for(var th=1;th<types.snapshotLength;th++){
					var type = types.snapshotItem(th).textContent.trim();
					if(type){
						for (var i in rcStrings['units']) {
							for (var j in rcStrings['units'][i]) {
								var typ = type.match(new RegExp(rcStrings['units'][i][j]));
								if (typ)
									dat[XtenseDatabase[i][j]] = val[th];
							}
						}
					}
				}
			}

			//Nom joueur et coordonnées
			var dest = 0;
			var player = XPath.getStringValue(document,paths.infos.player,info).trim(); //Joueur non détruit
			var coords = null;
            if (player.length==0) { //Dans ce cas, joueur détruit
				player = XPath.getStringValue(document,paths.infos.destroyed,info).trim();
				dest=1;
			}
			if (!dest)
				var m = player.match(new RegExp(rcStrings['regxps']['attack']+XtenseRegexps.planetNameAndCoords));
			else
				var m = player.match(new RegExp(rcStrings['regxps']['attack']+XtenseRegexps.userNameAndDestroyed));
			if(m){
				var player = m[1];
				if (!dest)
					coords = m[2];
				else
					coords = data[(table-nbJoueurs)%nbJoueurs]['coords']; //Joueur détruit, on récupère ses coordonnées lorsqu'il était encore vivant
				var type = "A";
			} else {
				if(!dest)
					var m = player.match(new RegExp(rcStrings['regxps']['defense']+XtenseRegexps.planetNameAndCoords));
				else
					var m = player.match(new RegExp(rcStrings['regxps']['defense']+XtenseRegexps.userNameAndDestroyed));
				
				if(m){
					var player = m[1];
					if (!dest)
						var coords = m[2];
					else {
						if (rc_temp != "")
							var coords = rc_temp.coords; //Si défenseur où à lieu le raid est détruit au 1er tour
						else
							var coords = data[(table-nbJoueurs)%nbJoueurs]['coords']; // Si ce n'est pas le 1er round
					}
					rc_temp = "";
				} else {
					var player = "";
					var coords = "";
				}
				var type = "D";
			}
			
			//Technos
			var weapons = XPath.getStringValue(document,paths.infos.weapons,info).trim();
			for (var i in rcStrings['regxps']['weapons']) {
				var m = weapons.match(new RegExp(rcStrings['regxps']['weapons'][i]));
				if(m)
					weap[i] = m[1].replace(/\./g, '');
				else { //Joueur détruit
					if ((table-nbJoueurs)<0) //Défenseur où à lieu le raid détruit au 1er tour -> technos inutiles
						weap[i] = 0;
					else
						weap[i] = data[(table-nbJoueurs)%nbJoueurs]['weapons'][i]; //On récupère ses technos lorsqu'il était encore vivant
				}
			}
			
			if(coords != "")
				data[table] = {player : player, coords : coords, type : type, weapons : weap, content : dat};
		}
		
		//Pillages/Pertes/Cdr/Lune
		var result = XPath.getStringValue(document,paths.result).trim();
		if (result.match(new RegExp(rcStrings['regxps']['nul'], 'gi')))
			var win = "N";
		else if (result.match(new RegExp(rcStrings['regxps']['attack_win'], 'gi')))
			var win = "A";
		else
			var win = "D";

		if(result.match(new RegExp(rcStrings['regxps']['moon'], 'gi')))
			var moon = 1;
		else
			var moon = 0;
		
		if(result.match(new RegExp(rcStrings['regxps']['moonprob'], 'gi')))
			var moonprob = result.match(new RegExp(rcStrings['regxps']['moonprob']))[1];
		else
			var moonprob = 0;
		
		for (var i in rcStrings['regxps']['result']) {
			var m = result.match(new RegExp(rcStrings['regxps']['result'][i]));
			if(m)
				rslt[i] = m[1].replace(/\./g, '');
			else
				rslt[i] = 0;
		}

		//Texte entier du raid, brut
		var rounds = XPath.getOrderedSnapshotNodes(document,paths.combat_round);
		var round = -1;
        log("Nb Rounds" + rounds.snapshotLength);
		if(rounds.snapshotLength > 0){
			round = rounds.snapshotItem(0).textContent.trim();
		}

		XtenseRequest.set(
			{
				type: 'rc',
				date: date,
				win: win,
				count: nbrounds,
				result: rslt,
				moon: moon,
				moonprob : moonprob,
				rounds: rnds,
				n: data,
				rawdata: round
			}
		);
		
		XtenseRequest.send();
	}
}

/* Page Messages */
function parse_messages(){
	setStatus(XLOG_NORMAL,Xl('messages_detected'));
	log('messages_detected');
    
	var paths = XtenseXpaths.messages;
	var data = {};
    
    var messages = XPath.getOrderedSnapshotNodes(document,paths.showmessage,null);
    var messageNode = messages.snapshotItem(0);
    var messageId = XPath.getStringValue(document,paths.messageid,messageNode);
	var combatreport = XPath.getOrderedSnapshotNodes(document,paths.combatreport,null);
	// Detection du rapport de combat (Sous fenetre)								
	if(combatreport.snapshotLength > 0) {
        log("Traitement du rapport de combat");
		if(GM_getValue(prefix_GMData +'handle.msg.rc').toString() == 'true') {
			parse_rc();
		}
    } else {
        var from = XPath.getStringValue(document,paths.from).trim();
        log('from: ' + from);
        var to = XPath.getStringValue(document,paths.to).trim();
        var subject = XPath.getStringValue(document,paths.subject).trim();
        var date = XPath.getStringValue(document,paths.date).trim();
        var locales = l('messages');
        
        data.date = XtenseParseDate(date,l('dates')['messages']);
        data.type = '';
        
        // Messages de joueurs
        if(GM_getValue(prefix_GMData +'handle.msg.msg').toString() == 'true') {
            if (XPath.getOrderedSnapshotNodes(document,paths.reply).snapshotLength > 0) { // si bouton "repondre", c'est un mp
                var m = from.match(new RegExp(XtenseRegexps.userNameAndCoords));
                if(m) {
                    var userName = m[1];
                    var coords = m[2];
                }
                var contentNode = XPath.getSingleNode(document,paths.contents['msg']);
                var message = contentNode.innerHTML.trim();
                var ladate = data.date
                
                //correctif : pas de date 
                // si on procede comme suit : on redefini la variable data et on perd "date"
                //data = {type:'msg', from: userName, coords: coords, subject: subject, message: message};
                    data.type = 'msg';
                    data.from = userName;
                    data.coords = coords;
                    data.subject = subject;
                    data.message = message;
                // fin correctif	
            }
        }
        
        // Messages d'alliance
        if(GM_getValue(prefix_GMData +'handle.msg.ally').toString() == 'true') {
            var m = from.match(new RegExp(XtenseRegexps.ally));
            if(m){
                var contentNode = XPath.getSingleNode(document,paths.contents['ally_msg']);
                var message = contentNode.innerHTML;
                data.type = 'ally_msg';
                data.from = subject.match(new RegExp(XtenseRegexps.ally_msg_player_name))[1];
                data.tag = m[1];
				data.message = message.match(new RegExp(XtenseRegexps.ally_msg_player_infos))[1];
            }
        }
        
        // Espionnages perso
        if(GM_getValue(prefix_GMData +'handle.msg.spy').toString() == 'true') {
            var m = subject.match(new RegExp(locales['espionage of']+XtenseRegexps.planetNameAndCoords));
            if(m){
                setStatus(XLOG_NORMAL,Xl('re_detected'));
                
                var contentNode = XPath.getSingleNode(document,paths.contents['spy']);
                var content = contentNode.innerHTML;
                
                data.planetName = m[1];
                data.coords = m[2];
                
                data.proba = 0;
                m = content.match(new RegExp(locales['unespionage prob']+XtenseRegexps.probability));
                if(m)
                    data.proba = m[1];
                
                data.activity = 0;
                m = content.match(new RegExp(locales['activity']));
                if (m)
                    data.activity = m[1];
                
                Ximplements(data, parse_spy_report(content));		
                data.type = 'spy';
            }
        }
        
        // Espionnages ennemis
         if(GM_getValue(prefix_GMData +'handle.msg.ennemy.spy').toString() == 'true') {
            if(subject.match(new RegExp(locales['espionnage action']))) {
                var contentNode = XPath.getSingleNode(document,paths.contents['ennemy_spy']);
                var rawdata = contentNode.textContent.trim();
                var m = rawdata.match(new RegExp(XtenseRegexps.messages.ennemy_spy));

                if(m){
                    data.type = 'ennemy_spy';
                    data.from = m[1];
                    data.to = m[2];
                    data.proba = m[3];
                }
            }
        }
        
        //RC
        if(GM_getValue(prefix_GMData +'handle.msg.rc').toString() == 'true') {
            var m = subject.match(new RegExp(locales['combat of']));
            if (m!=null){
                var rapport = XPath.getStringValue(document,paths.contents['rc']).trim();
                var m2 = rapport.match(new RegExp(locales['combat defence']+XtenseRegexps.planetNameAndCoords));
                if (m2) GM_setValue(prefix_GMData +'rc-temp', '({name: "'+m2[1]+'", coords: "'+m2[2]+'"})');
            }
        }
        
        // Recyclages
        if(GM_getValue(prefix_GMData +'handle.msg.rc.cdr').toString() == 'true') {
            if(from.match(new RegExp(locales['fleet'])) 
                        && subject.match(new RegExp(locales['harvesting']))) {
                var m = subject.match(new RegExp(XtenseRegexps.coords));
                if(m) {
                    var coords = m[1];
                    var contentNode = XPath.getSingleNode(document,paths.contents['rc_cdr']);
                    var message = XPath.getStringValue(document,paths.contents['rc_cdr']).trim();
                    var nums = message.getInts();
                    data.type ='rc_cdr';
                    data.coords = coords;
                    data.nombre = nums[0];
                    data.M_recovered = nums[7];
                    data.C_recovered = nums[8];
                    data.M_total = nums[2];
                    data.C_total = nums[3];
                }
            }
        }
        
        // Expeditions
        if(GM_getValue(prefix_GMData +'handle.msg.expeditions').toString() == 'true') {
            var m = subject.match(new RegExp(locales['expedition result']+XtenseRegexps.planetCoords));
            var m2 = from.match(new RegExp(locales['fleet command']));
            
            if (m2!=null && m!=null) {
                var coords = m[1];
                var contentNode = XPath.getSingleNode(document,paths.contents['expedition']);
                var message = XPath.getStringValue(document,paths.contents['expedition']).trim();
                var message = message.replace(/\(AM\)/g, '');
		data.type = 'expedition';
                data.coords = coords;
                data.content = message;
            }
        }

        // Commerce
        if(GM_getValue(prefix_GMData +'handle.msg.commerce').toString() == 'true') {
            var m = subject.match(new RegExp(locales['trade message 1']));
            var m2 = subject.match(new RegExp(locales['trade message 2']));
                        
            // Livraison d'un ami sur une de mes planètes
            if (m!=null) {
                var message = XPath.getStringValue(document,paths.contents['livraison']).trim();
                var infos = message.match(new RegExp(XtenseRegexps.messages.trade_message_infos));
                
                var ressourcesLivrees = message.match(new RegExp(XtenseRegexps.messages.trade_message_infos_res_livrees)); // ressources livrées
                var ressources = ressourcesLivrees[1].match(new RegExp(XtenseRegexps.messages.trade_message_infos_res)); // Quantité de ressources livrées

                var met=ressources[1].trimInt();
                var cri=ressources[2].trimInt();
                var deut=ressources[3].trimInt();
                
                data.type = 'trade';
                data.trader = infos[1].trim();
                data.trader_planet = infos[2].trim();
                data.trader_planet_coords = infos[3].trim();
                data.planet = infos[4].trim();
                data.planet_coords = infos[5].trim();
                data.metal = met;				
                data.cristal = cri;
                data.deuterium = deut;
                
                log('Livraison du joueur ('+infos[1].trim()+') de la planète '+infos[2].trim()+'('+infos[3].trim()+')sur ma planète '+infos[4].trim()+'('+infos[5].trim()+') : Metal='+met+' Cristal='+cri+' Deuterium='+deut);
                
            } else if (m2!=null) { // Livraison sur la planète d'un ami
                var message = XPath.getStringValue(document,paths.contents['livraison_me']).trim(); // Corps du message
                
                var infos = message.match(new RegExp(XtenseRegexps.messages.trade_message_infos_me)); // Infos sur la planète
                var planeteLivraison = infos[4].trim(); // Planete sur laquelle la livraison à eu lieu
                
                // Récupération de mes planètes
                //var mesPlanetes = XPath.getOrderedSnapshotNodes(window.parent.document,XtenseXpaths.planetData['coords']);
                var mesPlanetes = GM_getValue(prefix_GMData +'my.planets','').split(';');
                
                var isMyPlanet=false;
                log("J'ai "+mesPlanetes.length+" planètes");
                
                // Parcours de mes planète pour s'assurer que ce n'est pas une des mienne
                if(mesPlanetes!=null && mesPlanetes.length > 0){
                    for(var i=0;i<mesPlanetes.length;i++){
                        var coord = mesPlanetes[i];
                        log('Coordonnees='+coord+' | planeteLivraison='+planeteLivraison);
                        if(coord.search(planeteLivraison) > -1){
                             isMyPlanet=true;
                             break;
                        }	
                    }
                }
                
                // Livraison sur une planète amie ? 
                if(!isMyPlanet){
                    var ressources = message.match(new RegExp(XtenseRegexps.messages.trade_message_infos_me_res)); // Quantité de ressources livrées
                    
                    var met=ressources[1].trimInt();
                    var cri=ressources[2].trimInt();
                    var deut=ressources[3].trimInt();
                    
                    data.type = 'trade_me';
                    data.planet_dest = infos[3].trim();
                    data.planet_dest_coords = planeteLivraison;
                    data.planet = infos[1].trim();
                    data.planet_coords = infos[2].trim();
                    data.trader = 'ME';
                    data.metal = met;				
                    data.cristal = cri;
                    data.deuterium = deut;
                    
                    log('Je livre de ma planète '+infos[1].trim()+'('+infos[2].trim()+') sur la planète '+infos[3].trim()+'('+infos[4].trim()+') : Metal='+met+' Cristal='+cri+' Deuterium='+deut);
                }
            }
        }
        
        // Aucun message
        if(data.type == ''){
            setStatus(XLOG_NORMAL,Xl('no_messages'));
            return false;
        } else {
            XtenseRequest.set('data', data);
            XtenseRequest.set('type', 'messages');
            XtenseRequest.send();
        }
    }
}
	
/* Fonction de parsing d'un RE */
function parse_spy_report(RE) {
	setStatus(XLOG_NORMAL,Xl('re_detected'));
	var paths = XtenseXpaths.messages.spy;
	
	var spyStrings = l('spy reports');
	var locales = l('messages');
	var data = {};
	var typs = [];
	var res = new Array();
	
	var attackRef = XPath.getStringValue(document, paths.moon);
	var isMoon = attackRef.search("type=3") > -1 ? true : false;
	//isMoon = (moonNode.href).match(new RegExp(locales['moon'] + XtenseRegexps.moon))[1] == '3' ? true : false;
	var playerName = XPath.getStringValue(document, paths.playername).trim();
	var types = XPath.getOrderedSnapshotNodes(document,paths.materialfleetdefbuildings);
	if(types.snapshotLength > 0){
	   	for(var table=0;table<types.snapshotLength;table++){
			var type = types.snapshotItem(table).textContent.trim();
	   		if(type)
				typs.push(type);
	   	}
	}

	for (var i in spyStrings['units']) {
		for(var k=0; k<typs.length; k++){
			if(typs[k].match(new RegExp(spyStrings['groups'][i], 'gi'))){
				for (var j in spyStrings['units'][i]) {
					var m = getElementInSpyReport(RE,spyStrings['units'][i][j]);
					if(m != -1)
						data[XtenseDatabase[i][j]] = m;
					else
						data[XtenseDatabase[i][j]] = 0;
				}
			}
		}
	}
	
	return {
		content: data,
		playerName: playerName,
		moon: isMoon
	};
}
/* Fonction de récupération de données dans un RE */
function getElementInSpyReport(RE,elem) {
	var num = -1;
	var reg = new RegExp(elem+'\\D+(\\d[\\d.]*)');//recupere le nombre le plus proche apres le texte
	var m = reg.exec(RE);
	
	if(m)
		num = m[1].trimInt();

	return num;
}

/* Fonction d'envoi manuel */
function manual_send(){	
	GM_setValue(prefix_GMData +'manual.send','true');
	displayXtense();
	setStatus(XLOG_SEND,Xl('wait_send'));
}

/************************ Declenchement des Parsings sur Remplissage Ajax ************************/
/* Fonction ajoutant lancant le parsing de la vue galaxie quand celle-ci est chargée */
function get_galaxycontent(){	

	if (isChrome || isOpera) //Pour Chrome :-)
	{	/* Page Galaxie */
		
		var target = document.getElementById('galaxyContent');
		//target.removeEventListener("DOMNodeInserted");
		//target.removeEventListener("DOMContentLoaded");
		target.addEventListener("DOMNodeInserted", parse_galaxy_system_inserted, false);		
		target.addEventListener("DOMContentLoaded", parse_galaxy_system_inserted, false);		

	}else{// Pour Firefox Notamment

		function safeWrap(f)
		{
			return function()
			{
				setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
			};
		}
		//la division dans lequel le résultat de la requête ajax est placé a l'id galaxyContent
		
		unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings)
		{
			//l'url de la requête ajax contient page=galaxyContent
			if (settings.url.indexOf("page=galaxyContent") == -1) return;

			parse_galaxy_system_inserted();
			
		}));

	}

}

/* Fonction ajoutant lancant le parsing de la vue alliance quand celle-ci est chargée */
function get_ally_content(){	
	if (isChrome || isOpera) //Pour Chrome :-)
	{	
		/* Page Galaxie */
		log("In get_ally_content()");
		var target = document.getElementById('inhalt');
		//target.removeEventListener("DOMNodeInserted");
		//target.removeEventListener("DOMContentLoaded");
		target.addEventListener("DOMNodeInserted", parse_ally_inserted, false);		
		target.addEventListener("DOMContentLoaded", parse_ally_inserted, false);		

	}else{// Pour Firefox Notamment

		function safeWrap(f)
		{
			return function()
			{
				setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
			};
		}
		//la division dans lequel le résultat de la requête ajax est placé a l'id inhalt
		
		unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings)
		{
			//l'url de la requête ajax contient page=inhalt
			if (settings.url.indexOf("page=allianceOverview") == -1) return;

			parse_ally_inserted();
			
		}));

	}

}

/* Fonction ajoutant lancant le parsing de la vue classement quand celle-ci est chargée */
function get_ranking_content(){
    log("Entering get_ranking_content");
	if (isChrome || isOpera) //Pour Chrome :-)
	{	
		/* Page Galaxie */
		var target = document.getElementById('stat_list_content');
		//target.removeEventListener("DOMNodeInserted");
		//target.removeEventListener("DOMContentLoaded");
		target.addEventListener("DOMNodeInserted", parse_ranking_inserted, false);		
		target.addEventListener("DOMContentLoaded", parse_ranking_inserted, false);		

	}else{// Pour Firefox Notamment
          
		function safeWrap(f)
		{
			return function()
			{
				setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
			};
		}
		//la division dans lequel le résultat de la requête ajax est placé a l'id galaxyContent
		
		unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings)
		{
			//l'url de la requête ajax contient page=galaxyContent
			if (settings.url.indexOf("page=highscoreContent") == -1) return;

			parse_ranking_inserted();
			
		}));

	}

}
/* Fonction ajoutant lancant le parsing de la vue classement quand celle-ci est chargée */
function get_message_content(){
    log("Entering get_message_content");
	if (isChrome || isOpera) //Pour Chrome :-)
	{	
		/* Page Messages */
		var target = document.getElementById('messages');
		//target.removeEventListener("DOMNodeInserted");
		//target.removeEventListener("DOMContentLoaded");
		target.addEventListener("DOMNodeInserted", parse_messages, false);		
		target.addEventListener("DOMContentLoaded", parse_messages, false);
        
        var targetrc = document.getElementById('combatreport');
        targetrc.addEventListener("DOMNodeInserted", parse_rc, false);		
		targetrc.addEventListener("DOMContentLoaded", parse_rc, false);

	}else{// Pour Firefox Notamment
          
		function safeWrap(f)
		{
			return function()
			{
				setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
			};
		}
		//la division dans lequel le résultat de la requête ajax est placé a l'id galaxyContent
		
		unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings)
		{
           
			parse_messages();
			
		}));

	}

}
/* Fonction ajoutant lancant le parsing de la vue générale quand celle-ci est chargée */
function get_planet_details(){	
	setStatus(XLOG_NORMAL,Xl('overview_detected'));
	parse_overview();
}
/********************** Fin Utilities des Parsings **********************/


/**************************** Options ***********************************/
// Affiche les Options Xtense
function displayOptions(){
	// Variables : Serveur
	var server_check = ' ';
		
	// Variables : Pages
	// Variables recupération des pages
	var handle_overview = ' ';
	var handle_system = ' ';
	var handle_researchs = ' ';
	var handle_buildings = ' ';
	var handle_station = ' ';
	var handle_shipyard = ' ';
	var handle_defense = ' ';
	var handle_alliance = ' ';
	var handle_stats = ' ';
	
	// Variables recupération des messages
	var handle_msg_msg = ' ';
	var handle_msg_ally = ' ';
	var handle_msg_spy = ' ';
	var handle_msg_ennemy_spy = ' ';
	var handle_msg_rc = ' ';
	var handle_msg_rc_cdr = ' ';
	var handle_msg_expeditions = ' ';
	var handle_msg_commerce = ' ';
	
	// Variables : Options
	var opt_debug_mode = ' ';
	
	// Récupération des préférences  : Serveur
	if(GM_getValue(prefix_GMData +'server.check','false').toString() == 'true'){server_check += 'checked';}
	
	// Récupération des préférences  : Pages
	if(GM_getValue(prefix_GMData +'handle.overview','false').toString() == 'true'){handle_overview += 'checked';}
    
	if(GM_getValue(prefix_GMData +'handle.buildings','false').toString() == 'true'){handle_buildings += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.station','false').toString() == 'true'){handle_station += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.researchs','false').toString() == 'true'){handle_researchs += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.shipyard','false').toString() == 'true'){handle_shipyard += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.system','false').toString() == 'true'){handle_system += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.defense','false').toString() == 'true'){handle_defense += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.alliance','false').toString() == 'true'){handle_alliance += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.stats','false').toString() == 'true'){handle_stats += 'checked';}
	
	if(GM_getValue(prefix_GMData +'handle.msg.msg','false').toString() == 'true'){handle_msg_msg += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.msg.ally','false').toString() == 'true'){handle_msg_ally += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.msg.spy','false').toString() == 'true'){handle_msg_spy += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.msg.ennemy.spy','false').toString() == 'true') {handle_msg_ennemy_spy += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.msg.rc','false').toString() == 'true'){handle_msg_rc += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.msg.rc.cdr','false').toString() == 'true'){handle_msg_rc_cdr += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.msg.expeditions','false').toString() == 'true'){handle_msg_expeditions += 'checked';}
	if(GM_getValue(prefix_GMData +'handle.msg.commerce','false').toString() == 'true'){handle_msg_commerce += 'checked';}
	
	// Récupération des préférences  : Options
    if(GM_getValue(prefix_GMData +'debug.mode','false').toString() == 'true'){opt_debug_mode += ' checked';}
	
					
	var options = '<div id="Xtense_Div" style="width:675px; color: orange; background-color: black; text-align: center; font-size: 12px; opacity : 0.8;"><br/><br/>';
	// Serveur Univers
	options+= '<img src="http://svn.ogsteam.fr/trunk/xtense_GreaseMonkey/images/xtense.png" alt="Options Xtense"/>';
	options+= '<br/><br/>';
	options+= '<table style="width:675px;">' +
			  '<colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup>' +
			  '<tbody>' +
			  '<tr>' +
			  '<td align="center"><a onclick="displayOption(\'Xtense_serveurs\')" style="cursor:pointer;"><img src="http://svn.ogsteam.fr/trunk/xtense_GreaseMonkey/images/server.png"/><span id="menu_servers" style="font-size: 20px; color: white;"><b>&#160;Serveur</b></span></a></td>' +
			  '<td align="center"><a onclick="displayOption(\'Xtense_pages\')" style="cursor:pointer;"><img src="http://svn.ogsteam.fr/trunk/xtense_GreaseMonkey/images/pages.png"/><span id="menu_pages" style="font-size: 20px; color: orange;"><b>&#160;Pages</b></span></a></td>' +
			  '<td align="center"><a onclick="displayOption(\'Xtense_options\')" style="cursor:pointer;"><img src="http://svn.ogsteam.fr/trunk/xtense_GreaseMonkey/images/conf.png"/><span id="menu_options" style="font-size: 20px; color: orange;"><b>&#160;Options</b></span></a></td>' +
			  '<td align="center"><a onclick="displayOption(\'Xtense_about\')" style="cursor:pointer;"><img src="http://svn.ogsteam.fr/trunk/xtense_GreaseMonkey/images/about.png"/><span id="menu_about" style="font-size: 20px; color: orange;"><b>&#160;A propos</b></span></a></td>' +
			  '</tr>' +
			  '</tbody>' +
			  '</table>';
	options+= '<div id="Xtense_serveurs">';		
	options += '<table id="Xtense_table_serveurs" style="width:675px; color: orange; background-color: black; text-align: center; font-size: 12px; opacity : 0.8;">';
	options += '<colgroup><col width="20%"/><col/></colgroup>';
	options += '<thead><tr><th class="Xtense_th" colspan="2" style="font-size: 12px; text-align:center; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;"></th></tr></thead>';
	options+= '<tbody>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">URL OGSpy</label></td>';
	options+= '<td class="value"><input class="speed" id="server.url.plugin" value="'+GM_getValue(prefix_GMData +'server.url.plugin','http://VOTRESITEPERSO/VOTREDOSSIEROGSPY/mod/xtense/xtense.php')+'" size="35" alt="24" type="text"/></td>';
	options+= '</tr>';
	options+= '<tr><td>&#160;</td><td>&#160;</td></tr>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Utilisateur</label></td>';
	options+= '<td class="value"><input class="speed" id="server.user" value="'+GM_getValue(prefix_GMData +'server.user','utilisateur')+'" size="35" alt="24" type="text"/></td>';
	options+= '</tr>';
	options+= '<tr><td>&#160;</td><td>&#160;</td></tr>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Mot de passe</label></td>';
	options+= '<td class="value"><input class="speed" id="server.pwd" value="'+GM_getValue(prefix_GMData +'server.pwd','mot de passe')+'" size="35" alt="24" type="password"/></td>';
	options+= '</tr>';
	/*options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Initialiser le serveur ?</label></td>';
	options+= '<td class="value"><input class="speed" id="server.check" size="35" alt="24" type="checkbox"'+ server_check +'/></td>';
	options+= '</tr>';*/
	options+= '</tbody></table>';
	options+= '</div>';			
	/*---------------------------- Pages -----------------------------------------------*/
	options+= '<div id="Xtense_pages">';
	options+= '<table id="Xtense_table_pages" style="width:675px; color: orange; background-color: black; text-align: center; font-size: 12px; opacity : 0.8;">';
	options+= '<colgroup><col width="30%"/><col/><col width="30%"/><col/><col width="30%"/><col/></colgroup>';
	options+= '<thead><tr><th class="Xtense_th" colspan="3" style="font-size: 12px; text-align:center; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;"></th></tr></thead>';
	options+= '<tbody>';
	options+= '<tr>';
	options+= '<td  style="color: white; font-size: 14px; font-weight: bold;text-align:left;">Envoi des données:</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Vue générale</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.overview" size="35" alt="24" type="checkbox"'+ handle_overview +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Bâtiments</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.buildings" size="35" alt="24" type="checkbox"'+ handle_buildings +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Installations</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.station" size="35" alt="24" type="checkbox"'+ handle_station +'/></td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Recherches</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.researchs" size="35" alt="24" type="checkbox"'+ handle_researchs +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Flotte</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.shipyard" size="35" alt="24" type="checkbox"'+ handle_shipyard +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Défense</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.defense" size="35" alt="24" type="checkbox"'+ handle_defense +'/></td>';
	options+= '</tr>';	
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Systemes solaires</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.system" size="35" alt="24" type="checkbox"'+ handle_system +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Liste des membres de l\'alliance</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.alliance" size="35" alt="24" type="checkbox"'+ handle_alliance +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Tous classements</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.stats" size="35" alt="24" type="checkbox"'+ handle_stats +'/></td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6" style="color: white; font-size: 14px; font-weight: bold;text-align:left;">Envoi des messages:</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Messages de joueurs</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.msg" size="35" alt="24" type="checkbox"'+ handle_msg_msg +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Messages d\'alliance</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.ally" size="35" alt="24" type="checkbox"'+ handle_msg_ally +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Rapports d\'espionnage</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.spy" size="35" alt="24" type="checkbox"'+ handle_msg_spy +'/></td>';	
	options+= '</tr>';	
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Espionnages ennemis</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.ennemy.spy" size="35" alt="24" type="checkbox"'+ handle_msg_ennemy_spy +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Rapports de combat</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.rc" size="35" alt="24" type="checkbox"'+ handle_msg_rc +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Rapports de recyclage</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.rc.cdr" size="35" alt="24" type="checkbox"'+ handle_msg_rc_cdr +'/></td>';
	options+= '</tr>';	
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Expéditions</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.expeditions" size="35" alt="24" type="checkbox"'+ handle_msg_expeditions +'/></td>';
	options+= '<td class="champ"><label class="styled textBeefy">Livraisons de commerce</label></td>';
	options+= '<td class="value"><input class="speed" id="handle.msg.commerce" size="35" alt="24" type="checkbox"'+ handle_msg_commerce +'/></td>';
	options+= '<td class="champ"></td>';
	options+= '<td class="value"></td>';
	options+= '</tr>';
	
	options+= '</tbody></table>';
	options+= '</div>';
	/*---------------------------- Options -----------------------------------------------*/
	options+= '<div id="Xtense_options">';
	options += '<table id="Xtense_table_options" style="width:675px; color: orange; background-color: black; text-align: center; font-size: 12px; opacity : 0.8;">';
	options+= '<colgroup><col width="30%"/><col/><col width="30%"/><col/><col width="30%"/><col/></colgroup>';
	options += '<thead><tr><th class="Xtense_th" colspan="3" style="font-size: 12px; text-align:center; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;"></th></tr></thead>';
	options+= '<tbody>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6" style="color: white; font-size: 14px; font-weight: bold;">Options Diverses</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Mode débogage</label></td>';
	options+= '<td class="value" style="text-align:left;"><input class="speed" id="debug.mode" size="35" alt="24" type="checkbox"'+ opt_debug_mode +'/></td>';
	options+= '<td class="champ"></td>';
	options+= '<td class="value"></td>';
	options+= '<td class="champ"></td>';
	options+= '<td class="value"></td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td class="champ"><label class="styled textBeefy">Mise à Jour Forcée du Script</label></td>';
	options+= '<td class="value" colspan="5" style="text-align:left;"><a style="cursor:pointer;color:red;"  href="http://userscripts.org/scripts/source/112690.user.js" > Mettre à jour maintenant ! </a></td>';
	options+= '<td class="champ"></td>';
	options+= '<td class="value"></td>';
	options+= '<td class="champ"></td>';
	options+= '<td class="value"></td>';
	options+= '</tbody></table>';
	options+= '</div>';
	/*---------------------------- A propos -----------------------------------------------*/
	options+= '<div id="Xtense_about">';
	options += '<table id="Xtense_table_about" style="width:675px; color: orange; background-color: black; text-align: center; font-size: 12px; opacity : 0.8;">';
	options += '<colgroup><col width="20%"/><col/></colgroup>';
	options += '<thead><tr><th class="Xtense_th" colspan="2" style="font-size: 12px; text-align:center; font-weight: bold; color: #539fc8; line-height: 30px; height: 30px;"></th></tr></thead>';
	options+= '<tbody>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6" style="color: white; font-size: 14px; font-weight: bold;">A Propos de Xtense ' + VERSION + ':</td>';
	options+= '</tr>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
    options+= '<td class="champ"><label class="styled textBeefy">Xtense GM par Jedinight et DarkNoon.<br /> Support disponible auprès de <a href="http://www.ogsteam.fr" target="_blank">l\'OGSteam</a></label></td>';
	options+= '<tr>';
	options+= '<td colspan="6">&nbsp;</td>';
	options+= '</tr>';
        options+= '<td class="champ"><label class="styled textBeefy">Xtense GM is an OGSteam Software © 2005-2012</label></td>';
    options+= '</tbody></table>';
	options+= '</div>';
	options+= '<br/><br/></div>'; //fin Tableau
    
	var einhalt=document.getElementById('inhalt');
	var escriptopt=document.createElement('div');
	escriptopt.id='xtenseScriptOpt';
	escriptopt.innerHTML=options;
	escriptopt.style.cssFloat='left';
	escriptopt.style.position='relative';
	escriptopt.style.width='670px';
	einhalt.style.display='none';
	
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	var newscriptText = document.createTextNode("function displayOption(id){if(id=='Xtense_serveurs'){document.getElementById(id).style.display='block';document.getElementById('Xtense_pages').style.display='none';document.getElementById('Xtense_options').style.display='none';document.getElementById('Xtense_about').style.display='none';document.getElementById('menu_servers').style.color='white';document.getElementById('menu_pages').style.color='orange';document.getElementById('menu_options').style.color='orange';document.getElementById('menu_about').style.color='orange';}else if(id=='Xtense_pages'){document.getElementById(id).style.display='block';document.getElementById('Xtense_serveurs').style.display='none';document.getElementById('Xtense_options').style.display='none';document.getElementById('Xtense_about').style.display='none';document.getElementById('menu_servers').style.color='orange';document.getElementById('menu_pages').style.color='white';document.getElementById('menu_options').style.color='orange';document.getElementById('menu_about').style.color='orange';}else if(id=='Xtense_options'){document.getElementById(id).style.display='block';document.getElementById('Xtense_serveurs').style.display='none';document.getElementById('Xtense_pages').style.display='none';document.getElementById('Xtense_about').style.display='none';document.getElementById('menu_servers').style.color='orange';document.getElementById('menu_pages').style.color='orange';document.getElementById('menu_options').style.color='white';document.getElementById('menu_about').style.color='orange';}else if(id=='Xtense_about'){document.getElementById(id).style.display='block';document.getElementById('Xtense_serveurs').style.display='none';document.getElementById('Xtense_pages').style.display='none';document.getElementById('Xtense_options').style.display='none';document.getElementById('menu_servers').style.color='orange';document.getElementById('menu_pages').style.color='orange';document.getElementById('menu_options').style.color='orange';document.getElementById('menu_about').style.color='white';}}");
	script.appendChild(newscriptText);
	escriptopt.appendChild(script);
	
	einhalt.parentNode.insertBefore(escriptopt,einhalt);
				
	document.getElementById("Xtense_serveurs").style.display="block";
	document.getElementById("Xtense_pages").style.display="none";
	document.getElementById("Xtense_options").style.display="none";
	document.getElementById("Xtense_about").style.display="none";

	function enregistreOptionsXtense(){				
		// Sauvegarde des inputs
		var inputOptions = XPath.getOrderedSnapshotNodes(document, "//div[@id='Xtense_Div']//input[not(@type='checkbox')]");
		//log("inputOptions.snapshotLength="+inputOptions.snapshotLength);
		if(inputOptions.snapshotLength > 0){					
			for(var i=0;i<inputOptions.snapshotLength;i++){
				var input = inputOptions.snapshotItem(i);
				GM_setValue(prefix_GMData + input.id , input.value);
			}
		}
		// Sauvegarde des checkbox
		var checkboxOptions = XPath.getOrderedSnapshotNodes(document, "//div[@id='Xtense_Div']//input[@type='checkbox']");
		//log("checkboxOptions.snapshotLength="+checkboxOptions.snapshotLength);
		if(checkboxOptions.snapshotLength > 0){
			for(var j=0;j<checkboxOptions.snapshotLength;j++){
				var checkbox = checkboxOptions.snapshotItem(j);
				//log('GM_setValue(prefix_GMData +'+checkbox.id+' , '+checkbox.checked+');');
				GM_setValue(prefix_GMData +checkbox.id , checkbox.checked);
				
			}
		}	
	}
	setInterval(enregistreOptionsXtense, 500);


}
/************************** Fin Options *********************************/

/************************ Fonctions Xtense ******************************/
/* Affichage d'Xtense dans le menu */
function displayXtense(){
    // Ajout du Menu Options (Barre latérale de Ogame)
    
    //Lien vers OGSpy
    var ogspy_link = GM_getValue(prefix_GMData +'server.url.plugin','http://www.ogsteam.fr').split('mod')[0];
    log(getElementByAttr(document,"className","showmessage"));
    // Page classique
    if (document.getElementById('playerName') && !document.getElementById('ui-dialog-title-1') && !document.getElementById('combatreport')){
		var icone = 'data:image/gif;base64,R0lGODlhJgAdAMZ8AAAAABwgJTU4OhwhJRYaHjQ3OQcICjM2OA8SFQoMDxsgJB0hJjI1Nw8TFQcICAQEBDE0NgwPEAECAiYoKREVGB8lKi4yNCMlJgoNDzAzNiMnKzE0NxATFgsNECwuMAEBASotMB4iJyImKg8SFg4PDw8QESEjJQICAiAkKRgZGhsdHhUWFwoLCwoMDjI2OBcbHxsgIw0PEhsfIx8jJywvMh8hIhobHB8kKQkMDQYICQoNECwwMxcZGQsOER0iJygrLxweHysuMSUoLAkLDiQnKwwPESElKTM2NyAiIwcKCyAjJxoeISIlKiIkJRIWGRQWFiosLSUnKDAzNBscHRoeIgMEBDAyNA4ODyAkKAcICQkKCwwQEiMnKhwgJBIVGRAQEScqLiosLgcJCgcJCzQ2OAQEBQgICAkJCiksMCQmJwYHCSAjKC0vMQYGBh4jJyUpLSksLRAUFygsLzM2OSsuLyotMQwNDTAzNS4xMiwvMAkJDAkLDf///////////////yH5BAEAAH8ALAAAAAAmAB0AAAf+gH+CFQOFhoeIiRWCjI2ON4cBkpKIlIgVMI6af4SFk5+gk5UwBJuNBIahqqs+paaCBKuyoG4BA66vBFSgAr2+k74CnwoBuKaxkz7AvZ9rAcyTCgrGm8iq0Mug0tSa1qG/ktiTXbevsDKfC5/YwqvcjgTosszt7uZ/BN7f4Kov741i8gkcKLAXwYNZ7gFYyLAhQ18OIyqM6DCYAIoMJ2JceBFAr40ANGLs6PEjRpERTXJUyVBCSHMbWa48CZOizJUkG6IsGaxhT4k1I7oESXHnwqFEHd7LAUBN0qT3huDYI3VMEgNYs27EmkOLnnt/tsQoUqRHh7MY0iZY24KtDh0gAHpEmAtWkBMvceJw2NsAQV+/IwALpkChruHDiBPXDQQAOw==';
    
    	var aAttrs = "";    
    	var urlIcone = "";var onClick=null;
    	if(GM_getValue(prefix_GMData +'manual.send','false').toString() =='true'){
    		aAttrs = 'onClick="window.location.reload()" target="_self"';
    	} else {
    		aAttrs='href="'+ ogspy_link +'" target="blank_" ';
    	}
    
        var aff_option ='<span class="menu_icon"><a '+aAttrs+'><img id="xtense.icone" class="mouseSwitch" src="'+icone+'" height="29" width="38"></span><a class="menubutton " href="'+url+'&xtense=Options" accesskey="" target="_self">';
        aff_option += '<span class="textlabel">Xtense</span></a>';
    
    
        var li1 = document.createElement("li");
        li1.setAttribute("id", "optionXtense");
        li1.innerHTML=aff_option;				
    
    	var menuAlliance = XPath.getSingleNode(document,"//*[@id='menuTable']/li[contains(a/@href,'page=alliance')]");
    	if(document.getElementById('optionXtense')!=null){
    		document.getElementById('menuTable').removeChild(document.getElementById('optionXtense'));
    	}
    	menuAlliance.parentNode.insertBefore(li1, menuAlliance.nextSibling);
    } else if(getElementByAttr(document,"className","showmessage")){ // Dans les messages ?
    	log("icon for messages");
        var toolbarMessage = XPath.getSingleNode(document,"//div[contains(@id,'messages']");
    	var icone = 'data:image/gif;base64,R0lGODlhJgAdAMZ8AAAAABwgJTU4OhwhJRYaHjQ3OQcICjM2OA8SFQoMDxsgJB0hJjI1Nw8TFQcICAQEBDE0NgwPEAECAiYoKREVGB8lKi4yNCMlJgoNDzAzNiMnKzE0NxATFgsNECwuMAEBASotMB4iJyImKg8SFg4PDw8QESEjJQICAiAkKRgZGhsdHhUWFwoLCwoMDjI2OBcbHxsgIw0PEhsfIx8jJywvMh8hIhobHB8kKQkMDQYICQoNECwwMxcZGQsOER0iJygrLxweHysuMSUoLAkLDiQnKwwPESElKTM2NyAiIwcKCyAjJxoeISIlKiIkJRIWGRQWFiosLSUnKDAzNBscHRoeIgMEBDAyNA4ODyAkKAcICQkKCwwQEiMnKhwgJBIVGRAQEScqLiosLgcJCgcJCzQ2OAQEBQgICAkJCiksMCQmJwYHCSAjKC0vMQYGBh4jJyUpLSksLRAUFygsLzM2OSsuLyotMQwNDTAzNS4xMiwvMAkJDAkLDf///////////////yH5BAEAAH8ALAAAAAAmAB0AAAf+gH+CFQOFhoeIiRWCjI2ON4cBkpKIlIgVMI6af4SFk5+gk5UwBJuNBIahqqs+paaCBKuyoG4BA66vBFSgAr2+k74CnwoBuKaxkz7AvZ9rAcyTCgrGm8iq0Mug0tSa1qG/ktiTXbevsDKfC5/YwqvcjgTosszt7uZ/BN7f4Kov741i8gkcKLAXwYNZ7gFYyLAhQ18OIyqM6DCYAIoMJ2JceBFAr40ANGLs6PEjRpERTXJUyVBCSHMbWa48CZOizJUkG6IsGaxhT4k1I7oESXHnwqFEHd7LAUBN0qT3huDYI3VMEgNYs27EmkOLnnt/tsQoUqRHh7MY0iZY24KtDh0gAHpEmAtWkBMvceJw2NsAQV+/IwALpkChruHDiBPXDQQAOw==';
        
        var liXtense = document.createElement("li");
        var aXtense = document.createElement("a");
        aXtense.setAttribute("href", ogspy_link);
        aXtense.setAttribute("target", "blank_");
        
        var imgXtense = document.createElement("img");
        imgXtense.setAttribute("id", "xtense.icone");
        imgXtense.setAttribute("src", icone);
        imgXtense.setAttribute("height", "16");
        imgXtense.setAttribute("width", "16");
        
        aXtense.appendChild(imgXtense);
        liXtense.appendChild(aXtense);
        
        toolbarMessage.appendChild(liXtense);
    } else if(document.getElementById('combatreport')){ // Dans un rc ?
    	var roundInfo = XPath.getSingleNode(document,"//*[@id='combatreport']//div[contains(@class,'round_info')]");
    	var icone = 'data:image/gif;base64,R0lGODlhJgAdAMZ8AAAAABwgJTU4OhwhJRYaHjQ3OQcICjM2OA8SFQoMDxsgJB0hJjI1Nw8TFQcICAQEBDE0NgwPEAECAiYoKREVGB8lKi4yNCMlJgoNDzAzNiMnKzE0NxATFgsNECwuMAEBASotMB4iJyImKg8SFg4PDw8QESEjJQICAiAkKRgZGhsdHhUWFwoLCwoMDjI2OBcbHxsgIw0PEhsfIx8jJywvMh8hIhobHB8kKQkMDQYICQoNECwwMxcZGQsOER0iJygrLxweHysuMSUoLAkLDiQnKwwPESElKTM2NyAiIwcKCyAjJxoeISIlKiIkJRIWGRQWFiosLSUnKDAzNBscHRoeIgMEBDAyNA4ODyAkKAcICQkKCwwQEiMnKhwgJBIVGRAQEScqLiosLgcJCgcJCzQ2OAQEBQgICAkJCiksMCQmJwYHCSAjKC0vMQYGBh4jJyUpLSksLRAUFygsLzM2OSsuLyotMQwNDTAzNS4xMiwvMAkJDAkLDf///////////////yH5BAEAAH8ALAAAAAAmAB0AAAf+gH+CFQOFhoeIiRWCjI2ON4cBkpKIlIgVMI6af4SFk5+gk5UwBJuNBIahqqs+paaCBKuyoG4BA66vBFSgAr2+k74CnwoBuKaxkz7AvZ9rAcyTCgrGm8iq0Mug0tSa1qG/ktiTXbevsDKfC5/YwqvcjgTosszt7uZ/BN7f4Kov741i8gkcKLAXwYNZ7gFYyLAhQ18OIyqM6DCYAIoMJ2JceBFAr40ANGLs6PEjRpERTXJUyVBCSHMbWa48CZOizJUkG6IsGaxhT4k1I7oESXHnwqFEHd7LAUBN0qT3huDYI3VMEgNYs27EmkOLnnt/tsQoUqRHh7MY0iZY24KtDh0gAHpEmAtWkBMvceJw2NsAQV+/IwALpkChruHDiBPXDQQAOw==';
        
        var pXtense = document.createElement("p");
        var aXtense = document.createElement("a");
        aXtense.setAttribute("href", ogspy_link);
        aXtense.setAttribute("target", "blank_");
        
        var imgXtense = document.createElement("img");
        imgXtense.setAttribute("id", "xtense.icone");
        imgXtense.setAttribute("src", icone);
        imgXtense.setAttribute("height", "16");
        imgXtense.setAttribute("width", "16");
        
        aXtense.appendChild(imgXtense);
        pXtense.appendChild(aXtense);
        
        roundInfo.appendChild(pXtense);
    }
}
/********************** Fin Fonctions Xtense ****************************/

/**************** PARSERS & Communication OGSPY *************************/
/* Fonction permettant d'initialiser les Xpaths, les parsers Xpath et le parser des metasdonnées */
function initParsers(){
/* Fonctions Xpaths */
XPath = {//node est facultatif
	getNumberValue : function (doc,xpath,node) {
		node = node ? node : doc;
		return doc.evaluate(xpath,node,null,XPathResult.NUMBER_TYPE, null).numberValue;
	},
	getStringValue : function (doc,xpath,node) {
		node = node ? node : doc;
		return doc.evaluate(xpath,node,null,XPathResult.STRING_TYPE, null).stringValue;
	},
	getOrderedSnapshotNodes : function (doc,xpath,node) {
		node = node ? node : doc;
		return doc.evaluate(xpath,node,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	},
	getUnorderedSnapshotNodes : function (doc,xpath,node) {
		node = node ? node : doc;
		return doc.evaluate(xpath,node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	},	
	getSingleNode : function (doc,xpath,node) {
		node = node ? node : doc;
		return doc.evaluate(xpath,node,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
}

XtenseXpaths = {
	metas : {
		ogame_version: "//meta[@name=\'ogame-version\']/@content",
		timestamp: "//meta[@name=\'ogame-timestamp\']/@content",
		universe: "//meta[@name=\'ogame-universe\']/@content",
		language: "//meta[@name=\'ogame-language\']/@content",
		player_id: "//meta[@name=\'ogame-player-id\']/@content",
		player_name: "//meta[@name=\'ogame-player-name\']/@content",
		ally_id: "//meta[@name=\'ogame-alliance-id\']/@content",
		ally_name: "//meta[@name=\'ogame-alliance-name\']/@content",
		ally_tag: "//meta[@name=\'ogame-alliance-tag\']/@content",
		planet_id: "//meta[@name=\'ogame-planet-id\']/@content",
		planet_name: "//meta[@name=\'ogame-planet-name\']/@content",
		planet_coords: "//meta[@name=\'ogame-planet-coordinates\']/@content",
		planet_type: "//meta[@name=\'ogame-planet-type\']/@content"
	},
	ally_members_list : {
		rows : '//table[@id="member-list"]/tbody/tr',
		player : 'td[1]',
		rank : 'td[4]/a',
		points : 'td[4]/@title',
		coords : 'td[5]/span/a',
		tag : '//table[@class="members bborder"]/tbody/tr[2]/td[2]/span'
	},
	overview : {
		cases : ".//*[@id='diameterContentField']/span[2]/text()",
		temperatures : ".//*[@id='temperatureContentField']/text()"
	},
	galaxy : { 
		rows : '//tr[contains(@class, "row")]',
		position : 'td[contains(@class, "position")]/text()',
		planetname : 'td[contains(@class,"planetname")]/text()',
		planetname_l : 'td[contains(@class,"planetname")]/a/text()',
		planetname_tooltip : 'td[contains(@class,"microplanet")]//div[contains(@id,"planet")]/h1/span/text()',
		moon : 'td[contains(@class,"moon")]/a',
		debris : 'descendant::li[contains(@class,"debris-content")]',
		playername : 'td[contains(@class,"playername")]//span[starts-with(@class,"status_")]/text()',//* pour a en general, span pour joueur courant,
		playername2 : 'td[contains(@class,"playername")]/*[2]/text()', //Pour joueur bandit ou empereur
		playername_tooltip : 'td[contains(@class,"playername")]//div[contains(@id,"player")]/h1/span/text()',
		allytag : 'td[contains(@class, "allytag")]/span/text()',
		status : 'descendant::span[starts-with(@class,"status_") and @title]',
		status_baned : 'descendant::span[starts-with(@class,"status_")]/a[@title]/text()',
		activity : 'td[contains(@class,"microplanet")]/div[contains(@class,"activity")]/text()',
		activity15 : 'td[contains(@class,"microplanet")]/div[contains(@class,"minute15")]/@class',
		activity_m : 'td[contains(@class,"moon")]/div[contains(@class,"activity")]/text()',
		activity15_m : 'td[contains(@class,"moon")]/div[contains(@class,"minute15")]/@class',
		player_id : 'descendant::a[contains(@href,"writemessage")]/@href',
		ally_id : 'descendant::a[@target="_ally"]/@href',
		planet_id : 'td[contains(@class,"microplanet")]/@data-planet-id',
		moon_id : 'td[contains(@class,"moon")]/@data-moon-id',
		table_galaxy : '//table[@id="galaxytable"]/tbody',
		table_galaxy_header : '//table[@id="galaxytable"]/tbody/tr[@class="info info_header"]',
		galaxy_input : '//table[@id="galaxytable"]/@data-galaxy',
		system_input : '//table[@id="galaxytable"]/@data-system'
	},
		
	levels : {
		level : '//span[contains(@class,"level")]/text()'
	},
	
	messages : {
		showmessage : '//div[@class="showmessage"]',
		combatreport : '//div[@class="combatreport"]',
		messageid : "@data-message-id",
		messagebox : '//div[contains(@class,"messagebox")]',
		from : '//div[@class="infohead"]/table/tbody/tr[1]/td/span',
		to : '//div[@class="infohead"]/table/tbody/tr[2]/td/text()',
		subject : '//div[@class="infohead"]/table/tbody/tr[3]/td/text()',
		date : '//div[@class="infohead"]/table/tbody/tr[4]/td/text()',
		reply : '//*[contains(@class,"toolbar")]/li[contains(@class,"reply")]',
		contents : {
			'spy' : '//div[@class="note"]',
			'msg': '//div[contains(@class,"other")]',
			'ally_msg': '//div[@class="note"]',
			'expedition': '//div[@class="note"]',
			'rc': '//div[contains(@class,"battlereport")]',
			'rc_cdr': '//div[@class="note"]',
			'ennemy_spy': '//div[@class="textWrapper"]/div[@class="note"]',
			'livraison': '//div[@class="note"]',
			'livraison_me': '//div[@class="note"]'
		},
		spy : {
			playername : '//table[@class="material spy"]//span[contains(@class,"status")]/text()',
			materialfleetdefbuildings : '//table[contains(@class,"fleetdefbuildings") or contains(@class,"material spy")]//th[@class="area"]',
			moon : '//td[@class="attack"]/a/@href'
		}
	},
		
	parseTableStruct : {
		units : "id('buttonz')//ul/li/div/div",
		id : "a[starts-with(@id,'details')]",
		number : "a/span"
	},
	
	planetData : {
		name : "id('selectedPlanetName')",
		name_planete : "//span[@class='planet-name']",
		coords : "//div[@class='smallplanet']/a[contains(@class,'active') or @href='#']/span[@class='planet-koords']",
		coords_unique_planet : "//div[@class='smallplanet']/a[contains(@class,'') or @href='#']/span[@class='planet-koords']"
	},
	
	ranking : { 
		date : "//div[@id=\'OGameClock\']/text()",
		time : "//div[@id=\'OGameClock\']/span/text()",
		who : "//div[@id=\'categoryButtons\']/a[contains(@class,'active')]/@id",
		type : "//div[@id=\'typeButtons\']/a[contains(@class,'active')]/@id",
		subnav_fleet : "//div[@id=\'subnav_fleet\']/a[contains(@class,'active')]/@rel",
		
		rows : "id(\'ranks\')/tbody/tr",
		position : "td[contains(@class,\'position\')]/text()",
		points :  "td[contains(@class,\'score\')]/text()",
		nb_vaisseaux :  "td[contains(@class,\'score\')]/@title",
		allytag : "td[@class=\'name\']/div[@class=\'ally-tag\']/a/text() | td[@class=\'name\']/span[@class=\'ally-tag\']/a/text()",
		ally_id : "td[@class=\'name\']/div[@class=\'ally-tag\']/a/@href | td[@class=\'name\']/span[@class=\'ally-tag\']/a/@href",
		player : {
			playername : "td[@class=\'name\']//a[contains(@href,\'galaxy\') and contains(@href,\'system\')]/span/text()",
			player_id : "td[@class=\'sendmsg\']//a[contains(@href,\'writemessage\')]/@href",
		},
		
		ally : {
			members : "td[contains(@class,'member_count')]/text()",
			points_moy :  "td[contains(@class,'score')]/div/text()"
		}
	},
	
	ressources : {
		metal : "//span[@id=\'resources_metal\']/text()",
		cristal : "//span[@id=\'resources_crystal\']/text()",
		deuterium : "//span[@id=\'resources_deuterium\']/text()",
		antimatiere : "//span[@id=\'resources_darkmatter\']/text()",
		energie : "//span[@id=\'resources_energy\']/text()"	
	},
	rc : {
		list_infos : '//div[@class="combatreport"]//td[@class="newBack"]/center',
		list_rounds : '//div[@class="combatreport"]//div[@class="round_info"]',
		infos : {
			player : 'span[contains(@class, "name")]',
			weapons : 'span[contains(@class, "weapons")]',
			destroyed : 'span[contains(@class, "destroyed")]'
		},
		list_types : 'table/tbody/tr[1]/th',
		list_values : 'table/tbody/tr[2]/td',
		result : '//div[@id="combat_result"]',
		combat_round : '//div[@id="master"]'//div[@class="combat_round"]'
	},		
	writemessage : {
		form : '//form[1]',
		from : 'id("wrapper")/form/div/table/tbody/tr[1]/td',
		to : 'id("wrapper")/form/div/table/tbody/tr[2]/td',
		subject : 'id("wrapper")/form/div[1]/table/tbody/tr[3]/td/input',
		date : 'id("wrapper")/form/div/table/tbody/tr[4]/td',
		content : 'id("wrapper")/form/div[2]/div/textarea'
	}
}
    XtenseRegexps = {
        planetNameAndCoords : ' (.*) \\[(\\d+:\\d+:\\d+)\\]',
        planetCoords : '\\[(\\d+:\\d+:\\d+)\\]',
        userNameAndCoords : '(.*) \\[(\\d+:\\d+:\\d+)\\]',
        userNameAndDestroyed : ' (.*) d.truit',
        moon : '=(\\d+)*',
        
        messages : {
            ennemy_spy : '\\[(\\d+:\\d+:\\d+)\\][^\\]]*\\[(\\d+:\\d+:\\d+)\\][^%\\d]*([\\d]+)[^%\\d]*%',		
			trade_message_infos : 'Une flotte .trang.re de (.*) [(](.*)\\[(\\d+:\\d+:\\d+)\\][)] a livr. des ressources . (.*) \\[(\\d+:\\d+:\\d+)\\]',
			trade_message_infos_me : 'Votre flotte de la plan.te (.*) \\[(\\d+:\\d+:\\d+)\\] a atteint la plan.te (.*) \\[(\\d+:\\d+:\\d+)\\] et y a livr. les ressources suivantes',
			trade_message_infos_res_livrees : '(.*)Vous aviez [:]',
			trade_message_infos_res : 'tal(.*)Cristal(.*)Deut.rium(.*)',
			trade_message_infos_me_res : 'tal(.*)Cristal(.*)Deut.rium(.*)'
        },

        probability : ': (\\d+) %',
        coords : '\\[(\\d+:\\d+:\\d+)\\]',
        ally : 'Alliance \\[(.*)\\]',
        ally_msg_player_name : 'Courriel group. de (.*)',
		ally_msg_player_infos : 'Le joueur <span.*</span> vous a envoy. ce message&nbsp;:<br>\n((.*\n)*)',
        parseTableStruct : '<a[^>]*id="details(\\d+)"[^>]*>[\\D\\d]*?([\\d.]+[KMG]?)<\/span>[^<]*<\/span>[^<]*<\/a>'
    }
	/* Fonctions permettant de rÃ©cupÃ©rer les donnÃ©es des balises metas */
	XtenseMetas = {
		getOgameVersion : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.ogame_version);	
		},
		getTimestamp : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.timestamp);	
		},
		getUniverse : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.universe);	
		},
		getLanguage : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.language);	
		},
		getPlayerId : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.player_id);	
		},
		getPlayerName : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.player_name);	
		},
		getAllyId : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.ally_id);	
		},
		getAllyName : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.ally_name);	
		},
		getAllyTag : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.ally_tag);	
		},
		getPlanetId : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.planet_id);	
		},
		getPlanetName : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.planet_name);	
		},
		getPlanetCoords : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.planet_coords);	
		},
		getPlanetType : function() {
			return XPath.getStringValue(document,XtenseXpaths.metas.planet_type);	
		}
	}
}
/* Permet d'initialiser la communication avec OGSPY (serveur, BDD)*/
function initOGSpyCommunication (){

// Toutes les unites du jeu
// id : nom du champ dans la bdd
	XtenseDatabase = {
	'resources': {601:'metal',602:'cristal',603:'deuterium',604:'energie'},
	'buildings': { 1:'M', 2:'C', 3:'D', 4:'CES', 
				12:'CEF', 14:'UdR', 15:'UdN', 
				21:'CSp', 212:'Sat', 22:'HM', 23:'HC', 
				24:'HD', 25:'CM', 26:'CC', 
				27:'CD',31:'Lab', 33:'Ter', 
				34:'DdR', 44:'Silo', 41:'BaLu', 
				42:'Pha', 43:'PoSa'
				},
	'researchs': { 106:'Esp', 108:'Ordi', 109:'Armes',
				110:'Bouclier', 111:'Protection', 
				113:'NRJ', 114:'Hyp', 115:'RC', 
				117:'RI', 118:'PH', 120:'Laser', 
				121:'Ions', 122:'Plasma', 123:'RRI', 
				124: 'Astrophysique', 199:'Graviton'
				},
	'fleet': { 202:'PT', 203:'GT', 204:'CLE', 205:'CLO', 206:'CR', 207:'VB', 208:'VC', 209:'REC', 210:'SE', 211:'BMD', 212:'SAT', 213:'DST',
				214:'EDLM', 215:'TRA'
				},
	'defense': { 401:'LM', 402:'LLE', 403:'LLO', 404:'CG', 405:'AI', 406:'LP', 407:'PB', 408:'GB', 502:'MIC', 503:'MIP' }
	}

//*************************************************
//** Fonctions Xtense : Envoi de données à OGSpy **
//*************************************************
	XtenseRequest = {
		postedData : [],
		loading : {},
		data : {},
		send : function (){
		
				var postData = 'toolbar_version=' + VERSION + '&toolbar_type=' + TYPE + '&mod_min_version=' + PLUGIN_REQUIRED + '&user=' + GM_getValue(prefix_GMData +'server.user','') + '&password=' + MD5(SHA1(GM_getValue(prefix_GMData +'server.pwd',''))) + '&univers=' + urlUnivers + XtenseRequest.serializeData();
				log("sending " + postData + " to " + GM_getValue(prefix_GMData +'server.url.plugin','') + " from " + urlUnivers);
				new Xajax(
				{
					url: GM_getValue(prefix_GMData +'server.url.plugin',''),
					post: postData,
					callback: null,
					scope: this
				});
				
				postedData = postData;
				loading = true;
				
		},		
		call : function (Server, Response){
			XtenseRequest.loading[Server.n] = false;
			XtenseRequest.callback.apply(this.scope,[ this, Server, Response]);
		},
		set : function (name, value){
			if (typeof name == 'string') this.data[name] = value; else {
				for (var n = 0, len = arguments.length; n < len; n++){
					for (var i in arguments[n]) this.data[i] = arguments[n][i];
				}
			}
		},		
		serializeObject : function (obj, parent, tab){
			var retour = '';
			var type = typeof obj;
			if (type == 'object'){
				for (var i in obj){
					if (parent != '')
					var str = parent + '[' + i + ']'; else var str = i;
					var a = false;
					// Patch pour Graphic Tools for Ogame
					if (str.search("existsTOG") == - 1){
						a = this.serializeObject(obj[i], str, tab);
					}
					if (a != false)
					tab.push(a);
				}
				return false;
			} else if (type == 'boolean')
			retour = (obj == true? 1: 0); else retour = obj + '';
			return parent + '=' + encodeURIComponent(retour).replace(new RegExp("(%0A)+", "g"), '%20').replace(new RegExp("(%09)+", "g"), '%20').replace(new RegExp("(%20)+", "g"), '%20');
		},		
		serializeData : function (){
			var uri = '';
			var tab =[];
			this.serializeObject(this.data, '', tab);
			uri = '&' + tab.join('&');
			return uri;
		},
		check : function(isCheck){
			var postData = 'toolbar_version=' + VERSION + '&mod_min_version=' + PLUGIN_REQUIRED + '&user=' + GM_getValue(prefix_GMData +'server.user','') + '&password=' + MD5(SHA1(GM_getValue(prefix_GMData + 'server.pwd',''))) + '&univers=' + urlUnivers + XtenseRequest.serializeData()+(GM_getValue(prefix_GMData +'server.check','false').toString() =='true'?'&server_check=1':'');
				log("sending " + postData + " to " + GM_getValue(prefix_GMData +'server.url.plugin','') + " from " + urlUnivers);
				new Xajax(
				{
					url: GM_getValue(prefix_GMData +'server.url.plugin',''),
					post: postData,
					callback: null,
					scope: this
				});
				
				postedData = postData;
				loading = true;
		}		
	}


}
/* Interpretation des retours Xtense (module OGSPY) */
function handleResponse(Response) {
	//log(Response.responseText);
    //log(Response.status);
	var message_start = '"'+GM_getValue(prefix_GMData +'server.name','')+'" : ';
	
	//var extra = {Request: Request, Server: Server, Response: Response, page: Request.data.type};
	if (Response.status != 200) {
		if (Response.status == 404) 		setStatus(XLOG_ERROR,Xl('http_status_404'));
		else if (Response.status == 403) 	setStatus(XLOG_ERROR,Xl('http_status_403'));
		else if (Response.status == 500) 	setStatus(XLOG_ERROR,Xl('http_status_500'));
		else if (Response.status == 0)		setStatus(XLOG_ERROR,Xl('http_timeout'));
		else 								setStatus(XLOG_ERROR,Xl('http_status_unknow'), Response.status);
	} else {		
		var type = XLOG_SUCCESS;
		
		if (Response.responseText == '' || typeof(Response.responseText)== 'undefined') {
			setStatus(XLOG_ERROR, message_start + Xl('empty_response'));
			return;
		}
		
		if (Response.responseText == 'hack') {
			setStatus(XLOG_ERROR, message_start + Xl('response_hack'));
			return;
		}
		
		var data = {};
		if (Response.responseText.match(/^\(\{.*\}\)$/g)){
			data = eval(Response.responseText);
		} else {
			var match = null;
			if ((match = Response.responseText.match(/\(\{.*\}\)/))) {
				data = eval(match[0]);
				// Message d'avertissement
				type = XLOG_WARNING;
				log("full response:"+escape(Response.responseText));
			} else {
				// Message d'erreur
				setStatus(XLOG_ERROR, message_start + Xl('invalid_response'));
				return;
			}
		}
		if(data.servername==null){
			var message = '';
			var code = data.type;
			//log('Code='+code)
			if (data.status == 0) {
				type = XLOG_ERROR;
				if (code == 'wrong version') {
					if (data.target == 'plugin') 			message = Xl('error_wrong_version_plugin', PLUGIN_REQUIRED, data.version); 
					else if (data.target == 'xtense.php') 	message = Xl('error_wrong_version_xtense.php');
					else 									message = Xl('error_wrong_version_toolbar', data.version, VERSION);
				}
				else if (code == 'php version')			message = Xl('error_php_version', data.version);
				else if (code == 'server active') 		message = Xl('error_server_active', data.reason);
				else if (code == 'username') 			message = Xl('error_username');
				else if (code == 'password') 			message = Xl('error_password');
				else if (code == 'user active') 		message = Xl('error_user_active');
				else if (code == 'home full')			message = Xl('error_home_full');
				else if (code == 'plugin connections')	message = Xl('error_plugin_connections');
				else if (code == 'plugin config')		message = Xl('error_plugin_config');
				else if (code == 'plugin univers')		message = Xl('error_plugin_univers');
				else if (code == 'grant') 				message = Xl('error_grant_start') + Xl('error grant '+ data.access);
				else 									message = Xl('unknow_response', code, Response.responseText);
			} else {
				if (code == 'home updated' && data.page=='overview') 			message = Xl('success_home_updated', Xl('page_overview',data.page));
				else if (code == 'system')				message = Xl('success_system', data.galaxy, data.system);
				else if (code == 'home updated' && data.page=='labo')			message = Xl('success_home_updated', Xl('page_labo',data.page));
				else if (code == 'home updated' && data.page=='buildings')			message = Xl('success_home_updated', Xl('page_buildings',data.page));
				else if (code == 'home updated' && data.page=='fleet')		message = Xl('success_home_updated', Xl('page_fleet',data.page));
				else if (code == 'home updated' && data.page=='defense')		message = Xl('success_home_updated', Xl('page_defense',data.page));
				else if (code == 'rc')					message = Xl('success_rc');
				else if (code == 'rc_cdr')					message = Xl('success_rc_cdr');				
				else if (code == 'messages')			message = Xl('success_messages');
				else if (code == 'ranking') 			message = Xl('success_ranking', Xl('ranking_'+data.type1), Xl('ranking_'+data.type2), data.offset, data.offset+99);			
				else if (code == 'ally_list')			message = Xl('success_ally_list', data.tag);
				else if (code == 'spy') 				message = Xl('success_spy');
				else 									message = Xl('unknow_response', code, Response.responseText);
			}
			
			//if (Xprefs.getBool('display-execution-time') && data.execution) message = '['+data.execution+' ms] '+ message_start + message;
			//if (Xprefs.getBool('display-new-messages') && typeof data.new_messages!='undefined') Request.Tab.setNewPMStatus (data.new_messages, Server);
			//message = '['+data.execution+' ms] '+ message_start + message;
			
			if (data.calls) {
				// Merge the both objects
				//var calls = extra.calls = data.calls;
				var calls = data.calls;
				calls.status = 'success';
				
				if (calls.warning.length > 0) calls.status = 'warning';
				if (calls.error.length > 0) calls.status = 'error';
				
				// Calls messages
				if (data.call_messages) {
					calls.messages = {success: [], warning: [], error: []};
					
					// Affichage des messages dans l'ordre : success, warning, error
					for (var i = 0, len = data.call_messages.length; i < len; i++) {
						calls.messages[data.call_messages[i].type].push(data.call_messages[i].mod + ' : ' +data.call_messages[i].message);
					}
				}
			}
			setStatus(type,'['+data.execution+' ms] ' + message_start + message);
			//Request.Tab.setStatus(message, type, extra);
		} else {
			GM_setValue(prefix_GMData +'server.name',data.servername);
			log(data.servername);
		}
	}
}

/************ FIN PARSERS & Communication OGSPY *************************/

/************************ Locales & Lang ********************************/
/* Fonction d'implementation des locales, lang */
function Ximplements (object, implement) {
	for (var i in implement) object[i] = implement[i];
}
/* Fonction initialisation des locales des status (retours OGSPY) */
function initLocales(){
    Xlang = {
        http_status_403: 'statut 403, Impossible d\'acceder au plugin Xtense.',
        http_status_404: 'statut 404, Plugin Xtense introuvable, vérifiez que vous avez bien mis la bonne adresse vers le plugin Xtense',
        http_status_500: 'statut 500: Erreur interne au serveur.',
        http_timeout: 'Le serveur n\'a pas répondu à temps. Verifiez que votre hébergeur ne rencontre pas des problèmes de réseau.',
        //
        empty_response : 'Réponse du plugin vide',
        invalid_response : 'Impossible de récupérer les données envoyées par le plugin, verifiez que votre hebergeur ne rajoute pas de la pub, ce qui peut provoquer cette erreur.',
        //
        php_version : 'La version PHP de votre hébergement n\'est pas assez récente. Xtense requiert au minimum la version 5.1 de PHP.',
        wrong_version_plugin : 'Vous ne pouvez pas vous connecter au plugin, sa version est trop vielle pour pouvoir être utilisée avec votre barre d\'outils. Version du plugin : $1, version requise : $2 \nVous devez mettre à jour le plugin Xtense avant de pouvoir continuer', // Actual pluhin version, version required
        wrong_version_xtense : 'Votre fichier xtense.php n\'a pas la même version que celle du plugin installé',
        wrong_version_toolbar : 'Vous ne pouvez pas vous connecter au plugin avec votre version de Xtense.\nVotre version : $1, requise : $2\nVous devez mettre à jour votre barre d\'outils Xtense avant de pouvoir continuer', // Actual toolbar version, version required
        server_active: 'le serveur OGSpy est pour le moment désactivé',
        plugin_connections: 'Connexions au plugin Xtense désactivées',
        plugin_config: 'Plugin Xtense non configuré par votre administrateur, impossible de l\'utiliser',
        plugin_univers: 'Numéro d\'univers d\'Ogame invalide sur cet OGSpy',
        username: 'Le compte "$1" est inconnu. Attention à la casse (différence Majuscules / minuscules)', // Username
        password: 'Votre mot de passe n\'est pas bon. Attention à la casse (différence Majuscules / minuscules)',
        user_active: 'Votre compte est inactif, vous ne pouvez pas vous connecter',
        //
        informations : 'Informations',
        server_name : 'Nom du serveur OGSpy', // Server name TODO : A internationaliser dans les options
        version : 'Version', // version
        //
        grant_can : 'pouvez',
        grant_cannot : 'ne pouvez pas',
        grant_system : 'Vous $1 ajouter des systêmes solaires', // can / cannot
        grant_ranking : 'Vous $1 ajouter des classements', // can / cannot
        grant_empire : 'Vous $1 mettre à jour votre espace personnel (Batiments, Recherches, Empire...)', // can / cannot
        grant_messages : 'Vous $1 ajouter de messages (Rapports d\'espionnages, Rapports de combats, Espionnages ennemis...)', // can / cannot
        //
        unknow_page: 'Page inconnue',
        Xtense_activated : 'Activer',
        Xtense_deactivated : 'Desactiver',
        wait_send: 'En attente de l\'envoi manuel des données',
        unavailable_parser_lang: 'Xtense ne prend pas en charge ce serveur de jeu ($1)', // lang (ogame domain extension) TODO
        //
        overview_detected: 'Vue générale détectée',
        buildings_detected: 'Batiments détectés',
        installations_detected: 'Installations détectés',
        researchs_detected: 'Recherches détectés',
        fleet_detected: 'Flotte détectée',
        defense_detected: 'Défenses détectés',
        messages_detected: 'Page de messages détectée',
        ranking_detected: 'Statistiques $2 des $1 détectées', // Primary type (ally/player), Secondary type (points, research, fleet)
        ally_list_detected: 'Liste des joueurs de l\'alliance détectée',
        system_detected: 'Système solaire détecté: ', // Galaxy, System
        re_detected: 'Rapport d\'espionnage détecté',
        rc_detected: 'Rapport de combat détecté',
        res_detected: 'Message de commerce détecté',
        //
        ranking_player: 'joueurs',
        ranking_ally: 'alliances',
        ranking_points: 'points',
        ranking_fleet: 'militaire',
        ranking_research: 'recherches',
        ranking_defense: 'défense',
        ranking_buildings: 'bâtiments',
		ranking_fleet5 : 'militaire construit',
        ranking_fleet6 : 'militaire destruction',
        ranking_fleet4 : 'militaire pertes',
        ranking_fleet7 : 'militaire honneur',
        ranking_economy : 'économique',
        //
        invalid_system : 'Systême solaire non pris en compte',
        invalid_ranking : 'Page des statistiques invalide',
        invalid_rc : 'Rapport de combat invalide (Contact perdu)',
        no_ranking : 'Aucun classement à envoyer',
        no_messages : 'Aucun message à envoyer',

        // Responses
        response_start: 'Serveur $1 : ', // Serveur number
        http_status_unknow : 'Code d\'erreur Inconnu $1', // Http status
        response_hack : 'Les données envoyées ont été refusées par le plugin Xtense',
        //
        error_php_version : 'Le plugin requiert PHP 5.1 pour fonctionner, la version actuelle ($1) n\'est pas assez récente',
        error_wrong_version_plugin : 'La version du mod Xtense sur le serveur est incompatible avec la version de votre barre d\'outils (requise: $1, version du mod : $2)', // required version, actual version
        error_wrong_version_xtense : 'Votre fichier xtense.php n\'a pas la même version que celle du plugin installé',
        error_wrong_version_toolbar : 'La version de la barre d\'outils Xtense est incompatible avec celle du plugin (requise: $1, votre version: $2)', // required version, actual version
        error_server_active : 'Serveur OGSpy inactif (Raison: $1)', // reason
        error_username: 'Pseudo invalide',
        error_password: 'Mot de passe invalide',
        error_user_active: 'Votre compte est inactif',
        error_home_full: 'Votre espace personnel est plein, impossible de rajouter une nouvelle planête',
        error_plugin_connections: 'Connexions au plugin Xtense non autorisées',
        error_plugin_config: 'Plugin Xtense non configuré par votre administrateur, impossible de l\'utiliser',
        error_plugin_univers: 'Numéro d\'univers d\'Ogame invalide sur cet OGSpy',
        error_grant_start: 'Vous ne possédez pas les autorisations nécessaires pour envoyer ',
        error_grant_empire: 'des pages de votre empire (Bâtiments, Laboratoire...)',
        error_grant_messages: 'des messages',
        error_grant_system: 'des systèmes solaires',
        error_grant_ranking: 'des classements',
        //
        success_home_updated : 'Espace personnel mis à jour ($1)', // Page name
        success_system : 'Mise à jour du système solaire [$1:$2] effectuée', // Galaxy, System
        success_ranking : 'Classement $2 des $1 ($3-$4) mis à jour', // Primary type, secondary type, offset min, offset max
        success_rc : 'Rapport de combat envoyé',
        success_ally_list : 'Liste des joueurs de l\'alliance [$1] correctement envoyée', // TAG
        success_messages : 'Message correctement envoyé',
        success_fleetSending : 'Départ de flotte correctement envoyé',
        success_spy : 'Rapport d\'espionnage correctement envoyé',
        success_res : 'Message de commerce correctement envoyé',
        success_research : 'Mise à jour des technologies effectuée',
        success_buildings : 'Mise à jour des bâtiments effectuée',
        success_station : 'Mise à jour des installations effectuée',
        //
        unknow_response: 'Code réponse inconnu : "$1", data: "$2"', // code, content
        //
        page_overview: 'Vue générale',
        page_buildings: 'Bâtiments',
        page_installations: 'Installations',
        page_labo: 'Laboratoire',
        page_defense: 'Défense',
        page_fleet: 'Flotte',
        page_fleetSending: 'Départ de flotte',
        //
        //'PM':'MP',
        call_messages : '-- Messages renvoyés par les appels'
};
if (XtenseMetas.getLanguage() == 'en') { 
//TODO : à traduire !! 
    //Xlang = {};

}
	Ximplements(XtenseLocales , {
	'fr': {
		'spy reports' : {
			'groups' : {
				'resources': 'Ressources',
				'buildings': 'Bâtiment',
				'defense':  'Défense',
				'fleet': 'Flottes',
				'researchs': 'Recherche'
			},
			'units' : {
				'resources': {
					601:'Métal:',
					602:'Cristal:',
					603:'Deutérium:',
					604:'Energie:'
				},
				'buildings' : { 
					1 : 'Mine de métal',						
					2 : 'Mine de cristal', 
					3 : 'Synthétiseur de deutérium', 
					4 : 'Centrale électrique solaire', 				
					12 : 'Centrale électrique de fusion', 
					14 : 'Usine de robots', 
					15 : 'Usine de nanites', 			
					21 : 'Chantier spatial', 
					22 : 'Hangar de métal', 
					23 : 'Hangar de cristal', 			
					24 : 'Réservoir de deutérium', 
					25 : 'Cachette de métal', 
					26 : 'Cachette de cristal', 
					27 : 'Cachette de deutérium', 
					31 : 'Laboratoire de recherche', 
					33 : 'Terraformeur', 				
					34 : 'Dépôt de ravitaillement', 
					44 : 'Silo de missiles', 
					41 : 'Base lunaire', 		
					42 : 'Phalange de capteur', 
					43 : 'Porte de saut spatial'
				},
				'researchs' :  { 
					106 : 'Technologie Espionnage', 
					108 : 'Technologie Ordinateur', 
					109 : 'Technologie Armes',		
					110 : 'Technologie Bouclier', 
					111 : 'Technologie Protection des vaisseaux spatiaux', 		
					113 : 'Technologie .nergie', 
					114 : 'Technologie Hyperespace', 
					115 : 'Réacteur à combustion', 			
					117 : 'Réacteur à impulsion', 
					118 : 'Propulsion hyperespace', 
					120 : 'Technologie Laser', 	
					121 : 'Technologie Ions', 
					122 : 'Technologie Plasma', 
					123 : 'Réseau de recherche intergalactique', 		
					124 : 'Astrophysique',
					199 : 'Technologie Graviton'
				},
				'fleet' :  { 		
					202 : 'Petit transporteur', 
					203 : 'Grand transporteur', 
					204 : 'Chasseur léger', 
					205 : 'Chasseur lourd',		
					206 : 'Croiseur', 
					207 : 'Vaisseau de bataille', 
					208 : 'Vaisseau de colonisation', 
					209 : 'Recycleur', 				
					210 : 'Sonde d`espionnage', 
					211 : 'Bombardier', 
					212 : 'Satellite solaire', 
					213 : 'Destructeur', 		
					214 : 'Étoile de la mort', 
					215 : 'Traqueur',
				},	
				'defense' :  { 	
					401 : 'Lanceur de missiles', 
					402 : 'Artillerie laser légère', 
					403 : 'Artillerie laser lourde', 
					404 : 'Canon de Gauss',			
					405 : 'Artillerie à ions', 
					406 : 'Lanceur de plasma', 
					407 : 'Petit bouclier', 
					408 : 'Grand bouclier', 			
					502 : 'Missile d`interception', 
					503 : 'Missile Interplanétaire'
				}
			}
		},
		
		'combat report' : {
			'units' : {
				'fleet' :  { 		
					202 : 'P.transp.', 
					203 : 'G.transp.', 
					204 : 'Ch.léger', 
					205 : 'Ch.lourd',		
					206 : 'Croiseur', 
					207 : 'V.bataille', 
					208 : 'Vaisseau de colonisation', 
					209 : 'Recycleur', 				
					210 : 'Sonde', 
					211 : 'Bombardier', 
					212 : 'Sat.sol.', 
					213 : 'Destr.', 		
					214 : 'Rip', 
					215 : 'Traqueur',
				},	
				'defense' :  { 	
					401 : 'Missile', 
					402 : 'L.léger.', 
					403 : 'L.lourd', 
					404 : 'Can.Gauss',			
					405 : 'Art.ions', 
					406 : 'Lanc.plasma', 
					407 : 'P.bouclier', 
					408 : 'G.bouclier'
				}
			},
			'regxps' : {
				'time' : 'Les flottes suivantes s.affrontent \\((\\d+).(\\d+).(\\d+) (\\d+):(\\d+):(\\d+)\\)',
				'round' : {
					'a_nb' : 'La flotte attaquante tire (.*) fois ',
					'a_shoot' : 'avec une force totale de (.*) sur le défenseur.',
					'd_bcl' : 'Les boucliers du défenseur absorbent (.*) points de dommage.',
					'd_nb' : 'La flotte de défense tire (.*) fois',
					'd_shoot' : 'sur l\`attaquant avec une force de (.*). Les boucliers',
					'a_bcl' : ' de l\`attaquant absorbent (.*) points de dommage.'
				},
				'result' : {
					'win_metal' : 'Il emporte (.*) unités de métal',
					'win_cristal' : ', (.*) unités de cristal',
					'win_deut' : 'et (.*) unités de deutérium.',
					'a_lost' : 'L\`attaquant a perdu au total (.*) unités.',
					'd_lost' : 'Le défenseur a perdu au total (.*) unités.',
					'deb_metal' : 'Un champ de débris contenant (.*) de métal',
					'deb_cristal' : ' et (.*) de cristal se forme dans l\`orbite de la planète.'
				},
				'weapons' : {
					'arm' : 'Armes: (\\d+)%',
					'bcl' : 'Bouclier: (\\d+)%',
					'coq' : 'Coques: (\\d+)%'
				},
				'moon' : 'formant ainsi une lune',
				'moonprob' : 'une lune est de (\\d+) %',
				'attack' : 'Attaquant',
				'defense' : 'Défenseur',
				'nul' : 'match nul',
				'attack_win' : 'L`attaquant a gagné la bataille'
			}
			
		},
		
		'messages' : {
			'espionage of': 'Rapport d`espionnage de',
			'unespionage prob': 'Probabilité de contre-espionnage ',
			'activity': '(\\d+)</font> dernières minutes',
			'moon' : 'type',
			'espionnage action' : 'Activité d\`espionnage',
			'fleet command' : 'Tour de contrôle',
			'expedition result' : 'Résultat de l`expédition ',
			'fleet': 'Flotte',
			'harvesting': 'exploitation du champ de débris',
			'combat of': 'Rapport de combat',
			'combat defence' : 'Bataille de',
			'trade message 1' : 'Livraison de ressources par',
			'trade message 2' : 'Arriv.*e sur une plan.*te'			
		},
		
		'dates' : {
			'messages' : {
				regexp: '(\\d+).(\\d+).(\\d+)[^\\d]+(\\d+):(\\d+):(\\d+)',
				fields: { 
					year: 3,
					month:2,
					day:1,
					hour:4,
					min:5,
					sec:6 
				}
			}
		}
	},
	
	'en': {
//TODO
	}
});
}
/********************** Fin Locales & Lang ******************************/

/*********************** Utilities Ogame ********************************/
/* Recuperation des données de la plnète */
function getPlanetData() {
	var planet_type = "";
	if(XtenseMetas.getPlanetType() == 'moon'){
		planet_type = '1';
	} else {
		planet_type = '0';
	}
	//log("planet_name: "+XtenseMetas.getPlanetName()+", coords : "+XtenseMetas.getPlanetCoords()+", planet_type : "+planet_type);
	return {planet_name: XtenseMetas.getPlanetName(), coords : XtenseMetas.getPlanetCoords(), planet_type : planet_type};
}
// Permet de savoir si c'est une lune
function isMoon() {
	if(XtenseMetas.getPlanetType() == 'moon'){
		return true;
	} else {
		return false;
	}
}
// Permet de stocker les planètes du joueur connecté
function save_my_planets_coords(){
	var mesPlanetes = XPath.getOrderedSnapshotNodes(document,XtenseXpaths.planetData['coords'])
	var pls = "";
	if(mesPlanetes!=null && mesPlanetes.snapshotLength > 0){
	   	for(var i=0;i<mesPlanetes.snapshotLength;i++){
			pls += mesPlanetes.snapshotItem(i).textContent.trim()+((i<(mesPlanetes.snapshotLength - 1))?";":"");
		}
	}
	GM_setValue(prefix_GMData +'my.planets',pls);
}

// Récupération des ressources d'une planète
function getResources(){		
	var metal = XPath.getStringValue(document,XtenseXpaths.ressources.metal).trimInt();
    var cristal = XPath.getStringValue(document,XtenseXpaths.ressources.cristal).trimInt();
    var deut = XPath.getStringValue(document,XtenseXpaths.ressources.deuterium).trimInt();
	var antimater = XPath.getStringValue(document,XtenseXpaths.ressources.antimatiere).trimInt();
    var energy = XPath.getStringValue(document,XtenseXpaths.ressources.energie).trimInt();
	log("metal="+metal+", cristal="+cristal+", deuterium="+deut+", antimatiere="+antimater+", energie="+energy);
	return Array(metal,cristal,deut,antimater,energy);
}
/********************* Fin Utilities Ogame ******************************/