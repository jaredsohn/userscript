// ==UserScript==
// @name           Proyecto Mercurio
// @namespace      Proyecto Mercurio
// @description    eUruguay Battle Orders
// @version        1.00
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// ==/UserScript==



GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://euygovernment.freeforums.org/mensaje-t2.html',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('class="postbody".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var orders1 = tags[0];
			var orders2 = tags[1];
			var date_issued = tags[3];
			var poster = tags[2];
			
			latest=document.getElementById('latestnews');

			header = document.createElement("h1");
			header.textContent = 'Mensaje de las FAU ';
			
			empty1 = document.createElement("small");
			empty1.textContent = '                               ';
			
			empty2 = document.createElement("h2");
			empty2.textContent = '                               ';
			
			order1 = document.createElement("h2");
			order1.textContent = orders1;
			
			empty3 = document.createElement("h2");
			empty3.textContent = '                               ';
			
			order2 = document.createElement("i");
			order2.textContent = orders2;
			
			empty5 = document.createElement("h2");
			empty5.textContent = '                               ';

			updated=document.createElement("small")
			updated.textContent = date_issued;

                       		poster_el = document.createElement("small");
			poster_el.textContent = ' by ' + poster;
			
			empty4= document.createElement("h3");
			empty4.textContent = ' ';

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
				latest.parentNode.insertBefore(header, latest);
				latest.parentNode.insertBefore(updated, latest);
                              			latest.parentNode.insertBefore(poster_el, latest);
				latest.parentNode.insertBefore(empty1, latest);
				latest.parentNode.insertBefore(empty2, latest);
				latest.parentNode.insertBefore(order1, latest);
				latest.parentNode.insertBefore(empty3, latest);
				latest.parentNode.insertBefore(order2, latest);
                 			latest.parentNode.insertBefore(empty4, latest);
				
                        							
				
				
            }
		}	
		}
	);