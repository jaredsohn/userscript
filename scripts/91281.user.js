// ==UserScript==
// @name           IP lookup
// @namespace      http://userscripts.org
// @description    IP lookup
// @include        http*://*what.cd/user.php?id=*
// ==/UserScript==


function load_page_then(uri, then) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: uri,
		onload: then
	});
}
var target = document.getElementsByClassName('stats nobullet')[3]
	.getElementsByTagName('li')[3];


var IP = target.innerHTML.split('IP: ')[1]
	.split('(')[0].trim();

load_page_then('http://whatismyipaddress.com/ip/' + IP, function (d) {

	function li(content) {
		var temp = document.createElement("li");
		temp.appendChild(document.createTextNode(content));
		return temp;
	}
	var all = d.responseText;
	var country = all.split("<tr><th>Country:</th><td>")[1].split("</td></tr>")[0].split("<img")[0];
	var img = all.split("<tr><th>Country:</th><td>")[1].split("</td></tr>")[0].split("<img src=\"")[1].split("\"")[0];
	var image = document.createElement("img");
	image.src = img;
	var state = all.split("<tr><th>State/Region:</th><td>")[1].split("</td></tr>")[0];
	var city = all.split("<tr><th>City:</th><td>")[1].split("</td></tr>")[0];

	var countryLi = document.createElement("li");
	countryLi.appendChild(document.createTextNode("Country: " + country));
	countryLi.appendChild(image);

	var stateLi = li("State/Region: " + state);
	var cityLi = li("City: " + city);

	target.appendChild(countryLi);
	target.appendChild(stateLi);
	target.appendChild(cityLi);
});
