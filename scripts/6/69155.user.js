// ==UserScript==
// @name           NPC name in title
// @namespace      pardus.at
// @description    replaces 'NPC Opponent' with the name of the opponent taken from the location
// @include        http://*.pardus.at/main.php*
// @author         Ratchet Freak
// @version        2.0

// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////



// ////////////////////////////////////////////////////////////////////////
// Beginning of Code:
// ////////////////////////////////////////////////////////////////////////
function updateIt(first){
	var table = first ? document.getElementById('navarea') : document.getElementById('navtransition').firstChild;

	for(var i=0;i<rows.length;i++){
		var cells = rows[i].cells;
		for(var j=0;j<cells.length;j++){
			var img = cells[j].getElementsByTagName('img')[0];
			var title = img.getAttribute('title');
			if(title=='NPC Opponent'){
				title = img.src.substr(img.src.lastIndexOf('/')+1);
				title = title.substr(0,title.lastIndexOf('.'));
				title = title.replace(/_/g,' ');
				img.setAttribute('title', title);
			}
		}
	}
}
updateIt(true);

var local_updateNav = unsafeWindow.updateNav;
if(local_updateNav){
	unsafeWindow.updateNav = function(result){
		local_updateNav(result);
		updateIt(false);
	}
}
