// ==UserScript==
// @name		AFDI +
// @namespace		https://userscripts.org/users/536905/scripts
// @description		Mejoras básicas en la funcionalidad de AFDI.
// @match		https://gestiona.madrid.org/wafd/*
// @version		0.1c
// @downloadURL		http://userscripts.org/scripts/source/184533.user.js
// @grant       	none
// ==/UserScript==

//Metadata Block	http://wiki.greasespot.net/Metadata_Block

//Mejoras básicas en la funcionalidad de la Aplicación de Ayuda para la Función Docente en Internet (AFDI) de la Comunidad de Madrid.

//Para pantalla aviso expira sesión
function renueva_sesion()
{
	var nueva_sesion=new XMLHttpRequest();
	nueva_sesion.open('GET', 'ValidaUsuario.icm', false);
	nueva_sesion.send(null);
	window.opener.countdownfrom=1199;
	window.opener.currentsecond=1200;
	window.close();
}

//Pantalla de login
if (document.getElementById('contenido_aplicacion_sin_menu'))
{
	document.getElementById('USUARIO').style='width: 270px;';
	document.getElementById('CLAVE').style='width: 270px;';
	document.getElementsByTagName('h3')[0].style='width: 290px;';
	document.getElementsByTagName('ul')[0].style='margin-left: 10px; text-align: left;';
	document.getElementsByTagName('a')[0].text='Cambiar clave de acceso después de entrar';
	document.getElementsByTagName('a')[0].style='text-decoration: none; color: black;';
	document.getElementsByTagName('a')[1].text='Desbloquear de clave de usuario';
	document.getElementsByTagName('p')[0].style='text-align: right;';
}

//Pantalla aviso expira sesión
else if (window.CloseWin)
{
	//innerHTML.replace('<br>','') debería poder ejecutarse en un solo comando
	//utilizando /gi, pero por algún motivo que no me he parado a investigar
	//no funciona
	document.body.innerHTML=document.body.innerHTML.replace('<br>','');
	document.body.innerHTML=document.body.innerHTML.replace('<br>','');
	document.body.innerHTML+='<p id="mensaje" class="imprimir" align="center">¿Desea mantener la sesión abierta más tiempo?</p>';
	document.body.innerHTML+='<p id="mensaje" class="imprimir" align="center"><a id="si" style="font: normal 1em arial, helvetica, sans-serif; color: #ffffff; text-align: center; padding: 2px 10px 2px 10px; background-color: #ff0000; text-decoration: none;" href=""><strong>Sí</strong></a> <a id="no" style="font: normal 1em arial, helvetica, sans-serif; color: #ffffff; text-align: center; padding: 2px 10px 2px 10px; background-color: #ff0000; text-decoration: none;" href="javascript:window.close();"><strong>No</strong></a></p>';

	document.getElementById('si').addEventListener('click', renueva_sesion, false);
}

//Pantalla principal - Botón cerrar sesión
else if (window.countredirect)
{
	document.querySelector('a[href="FinalizarSesion.icm"]').outerHTML='<p id="mensaje" class="imprimir" align="center" style="width: 100px; padding: 5px 0px 0px 0px"><a id="cerrar" style="font: normal 0.8em sans-serif, arial, helvetica; color: #ffffff; text-align: center; padding: 2px 10px 2px 10px; background-color: #cc3333; text-decoration: none;" href="ValidaUsuario.icm" onclick="document.cookie=\'JSESSIONID=; path=/wafd; expires=' + new Date(0).toGMTString() + '\'; document.cookie=\'cookie_usuario_segura=; path=/; expires=' + new Date(0).toGMTString() + '\';"><strong>Cerrar sesión</strong></a></p>';
}

//Pantalla sesión caducada
else if (window.ventanaNueva)
{
	document.getElementsByTagName('a')[0].href='/wafd/';
}

/*
    window['countredirect'] = function()  
    {  
        // Nueva implementación de la función

    };  
*/

