// Author: Ramon Antonio Parada (http://ramonantonio.net / rap@ramonantonio.net)

// ==UserScript==
// @name           CaixaActiva Plus
// @namespace      https://activa.caixagalicia.es/
// @description    Melloras para o servizo CaixaActiva de CaixaGalicia
// @include        https://activa.caixagalicia.es/*
// @include        http://activa.caixagalicia.es/*
// ==/UserScript==




var CAP={
init:function() {

//unsafeWindow.frames[1].lShowEmail = 0;

   if (window.location == 'http://activa.caixagalicia.es/') {
      unsafeWindow.location = 'https://activa.caixagalicia.es/Default.asp?language=1110';
      return true;
   }

if (unsafeWindow.document.getElementById('tarjeta') != null) {
   unsafeWindow.document.getElementById('tarjeta').readOnly = false;
   unsafeWindow.document.getElementById('pin').readOnly = false;

   var NTarjeta = GM_getValue('NTarjeta', '');
   var NPin = GM_getValue('NPin', '');
   unsafeWindow.document.getElementById('tarjeta').value = NTarjeta;
   unsafeWindow.document.getElementById('pin').value = NPin;

   unsafeWindow.document.getElementById('frm').onsubmit = CAP.validar;

}

if (unsafeWindow.document.getElementById('teclado') != null) {
   unsafeWindow.document.getElementById('teclado').style.display = 'none';
}

if (unsafeWindow.document.getElementById('Coor') != null) {
//form -> fC
   unsafeWindow.document.getElementById('Coor').value = '';
   unsafeWindow.document.getElementById('Coor').readOnly = false;
   unsafeWindow.document.getElementById('Coor').type = 'text';
}


var iconURL = 'http://www.caixagalicia.es/favicon.ico';
CAP.addLink(iconURL, "icon");
CAP.addLink(iconURL, "shortcut icon");

},
validar: function() {
   var NTarjeta = unsafeWindow.document.getElementById('tarjeta').value;
   var NPin = unsafeWindow.document.getElementById('pin').value;

   GM_setValue('NTarjeta', NTarjeta);
   GM_setValue('NPin', NPin);
   return true;
},


addLink: function(iconURL, relValue) {

  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = relValue;
  link.href = iconURL;
 // this.removeLinkIfExists(relValue);
  unsafeWindow.document.getElementsByTagName("head")[0].appendChild(link);
}

};


//http://www.caixagalicia.es/favicon.ico

//unsafeWindow.frames[1].lShowEmail = 0;
/*
<script type="text/javascript">
	<!--
		if (parent.frames[1].lShowEmail == 1) {
			parent.frames[1].lShowEmail = 0;
			if (confirm("Ten correo sin ler, ¿desexa ir á opción de Mensaxes?")) {
				self.location.href = "operaciones_varias/mensajes/Mensajes_Marcos.asp?s=336616006";
			}
		}
	// -->
	</script>
*/

/*
unsafeWindow.document.getElementsClass('fondoticker')[0].style.display= 'none';
*/


CAP.init();
