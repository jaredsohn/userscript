// ==UserScript==
// @name			Twitter follower sorter
// @namespace		twitter
// @description		Sorts your followers by whether or not you follow them (helps finding spammers)
// @include			http://twitter.com/followers*
// ==/UserScript==
function followerSort(a, b) {
  	a = a.following ? 1 : 0;
  	b = b.following ? 1 : 0;
	return (a-b);
}

function createSplitRow(text) {
	splitrow = document.createElement('tr');
	splittd = document.createElement('td');
	splittd.setAttribute('colspan', '4');
	splittd.style.textAlign = 'center'; 
	splittd.style.backgroundColor = '#94e4ff'; //'#33CCFF';
	splittd.innerHTML = '<b>' + text + '</b>';
	splitrow.appendChild(splittd);
	return splitrow;
}


//'followers-table'
followerTable = document.getElementsByTagName('table')[0];
followerTableBody = followerTable.getElementsByTagName('tbody')[0];
followerTableRows = followerTableBody.getElementsByTagName('tr');

// after trial and error it seems removing them backward is the only way it works.
// also you cannot assign into an array from the function getElementsByTagName
NewTableRows = new Array();
for (i = followerTableRows.length - 1; i >= 0 ; i-- ) {
	// remove and preserve row
	followerTableRow = followerTableRows[i].parentNode.removeChild(followerTableRows[i]);
	following = !(followerTableRow.innerHTML.indexOf('followPerson') > 0);
	followerTableRow.following = following;
	
	followerTableRow.className = followerTableRow.className + (following ? ' following' : '');

	NewTableRows[i] = followerTableRow;
}

followerTableRows = Array.sort(NewTableRows, followerSort);

following = followerTableRows[0].following;
oldfollowing = followerTableRows[0].following;

followerTableBody.appendChild(createSplitRow("You are not following these people"));
for (i = 0; i < followerTableRows.length; i++) {
	following = followerTableRows[i].following;
	if (following != oldfollowing) {
		followerTableBody.appendChild(createSplitRow("You are following these people"));
	}
	oldfollowing = following;	
	followerTableBody.appendChild(followerTableRows[i]);
}

