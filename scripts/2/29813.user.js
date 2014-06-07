// ==UserScript==
// @name          pacchat for new chat
// @author	  tizer
// @include       http://www.hobowars.com/game/chatter2.php#
//

javascript:(function(){var newSS, styles='* { background: black ! important; color: white !important } :link, :link * { color: #ff6600 !important } :visited, :visited * { color: #ff6600 !important }'; if(document.createStyleSheet) { document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link'); newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles); document.getElementsByTagName("head")[0].appendChild(newSS); } })();
//.user.js

