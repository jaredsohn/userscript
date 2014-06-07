// ==UserScript==
// @name           new nation ajax
// @namespace      http://dnathe4th.porfusion.com/blog/
// @description    updates the new nation table
// @include        http://www.cybernations.net/allNations_display.asp
// ==/UserScript==


var nation_table = document.getElementsByTagName('table')[14];

var first_row = nation_table.rows[1];
var first_name = nation_table.rows[1].getElementsByTagName('a')[0].innerHTML;
//alert(first_name);

window.setInterval(function() {
GM_xmlhttpRequest({
method: 'GET',
url: 'http://www.cybernations.net/allNations_display.asp',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
},
onload: function(responseDetails) {
// convert string to XML object
resp = responseDetails.responseText;
resp = resp.substring(resp.indexOf("<body"));
//resp = resp.replace(/&nbsp/g, ' ');

//var xmlobject = (new DOMParser()).parseFromString(resp, "text/html");

box = document.createElement("span");
box.innerHTML = resp;
xmlobject = box;

//alert(xmlobject.firstChild.nodeValue);mlobject.getElementsByTagName('table')[13].
//alert(xmlobject.getElementsByTagName('table')[13].innerHTML);
var nation_rows = xmlobject.getElementsByTagName('table')[14].rows;
//alert(nation_rows.length);
var new_nation = 0;

for(var i = 1;i<nation_rows.length;i++)
{
// alert(first_name + " == " + nation_rows[i].getElementsByTagName('a')[0].innerHTML + " " + (first_name == nation_rows[i].getElementsByTagName('a')[0].innerHTML));

// alert(i);
if(nation_rows[i].getElementsByTagName('a')[0].innerHTML == first_name)
{
 GM_log('nothing exciting');
 break;
}
else
{
//  alert(nation_table);
//  alert(nation_table.getElementsByTagName('tr'));
//  alert(nation_table.getElementsByTagName('tr')[1].innerHTML);
//  alert(nation_rows[i]);
//  alert(nation_table);
//  alert(nation_table.childNodes[1]);
//  alert("New Nation!")

 GM_log('New Nation! - ' + nation_rows[i].getElementsByTagName('a')[0].innerHTML);
//  alert(nation_rows[i].getElementsByTagName('a')[0].innerHTML);

 message_url = "http://www.cybernations.net/" + nation_rows[i].getElementsByTagName('a')[1].getAttribute("href");
 window.open(message_url);

 next_first = nation_rows[1].getElementsByTagName('a')[0].innerHTML;
 nation_table.rows[1].parentNode.insertBefore(nation_rows[i], first_row);
 i--;
}

};
nation_table = document.getElementsByTagName('table')[14];
first_row = nation_table.rows[1];
first_name = next_first
//alert(first_name)
}
});
}, 30 * 1000);