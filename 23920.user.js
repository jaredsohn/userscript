// ==UserScript==
// @namespace      http://userscripts.org/users/47552
// @name           Sirus_Still_Listening
// @author         Justin Woodman
// @version 1.0
// @description    Allow you to listen to Sirus Internet Stream without the constant prompts asking if you are still listening.
// @include        http://www.sirius.com/sirius/servlet/MediaPlayer?*
// ==/UserScript==

function isUserStillListening() {
   userIsListening();
}

function embedFunction(s) {
document.body.appendChild(document.createElement('script'))
.innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(isUserStillListening);
