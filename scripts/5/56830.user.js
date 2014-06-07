// ==UserScript==
// @name           eGR_battle_orders_demo
// @namespace      www.erepublik.com
// @description    eGR_battle_orders_demo
// @version        0.11
// @include        http://www.erepublik.com/en
// @include        http://www2.erepublik.com/en
// @include        http://www.erepublik.com/es
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://egreecebo.forumotion.com/portal.htm',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('class="body".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var general = tags[0]
			var link2 = tags[1];
			var orders = tags[2];
			var region = tags[3];
			var link = tags[4];
			var date_issued = tags[5];

			latest=document.getElementById('latestnews');
			
			link2_el = document.createElement("a"); 
			link2_el.setAttribute('href',link2);
			link2_el.innerHTML = general;

			params_el = document.createElement("h");
			params_el.textContent = orders

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = region;

			updated_el=document.createElement("h")
			updated_el.textContent = date_issued;

			empty1 = document.createElement("h3");
			empty1.textContent = ' ';

			empty2 = document.createElement("h3");
			empty2.textContent = ' ';
			
			empty3 = document.createElement("h3");
			empty3.textContent = ' ';

			empty4 = document.createElement("h3");
			empty4.textContent = ' ';

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented	
		latest.parentNode.insertBefore(link2_el, latest);    
		latest.parentNode.insertBefore(empty1, latest);          
		latest.parentNode.insertBefore(params_el, latest);
		latest.parentNode.insertBefore(empty2, latest); 
		latest.parentNode.insertBefore(link_el, latest);
		latest.parentNode.insertBefore(empty3, latest); 
                latest.parentNode.insertBefore(updated_el, latest);
		latest.parentNode.insertBefore(empty4, latest);	
            }
		}	
		}
	);