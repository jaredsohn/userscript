// ==UserScript==
// @name           eRepublik Instant Wall Updater
// @namespace      darkhogg
// @description    Show Damage ^^
// @include        http://ww*.erepublik.com/*/battles/show/*
// @require        http://darkhogg.netii.net/jrepublik/json-jrep.js
// @author         Astorg De Carlat
// @version        0.6.3
// @unwrap
// ==/UserScript==


var Cfg = {};

// +--------------+--------------------------------------------------+
// | CONFIG START | MODIFICA LOS VALORES SIGUIENDO LAS INSTRUCCIONES |
// +--------------+--------------------------------------------------+

/////
// updInterval:
//   Indica el tiempo de actualización del muro.
//   · Introduce un entero para indicar el intervalo (en milisegundos: 1000 = 1 segundo)
//     cualquier valor por debajo de 1200 será ignorado, y 1200 será el valor usado.
/////
Cfg.updInterval = 1200;

/////
// graphInterval:
//   Indica el tiempo que tardará el gráfico de GoogleChart en actualizarse.
//   Se trata de un intervalo de actualización, los datos estarán siempre actualizados al segundo,
//   sea cual sea el valor.
//   · Introduce 0 para no mostrar el gráfico
//   · Introduce un entero para indicar el intervalo (en milisegundos: 1000 = 1 segundo)
//     cualquier valor por debajo de 1200 será ignorado, y 1200 será el valor usado.
/////
Cfg.graphInterval = 1200;

/////
// updateNativeWall:
//   Indica si el muro nativo de eRepublik se actualizará a la vez que el valor del script
//   Si se desactiva, el muro original del juego se mantendrá en los valores que obtiene el
//   sistema original, por lo que se actualizará únicamente cada 10~30 segundos
//   · TRUE  para activar esta opción
//   · FALSE para desactivarla
/////
Cfg.updateNativeWall = true;

/////
// modDisplay:
//   Indica si ha de modificarse la forma en que aparecen los luchadore.
//   Si está activo, el número de luchadores que aparecerá en pantalla será 
//   modificable, los bloques de cada ataque serán más pequeños, y podrás
//   ver los avatares a tamaño real ( 100 x 100 ) pasando el ratón sobre ellos.
//   · TRUE  para activar esta opción
//   · FALSE para desactivarla
/////
Cfg.modDisplay = true;

/////
// modDisplayNum:
//   Especifica el número de luchadores que aparecen, como máximo, en
//   la vista de batalla. Sólo disponible si modDisplay está activo.
//   · Introduce un valor entero entre 5 y 150 (Cualquier otro valor será ignorado)
/////
Cfg.modDisplayNum = 10;

// +------------+-----------------------------------+
// | CONFIG END | NO MODIFICAR NADA BAJO ESTA LINEA |
// +------------+-----------------------------------+

// Set a function static storage
var FnSto = {};

// Set prototype things
var $        = unsafeWindow.$;
var $$       = unsafeWindow.$$;
var Element  = unsafeWindow.Element;
var Function = unsafeWindow.Function;
var jQuery   = unsafeWindow.jQuery;

// Create the new div
var ptDiv     = new Element('div');
var ptDivCont = new Element('div');
var ptDivAct  = new Element('div');

// Create images
var Img = {
	enabled: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABOElE' +
		'QVR42nzRvUubURQH4CdvRKlQCiJaCIqDg1ClL1ICQbFDqWBxcCgIoqUijeDkx+x/IIJTqWCdhS6FglhX' +
		'wcGKirOiiIEMQomNYFTS5VI0Vn9wlnufczmcm5j6+VFINbJ4j0w428Q3LKIEVeEihR+I3c3rUGPox2kU' +
		'Xl79D76dOJjqKIzR8QiWetosmGyEwcfwy8ZXJtOzupvewGCENMTP02qSNffwcPu4k/MjW7kNSEdQX9tg' +
		'uH1ctnPmX9Nt/GV7zuXNJZSSmZH43cVVsSlfzOlp7tVa1+amfG3oxadKDNtVWEFmL/8Ln33omNDyrNVx' +
		'4aASw0oyMxLvYACN+WLOn1JBlIh83V2oxPvIJsrlsun10VTY80Pr3Uff/Nvl02Sh6xjOsYQzPEFLgBuY' +
		'D3/1e+3wu78DAJx/ZLqpR2n6AAAAAElFTkSuQmCC',
	
	disabled: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA70lE' +
		'QVR42pTRMWoCQRTG8V+WRdgmF8gZxC1kwCrlIqQMeADBOmfwEkJuIKQMiGUgoCwEhD2DtVgtCJIUzmSV' +
		'VPlgivnen/e+N3P3PZ+L6mGGZ4yit8EbXnGCPBYe8I7SrR7jmeIJ+yx2XimKUgj+KASKosQKvSzG6CtL' +
		'qupyktJ9MIA+Zjkml7Qb7u/dTAmBuma7Tc4kR0es1x3IBU5erGT+p1OOr99nrKouxvWkbkqTY4mR0aiD' +
		'r2OEwPGY9ljmWGBqt+s7n7vuqfPhQNNAg0UWf3CsbZsbOKmuadsGY5zS0nsM8YKPK/wzesPI+BkA/GhI' +
		'1jd9dDMAAAAASUVORK5CYII=',
}

// Load persistent vars or create new
LocVars = getCookie('dflt');
if (LocVars === null) {
	LocVars = {
		enabled:     true,
	}
}

// Relocate the div
var grfDiv = $$('#content .battleinfo_container .battleinfo .battleaction')[1];
grfDiv.parentNode.insertBefore(ptDiv, grfDiv);

// Set the style
ptDiv.setStyle({
	clear: 'both',
});

ptDivCont.setStyle({
	fontFamily:      'Georgia',
	fontWeight:      'bold',
	textAlign:       'center',
	
	width:           '200px',
	margin:          '0 auto',
	
	MozBorderRadius: '5px'
});

// Create three styles for the different wall status
stlGreen = {
	background: '#BEB',
	color:      '#131',
	fontSize:   '20px',
	padding:    '7px',
};

stlYellow = {
	background: '#FFA',
	color:      '#330',
	fontSize:   '20px',
	padding:    '7px',

};

stlRed = {
	background: '#EBB',
	color:      '#311',
	fontSize:   '20px',
	padding:    '7px',

};

stlGray = {
	background: '#EEE',
	color:      '#999',
	fontSize:   '12px',
	padding:    '2px',
};

ptDivCont.setStyle(stlGray);

// Set the ACTIVE div
ptDivAct.setStyle({
	fontFamily: 'Tahoma',
	fontSize:   '11px',
	fontWeight: 'bold',
	textAlign:  'center',
	color:      '#999',
	
	padding:    '7px',
	margin:     '0 auto',
	width:      '100px',
	
	cursor:     'pointer'
});
ptDivAct.update('<img alt="" src="' + (LocVars.enabled ? Img.enabled : Img.disabled) + '" /> ' + (LocVars.enabled ? 'Enabled' : 'Disabled'));
ptDivAct.wrap(ptDiv);
ptDivAct.observe('click', function(Ev){
	LocVars.enabled = !LocVars.enabled;
	ptDivAct.update('<img alt="" src="' + (LocVars.enabled ? Img.enabled : Img.disabled) + '" /> ' + (LocVars.enabled ? 'Enabled' : 'Disabled'));
	if (LocVars.enabled) {
		updateWallPoints(unsafeWindow.db.current_dp);
	} else {
		//ptDivCont.setStyle(stlGray).update('Disabled');
	}
	
	setCookie('dflt', LocVars);
});

// Initialize DIV contents
ptDivCont.update(LocVars.enabled ? 'Loading' : 'Disabled').wrap(ptDiv);

// Create the chart
var imgChDiv = new Element('div');
imgChDiv.absolutize();
imgChDiv.setStyle({
	padding: 0,
	margin:  0,
});

var imgChart = new Element('img');
imgChart.wrap(imgChDiv);

document.body.appendChild(imgChDiv);

// Get the battle number and start wall
var battle   = unsafeWindow.battle_id;
var stPoints = unsafeWindow.original_dp;
var lang     = document.location.pathname.substr(document.location.pathname.indexOf('/') + 1, 2);

// Set some vars
var lastPoints  = null;
var lastErepDp  = null;
var petitions   = 0;
var wallHistory = [];
var wallHistLim = 60;
var updInterval = Math.max( 1200, Cfg.updInterval );
var graphInterv = Math.max( 1200, Cfg.graphInterval );

if ( Cfg.modDisplay ) {
	// Set the maximin number of fighters to 10
	unsafeWindow.settings.visuals.maximum_number_of_fighters = Math.min(150, Math.max(5, Cfg.modDisplayNum));

	// Modify the templates of attacking and defending fighters
	var attTemplate = $('attacking_fighter_template');
	var defTemplate = $('defending_fighter_template');

	var templateStyle = {
		//height: 'auto',
		padding:  '0',
		margin:   '0',
	}
	var fighterDivStyle = {
		height:          '44px',
		padding:         '4px',
		margin:          '-8px',
		MozBorderRadius: '5px',
		overflow:        'hidden'
	};
	var avatarHolderStyle = {};
	var avatarImageStyle = {
		width:    '42px',
		height:   '42px',
	};
	var nameHolderStyle = {
		width:      '80px',
		//fontWeight: 'bold',
		padding:    '0',
		margin:     '0',
		//fontFamily: 'Lucida Console',
		overflow:   'hidden'
	};
	var damageHolderStyle = {
		padding:  '0',
		margin:   '0',
	};

	attTemplate.setStyle( templateStyle );
	attTemplate.select('.fighter')[0].setStyle( fighterDivStyle );
	attTemplate.select('.avatarholder')[0].setStyle( avatarHolderStyle );
	attTemplate.select('.avatarholder img')[0].setStyle( avatarImageStyle );
	attTemplate.select('.nameholder')[0].setStyle( nameHolderStyle );
	attTemplate.select('.damage')[0].setStyle( damageHolderStyle );

	defTemplate.setStyle( templateStyle );
	defTemplate.select('.fighter')[0].setStyle( fighterDivStyle );
	defTemplate.select('.avatarholder')[0].setStyle( avatarHolderStyle );
	defTemplate.select('.avatarholder img')[0].setStyle( avatarImageStyle );
	defTemplate.select('.nameholder')[0].setStyle( nameHolderStyle );
	defTemplate.select('.damage')[0].setStyle( damageHolderStyle );

	// Create the tooltip for images
	var imgTooltip = new Element('div');
	imgTooltip.absolutize();
	imgTooltip.setStyle();
	imgTooltip.hide();
	document.body.appendChild( imgTooltip );

	// Modify the displaying eRep functions
	unsafeWindow.visuals._display_defenders = unsafeWindow.visuals._display_defenders.wrap( function ( fnOrig ) {
		fnModDisplay( fnOrig, 'defender');
	});
	unsafeWindow.visuals._display_attackers = unsafeWindow.visuals._display_attackers.wrap( function ( fnOrig ) {
		fnModDisplay( fnOrig, 'attacker');
	});
}

// Set intervals
setInterval( update,    updInterval );
setInterval( loadGraph, graphInterv );
setInterval( freeMem,   5000 );

// ===== FUNCTIONS ============================================================
// Updating function
function update () {
	
	var url = 'http://www.erepublik.com/en/battles/log/' + battle + '?how_many=' + ( 1 + petitions%15 ) + '&rnd=' + ( 1 + petitions%128 );
	
	if (unsafeWindow.db.current_dp != lastErepDp || unsafeWindow.db.current_dp != lastPoints) {
		updateWallPoints(unsafeWindow.db.current_dp);
		lastErepDp = unsafeWindow.db.current_dp;
	}
	
	if (LocVars.enabled) {
		petitions++;
		
		jQuery.ajax({
			type: 'GET',
			url:  url,
			complete: function (h) {
				// Set script data
				var data   = eval(h.responseText);
				var points = data.current_dp;
				
				if (LocVars.enabled && points != lastPoints) {
					updateWallPoints(points);
					lastPoints = points;
				}
			}
		});
	}
	
	wallHistory.push( unsafeWindow.db.current_dp );
	if ( wallHistory.length > wallHistLim ) {
		wallHistory.shift();
	}
}

// Updater
function updateWallPoints (points) {
	if (FnSto.wall === undefined) {
		FnSto.wall    = 0;
		FnSto.lastDif = 0;
	}
	
	var wallDif = points - FnSto.wall;
	
	if ( wallDif != 0 && FnSto.lastDif != -wallDif ) {
		
		FnSto.lastDif = wallDif
		
		var ptPos = ptDivCont.cumulativeOffset();
		if (wallDif > 0) {
			createUpFader('+' + intFormat(wallDif), ptPos.left + 175, ptPos.top - 5, {
				fontFamily: 'Georgia',
				fontWeight: 'bold',
				color:      '#070',
				width:      '100px',
			});
		} else {
			createUpFader(intFormat(wallDif), ptPos.left + 15, ptPos.top - 5, {
				fontFamily: 'Georgia',
				fontWeight: 'bold',
				color:      '#900',
				width:      '100px',
			});
		}
		
		FnSto.wall = points;
		
		var stl    = (
			points < 0
			? stlRed
			: (
				points > stPoints
				? stlGreen
				: stlYellow
			)
		);
		ptDivCont.setStyle(stl)
		ptDivCont.update(intFormat(points));
		
		// Set eRepublik data
		unsafeWindow.db.current_dp = points;
		if ( Cfg.updateNativeWall ) {
			unsafeWindow.visuals.resize_defense_bar();
		}
	}
}

// Load a new graphic
function loadGraph () {
	if ( Cfg.graphInterval > 0 ) {
		var gcUrl = 'http://chart.apis.google.com/chart?chs=150x50&cht=lc&chco=3366FF&chm=B,3366FF33,0,0,0&chd=e:';
		
		while ( wallHistory.length < wallHistLim ) {
			wallHistory.unshift( null );
		}
		
		var i;
		var maxValue = wallHistory[ wallHistory.length - 1 ];
		var minValue = wallHistory[ wallHistory.length - 1 ];
		
		for ( i in wallHistory ) {
			if ( wallHistory[i] !== null ) {
				if ( wallHistory[i] > maxValue ) {
					maxValue = wallHistory[i]
				}
				if ( wallHistory[i] < minValue ) {
					minValue = wallHistory[i]
				}
			}
		}
		
		var ptDif  = maxValue - minValue;
		var chData = [];
		
		var encChar;
		for ( i in wallHistory ) {
			if ( wallHistory[i] === null ) {
				encChar = '__';
			} else if ( ptDif == 0 ) {
				encChar = 'AA';
			} else {
				encChar = googleExtendedEncode( ( ( wallHistory[i] - minValue ) / ptDif ) * ( 64*64 - 1 ) );
			}
			
			chData.push( encChar );
		}
		
		gcUrl += chData.join('');
		
		var newPos = ptDivCont.cumulativeOffset();
		
		imgChDiv.absolutize();
		imgChDiv.setStyle({
			left: ( newPos.left + 250 ) + 'px',
			top:  ( newPos.top  - 15  ) + 'px',
		});
		imgChart.src = gcUrl;
	}
}

function freeMem () {
	// TODO
}

// Extended-encoding GChart converter
function googleExtendedEncode ( num ) {
	num = Math.floor( parseInt(num) );
	
	var charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
	var toRet    = '__';
	
	if ( num >= 0 && num < 64*64 ) {
		var high = Math.floor( num / 64 );
		var low  = num % 64;
		
		toRet = charList.charAt(high) + charList.charAt(low)
	}
	
	return toRet
}

// intFormat
function intFormat (num) {
	var neg   = num < 0;
	var toFmt = Math.abs(Math.floor(num));
	var str   = '';
	
	while (toFmt) {
		str = ',' + (
			toFmt % 1000 >= 100
			? (toFmt % 1000)
			: (
				toFmt % 1000 >= 10
				? '0' + (toFmt % 1000)
				: '00' + (toFmt % 1000)
			)
		) + str;
		toFmt = Math.floor(toFmt / 1000);
	}
	
	while (str.substr(0, 1) == '0' || str.substr(0, 1) == ',') {
		str = str.substr(1);
	}
	
	var sym = (
		neg
		? '-'
		: ''
	);
	
	return sym + str;
}

// Specific functions for fade-out-move-up effect
function createUpFader (contents, x, y) {
	createUpFader(contents, x, y, {});
}
function createUpFader (contents, x, y, style) {
	var elem = new Element('div');
	elem.setStyle(style);
	document.body.appendChild(elem);
	elem.absolutize();
	elem.setStyle({
		width: 'auto',
		top:   y + 'px',
		left:  x + 'px',
	});
	elem.update(contents);
	
	var fps      = 24;
	var duration = 1000;
	
	var period = Math.round(1000 / fps);
	var cycles = Math.round((duration / 1000) * fps);
	
	for (i = 0; i < cycles; i ++) {
		setTimeout(function(e,op,ny){
			e.setStyle({
				top:     ny + 'px',
			}).setOpacity(op);
		}, period*i, elem, Math.min(1, 1.5 - 1.5*(i / cycles)), Math.round(y - 0.82*i));
	}
	
	setTimeout(function(elem){
		elem.remove();
	}, duration, elem);
	
}

function fnModDisplay ( fnOrig, type ) {
	var fighter = (
		unsafeWindow.db[type + 's'].length > 0
		? unsafeWindow.db[type + 's'][0]
		: null
	);

	fnOrig();
	
	if ( fighter !== null ) {
		var tmpDiv = (
			type == 'defender'
			? defTemplate
			: attTemplate
		)
		var nameHolder  = tmpDiv.nextSibling.select('.nameholder')[0];
		var avatarImage = tmpDiv.nextSibling.select('.avatarholder img')[0];
		nameHolder.update( nameHolder.innerHTML.substring( 1, nameHolder.innerHTML.length - 1 ).replace( / /g, '<span style="opacity:0">|</span>' ) );
		
		avatarImage.observe('mouseover', function (type, ev) {
			var offset = avatarImage.cumulativeOffset();
			var newX   = offset.left + (
				offset.left > 500
				? 52
				: -110
			);
			var newY   = offset.top  - 28;
			
			imgTooltip.update(
				(new Element('img')).setStyle({
					border: '1px solid black',
				}).writeAttribute('src', avatarImage.src.substr(0, avatarImage.src.length - 10) + '_100x100.jpg')
			);
			
			imgTooltip.setStyle({
				left: newX + 'px',
				top:  newY + 'px'
			});
			
			imgTooltip.show();
		});
		avatarImage.observe('mouseout', function (ev) {
			imgTooltip.hide();
		});
	}
}


// "Cookie" set
function setCookie (name, value) {
	setTimeout(function(a,b){
		GM_setValue(a, b);
	}, 0, 'eRIWU_' + name, JSON.stringify(value));
}

function getCookie (name) {
	return JSON.parse(GM_getValue('eRIWU_' + name, null));
}