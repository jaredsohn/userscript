// ==UserScript==
// @name           LandGrab large game color picker
// @namespace      lg_pick_large_game_colors
// @description    Automatically set the color selection to available colors
// @include        http://www.landgrab.net/landgrab/Registrar*
// @include        http://landgrab.net/landgrab/Registrar*
// @include        http://www.landgrab.net/landgrab/NewGame*
// @include        http://landgrab.net/landgrab/NewGame*
// ==/UserScript==
/**
 * A script to pick available colors in large LandGrab games
 * @author Jakub Caban <kuba.iluvatar@gmail.com>
 * @license Use it if you like it
 */
if(GM_getValue("user_color", false))
	window.addEventListener("load",function(){ChangeToMyColor()},true);

var oChild = document.getElementById("colorspan").parentNode.parentNode;
var oSave = CreateButtonWithTD("Save color", "Save selected color with ColorPicker");
oChild.insertBefore(oSave,oChild.lastChild);
oSave.addEventListener("click", function(){SetMyColor()},true);
var oReset = CreateButtonWithTD("Reset color", "Reset color saved with ColorPicker");
oChild.insertBefore(oReset,oChild.lastChild);
oReset.addEventListener("click", function(){ResetMyColor()},true);
var oRoll = CreateButtonWithTD("Pick color", "Pick random color with ColorPicker");
oChild.insertBefore(oRoll,oChild.lastChild);
oRoll.addEventListener("click", function(){RollColor()},true);
var oLast = CreateButtonWithTD("Last Resort Pick Color", "Find an available color in a large game -- may run for several minutes");
oChild.insertBefore(oLast, oChild.lastChild);
oLast.addEventListener("click", function(){LastResortColor()},true);

var oSel = document.getElementById("colorselect");
oSel.addEventListener("change", function(){ParseTable(this.value)},true);

function CreateButton(inside, title){
  var oTable = document.createElement("table");
  oTable.className = "button_table";
  oTable.style.display = "inline";
  oTable.style.verticalAlign = "center";
  var oRow = oTable.insertRow(0);
  var oL = oRow.insertCell(0);
  oL.className = "button_table_left";
  var oC = oRow.insertCell(1);
  oC.title = inside;
  oC.innerHTML = inside.toUpperCase();
  var oR = oRow.insertCell(2);
  oR.className = "button_table_right";
  return oTable;
}

function CreateButtonWithTD(inside, title){
  var oTd = document.createElement("td");
  oTd.appendChild(CreateButton(inside,title));
  return oTd;
}


function ChangeToMyColor(){
	var usedColors = new Array();
	var mycolor = GM_getValue("user_color");
  var mypat = 0;
  if(mycolor.split("@").length){
    mypat = parseInt(mycolor.split("@")[1]);
    mycolor = mycolor.split("@")[0];
  }
	var allColors = new Array("green", "silver", "teal", "aqua", "lime", "fuchsia",
		  "yellow", "pink", "purple", "red", "gold", "gray", "brown", "orange", "olive",
		  "tan","blue","black");
	var playerSelect = document.getElementById("colorselect");
	playerSelect.innerHTML = '';
	for (var ndx = 0; ndx < allColors.length; ndx++) {
		var nextColor = allColors[ndx];
		var newOption = new Option(nextColor);
		newOption.value = nextColor;
		newOption.style.background=nextColor;
		playerSelect.options[playerSelect.options.length] = newOption;
	}
	var newOption = document.createElement("option");
	newOption.innerHTML = "Custom (" + mycolor + ")";
	newOption.value = mycolor;
	newOption.selected = 'selected';
	newOption.style.background = mycolor;
	playerSelect.appendChild(newOption);
	document.getElementById('colorspan').style.backgroundColor = mycolor;
	
	var select = document.getElementById("colorselect");
	var span = document.getElementById("colorspan");
  var div = document.getElementById("my_background_img_div");
	var selcolor = select.value;
	document.getElementById('color_code').value = selcolor;
  document.getElementById('background_image_input').value = mypat;
	span.style.background = selcolor;
  div.style.backgroundColor = selcolor;
  if(mypat)
    div.style.backgroundImage = "url(images/terr_bgs/"+mypat+".png)";
  div.innerHTML = '&nbsp;';
}

function SetMyColor(){
	var oCode = document.getElementById('color_code').value;
  var iPat = document.getElementById('background_image_input').value;
	if(confirm("You sure you want set your default color to "+oCode+" with pattern #"+iPat+"?"))
		GM_setValue("user_color", oCode+"@"+iPat);
}

function ResetMyColor(){
	if(confirm("You sure want to delete your default color settings?"))
		GM_setValue("user_color", false);
}

function RollColor(){
	var UserColors = new Array();
	var aAr = document.getElementsByTagName('a');
	var toAr = [];
	var ext = /http:\/\/landgrab.net\/landgrab\/ViewStats\?u=(\d*)/;
	for(var i in aAr)
		if(typeof(aAr[i]) == 'object' && aAr[i].className == 'periwinkle' && ext.exec(aAr[i].href))
			toAr[toAr.length] = aAr[i];
	for(i in toAr){
		if(typeof(toAr[i]) == 'object'){
			var oEl = toAr[i];
			oEl = oEl.parentNode.nextSibling.nextSibling.childNodes[1];
			var Color = new RGBColor(oEl.style.backgroundColor);
			if(Color.ok){
				UserColors[UserColors.length] = Color;
			}
		}
	}
	for(i=0; i<1000; i++){
		var r = parseInt(256*Math.random());
		var g = parseInt(256*Math.random());
		var b = parseInt(256*Math.random());
		var k = 0;
		var l = 0;
           
		for(var j in UserColors){
			if(typeof(UserColors[j]) == 'object'){
				k++;
				if(CheckColor(UserColors[j], r, g, b))
					l++;
			}
		}
		if(k==l){
			var r = r.toString(16);
			var g = g.toString(16);
			var b = b.toString(16);
			if (r.length == 1) r = '0' + r;
			if (g.length == 1) g = '0' + g;
			if (b.length == 1) b = '0' + b;
			var Hex = '#'+r+g+b;
			ChangeToPickedColor(Hex);
       		        return(true);
		}

        }
	alert('No match in 1000 tries. Sorry.');
}

function LastResortColor(){
	var UserColors = new Array();
	var aAr = document.getElementsByTagName('a');
	var toAr = [];
	var ext = /http:\/\/landgrab.net\/landgrab\/ViewStats\?u=(\d*)/;
	for(var i in aAr)
		if(typeof(aAr[i]) == 'object' && aAr[i].className == 'periwinkle' && ext.exec(aAr[i].href))
			toAr[toAr.length] = aAr[i];
	for(i in toAr){
		if(typeof(toAr[i]) == 'object'){
			var oEl = toAr[i];
			oEl = oEl.parentNode.nextSibling.nextSibling.childNodes[1];
			var Color = new RGBColor(oEl.style.backgroundColor);
			if(Color.ok){
				UserColors[UserColors.length] = Color;
			}
		}
	}
	//for(i=0; i<1000; i++){
        for(t=0; t<255; t++) {
          for(u=0;u<255;u++) {
            for(v=0;v<255;v++) {
		//var r = parseInt(256*Math.random());
		//var g = parseInt(256*Math.random());
		//var b = parseInt(256*Math.random());
		var r = parseInt(t);
		var g = parseInt(u);
		var b = parseInt(v);
		var k = 0;
		var l = 0;
                var m = 0;
		for(var j in UserColors){
			if(typeof(UserColors[j]) == 'object'){
				k++;
				if(CheckColor(UserColors[j], r, g, b))
					l++;
			}
		}
		if(k==l){
			var r = r.toString(16);
			var g = g.toString(16);
			var b = b.toString(16);
			if (r.length == 1) r = '0' + r;
			if (g.length == 1) g = '0' + g;
			if (b.length == 1) b = '0' + b;
			var Hex = '#'+r+g+b;
			ChangeToPickedColor(Hex);
		        return(true);
		}
	}
        }
        }
        //}
 
	alert('No available colors. Sorry.');
}

function CheckColor(oColor, r, g, b){
	if(oColor.r+50>r && oColor.r-50<r && oColor.g+50>g && oColor.g-50<g && oColor.b+50>b && oColor.b-50<b)
		return(false);
	return(true);
}

function AddAvailableColorToColorSelect(Hex){
	var usedColors = new Array();

	var playerSelect = document.getElementById("colorselect");
	var newOption = document.createElement("option");
	newOption.innerHTML = "Picked (" + Hex + ")";
	newOption.value = Hex;
	//newOption.selected = 'selected';
	newOption.style.background = Hex;
	playerSelect.appendChild(newOption);
	//document.getElementById('colorspan').style.backgroundColor = Hex;
	
	//var select = document.getElementById("colorselect");
	//var span = document.getElementById("colorspan");
  //var div = document.getElementById("my_background_img_div");
	//var selcolor = select.value;
	//document.getElementById('color_code').value = selcolor;
	//span.style.background = selcolor;
  //div.style.backgroundColor = selcolor;
  //ParseTable(selcolor);
}

function ChangeToPickedColor(Hex){
	var usedColors = new Array();

	var playerSelect = document.getElementById("colorselect");
	var newOption = document.createElement("option");
	newOption.innerHTML = "Picked (" + Hex + ")";
	newOption.value = Hex;
	newOption.selected = 'selected';
	newOption.style.background = Hex;
	playerSelect.appendChild(newOption);
	document.getElementById('colorspan').style.backgroundColor = Hex;
	
	var select = document.getElementById("colorselect");
	var span = document.getElementById("colorspan");
  var div = document.getElementById("my_background_img_div");
	var selcolor = select.value;
	document.getElementById('color_code').value = selcolor;
	span.style.background = selcolor;
  div.style.backgroundColor = selcolor;
  ParseTable(selcolor);
}

function ParseTable(selcolor){
  var oT = document.getElementById("background_pattern_picker_table");
  if(!oT) return false;
  for(var i=0; i<oT.rows.length;i++){
    var oR = oT.rows[i];
    for(var j=0;j<oR.cells.length;j++)
      oR.cells[j].style.backgroundColor = selcolor;
  }
}

/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string){
	this.ok = false;

	if (color_string.charAt(0) == '#'){
		color_string = color_string.substr(1,6);
	}

	color_string = color_string.replace(/ /g,'');
	color_string = color_string.toLowerCase();

	var simple_colors = {
		aliceblue: 'f0f8ff',
		antiquewhite: 'faebd7',
		aqua: '00ffff',
		aquamarine: '7fffd4',
		azure: 'f0ffff',
		beige: 'f5f5dc',
		bisque: 'ffe4c4',
		black: '000000',
		blanchedalmond: 'ffebcd',
		blue: '0000ff',
		blueviolet: '8a2be2',
		brown: 'a52a2a',
		burlywood: 'deb887',
		cadetblue: '5f9ea0',
		chartreuse: '7fff00',
		chocolate: 'd2691e',
		coral: 'ff7f50',
		cornflowerblue: '6495ed',
		cornsilk: 'fff8dc',
		crimson: 'dc143c',
		cyan: '00ffff',
		darkblue: '00008b',
		darkcyan: '008b8b',
		darkgoldenrod: 'b8860b',
		darkgray: 'a9a9a9',
		darkgreen: '006400',
		darkkhaki: 'bdb76b',
		darkmagenta: '8b008b',
		darkolivegreen: '556b2f',
		darkorange: 'ff8c00',
		darkorchid: '9932cc',
		darkred: '8b0000',
		darksalmon: 'e9967a',
		darkseagreen: '8fbc8f',
		darkslateblue: '483d8b',
		darkslategray: '2f4f4f',
		darkturquoise: '00ced1',
		darkviolet: '9400d3',
		deeppink: 'ff1493',
		deepskyblue: '00bfff',
		dimgray: '696969',
		dodgerblue: '1e90ff',
		feldspar: 'd19275',
		firebrick: 'b22222',
		floralwhite: 'fffaf0',
		forestgreen: '228b22',
		fuchsia: 'ff00ff',
		gainsboro: 'dcdcdc',
		ghostwhite: 'f8f8ff',
		gold: 'ffd700',
		goldenrod: 'daa520',
		gray: '808080',
		green: '008000',
		greenyellow: 'adff2f',
		honeydew: 'f0fff0',
		hotpink: 'ff69b4',
		indianred : 'cd5c5c',
		indigo : '4b0082',
		ivory: 'fffff0',
		khaki: 'f0e68c',
		lavender: 'e6e6fa',
		lavenderblush: 'fff0f5',
		lawngreen: '7cfc00',
		lemonchiffon: 'fffacd',
		lightblue: 'add8e6',
		lightcoral: 'f08080',
		lightcyan: 'e0ffff',
		lightgoldenrodyellow: 'fafad2',
		lightgrey: 'd3d3d3',
		lightgreen: '90ee90',
		lightpink: 'ffb6c1',
		lightsalmon: 'ffa07a',
		lightseagreen: '20b2aa',
		lightskyblue: '87cefa',
		lightslateblue: '8470ff',
		lightslategray: '778899',
		lightsteelblue: 'b0c4de',
		lightyellow: 'ffffe0',
		lime: '00ff00',
		limegreen: '32cd32',
		linen: 'faf0e6',
		magenta: 'ff00ff',
		maroon: '800000',
		mediumaquamarine: '66cdaa',
		mediumblue: '0000cd',
		mediumorchid: 'ba55d3',
		mediumpurple: '9370d8',
		mediumseagreen: '3cb371',
		mediumslateblue: '7b68ee',
		mediumspringgreen: '00fa9a',
		mediumturquoise: '48d1cc',
		mediumvioletred: 'c71585',
		midnightblue: '191970',
		mintcream: 'f5fffa',
		mistyrose: 'ffe4e1',
		moccasin: 'ffe4b5',
		navajowhite: 'ffdead',
		navy: '000080',
		oldlace: 'fdf5e6',
		olive: '808000',
		olivedrab: '6b8e23',
		orange: 'ffa500',
		orangered: 'ff4500',
		orchid: 'da70d6',
		palegoldenrod: 'eee8aa',
		palegreen: '98fb98',
		paleturquoise: 'afeeee',
		palevioletred: 'd87093',
		papayawhip: 'ffefd5',
		peachpuff: 'ffdab9',
		peru: 'cd853f',
		pink: 'ffc0cb',
		plum: 'dda0dd',
		powderblue: 'b0e0e6',
		purple: '800080',
		red: 'ff0000',
		rosybrown: 'bc8f8f',
		royalblue: '4169e1',
		saddlebrown: '8b4513',
		salmon: 'fa8072',
		sandybrown: 'f4a460',
		seagreen: '2e8b57',
		seashell: 'fff5ee',
		sienna: 'a0522d',
		silver: 'c0c0c0',
		skyblue: '87ceeb',
		slateblue: '6a5acd',
		slategray: '708090',
		snow: 'fffafa',
		springgreen: '00ff7f',
		steelblue: '4682b4',
		tan: 'd2b48c',
		teal: '008080',
		thistle: 'd8bfd8',
		tomato: 'ff6347',
		turquoise: '40e0d0',
		violet: 'ee82ee',
		violetred: 'd02090',
		wheat: 'f5deb3',
		white: 'ffffff',
		whitesmoke: 'f5f5f5',
		yellow: 'ffff00',
		yellowgreen: '9acd32'
	};
	for (var key in simple_colors) {
		if (color_string == key) {
			color_string = simple_colors[key];
		}
	}

	var color_defs = [
		{
			re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
			example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
			process: function (bits){
				return [
					parseInt(bits[1]),
					parseInt(bits[2]),
					parseInt(bits[3])
				];
			}
		},
		{
			re: /^(\w{2})(\w{2})(\w{2})$/,
			example: ['#00ff00', '336699'],
			process: function (bits){
				return [
					parseInt(bits[1], 16),
					parseInt(bits[2], 16),
					parseInt(bits[3], 16)
				];
			}
		},
		{
			re: /^(\w{1})(\w{1})(\w{1})$/,
			example: ['#fb0', 'f0f'],
			process: function (bits){
				return [
					parseInt(bits[1] + bits[1], 16),
					parseInt(bits[2] + bits[2], 16),
					parseInt(bits[3] + bits[3], 16)
				];
			}
		}
	];

	for (var i = 0; i < color_defs.length; i++) {
		var re = color_defs[i].re;
		var processor = color_defs[i].process;
		var bits = re.exec(color_string);
		if (bits) {
			channels = processor(bits);
			this.r = channels[0];
			this.g = channels[1];
			this.b = channels[2];
			this.ok = true;
		}
	}

	this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
	this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
	this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

	this.toRGB = function () {
		return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
	}
	this.toHex = function () {
		var r = this.r.toString(16);
		var g = this.g.toString(16);
		var b = this.b.toString(16);
		if (r.length == 1) r = '0' + r;
		if (g.length == 1) g = '0' + g;
		if (b.length == 1) b = '0' + b;
		return '#' + r + g + b;
	}
}