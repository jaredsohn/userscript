// ==UserScript==
// @name EliminaLogo
// @author Mozzicone[ITA]
// @description Elimina il logo in alto di Vendetta e "ridimensiona" le parti della pagina
// @include      http://s*.vendetta*.*/vendetta/*
// ==/UserScript==  


(function() {

  if (location.pathname.search('login.php') != -1) {
	var trs = document.getElementsByTagName('frameset');
		for (var i = 0; i < trs.length; i++) {
			if (trs[i].cols == '53,*,53'){ trs[i].cols = '0,*,0'; }// frame left e right, ai lati della pagina principale
			if (trs[i].rows == "141,*"){ trs[i].rows = '0,*'; } //logo in alto
			//if (trs[i].cols == "140,*"){ trs[i].cols = '150,*'; } //regolare le dimensioni del munu di navigazione
			//if (trs[i].cols == '*,906,*'){ trs[i].cols = '*,836,*'; } //regolare le dimensioni della pagina centrale (quella di gioco)
		}
  }
 
})();
