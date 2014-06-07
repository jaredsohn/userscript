// ==UserScript==
// @name           Amazon Discounts Ver 1.2
// @namespace      http://diveintogreasemonkey.org/download/
// @description    Amazon Discounts
// @include        http://amazon.com/*
// @include        http://www.amazon.com/*
// ==/UserScript==

// Version 1.2

function initializeDepartments(localeV) {
	//Initialize Data
	var departmentsHurray = [
	 ["US","aps","Select  Department"] ,["US","outlet"," >> Outlet Store"]	,["US","stripbooks,n:220084011"," >> Books: 4-for-3 Offer"]
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
	,["US","toys-and-games","Toys & Games"] ,["US","videogames","Video Games"] ,["US","watches","Watches"]
	];

	localeV = localeV || 'US';
	var departmentsSelectSpan = document.createElement("span");
	var departmentsSelect = document.createElement("select");
	departmentsSelect.setAttribute("id", "azcat");
	departmentsSelect.setAttribute("name", "p");
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
	var discountsHurray = [["","Select  Discount"],["90-","90%"],["80-","80%"],["70-","70%"],["60-","60%"],
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
	var setH = new Array(1);
	switch (hostURL) {
		case "www.amazon.com": 		setH=["seattlers", "20", "com", "ATVPDKIKX0DER", "US", "Discount Search"]; break;
		
		default:			 setH=["seattlers", "20", "com", "ATVPDKIKX0DER", "US", "Discount Search"]; 
	}
	return setH;
};

//Populate Products
function initializeSearch() {
	var searchScript =  '' +
			 	'function findProducts() {'
			+ '	var country, merchant, shipping, discount, category, sprint, searchwords, searchurl;'
			+ '	country = document.getElementById("azdomain").value;'
			+ ' discount = document.getElementById("azpct").value;'
			+ ' category = document.getElementById("azcat").value;'
			+ ' searchwords = document.getElementById("azkeywords").value;'
			+ ' sprint = document.getElementById("azcc").value + "-" + document.getElementById("azcv").value;'
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
			var searchLable = '<lable for="search" style="color:#000000;font-weight:bold;padding-right:15px;font-size:14px;"> ' + getH[5] + "</lable>" ;
			
			var countryLable = '<input id="azdomain" type="hidden" value="' + getH[2] + '" />';
			var ccLable = '<input id="azcc" type="hidden" value="' + getH[0] + '" />';

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
			discountFinder.style.backgroundColor = "#FF8000";
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
				discountFinder.innerHTML = searchLable + countryLable + ccLable + discountsLable + departmentsLable + cvLable + keywordLable + goLable;
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