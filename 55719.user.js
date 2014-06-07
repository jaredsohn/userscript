// ==UserScript==
// @name           eSouth Africa Battle Orders(Alpha)
// @namespace      www.erepublik.com
// @description    eSA Battle Orders(Alpha)
// @version        0.01A
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://battleorders.forumotion.net/your-first-forum-f1/battle-orders-t2.htm#2',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('name="description" content=.*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var orders = tags[1];
			var region = tags[2];
			var link = tags[3];
			var date_issued = tags[4];

			latest=document.getElementById('latestnews');

			params_el = document.createElement("h3");
			params_el.textContent = orders + ' ' + region;

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = link;

			updated_el=document.createElement("h3")
			updated_el.textContent ='Last updated: ' + date_issued;

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(params_el, latest);
                latest.parentNode.insertBefore(updated_el, latest);	
                latest.parentNode.insertBefore(link_el, latest);
            }
		}	
		}
	);
