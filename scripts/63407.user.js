// ==UserScript==
// @name           ePerú Battle Orders (eRep)
// @namespace      http://www.erepublik.com/en/referrer/Publius
// @description    Trabajo derivado del eUS Battle Orders (eRep) by Publius
// @version        0.23
// @include        http://ww*.erepublik.com/en
// @include        http://ww*.erepublik.com/es
// @include        http://ww*.erepublik.com/de
// @include        http://ww*.erepublik.com/fr
// @include        http://ww*.erepublik.com/pt
// @include        http://ww*.erepublik.com/ru
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	
	url: 'http://erepublikperu.foroactivo.com/eayuda-y-guias-para-principiantes-f5/ordenes-del-dia-t1368.htm',
		
		onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('<meta name="description" content=".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.lastIndexOf('"')+1,order_string.length-1)

            var tags = order_string.split('|');
			var orders = tags[0];
			var region = tags[1];
			var link = tags[2];
			var date_issued = tags[3];
					

			latest=document.getElementById('latestnews');

			params_el = document.createElement("h3");
			params_el.textContent = orders + ' ' + region;

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = link;

			updated_el=document.createElement("h3")
			updated_el.textContent ='Última actualización: ' + date_issued;

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(params_el, latest);
                latest.parentNode.insertBefore(updated_el, latest);	
                latest.parentNode.insertBefore(link_el, latest);
            }
		}	
		}
	);
