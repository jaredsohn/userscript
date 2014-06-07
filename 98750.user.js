// ==UserScript==
// @name           Newegg to Tom's Hardware forum code
// @description    Converts the NewEgg shopping cart to a list ready to be pasted into Tom's Hardware forum (works on both US and Canadian sites)
// @namespace      http://userscripts.org/scripts/review/98750
// @date           2011-03-10
// @creator        Zenthar
// @include        http://secure.newegg.com/Shopping/ShoppingCart.aspx?Submit=view
// @include        http://secure.newegg.ca/Shopping/ShoppingCart.aspx?Submit=view
// @match          http://secure.newegg.com/Shopping/ShoppingCart.aspx?Submit=view
// @match          http://secure.newegg.ca/Shopping/ShoppingCart.aspx?Submit=view
// ==/UserScript==
	
(function (){
	var items= document.getElementsByClassName("cartItem");
	var text = "";

	for (var i=0; i<items.length; i++){
		var links = items[i].getElementsByTagName("a");
		var url = links[0].href;
		var qty = "";
		{
			var candidates = items[i].getElementsByTagName("td");
			for(var j=0 ; j<candidates.length ; j++) {
				if(candidates[j].getAttribute("class") == "cartQty") {
					var inputs = candidates[j].getElementsByTagName("input");
					if(inputs.length > 0)
						qty = inputs[0].getAttribute("value")
					else
						qty = candidates[j].textContent.trim();
				}
			}
		}
		
		for(var j=0 ; j<links.length ; j++) {
			if(links[j].getAttribute("name") == "CART_ITEM") {
				text += "[*]"
				if(qty > 1)
					text += qty+"x ";
				text += "[url="+url+"]"+links[j].textContent.trim()+"[/url]\n";
			}
		}
	}
	
	var grandTotal = document.getElementsByClassName("cartTotal cartHeader")[0];
	grandTotal = grandTotal.getElementsByTagName("td")[1].textContent.trim();//Always 2nd element
	text += "TOTAL: [u][b]"+grandTotal+"[/b][/u]";
	
	var t= document.getElementsByClassName("cartSubtotal cartHeader");
	if (!t.length)
		return;
	t= t[0].getElementsByTagName("td");
	document.getElementsByClassName("space")[0].innerHTML= "<td align=\"center\" colspan=\"5\" ><textarea cols=\"160\" rows=\"8\" style=\"font-size:12px;\" onclick=\"this.select();\" >"+text+"</textarea></td>";
	
})()