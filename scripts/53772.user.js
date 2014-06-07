// ==UserScript==
// @name           eRu Battle Orders (eRep)
// @namespace      www.erepublik.com
// @description    eRu Battle Orders (eRep)
// @version        1.02
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/ru
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.erespublika.ru/forum/index.php/topic,2006.0.html',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('class="inner".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var orders = tags[0];
			var region = tags[1];
			var link = tags[2];
			var date_issued = tags[3];
			
			if(link.indexOf('>') != -1) {
					link = link.substring(link.indexOf('>') + 1, link.length - 5); // с расчетом, что в конце строки есть </a>
			    }
					
			latest=document.getElementById('latestnews');

			params_el = document.createElement("h3");
			params_el.textContent = orders + ' ' + region;
            link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = link;
			
				

			updated_el=document.createElement("h4")
			updated_el.textContent ='Last update: ' + date_issued;

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(params_el, latest);
				latest.parentNode.insertBefore(updated_el, latest);	
				latest.parentNode.insertBefore(link_el, latest);
            }
			

		}	
		}
	);
