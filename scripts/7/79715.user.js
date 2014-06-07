// ==UserScript==
// @name           eNorwegian Battle Orders (eRep)
// @namespace      www.erepublik.com
// @description    eNorwegian Battle Orders (eRep)
// @version        0.1
// @include        http://www.erepublik.com/en
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.erepublik.com/en/newspaper/forsvars-nytt-199155/1',

	onload:function(response){
            //Retrieve and truncate string
            var dato = response.responseText.match('class="graytext".*?<');
            var order_string = response.responseText.match('Dagens.*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)
		dato = dato.join("");   //Array->string
		dato = dato.substring(dato.indexOf('>')+1,dato.length-1)		


            var tags = order_string.split('^');
			var orders = tags[0];
			var link = tags[1];

			latest=document.getElementById('latestnews');

			params_el = document.createElement("h3");
			params_el.textContent = orders;

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = link;

			updated_el=document.createElement("h4")
			updated_el.textContent ='Sist oppdatert: ' + dato;

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(params_el, latest);
                latest.parentNode.insertBefore(link_el, latest);
                latest.parentNode.insertBefore(updated_el, latest);	
            }
		}	
		}
	);

