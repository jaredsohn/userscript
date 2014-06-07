// ==UserScript==
// @name        Cuentas Usuario [CETECOM]
// @namespace   @grant
// @description Mod Para Cuentas de Usuario
// @include     http://cdt.duoc.cl/admin/alumnos/modifica.php
// @version     1.2
// ==/UserScript==

 var els = document.getElementsByTagName(
     
    "*");
    for(var i = 0, l = els.length; i < l; i++) {
      var el = els[i];
      el.innerHTML = el.innerHTML.replace(/Rut:/gi, 'Clave :&nbsp');
     
      el.innerHTML = el.innerHTML.replace(/Este cambio fue registrado/gi, '..........................................................<br><br><b> Mesa de ayuda</b> <br><b>(800 20 3862)</b><br><br><H3><b>Direcciones de Interés</b></H3><b>portal</b>.duoc.cl<br>duoc.cl/<b>serviciosTIC</b><br><br><br><i><b>©CETECOM</b> Concepción 2013</i> ');
     
      el.innerHTML = el.innerHTML.replace(/Alumno Modificado:/gi, 'Usuario :&nbsp');
      el.innerHTML = el.innerHTML.replace(/LDAP/gi, '<style type="text/css"></style> ');
      el.innerHTML = el.innerHTML.replace(/Administracion de Cuentas Alumnos/gi, '<br><br><IMG SRC="http://s12.postimage.org/g3yaqjg3x/logo3.jpg" WIDTH=300 "> <br><br>Cuenta Alumno');
     
      el.innerHTML = el.innerHTML.replace(/Cambio realizado con exito!!/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/Cambio realizado con exito!!/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/ -/gi, '&nbsp&nbsp&nbsp<br><br>');
     
      el.innerHTML = el.innerHTML.replace(/-1/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-2/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-3/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-4/gi, ' ');
     
      el.innerHTML = el.innerHTML.replace(/-5/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-6/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-7/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-8/gi, ' ');
     
      el.innerHTML = el.innerHTML.replace(/-9/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-0/gi, ' ');
      el.innerHTML = el.innerHTML.replace(/-K/gi, ' ');
     
    }
