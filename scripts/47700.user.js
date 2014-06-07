// ==UserScript==
        // @name           AutoHaggle
        // @namespace      http://www.ab3r.com/
        // @description    Auto Haggles On Neopets/Ichumon/Ataria/Marapets/Communiful/Zetapets
        // @include        http://*.neopets.*/haggle.phtml*
        // @include        http://neopets.*/haggle.phtml*
        // @include        http://*.ataria.*/shops.php*
        // @include        http://ataria.*/shops.php*
        // @include        http://*.marapets.*/shop.php*
        // @include        http://marapets.*/shop.php*
        // @include        http://*.communiful.*/town/index.php?act=buy*
        // @include        http://communiful.*/town/index.php?act=buy*
        // @include        http://*.zetapets.*/shops_purchase.php?*
        // @include        http://zetapets.*/shops_purchase.php?*
        // @include        http://www.ichumon.com/shops.php?action=grab*
        // ==/UserScript==
        
        function GetBetween(zStr, zStart, zEnd){
        	var zStr = zStr; var zStart = zStart; var zEnd = zEnd;
        	var z1 = zStr.indexOf(zStart); var z2 = zStr.indexOf(zEnd, z1);
        	if(z2 > z1 && z1 > -1){
        		return zStr.substring(z1 + zStart.length,z2);
        	}else{
        		return "";
        	}
        }
        
        function SmartHaggle(priceth){
        	var pricelength = priceth.length;
        	var returnval = priceth.charAt(0) + priceth.charAt(1);
        	for (i = 2; i < pricelength; i++) 
        	{
            	returnval = returnval + priceth.charAt( Math.round(Math.random()) );
        	}
        	return returnval;
        }
        
        var URL = window.location.href; URL = URL.toLowerCase();
        if(URL.indexOf("neopets.") > 0){
        	var DOMAIN = "neopets";
        }else if(URL.indexOf("ataria.") > 0){
        	var DOMAIN = "ataria";
        }else if(URL.indexOf("marapets.") > 0){
        	var DOMAIN = "marapets";
        }else if(URL.indexOf("communiful.") > 0){
        	var DOMAIN = "communiful";
        }else if(URL.indexOf("zetapets.") > 0){
        	var DOMAIN = "zetapets";
        }else if(URL.indexOf("ichumon.") > 0){
        	var DOMAIN = "ichumon";
        }
        
        if(DOMAIN == "neopets"){
        	var strHTML = document.body.innerHTML;
        	if(strHTML.indexOf("I want at least ") > 1){
        		var haggle = GetBetween(strHTML,"<b>The Shopkeeper says 'I want at least "," Neopoints for this great item.'");
        		document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(",",""));
        	}else if(strHTML.indexOf("I wont take less than ") > 1){
        		var haggle = GetBetween(strHTML,"<b>The Shopkeeper says 'I wont take less than "," Neopoints for it.'");
        		document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(",",""));
        	}
        }else if(DOMAIN == "ichumon"){
        	if(document.getElementsByTagName("form").length > 0){
        		var strHTML = document.body.innerHTML;
        		if(strHTML.indexOf("I would like at least") > 1){
        			var haggle = GetBetween(strHTML, "like at least <strong>","</strong>");
        			document.getElementsByName("pay")[0].value = SmartHaggle(haggle.replace(",",""));
        			document.getElementsByName("captcha")[0].focus();
        		}
        	}
        }else if(DOMAIN == "ataria"){
        	if(document.getElementsByTagName("form").length > 0){
        		var strHTML = document.getElementsByTagName("form")[0].innerHTML;
        		if(strHTML.indexOf(">Price: <b>") > 1){
        			var haggle = GetBetween(strHTML, ">Price: <b>","</b>");
        			document.getElementsByName("offer")[0].value = SmartHaggle(haggle.replace(",",""));
        			document.getElementsByName("userstring")[0].focus();
        		}
        	}
        }else if(DOMAIN == "marapets"){
        	var strHTML = document.body.innerHTML;
        	var haggle = GetBetween(strHTML,"<b>Market Value</b> : ","MP");
        	document.getElementsByName("price")[0].value = SmartHaggle(haggle.replace(",",""));
        	document.getElementsByName("code")[0].focus();
        }else if(DOMAIN == "communiful"){
        	var strHTML = document.body.innerHTML;
        	var haggle = GetBetween(strHTML,"<tr><td>Cost</td><td>"," cP");
        	document.getElementsByName("haggle")[0].value = SmartHaggle(haggle.replace(",",""));
        }else if(DOMAIN == "zetapets"){
        	var strHTML = document.body.innerHTML;
        	var haggle = GetBetween(strHTML,"Est. Price: ","<");
        	document.getElementsByName("bargain_price")[0].value = SmartHaggle(haggle.replace(",",""));
        }