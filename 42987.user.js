// ==UserScript==
// @name           Squirrelmail Select
// @namespace      Sudharsan R.
// @description    Utility buttons. "Dups" will try to select duplicate emails. This was done specifically because of many duplicate emails from bugzilla. "Toggle After" is to select mails after the first selected one. This helps in selecting older emails and deleting them etc. "Toggle Unread" is self-explanatory
// @include        */src/right_main.php*
// @include        */src/search.php*
// @version	   0.1
// ==/UserScript==


bs_selectunread = function () {

	var rows = document.evaluate("//tr[td/input[@type='checkbox']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < rows.snapshotLength; i++) {
		var r = rows.snapshotItem(i);
	//	alert(r.getElementsByTagName("td")[1].getElementsByTagName("label")[0]);
		var label = r.getElementsByTagName("td")[1].getElementsByTagName("label")[0];
		
		if( label.getElementsByTagName("b").length > 0 ) {
			// Bolded text
			var inp = r.getElementsByTagName("input")[0];
			inp.checked = !inp.checked;
		}
	}
	//alert("A "+rows.snapshotLength);
	return false;
}

bs_toggle_after = function() {
	var rows = document.evaluate("//tr[td/input[@type='checkbox']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var started = false;
	for (var i = 0; i < rows.snapshotLength; i++) {
		var r = rows.snapshotItem(i);
		var inp = r.getElementsByTagName("input")[0];
		if( started == false && inp.checked ) {
			started = true;
		} else if( started ) {
			inp.checked = !inp.checked;
		}
	}
	return false;
}

bs_mark_dupes = function() {
	var rows = document.evaluate("//tr[td/input[@type='checkbox']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var dict = new Object();
	var message = "";
	var dups_button = document.evaluate("//input[@name='bs_mark_dupes']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if( dups_button.snapshotLength > 0 ) {
                dups_button.snapshotItem(0).setAttribute("value","Dups");
	}
	var found = false;
	for (var i = 0; i < rows.snapshotLength; i++) {
		var r = rows.snapshotItem(i);
		var inp = r.getElementsByTagName("input")[0];
		var subject = r.getElementsByTagName("td")[4].getElementsByTagName("a")[0].text; // childNodes[0];
		var sender = r.getElementsByTagName("td")[1].getAttribute("title"); 
		var timestamp = null;
		if( r.getElementsByTagName("td")[2].getElementsByTagName("b").length > 0 ) {
			timestamp = r.getElementsByTagName("td")[2].getElementsByTagName("b")[0].childNodes[0].nodeValue; // unread mail.. So there should be a bold tag
		} else {
			timestamp = r.getElementsByTagName("td")[2].childNodes[0].nodeValue; // timestamp directly under td; read mail 
		}
		var key = subject + sender + timestamp;
		if( dict[key] == null ) {
			//message = message + "\n" + key ;
			dict[key] = 1;
		} else {
			inp.checked = true;
			found = true;
			// ignored ...
	//		message = message + "\n" + key;
		}
	}
	if( !found && dups_button.snapshotLength > 0 ) {
		dups_button.snapshotItem(0).setAttribute("value","!Dup");
	}
	//alert(message);
	return false;
}



function bs_addselectunread_hook() {
	//var searchOlder = "//a[@name='bs_select_unread']";
	var searchOlder = "//input[@name='bs_select_unread']";

	var customLink = document.evaluate(searchOlder, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( customLink.snapshotLength < 1 ) {
		//alert('Not found');
		var inputs = document.evaluate("//input[@value='Forward']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < inputs.snapshotLength; i++) {
		// WE SHOULD HAVE FOUND ONLY ONE ELEMENT
		//alert('Input found ');
			//alert(inputs.snapshotItem(i));
			var input = inputs.snapshotItem(i);
	/*
			var newLink = document.createElement("a");
			newLink.href = "#";
			newLink.addEventListener("click" , bs_selectunread, false);
			newLink.name = "bs_select_unread";
			newLink.appendChild(document.createTextNode("Toggle Unread"));
			input.parentNode.insertBefore(newLink, input.nextSibling);
	*/
			var newButton = document.createElement("input");
			newButton.type = "button";
			newButton.name = "bs_select_unread";
			newButton.value = "Toggle Unread";
			newButton.addEventListener("click" , bs_selectunread, false);
			input.parentNode.insertBefore(newButton, input.nextSibling);

			var toggleAfterButton = document.createElement("input");
            toggleAfterButton.type = "button";
            toggleAfterButton.name = "bs_toggle_after";
            toggleAfterButton.value = "Toggle After";
            toggleAfterButton.addEventListener("click" , bs_toggle_after, false);
            input.parentNode.insertBefore(toggleAfterButton, input.nextSibling);

			var markDupes = document.createElement("input");
            markDupes.type = "button";
            markDupes.name = "bs_mark_dupes";
            markDupes.value = "Dups";
            markDupes.addEventListener("click" , bs_mark_dupes, false);
            input.parentNode.insertBefore(markDupes, input.nextSibling);
		}
	}
}

// apply
bs_addselectunread_hook();

// end user script


