// ==UserScript==
// @name           Kayako sSupport Ticket Count
// @include        https://*/staff/index.php?_m=tickets&_a=manage&departmentid=*&ticketstatusid=*
// ==/UserScript==


var owners = new Array();
var output = "";

ticketowner = document.evaluate('/html/body/table/tbody/tr[7]/td/table/tbody/tr/td[4]/table/tbody/tr[8]/td/form/table/tbody/tr[3]/td/table[2]/tbody/tr/td/table/tbody/tr/td[3]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i=0; i<ticketowner.snapshotLength; ++i) {
	var thisTicket = ticketowner.snapshotItem(i);
	owners[i] = thisTicket.innerHTML;
} 

owners.splice(0,1); // Remove first element from array (i.e. the title)

var result = new Object();
for (var owner in owners) {
	if (result[owners[owner]] === undefined)
		result[owners[owner]] = 1;
	else
		result[owners[owner]]++;
}

// Start static stuff -- create tree of nodes
var dom_tr = document.createElement("tr")
var dom_td = document.createElement("td")
dom_tr.appendChild(dom_td)
var dom_div1 = document.createElement("div")
dom_div1.setAttribute('class', 'navsection')
dom_td.appendChild(dom_div1)
var dom_div2 = document.createElement("div")
dom_div2.setAttribute('class', 'navsub')
dom_div1.appendChild(dom_div2)
var dom_div3 = document.createElement("div")
dom_div3.setAttribute('class', 'navtitle')
dom_div2.appendChild(dom_div3)
var dom_img = document.createElement("img")
dom_img.setAttribute('border',0)
dom_img.setAttribute('align','absmiddle')
dom_img.setAttribute('src','/themes/admin_default/doublearrowsnav.gif')
dom_div3.appendChild(dom_img)
dom_div3.insertAdjacentHTML('beforeend','&nbsp;Ticket Counts')
var dom_table = document.createElement("table")
dom_div2.appendChild(dom_table)
var dom_tbody = document.createElement("tbody")
dom_table.appendChild(dom_tbody)
// End static stuff

var str = "";
for (var item in result) {
	var user_entry = document.createElement("tr")
	user_entry.innerHTML = "<td><strong>" + item + "</strong></td><td>" + result[item] + "</td>";
	dom_table.appendChild(user_entry) // append to the previously created tree
}

// Find the right node and append the previously created tree as a child
append_after = document.evaluate(
	"/html/body/table/tbody/tr[7]/td/table/tbody/tr/td/table/tbody",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
append_after.snapshotItem(0).appendChild (dom_tr);