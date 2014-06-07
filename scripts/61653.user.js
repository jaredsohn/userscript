// ==UserScript==
// @name           Google Maps Longitude & Latitude
// @namespace      http://userscripts.org/users/71721
// @description    Shows Longitude and Latitude for centre of google maps.
// @include        http://maps.google.tld/*
// ==/UserScript==


//Menu commands
GM_registerMenuCommand("GMaps: Get-Coords", getcoords);
GM_registerMenuCommand("GMaps: Toggle Target", toggle_tgt);
GM_registerMenuCommand("GMaps: Coord Format", coord_format);

minlen = 2;

// Set up the properties of the target Div
var tgt = unsafeWindow.document.createElement('div');
tgt.setAttribute('style', 'border: 1px solid red; background-color: \
					#FF6666; position: absolute; top: 49.5%; left: 49.5%; \
					height: 1%; width: 1%; opacity: 0.3;');
tgt.id="tgt";

var format_string = (GM_getValue('frmt_strng','<deg_base>° <min_base>\' <sec_05>" <point>'));

//Check whether target was previously set to display
if (GM_getValue('show_target', false)) {
	add_tgt();
}


function getcoords() {
	coord=[unsafeWindow.window.gApplication.getMap().getCenter().lat(),unsafeWindow.window.gApplication.getMap().getCenter().lng()];
	output=['',''];
	for(x in [0,1]){
		sign=((coord[x]<0)?'-':'');
		if (sign=='-') {
			coord[x]*=-1;
		}
		deg=zeropad((coord[x]));
		deg_base=zeropad(Math.floor(coord[x]));

		min=zeropad((coord[x]-deg_base)*60);
		min_base=zeropad(Math.floor(min));

		sec=zeropad((min - min_base)*60);
		sec_base=zeropad(Math.floor(sec));

		point=(x==0?((sign=='-')?'S':'N') : ((sign=='-')?'W':'E'));

		for (var i = 0; i < 11; i++) {
			eval_str = "sec_"+zeropad(i,minlen)+"=zeropad(Math.round(sec*Math.pow(10,"+i+"))/Math.pow(10,"+i+"));";
			eval(eval_str);
			eval_str = "min_"+zeropad(i,minlen)+"=zeropad(Math.round(min*Math.pow(10,"+i+"))/Math.pow(10,"+i+"));";
			eval(eval_str);
			eval_str = "deg_"+zeropad(i,minlen)+"=zeropad(Math.round(deg*Math.pow(10,"+i+"))/Math.pow(10,"+i+"));";
			eval(eval_str);
		}

		disp_str = format_string.replace(/'/g, "\\'");
		disp_str = disp_str.replace(/</g, "' +");
		disp_str = disp_str.replace(/>/g, "+ '");
		disp_str = "'" +disp_str+ "'";
		disp_str = disp_str.replace(/^'' \+/, "");
		disp_str = disp_str.replace(/\+ ''$/, "");

		disp_str = eval(disp_str);
		
		output[x] = disp_str;
	}
		alert('Coordinates:\n\nLat:\t\t' +output[0]+ '\nLong:\t' +output[1]);
}

function add_tgt() {
	void(document.getElementById('map').appendChild(tgt));
	var tgt_var = document.getElementById('tgt');
	tgt_var.addEventListener('click', getcoords, true);
	tgt_var.addEventListener('mouseover', enlarge_tgt, true);
	tgt_var.addEventListener('mouseout', shrink_tgt, true);
}

function toggle_tgt() {
	if (document.getElementById('tgt') != null) {
		void(document.getElementById('map').removeChild(tgt));
		GM_setValue('show_target', false);
	}
	else {
		add_tgt();
		GM_setValue('show_target', true);
	}
}
	
	
function enlarge_tgt() {

	void(document.getElementById('map').removeChild(tgt));

	tgt.setAttribute('style', 'border: 1px solid red; background-color: \
					#FF6666; position: absolute; top: 48.5%; left: 48.5%; \
					height: 3%; width: 3%; opacity: 0.7;');
	tgt.id="tgt";
	
	void(document.getElementById('map').appendChild(tgt));
}
	
function shrink_tgt() {
	void(document.getElementById('map').removeChild(tgt));

	tgt.setAttribute('style', 'border: 1px solid red; background-color: \
					#FF6666; position: absolute; top: 49.5%; left: 49.5%; \
					height: 1%; width: 1%; opacity: 0.3;');
	tgt.id="tgt";
	
	void(document.getElementById('map').appendChild(tgt));
}

function coord_format() {
	format_string = prompt('Format string', format_string);
	GM_setValue('frmt_strng', format_string);
}


function zeropad(num,count){
count=(count==undefined?minlen:count);
num=(num==undefined?0:num);
i = String(Math.floor(num)).length;
pad = '';

while(i < count) {
	pad += '0';
	i++;
	}

pad += num;
return pad;
}