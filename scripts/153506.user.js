// ==UserScript==
// @name        ebayrand
// @namespace   http://userscripts.org/users/retrontology
// @include     http://*.ebay.*/*
// @version     1
// ==/UserScript==
function gen_liRand(url){
	var parentNode = document.getElementById('gh-eb');
	var firstNode = document.getElementById('gh-eb-Cust');
	var liRand = document.createElement('li');
	liRand.setAttribute('class', 'gh-eb-li');
	liRand.setAttribute('id', 'gh-eb-Rand');
	var randomLink = document.createElement('a');
	randomLink.href = url;
	randomLink.setAttribute('class', 'gh-eb-li-a');
	var randomLiContent = document.createTextNode('Random Page');
	randomLink.appendChild(randomLiContent);
	liRand.appendChild(randomLink);
	parentNode.insertBefore(liRand, firstNode);
}
function get_url(){
	var item = "130812";
	for(var i = 0; i < 6; i++){
		item += Math.floor(Math.random()*10);
	}
	var xmlHttp = new GM_xmlhttpRequest({
						method: "GET",
						url: 'http://retrontology.comuf.com/redirectCheck.php?data='+item,
						onload: function(data) {
							var address = data.responseText;
							address = address.substr(0,address.indexOf('\r\n'));
							var err = address.substr(0,address.indexOf('?'));
							if(err == "http://www.ebay.com/itm/Error"){get_url();}
							else{gen_liRand(address)}
						},
					  });
}
get_url();