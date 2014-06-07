
// ==UserScript==
// @name            Flickrati
// @author          Manuel Gonzalez Noriega
// @namespace       http://www.simplelogica.net/cajondesastre/flickrati/
// @description     Check who's linking to your Flickr photos
// @license         Creative Commons Attribution License
// @version	        0.4
// @include         http://www.flickr.com/photos/*/*
// @include         http://flickr.com/photos/*/*
// @released        2006-11-08
// @updated         2006-06-20
// @compatible      Greasemonkey
// ==/UserScript==

/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/

(function(){


		// *****************************************************************************************
		// CONFIGURATION	
		// You'll need a Technorati API key. It's free, quick and painless. Get one at http://technorati.com/developers/apikey.html
		// Put your Technorati API key in the line below, between the quotes.
		var technorati_api_key = 'replace this with your own Techorati API key (see above)';

		// Change the max variable below to set the maximum amount of results you'd like to see
		var max = 5;
		// END OF CONFIGURATION.
		// You shouldn't need to make changes below this line
		// *****************************************************************************************


		if (technorati_api_key == 'replace_this_with_your_api_key') {
			alert('Flickrati script error: Get a Technorati API key at http://technorati.com/developers/apikey.html and edit the script to include it. Thank you!');
			exit;
		}
		
    //object constructor
    function flickrati_(){
				var d = document;	
				var url = String(window.location);

				// Let's try and get rid of those pesky /in/ stuff
				url = url.replace(/in\/.*$/g, '');

				var technorati_url = 'http://api.technorati.com/cosmos';
				
				var t_request = technorati_url+'?key='+technorati_api_key+'&url='+url+'&type=link';
        console.log(t_request);
				GM_xmlhttpRequest({
				    method: 'GET',
				    url: t_request,
				    headers: {
				        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey (http://www.simplelogica.net/cajondesastre/flickrati/)',
				        'Accept': 'application/atom+xml,application/xml,text/xml',
				    },
				    onload: function(responseDetails) {
					
				      var parser = new DOMParser();
				
							var xmlDoc = parser.parseFromString(responseDetails.responseText, "application/xml");
							var items = xmlDoc.getElementsByTagName('item');
							
							var item;
							var name;
							var url;
							
							var basket = new Array();
							
							var limit = (items.length > max) ? max : items.length;
							
							if (items.length > 0) {
								for (var i = 0; i < limit; i++) {
								 	item = items[i];
								 	name = item.getElementsByTagName('weblog')[0].getElementsByTagName('name')[0].textContent;
								 	url  = item.getElementsByTagName('linkurl')[0].textContent;

								 	basket.push(new Array(name,url));
						   	}
						
						   	if (basket.length > 0) {
									createLinks(basket, max, items.length);
							 	}
							 }
					
				    }
				});
				
				function createLinks(basket, max, total) {

					var li;
					var a;
					
					var d = document;
					var discuss_photo = document.getElementById('DiscussPhoto');					
				  var total_b = basket.length
					
					// create elements
					var h3 = d.createElement('h3');
					var div = d.createElement('div');
					var ul = d.createElement('ul');
					var p_credits = d.createElement('p');
					var a_technorati = d.createElement('a');
					a_technorati.setAttribute('href','http://technorati.com');	

					for (var i = 0; i < total_b; i++) {
						li = 	document.createElement('li');
						a  =  document.createElement('a');
						a.setAttribute('href',basket[i][1]);
						a.appendChild(document.createTextNode(basket[i][0]));
						li.appendChild(a);
						ul.appendChild(li);
					}

					// append children
				
					h3.appendChild(document.createTextNode('Who\'s linking?'));
					a_technorati.appendChild(d.createTextNode('Technorati'));
					p_credits.appendChild(d.createTextNode('Powered by '));
					p_credits.appendChild(a_technorati);
					
					div.appendChild(h3);
					div.appendChild(p_credits);
					div.appendChild(ul);

					if (total > max) {
						var p_more = d.createElement('p');
						var a_more = d.createElement('a');
						var a_more_text = d.createTextNode('And '+(total-max)+' more');
						a_more.setAttribute('href','http://technorati.com/search/'+escape(window.location));
						
						a_more.appendChild(a_more_text);
						p_more.appendChild(a_more);
						div.appendChild(p_more);
          }
	
					discuss_photo.insertBefore(div, discuss_photo.getElementsByTagName('h3')[0]);
					
				}

    };
    
    //instantiate and run 
    var flickrati_ = new flickrati_();


})();

