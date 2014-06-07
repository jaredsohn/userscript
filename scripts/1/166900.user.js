// ==UserScript==
// @name         NucleaGame : commonScript
// @namespace    NucleaGame : commonScript
// @description	 Script librairies neccessaire a l'execution des autres scripts [NucleaGame's scripts string]
// @author       Benoit485
// @version      0.2
// @date         2013-09-21 19H00
// @include      http://www.nucleagame.fr/uni*
// ==/UserScript==

/*
	Utilisable dans les scripts enfants (dans l'object ansa):
	initScript	
	
	Qui ouvre l'accès à :
	String.trimInt
	getId
	getTagName
	createElem
	log			
	evalPathNode
	evalPath
	evalPathFirstNode
	formatNumber
	
	Puis :
	setOp / setOption
	getOp / getOption	
	
	o² permet d'afficher les options (Chaque serveur a ces propres options)	 

*/

var version = '0.2';
var url = 'http://userscripts.org/scripts/source/166900.user.js';
var debug = false;
var clickO = false;

if(unsafeWindow == undefined)
	unsafeWindow = window;

function getId(elem)
{
	return document.getElementById(elem);
}

function getTagName(tag)
{
	return document.getElementsByTagName(tag);
}

function createElem(name)
{
	return document.createElement(name);
}

String.prototype.trimInt = function() 
{
	string = this.replace(/\D/g,'');
	return string ? parseInt(string) : 0;
}

function formatNumber(str) 
{
	var separator = ' ';
	
	if(arguments.length==2)separator=arguments[1];
	
	str += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(str)) 
	{
		str = str.replace(rgx, '$1' + separator + '$2');
	}
	return str;
}

function evalPathNode(path, document, node) 
{
	var ret = document.evaluate(path,node,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	return ret;
}

function evalPath(path, document) 
{
	return evalPathNode(path,document,document);
}

function evalPathFirstNode(path, document) 
{
	return document.evaluate
	(
		path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
	).singleNodeValue;
}

function getValue(key, defaultValue)
{
	var retValue = localStorage.getItem(key);
		
	if ( !retValue ) return defaultValue;
	return retValue;
}

function setValue(key, value)	
{
	localStorage.setItem(key, value);
}

function log(txt)
{
	if(!debug) return false;
	
	if(typeof txt == 'string' || typeof txt == 'number')
		unsafeWindow.console.log('Ansaerys :\n\t'+txt);
	else
	{
		unsafeWindow.console.log('Ansaerys :');
		unsafeWindow.console.log(txt);
	}
	
	return true;
}

function getRandomTxt() 
{
	var string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', txt = '';
	for (var i = 0; i < 20; i++) txt += string[Math.floor(Math.random() * (string.length - 1))];
	return txt + '=' + Math.floor(Math.random() * 10000);
}

var ansaerys = 
{
	init : function()
	{
		unsafeWindow.ansa = 
		{
			initScript : ansaerys.initScript,
			getOp : ansaerys.getOption,
			setOp : ansaerys.setOption,
			getOption : ansaerys.getOption,
			setOption : ansaerys.setOption,
			url : ansaerys.url
		};
		
		document.addEventListener('keypress', function(event)
		{
			/*
				//alert(event.which);
				o = 111
				O = 79
				² = 178
			*/
			
			if(event.which == '111' || event.which == '79') 
				clickO = true;
			else if(event.which == '178' && clickO)
				ansaerys.showOptions();
			else
				clickO = false;
		}, false);
		
		/*
		setTimeout(function()
		{
			log(ansaerys.scripts);
		}, 1500);
		*/
	},
	
	scripts :
	{
		// id : [name, version, url]
		commonScript : ['Librairies Ansaerys', version, url]
	},
	
	optionsFull : 
	{
		// script : { idOption: ['type', 'nom apparaissant dans les options', 'valeur par default','affichage dans les options'] }
		commonScript : 
		{ 
			actif : ['checkbox', 'Activ&eacute; la suite Ansaerys\'s scripts', '1', '1'] 
		}
	},
	
	options :
	{
		// option : default
		actif: '1'
	},
	
	typeOptions : 
	[
		'input:text', 'input:password', 'input:button',
		'checkbox', 'textarea'
	],
	
	initScript : function(dataScript)
	{
		if(!dataScript.id || !dataScript.name || !dataScript.version || !dataScript.url) return 0;
		
		ansaerys.scripts[dataScript.id] = [dataScript.name, dataScript.version, dataScript.url];
		ansaerys.optionsFull[dataScript.id] = dataScript.options;
		
		//log(ansaerys.optionsFull);
		
		for(var nameOption in dataScript.options)
		{
			ansaerys.options[nameOption] = dataScript.options[nameOption][2];
		}
		
		var func = '/* Fonctions chargées depuis la librairie */\n\n'
						 + 'String.prototype.trimInt = function() { string = this.replace(/\D/g,\'\'); return string ? parseInt(string) : 0; };\n'
						 + 'function getId(elem) { return document.getElementById(elem); }\n'
						 + 'function getTagName(tag) { return document.getElementsByTagName(tag); }\n'
						 + 'function createElem(name) { return document.createElement(name); }\n'
						 + 'function log(txt) { if(typeof txt == \'string\' || typeof txt == \'number\') { unsafeWindow.console.log(\'Ansaerys :\\n\\t\'+txt); } else { unsafeWindow.console.log(\'Ansaerys :\'); unsafeWindow.console.log(txt); } }\n'
						 + 'function evalPathNode(path, document, node) { return document.evaluate(path,node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }'
						 + 'function evalPath(path, document) { return evalPathNode(path,document,document); }'
						 + 'function evalPathFirstNode(path, document) { return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }'
						 + 'function formatNumber(str) { var separator = \' \'; if(arguments.length==2)separator=arguments[1]; str += \'\'; var rgx = /(\\d+)(\\d{3})/; while (rgx.test(str)) { str = str.replace(rgx, \'$1\' + separator + \'$2\'); } return str; }'
						 + '';
		return func;
	},
	
	setOption : function(nameOption, valueOption)
	{
		if(ansaerys.options[nameOption] != undefined) 
		{
			setValue('Ansaerys_'+nameOption, valueOption);
			return true;
		}
		else 
		{ 
			log('L\'option "'+nameOption+'" n\'existe pas');
			return false; 
		}
	},
	
	getOption : function(nameOption)
	{
		if(ansaerys.options[nameOption] != undefined) 
			return getValue('Ansaerys_'+nameOption, ansaerys.options[nameOption]/*default*/);
		else 
		{ 
			log('L\'option "'+nameOption+'" n\'existe pas');
			return 'ERROR'; 
		}
	},
	
	showOptions : function()
	{
		var uN = prompt(ansaerys.optionsFull.easyLogin.nameUser[1], ansaerys.getOption('nameUser'));
		if(uN) ansaerys.setOption('nameUser', uN);
		var uP = prompt(ansaerys.optionsFull.easyLogin.passUser[1], ansaerys.getOption('passUser'));
		if(uP) ansaerys.setOption('passUser', uP);
	},
	
	url : 
	{
		get : document.location.href.replace(/http:\/\/www\.nucleagame\.fr\/game\.php\?/, '')
	}
};

ansaerys.init(); // Chargeùent de la librairie









