// ==UserScript==
// @name           Ordres de bataille
// @namespace      Original scripter : http://www.erepublik.com/en/referrer/Publius
// @description    eFR Battle Orders (eRep)
// @include        http://ww*.erepublik.com/en
// @include        http://ww*.erepublik.com/es
// @include        http://ww*.erepublik.com/de
// @include        http://ww*.erepublik.com/fr
// @include        http://ww*.erepublik.com/pt
// @include        http://ww*.erepublik.com/ru

// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://forum.erepublik.fr/viewtopic.php?f=245&t=8854',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('class="inner".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var order = tags[0];
			var region = tags[1];
			var link = tags[2];
			var date_issued = tags[3];

			latest=document.getElementById('latestnews');

			params_el = document.createElement("h3");
			params_el.textContent = Order + ' ' + region;

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