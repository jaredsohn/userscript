// ==UserScript==
// @name           Anti LOL
// @namespace      ¬¬
// @description    esconda os LoL's postados no orkut.. (AHAHAHAHAA oq vcs sempre queriam né? ahuahuahua)
// @include        http://*.orkut.*
// @author	       Diogok
// ==/UserScript==


        function tiralol(){
         dk = document.body.innerHTML.replace(/LoL/g,'').replace(/Lol/g,'').replace(/LOL/g,'').replace(/lol/g,'');
		 document.body.innerHTML = dk;
		}
		
		tiralol();