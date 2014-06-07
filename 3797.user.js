// ==UserScript==
// @name          lulebo map link
// @namespace     tag:http://www.lulebo.se/Uthyrning/
// @description   Adds a link to eniro.se on lulebo.se search page so you can see on a map where the apartment is located.
// @include       http://www.lulebo.se/Uthyrning/*
// ==/UserScript==

// Erik Bystrom

function xpath(query, context) {
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function handleRow(row) {
	 var links = xpath("./td/a", row);
	 if (links.snapshotLength == 2) {
		  var link = links.snapshotItem(0);
		  var spacer = document.createElement("span");
		  var newlink = document.createElement("a");

		  spacer.innerHTML = "&nbsp;";

		  newlink.href = "http://kartor.eniro.se/query?streetname="+escape(link.innerHTML)+"%2C+lule%E5&what=map&asearch=1";
		  newlink.innerHTML = "(map)";
		  newlink.style.fontSize = "0.8em";

		  link.parentNode.appendChild(spacer);
		  link.parentNode.appendChild(newlink);
	 }
}

(function () {
	 var body = document.getElementsByTagName("body")[0];
	 var xresult = xpath("//TABLE[@id='tblSearch']", body);
	 for (var i=0; i<xresult.snapshotLength;i++) {
		  var table = xresult.snapshotItem(i);
		  var xrows = table.getElementsByTagName("tr");
		  for (var r=0;r<xrows.length;r++) {
				handleRow(xrows.item(r));
		  }
	 }
})();

