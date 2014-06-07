// ==UserScript==
// @name           Flickr Credits Composer
// @namespace      http://blog.metsuke.com/code/
// @description    Genera Creditos en Flickr para pie de pagina. Derivada de Flickr CC Attribution Helper v0.4
// @version 0.8
// @license: GNU/GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include        http://www.flickr.com/photos/*/*
// @include        http://flickr.com/photos/*/*
// @exclude        http://www.flickr.com/photos/*/*#preview
// @exclude        http://flickr.com/photos/*/*#preview
// ==/UserScript==

/*
This is a Greasemonkey script. See http://greasemonkey.mozdev.org/ for more info.
Script  Released Under GPL License v3 (http://www.gnu.org/copyleft/gpl.html) 

Si estas logado en Flickr, el script genera los creditos para pie de pagina con formato predeterminado.

v 0.8 2011-11-09 Incorporamos creditos del plugin en el de las fotos. Correccion titulo imagen de 500xYYY que no reflejaba ese hecho.
v 0.7 2011-10-03 Actualizacion incorporar el formato 640xYYY a las opciones de salida.
v 0.6 2011-10-03 Actualizacion para soportar imagenes que no muestran tags, empleando "People in this" como lugar de inserción.
v 0.5 2010-08-09 Actualizacion para soportar el nuevo formato de flickr, adaptado de Attribution Helper v0.4
v 0.4 2009-09-28 Añadida generación de código de inserción de imagen mediana (solo url).
v 0.3 2009-09-28 Añadida generación de código de inserción de imagen mediana (500x...) centrada.
v 0.2 2009-09-28 Añadido nombre de la imagen.
v 0.1 2009-09-27 Version Original.

*/



(function () {

	// test for cc attribution by the span in the license div

	var iscc = document.evaluate("//span[@class='ccIcn ccIcnSmall']", 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(iscc) {

        // link for images

        photosrc500 = document.evaluate("//link[@rel='image_src']/@href",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue.textContent.replace('_m', '');

				photosrc640 = document.evaluate("//link[@rel='image_src']/@href",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue.textContent.replace('_m', '_z');
	
        // title of photo

				var phototitle = document.evaluate("//h1",
					document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue.innerHTML;

		
				// get the location to insert the new content

				var liscP = document.evaluate("//div[@id='photo-sidebar-tags']",
			   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
			   null).singleNodeValue;

					// Si es vacio, significa que no hay tags, asi que usamos la zona de People in this Photo
					if (!liscP) {
						var liscP = document.evaluate("//div[@id='photo-sidebar-can-use']",
			   			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
			   			null).singleNodeValue;
					}
			   
           
        // get the div that contains user info              

				widget = document.evaluate("//div[@id='photo-story']",
					document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue;
	
				userstream = /href="(\S+)"/.exec(widget.innerHTML)[1];
				usernick = /By <a href="(\S+)">(.+)<\/a><\/strong>/.exec(widget.innerHTML)[2];
	
				photoid = document.location.href.split('/')[5];
				photolink = 'http://flickr.com' + userstream + photoid + '/';
				userlink ='http://flickr.com' + userstream.replace(/\/photos\//,'/people/');
	
				// Evaluamos la licencia
				ccbytoken = true;

				ccsatoken = document.evaluate("//img[@class='f-sprite fs-cc_icon_sharealike_small']",
					document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue;

				ccnctoken = document.evaluate("//img[@class='f-sprite fs-cc_icon_noncomm_small']",
					document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue;;

				ccndtoken = document.evaluate("//img[@class='f-sprite fs-cc_icon_noderivs_small']",
					document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue;;


	   		if (liscP) {      

	     		var div_attrib = document.createElement('div');

	     		var licenseSmall = "CC:";

				 		if (ccbytoken) licenseSmall = licenseSmall + "by";
				 		if (ccnctoken) licenseSmall = licenseSmall + "-nc";
				 		if (ccndtoken) licenseSmall = licenseSmall + "-nd";
				 		if (ccsatoken) licenseSmall = licenseSmall + "-sa";

	     		var licenseBig = "Creative Commons ";

				 		if (ccbytoken) licenseBig = licenseBig + "Atribuci&oacute;n ";
				 		if (ccnctoken) licenseBig = licenseBig + "- No Comercial ";
				 		if (ccndtoken) licenseBig = licenseBig + "- No Derivadas ";
				 		if (ccsatoken) licenseBig = licenseBig + "- Compartir Igual ";

					var creditosLi = '<li><small>Fotograf&iacute;a "' + phototitle + '" ' + licenseBig + '(' + licenseSmall + ') por <a href="' + userlink + '">' + usernick + '</a></small></li>';

var creditosLiPlugin = '<li><small>Creditos e Inserción generados por <a href="http://userscripts.org/scripts/show/58715">Flickr Credits Composer</a></small></li>';

	     		var creditos = '<p><small><strong>Cr&eacute;ditos</strong></small></p>';
	     		creditos = creditos + '<ul>' + creditosLi + creditosLiPlugin  + '</ul>';

					var imagenmedium500 = '<p style="text-align: center;"><a class="" rel="" title="' + phototitle + '" href="' + photolink + '"><img class="alignnone" src="' + photosrc500 + '" alt="' + phototitle + '"></a></p>';
					var imagenmedium640 = '<p style="text-align: center;"><a class="" rel="" title="' + phototitle + '" href="' + photolink + '"><img class="alignnone" src="' + photosrc640 + '" alt="' + phototitle + '"></a></p>';



     			var imageMediaWiki500 = photosrc500;
     			var imageMediaWiki640 = photosrc640;

		   		// create content to insert to page

		   		var contenido = '<br /><h4>Flickr Credits Composer</h4>';

					contenido = contenido + '<br />CC Medium Image 500px wide<br /><textarea rows="5" onClick="this.select()" name="ccimageinsert" style="width:100%">' + imagenmedium500 + '</textarea>';

		   		contenido = contenido + '<br /><br />CC URL Only Medium Image 500px wide (HTML)<br /><textarea rows="2" onClick="this.select()" name="cccredits" style="width:100%">' + imageMediaWiki500 + '</textarea>';

		   		contenido = contenido + '<br />CC Medium Image 640px wide <br /><textarea rows="5" onClick="this.select()" name="ccimageinsert" style="width:100%">' + imagenmedium640 + '</textarea>';

		   		contenido = contenido + '<br /><br />CC URL Only Medium Image 640px wide (HTML)<br /><textarea rows="2" onClick="this.select()" name="cccredits" style="width:100%">' + imageMediaWiki640 + '</textarea>';

		   		contenido = contenido + '<br /><br />CC Footer Credits (HTML)<br /><textarea rows="5" onClick="this.select()" name="cccredits" style="width:100%">' + creditos + '</textarea>';

		   		contenido = contenido +  '<br /><br />CC Footer Credits LI (HTML)<br /><textarea rows="5" onClick="this.select()" name="cccreditsLi" style="width:100%">' + creditosLi + '</textarea>';

     			div_attrib.innerHTML = contenido;

					//div_attrib.innerHTML = '<br /><br />CC Attribution (HTML)<br /><textarea rows="5" onClick="this.select()" name="ccattweb"><a title="' + phototitle + '" href="' + photolink + '"><img src="' + photosrc + '" /></a><br /><small><a title="' + phototitle + '" href="' + photolink + '">'  + 'cc licensed flickr photo</a> shared by <a href="' + userlink + '">' + usernick + '</a></small></textarea><br />CC Attribution (text)<br /><textarea rows="5" onClick="this.select()" name="ccatttxt">cc licensed flickr photo by ' + usernick + ': ' + photolink + '</textarea>';

			    		

	     		liscP.appendChild(div_attrib);



			}

	}

})();

