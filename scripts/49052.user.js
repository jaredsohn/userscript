// ==UserScript==
// @name           Show Pitchfork Ratings
// @namespace      http://pitchfork.com/
// @include        http://pitchfork.com/
// ==/UserScript==

var link_assoc = [];
window.addEventListener( "load", function(){

	var review_lists = document.body.getElementsByClassName( "review-list" );
	for( var i=0; i<review_lists.length; i++ ){
		
		var links = review_lists[i].getElementsByTagName( "a" );
		for( var x=0; x<links.length; x++ ){
		   
			link_assoc[links[x].href] = links[x];

			GM_xmlhttpRequest({
				method: 'GET',
				url: links[x].href,
				onload: function(data){
					try {
					
						var start = data.responseText.indexOf("large_rating");
						var end = data.responseText.indexOf("</", start);
						
						var rating = parseFloat( data.responseText.substring(start + 15, end) ) + "";
						    rating = (rating.indexOf( "." ) > -1 ) ? rating : (rating + ".0");
							
							
						var rating_label = document.createElement("span");
						    rating_label.style.fontSize = "8pt";
						    rating_label.style.color = ( parseFloat( rating ) > 7 ) ? "green" : "red";
						    rating_label.style.fontWeight = "bold";
						
		
						rating_label.appendChild(document.createTextNode(rating + " - "));
						link_assoc[data.finalUrl].parentNode.insertBefore(rating_label, link_assoc[data.finalUrl]);
					} 
					catch (e) {
						console.error(e );
					}
				}
			});			
		}
	}

}, false);