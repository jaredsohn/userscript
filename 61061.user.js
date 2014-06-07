// ==UserScript==
// @name           bw_ORDERS_ek9
// @namespace      bw_ORDERS_ek9
// @description    bw_ORDERS_ek9
// @include        http://www*.erepublik.com/*
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://egermany.itg-em.de/ede/viewtopic.php?f=48&t=2573#p23780',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('<div class="content".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var orders1 = tags[0];
			var link = tags[1];
			var date_issued = tags[2];

			latest=document.getElementById('latestnews');

			header = document.createElement("h2");
			header.textContent = 'IX. Expeditionskorp: ';
			
			order1 = document.createElement("i");
			order1.textContent = orders1;
			
			space1 = document.createElement("h2");
			space1.textContent = '  ';
			
			space2 = document.createElement("h2");
			space2.textContent = '  ';

			links = document.createElement("a"); 
			links.setAttribute('href',link);
			links.innerHTML = link;

			updated=document.createElement("small")
			updated.textContent = date_issued;

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(header, latest);
				latest.parentNode.insertBefore(order1, latest);
				latest.parentNode.insertBefore(space1, latest);
				latest.parentNode.insertBefore(links, latest);
				latest.parentNode.insertBefore(space2, latest);
				latest.parentNode.insertBefore(updated, latest);
            }
		}	
		}
	);