// ==UserScript==
// @name        URO FS Fecha y exif
// Version modificada de: FlickrDateAdded que permite ver la fecha concreta de la subida, la camara y la lente.
// @description Script especifico para el grupo URO.
// @namespace   http://vispillo.org
// @require     http://userscripts.org/scripts/source/78952.user.js
// @include     http*://www.flickr.com/groups/olympus-e500/pool/*
// @include     http*://www.flickr.com/groups/olympus-e500/*
// @include     http*://www.flickr.com/groups/*/pool/*/*/*
// @include     http*://www.flickr.com/groups/*/*
// @include     http*://www.flickr.com/groups/*/pool/*/*
// @include     http*://www.flickr.com/photos/*/sets/*/
// @include     http*://www.flickr.com/photos/*/
// @grant       none
// @version     URO con flickr en https 31/03/2014
// ==/UserScript==

//CONFIGURACION URO: Poner 1 activa la funcion. Poner 0 la desactiva.
var noversinexif = 0;        //Las fotos que no permiten acceder a los datos EXIF, no se ven.
var noversin4tercios = 0;    //Las fotos sin datos ni de camara ni de la lente usada, no se ven.
var noversincompartir = 1;	 //Las fotos que no comparten enlaces BBCode, no se ven. Se sabe por la propiedad usage.canshare de photo getinfo
var noautor = 1;             //Desaparecen los datos de AUTOR y Titulo (van juntos) de la fotografia para mayor objetividad.
var verbbcode = 1;			 //Aparece el bbcode de la imagen a 500px. Se ve solo una parte pero se selecciona con doble click toda la linea y se copia entero.


//COMIENZA EL SCRIPT
jQuery.noConflict();
function getJSVariable (regex) {
  // Credit for this function goes to Alesa Dam
  // Some slight modifications for use with jQuery
  var retval;
  jQuery('script').each( function (i,script) {
    if (retval != undefined) {
      return;
    }
    var html = script.innerHTML;
    try {
      retval = html.match(regex)[1];
    } catch (e) {
    }
  });
  return retval
}
function formatDate(seconds) {
	var now = new Date();
	now = now.getTime()+now.getTimezoneOffset() * 60*1000;
	var when = (now/1000) - seconds;
	var days = parseInt(when/(3600*24));
	//if(days > 10) {
		var date = new Date(seconds*1000);
		return date.toLocaleTimeString()+" "+date.toLocaleDateString();
	/*} else {
		var ret = '';
		if(days > 0)
			ret = days + ' day'+((days>1)?'s':'');
		var rest = when - days*3600*24;
		if(when%(3600*24) > 0) {
			if(rest/3600 > 1) {
				if(ret) ret += ', ';
				ret += parseInt(rest/3600)+' h';
			} else if(days < 1)
				ret = "less than an hour";
		} else if(days < 1)
				ret = "less than an hour";
		return ret +' ago';
	}*/
}

//var key = "getJSVariable(/\"?api_key\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
var key = "643e26a095227ebba26edd25a18c33af";
var mode = jQuery('#thumb-options ul li a.selected').text();
//var gid  = jQuery('input[name=w]').val();
var gid = jQuery('a[data-track=YouSubnav-invite]').attr('href').split('=')[1]; 
//var gid  = '54041345@N00';

if (jQuery('#head-status a[data-track=signout]').length > 0) {
  authhash = jQuery('#head-status a[data-track=signout]').attr('href').split('=')[1];
}
else {
  authhash = jQuery('a[data-track=Account-sign_out]').attr('href').split('=')[1];
}
var page = 1;
var perpage = 360; //Nuevo maximo de fotos por pagina si bajas hasta el final.
//var str = '<br />';
var str = '';
if (document.location.href.indexOf('pool/page') != -1 ) {
  var newpage = document.location.href.match(/pool\/page(\d+)/)[1];
  if (newpage) {
    page = newpage;
  }
}


  jQuery.getJSON('https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&group_id='+gid+'&api_key='+key+'&per_page='+perpage+'&page='+page+'&extras=url_m&format=json&nojsoncallback=1&auth_hash='+authhash,function (data) {
  //jQuery.getJSON('https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&group_id=54041345@N00&api_key='+key+'&per_page='+perpage+'&page='+page+'&format=json&nojsoncallback=1&auth_hash='+authhash,function (data) {
    jQuery.each(data.photos.photo,function(i,item) {
	
				
				
				

	
				
				
		
        var tmp = jQuery('#photo_'+item.id+' div.meta').html();
	
       // Para ganar en objetividad y quitar nombre de foto y autor:
 	   if (noautor == 1) {tmp =' ';}


	   //EXIF
	 		var make = 'Sin camara'; //hay exif pero no hay dato de camara
        	var lente = 'Sin lente';  //hay exif pero no hay dato de lente
        	var noexif = 'SIN PERMISO EXIF'; //no puede acceder a ningun dato exif
			
			

	
			
			
	//Intentamos bbcode

		var imageLink = item.url_m;
		var photoPageLink = 'https://www.flickr.com/photos/' + item.owner + '/' + item.id;
		var bbcode =' &lt;a href=&quot;https://www.flickr.com/photos/' + item.owner + '/' + item.id + '&quot;&gt;&lt;img src=&quot;' + imageLink + '&quot;&gt;&lt;/a&gt;';	
		if (verbbcode == 0) {bbcode =' ';} 
		//var tmp3 = jQuery('#photo_'+item.id+' div.meta').html();

		//jQuery('#photo_'+item.id+' div.meta').html('<div style="width: 30px;"> '+bbcode +' </div>' +tmp3);
	//bbcode hasta aqui

	
	
	

				
							//	INSERTAMOS NUEVO CODIGO DE COMPARTE O NO COMPARTE
			var test = 'fallo';	
		 jQuery.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=643e26a095227ebba26edd25a18c33af&format=json&nojsoncallback=1&photo_id='+item.id,function (data3) {
		         test = data3.photo.usage.canshare;
         if (test == 0) {bbcode='';
		 if (noversincompartir == 1) {jQuery('#photo_'+item.id+' img').css("visibility", "hidden");}
		 }
	});

	
	
	
	
	
	
	
	
	
	 jQuery.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=643e26a095227ebba26edd25a18c33af&format=json&nojsoncallback=1&photo_id='+item.id,function (data2) {
		//LAS FOTOS SIN PERMISO PARA VER EXIF QUEDAN ETIQUETADAS y/o no se ven
         if(data2.code == '2') {
  			 var tmp2 = jQuery('#photo_'+item.id+' div.meta').html();
 	   if (noautor == 1) {tmp2 =' ';}			 
             lente = '';
             jQuery('#photo_'+item.id+' div.meta').html('<div style="width: 30px;"> '+bbcode +' </div>'+tmp2 + '<div> '+noexif + ' '+ ' </div>'+'<div> '+formatDate(item.dateadded)+'</div>');//etiqueta

             //if (noversinexif == 1) {jQuery('#photo_'+item.id+' a.rapidnofollow').html('  ');}//la foto desaparece
			 if (noversinexif == 1) jQuery('#photo_'+item.id+' img').css("visibility", "hidden"); 

             return;
			}
         //hasta aqui filtro no exif
		//Grabamos el codigo camera
		make = data2.photo.camera;
		make = make.replace(/Olympus/g, "");
		if (make == '') {
		make = 'Sin camara';
		}

		var tmp2 = jQuery('#photo_'+item.id+' div.meta').html();

		jQuery.each(data2.photo.exif,function(e,etem) {

		//var tmp2 = jQuery('#photo_'+item.id+' div.meta').html();
		
		var dato = etem.label;
		//cuatro lineas siguientes eliminadas para afinar busqueda de camara a traves de data2.photo.camera
        //if (dato.toLowerCase().indexOf ( 'make' ) != -1) {
		//make = etem.raw._content;
		//make = make.replace(/IMAGING CORP./g, ""); 
		//	}
		if ((dato.toLowerCase().indexOf ( 'lens' ) != -1) && (etem.raw._content.indexOf ( 'mm' ) != -1)) {
        	lente = etem.raw._content;
			}
		});

		
	//Intentamos imprimir todo aqui y antes del return de noexif para que se vean las 500 fotos bien.
          // TRES LINEAS QUE HACEN QUE LA FOTO SIN DATOS DESAPAREZCA:
		  if (noversin4tercios == 1) {
               if (make == 'Sin camara' && lente == 'Sin lente')  {
             //jQuery('#photo_'+item.id+' a.rapidnofollow').html('  ');//la foto no se ve
			//FUNCIONA jQuery('#photo_'+item.id+' img').attr('src','https://farm8.staticflickr.com/7444/9663102180_3031fc9ab1.jpg');
			jQuery('#photo_'+item.id+' img').css("visibility", "hidden"); //ESTA LINEA SOLA SI FUNCIONA
			 
             }
			 }
			  	   if (noautor == 1) {tmp2 =' ';}
						

	
		jQuery('#photo_'+item.id+' div.meta').html('<div id="bbcode" style="width: 30px;"> '+bbcode +' </div>' +tmp2 +'<div> '+make + ' ' +lente + ' '+ ' </div>'+'<div> '+formatDate(item.dateadded)+'</div>');


	});
	
	 	


	

	

			
			
    });
  });