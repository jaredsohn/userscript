// ==UserScript== 
// @name          SmilEOL
// @version       0.5.2
// @namespace     http://www.elotrolado.net
// @description   Anade tus propios iconos a EOL
// @run-at        document-end
// @include       http://www.elotrolado.net/* 
// @exclude 
// @match		  http://www.elotrolado.net/* 
// ==/UserScript== 

// Variable para el prefijo de la clave de almacenamiento, 
// cambiar\u00E1 en la versi\u00F3n final y ha de ser modificable.
var storageKey = "SmilEOL.userdata";

// Variable que almacena los grupos y los datos de las im\u00E1genes en todo
// momento
// Las modificaciones se har\u00E1n sobre esta variable y luego se invocar\u00E1
// la funci\u00F3n saveData() para guardar el estado.
var _groups = new Array();

// variables \u00FAtiles de acceso a los elementos principales
var smileylist = document.getElementById("smiley-list");
var smileybox = document.getElementById("smiley-box");
var smileymgmt = document.getElementById("smiley-mgmt");

// mapeo que se usar\u00E1 en la interpretaci\u00F3n.
var smileyMapping = new Array();
/* Initialization */

// Tipo que representa un enlace r\u00E1pido
function LinkObject(name, url) {

	this.name = name;
	this.url = url;

	LinkObject.prototype.serialize = function() {

		return "L:" + this.name + "\u00A7" + this.url + "\u00A7\u00A7";
	};

	LinkObject.prototype.getElement = function() {

		var functionCode = "insert_text('" + this.url + "', true)";
		return this.getElementWFunction(functionCode);
	};

	LinkObject.prototype.getElementWFunction = function(functionCode) {

		var span = document.createElement("span");
		var a = document.createElement("a");
		a.href = "javascript:void(0)";
		a.title = this.name;
		a.setAttribute("onclick", functionCode);
		a.appendChild(document.createTextNode("#" + this.name));
		span.appendChild(document.createTextNode("  "));
		span.appendChild(a);
		span.appendChild(document.createTextNode("  "));
		return span;
	};
}

// interpreta una cadena como un objeto LinkObject
LinkObject.deserialize = function(arg) {

	var rgx = /L:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7\u00A7/;

	result = arg.match(rgx);

	if (result != null) {
		return new LinkObject(result[1], result[2]);
	} else {
		throw arg + " is unparseable";
	}
};

// Tipo que representa una imagen o enlace r\u00E1pido con imagen
function ImageObject(title, url, insert, keyword) {

	// clave
	this.title = title;
	// url de la imagen que se muestra
	this.url = url;
	// texto que se inserta al pinchar en la imagen
	this.insert = insert;

	if (this.insert == null) {
		this.insert = "[img]" + url + "[/img]";
	}

	this.keyword = keyword;

	if (this.keyword == null) {
		this.keyword = ".";
	}

	ImageObject.prototype.serialize = function() {

		return "I:" + this.title + "\u00A7" + this.url + "\u00A7" + this.insert
				+ "\u00A7" + this.keyword + "\u00A7\u00A7";
	};

	ImageObject.prototype.getElement = function() {

		var functionCode = "insert_text('" + this.insert + "', true)";
		return this.getElementWFunction(functionCode);
	};

	ImageObject.prototype.getElementWFunction = function(functionCode) {

		var span = document.createElement("span");
		var a = document.createElement("a");

		a.setAttribute("href", "javascript:void(0)");
		a.setAttribute("onclick", functionCode);
		var img = new Image();
		img.src = this.url;
		img.alt = this.title;
		img.title = this.title;

		adjustSize(img);

		a.appendChild(img);
		span.appendChild(a);

		return span;
	};
}

// interpreta una cadena como un objeto ImageObject
ImageObject.deserialize = function(arg) {

	var rgx = /I:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7\u00A7/;

	result = arg.match(rgx);

	if (result != null) {
		return new ImageObject(result[1], result[2], result[3], result[4]);
	} else {
		throw arg + " is unprseable";
	}
};

// interpreta una cadena como un objeto ImageObject o LinkObject
function deserialize(arg) {

	var rgxImg = /I:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7\u00A7/;
	var rgxLnk = /L:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7\u00A7/;

	if (rgxImg.test(arg)) {
		return ImageObject.deserialize(arg);
	} else if (rgxLnk.test(arg)) {
		return LinkObject.deserialize(arg);
	} else {
		return null;
	}

};

// reescala la imagen para el cuadro de selecci\u00F3n
function adjustSize(img) {

	if (!img.complete) {
		setTimeout(function() {

			adjustSize(img);
		}, 250);
	} else {

		var prop = img.width / img.height;
		var h = 25;
		var w = 180;
		if (img.height > h) {
			img.height = h;
			img.width = h * prop;
		}

		if (img.width > w) {
			img.width = w;
			img.heigth = w / prop;
		}

	}
}

// Tipo que representa un grupo de im\u00E1genes y/o enlaces r\u00E1pidos
function Group(key, elements) {

	this.name = key;
	this.elements = elements;
	if (elements == null) {
		this.elements = new Array();
	}

}

// m\u00E9todo que devuelve una cadena equivalente a la lista de elementos
Group.prototype.serializeElements = function() {

	elementList = "";
	for ( var i = 0; i < this.elements.length; i++) {
		elementList += this.elements[i].serialize();
	}

	return elementList;
};

// m\u00E9todo que devuelve el c\u00F3digo de exportaci\u00F3n
Group.prototype.serializeGroup = function() {

	return this.name + "\u00A7\u00A7\u00A7" + this.serializeElements();
};

// m\u00E9todo que interpreta una cadena como lista de elementos
var deserializeList = function(elementList) {

	var rgx = /I:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7\u00A7|L:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7\u00A7/g;

	var elementList = elementList.match(rgx);

	var elements = new Array();

	for ( var j = 0; j < elementList.length; j++) {
		var str = elementList[j];
		elements.push(deserialize(str));
	}

	return elements;
};

// m\u00E9todo que interpreta una cadena como un Objeto group
Group.deserializePack = function(iconpackStr) {

	var rgx = /[^\u00A7]*?\u00A7\u00A7\u00A7((I:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7([^\u00A7]*?)\u00A7\u00A7|L:([^\u00A7]+?)\u00A7([^\u00A7]*?)\u00A7\u00A7)*)$/;

	if (!rgx.test(iconpackStr)) {
		throw "Unparseable iconpack";
	} else {
		var packData = iconpackStr.split("\u00A7\u00A7\u00A7");
		return new Group(packData[0], deserializeList(packData[1]));
	}
};

// Guarda el la variable _groups en el almacenamiento local.
var saveData = function() {

	var groupList = "";

	for ( var groupKey in _groups) {
		groupList += groupKey + "\u00A7";

		var group = _groups[groupKey];

		var elementList = group.serializeElements();

		localStorage.setItem(storageKey + "." + groupKey, elementList);
	}

	localStorage.setItem(storageKey + "._groups", groupList);
};

// Recupera la variable _groups del almacenamiento local.
var loadData = function() {

	var groups = localStorage.getItem(storageKey + "._groups");
	if (groups == null) {
		return null;
	}

	var output = new Array();
	var groups = groups.split("\u00A7");

	for ( var i = 0; i < groups.length - 1; i++) {
		var g = groups[i];

		var elementList = localStorage.getItem(storageKey + "." + g);

		var elements = deserializeList(elementList);

		output[g] = new Group(g, elements);
	}

	return output;
};

var resetData = function() {

	var groups = localStorage.getItem(storageKey + "._groups");
	if (groups == null) {
		return;
	}

	var output = new Array();
	var groups = groups.split("\u00A7");

	for ( var i = 0; i < groups.length - 1; i++) {
		var g = groups[i];
		localStorage.removeItem(storageKey + "." + g);
	}

	localStorage.removeItem(storageKey + "._groups");

};

// inicializa el script
function init() {

	try {
		_groups = loadData();
		if (_groups == null) {
			_groups = StaticData.loadAll();
			saveData();
		}
	} catch (e) {
		_groups = StaticData.loadAll();
		alert(e);
	}
};

// Objecto para cargar las im\u00E1genes por defecto.
var StaticData = {};

StaticData.loadAll = function() {
	var groups = new Array();
	groups['EOL'] = StaticData.loadDefaultEOL();
	return groups;
};

StaticData.loadDefaultEOL = function() {

	var str = "EOL\u00A7\u00A7\u00A7"
			+ "I:sonriendo\u00A7http://www.elotrolado.net/images/smilies/smile.gif\u00A7:)\u00A7.\u00A7\u00A7"
			+ "I:triste\u00A7http://www.elotrolado.net/images/smilies/frown.gif\u00A7:(\u00A7.\u00A7\u00A7"
			+ "I:embarazoso\u00A7http://www.elotrolado.net/images/smilies/redface.gif\u00A7:o\u00A7.\u00A7\u00A7"
			+ "I:guinhando un ojo\u00A7http://www.elotrolado.net/images/smilies/wink.gif\u00A7;)\u00A7.\u00A7\u00A7"
			+ "I:sacando la lengua\u00A7http://www.elotrolado.net/images/smilies/tongue.gif\u00A7:p\u00A7.\u00A7\u00A7"
			+ "I:cool\u00A7http://www.elotrolado.net/images/smilies/cool.gif\u00A7:cool:\u00A7.\u00A7\u00A7"
			+ "I:sonrisa de compromiso\u00A7http://www.elotrolado.net/images/smilies/rolleyes.gif\u00A7:-|\u00A7.\u00A7\u00A7"
			+ "I:furioso\u00A7http://www.elotrolado.net/images/smilies/mad.gif\u00A7}:/\u00A7.\u00A7\u00A7"
			+ "I:asombrado\u00A7http://www.elotrolado.net/images/smilies/eek.gif\u00A7:O\u00A7.\u00A7\u00A7"
			+ "I:confuso\u00A7http://www.elotrolado.net/images/smilies/confused.gif\u00A7:-?\u00A7.\u00A7\u00A7"
			+ "I:parti\u00E9ndose\u00A7http://www.elotrolado.net/images/smilies/biggrin.gif\u00A7XD\u00A7.\u00A7\u00A7"
			+ "I:como la ni\u00F1a del exorcista\u00A7http://www.elotrolado.net/images/smilies/nuevos/vueltas.gif\u00A7[360�]\u00A7.\u00A7\u00A7"
			+ "I:llorica\u00A7http://www.elotrolado.net/images/smilies/nuevos/triste_ani4.gif\u00A7[mamaaaaa]\u00A7.\u00A7\u00A7"
			+ "I:a l\u00E1grima viva\u00A7http://www.elotrolado.net/images/smilies/nuevos/triste_ani3.gif\u00A7[buuuaaaa]\u00A7.\u00A7\u00A7"
			+ "I:trist\u00F3n\u00A7http://www.elotrolado.net/images/smilies/nuevos/triste_ani2.gif\u00A7[triston]\u00A7.\u00A7\u00A7"
			+ "I:llorando\u00A7http://www.elotrolado.net/images/smilies/nuevos/triste_ani1.gif\u00A7[snif]\u00A7.\u00A7\u00A7"
			+ "I:Ala!\u00A7http://www.elotrolado.net/images/smilies/nuevos/sorprendido_ani2.gif\u00A7[Alaa!]\u00A7.\u00A7\u00A7"
			+ "I:Oooooo\u00A7http://www.elotrolado.net/images/smilies/nuevos/sorprendido_ani1.gif\u00A7[Ooooo]\u00A7.\u00A7\u00A7"
			+ "I:enrojecido\u00A7http://www.elotrolado.net/images/smilies/nuevos/sonrojado_ani1.gif\u00A7[ayay]\u00A7.\u00A7\u00A7"
			+ "I:risa con gafas\u00A7http://www.elotrolado.net/images/smilies/nuevos/sonrisa_ani2.gif\u00A7[chulito]\u00A7.\u00A7\u00A7"
			+ "I:risita\u00A7http://www.elotrolado.net/images/smilies/nuevos/sonrisa_ani1.gif\u00A7[risita]\u00A7.\u00A7\u00A7"
			+ "I:buenazo\u00A7http://www.elotrolado.net/images/smilies/nuevos/risa_tonta.gif\u00A7[buenazo]\u00A7.\u00A7\u00A7"
			+ "I:m\u00E1s risas\u00A7http://www.elotrolado.net/images/smilies/nuevos/risa_ani3.gif\u00A7[+risas]\u00A7.\u00A7\u00A7"
			+ "I:carcajada\u00A7http://www.elotrolado.net/images/smilies/nuevos/risa_ani2.gif\u00A7[carcajad]\u00A7.\u00A7\u00A7"
			+ "I:sonrisa\u00A7http://www.elotrolado.net/images/smilies/nuevos/risa_ani1.gif\u00A7[sonrisa]\u00A7.\u00A7\u00A7"
			+ "I:reojo\u00A7http://www.elotrolado.net/images/smilies/nuevos/reojo.gif\u00A7�_�\u00A7.\u00A7\u00A7"
			+ "I:pelota\u00A7http://www.elotrolado.net/images/smilies/nuevos/pelota_ani1.gif\u00A7[boing]\u00A7.\u00A7\u00A7"
			+ "I:loco\u00A7http://www.elotrolado.net/images/smilies/nuevos/miedo.gif\u00A7[mad]\u00A7.\u00A7\u00A7"
			+ "I:malo\u00A7http://www.elotrolado.net/images/smilies/nuevos/malo_ani1.gif\u00A7[bad]\u00A7.\u00A7\u00A7"
			+ "I:comor?\u00A7http://www.elotrolado.net/images/smilies/nuevos/interro_ani1.gif\u00A7[comor?]\u00A7.\u00A7\u00A7"
			+ "I:calabaza\u00A7http://www.elotrolado.net/images/smilies/nuevos/hallowen.gif\u00A7[hallow]\u00A7.\u00A7\u00A7"
			+ "I:gui\u00F1ando\u00A7http://www.elotrolado.net/images/smilies/nuevos/guinyo_ani1.gif\u00A7[ginyo]\u00A7.\u00A7\u00A7"
			+ "I:muy furioso\u00A7http://www.elotrolado.net/images/smilies/nuevos/furioso.gif\u00A7[+furioso]\u00A7.\u00A7\u00A7"
			+ "I:fumando\u00A7http://www.elotrolado.net/images/smilies/nuevos/fumando.gif\u00A7[fumando]\u00A7.\u00A7\u00A7"
			+ "I:enfadado\u00A7http://www.elotrolado.net/images/smilies/nuevos/enfado_ani1.gif\u00A7[enfado1]\u00A7.\u00A7\u00A7"
			+ "I:enamorado\u00A7http://www.elotrolado.net/images/smilies/nuevos/enamorado.gif\u00A7[amor]\u00A7.\u00A7\u00A7"
			+ "I:durmiendo\u00A7http://www.elotrolado.net/images/smilies/nuevos/durmiendo.gif\u00A7ZzzZZ\u00A7.\u00A7\u00A7"
			+ "I:por aqu\u00ED!\u00A7http://www.elotrolado.net/images/smilies/nuevos/dedos.gif\u00A7[poraki]\u00A7.\u00A7\u00A7"
			+ "I:careto?\u00A7http://www.elotrolado.net/images/smilies/nuevos/careto_ani1.gif\u00A7[careto?]\u00A7.\u00A7\u00A7"
			+ "I:burla3\u00A7http://www.elotrolado.net/images/smilies/nuevos/burla_ani2.gif\u00A7[burla3]\u00A7.\u00A7\u00A7"
			+ "I:burla2\u00A7http://www.elotrolado.net/images/smilies/nuevos/burla_ani1.gif\u00A7[burla2]\u00A7.\u00A7\u00A7"
			+ "I:borracho\u00A7http://www.elotrolado.net/images/smilies/nuevos/borracho_ani1.gif\u00A7[borracho]\u00A7.\u00A7\u00A7"
			+ "I:angelito\u00A7http://www.elotrolado.net/images/smilies/nuevos/angelito.gif\u00A7[angelito]\u00A7.\u00A7\u00A7"
			+ "I:adios\u00A7http://www.elotrolado.net/images/smilies/nuevos2/adio.gif\u00A7[bye]\u00A7.\u00A7\u00A7"
			+ "I:alien\u00A7http://www.elotrolado.net/images/smilies/nuevos2/alien.gif\u00A7[alien]\u00A7.\u00A7\u00A7"
			+ "I:sonrisa\u00A7http://www.elotrolado.net/images/smilies/nuevos2/biggrin2.gif\u00A7:D\u00A7.\u00A7\u00A7"
			+ "I:bomba\u00A7http://www.elotrolado.net/images/smilies/nuevos2/bomba.gif\u00A7[boma]\u00A7.\u00A7\u00A7"
			+ "I:loco\u00A7http://www.elotrolado.net/images/smilies/nuevos2/borracho.gif\u00A7[looco]\u00A7.\u00A7\u00A7"
			+ "I:brindis\u00A7http://www.elotrolado.net/images/smilies/nuevos2/brindando.gif\u00A7[beer]\u00A7.\u00A7\u00A7"
			+ "I:enfadado\u00A7http://www.elotrolado.net/images/smilies/nuevos2/cabreo.gif\u00A7[enfa]\u00A7.\u00A7\u00A7"
			+ "I:cartman\u00A7http://www.elotrolado.net/images/smilies/nuevos2/cartman.gif\u00A7[cartman]\u00A7.\u00A7\u00A7"
			+ "I:cawento\u00A7http://www.elotrolado.net/images/smilies/nuevos2/cawento.gif\u00A7cawento\u00A7.\u00A7\u00A7"
			+ "I:cu\u00F1aaaaaooooo\u00A7http://www.elotrolado.net/images/smilies/nuevos2/cunyao.gif\u00A7:�\u00A7.\u00A7\u00A7"
			+ "I:decaido\u00A7http://www.elotrolado.net/images/smilies/nuevos2/decaido.gif\u00A7[decaio]\u00A7.\u00A7\u00A7"
			+ "I:del resves\u00A7http://www.elotrolado.net/images/smilies/nuevos2/delreves.gif\u00A7[reves]\u00A7.\u00A7\u00A7"
			+ "I:demoniaco\u00A7http://www.elotrolado.net/images/smilies/nuevos2/demonio.gif\u00A7[sati]\u00A7.\u00A7\u00A7"
			+ "I:discutiendo\u00A7http://www.elotrolado.net/images/smilies/nuevos2/discutiendo.gif\u00A7[discu]\u00A7.\u00A7\u00A7"
			+ "I:otro q duerme\u00A7http://www.elotrolado.net/images/smilies/nuevos2/dormido.gif\u00A7[maszz]\u00A7.\u00A7\u00A7"
			+ "I:Adorando\u00A7http://www.elotrolado.net/images/smilies/adora.gif\u00A7[tadoramo]\u00A7.\u00A7\u00A7"
			+ "I:asombrillo\u00A7http://www.elotrolado.net/images/smilies/nuevos2/eek.gif\u00A7Oooh\u00A7.\u00A7\u00A7"
			+ "I:enamorados\u00A7http://www.elotrolado.net/images/smilies/nuevos2/enamoraos.gif\u00A7[inlove]\u00A7.\u00A7\u00A7"
			+ "I:fiesta\u00A7http://www.elotrolado.net/images/smilies/nuevos2/fiesta.gif\u00A7[fies]\u00A7.\u00A7\u00A7"
			+ "I:metralleta\u00A7http://www.elotrolado.net/images/smilies/nuevos2/flamethrower.gif\u00A7ratataaaa\u00A7.\u00A7\u00A7"
			+ "I:flipando\u00A7http://www.elotrolado.net/images/smilies/nuevos2/flipando.gif\u00A7[flipa]\u00A7.\u00A7\u00A7"
			+ "I:idea\u00A7http://www.elotrolado.net/images/smilies/nuevos2/idea.gif\u00A7[idea]\u00A7.\u00A7\u00A7"
			+ "I:uf\u00A7http://www.elotrolado.net/images/smilies/nuevos2/infeliz.gif\u00A7[agggtt]\u00A7.\u00A7\u00A7"
			+ "I:karateka\u00A7http://www.elotrolado.net/images/smilies/nuevos2/karateka.gif\u00A7[chiu]\u00A7.\u00A7\u00A7"
			+ "I:maloso\u00A7http://www.elotrolado.net/images/smilies/nuevos2/masmalo.gif\u00A7[666]\u00A7.\u00A7\u00A7"
			+ "I:potando\u00A7http://www.elotrolado.net/images/smilies/nuevos2/masvomitos.gif\u00A7[lapota]\u00A7.\u00A7\u00A7"
			+ "I:no\u00A7http://www.elotrolado.net/images/smilies/nuevos2/nop.gif\u00A7[nop]\u00A7.\u00A7\u00A7"
			+ "I:ok\u00A7http://www.elotrolado.net/images/smilies/nuevos2/okis.gif\u00A7[ok]\u00A7.\u00A7\u00A7"
			+ "I:reojillo\u00A7http://www.elotrolado.net/images/smilies/nuevos2/ooooops.gif\u00A7[reojillo]\u00A7.\u00A7\u00A7"
			+ "I:otra sonrisa\u00A7http://www.elotrolado.net/images/smilies/nuevos2/otrasonrisa.gif\u00A7[jaja]\u00A7.\u00A7\u00A7"
			+ "I:fumeteo\u00A7http://www.elotrolado.net/images/smilies/nuevos2/otrofumeta.gif\u00A7[fumeta]\u00A7.\u00A7\u00A7"
			+ "I:pescador?\u00A7http://www.elotrolado.net/images/smilies/nuevos2/pimp.gif\u00A7[pos eso]\u00A7.\u00A7\u00A7"
			+ "I:machacando\u00A7http://www.elotrolado.net/images/smilies/nuevos2/rompiendo.gif\u00A7[toctoc]\u00A7.\u00A7\u00A7"
			+ "I:toma\u00A7http://www.elotrolado.net/images/smilies/nuevos2/tomaa.gif\u00A7[tomaaa]\u00A7.\u00A7\u00A7"
			+ "I:uzi\u00A7http://www.elotrolado.net/images/smilies/nuevos2/uzi.gif\u00A7[uzi]\u00A7.\u00A7\u00A7"
			+ "I:mas potas\u00A7http://www.elotrolado.net/images/smilies/nuevos2/vomitivo.gif\u00A7[buaaj]\u00A7.\u00A7\u00A7"
			+ "I:Catal\u00E1n\u00A7http://www.elotrolado.net/images/smilies/nuevos/barretina.gif\u00A7[barret]\u00A7.\u00A7\u00A7"
			+ "I:Babeando\u00A7http://www.elotrolado.net/images/smilies/babas.gif\u00A7[babas]\u00A7.\u00A7\u00A7"
			+ "I:Duda\u00A7http://www.elotrolado.net/images/smilies/net_duda.gif\u00A7ein?\u00A7.\u00A7\u00A7"
			+ "I:Que me parto!\u00A7http://www.elotrolado.net/images/smilies/net_quemeparto.gif\u00A7[qmparto]\u00A7.\u00A7\u00A7"
			+ "I:Nop\u00A7http://www.elotrolado.net/images/smilies/net_thumbsdown.gif\u00A7[noop]\u00A7.\u00A7\u00A7"
			+ "I:Ok!\u00A7http://www.elotrolado.net/images/smilies/net_thumbsup.gif\u00A7[oki]\u00A7.\u00A7\u00A7"
			+ "I:Aplausos\u00A7http://www.elotrolado.net/images/smilies/aplauso.gif\u00A7[plas]\u00A7.\u00A7\u00A7"
			+ "I:Lee!\u00A7http://www.elotrolado.net/images/smilies/rtfm.gif\u00A7[rtfm]\u00A7.\u00A7\u00A7"
			+ "";

	return Group.deserializePack(str);
};

// muestra/oculta un elemento.
var changeVisible = function(elementId) {

	var element = document.getElementById(elementId);

	// Esto es mas guay pero no funciona en greasemonkey... guay, eh?
	// alert(element.visible);
	// if (element.visible) {
	// element.style.display = "none";
	// } else {
	// element.style.display = "block";
	// }
	// element.visible = !element.visible;

	if (element.style.display == "none") {
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
};

var setFunction = function(e, cb, arg0) {

	e.addEventListener("click", function() {

		cb(arg0);
	}, false);
};

// genera el cuadro de selecci\u00F3n a partir de una lista de grupos.
function getGroups(groups) {

	var outlist = document.createElement("div");
	outlist.id = "smiley-list";
	//outlist.style.height = "184px";
outlist.style.height = "auto";
	outlist.style.overflow = "auto";
	outlist.style.diplay = "block";

	var first = true;
	for ( var groupKey in _groups) {
		var group = _groups[groupKey];

		var a = document.createElement("a");
		a.setAttribute("href", "javascript:void(0)");
		var id = "smilEOL-" + group.name;

		setFunction(a, changeVisible, id);

		var strong = document.createElement("strong");
		strong.appendChild(document.createTextNode(group.name));
		a.appendChild(strong);

		var div = document.createElement("div");
		div.setAttribute("id", id);

		if (first) {
			div.visible = true;
			div.style.display = "block";
			first = !first;
		} else {
			div.visible = false;
			div.style.display = "none";
		}

		for ( var j = 0; j < group.elements.length; j++) {
			var e = group.elements[j];
			div.appendChild(e.getElement());
		}

		outlist.appendChild(a);
		outlist.appendChild(div);
		outlist.appendChild(document.createElement("br"));
	}

	return outlist;
};

// genera el cuadro de administraci\u00F3n.
function getManagement() {

	var outlist = document.createElement("div");
	outlist.id = "smiley-mgmt";
	//outlist.style.height = "184px";
outlist.style.height = "auto";
	outlist.style.overflow = "auto";
	outlist.style.display = "none";

	var table = document.createElement("table");
	table.style.width = "100%";

	var tr1 = table.insertRow(0);
	var td1 = tr1.insertCell(0);
	td1.rowSpan = 4;
	td1.id = "smiley-mgmt-td-select";

	var td2 = tr1.insertCell(1);
	var a_up = buildA_UP();
	td2.appendChild(a_up);

	var tr2 = table.insertRow(1);
	var td3 = tr2.insertCell(0);
	var a_del = buildA_DEL();
	td3.appendChild(a_del);

	var tr3 = table.insertRow(2);
	var td4 = tr3.insertCell(0);
	var a_down = buildA_DOWN();
	td4.appendChild(a_down);

	var tr4 = table.insertRow(3);
	var td5 = tr4.insertCell(0);
	var a_add = buildA_ADD();
	td5.appendChild(a_add);

	var select = buildSelectGroup();
	td1.appendChild(select);
	outlist.appendChild(table);

	var save = document.createElement("input");
	save.type = "button";
	save.value = "Guardar";
	save.setAttribute("class", "button2");
	save.addEventListener("click", function() {

		replaceBox();
		saveData();
	}, false);

	var cancel = document.createElement("input");
	cancel.type = "button";
	cancel.value = "Cancelar";
	cancel.setAttribute("class", "button2");
	cancel.addEventListener("click", function() {

		_groups = loadData();
		replaceBox();
	}, false);

	var reset = document.createElement("input");
	reset.type = "button";
	reset.value = "Reset";
	reset.setAttribute("class", "button2");
	reset
			.addEventListener(
					"click",
					function() {

						if (confirm("Est\u00E1s seguro de querer borrar toda la configuraci\u00F3n")) {
							resetData();
						}

					}, false);

	var a_import = buildA_IMPORT();
	var a_export = buildA_EXPORT();
	var a_icons = buildA_ICON();

	outlist.appendChild(document.createElement("br"));
	// outlist.appendChild(a_icons);
	outlist.appendChild(document.createElement("br"));
	outlist.appendChild(a_import);
	outlist.appendChild(document.createElement("br"));
	outlist.appendChild(a_export);

	outlist.appendChild(document.createElement("br"));
	outlist.appendChild(document.createElement("br"));
	outlist.appendChild(save);
	outlist.appendChild(cancel);
	outlist.appendChild(reset);

	return outlist;
};

var updateSelectGroup = function() {

	var option = document.getElementById("smiley-mgmt-groups");
	var e = document.getElementById("smiley-mgmt-td-select");
	var sel = buildSelectGroup();
	e.replaceChild(sel, option);
	return sel;
};

var buildA_UP = function() {

	var a_up = document.createElement("input");
	a_up.type = "button";
	a_up.value = "\u25B2";
	a_up.title = "Mover hacia arriba";
	a_up.setAttribute("class", "button2");
	a_up.style.fontFamily = "Courier New, Monospace";
	a_up.style.fontSize = "16px";
	a_up.style.height = "20px";
	a_up.addEventListener("click", function() {

		var option = document.getElementById("smiley-mgmt-groups");
		var groupKey = option.value;

		if (groupKey == null || groupKey == "") {
			return;
		}

		var g = getMapAsArray(_groups);
		var selIndex = shiftGroups(g, _groups[groupKey], true);
		_groups = groupsArrayToMap(g);

		var sel = updateSelectGroup();
		sel.value = option.value;
		setTimeout(function() {

			sel.selectedIndex = selIndex;
		}, 10);
		sel.selectedIndex = selIndex;
	}, false);
	return a_up;

};

var buildA_DOWN = function() {

	var a_down = document.createElement("input");
	a_down.type = "button";
	a_down.value = "\u25BC";
	a_down.title = "Mover hacia abajo";
	a_down.setAttribute("class", "button2");
	a_down.style.fontFamily = "Courier New, Monospace";
	a_down.style.fontSize = "16px";
	a_down.style.height = "20px";
	a_down.addEventListener("click", function() {

		var option = document.getElementById("smiley-mgmt-groups");
		var groupKey = option.value;

		if (groupKey == null || groupKey == "") {
			return;
		}

		var g = getMapAsArray(_groups);
		var selIndex = shiftGroups(g, _groups[groupKey], false);
		_groups = groupsArrayToMap(g);

		var sel = updateSelectGroup();
		sel.value = option.value;

		// Peque\u00F1a \u00F1apa, si va deasiado r\u00E1pido no actualiza la
		// posici\u00F3n
		setTimeout(function() {

			sel.selectedIndex = selIndex;
		}, 10);
		sel.selectedIndex = selIndex;
	}, false);
	return a_down;
};

var buildA_DEL = function() {

	var a_del = document.createElement("input");
	a_del.type = "button";
	a_del.value = "-";
	a_del.title = "Borrar grupo";
	a_del.setAttribute("class", "button2");
	a_del.style.fontFamily = "Courier New, Monospace";
	a_del.style.fontSize = "16px";
	a_del.style.height = "20px";
	a_del.addEventListener("click", function() {

		var option = document.getElementById("smiley-mgmt-groups");
		var groupKey = option.value;

		if (groupKey == null || groupKey == "") {
			return;
		}

		delete _groups[groupKey];
		var sel = updateSelectGroup();

	}, false);
	return a_del;
};

var buildA_ADD = function() {

	var a_add = document.createElement("input");
	a_add.type = "button";
	a_add.value = "+";
	a_add.title = "A\u00F1adir grupo";
	a_add.setAttribute("class", "button2");
	a_add.style.fontFamily = "Courier New, Monospace";
	a_add.style.fontSize = "16px";
	a_add.style.height = "20px";
	a_add.addEventListener("click", function() {

		var name = prompt("Define un nombre para el grupo");
		var r = /[^\u00A7]*/;
		if ((name != null) && r.test(name) && (_groups[name] == null)) {
			_groups[name] = new Group(name);
		} else {
			alert(name + " no es un nombre v\u00E1lido o ya existe");
		}

		var sel = updateSelectGroup();
		sel.value = name;
		// Peque\u00F1a \u00F1apa, si va deasiado r\u00E1pido no actualiza la
		// posici\u00F3n
		setTimeout(function() {

			sel.selectedIndex = sel.length - 1;
		}, 10);
		sel.selectedIndex = sel.length - 1;
	}, false);
	return a_add;
};

var buildA_ICON = function() {

	var a_icons = document.createElement("a");
	a_icons.href = "javascript:void(0)";
	a_icons.addEventListener("click", function() {

	}, false);
	a_icons.innerHTML = "<strong>Administrar elementos</strong>";
	return a_icons;
};

var buildA_IMPORT = function() {

	var a_import = document.createElement("a");
	a_import.href = "javascript:void(0)";
	a_import.addEventListener("click", function() {

		var str = prompt("Pega aqu\u00ED el c\u00F3digo del iconpack");
		try {
			var g = Group.deserializePack(str);
			_groups[g.name] = g;
			var sel = updateSelectGroup();
			// Peque\u00F1a \u00F1apa, si va deasiado r\u00E1pido no actualiza la
			// posici\u00F3n
			setTimeout(function() {

				sel.selectedIndex = sel.length - 1;
			}, 10);
			sel.selectedIndex = sel.length - 1;
		} catch (e) {
			alert("iconpack inv\u00E1lido: " + e);
		}
	}, false);
	a_import.innerHTML = "<strong>Importar iconpack</strong>";
	return a_import;
};

var buildA_EXPORT = function() {

	var a_export = document.createElement("a");
	a_export.href = "javascript:void(0)";
	a_export.addEventListener("click", function() {

		var option = document.getElementById("smiley-mgmt-groups");
		var groupKey = option.value;

		if (groupKey == null || groupKey == "") {
			return;
		}

		var group = _groups[groupKey];
		var code = group.serializeGroup();
		var str = prompt("Copia y guarda en alguna parte este c\u00F3digo",
				code);
	}, false);
	a_export.innerHTML = "<strong>Exportar como iconpack</strong>";
	return a_export;
};

var buildSelectGroup = function() {

	var select = document.createElement("select");
	select.id = "smiley-mgmt-groups";
	select.size = 5;
	select.overflow = "hidden";
	select.style.width = "100%";

	for ( var groupKey in _groups) {
		var g = _groups[groupKey];

		var option = document.createElement("option");
		option.id = "option-" + g.name;
		option.value = g.name;
		option.appendChild(document.createTextNode(g.name));

		select.appendChild(option);
	}
	return select;
};

// De un array asociativo saca un array normal.
var getMapAsArray = function(map) {

	var out = new Array();
	var i = 0;

	for ( var gKey in map) {
		out[i++] = map[gKey];
	}

	return out;
};

// De un array de Group genera un array asociativo
var groupsArrayToMap = function(array) {

	var out = new Array();

	for ( var i = 0; i < array.length; i++) {
		var g = array[i];

		out[g.name] = g;
	}

	return out;
};

// intercambia dos elementos de un array de Groups;
var shiftGroups = function(groups, group, up) {

	for ( var i = 0; i < groups.length; i++) {
		if (group == groups[i]) {
			var j = (up) ? i - 1 : i + 1;

			if (j < 0 || j >= groups.length) {
				return i;
			}

			var t = groups[j];
			groups[j] = groups[i];
			groups[i] = t;

			return j;
		}
	}
};

// sustituye el cuadro de emoticonos
var replaceBox = function() {

	smileybox.innerHTML = "";
	smileylist = getGroups(_groups);
	smileymgmt = getManagement();

	var a = document.createElement("a");
	a.href = "javascript:void(0);";
	a.title = "manage";
	a.innerHTML = "<strong>Emoticonos:</strong>";
	a.mmode = false;
	a.id = "mmode-select";

	a.addEventListener("click", function() {

		changeMMode();
	}, false);

	smileybox.appendChild(a);
	smileybox.appendChild(document.createElement("hr"));

	smileybox.appendChild(smileylist);
	smileybox.appendChild(smileymgmt);

	smileybox.appendChild(document.createElement("hr"));

	var ar = document.createElement("a");
	ar.href = "#review";
	ar.title = "Revisi\u00F3n del hilo";
	ar.innerHTML = "<strong>Revisi\u00F3n del hilo</strong>";
	smileybox.appendChild(ar);
};

// cambia el modo del cuadro.
var changeMMode = function() {

	var list = document.getElementById("smiley-list");
	var mgmt = document.getElementById("smiley-mgmt");
	var selector = document.getElementById("mmode-select");

	// pufo para que funcione en greasemonkey... lamentable
	// firefox sigue perdiendo puntos y como siga asi acaba al nivel de IE,
	// S\u00ED, Internet Explorer... que triste!
	if (!this.mmode) {
		if (mgmt.style.display == "none") {
			list.style.display = "none";
			mgmt.style.display = "block";
			selector.innerHTML = "<strong>Administrar:</strong>";
		} else {
			list.style.display = "block";
			mgmt.style.display = "none";
			selector.innerHTML = "<strong>Emoticonos:</strong>";
		}
	} else {

		// as\u00ED es como debiera ser.
		if (this.mmode == false) {
			list.style.display = "none";
			mgmt.style.display = "block";
			selector.innerHTML = "<strong>Administrar:</strong>";
		} else {
			list.style.display = "block";
			mgmt.style.display = "none";
			selector.innerHTML = "<strong>Emoticonos:</strong>";
		}

		this.mmode = !this.mmode;
	}
};

// funcionalidad de reemplazo de palabras clave
var replaceKeyWords = function() {

	smileyMapping = getTranslationMap(_groups);
	
	var posts = getElementsByClass(null, "content");
	replaceKeys(posts);

};

var replaceRecursive = function(node) {
	
	for ( var j = 0; j < node.childNodes.length; j++) {
		var e = node.childNodes.item(j);
		
		if (e.nodeType == Node.TEXT_NODE) {
			var text = e.textContent;
			text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			
			for ( var key in smileyMapping) {
				
				try {
					// escape RegExp operators
					var escKey = key.replace(/([\\()\[\]{}.^$?+*|])/g, "\\$1");
					rgx = new RegExp("(\\s|^|>)" + escKey + "(\\s|$|<)", "g");
					//Exploit fixing
					
					text = text.replace(rgx, "$1" + smileyMapping[key] + "$2");
				} catch (e) {
					// Callarse like a whore.
				}
			}

			var elmnts = getElements(text);
			replaceNode(e.parentNode, elmnts, e);
		}
		if (!(e.tagName && /code/i.test(e.tagName))) {
			replaceRecursive(e);
		}
	}
};

// remplaza una clave por su valor
var replaceKeys = function(elementList) {

	for ( var i = 0; i < elementList.length; i++) {
		var post = elementList[i];
		replaceRecursive(post);
	}

};

// genera el mapa de traducci\u00F3n
var getTranslationMap = function(groups) {

	var out = new Array();

	for ( var name in groups) {
		var g = groups[name];

		for ( var i = 0; i < g.elements.length; i++) {
			var e = g.elements[i];

			if (e instanceof ImageObject) {
				if (e.keyword != ".") {
					var img = new Image();
					img.src = e.url;
					img.alt = e.title;
					img.title = e.title;
					out[e.keyword] = getHTML(img);
				}
			}
		}
	}

	return out;
};

// Utilidad equivalente a getElementsByClassName();
var getElementsByClass = function(parentNode, className) {

	parentNode = (parentNode == null) ? document : parentNode;

	var elements = document.getElementsByTagName("*");
	var out = new Array();

	for ( var i = 0; i < elements.length; i++) {
		if (elements.item(i).className == className) {
			out.push(elements.item(i));
		}
	}

	return out;
};

// Utilidad equivalente a outerHTML
var getHTML = function(e) {

	if (e.outerHTML) {
		return e.outerHTML;
	} else {
		var d = document.createElement("div");
		d.appendChild(e);
		return d.innerHTML;
	}
};

var getElements = function(text) {

	var d = document.createElement("div");
	d.innerHTML = text;
	return d.childNodes;
};

var replaceNode = function(target, news, old) {

	if (news.length > 0) {
		var next = old.nextSibling;
		target.replaceChild(news.item(0).cloneNode(true), old);

		for ( var i = 1; i < news.length; i++) {
			if (next != null) {
				target.insertBefore(news.item(i).cloneNode(true), next);
			} else {
				target.appendChild(news.item(i).cloneNode(true));
			}
		}
	}
};

var replaceInstants = function() {
	
	var rgx = /http:\/\/(?:www.)?instantsfun\.es\/(\w*)/;
	var embed = '<embed src="http://www.instantsfun.es/swf/$1.swf" width="50" height="50" quality="mid" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" wmode="transparent" title="$2"></embed>';
	
	var divs = getElementsByClass(null, "content");
	for (var i = 0; i < divs.length; i++) {
		var links = divs[i].getElementsByTagName("a");
		for (var j = 0; j < links.length;) {
			var m = rgx.exec(links[j].href);
			if (m) {				
				var element = getElements(embed.replace("$1", m[1]).replace("$2", links[j].textContent));
				replaceNode(links[j].parentNode, element, links[j]);				
			} else {
				j++;
			}
		}
	}	
};

var replaceBoxBetterEOL = function(box, c) {

	if (c > 0) {
		if (box == null) {
			setTimeout(
					function() {
						replaceBoxBetterEOL(document.getElementById("smiley-box"), --c);
					}, 500);
		} else {
			smileybox = box;
			try {
				replaceBox();
			} catch (e) {
				alert("Se ha producido un error en el script bte " + "p_m: "
						+ e);
			}
		}
	}
};

// funcion de entrada
function scriptMain() {
	
	//por si a chrome no le quedan claras las directivas, pero que conste que a m� me funciona.
	//Gracias a NeDark por este consejito

	if (location.host != 'www.elotrolado.net') return;
	/*if (document.getElementById("rightcontent").getElementsByTagName("h2")[0].lastChild.textContent != "Pruebas") return;*/
	init();
	
	//Greasemonkey apesta, creedme
	if (!Node.TEXT_NODE) {
		Node.TEXT_NODE = 3;
	}
	//Hacen lo que les da la gana...
	
	smileyMapping = getTranslationMap(_groups);
		
	if (smileybox == null) {
		replaceBoxBetterEOL(null, 4);
	} else {
		try {
			setTimeout(replaceBox, 1);
		} catch (e) {
			alert("Se ha producido un error en el script " + "p_m: " + e);
		}
	}

	if (location.href.match(/http:\/\/www.elotrolado.net\/hilo.*/)) {
		setTimeout(function() {
			replaceInstants();
			// experimental: ejecutar as\u00EDncronamente		
			replaceKeyWords();			
		}, 1);
		betterEOL();
	}
	return;
}

// Pr\u00F3xima integraci\u00F3n
betterEOL = function() {

	var bE_button = document.createElement('input');
	bE_button.id = "SmilEOL-BetterEOL-iconsFix";
	bE_button.setAttribute('style', "display: none;");
	bE_button.type = "button";
	document.body.appendChild(bE_button);
	bE_button.addEventListener('click', replaceKeyWords, true);
};

// inicio del script
scriptMain();
// fin del script