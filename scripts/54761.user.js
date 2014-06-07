// ==UserScript==
// @name           eBrasil Ordens Militares
// @namespace      www.erepublik.com
// @description    eBrasil Ordens Militares
// @version        0.1
// @include        http://www.erepublik.com/en
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://ordens.xyz.pastebin.com/m632e4514',

	onload:function(response){
            var ordem = response.responseText.match('class="de1".*?#');
            ordem = ordem.join("");
            ordem = ordem.substring(ordem.indexOf('>')+1,ordem.length-1)

            var partes = ordem.split('|');
			var ordemPrincipal = partes[0];
			var regiao = partes[1];
			var link = partes[2];
			var data = partes[3];
			
			latest = document.getElementById('latestnews');
			
			titulo = document.createElement("h3");
			titulo.textContent = ordemPrincipal + ' ' + regiao;

			link = document.createElement("a"); 
			link.setAttribute('href',link);
			link.innerHTML = link;
		
			datael = document.createElement("h3")
			datael.textContent ='Data da Ordem: ' + data;

            if(ordem.length) {  
                latest.parentNode.insertBefore(titulo , latest);
                latest.parentNode.insertBefore(datael, latest);	
                latest.parentNode.insertBefore(link, latest);
           }
		}	
		}
	);