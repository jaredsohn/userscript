// ==UserScript==
// @name           Pokusaj
// @namespace      http://localhost/jbnisajt/proba.html
// @description    Pokusaj
// @version        1.00
// @include        http://localhost/jbnisajt/proba.html
// ==/UserScript==

GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'https://www.nacba.org/attorneyfinder/?q=90210',

		onload:function(response)
		{
var stringic=response.responseText;
var s1='<div class="name">';
var s2='</div>';
s1='http://www.nacba.org/attorneyfinder/images/markers/new'
s1='NACBA - National Association of Consumer';
var p1 = stringic.search(s1);
var p2 = stringic.search(s2);

var stri = stringic.substring(p1,p1+50);
//document.write(s1+' '+s2+' '+p1+' '+p2);


            //Retrieve and truncate string
			
			latest=document.getElementById('content');
        
			params_el = document.createElement("h3");
			params_el.innerHTML = stri;
			
			latest.parentNode.insertBefore(params_el, latest);
			

		}	
	}
);