// ==UserScript==
// @name           Orders of eDanes (eRepublik)
// @namespace      www.erepublik.com
// @description    Orders of eDanes, eDenmark (eRepublik)
// @version        1.00
// @include        http://www.erepublik.com/en
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://creampieunit.darkbb.com/obavestenja-f2/obavestenje-t1.htm',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match(/google_ad_section_start -->(.+)<!--/gm);
            order_string = order_string[1].replace('google_ad_section_start -->', '');

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