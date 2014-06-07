// ==UserScript==
// @name           iSpazio LastMinute
// @namespace      http://ispazio.net
// @description    Alerts expired deals
// @include        http://www.ispazio.net/*/ispazio-lastminute*
// by pier
// ==/UserScript==

(function() {

	var classPrice = document.querySelectorAll(".last_minute_price");
	var classNewPrice = document.querySelectorAll(".last_minute_newprice");
	var patt=/\d{1,3}.\d{2}/im;
	var style = parseInt(GM_getValue("style","0"));
		
	function changePrice() {
	
		for (var i = 0; i < classPrice.length; i++) {
	
                var Price = classPrice[i].innerHTML.replace(",",".");
				var newPrice = classNewPrice[i].innerHTML.replace(",",".");
				var p = Price.match(patt);
				var np = newPrice.match(patt);
				
				if(np) {
					
					p = parseFloat(p);
					np = parseFloat(np);

					if ( style ) {
						
						if( p <= np ) {

							var Expired = document.createElement("div");
							Expired.innerHTML =  "<img src=\"http://img199.imageshack.us/img199/8687/priceapp1.png\" style=\" position:relative; top:-75px; left:-340px;  z-index:0\"/> ";
							Expired.className =  "expired";
							classNewPrice[i].appendChild(Expired);
							if( p < np ) {
								classNewPrice[i].style.backgroundImage="url(http://img203.imageshack.us/img203/8308/priceapp2.png)" ;
							}
						}
						
					}
					else {
						
						if( p <= np ) {

							classNewPrice[i].style.backgroundImage="url(http://img841.imageshack.us/img841/6791/priceapp.png)" ;
							if( p < np  ) { 
								classNewPrice[i].style.backgroundImage="url(http://img203.imageshack.us/img203/8308/priceapp2.png)" ;
							}
						
						}
						
					}
				
				}
						
		}
		
	}

	
	function toggleStyle() {
		
		if ( style ) { GM_setValue("style" , "0"); style = 0;}
		else {  GM_setValue("style" , "1"); style = 1; }
			
	}
	
	
	changePrice();	
	GM_registerMenuCommand("iSpazio Toggle Style", toggleStyle);
	
})();