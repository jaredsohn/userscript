function () {
	var links = document.getElementsByTagName("a");
		
	for (i = 0; i < links.length; i++) {
		var node = links[i];
		var myLinks = node.getAttribute("href");
		var tag = node.getAttribute("onclick");
		
		if (tag) {
			if ( myLinks.toLowerCase().indexOf("callto") > -1 ) {
				node.innerHTML = "<img src='http://www.phonerlite.de/favicon.ico' border='0'> " + node.innerHTML;
				node.removeAttribute("onclick")
			}	// end if(tag)
		}	// end if(tag)
	} // end for loop
}