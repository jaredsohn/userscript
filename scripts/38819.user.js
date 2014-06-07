// Encounter-forum fix
// (c) Opiy (nsk.en.cx)
//
// ==UserScript==
// @name          en.forum
// @namespace     http://en.cx
// @description   Old-style forum for EN
// @include       http://*.en.cx/Guestbook*
// ==/UserScript==
(function ()
{
var js = document.createElement("script");
js.setAttribute("language", "JavaScript");
js.setAttribute("type", "text/javascript");
js.text = 'document.cookie="WisiwigIsSupported=0; path=/;";'
document.getElementsByTagName('head').item(0).appendChild(js);
}
)();
