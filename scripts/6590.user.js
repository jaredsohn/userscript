// ==UserScript==
// @name           Blenderartists: User info on the side in thread view
// @description    Puts user info on the side of posts in the thread view, rather than on the top
// @include        http://blenderartists.org/forum/showthread.php*
// @include        http://blenderartists.org/forum/showpost.php*
// ==/UserScript==

// This has to be complicated to avoid selecting quote boxes
userTds = document.evaluate(
    "//table[@class = 'baorgpost']//td[@class = 'profile']/ancestor::td",
    document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// This loop moves the user info table cells down a couple of rows, into
// the same row as the post text, and rearranges the inner table to be
// vertical.
// It also makes the footer row of each post span 2 columns, to accomodate
// the new cell in the post text row.
for (var i = 0; i < userTds.snapshotLength; i++) {
	td = userTds.snapshotItem(i);

	parent = td.parentNode;
	parent.removeChild(td);

	//remove text
	sibling = parent.nextSibling;
	sibling.parentNode.removeChild(sibling);
	//remove tr
	sibling = parent.nextSibling;
	sibling.parentNode.removeChild(sibling);
	//remove text
	sibling = parent.nextSibling;
	sibling.parentNode.removeChild(sibling);

	//insert td in the same row as post text
	sibling = parent.nextSibling;
	sibling.insertBefore(td, sibling.firstChild);

	//make the post footer span 2 columns
	sibling = sibling.nextSibling; //this will be text
	sibling = sibling.nextSibling;
	footer = sibling.getElementsByTagName("td")[0];
	footer.colSpan = 2;

	//remove original tr
	parent.parentNode.removeChild(parent);

	//now fix the inner table

	table = td.getElementsByTagName("table")[0];
	row = table.getElementsByTagName("tr")[0];
	cells = row.getElementsByTagName("td");

	//if there's an image cell, get it first
	if(cells.length >= 4) imageCell = row.removeChild(cells[0]);
	else imageCell = null;

	nameCell = row.removeChild(cells[0]);
	row.removeChild(cells[0]);
	detailCell = row.removeChild(cells[0]);

	row.style.backgroundColor = "inherit";

	if(imageCell) {
		newRow = row.cloneNode(false);
		newRow.appendChild(imageCell);
		table.appendChild(newRow);
		imageCell.style.padding = "5px";
	}

	newRow = row.cloneNode(false);
	newRow.appendChild(detailCell);
	table.appendChild(newRow);
	detailCell.style.padding = "5px";
	detailCell.noWrap = false;

	row.appendChild(nameCell);
	nameCell.style.padding = "5px";

	table.style.width = "110px";
	table.style.backgroundColor = "inherit";

	td.className = "profile"; //so the whole profile area is styled the same
	td.style.backgroundColor = "inherit";
	td.style.width = "110px";
	td.style.padding = "0px";
	td.style.verticalAlign = "top";
	td.style.borderRight = "solid 1px grey";
}

// Select advertisement cells and make them span 2 columns
userTds = document.evaluate(
    "//table[@class = 'baorgpost']/tbody/tr/td/div/iframe/../..",
    document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < userTds.snapshotLength; i++) {
	td = userTds.snapshotItem(i);

	td.colSpan = 2;
	td.style.borderBottom = "solid 1px grey";
}

