// ==UserScript==
// @name        Full Frame (35m) Equiv. Focal Length for Flickr
// @description Displays crop factor, 35mm equivalent & angular field of view on Flickr EXIF meta info pages.
// @version     1.13
// @namespace   http://www.flickr.com/services/apps/by/tarmo888
// @include     http://www.flickr.com/*/*/meta*
// ==/UserScript==

(function() {
var loc = new String(window.location);
if (window.location.host != 'www.flickr.com' || loc.match('/meta') != '/meta') {
	/*alert('This works only on Flickr Photo Meta page');*/
}
else {
var t_fl = ['Focal Length', 'Brennweite', 'Lente', 'Longueur focale', 'Distância focal', '焦距', '초점거리', 'Tiêu cự', 'Jarak Fokus'];
var t_fl35 = ['Focal Length (35mm format)', 'Focal Length In35mm Format', 'Focal Length In 35mm Film'];
var t_fpd = 'Focal Plane Diagonal';
var t_fpxs = 'Focal Plane XSize';
var t_fpys = 'Focal Plane YSize';
var t_fpxr = ['Focal Plane X-Resolution', 'Focal Plane XResolution'];
var t_fpyr = ['Focal Plane Y-Resolution', 'Focal Plane YResolution'];
var t_fpru = 'Focal Plane Resolution Unit';
var t_width = ['Sensor Width', 'Image Width', 'Exif Image Width', 'Related Image Width'];
var t_height = ['Sensor Height', 'Image Height', 'Exif Image Height', 'Related Image Height'];
var t_ztw = 'Zoom Target Width';
var t_zsw = 'Zoom Source Width';
var x_fl; var x_fov;
var c_w = 36; var c_h = 24; var c_fpd35 = Math.sqrt(c_w*c_w+c_h*c_h);
var v_fl; var v_fl35; var v_fpd; var v_fpxs; var v_fpys; var v_fpxr; var v_fpyr; var v_fpru; var v_width; var v_height; var v_ztw; var v_zsw;
var rows = document.getElementsByTagName('tr');
for (var row = 0; row < rows.length; row++) {
	if (!rows[row].childNodes) {continue;}
	if (rows[row].childNodes.length != 5 ) {continue;}
	var lbl = getText(rows[row].childNodes[1]);
	if (!v_fl && t_fl.indexOf(lbl)>=0) {
		v_fl = parseFloat(getText(rows[row].childNodes[3]));
		x_fl = rows[row];
		x_fov = x_fl.parentNode.insertRow(row-1);
		var new_th = document.createElement('th');
		new_th.innerHTML = 'Angular Field of View';
		x_fov.appendChild(new_th);
		x_fov.insertCell(1).innerHTML = 'unknown';
	}
	if (!v_fl35 && t_fl35.indexOf(lbl)>=0) {v_fl35 = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_fpd && lbl == t_fpd) {v_fpd = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_fpxs && lbl == t_fpxs) {v_fpxs = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_fpys && lbl == t_fpys) {v_fpys = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_fpxr && t_fpxr.indexOf(lbl)>=0) {v_fpxr = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_fpyr && t_fpyr.indexOf(lbl)>=0) {v_fpyr = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_fpru && lbl == t_fpru) {v_fpru = getText(rows[row].childNodes[3]);}
	if (!v_width && t_width.indexOf(lbl)>=0) {v_width = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_height && t_height.indexOf(lbl)>=0) {v_height = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_ztw && lbl == t_ztw) {v_ztw = parseFloat(getText(rows[row].childNodes[3]));}
	if (!v_zsw && lbl == t_zsw) {v_zsw = parseFloat(getText(rows[row].childNodes[3]));}
}
if (!x_fl || !x_fov) {
	/*alert('unable to write');*/
}
else {
if (v_fl35 && v_fl) {
	x_fl.childNodes[3].innerHTML += '<b> * '+ Math.round(v_fl35/v_fl*10)/10 +' is '+ v_fl35 +'mm</b>';
	var fov = calcAFOV(v_fl35, c_w, c_h, c_fpd35);
	x_fov.childNodes[1].innerHTML = '<b>'+ fov[0] +'° / '+ fov[1] +'° / '+ fov[2] +'°</b>';
}
else if (v_fl) {
	var cf;
	var message;
	if (v_fpd) {
		cf = cfbydiagonal(c_fpd35, v_fpd);
		message = 'diagonal';
	}
	else if (v_fpxs && v_fpys && v_width && v_height && v_fpxr && v_fpyr) {
		var resized = check_resize(v_width, v_height, v_ztw, v_zsw);
		cf = cfbyresolution(c_fpd35, v_width*resized, v_height*resized, v_fpxr, v_fpyr, v_fpru);
		message = ((resized>1) ? 'corrected ': '') +'resolution (over size)';
		if (cf < 1) {
			cf = cfbysize(c_fpd35, v_fpxs, v_fpys);
			message = 'size (over resolution)';
		}
	}
	else if (v_width && v_height && v_fpxr && v_fpyr) {
		var resized = check_resize(v_width, v_height, v_ztw, v_zsw);
		cf = cfbyresolution(c_fpd35, v_width*resized, v_height*resized, v_fpxr, v_fpyr, v_fpru);
		message = ((resized>1) ? 'corrected ': '') +'resolution';
	}
	else if (v_fpxs && v_fpys) {
		cf = cfbysize(c_fpd35, v_fpxs, v_fpys);
		message = 'size';
	}
	if (!cf) {
		/*alert('unable to calculate');*/
	}
	else {
		if (cf < 1) {
			/*alert('bigger than full frame');*/
		}
		else {
			x_fl.childNodes[3].innerHTML += '<b title="'+ message +'"> * '+ cf +' is '+ Math.round(cf*v_fl) +'mm</b>';
			/*x_fl.childNodes[3].innerHTML += '<b> * '+ cf +' is '+ Math.round(cf*v_fl) +'mm</b> <small>'+ message +'</small>';*/
			var fov = calcAFOV(Math.round(cf*v_fl), c_w, c_h, c_fpd35);
			x_fov.childNodes[1].innerHTML = '<b>'+ fov[0] +'° / '+ fov[1] +'° / '+ fov[2] +'°</b>';
		}
	}
}
else {
	/*alert('not enough data');*/
}
}
}
function calcAFOV(lensSize, sensorWidth, sensorHeight, sensorDiagonal) {
	var hFovAngle = 2 * Math.atan(sensorWidth/(2*lensSize))*180/Math.PI;
	var vFovAngle = 2 * Math.atan(sensorHeight/(2*lensSize))*180/Math.PI;
	var dFovAngle = 2 * Math.atan(sensorDiagonal/(2*lensSize))*180/Math.PI;
	return [Math.round(hFovAngle*10)/10, Math.round(vFovAngle*10)/10, Math.round(dFovAngle*10)/10];
}
function cfbydiagonal(c_fpd35, v_fpd) {
	return Math.round(c_fpd35/v_fpd*10)/10;
}
function cfbysize(c_fpd35, v_fpxs, v_fpys) {
	var xsize = Math.round(v_fpxs);
	var ysize = Math.round(v_fpys);
	return cfbydiagonal(c_fpd35, Math.sqrt(xsize*xsize+ysize*ysize));
}
function cfbyresolution(c_fpd35, v_width, v_height, v_fpxr, v_fpyr, v_fpru) {
	var conv = 25.4;
	if (v_fpru == 'cm') {conv = 10;}
	var longest = v_fpxr; var shortest = v_fpyr;
	if (v_width < v_height) {shortest = v_fpxr; longest = v_fpyr;}
	return cfbysize(c_fpd35, v_width/(longest/conv), v_height/(shortest/conv));
}
function check_resize(v_width, v_height, v_ztw, v_zsw) {
	var resized = 1;
	var longest = v_width;
	if (v_height > v_width) {longest = v_height;}
	if (v_width < v_ztw) {resized = v_ztw/longest;}
	else if (v_width < v_zsw) {resized = v_zsw/longest;}
	return resized;
}
function getText(element) {
	if (element.innerText) {return element.innerText;}
	else {return element.textContent;}
}
})();