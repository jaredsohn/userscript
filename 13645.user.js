// ==UserScript==
// @name           DirectAdmin QuickDomains
// @namespace      http://juhani.naskali.net/files/gm/
// @description    Adds links to quickly switch between domains in DirectAdmin (user class)
// @version    0.2
// @date        2007-11-06
// @include        http://www.directadmin.com:2222/*
// ==/UserScript==

// Read cookie
function get_Cookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// If at root (selecting domain - Doesn't check for single domain accounts)
if(window.location.pathname == "/") { 
	var anchors = document.getElementsByTagName('a');
	var domains = "";
	for (i = 0; i < anchors.length; i++)
		if(anchors[i].getAttribute("class") == "list" )
			domains += "\\" + anchors[i].getAttribute("href");
		
	// Set a cookie with the domain links
	document.cookie = 'DAdomains=' + domains + ';';
	
} else if(window.location.pathname == "/CMD_SHOW_DOMAIN") { // Print link list if we're at the main screen
	// Set a cookie with the current domain
	document.cookie = 'DAcurrentdomain=' + location.href + ';';
		
	
	// get TD elements
	var tdWhites = document.getElementsByTagName('td');
	
	// Set index to first  td with the class 'white'
	for (index = 0; index < tdWhites.length && tdWhites[index].getAttribute("class") != "white"; index++);
	
	// If we found the right td (Currently the winner is number 19. I'm hoping this will change with layout/style updates... definetly not the ideal solution)
	if(index < 20) {
	
	//if(index < tdWhites.length) { // At least check that there was one 'white'

		// Add div
		tdWhites[index].appendChild(document.createElement('div'));
		var newDiv = tdWhites[index].lastChild
		newDiv.setAttribute('style',"margin: 40px 10px 10px 20px;");
		
		// Add title
		newDiv.appendChild( document.createElement('b') );
		newDiv.lastChild.setAttribute('style','font-size: 10pt; cursor: default;');
		newDiv.lastChild.appendChild( document.createTextNode('Change Domain') );
		newDiv.appendChild( document.createElement('hr') );
		newDiv.lastChild.setAttribute('style','height: 2px; border: none; border-bottom: 2px dotted #5f7e9b');
	
		// Read cookie data
		var cooky = get_Cookie('DAdomains');	
		var links = cooky.split('\\');
		
		// Parse and write all links (ignore first split, which is empty)
		for(var i=1;i < links.length;i++) {
			var link = links[i];
			var domain = link;
			
			// Resolve domain from url
			while (domain.charAt(0) != '=') domain = domain.substring(1,domain.length);
			domain = domain.substring(1,domain.length);
			
			// Create link
			var newLink = document.createElement('a');
			newLink.setAttribute('href',link);
			newLink.setAttribute('style',"color: #eee;");
			newLink.appendChild( document.createTextNode(domain) );
			
			// Printout
			newDiv.appendChild(newLink);
			newDiv.appendChild(document.createElement('br'));
		}

	
	} // ENDIF Found TD



	
} else { // Not on main page, just rewrite the home link
	

	//Read current domain from cookie
	var cooky = get_Cookie('DAcurrentdomain');

	
	//Change links to mainpage
	var anchors = document.getElementsByTagName('a');

	for (i = 0; i < anchors.length; i++)
		if(anchors[i].getAttribute("href") == "/" )
			anchors[i].setAttribute('href',cooky)
	

}