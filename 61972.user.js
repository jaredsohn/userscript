// ==UserScript==
// @name		Script actualizador PRUEBA  
// @namespace		Juampi_Mix
// @description		NO INSTALAR SOLO PARA PRUEBAS / NOT INSTALL ONLY FOR TESTING
// @version		1.03
// @history        	1.03 Máscara de pantalla llena ahora la altura todo el documento según lo previsto
// @history        	1.03 Aviso ahora centrada y fija independientemente de desplazamiento
// @history        	1.03 Corregido un error de redacción de menor importancia
// @history        	1.03 Agregada implementacion de ScriptUpdater.forceNotce()
// @history        	1.03 Agregada implementacion,  funcion de devolución de llamada
// @history        	1.02 Mejora el rendimiento del código base en la retroalimentación de la comunidad
// @history        	1.01 Eliminada la necesidad de la versión actual
// @history			1.01 Se ha limpiado el código
// @history			1.01 Simplificada la recuperación de metadatos
// @history			1.01 Actualización de licencia
// @history			1.00 Versión inicial
//
// @require        http://userscripts.org/scripts/source/60663.user.js
// ==/UserScript==
ScriptUpdater.check(60663, '1.03');
ScriptUpdater.forceNotice(60663, '1.03');
ScriptUpdater.forceCheck(60663, '1.03');
function handleReturnedVersion(v) {
}
ScriptUpdater.check(60663, "1.03", handleReturnedVersion);