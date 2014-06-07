// ==UserScript==
// @name Syrnia Forum Focus
// @author Veridis
// @namespace http://www.veridis.com/Syrnia/ForumFocus
// @description Allows the colouring of the last 30 replies and blocking of categories.
// @license Creative Commons Attribution License
// @version 1.3
// @include http://*syrnia.com/theGame/mainincludes/forum.php*
// @include http://*syrnia.com/theGame/includes2/options.php*
// @released 2009-01-17
// @updated 2009-01-24
// @compatible Greasemonkey
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js
// @require http://tablesorter.com/jquery.tablesorter.min.js
// ==/UserScript==

// Our Constants

const VERSION = '1.3';
const DEBUG = false;
const Q = jQuery.noConflict();
if (DEBUG) {
	unsafeWindow.Q = Q;
}
const PATH = window.location.pathname + window.location.search;
const DEFAULT_SETTINGS = {
	tableSort: true,
	styles: [{
		title: 'Links',
		selector: '.forum_category a',
		css: {
			'background': 'inherit',
			'color': 'inherit'
		}
	}, {
		title: 'Default',
		selector: '.forum_category',
		css: {
			'color': '#000000',
		}
	}, {
		title: 'Announcments',
		selector: '.forum_category_13440',
		css: {
			'background': '#f17b55'
		}
	}, {
		title: 'General',
		selector: '.forum_category_40',
		css: {
			'background': '#277dac'
		}
	}, {
		title: 'Market',
		selector: '.forum_category_39',
		css: {
			'background': '#f49f22'
		}
	}, {
		title: 'Feedback',
		selector: '.forum_category_37',
		css: {
			'background': '#556799'
		}
	}, {
		title: 'Clans',
		selector: '.forum_category_38',
		css: {
			'background': '#ce4d50'
		}
	}, {
		title: 'Help',
		selector: '.forum_category_303',
		css: {
			'background': '#edd101'
		}
	}, {
		title: 'Contests',
		selector: '.forum_category_346',
		css: {
			'background': '#74a144'
		}
	}, {
		title: 'Off Topic',
		selector: '.forum_category_41',
		css: {
			'background': '#5fa9cd'
		}
	}]
};

const OPTIONS_CSS = ''+<><![CDATA[
#options{
	margin:auto;
}
input[type="checkbox"], label{
	display:block;
	margin:auto;
}
#outer_styles {
	width:60%;
	text-align:right;
	float:left;
}
#styles {
	float:right;
	margin: 10px !important;
}
#outer_color_picker {
	width:40%;
	text-align:left;
	float:right;
}
#color_picker {
	padding: 10px !important;
	margin: 10px !important;
	border: 1px solid #AAAAAA;
	float:left;
}
#swatch, #red, #green, #blue {
	border: 1px solid #AAAAAA;
	-moz-border-radius: 4px;
}
#red, #green, #blue {
	float: left;
	width: 24px;
	margin: 6px;
}
#swatch {
	float:right;
	width: 120px;
	height: 100px;
	background:#fff;
	margin:6px;
}
#red.ui-slider { background: #ef2929; }
#red .ui-slider-handle { border-color: #ef2929; }
#green.ui-slider { background: #8ae234; }
#green .ui-slider-handle { border-color: #8ae234; }
#blue.ui-slider { background: #729fcf; }
#blue .ui-slider-handle { border-color: #729fcf; }
.ui-slider { 
	width: 24px; 
	height: 255px; 
	position: relative;
	float:left;
}
.ui-slider-handle {
	position: absolute; 
	z-index: 1; 
	height: 12px; 
	width: 28px;
	top: 0px;
	left: 0px;
	background:#fff;
	left:-2px;
	-moz-border-radius: 4px;
}
.ui-slider-handle-active {
	
}
.ui-slider-disabled .ui-slider-handle {
	opacity: 0.5;
}
.ui-slider-range {
	position: absolute;
	background: #50A029;
	opacity: 0.3;
	width: 100%; height: 100%;
}
.clear{
	clear:both;
}
]]></>;


const FORUM_CSS = ''+<><![CDATA[

]]></>;

const COLORS = {
	'f0f8ff':'aliceblue',
	'faebd7':'antiquewhite',
	'00ffff':'aqua',
	'7fffd4':'aquamarine',
	'f0ffff':'azure',
	'f5f5dc':'beige',
	'ffe4c4':'bisque',
	'000000':'black',
	'ffebcd':'blanchedalmond',
	'0000ff':'blue',
	'8a2be2':'blueviolet',
	'a52a2a':'brown',
	'deb887':'burlywood',
	'5f9ea0':'cadetblue',
	'7fff00':'chartreuse',
	'd2691e':'chocolate',
	'ff7f50':'coral',
	'6495ed':'cornflowerblue',
	'fff8dc':'cornsilk',
	'dc143c':'crimson',
	'00ffff':'cyan',
	'00008b':'darkblue',
	'008b8b':'darkcyan',
	'b8860b':'darkgoldenrod',
	'a9a9a9':'darkgray',
	'006400':'darkgreen',
	'a9a9a9':'darkgrey',
	'bdb76b':'darkkhaki',
	'8b008b':'darkmagenta',
	'556b2f':'darkolivegreen',
	'ff8c00':'darkorange',
	'9932cc':'darkorchid',
	'8b0000':'darkred',
	'e9967a':'darksalmon',
	'8fbc8f':'darkseagreen',
	'483d8b':'darkslateblue',
	'2f4f4f':'darkslategray',
	'2f4f4f':'darkslategrey',
	'00ced1':'darkturquoise',
	'9400d3':'darkviolet',
	'ff1493':'deeppink',
	'00bfff':'deepskyblue',
	'696969':'dimgray',
	'696969':'dimgrey',
	'1e90ff':'dodgerblue',
	'b22222':'firebrick',
	'fffaf0':'floralwhite',
	'228b22':'forestgreen',
	'ff00ff':'fuchsia',
	'dcdcdc':'gainsboro',
	'f8f8ff':'ghostwhite',
	'ffd700':'gold',
	'daa520':'goldenrod',
	'808080':'gray',
	'008000':'green',
	'adff2f':'greenyellow',
	'808080':'grey',
	'f0fff0':'honeydew',
	'ff69b4':'hotpink',
	'cd5c5c':'indianred',
	'4b0082':'indigo',
	'fffff0':'ivory',
	'f0e68c':'khaki',
	'e6e6fa':'lavender',
	'fff0f5':'lavenderblush',
	'7cfc00':'lawngreen',
	'fffacd':'lemonchiffon',
	'add8e6':'lightblue',
	'f08080':'lightcoral',
	'e0ffff':'lightcyan',
	'fafad2':'lightgoldenrodyellow',
	'd3d3d3':'lightgray',
	'90ee90':'lightgreen',
	'd3d3d3':'lightgrey',
	'ffb6c1':'lightpink',
	'ffa07a':'lightsalmon',
	'20b2aa':'lightseagreen',
	'87cefa':'lightskyblue',
	'778899':'lightslategray',
	'778899':'lightslategrey',
	'b0c4de':'lightsteelblue',
	'ffffe0':'lightyellow',
	'00ff00':'lime',
	'32cd32':'limegreen',
	'faf0e6':'linen',
	'ff00ff':'magenta',
	'800000':'maroon',
	'66cdaa':'mediumaquamarine',
	'0000cd':'mediumblue',
	'ba55d3':'mediumorchid',
	'9370db':'mediumpurple',
	'3cb371':'mediumseagreen',
	'7b68ee':'mediumslateblue',
	'00fa9a':'mediumspringgreen',
	'48d1cc':'mediumturquoise',
	'c71585':'mediumvioletred',
	'191970':'midnightblue',
	'f5fffa':'mintcream',
	'ffe4e1':'mistyrose',
	'ffe4b5':'moccasin',
	'ffdead':'navajowhite',
	'000080':'navy',
	'fdf5e6':'oldlace',
	'808000':'olive',
	'6b8e23':'olivedrab',
	'ffa500':'orange',
	'ff4500':'orangered',
	'da70d6':'orchid',
	'eee8aa':'palegoldenrod',
	'98fb98':'palegreen',
	'afeeee':'paleturquoise',
	'db7093':'palevioletred',
	'ffefd5':'papayawhip',
	'ffdab9':'peachpuff',
	'cd853f':'peru',
	'ffc0cb':'pink',
	'dda0dd':'plum',
	'b0e0e6':'powderblue',
	'800080':'purple',
	'ff0000':'red',
	'bc8f8f':'rosybrown',
	'4169e1':'royalblue',
	'8b4513':'saddlebrown',
	'fa8072':'salmon',
	'f4a460':'sandybrown',
	'2e8b57':'seagreen',
	'fff5ee':'seashell',
	'a0522d':'sienna',
	'c0c0c0':'silver',
	'87ceeb':'skyblue',
	'6a5acd':'slateblue',
	'708090':'slategray',
	'fffafa':'snow',
	'00ff7f':'springgreen',
	'4682b4':'steelblue',
	'd2b48c':'tan',
	'008080':'teal',
	'd8bfd8':'thistle',
	'ff6347':'tomato',
	'40e0d0':'turquoise',
	'ee82ee':'violet',
	'f5deb3':'wheat',
	'ffffff':'white',
	'f5f5f5':'whitesmoke',
	'ffff00':'yellow',
	'9acd32':'yellowgreen'
};

// Initalization

var init = function(){
	
	//If it's a new install, upgrade or downgrade
	if ((VERSION !== GM_getValue('version')) && !GM_getValue('disabled')) {
		install();
	}
	
	//If it's disabled
	if (GM_getValue('disabled') === true) {
		return;
	}
	
	settings = eval(GM_getValue('settings'));
	
	//Decide what to do
	
	if (/includes2\/options\.php/.test(PATH)) {
		optionsMenu();
	}
	
	if (PATH === '/theGame/includes2/options.php?p=forum') {
		options();
	}
	else if (PATH === '/theGame/mainincludes/forum.php?pop=yes') {
		addClasses();
		addStyle();
		lastPost();
	}
	else if (/action=viewcat&cat=/.test(PATH)) {
		addClasses();
		addStyle();
		lastPost();
	}
	else if ( /&lastpost=true/.test(PATH) ) {
		goToLastPage();
	}
	else if ( /&scroll=true/.test(PATH) ) {
		scrollDown();
	}
};

var install = function(){
	currentVersion = GM_getValue('version');
	
	//new Install
	if (!currentVersion) {
		GM_setValue('settings', uneval(DEFAULT_SETTINGS));
		GM_setValue('disabled', false);
		alert('Installed. Default settings applied.')
	}
	//upgrade
	else if (currentVersion < VERSION) {
		Q.extend(DEFAULT_SETTINGS, eval(GM_getValue('settings')));
		GM_setValue('settings', uneval(DEFAULT_SETTINGS));
		GM_setValue('disabled', false);
		alert('Script upgraded.');
	}
	//downgrade
	else if (currentVersion > VERSION) {
		alert("please don't downgrade. Script disabled.");
		GM_setValue('disabled', true);
		return;
	}
	
	GM_setValue('version', VERSION)
}

var addClasses = function(){
	Q('table:last tr').each(
		function(i) {
			var href = Q('a',this).attr('href');
			var category = /cat=(\d+)/.exec(href);
			
			if (!category) {
				return;
			}
			
			Q(this)
				.addClass('forum_category')
				.addClass('forum_category_' + category[1]);
		}
	);
}

var lastPost = function(){
	
	Q('.forum_category').each(
		function(i){
			var link = Q('a',this);
			newLink = <span><a href={link.attr('href') + '&lastpost=true'} class="last_post">last post</a></span>;
			link.after(''+newLink);
		}
	);
}

var goToLastPage = function(){

	var newURL = Q('font[color=white]')
		.parent('b')
		.children('a:last')
		.attr('href');
		
	newURL ? location.replace('http://www.syrnia.com/theGame/mainincludes/' + newURL + '&scroll=true' ) : scrollDown();
}

var scrollDown = function(){
	window.scroll(0, 9999);
}

var options = function(){
	var table = <table id="styles">
		<thead>
			<tr>
				<th>Category</th>
				<th>Colour</th>
				<th>Background</th>
				<th>Hidden</th>
			</tr>
		</thead>
		<tbody/>
	</table>;
	var colorPicker = <div id="color_picker">
			<div id="swatch"></div>
			<div id="red"></div>
			<div id="green"></div>
			<div id="blue"></div>
			<div class="clear"></div>
		</div>;

	for (s in settings.styles) if (settings.styles.hasOwnProperty(s)) {

		//log('title: ' + settings.styles[s].title);
		
		var color = settings.styles[s].css.color || '';
		var background = settings.styles[s].css.background || '';
		var checked = settings.styles[s].css.display === 'none' ? true : false;
		var title = settings.styles[s].title;
		
		
		var tr = 
		<tr id={s} class="style">
			<td id={s+'_title'}>{title}</td>
			<td>
				<input id={s+'_color'} name={s+'_color'} value={color} />
			</td>
			<td>
				<input id={s+'_background'} name={s+'_background'} value={background} />
			</td>
			<td>
				<label for={s+'_display'}>
					{checked ? <input type="checkbox" id={s+'_display'} name={s+'_display'} checked="checked" value="none" />:<input type="checkbox" id={s+'_display'} name={s+'_display'} value="none" />}
				</label>
			</td>
		</tr>;
		
		table.tbody = tr + table.tbody;
	}
	div = Q(''+<div id="options"><div id="outer_color_picker">{colorPicker}</div> <div id="outer_styles">{table}</div><div class="clear" /></div>);
	
	Q('input', div).bind('change', optionsColouring);
	Q('input', div).bind('focus', colorSwatch);
	
	Q(Q('table')[1]).after(div);
	
	optionsColouring();

	sliders = Q('#red, #green, #blue').slider({
    	axis: 'vertical',
		max: 255,
		slide: refreshSwatch,
		change:	refreshSwatch
	});
	
	GM_addStyle(OPTIONS_CSS);
	
	if (window.outerWidth < 800) {
		window.resizeTo(800, window.outerHeight)
	}
};

var optionsMenu = function(){

	var optionNavigation = Q('ul')[0]
	Q(optionNavigation).append('<li><a href="options.php?p=forum">Forum Options</a><br/></li>');
	
};

var optionsColouring = function(){
	Q('#styles tbody tr').each(function(){

		var id = this.id
		var color = Q('#' + id + '_color').val();
		var background = Q('#' + id + '_background').val();
		var display = Q('#' + id + '_display:checked').val();
		
		settings.styles[id].css.color = color;
		settings.styles[id].css.background = background;
		settings.styles[id].css.display = display;
		
		Q(this).css(settings.styles[id].css);
		
		Q(this).css({
			'display': 'table-row',
			'opacity': (display === 'none' ? '0.3' : '1')
		});
	});
	
	GM_setValue('settings', uneval(settings));
};

var addStyle = function(){

	var CSS = '';
	
	for (s in settings.styles) 
		if (settings.styles.hasOwnProperty(s)) {
			CSS += settings.styles[s].selector + ' { '
			
			for (p in settings.styles[s].css) if (settings.styles[s].css.hasOwnProperty(p)) {
				CSS += p + ':' + settings.styles[s].css[p] + ' !important;'
			}
			
			CSS += '}';
		}
	GM_addStyle(FORUM_CSS);
	GM_addStyle(CSS);
};

var log = function(msg){
	if (DEBUG !== true) {
		return;
	}
	(unsafeWindow.console && unsafeWindow.console.log(msg)) || alert(msg);
	(unsafeWindow.msgs && unsafeWindow.msgs.push(msg)) || (unsafeWindow.msgs = [msg]);
};

var colorFromRGB = function(r, g, b) {
	var hex = [
		r.toString(16),
		g.toString(16),
		b.toString(16)
	];
	Q.each(hex, function (nr, val) {
		if (val.length == 1) {
			hex[nr] = '0' + val;
		}
	});
	
	
	hex = hex.join('');
	
	return COLORS[hex] || '#'+hex.toUpperCase();
}

var RGBFromColor = function(color) {
	if (color.indexOf('#') != -1) {
		hex = color.substr(1);
		return rgb = [
			parseInt(hex.substr(0,2),16),
			parseInt(hex.substr(2,2),16),
			parseInt(hex.substr(4,2),16)
		];
	}
	for (c in COLORS) if (COLORS[c] === color) {
		return RGBFromColor('#'+c);
	}
}

var refreshSwatch = function(e, ui) {
	var red = 255 - Q(sliders[0]).slider("value"),
		green = 255 - Q(sliders[1]).slider("value"),
		blue = 255 - Q(sliders[2]).slider("value"),
		color = colorFromRGB(red, green, blue);
	
	var swatch = Q('#swatch');
	swatch.css('background-color', color);
	Q('#'+swatch.attr('for')).val(color);
	optionsColouring();
}

var colorSwatch = function(e) {
	var color = e.target.value;
	var input = e.target.id;
	var rgb = RGBFromColor(color);
	
	Q('#swatch').attr('for',input);
	
	Q(sliders[0]).slider('moveTo', 255 - rgb[0]);
	Q(sliders[1]).slider('moveTo', 255 - rgb[1]);
	Q(sliders[2]).slider('moveTo', 255 - rgb[2]);
}

init();