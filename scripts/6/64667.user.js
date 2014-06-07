// ==UserScript==
// @name           Neopets : Shop Wizard Anywhere
// @version        0.1
// @description    Shop Wiz on the Go
// @include        http://www.neopets.com/*
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/56562.user.js
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require        http://userscripts.org/scripts/source/56503.user.js
// @credit          backslash for buy function
// ==/UserScript==

/shopwizcode

var market = '
    <form action='/portal/processors/tracker.phtml' method='post'><input type='hidden' name='sw_type' value='process_wizard'><input type='hidden' name='link' value='/portal/index.phtml'><input type='hidden' name='trm' value='11'><input type='hidden' name='tri' value='1'><table align='center' cellspacing='0' border='0' cellpadding='4' class='pmod'><tr><td rowspan='5'width='35%' align='center'><img src='http://images.neopets.com/shopkeepers/super_shopwizard.gif' width=150 height=150></center></td><td class='pmod'><b>What are you looking for?</b></td><td><input type='text' name='shopwizard' value='' size='20' maxlength='60' class='pmod'></td></tr><tr><td class='pmod'><b>Area</b></td><td class='pmod'>Shop:<input type='radio' class='pmod' name=table value='shop' checked>Gallery:<input type='radio' class='pmod' name='table' value='gallery'></td></tr><tr><td class='pmod'><b>Search Items</b></td><td><select name='criteria' class='pmod'><option selected value='containing'>containing my phrase<option value='exact'>identical to my phrase</select></td></tr><tr><td class='pmod'><b>Min Price</b><br><font size=1>(optional)</font></td><td class='pmod'><input type='text' name='min_price' size='6' maxlength='6' class='pmod'><b>NP</b></td></tr><tr><td class='pmod'><b>Max Price</b><br><font size=1>(optional)</font></td><td class='pmod'><input type='text' name='max_price' size='6' maxlength='6' class='pmod'><b>NP</b></td></tr><tr><td align='center' colspan='2' valign='bottom' height='32'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='submit' value='Search' class='button_up'></td><td class='pmod'><input type='checkbox' name='priceonly' class='pmod'>Price Only (limited!)</td></tr></table></form></div><div class="pmod" align="Center">Click here to send SSW into Sniperspace!!!!!

<input type='button' class='button_up' value='Launch' name='steroids' onClick="openOpen('/portal/supershopwiz.phtml','SupershopWiz','540','580');">


function buyItem() {

	var item = document.getElementById('shopwizard').value;
	document.getElementById('wiz').innerHTML = "<center><br><br><b>Please Wait...</b><br><br></center>";
	Wizard.find({ //	<--- http://userscripts.org/scripts/show/56503
		"text": item,
		"onsuccess": function(params) {
			// wizard : first link exists
			if (params.list[0]) setTimeout(Shop.list, 0, {
				"link": params.list[0].Link,
				//	/browseshop.phtml
				"onsuccess": function(params) {
					// shop : first link exists
					// (first link should be the searched item, but it is not guaranteed)
					if (params.list[0] && params.text.toLowerCase() == params.list[0].Name.toLowerCase()) setTimeout(Shop.buy, 0, {
						"link": params.list[0].Link,
						//	/buy_item.phtml
						"onsuccess": function(params) {
							document.getElementById('wiz').innerHTML = "<center><br><br><b>" + item + " was successfully bought.</b><br><br></center>";
						}
					});

					else alert(params.text + " was sold out!");
				},
				"parameters": {
					"text": params.text
				}
			});

		},
		"parameters": {
			"text": item
		}

	});
}

document.body.innerHTML = document.body.innerHTML.replace("You are here to help, aren't you?", "<br><br>" + market);
document.getElementById('submitButton').addEventListener('click', buyItem, false);}

