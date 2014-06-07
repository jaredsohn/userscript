// ==UserScript==
// @name          moviepilot-api
// @namespace     moviepilot
// @description   improves the moviepilot website by making use of the moviepilot api, jquery and greasemonkey
// @include       http://*moviepilot.de/movies/*
// @version				0.03
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
    	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    	else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
			// defining some variables
			var MoviePilot = {
				apiresources: ["movies","people"],
				// request a key via mail api@moviepilot.de
				apikey: "48c02d7372acd185d1b82e2d51a8ad"  
			}
			// checking for preferences 
			if (MoviePilot.apikey=="") {alert("apikey missing");}
			else { 
				ui_improvements();
				if (checkforjson()) { 
					getApiItem(getResourceUrl());
				}				
			}
			// some ui improvements
			function ui_improvements() {
				$('#before_content_block_with_sidebar').hide();
				$('div#header-nav>ul:last').append(' <li class="header-submenu"> \
						<a> \
							<span>api</span> \
						</a> \
						<div> \
							<ul> \
								<li> \
									<a target="_blank" href="http://wiki.github.com/moviepilot/moviepilot-API/">api-wiki</a> \
								</li> \
								<li> \
									<a target="_blank" href="http://groups.google.com/group/moviepilot-entwickler">mp-entwickler-mailingliste</a> \
								</li> \
							</ul> \
						</div> \
					</li>');
			}
			
			function add_menu(json)
			{
				console.log("adding menu");
				// what kind of resource?
				add_menu_for_movie(json);			
			}
			
			function add_menu_for_movie(moviejson) {
				add_menu_item('http://www.omdb.org/movie/'+moviejson.alternative_identifiers.omdb,moviejson.display_title + ' in omdb');
				if (moviejson.alternative_identifiers.imdb){
					add_menu_item('http://www.imdb.com/title/tt'+moviejson.alternative_identifiers.imdb,moviejson.display_title + ' in imdb');
				}	
				add_menu_item(getResourceUrl(),moviejson.display_title + ' als JSON object');
				add_menu_item(getNeighbourUrl(),moviejson.display_title + "'s neighbourhood");
				add_menu_item(getCastsUrl(),moviejson.display_title + "'s crew");
				
			}

			function add_menu_item(link,text){
				console.log($('div#header-nav>ul>li>div>ul'));
				$('div#header-nav>ul>li>div>ul:last').prepend('<li><a target="_blank" href="'+link+'">'+text+'</a></li>');
								
			} 
			
			function checkforjson()
			{
				if ($.inArray((location.pathname.split("/")[1]), MoviePilot.apiresources) >= 0) {
					console.log("api-resource available");
					return true;
				}
				
			}
			// looks like we a on a page which is avaible via api by looking for the first part 
			// of the pathname in the resources list
			function getResourceUrl() { return "http://"+location.href.split("//")[1].split("/").splice(0,3).join("/")+'.json?api_key='+MoviePilot.apikey;}
			function getNeighbourUrl() { return "http://"+location.href.split("//")[1].split("/").splice(0,3).join("/")+'/neighbourhood.json?api_key='+MoviePilot.apikey;}
			function getCastsUrl() { return "http://"+location.href.split("//")[1].split("/").splice(0,3).join("/")+'/casts.json?api_key='+MoviePilot.apikey;}


			
			function getApiItem (itemurl) {
			  return $.ajax({
			          type: "GET",
			          url: itemurl,
			          dataType: "json",
			           error: function(){
			             return false;
			         	},
			         	success: function(data){
			             add_menu(data);
			     			}
			   });
			}
    }