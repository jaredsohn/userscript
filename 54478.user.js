// ==UserScript==
// @name           NoticiasDoPil (eRep)
// @namespace      www.erepublik.com
// @description    NoticiasDoPil (eRep)
// @version        0.01
// @include        http://www.erepublik.com/en
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://erepublikbrasil.com/forum/index.php?topic=656.0',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('class="inner".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var titulo = tags[0];
			var texto = tags[1];
                        var link = tags[2];

			latest=document.getElementById('latestnews');

			titulo_el = document.createElement("h3");
			titulo_el.textContent = titulo;

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = link;

                        texto_el = document.createElement("p");
                        texto_el.textContent = texto;

                        br_el = document.createElement("br");
                        barra_el = document.createElement("hr");

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(titulo_el, latest);
                latest.parentNode.insertBefore(texto_el, latest);
		latest.parentNode.insertBefore(link_el, latest);
		latest.parentNode.insertBefore(barra_el, latest);
                latest.parentNode.insertBefore(br_el, latest);
            }
		}	
		}
	);