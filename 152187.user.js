// ==UserScript==
// @name        phpBB-Flashreplace
// @namespace   http://localhost
// @description Converts the flash video insert button in a Youtube insert button.
// @include     http://www.foros-fiuba.com.ar/posting.php*
// @version     1
// @gran	none
// ==/UserScript==
/* This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.*/
//Para la gente de FF

window.BBCflash = function(){
	BBCode = "[video width=<<WIDTH>> height=<<HEIGHT>>]http://www.youtube.com/v/<<video>>[/video]";

	parse_url = function(url){
		parsed = url.split('?')[1].split("&");
		for (i=0; i<parsed.length; i++) {
			tmp = parsed[i].split("=");
			if (tmp[0] = "v")
				return tmp[1];
		}
		return "";
	}

	video = parse_url(prompt("Ingrese la dirección de Youtube"));
	
	if(confirm("¿Insertar video en grande? (640x480)")){
		width = 640;
		height = 480;
	}else{
		width = 480;
		height = 360;
	}
	
	if (video == ""){
		alert("No se puede procesar URL :(");
		return 1;
	}
	
	ToAdd = BBCode.replace("<<video>>", video).replace("<<WIDTH>>", width).replace("<<HEIGHT>>", height);
	
	document.post.message.value+=ToAdd;
	document.post.message.focus();
}