// ==UserScript==
// @name           eIR Gov Orders (eRep)
// @namespace      www.erepublik.com
// @description    eIR Gov Orders (eRep)
// @version        1
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// @include        http://www2.erepublik.com/en
// @include        http://www2.erepublik.com/es
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://eiran-mod.blogspot.com/2009/09/blog-post.html',

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

			latest=document.getElementById('latestnews');
			
div_el = document.createElement("div");
div_el.setAttribute('style','background-color:#EEFFDB;padding:5px;border:solid 2px #72ab38');
			
			params_el = document.createElement("h3");
			params_el.setAttribute('dir','rtl');
			params_el.setAttribute('align','right');
			params_el.textContent = orders + ' ' + region;

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = link;

			updated_el=document.createElement("h3");
			updated_el.setAttribute('dir','rtl');
			updated_el.setAttribute('align','right');
			updated_el.textContent ='آخرین بروزرسانی : ' + date_issued;

brelm=document.createElement("br");
brelm2=document.createElement("br");


            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
            div_el.appendChild(params_el);
            div_el.appendChild(updated_el);
            div_el.appendChild(link_el);
            div_el.appendChild(brelm);
            div_el.appendChild(brelm2);
            
              //  latest.parentNode.insertBefore(params_el, latest);
              //  latest.parentNode.insertBefore(updated_el, latest);	
              //  latest.parentNode.insertBefore(link_el, latest);
              //  latest.parentNode.insertBefore(brelm, latest);
               latest.parentNode.insertBefore(div_el, latest);
            }
		}	
		}
	);
