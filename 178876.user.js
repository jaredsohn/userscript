// ==UserScript==

// @name       Recordar Contraseña Intranet UPV
// @version    0.1
// @match      https://www.upv.es/pls/soalu/est_intranet.Ni_portal_n?P_IDIOMA=c  
// @match      https://www.upv.es/pls/soalu/est_intranet.NI_Indiv?P_IDIOMA=c&P_MODO=alumno&P_CUA=sakai&P_VISTA=MSE
   
// @copyright  Deleko (2013)

// ==/UserScript==

document.getElementsByName("dni")[0].value="tu_DNI";

document.getElementsByName("clau")[0].value="tu_contraseña";