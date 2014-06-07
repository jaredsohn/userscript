// ==UserScript==
// @name           MovieName Formatter
// @namespace  Gatsu
// @include        http://www.allocine.fr/recherche/*
// @include        http://www.allocine.fr/film/fichefilm_gen_cfilm*
// @include        http://www.cinemotions.com/recherche/*
// bug a corriger
// ==/UserScript==

var css = [
	'<style type="text/css">',
	'#nameFormatter {background:#fff;}',
	'#nameFormatter:last-child:after {clear:both;content:" ";display:block;height:0;}',
	'#nameFormatterPasteZone {width:100%; height:70px;}',
	'#nameFormatterResultSource {width:500px; height:80px;float:left;}',
	'#nameFormatterChoiceZone {overflow:hidden;color:#000;}',
	'#nameFormatterChoiceZone label, #nameFormatterChoiceZone input {cursor:pointer; vertical-align:middle;}',
	'#nameFormatterChoiceZone .col {float:left;margin-right:5px}',
	'</style>',
].join('\r\n');


var pages = [
	{	//Allocine : Page de résultat de recherche de film
		url : 'http://www.allocine.fr/recherche',
		getContainer : function() {return Dom.getElementByClass(document, 'div', 'acStyle');},
		getMovieName : function(str) {
			var movie = NameFormatter.getEmptyMovie();
			
			//clean str
			//console.log('before',str);
			str = str.replace(/Date de sortie.*\n/,'')
					 .replace(/Film déjà.*\n/g,'');
			/*
				Date de sortie cinéma : 24 septembre 2008
				Film déjà disponible en DVD depuis le : 25 mars 2009
				Film déjà disponible en Blu-ray depuis le : 25 mars 2009
			*/
			//console.log('after',str);
			
			var movieSource = NameFormatter.formatMovieString(str)
			if (movieSource.length==0) return;
			//name VF
			movie.nameVF = movieSource[0].trim();
			movieSource.splice(0,1);
			//name VO
			if (movieSource[0] && movieSource[0].match(/\((.*)\)/)) {
				movie.nameVO = RegExp.$1;
				movieSource.splice(0,1);
			}
			//year
			if (movieSource[0] && movieSource[0].match(/(\d{4})/)) {
				movie.year = RegExp.$1;
				movieSource.splice(0,1);
			}
			//director (realisateur
			if (movieSource[0] && movieSource[0].match(/de\s(.*)/)) {
				movie.director = RegExp.$1;
				movieSource.splice(0,1);
			}
			//actors
			if (movieSource[0] && movieSource[0].match(/avec\s(.*)/)) {
				movie.actors = RegExp.$1;
				movieSource.splice(0,1);
			}
			return movie;
		}
	},
	{	//Allocine : Fiche de film
		url : 'http://www.allocine.fr/film/fichefilm_gen_cfilm',
		getContainer : function() {return Dom.getElementByClass(document, 'div', 'subheader');},
		getMovieName : function(str) {
			return pages[0].getMovieName(str);
		},
		autoFill : function() {
			
			var m = [];
			m.push(Dom.getElementByClass(document, 'div', 'titlebar').textContent.trim());
			
			var desc = Dom.xpath('/html/body/div/div[20]/div/div[5]/div[4]/div/div[2]/div[5]/div', document)[0];
			
			//var desc = document.evaluate('/html/body/div/div[20]/div/div[5]/div[4]/div/div[2]/div[5]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
			
			//3eme P
			var p = Dom.xpath('p[3]', desc)[0];
			if (p.textContent.match('Titre original :')) {
				m.push('('+Dom.getElementByClass(p, 'span', 'purehtml').textContent.trim()+')');
			}
			m.push(Dom.xpath("a[@href~='year=']", p)[0].textContent);
			console.log(m);
			
			var p = Dom.xpath('p[2]', desc)[0];
			var a=Dom.xpath("a[@href~='fichepersonne_gen_cpersonne=']", p);
			m.push('de '+ a[0].textContent);
			m.push('avec '+a.slice(1,4).map(function(a){
				console.log(a, a.textContent);
				if(a.textContent.match(/plus.../)) return '';
				return a.textContent.trim();
			}).join(', '));
			
			console.log(m);
			
			//desc.textContent.split('\n');
			
			return m.join('\n');
		}
	},
	{	//Cinemotions.com : Page de résultats de recherche de film
		url : 'http://www.cinemotions.com/recherche/',
		getContainer : function() {
			var tables = document.getElementsByTagName('table');
			for (var i=0; i<tables.length; i++) {
				var table = tables[i];
				if (table.bgColor && table.bgColor=='#f9f3e5')
					break;
			}
			return table.parentNode.insertBefore(document.createElement('div'),table.parentNode.firstChild);
		},
		getMovieName : function(str) {
			var movie = NameFormatter.getEmptyMovie();
			var movieSource = NameFormatter.formatMovieString(str).removeDuplicates();
			if (movieSource.length==0) return;
			
			//name VF
			movie.nameVF = movieSource[0].trim();
			movieSource.splice(0,1);
			//name VO
			if (movieSource[0] && movieSource[0].match(/^[a-z]/i)) {
				movie.nameVO = movieSource[0];
				movieSource.splice(0,1);
			}
			//year
			if (movieSource[0] && movieSource[0].match(/(\d{4})/)) {
				movie.year = RegExp.$1;
				movieSource.splice(0,1);
			}
			//director (realisateur)
			if (movieSource[0] && movieSource[0].match(/Réalisation -\s(.*)/)) {
				movie.director = RegExp.$1;
				movieSource.splice(0,1);
			}
			//actors
			if (movieSource[0] && movieSource[0].match(/avec\s(.*)/)) {
				var actors = RegExp.$1.replace(' &', ',');
				movie.actors = actors;
				movieSource.splice(0,1);
			}
			return movie;
		}
	}

]

var currentPage = null; //objet faisant reference à la page en cours


var NameFormatter = function() {this.initialize.apply(this, arguments)};
NameFormatter.prototype = {
	constructor : NameFormatter.constructor,
	
	initVariables : function() {
		this.cookieName = 'GMNameFormatter';
	
		this.view = {
			container : null, //parent container of the form
			pasteZone : null,
			resultZone : null,
			choiceZone : null
		};

		this.model = {
			format : 'avi'
		};
		
		var commonMask = '${nameVF}${nameVO}${year} (de ${director}, avec ${actors})';
		this.maskToUse = {
			avi : commonMask+'.avi',
			avilfmkv :  commonMask+' - LFMKV.avi',
			mkv : commonMask+' {fr-eng} st{fr-eng}.mkv',
			avivostf : commonMask+' - VOSTF.avi',
			screener : '${nameVF}${nameVO}${year} - Screener.avi',
		};
	},
	
	//constructor
	initialize : function() {
		for (var i=0; i<pages.length; i++) {
			if(document.location.href.indexOf(pages[i].url)>-1) {
				currentPage = pages[i];
			}
		}
	
		this.initVariables();
		this.initView();
		this.initHandlers();
		this.initValuesFromPreferences();
		
		if(currentPage.autoFill) {
			this.view.pasteZone.value=currentPage.autoFill();
			this.setFormatedName();
		}
		
	},
	
	// init functions
	initView : function() {
		//paste CSS : 
		document.getElementsByTagName('head')[0].innerHTML+=css;
		//generate container div and all innerHTML (fields);
		var v = this.view;
		var header = currentPage.getContainer();
		v.container = document.createElement('div');
		v.container.id = "nameFormatter";
		
		header.appendChild(v.container);
		v.container.innerHTML = [
			'<textarea id="nameFormatterPasteZone"></textarea>',
			'<br/>',
			'<textarea id="nameFormatterResultSource"></textarea>',
			'<fieldset id="nameFormatterChoiceZone">',
				'<div class="col">',
					'<input type="radio" name="nameFormatterType" value="avi" id="nameFormatterTypeAvi"/><label for="nameFormatterTypeAvi">.avi</label><br/>',
					'<input type="radio" name="nameFormatterType" value="mkv" id="nameFormatterTypeMkv"/><label for="nameFormatterTypeMkv">.mkv</label><br/>',
					'<input type="radio" name="nameFormatterType" value="avilfmkv" id="nameFormatterTypeLmfkvAvi"/><label for="nameFormatterTypeLmfkvAvi">.avi LFMKV</label><br/>',
				'</div>',
				'<div class="col">',
					'<input type="radio" name="nameFormatterType" value="avivostf" id="nameFormatterTypeAvivostf"/><label for="nameFormatterTypeAvivostf">.avi vostf</label><br/>',
					'<input type="radio" name="nameFormatterType" value="screener" id="nameFormatterTypeScreener"/><label for="nameFormatterTypeScreener">Screener</label><br/>',
				'</div>',
			'</fieldset>'
		].join('');
		v.pasteZone = $('nameFormatterPasteZone');
		v.resultZone = $('nameFormatterResultSource');
		v.choiceZone = $('nameFormatterChoiceZone');
	},
	
	initHandlers : function() {
		var v = this.view;
		v.pasteZone.addEventListener('change', Dom.bind(this.pasteZoneChangeHandler,this), false);
		v.pasteZone.addEventListener('keyup', Dom.bind(this.pasteZoneChangeHandler,this), false);
		v.choiceZone.addEventListener('change', Dom.bind(this.choiceZoneChangeHandler,this), false);
		v.resultZone.addEventListener('focus', Dom.bind(this.resultZoneFocusHandler,this), false);
	},
	
	initValuesFromPreferences:function() {
		var _this = this;
		var cookie = GM_getValue(this.cookieName);
		if (cookie!=null) {
			cookie = cookie.split('|')
			cookie.forEach(function(val) {
				var i = val.substring(0, val.indexOf('='));
				var value = val.substring(val.indexOf('=')+1, val.length);
				_this.model[i] = value;
			});
		}
		
		//maj des inputs en fonction du model : 
		var inputs = Array.prototype.slice.apply(this.view.container.getElementsByTagName('input'));
		inputs.forEach(function(input) {
			if (input.name=='nameFormatterType' && input.value==_this.model.format) {
				input.checked = 'checked'
			}
		});
		
	},
	
	savePreferences : function() {
		var m = this.model;
		var tocook = [];
		
		for (var i in m) {
			if (m[i]!=null || m[i]!='') {
				tocook.push(i+'='+m[i]);
			};
		}
		GM_setValue(this.cookieName, tocook.join('|'));
	},
	
	//handlers
	pasteZoneChangeHandler : function(e) {
		this.setFormatedName();
	},
	
	choiceZoneChangeHandler : function(e) {
		this.model.format = e.target.value;
		this.savePreferences();
		this.setFormatedName();
	},
	
	resultZoneFocusHandler : function(e) {
		//not binded
		e.target.select();
	},
	
	//formatage du nom du film en fonction de la source pasteZone
	setFormatedName : function() {
		var v = this.view;
		var movie = currentPage.getMovieName(v.pasteZone.value);
		if (movie.nameVO!='') movie.nameVO = ' ('+movie.nameVO+')';
		if (movie.year!='') movie.year = ' - '+movie.year;
		if (movie.actors!='') movie.actors = movie.actors.split(/,\s*/).slice(0,2).join(', ');
		
		var result = Dom.template(this.maskToUse[this.model.format], movie).replace(' (de , avec )','').replace(' (de , ','(').replace(', avec )',')').replace('(avec )', '');
		v.resultZone.value = result;

	}
};

// Static methods
NameFormatter.getEmptyMovie = function() {
	return {
		nameVF : '',
		nameVO : '',
		year  : '',
		director : '',
		actors : ''
	};
}
NameFormatter.formatMovieString = function(str) {
	return str.replace(/\:/g,'-').split(/\n/).filter(function(s) {
		return !/^\s*$/.test(s);
	}).map(function(str) {return str.trim()});
};



String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
};

Array.prototype.removeDuplicates = function() {
	var aRet = [];
	this.forEach(function(elm) {
		if (typeof elm=='string')
			elm = elm.trim();
		if (aRet.indexOf(elm)==-1)
			aRet.push(elm);
	});
	return aRet;
};

/**
* Utils
*/

function $(elm) {
	return typeof elm=="string" ? document.getElementById(elm) : elm;
}

var Dom = {
	getElementByClass : function(parent, tagname, className) {
		var elms = parent.getElementsByTagName(tagname);
		for (var i=0; i<elms.length; i++) {
			var elm = elms[i];
			if(elm.className.split(' ').indexOf(className)>-1) {
				return elm;
			}
		}
	},
	getElementByHTML : function(parent, expr) {
		if (typeof expr=='string') expr = new RegExp(expr);
		var elms = parent.getElementsByTagName('*');
		for (var i=0; i<elms.length; i++) {
			var elm = elms[i];
			if (expr.test(elm.innerHTML))
				return elm;
		}
	},
	bind : function(func, obj) {
		return function() {
			func.apply(obj, arguments);
		}
	},
	template : function(str, obj) {
		for (var i in obj) {
			str = str.replace(new RegExp('\\$\\{'+i+'\\}','g'), obj[i]);
		}
		return str;
	},
	xpath : function(xpath,root) { 
	  xpath = xpath
		.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
		.replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
		.replace(/#([\w-]+)/g, '[@id="$1"]')
		.replace(/\/\[/g,'/*[');
	  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
	  xpath = xpath
		.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
		.replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
		.replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
	  var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
	  while (next = got.iterateNext())
		result.push(next);
	  return result;
	}

}

//console.dir(window);

new NameFormatter();