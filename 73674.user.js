// ==UserScript==
// @name           SOC Mass Delete Campaigns
// @namespace      http://www.sendasmile.net
// @description    Provides an easy mechanism to delete multiple campaigns at one time instead of one at a time.

// @include        https://www.sendoutcards.com/campaign/list/*

// @author        Blaine Moore #74039
// @homepage      http://www.SendASmile.net/ 
// @version       2.0

// ==/UserScript==

/* ******************************************************** */
//                  User Options
/* ******************************************************** */
	GM_registerMenuCommand( "Delete All Checked Campaigns", DeleteChecked);
/* ******************************************************** */


//Generic lookup fuction for scraping a site
function xpath(query) {
 return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function AddCheckBoxes() {
	var dlinks = xpath("//a[@title='Remove this campaign']");
	for (var i=0 ; i<dlinks.snapshotLength; i++) {
		var node = dlinks.snapshotItem(i);
		var cb = document.createElement("input");
		cb.className = 'delete-me-checkbox';
		cb.title = 'Check this box to delete this campaign.';
		cb.type = 'checkbox';
		cb.value = /delete_campaign."(.+)"/.exec(node.href)[1];
		node.parentNode.insertBefore(cb, node);
	} // for (var i=0 ; i<cbs.snapshotLength; i++)
	
	// ----------- \\
	var deleteLink = xpath("//div[@class='thirty fLeft']").snapshotItem(0);

	var br = document.createElement("br");
	deleteLink.appendChild(br);
	br = document.createElement("br");
	deleteLink.appendChild(br);

	var aLink = document.createElement("a");
	aLink.href = "#";
	aLink.setAttribute("class","soc_button");
	aLink.innerHTML = "Delete Selected Campaigns";
	aLink.addEventListener("click", DeleteChecked, true);
	deleteLink.appendChild(aLink);		
	// ----------- \\

} // AddCheckBoxes()

function DeleteChecked() {
	var dBoxes = xpath("//input[@class='delete-me-checkbox']");
	var totalDeleted = 0;
	for (var i=0 ; i<dBoxes.snapshotLength; i++) { if(dBoxes.snapshotItem(i).checked) totalDeleted++; }
	if(confirm('Do you really want to delete ' + totalDeleted + ' checked campaign' + ((1==totalDeleted)?'?':'s?'))) {
		document.body.style.cursor='wait';
		var ch3 = xpath("//h3").snapshotItem(0);
		ch3.innerHTML = '<blink style="color:red;">Deleting Campaigns...</blink>';
		for (var i=0 ; i<dBoxes.snapshotLength; i++) {
			var node = dBoxes.snapshotItem(i);
			//node.checked = !node.checked;
			if(node.checked) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'https://www.sendoutcards.com/campaign/delete/' + node.value + '/'
				});
				GM_log("Box " + node.value + ": " + node.checked);
			} // if(node.checked)
		} // for (var i=0 ; i<dBoxes.snapshotLength; i++)
		window.setTimeout(function() {document.body.style.cursor='auto'; window.location.reload();},5500);
	} // if(confirm('Do you really want to delete all checked campaigns?'))
} // DeleteChecked()

AddCheckBoxes();