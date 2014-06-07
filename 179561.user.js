// ==UserScript==
// @name        Enhanced Yuletide sign-up summary
// @namespace   kimira.dreamwidth.org
// @description Makes table sortable and adds offers/requests ratio column
// @include     http://archiveofourown.org/collections/yuletide2013/signups/summary
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.10.8/jquery.tablesorter.min.js
// ==/UserScript==

function addColumn(tblId)
// the base addColumn code is from http://www.mredkj.com/tutorials/tableaddcolumn.html; alterations mine
{
    var offered = document.querySelectorAll('TD SPAN.offered');
    var requested = document.querySelectorAll('TD SPAN.requested');
    
	var tblHeadObj = document.getElementById(tblId).tHead;
	for (var h=0; h<tblHeadObj.rows.length; h++) {
		var newTH = document.createElement('th');
		tblHeadObj.rows[h].appendChild(newTH);
		newTH.innerHTML = 'O/R';
	}

	var tblBodyObj = document.getElementById(tblId).tBodies[0];
	for (var i=0; i<tblBodyObj.rows.length; i++) {
		var newCell = tblBodyObj.rows[i].insertCell(-1);
		var ratio = parseFloat(offered.item(i).innerHTML) / parseFloat(requested.item(i).innerHTML);
		newCell.innerHTML = ratio.toFixed(3);
	}
}

$(function(){
    addColumn("challenge_summary");
    $("#challenge_summary").tablesorter();
});