// ==UserScript==
// @author         Redentor [OGame|ES]
// @name           Alliance Chat for OGame
// @description    Chat de alianzas para OGame
// @version        1.0
// @include        http://uni*.ogame.com.es/game/index.php?*
// ==/UserScript==

(function ()
{
// Configuracion:
// 1) Sube el contenido del ".rar" a un host como Miarroba o Byethost
// 2) Sustituye más abajo "AquilaUrlDeTuHost.com" por la dirección del host donde esta 
//    alojado el chat

// El siguiente "if" no es necesario si no se esta bajo navegador Opera
if (document.location.href.indexOf ('/game/index.php?page=') == -1) return;

var chatHTML = '<div id="shoutboxbox"><iframe id="shoutbox" src="http://AquiLaUrlDeTuChat/alliancechat.php" width="185" height="320" frameborder="0" allowTransparency="true" align="left"></iframe></div>' //INTRODUCE LA URL DE TU CHAT

var targetElement = document.getElementById('siteFooter');
var origHTML = targetElement.innerHTML;

targetElement.innerHTML = chatHTML + origHTML;
}
) ();