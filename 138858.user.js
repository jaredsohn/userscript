// ==UserScript==
// @name           Amazon Payments mTurk Details -revised
// @namespace      AmazonPayments
// @description	   This is the modified version of the script at http://userscripts.org/scripts/show/86823 which stopped working for me.
// @include        https://payments.amazon.com/sdui/sdui/overview*
// ==/UserScript==
function fetchDetails() {
	var request = new XMLHttpRequest();
	request.open('GET', 'https://payments.amazon.com'+links[k], true);
	request.setRequestHeader("Cookie",document.cookie);
	request.setRequestHeader("Referer", location.href);
	request.onreadystatechange = function (oEvent) {  
		if (request.readyState === 4) {  
			if (request.status === 200) {
				var m = request.responseText.match(/Payment from requester (.+?)<\/td>/);
				var details = m ? m[1].split(/ for | between /) : ['', '', ''];
				if (details) cells[k].innerHTML = '<b>'+details[0].replace(/\(.+?\)/, '')+'</b> - '+details[1].replace(/approved|granted/g, '');
				if (links[k+1]) {
					k++;
					setTimeout(fetchDetails, 500);
				}
			} else {
				console.log("Error", request.statusText);
			}
		}
	};  
	request.send();
}
var tables = document.getElementsByTagName('table'), ttable = null;
for (i in tables) {
  if (tables[i].className && tables[i].className.indexOf('transactionTable') != -1) {
    ttable = tables[i];
  }
}
if (!ttable) return;

var rows = ttable.tBodies[0].rows;

var links = [], cells = [], k = 0;
for (var i=0; i<=rows.length-1; i++) { 
  if (rows[i].cells[2].innerHTML.indexOf('Mechanical Turk Prepaid HITs') != -1) {
    links[k]   = rows[i].cells[3].innerHTML.match(/href="(.+?)"/)[1];
    cells[k++] = rows[i].cells[2];
  }
};

k = 0;
if (links.length) {
  fetchDetails();
}