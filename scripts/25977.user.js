// ==UserScript==
// @name           newegg shipping adderator
// @namespace      nyquil.org
// @description    adds the shipping price to the total price for easy 'best value' determination
// @include        http://www.newegg.com/Product/*
// ==/UserScript==



var lis = document.getElementsByTagName('li');

for(var i=0; i<lis.length; i++)

{

	if(lis[i].getAttribute("class") == "green")

	{	
		var shipping = lis[i].innerHTML;
		shipping = shipping.split("$");
		if (shipping[0] == "3 Business Day Shipping ") {
		
			var price = lis[i+1].innerHTML.split("$");
                        price[1] = price[1].replace(/\,/g, '');

			var total = Number(Number(price[1]) + Number(shipping[1]));
                        total = total.toFixed(2);
			var container_li = document.createElement("li");
			container_li.setAttribute('style', "border-bottom: solid grey 1px;");
			container_li.innerHTML = "<b><font size=+1 color=Red>Total Price: $"+ total+ "</b>";
			lis[i].parentNode.insertBefore(container_li, lis[i+1].nextSibling);
		}
		
	}

}
