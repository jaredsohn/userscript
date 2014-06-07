// ==UserScript==
// @name          Zap All Colors on Page
// @description   Removes all the colors on the page. Background is set to white, text to black, and links to blue.
// @include       *
// ==/UserScript==

(function(){var newSS, styles='* { background: #ECECEC ! important; color: black !important } :link, :link * { color: #0000EE !important } :visited, :visited * { color: #551A8B !important }'; if(document.createStyleSheet) { document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link'); newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles); document.getElementsByTagName("head")[0].appendChild(newSS); } })();