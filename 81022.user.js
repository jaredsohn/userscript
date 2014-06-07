// ==UserScript==
// @name           donate
// @namespace      C:\skrypts\53398.user
// @description    brak
// @include        http://economy.erepublik.com/*/company/*/229021/donate/items

// ==/UserScript==

document.getElementById('available_items').value=50;
document.getElementsByName('submitter')[0].value = 'Donate all';
document.getElementById('big').setAttribute('style', 'height: 345px;');

small = document.getElementById('small');
big = document.getElementById('big');

//rm = raw material
industry_rm = new Array; 
industry_rm['rifle'] = 'Iron';
industry_rm['tank'] = 'Iron';
industry_rm['food'] = 'Grain';
industry_rm['artillery'] = 'Titanium';
industry_rm['air unit'] = 'Titanium';
industry_rm['moving tickets'] = 'Oil';
industry_rm['house'] = 'Stone';
industry_rm['hospital'] = 'Stone';
industry_rm['defense system'] = 'Stone';

//This requests the company's industry from the api server and tells us which raw material type to use.

company_id = document.location.href.match(/[0-9]+/);

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://api.erepublik.com/v2/feeds/companies/'+company_id,
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