// ==UserScript==
// @name           Test Script
// @namespace      www.erepublik.com
// @description    Test Script
// @version        2.00
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/ru
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.erespublika.ru/forum/index.php',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('День.*?</a>');
            order_string = order_string.join("");   //Array->string

            var tags = order_string.split('<hr>');
			var orders = tags[0];
			var link = tags[1];

			if(orders.indexOf('<br />') != -1) {
			orders = orders.substring(0,orders.indexOf('<br />'));
			    }

			if(link.indexOf('>') != -1) {
					link = link.substring(link.indexOf('>') + 1, link.length - 4); // с расчетом, что в конце строки есть </a>
			    }
					
			latest=document.getElementById('latestnews');

			params_el = document.createElement("h3");
			params_el.textContent = orders;
            link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = link;
			
				


            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(params_el, latest);	
				latest.parentNode.insertBefore(link_el, latest);
            }
			

		}	
		}
	);