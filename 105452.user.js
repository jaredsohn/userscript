// ==UserScript==
// @name		MTRed Time Localiser
// @version		1.52

// @match 		https://mtred.com/rewards.html
// @match 		https://www.mtred.com/rewards.html

// @match 		https://mtred.com/blocks.html
// @match 		https://www.mtred.com/blocks.html

// @match 		https://mtred.com/user/profile.html
// @match 		https://www.mtred.com/user/profile.html

// @match 		https://mtred.com/payout.html
// @match 		https://www.mtred.com/payout.html

// @namespace   toxicFork+cmrn
// ==/UserScript==

// I made the matches verbose so we dont have access to the page to change payment address

//Convert date function
function convertDate(oldDate) {
    if(oldDate.match(/^[0-9]+$/))
        d = new Date(oldDate*1000);
    else
        d = new Date(oldDate + " EST");
	suffix = "am";
	hours = d.getHours();
	if(hours > 12) {
		hours -= 12;
		suffix = "pm";
	}
	minutes = d.getMinutes();
	if(d.getSeconds() >= 30) {
		minutes++;
	}
	if(minutes<=9){
		minutes = "0"+minutes;
	}
	if(hours<=9){
		hours = "0"+hours;
	}
	return d.getDate()+"/"+(d.getMonth()+1)+"/"+(d.getFullYear().toString()).substring(2,4)+" "+hours+":"+minutes+suffix;
}

// Blocks found & My rewards pages
function fixGrid() {
	grid = document.getElementById("reward-grid");
	if(location.href.match('payout'))
		column = 1;
	else
		column = 2;
	if(!grid) {
		grid = document.getElementById("found-grid");
		column = 2;
	}
	
	if(grid){
		t = grid.getElementsByTagName("tbody")[0];
		if(t){
			rows = t.getElementsByTagName("tr");
			for(i=0;i<rows.length;i++){
				cR = rows[i];
				date = cR.getElementsByTagName("td")[column-1];
				date.innerHTML = convertDate(date.innerHTML);
			}
		}
	}
}

fixGrid();
window.setTimeout(function(){document.body.addEventListener ('DOMNodeInserted', function(event){ if(event.target.className=="grid-view") fixGrid(); }, false)},500);

// User profile page
grid = document.getElementsByClassName("dataGrid")[0];
if(grid) {
	tds = grid.getElementsByTagName("td"); // since only 1 td per row
	for(i=9;i<=10;i++) { // the 2 dates in the data grid
		date = tds[i]; // day and month are the "wrong way" (for US dates) for these dates
		dateDay = date.innerHTML.substring(0,2);
		dateMonth = date.innerHTML.substring(3,5);
		fixedDate = dateMonth+"."+dateDay+date.innerHTML.substring(5);
		date.innerHTML = convertDate(fixedDate);
	}
}