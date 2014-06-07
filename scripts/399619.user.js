// ==UserScript==
// @name        Etsy Plus

// @namespace   etsyplus

// @include     *://www.etsy.com/*search*

// @version     1

// @require http://www.aussieelectronics.com/gm_config.js
// ==/UserScript==

var countrylist = ['United States', 'Australia', 'China', 'Canada'];

GM_config.init('Etsy Plus Options', {
    'country': {
        'label': 'Country',
        'type': 'select',
        'options': countrylist,
        'default': ''
    },
    'showads': {
        'label': 'Show Ads?',
        'type': 'radio',
        'options': ['Remove ads', 'Do not remove ads', 'Show only sponsered ads not etsy ads'],
        'default': 'Remove ads'
    },
    'incpostage': {
        'label': 'Include postage cost in searches?',
        'type': 'checkbox',
        'default': true
    }
});

GM_registerMenuCommand('Etsy Plus Options', opengmcf);
if(GM_config.get('country') == ''){
	opengmcf();
}

var showads = GM_config.get('showads');
var country = countrylist[GM_config.get('country')];
var incpostage = GM_config.get('incpostage');

function opengmcf(){
	GM_config.open();
}

function getpostage(){
	var items = document.getElementsByClassName('listing-detail');
	for (var i=0;i<items.length;i++){
		var itemurl = items[i].getElementsByTagName('a')[0].href;
		if(itemurl != ""){
			postageajax(itemurl);
		}
	}
}

function postageajax(itemurl){
			var mygetrequest=new ajaxRequest();
			mygetrequest.onreadystatechange=function(){
				if (mygetrequest.readyState==4){
					if (mygetrequest.status==200){
						var sURL = mygetrequest.responseText.substring(mygetrequest.responseText.indexOf('canonical') + 17);
						sURL = sURL.substring(0, sURL.indexOf('"'));
						var sID = sURL.substring(sURL.indexOf('listing/') + 8);
						sID = sID.substring(0, sID.indexOf('/'));

						var domtxt = mygetrequest.responseText.substring(mygetrequest.responseText.indexOf('<tbody>'));
						domtxt = domtxt.substring(0, domtxt.indexOf('</tbody>') + 8);
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(domtxt,"text/xml");
						var trels = xmlDoc.getElementsByTagName("tr");

						for (var tri=0;tri<trels.length;tri++){
							if(trels[tri]){
								var destination = trels[tri].querySelector("[class=shipping-destination]").innerHTML;
								if(domtxt.indexOf(country) != -1){
									if(destination == country){
										var shipping = trels[tri].querySelector("[class=shipping-primary-price]").childNodes[2].innerHTML;
										changeprice(shipping, sID);
									}
								}
								else if(destination == "Everywhere Else"){
									var shipping = trels[tri].querySelector("[class=shipping-primary-price]").childNodes[2].innerHTML;
									changeprice(shipping, sID);
								}
							}
						}
					}
				}
			}
			mygetrequest.open("GET", itemurl, true);
			mygetrequest.send(null);
}

function changeprice(shipping, id){
	var items = document.getElementsByClassName('listing-detail');
	for (var i=0;i<items.length;i++){
		var itemurl = items[i].getElementsByTagName('a')[0].href;
		if(itemurl.indexOf(id) != -1){
			var pricetotal = (parseFloat(items[i].getElementsByClassName('currency-value')[0].innerHTML) + parseFloat(shipping)).toFixed(2);
			items[i].getElementsByClassName('currency-value')[0].innerHTML = pricetotal;
		}
	}
}

function ajaxRequest(){
	var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
	if (window.ActiveXObject){
		for (var i=0; i<activexmodes.length; i++){
			try{
				return new ActiveXObject(activexmodes[i]);
			}
			catch(e){
			}
		}
	}
	else if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	}
	else{
		return false;
	}
}

function removeads(){
	if(showads == 'Remove ads'){
		document.getElementById('recent-showcase0').parentNode.removeChild(document.getElementById('recent-showcase0'));
	}
	else if(showads == 'Show only sponsered ads not etsy ads'){
		document.getElementsByClassName('listing-card house-ad')[0].parentNode.removeChild(document.getElementsByClassName('listing-card house-ad')[0]);
	}
}

removeads();

if(incpostage){
	getpostage();
}