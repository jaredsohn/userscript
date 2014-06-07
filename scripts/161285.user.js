// ==UserScript==
// @name           UTN FRRe: SysAcad - AutoRefresh
// @namespace      http://sysacadweb.frre.utn.edu.ar
// @author         Sebastián J. Seba
// @version        0.2
// @description    Actualiza las páginas del SysAcad cada 3 minutos y medio (210 segundos) para evitar que el servidor cierre la sesión.
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://sysacadweb.frre.utn.edu.ar*
// @downloadURL    https://userscripts.org/scripts/source/161285.user.js
// @updateURL      https://userscripts.org/scripts/source/161285.meta.js
// ==/UserScript==

window.addEventListener('load', function() {
    var main = function () {
        script_tag = document.createElement("script");
        script_tag.text = "setTimeout('window.location.href=window.location.href;', 210000);";
        document.head.appendChild(script_tag);
    };
    main();
});