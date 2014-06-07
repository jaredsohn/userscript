// ==UserScript== 
// @name           Header PolEmpresa 
// @description    Crea 2 links en el header de Pol
// @namespace      http://userscripts.org/users/35001 
// @include        http://pol.teoriza.com/*
// @author         Bradduk & Hannibal Smith.
// ==/UserScript==

// *********************************************************************  DATOS PERSONALES  ***** 
var empresaLink = 'http://pol.teoriza.com/empresas/otros/equipo-a/';      // enlace de la empresa
var claveAPI = 'XXXXXXXXXXXX';                                            // clave Api
var numCuenta = '206';                                                    // nº de cuenta
// **********************************************************************************************

var transacciones = 'http://pol.teoriza.com/api.php?pass='+ claveAPI +'&a=transacciones&cuenta=-' + numCuenta;
var cuentaLink = 'http://pol.teoriza.com/pols/cuentas/' + numCuenta + '/';
var mhtml, mheader = document.getElementById( 'header-in' );

    GM_xmlhttpRequest({
        method:"GET",
        url:transacciones,
        headers:{
                "User-Agent":"monkeyagent",
                "Accept":"text/monkey,text/xml",
            },
        onload: function(responseDetails) {               
                var respuesta = responseDetails.responseText;
               
                var lineas = respuesta.split('\n');
                var sumaTransacciones = 0;
                for (i=0;i<lineas.length;i++){
                    var transaccion = lineas[i].split('|')[1];
                    if (transaccion != null){
                        sumaTransacciones+=transaccion*1
                    }
                }

	mhtml = document.createElement( "div" );
	mhtml.innerHTML = '<a href=' + empresaLink + ' style="position:absolute;top:27px;left:285px">Empresa </a><a href=' + cuentaLink + ' style="position:absolute;top:27px;left:370px" title='+lineas[0]+'>Cta.Cte. (<b><span class="pp">'+sumaTransacciones+'</span></b> POLs) </a>';
	mheader.appendChild( mhtml );
            }

    });
