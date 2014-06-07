// ==UserScript==
// @name        TL-browse by hidensity
// @description Removes link underlines and/or replaces spaces in release names with dots on browsepage on TL
// @include     http://www.torrentleech.org/browse.php*
// ==/UserScript==

/* Script version: 2009-12-01 */


(function() {
		
		//====== SETTINGS START ======

		//change to true if you want spaces in torrent names replaced with dots, default false.
		var do_replace = false; 

		//change to false if you dont want to remove underlines, default true.
		var do_remove = true; 
		
		//====== SETTINGS END ======


		var b_nodes = document.getElementsByTagName('b'); //find all b-nodes (mostly torrent links)
		var loops = b_nodes.length; //how many do we have?
		
		//looping torrents
		var i=0;
		for (i=2; i<=loops; i++) //start the loop
		{
			var current_node = b_nodes[i]; //pick out the current node
			if (do_replace)
			{
				var torrent_name = current_node.innerHTML; //save the release text
				torrent_name = torrent_name.replace(/ /g,"."); //replace spaces with dots
				current_node.innerHTML = torrent_name; //switch on page
			}
			if (do_remove)
			{
				var link_node = current_node.parentNode; //find torrent link
				if (link_node.nodeName == "A") //if parent node is a link
				{
					var align_value = link_node.parentNode.getAttribute('align'); //get align value of parent td
					if (align_value == "left") //if align is left we are in the right place
					{
						link_node.setAttribute('style','text-decoration:none'); //remove underline
					}
				}
			}
		}
})();