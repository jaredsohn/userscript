// ==UserScript==
// @name           Minecraft Serverlist Sorter
// @namespace      http://w-shadow.com/
// @description    Sorts the Minecraft serverlist by the number of players or by server name
// @include        http://minecraft.net/servers.jsp
// @include        http://www.minecraft.net/servers.jsp
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function($){

	function sortByPlayers(){
	
		//Get the serverlist
		var node = $('#content p:first'); 
		//Find all servers and save them in an array
		var servers = []; 
		var re = /(<a\s+.+?<\/a>\s*(\d+)\/(\d+))/gi;
		while ( matches = re.exec( node.html() ) ){
			servers.push(matches); 
		}
		
		//Sort by the number of players
		servers.sort(function(a,b){
			return parseInt(b[2]) - parseInt(a[2]);
		})
		
		//Generate the new html
		var html = '<br>';
		for ( var i = 0; i < servers.length; i++ ){
			html = html + servers[i][0] + '<br>\n';
		}
		
		//Replace the old serverlist with the sorted one
		node.html(html);
	}
	
	function sortByName(){
		//Get the serverlist
		var node = $('#content p:first'); 
		
		//Define some regexps to sanitize server names (for better sorting)
		var specChars = /^([^a-zA-Z0-9]+)/gi;
		var htmlentities = /&[a-z0-9]+;/gi;
		var clanTags = /\[.*?\]/g;
		
		//Find all servers and save them in an array
		var servers = []; 
		var re = /<a.+?>\s*<b>(.+?)<\/b>\s*<\/a>\s*\d+\/\d+/gi;
		while ( matches = re.exec( node.html() ) ){
			//Generate a sanitized version of the server name (remove special characters and the like)
			var stripped = matches[1].replace(htmlentities,'').toUpperCase();
			stripped = stripped.replace(clanTags, '');
			stripped = stripped.replace(specChars, '');
			 
			servers.push( [matches[0], stripped] );
		}
		
		//Sort by the server name
		servers.sort(function(a,b){
			if ( a[1] < b[1] ){
				return -1;
			} else if ( a[1] > b[1] ){
				return 1;
			} else {
				return 0;
			}
		})
		
		//Generate the new html
		var html = '<br>';
		for ( var i = 0; i < servers.length; i++ ){
			html = html + servers[i][0] + '<br>\n';
		}
		
		//Replace the old serverlist with the sorted one
		node.html(html);
	}
	
	//Display the sorting options
	$('#content h2:first').after('<div style="float:right;">'+
		'<a href="javascript:void(0)" id="sort-by-players">Sort by players</a> | '+
		'<a href="javascript:void(0)" id="sort-by-name">Sort by name</a>'+
		'</div>');
	
	//Attach the appropriate sort function to each link
	$('#sort-by-players').click(sortByPlayers);
	$('#sort-by-name').click(sortByName);
	
	//Sort by the number of players by default
	sortByPlayers();
})(jQuery);