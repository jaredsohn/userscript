// ==UserScript==
// @name           View BP in Starlog
// @namespace      http://unidomcorp.com
// @description    Will grab BP info and display it within the starlog when View is clicked.
// @include        http://*.war-facts.com/starlog.php*
// ==/UserScript==

/* Greasemonkey 20080112 workaround */
function wrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}
/* End of workaround */

unsafeWindow.ToggleBPView = function(bpID) {
	var thisBP = document.getElementById("View_"+bpID);
	
	if ( thisBP.style.display == 'none' ) {
		thisBP.style.display = 'block';
	} else {
		thisBP.style.display = 'none';
	}
}

window.PrintBP = function(bpID, text) {
	var td = document.getElementById(bpID);
	td.innerHTML += text;
}

window.WF_ViewBPinStarlog_onload = wrap(function() {
	
	var projects = document.evaluate("//a[text() = 'View']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for ( var i=0 ; i < projects.snapshotLength; i++ ) {
		var projectMsg = projects.snapshotItem(i).parentNode.parentNode;
		var projectLinks = projects.snapshotItem(i).parentNode;
		var linkText = projectLinks.lastChild;
		var bpID = projects.snapshotItem(i).href.match(/viewid=(\d+)/)[1];
		projectMsg.setAttribute("id", bpID);
		//projects.snapshotItem(i).href='javascript:void(0)';
		projects.snapshotItem(i).setAttribute("onClick", "javascript:ToggleBPView('"+bpID+"');return false;");
		// Archive and Delete Links
		var archiveLink = document.createElement('a')
		archiveLink.href = 'http://www.war-facts.com/blueprints.php?invcount=1&archive=1&archiveid1='+bpID;
		archiveLink.innerHTML = "Archive";
		var deleteLink = document.createElement('a')
		deleteLink.href = 'http://www.war-facts.com/blueprints.php?invcount=1&delete=1&deleteid1='+bpID;
		deleteLink.innerHTML = "Delete";
		projectLinks.insertBefore(document.createTextNode(" | "),linkText);
		projectLinks.insertBefore(archiveLink,linkText);
		projectLinks.insertBefore(document.createTextNode(" | "),linkText);
		projectLinks.insertBefore(deleteLink,linkText);
		
		var bpText = GM_getValue(bpID);
		if ( !bpText ) {
		  GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://'+window.location.hostname+'/extras/blueprint.php?bp='+bpID,
				onload: function(responseDetails) {
					var text=responseDetails.responseText.match(/<table align=center>([^]+?)<\/body>/)[1]
					var text = text.replace(/\n/g,"").replace(/\s\s/g," ");
					var bpID = text.match(/\[#(\d+)\]/)[1];
					text = "<table width='99%' id='View_"+bpID+"' style='background-color: black; display: none;' align='center'>"+text;
					GM_setValue(bpID, text);
					window.PrintBP(bpID, text);
				}
			});
		} else {
			window.PrintBP(bpID, bpText);
		}
	}
});

window.addEventListener("load", window.WF_ViewBPinStarlog_onload, false);