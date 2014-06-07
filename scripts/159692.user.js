


// ==UserScript==
// @name           Amazon Discount Hunter
// @namespace      AmazonDiscountHunter
// @description    Advanced search with many filters like shipping, seller, discount and more
// @include        *://www.amazon.com/*
// @include        *://www.amazon.co.uk/*
// @include        *://www.amazon.ca/*
// @include        *://www.amazon.de/*
// @include        *://www.amazon.fr/*
// @include        *://www.amazon.co.jp/*
// @grant					 none
// ==/UserScript==

function initializeDepartments(localeV) {
	//Initialize Data
	var departmentsHurray = [
	 ["US","aps","All Departments"] ,["US","outlet"," >> Outlet Store"]	,["US","stripbooks,n:220084011"," >> Books: 4-for-3 Offer"]
	,["US","garden,n:331401011"," >> Home & Garden: 4-for-3"]	,["US","grocery,p_n_is_sns_available:1"," >> Grocery: Subscribe & Save"]
	,["US","hpc,p_n_is_sns_available:1"," >> Health & Personal: SnS"]	,["US","us-worldwide-shipping-aps"," >> International Shipping"]
	,["US","instant-video","Amazon Instant Video"] ,["US","appliances","Appliances"] ,["US","arts-crafts","Arts, Crafts & Sewing"]
	,["US","automotive","Automotive"] ,["US","baby-products","Baby"] ,["US","beauty","Beauty"] ,["US","stripbooks","Books"]
	,["US","mobile","Cell Phones & Accessories"] ,["US","apparel","Clothing & Accessories"] ,["US","computers","Computers"]
	,["US","electronics","Electronics"] ,["US","grocery","Grocery & Gourmet Food"] ,["US","hpc","Health & Personal Care"]
	,["US","garden","Home & Garden"] ,["US","industrial","Industrial & Scientific"] ,["US","jewelry","Jewelry"] 
	,["US","digital-text","Kindle Store"] ,["US","magazines","Magazine Subscriptions"] ,["US","dvd","Movies & TV"]
	,["US","digital-music","MP3 Downloads"] ,["US","popular","Music"] ,["US","mi","Musical Instruments"] 
	,["US","office-products","Office Products"] ,["US","outdoor","Patio, Lawn & Garden"] ,["US","pets","Pet Supplies"] 
	,["US","shoes","Shoes"] ,["US","software","Software"] ,["US","sporting","Sports & Outdoors"] ,["US","tools","Tools & Home Improvement"]
	,["US","toys-and-games","Toys & Games"] ,["US","videogames","Video Games"] ,["US","watches","Watches"] ,["UK","aps","All Departments"]
	,["UK","outlet"," >> Outlet"] ,["UK","baby","Baby"] ,["UK","beauty","Beauty"] ,["UK","stripbooks","Books"]
	,["UK","automotive","Car & Motorbike"] ,["UK","classical","Classical Music"] ,["UK","clothing","Clothing"]
	,["UK","computers","Computers & Accessories"] ,["UK","diy","DIY & Tools"] ,["UK","electronics","Electronics & Photo"]
	,["UK","dvd","Film & TV"] ,["UK","outdoor","Garden & Outdoors"] ,["UK","grocery","Grocery"] ,["UK","drugstore","Health & Beauty"]
	,["UK","jewelry","Jewellery"] ,["UK","digital-text","Kindle Store"] ,["UK","kitchen","Kitchen & Home"]
	,["UK","appliances","Large Appliances"] ,["UK","lighting","Lighting"] ,["UK","digital-music","MP3 Downloads"] ,["UK","popular","Music"]
	,["UK","mi","Musical Instruments & DJ"] ,["UK","pets","Pet Supplies"] ,["UK","shoes","Shoes & Accessories"] 
	,["UK","software","Software"] ,["UK","sports","Sports & Leisure"] ,["UK","office-products","Stationery & Office Supplies"]
	,["UK","toys","Toys & Games"] ,["UK","videogames","Video Games"] ,["UK","watches","Watches"] ,["DE","aps","Alle Kategorien"]
	,["DE","outlet"," >> Outlet"] ,["DE","automotive","Auto & Motorrad"] ,["DE","baby","Baby"] ,["DE","diy","Baumarkt"]
	,["DE","clothing","Bekleidung"] ,["DE","lighting","Beleuchtung"] ,["DE","blu-ray","Blu-ray"] ,["DE","stripbooks","BÃ¼cher"]
	,["DE","office-products","BÃ¼robedarf & Schreibwaren"] ,["DE","computers","Computer & ZubehÃ¶r"] ,["DE","drugstore","Drogerie & KÃ¶rperpflege"]
	,["DE","dvd","DVD & Blu-ray"] ,["DE","appliances","Elektro-GroÃŸgerÃ¤te"] ,["DE","electronics","Elektronik & Foto"] 
	,["DE","english-books","Englische BÃ¼cher"] ,["DE","videogames","Games"] ,["DE","outdoor","Garten"] ,["DE","pets","Haustier"]
	,["DE","photo","Kamera & Foto"] ,["DE","digital-text","Kindle-Shop"] ,["DE","classical","Klassische Musik"]
	,["DE","kitchen","KÃ¼che & Haushalt"] ,["DE","grocery","Lebensmittel & GetrÃ¤nke"] ,["DE","motorcycles","Motorrad"]
	,["DE","digital-music","MP3-Downloads"] ,["DE","popular","Musik"] ,["DE","mi","Musikinstrumente"] 
	,["DE","beauty","ParfÃ¼merie & Kosmetik"] ,["DE","jewelry","Schmuck"] ,["DE","shoes","Schuhe & Handtaschen"]
	,["DE","software","Software"] ,["DE","toys","Spielzeug"] ,["DE","sports","Sport & Freizeit"] ,["DE","watches","Uhren"]
	,["DE","magazines","Zeitschriften"] ,["FR","aps","Toutes nos boutiques"]
	,["FR","jewelry","Bijoux"] ,["FR","blu-ray","Blu-ray"] ,["FR","baby","BÃ©bÃ©s et PuÃ©riculture"] 
	,["FR","shoes","Chaussures et accessoires"] ,["FR","classical","Classique"] ,["FR","kitchen","Cuisine & Maison"]
	,["FR","dvd","DVD"] ,["FR","office-products","Fournitures de bureau"] ,["FR","appliances","Gros Ã©lectromÃ©nager"]
	,["FR","computers","Informatique"] ,["FR","mi","Instruments de musique"] ,["FR","toys","Jeux et Jouets"]
	,["FR","videogames","Jeux vidÃ©o"] ,["FR","english-books","Livres anglais et Ã©trangers"] ,["FR","stripbooks","Livres en franÃ§ais"]
	,["FR","software","Logiciels"] ,["FR","lighting","Luminaires et Eclairage"] ,["FR","watches","Montres"] ,["FR","popular","Musique"]
	,["FR","beauty","Parfum et BeautÃ©"] ,["FR","electronics","Photo, Image, Son et GPS"] ,["FR","hpc","SantÃ© et Soins du corps"]
	,["FR","sports","Sports et Loisirs"] ,["FR","digital-music","TÃ©lÃ©chargements MP3"] ,["FR","clothing","VÃªtements et accessoires"]
	,["JP","aps","?????????"] ,["JP","stripbooks","?"] 	,["JP","english-books","??"] ,["JP","dvd","DVD"]
	,["JP","popular","??????"] ,["JP","classical","???????"] 	,["JP","digital-music","MP3??????"] ,["JP","mi","??"]
	,["JP","videogames","TV???"] ,["JP","electronics","??&???"] ,["JP","computers","????Â·????"] ,["JP","software","PC???"]
	,["JP","office-products","???Â·??????"] ,["JP","kitchen","???&????"] ,["JP","pets","?????"]
	,["JP","food-beverage","??&??"] 	,["JP","hpc","???&??????"] ,["JP","beauty","???"] ,["JP","baby","???&?????"]
	,["JP","toys","????"] 	,["JP","hobby","???"] ,["JP","apparel","?&????????"] ,["JP","shoes","????&???"]
	,["JP","jewelry","?????"] 	,["JP","watch","??"] ,["JP","sporting","????&?????"] ,["JP","diy","DIYÂ·??"]
	,["JP","automotive","??Â·?????"] 	,["CA","aps","All Departments"] ,["CA","stripbooks","Books"] ,["CA","classical","Classical Music"]
	,["CA","electronics","Electronics"] ,["CA","kitchen","Home & Garden"] ,["CA","dvd","Movies & TV"] ,["CA","popular","Music"]
	,["CA","software","Software"] ,["CA","sporting","Sports & Outdoors"] ,["CA","tools","Tools & Building Supplies"]
	,["CA","videogames","Video Games"] ,["CA","watches","Watches"]
	];

	localeV = localeV || 'US';
	var departmentsSelectSpan = document.createElement("span");
	var departmentsSelect = document.createElement("select");
	departmentsSelect.setAttribute("id", "azcat");
	departmentsSelect.setAttribute("name", "azcat");
	departmentsSelect.style.height = "20px";
	departmentsSelect.style.marginRight = "5px";
  	
	var deptHurryLength = departmentsHurray.length;
	for (var i=0; i<deptHurryLength; i++) {
		if(departmentsHurray[i][0]==localeV){
			var departmentsOption = document.createElement("option");
			departmentsOption.value = departmentsHurray[i][1];		
			departmentsOption.text = departmentsHurray[i][2];
			departmentsSelect.appendChild(departmentsOption);
		}
	}
	departmentsSelectSpan.appendChild(departmentsSelect);
	return departmentsSelectSpan.innerHTML;
 };

function initializeDiscounts() {
	var discountsHurray = [["","All"],["90-","90%"],["80-","80%"],["70-","70%"],["60-","60%"],
		["50-","50%"],["40-","40%"],["30-","30%"],["20-","20%"],["10-","10%"]];
		
	var discountsSelectSpan = document.createElement("span");
	var discountsSelect = document.createElement("select");
	discountsSelect.setAttribute("id", "azpct");
	discountsSelect.setAttribute("name", "azpct");
	discountsSelect.style.height = "20px";
	discountsSelect.style.marginRight = "5px";
	
	var discHurryLength = discountsHurray.length;
	for (var i=0; i<discHurryLength; i++) {
		var discountOption = document.createElement("option");
		discountOption.value = discountsHurray[i][0];		
		discountOption.text = discountsHurray[i][1];
		discountsSelect.appendChild(discountOption);
	}
	discountsSelectSpan.appendChild(discountsSelect);
	return discountsSelectSpan.innerHTML;
};

function getIntialInfo() {
	var hostURL = window.location.hostname.toLowerCase();
	var setH = new Array(6);
	switch (hostURL) {
		case "www.amazon.com": 		setH=["us", "20", "com", "ATVPDKIKX0DER", "US", "Discount Search"]; break;
		case "www.amazon.co.uk":	setH=["uk", "21", "co.uk", "A3P5ROKL5A1OLE", "UK", "Discount Search"]; break;
		case "www.amazon.de":			setH=["de", "21", "de", "A3JWKAKR8XB7XF", "DE", "Diskont Suche"]; break;
		case "www.amazon.fr":			setH=["fr", "21", "fr", "A1X6FK5RDHNB96", "FR", "Escompte Recherche"]; break;
		case "www.amazon.co.jp":	setH=["jp", "22", "co.jp", "AN1VRQENFRJN5", "JP", "????"]; break;
		case "www.amazon.ca":			setH=["ca", "20", "ca", "A3DWYIK6Y9EEQB", "CA", "Discount Search"]; break;
		default:									setH=["us", "20", "com", "ATVPDKIKX0DER", "US", "Discount Search"]; 
	}
	return setH;
};

//Populate Products
function initializeSearch() {
	var searchScript =  '' +
			 	'function findProducts() {'
			+ '	var country, merchant, shipping, discount, category, sprint, searchwords, searchurl;'
			+ '	country = document.getElementById("azdomain").value;'
			+ '	merchant = document.getElementById("azseller").value;'
			+ ' shippingElem = document.getElementById("azship");'
			+ '	if (shippingElem) {shipping=shippingElem.value;} else {shipping="";}'
			+ ' discount = document.getElementById("azpct").value;'
			+ ' category = document.getElementById("azcat").value;'
			+ ' searchwords = document.getElementById("azkeywords").value;'
			+ ' sprint = "gpxl-" + document.getElementById("azcc").value + "-" + document.getElementById("azcv").value;'
			+ ' '
			+ ' searchurl = "http://www.amazon." + country + "/gp/search/?t" + "ag=" + sprint + "&rh=i:" + category;'
			+ '	'
			+ ' if (shipping) { '
			+ '  	if ((country == "com") && (shipping == 1)) { searchurl = searchurl + ",p_85:" + shipping; }'
			+ '  		else { searchurl = searchurl + ",p_76:" + shipping; }'
			+ ' }'
			+ ' if (merchant) { searchurl = searchurl + "&emi=" + merchant;}'
			+ ' if (discount) { searchurl = searchurl + "&pct-off=" + discount;}'			
			+ ' '
			+ '	if (searchwords != "") {'
			+ '		searchwords = encodeURIComponent(searchwords);'
			+ '   searchurl = searchurl + "&field-keywords=" + searchwords;'
			+ ' }'
			+ ' '
			+ ' window.location = searchurl;'
			+ ' return searchurl;'
			+ '};';
	return searchScript;
};

//main
(function(){
	// check elementId exists
	var twotabsearchtextboxElem = document.getElementById("twotabsearchtextbox");
	var navSearchLableElem = document.getElementById("nav-search-label");
	var navSearchBarElem = document.getElementById("navSearchBar");
	var navGoButtonElem = document.getElementById("navGoButton");
	var discountHead = document.getElementsByTagName("head")[0];         
		
	if ((twotabsearchtextboxElem || navSearchLableElem || navSearchBarElem || navGoButtonElem) && discountHead)
	{		
		// get the Array Values
		var getH = getIntialInfo();
			
		// check existance of variable
		if(getH)
		{
			//set and create
			var locale = getH[4];
			var discountsObj = initializeDiscounts();
			var departmentsObj = initializeDepartments(locale);
			
			var scriptLable = initializeSearch();
			var searchLable = '<lable for="search" style="color:#ffffff;font-weight:bold;padding-right:15px;font-size:14px;"> ' + getH[5] + "</lable>" ;
			
			var countryLable = '<input id="azdomain" type="hidden" value="' + getH[2] + '" />';
			var ccLable = '<input id="azcc" type="hidden" value="' + getH[0] + '" />';

			//var sellerLable = '<select style="height:20px;margin-right:5px;" id="azseller" name="azseller"><option value="">All Sellers</option><option value="' + getH[3]+ '">Amazon Only</option></select>';
			
			var shippingLable = '<select style="height:20px;margin-right:5px;" id="azship" name="azship"><option value="">Any</option><option value="1">Prime</option><option value="1-">Free</option></select>';
											
			var discountsLable = discountsObj;
			var departmentsLable = departmentsObj;
			var keywordLable = '<input style="margin-right:5px;border:0px;text-indent:3px;font-family:inherit;font-size:13.333px;" id="azkeywords" type="text" size=30 name="azkeywords" onkeydown="if(event.which || event.keyCode) {if ((event.which == 13) || (event.keyCode == 13)) {findProducts();}}"/>';
	
			var cvLable = '<input id="azcv" type="hidden" value="' + getH[1] + '" />';
			var goLable = '<input style="height:23px;margin:0px; padding-top:0px; padding-bottom:0px;font-family:inherit;" id="azfind" type="submit" value="Go" onclick="findProducts();" />';			
														
			//creata HTML
			var findScript = document.createElement('script');
			findScript.type = 'text/javascript';
			findScript.text = scriptLable;
			discountHead.appendChild(findScript);
			
			var paddedDiv = document.createElement("div");
			paddedDiv.setAttribute("id", "padDiv");
			paddedDiv.style.paddingTop = "3em";
						
			var discountFinder = document.createElement("div");
			discountFinder.setAttribute("id", "discountfinder");
			discountFinder.setAttribute("name", "discountfinder");
			discountFinder.setAttribute("align", "center");
			discountFinder.style.font = "inherit";
			discountFinder.style.fontFamily = "arial,sans-serif";
			discountFinder.style.backgroundColor = "#0066cc";
			discountFinder.style.boxShadow = "0px 0px 5px 0px #00B7EF";
			discountFinder.style.lineHeight = "30px";
			discountFinder.style.textAlign = "center";
			discountFinder.style.position = "fixed";
			discountFinder.style.top = "0";
			discountFinder.style.left = "0";
			discountFinder.style.width = "100%";
			discountFinder.style.minWidth = "850px";
			discountFinder.style.zIndex = "1000";
			
			if (locale != "CA") {
				discountFinder.innerHTML = searchLable + countryLable + ccLable + shippingLable + discountsLable + departmentsLable + cvLable + keywordLable + goLable;
			} else {
				discountFinder.innerHTML = searchLable + countryLable + ccLable + discountsLable + departmentsLable + cvLable + keywordLable + goLable;
			}
	
			if (window.top === window) {
				document.body.insertBefore(paddedDiv, document.body.firstChild);
				document.body.insertBefore(discountFinder, document.body.firstChild);
			}
		}
	}	
}
)();

Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy

