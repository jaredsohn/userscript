// ==UserScript==
// @name           SweClockers Forum show registered date next to posts
// @namespace      http://henrik.nyh.se
// @description    Show registered date of user next to posts. Idea blatantly stolen from Sim: http://forum.sweclockers.com/showthread.php?s=&threadid=504436
// @include        http://forum.sweclockers.com/showthread.php?*
// ==/UserScript==

	// Get all comment nodes
	c = document.evaluate("//comment()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    
	for (var i = 0; i < c.snapshotLength; i++) {  // Loop through nodes
		node = c.snapshotItem(i);  // This node
		s = node.data;  // Its contents
	    
		if (s.indexOf('Registrerad:') != -1)  // If this is a registration comment 
			node.parentNode.innerHTML = node.parentNode.innerHTML.replace('<font', s + '<br /> <font');  // Insert its contents into the info
	    
   }
