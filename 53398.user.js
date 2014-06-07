/* License
Well, to make it short. This program is distributed as public domain
in the hope that it will be useful, but WITHOUT ANY WARRANTY!
*/

// ==UserScript==
// @name           Alexc autodonater for eRepublik
// @namespace      http://www.erepublik.com/en/citizen/profile/196371
// @include        http://www.erepublik.com/*/company/*/donate/items
// @include        http://www2.erepublik.com/*/company/*/donate/items
// ==/UserScript==

document.getElementById('available_items').value=50;
document.getElementsByName('submitter')[0].value = 'Donate all';
document.getElementById('big').setAttribute('style', 'height: 345px;');

small = document.getElementById('small');
big = document.getElementById('big');

//rm = raw material
industry_rm = new Array; 
industry_rm['weapon'] = 'Iron';
industry_rm['food'] = 'Grain';
industry_rm['gift'] = 'Diamonds';
industry_rm['moving tickets'] = 'Oil';
industry_rm['house'] = 'Wood';
industry_rm['hospital'] = 'Wood';
industry_rm['defense system'] = 'Wood';

//This requests the company's industry from the api server and tells us which raw material type to use.

company_id = document.location.href.match(/[0-9]+/);

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://api.erepublik.com/v1/feeds/companies/'+company_id,
	onload: function(responseDetails) {
		xmlDoc = new DOMParser().parseFromString(responseDetails.responseText, "text/xml");
		industry = xmlDoc.documentElement.getElementsByTagName("industry")[0].childNodes[0].nodeValue;
		get_rm_ids(industry_rm[industry]);
	}
});
//This function tells us the id's of the elements which will be moved.
function get_rm_ids(rm_type){
	rm_node_ids = new Array;
	arrayId = 0;
	imgs = small.getElementsByTagName('img');
	for (i=0;i<imgs.length;i++){
		if (imgs[i].getAttribute('alt') == rm_type){
			rm_node_ids[arrayId] = imgs[i].parentNode.getAttribute('id');
			arrayId++;
		}
	}
	move_rms(rm_node_ids);
}
//And this function moves the elements
function move_rms(rm_node_ids){
	for (i=0;i<rm_node_ids.length;i++){
		big.appendChild(document.getElementById(rm_node_ids[i]));
	}
}