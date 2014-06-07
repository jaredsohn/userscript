// ==UserScript==
// @name          Inactivos en Rojo para OGame ( Es )
// @namespace     http://
// @description	  Colorea los Usuarios Inactivos de OGame
// @include  http://uni*.ogame.com.es/game/index.php*  
// @include  http://uni*.ogame.org*
// @include  http://www.ogame.org*
// ==/UserScript==


var hrefer = self.location.href;
//var f = document.forms.length;
//alert( ' el número de formularios de la página es ' + f );

if(hrefer.indexOf('page=flotten1&session=')!=-1){

alert("Esto es un mensaje de JavaScript");

var a = document.getElementsByName('ship210');

for (var i = a.length - 1; i >= 0; i--) {
a[i].value=3;
alert(a[i].value);
}
alert(document.forms[2].elements.length);
alert(document.forms[1].elements.length);
alert(document.forms[0].elements.length);


//document.forms[2].submit ( );
}

function fenster(target_url,win_name) {
  var new_win = window.open(target_url,win_name,'scrollbars=yes,menubar=no,top=0,left=0,toolbar=no,width=550,height=280,resizable=yes');
  new_win.focus();
}

fenster("index.php?page=notizen&session=9e4a21800c63&no_header=1", "Notizen");

var hrefer = self.location.href;



alert(hrefer);
