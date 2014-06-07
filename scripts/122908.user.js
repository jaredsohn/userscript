// ==UserScript==
// @name           Intrusion - PACK
// @version        1.1.02
// @namespace      Watilin
// @description    Suit l'évolution du cours des fichiers PACK
// @include        http://intrusion.muxxu.com/storage
// @include        http://intrusion.muxxu.com/storage?c=pack*
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

/* Sommaire
	1. Constantes et espaces de noms [CST]
	2. Styles                        [STY]
	3. Utilitaires                   [UTI]
	4. Fonctions de calcul pur       [CAL]
	5. Fonctions d'entrées-sorties   [ENT]
	6. Fonctions d'affichage         [AFF]
	7. Debug                         [DBG]
	8. Initialisation du script      [INI]
*/

////////////// [CST] constantes et espaces de noms /////////////////////

// nom utilisé par les fonctions GM_getValue et GM_setValue
const STORAGE_NAME = 'Rates';

// nombre de chiffres après la virgule pour les valeurs affichées
const ACCURACY = 2;

// noms internes des données
const Names = {
	source:	"Code source d'un programme",
	ximg:	"Pack d'images X",
	serial:	"Listing de numéros de série",
	mp3:	"MP3 inédit",
	soft2:	"Logiciel inédit",
	xvideo:	"Vidéo X",
	soft:	"Logiciel warez bas de gamme",
	secret:	"Données confidentielles",
	pdata:	"Données commerciales privées"
};

// couleurs pour l'affichage des graphes
const Colors = {
	value:	'#8BF',
	current:	'#F56',
	mean:	'#7F4',
	deviation:	'#FD6',
	fillDeviation:	'rgba(255, 195, 105, 0.15)',
	background:	'rgba(0, 0, 0, 0.33)',
	axe:	'rgba(255, 255, 255, 0.67)',
	lightAxe:	'rgba(255, 255, 255, 0.15)'
};
	
// plus petites graduations tolérées (en pixels)
const Delta = { x: 20, y: 25 };

// dimensions des canevas
const Dims = {
	width: 300,
	height: 200,
	labelWidth: 60,
	labelHeight: 50
};

// data-URI des images
const Datas = {
	greenMoney:
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAC1Q\
TFRFIgAJAAAAHTgAMVAAQWUDY4URc5oWh6oeiKsfjLUdjrYimL4mocgqqNEt0P9BnPo01gAA\
AAF0Uk5TAEDm2GYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAB0SURBVAjXY2CAAUEIYGCQe3fv\
3rt7D4GM0OuhtXsvCjDI3b56N/bsQyBjB5CxF8iQvQ2UKgWJvL377t07oBpBIRUVJyVBIOPd\
3Xvv3r0FMlzAAKj41qq7d+8uAYooGRsZGykJMDDOTMucOXMakAGxVADuCgAxEC6pCgSMewAA\
AABJRU5ErkJggg==',
	yellowMoney:
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAADBQ\
TFRFBjUZAAAANCgMSzsRYkwYh2khoHwmsIkss4wtu5IvwJYwypoyyJwyzqI60ahF3sJ+kqSD\
PwAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAB0SURBVAjXY2CAAUEIYGCQ\
///+/f/3H4GM0OehdeceCjDIv3n6Lu7eRyDjBJCxD8iQewOUKgWJ/Hv3//9/oBpBIRUVJyVB\
IOP/u/f///8DMlzAAKj41ap3794tAYooGRsZGykJMDDOTMucOXMakAGxVADuCgAFQTEeMG1A\
wgAAAABJRU5ErkJggg==',
	redMoney:
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAADBQ\
TFRFBjUZAAAAMw0NTBISYxkZjCIioSkpsC4usy8vuC4uvDAwwTExwzExyDIyzDY21lpa0O3e\
+wAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAB0SURBVAjXY2CAAUEIYGCQ\
///+/f/3H4GM0OehdfseCjDIv376Lu7eRyBjB5BxDsiQew2UKgWJ/Hv3//9/oBpBIRUVJyVB\
IOP/u/f///8DMlzAAKj41ap3794tAYooGRsZGykJMDDOTMucOXMakAGxVADuCgD9QDEMVsOR\
0gAAAABJRU5ErkJggg=='
};

/////////////////////// [STY] Styles ///////////////////////////////////

var cStyle = getComputedStyle(
	document.querySelector('div.container'), null);

GM_addStyle(
'body { position: relative }\
div.rate-graph {\
	position: absolute;\
	display: inline-block;\
	margin: 1em;\
	color: ' + cStyle.color + ';\
	background: ' + cStyle.backgroundColor + ';\
	border: solid thin ' + cStyle.borderColor + ';\
	box-shadow: 0 0 0 1px ' + cStyle.outlineColor + ',\
		1ex 1ex 1em 0 rgba(0, 0, 0, 0.33);\
}\
h3.graph-title {\
	font-size: small;	font-weight: bold;\
	margin: 1ex;\
}\
a.graph-close-link {\
	float: right;\
	text-decoration: none;\
	color: inherit;\
}\
div.graph-layout {\
	position: relative;\
	padding: 1ex;\
}\
div.rate-graph canvas {\
	position: absolute;\
	top: 0;	right: 0;\
	margin: 1ex;\
}\
span.graph-label {\
	position: absolute;	display: block;\
	font-size: smaller;	font-weight: bold;\
}\
div.graph-legend-x {\
	position: absolute;\
	width: ' + Dims.width + 'px; height: ' + Dims.labelHeight + 'px;\
	bottom: 0;	right: 0;\
}\
div.graph-legend-x span.graph-label {\
	-moz-transform: matrix(0.866, -0.5, 0.5, 0.866, -10ex, 1.5ex);\
	color: ' + cStyle.color + ';\
}\
div.graph-legend-y {\
	position: absolute;\
	width: ' + Dims.labelWidth + 'px; height: ' + Dims.y + 'px;\
	top: 0;	left: 0;\
	text-align: right;\
}\
div.graph-legend-y span.graph-label {\
	width: ' + Dims.labelWidth + 'px;\
}\
span.gameMoney { cursor: pointer }'
);

//////////////////// [UTI] Utilitaires /////////////////////////////////

// forme de date française (jj/mm/aaaa)
Date.prototype.toFrenchDate = function toFrenchDate() {
	var d = this.getDate(),
		m = this.getMonth() + 1,
		y = this.getFullYear();
	return (d < 10 ? '0' : '') + d
		+ (m < 10 ? '/0' : '/') + m
		+ '/' + y;
};
Date.fromFrenchDate = function fromFrenchDate( s ) {
	var m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(s);
	var d = new Date(0);
	d.setDate(m[1]);
	d.setMonth(m[2] - 1);
	d.setFullYear(m[3]);
	return d;
};

// enrichit les tableaux avec des méthodes de statistiques
// il peut y avoir des données invalides dans les tableaux
(function( proto ) {
	// min et max
	proto.min = function min() {
		return this.reduce(function( acc, x ) {
			return isNaN(x) ? acc : Math.min(acc, x);
		}, Infinity);
	};
	proto.max = function max() {
		return this.reduce(function( acc, x ) {
			return isNaN(x) ? acc : Math.max(acc, x);
		}, -Infinity);
	};
	
	// somme, effectif et moyenne
	proto.sum = function sum() {
		return this.reduce(function( acc, x ) {
			return isNaN(x) ? acc : acc + x;
		}, 0);
	};
	proto.number = function number() {
		return this.reduce(function( acc, x ) {
			return isNaN(x) ? acc : acc + 1;
		}, 0);
	};
	proto.mean = function mean() {
		return this.sum() / this.number();
	};
	
	// variance et écart-type
	proto.variance = function variance() {
		var m = this.mean();
		return this.map(function( x ) { return x * x }).mean()
			- m * m;
	};
	proto.standardDeviation = function standardDeviation() {
		return Math.sqrt(this.variance());
	};
})(Array.prototype);

// enrichit l'objet Math avec un logarithme de base 10
(function() {
	var ln10 = Math.log(10);
	Math.log10 = function log10( x ) {
		return Math.log(x) / ln10;
	};
})();

// modulo indépendant du signe (unsigned mod)
Number.prototype.umod = function umod( m ) {
	return this < 0
		? m * 0.9 + (this + m / 10) % m
		: this % m;
};

// tronque la partie décimale
Number.prototype.fix = function fix( d ) {
	var p = Math.pow(10, d);
	return Math.round(this * p) / p;
};

//////////////// [CAL] Fonctions de calcul pur /////////////////////////

// récupère les listes de prix et la liste des dates
function getLists( rates ) {
	var lists = {};
	var dateObjects = [], dateStrings = [];
	
	// transforme les dates pour le tri
	for (var date in rates)
		dateObjects.push(Date.fromFrenchDate(date));
	
	// trie les dates
	dateObjects.sort(function( d1, d2 ) {
		return d1 - d2;
	});
	
	// ajoute les dates manquantes
	var oneDay = 1000 * 60 * 60 * 24;
	var previousDate;
	dateObjects.forEach(function( date ) {
		if (previousDate) {
			var days = Math.round((date - previousDate) / oneDay) - 1;
			var d = new Date(previousDate);
			for (var i = days; i--;) {
				d.setDate(d.getDate() + 1);
				dateStrings.push(d.toFrenchDate());
			}
		}
		dateStrings.push(date.toFrenchDate());
		previousDate = date;
	});
	
	// ajoute les taux correspondant aux dates
	dateStrings.forEach(function( date ) {
		if (date in rates) {
			for (var rate in Names) {
				if (!(rate in lists))
					lists[rate] = [];
				lists[rate].push(rates[date][rate]);
			}
		} else {
			for (var rate in Names) {
				if (!(rate in lists))
					lists[rate] = [];
				lists[rate].push(undefined);
			}
		}
	});
	lists.dates = dateStrings;
	return lists;
}

/* retourne une indication de l'opportunité de vente :
 * positive si c'est une bonne opportunité
 * négative si c'est une mauvaise opportunité
 * nulle sinon
 */
function getOpportunity( value, list ) {
	var mean = list.mean(),
		sdTop = list.standardDeviation() + mean;
	if (value >= sdTop)
		return value - sdTop;
	else if (value >= mean)
		return 0;
	else
		return value - mean;
}

////////////// [ENT] Fonctions d'entrées-sorties ///////////////////////

// extrait les prix du code HTML
function getCurrentRates() {
	var h = {};
	var $$rows = document.querySelector('table.market').rows;
	for (var i = 0, $row; $row = $$rows[i++];) {
		var $money = $row.querySelector('span.gameMoney');
		if ($money) {
			var name = $row.querySelector('input[type="hidden"]').value;
			h[name] = $money.firstChild.data.trim() * 1;
		}
	}
	// ajoute 0 pour les valeurs non extraites
	for (var name in Names)
		if (!(name in h))
			h[name] = 0;
	return h;
}

// stocke les cours
var stored;
function storeRates( rates ) {
	var today = new Date().toFrenchDate();
	stored = stored || retrieveRates();
	if (today in stored) return;
	info('Nouvelles données stockées\xA0!');
	stored[today] = rates;
	GM_setValue(STORAGE_NAME, JSON.stringify(stored));
}

// récupère les cours précédemment stockés
function retrieveRates() {
	return JSON.parse(GM_getValue(STORAGE_NAME) || '{}');
}

///////////////// [AFF] Fonctions d'affichage //////////////////////////

var $xLegend;
function createXLegend( dates ) {
	$xLegend = document.createElement('div');
	$xLegend.className = 'graph-legend-x';
	var space = Dims.width / (dates.length - 1);
	dates.forEach(function( date, i ) {
		var $ = document.createElement('span');
		$.className = 'graph-label';
		$xLegend.appendChild($);
		$.appendChild(document.createTextNode(date));
		$.style.left = i * space + 'px';
	});
}
function getXLegend() {
	return $xLegend.cloneNode(true);
}

// renvoie une div contenant le graphe dessiné
function graph( name, values, $div ) {
	$div = $div || document.createElement('div');
	$div.className = 'rate-graph';
	
	var $name = document.createElement('h3');
	$name.className = 'graph-title';
	$name.appendChild(document.createTextNode(Names[name]));
	$div.appendChild($name);
	
	var $cross = document.createElement('a');
	$cross.href = '#';
	$cross.title = 'fermer (ESC)';
	$cross.className = 'graph-close-link';
	$cross.appendChild(document.createTextNode('[X]'));
	$cross.addEventListener('click', function( e ) {
		e.preventDefault();
		$div.style.display = 'none';
	}, false);
	$name.appendChild($cross);
	
	var $layout = document.createElement('div');
	$layout.className = 'graph-layout';
	$div.appendChild($layout);
	
	var $canvas = document.createElement('canvas');
	$layout.appendChild($canvas);
	
	var w = $canvas.width = Dims.width,
		h = $canvas.height = Dims.height,
		l = values.length,
		min = values.min(),
		max = values.max(),
		range = max - min;
	
	var m = values.mean(),
		e = values.standardDeviation(),
		eTop = m + e,
		eBottom = m - e;
	
	var logx = Math.max(Math.log10(Delta.x * l / (w - Delta.x)), 0),
		logy = Math.log10(Delta.y * range / (h - Delta.y)),
		ux = Math.pow(10, Math.ceil(logx)),
		uy = Math.pow(10, Math.ceil(logy));
	
	// affine l'échelle verticale sur des multiples de 2 ou 5
	var ypx = uy * h / (uy + range);
	if (ypx / 5 >= Delta.y)
		uy /= 5;
	else if (ypx / 2 >= Delta.y)
		uy /= 2;
	
	var inf = Math.min(min, eBottom) - uy / 2,
		sup = Math.max(max, eTop) + uy / 2,
		uy0 = inf + uy - (inf.umod(uy)),
		displayRange = sup - inf;
	
	function sx( x ) { return x * w / (l - 1) }
	function sy( y ) { return (y - inf) * h / displayRange }
	
	// dimensionne la div
	$layout.style.width = w + Dims.labelWidth + 'px';
	$layout.style.height = h + Dims.labelHeight + 'px';
	
	// affiche les légendes
	var $yLegend = document.createElement('div');
	$yLegend.className = 'graph-legend-y';
	$layout.appendChild($yLegend);
	function createLabel( value, color ) {
		var text = '' + value.fix(ACCURACY);
		var $ = document.createElement('span');
		$.className = 'graph-label';
		$.style.color = color;
		$.style.top = h - sy(value) + 'px';
		$.appendChild(document.createTextNode(text));
		$yLegend.appendChild($);
	}
	createLabel(eTop, Colors.deviation);
	createLabel(eBottom, Colors.deviation);
	createLabel(m, Colors.mean);
	createLabel(values[l - 1], Colors.current);
	
	$layout.appendChild(getXLegend());
	
	// prépare le dessin
	var ctx = $canvas.getContext('2d');
	ctx.lineCap = 'square';
	ctx.lineJoin = 'bevel';
	ctx.globalCompositeOperation = 'destination-over';
	
	// inverse l'axe vertical
	ctx.save();
	ctx.transform(1, 0, 0, -1, 0, h);
	
	// dessine le prix de vente du jour
	ctx.lineWidth = 2;
	ctx.strokeStyle = Colors.current;
	var cury = sy(values[l - 1]);
	ctx.beginPath();
	ctx.moveTo(0, cury);
	ctx.lineTo(w, cury);
	ctx.stroke();
	
	// dessine la courbe
	ctx.lineWidth = 2;
	ctx.strokeStyle = Colors.value;
	ctx.beginPath();
	ctx.moveTo(0, sy(values[0]));
	for (var i = 1; i < values.length; i++)
		ctx.lineTo(sx(i), sy(values[i]));
	ctx.stroke();
	
	// dessine la moyenne
	ctx.lineWidth = 1;
	ctx.strokeStyle = Colors.mean;
	ctx.beginPath();
	var y = sy(m);
	ctx.moveTo(0, y);
	ctx.lineTo(w, y);
	ctx.stroke();
	
	// dessine les écarts-types
	ctx.lineWidth = 1;
	var top = sy(m + e),
		bottom = sy(m - e),
		height = top - bottom;
	ctx.strokeStyle = Colors.deviation;
	ctx.beginPath();
	ctx.moveTo(0, top);
	ctx.lineTo(w, top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, bottom);
	ctx.lineTo(w, bottom);
	ctx.stroke();
	ctx.fillStyle = Colors.fillDeviation;
	ctx.fillRect(0, bottom, w, height);
	
	// dessine les axes
	ctx.lineWidth = 1;
	ctx.strokeStyle = Colors.axe;
	ctx.beginPath();
	ctx.moveTo(0, h);
	ctx.lineTo(0, 0);
	if (sup * inf > 0) { // si l'axe zéro n'est pas dans l'intervalle
		ctx.lineTo(w, 0); // dessine un axe horizontal en bas
	} else {
		ctx.stroke();
		var y0 = sy(0); // dessine l'axe zéro
		ctx.beginPath();
		ctx.moveTo(0, y0);
		ctx.lineTo(w, y0);
	}
	ctx.stroke();
	
	// dessine les graduations
	ctx.lineWidth = 1;
	ctx.strokeStyle = Colors.lightAxe;
	for (var i = 0; i <= l; i += ux) { // horizontales
		ctx.beginPath();
		var x = sx(i);
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}
	for (var i = uy0; i <= sup; i += uy) { // verticales
		ctx.beginPath();
		var y = sy(i);
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		ctx.stroke();
	}
	
	// dessine le fond
	ctx.fillStyle = Colors.background;
	ctx.fillRect(0, 0, w, h);
	
	ctx.restore();
	return $div;
}

function initGraph( name, values ) {
	var $div = graph(name, values);
	$div.style.display = 'none';
	document.body.appendChild($div);
	return $div;
}

var $shadow = document.createElement('div');
function openModal( $mod ) {}

/////////////////////// [DBG] Debug ////////////////////////////////////

/* désactive tout comportement sur la page
var $$e = document.querySelectorAll(
	'[onclick], [onmouseover], [onmouseout]');
for (var i = 0, $e; $e = $$e[i++];) {
	$e.removeAttribute('onclick');
	$e.removeAttribute('onmouseover');
	$e.removeAttribute('onmouseout');
}
var $$s = document.querySelectorAll('script');
for (var i = 0, $s; $s = $$s[i++];) {
	$s.parentNode.removeChild($s);
}//*/

// fonction de log
var info = (unsafeWindow.console && unsafeWindow.console.info)
	|| (console && console.info)
	|| function() {};

//////////////// [INI] Initialisation du script ////////////////////////

var currentRates = getCurrentRates();
info('Taux du jour : ', currentRates);
storeRates(currentRates);

var totalRates = retrieveRates();
info('Total des taux : ', totalRates);

var lists = getLists(totalRates);
info('Listes : ', lists);

createXLegend(lists.dates);

var $$rows = document.querySelector('table.market').rows;
for (var i = 0, $row; $row = $$rows[i++];) (function( $row ) {
	var $money = $row.querySelector('span.gameMoney');
	if ($money) {
		var name = $row.querySelector('input[type="hidden"]').value;
		var $pic = $row.querySelector('img');
		var opp = getOpportunity(currentRates[name], lists[name]);
		if (opp > 0) {
			$pic.title = 'C’est le moment de vendre\xA0!';
			$pic.src = 'data:image/png;base64,' + Datas.greenMoney;
		} else if (opp < 0) {
			$pic.title = 'Vous vous ferez arnaquer si vous vendez maintenant.';
			$pic.src = 'data:image/png;base64,' + Datas.redMoney;
		} else {
			$pic.title = 'Ni pertes ni profits avec ceci aujourd’hui…';
			$pic.src = 'data:image/png;base64,' + Datas.yellowMoney;
		}
		var $div;
		function closeOnEsc( e ) {
			if (27 == e.keyCode) {
				e.preventDefault();
				window.removeEventListener('keyup', closeOnEsc, false);
				$div.style.display = 'none';
			}
		}
		$money.title = 'cliquez pour voir la courbe';
		$money.addEventListener('click', function( e ) {
			if (!$div)
				$div = initGraph(name, lists[name]);
			$div.style.display = '';
			$div.style.left = e.pageX - Dims.width / 2 + 'px';
			$div.style.top = e.pageY - Dims.height / 2 + 'px';
			window.addEventListener('keyup', closeOnEsc, false);
		}, false);
	}
})($row);
