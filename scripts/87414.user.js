// ==UserScript==
// @name           NeoGame
// @namespace      Baracs
// @include        http://www.neopets.com/*
// ==/UserScript==

(function(){

	var url = window.location.href;
	//save the cheapest prices for stuff from the shop wizard
	var content = document.getElementsByClassName("content")[0];
	//alert("test");
	document.getElementsByClassName("ad_wrapper_fixed")[0].parentNode.parentNode.removeChild(document.getElementsByClassName("ad_wrapper_fixed")[0].parentNode);
	document.getElementById("pushdown_banner").style.height = "90px";
	document.getElementById("ad-slug-wrapper").parentNode.removeChild(document.getElementById("ad-slug-wrapper"));
	/*function formGet(){
	//if(url != "http://www.neopets.com/water/fishing.phtml"){
		for(var i = 0; i < content.getElementsByTagName("form").length; i++){
			content.getElementsByTagName("form")[i].method = "get";
		}
	
	}*/
	
	var randomEvent;
	if(content.firstElementChild.tagName == "table" && content.getElementsByTagName("td")[0].textContent == "Something has happened!"){
		alert("RandomEvent!");
		randomEvent = content.firstElementChild;
		content.removeChild(randomEvent);	
	}
	
	//if(content.getElementsByTagName("form")[0].getElementsByTagName("input")[2] != undefined){
	if(url.indexOf("http://www.neopets.com/market.phtml") != 1  && content.getElementsByTagName("form")[0].getElementsByTagName("input")[2] != undefined && (content.getElementsByTagName("form")[0].getElementsByTagName("input")[2].value == "New Search" || content.getElementsByTagName("form")[0].getElementsByTagName("input")[2].value == "Try Again")){
		
		//alert("test1");
		//get cheapest
		
		var item = content.getElementsByTagName("span")[0].textContent.toLowerCase();
		
		//need to get the price alone,
		//price = parseInt(price.replace(/[A-z ,]/g,""));
		//check if item exists
		//alert("test2");
		if(content.getElementsByTagName("form")[0].getElementsByTagName("input")[2].value != "Try Again"){
		var price = parseInt(content.getElementsByTagName("table")[1].getElementsByTagName("td")[7].textContent.replace(/[A-z ,]/g,""));
			var oldPrice = GM_getValue("420_" + item);
			if(oldPrice == undefined || oldPrice > price){
				GM_setValue("420_"+item,price);
				//alert("420_"+item+" "+price);
			}
		}
		
		//GM_setValue("420_"+item,price);
		//alert(GM_getValue("420_"+item));
		var currentValue = GM_getValue("420_" + item);
		//alert("test3");
		if(currentValue != undefined){
			//display cheapest stuff seen on wiz search. should also someday make it so it works when seach fails. Try Again button (does now)
			var cheapestSpan = document.createElement("span");
			cheapestSpan.textContent = "Cheapest seen: " + currentValue + " NP ";
			content.getElementsByTagName("td")[1].appendChild(document.createElement("br"));
			content.getElementsByTagName("td")[1].appendChild(document.createElement("br"));
			content.getElementsByTagName("td")[1].appendChild(cheapestSpan);
			
			var resetButton = document.createElement("input");
			resetButton.type = "button";
			resetButton.value = "Reset";
			resetButton.style.fontSize = "9px";
			resetButton.style.width = "42px";
			resetButton.addEventListener('click', function(){GM_deleteValue("420_" + item); cheapestSpan.textContent = "";}, false);
			//resetButton.setAttribute("onclick", "alert('test');");
			cheapestSpan.appendChild(resetButton);
		}
			
			
			
		//alert("test4");
		var wizRefresh = document.createElement("td");
		
		wizRefresh.vAlign = "top";
		var wizRefreshBox = document.createElement("input");
		wizRefreshBox.type = "checkbox";
		var refreshDiv = document.createElement("div");
		refreshDiv.style.visibility = "hidden";
		refreshDiv.style.marginLeft = "1.5em";
		var fiveRefresh = document.createElement("input");
		fiveRefresh.type = "radio";
		fiveRefresh.addEventListener('click', function(){if(this.checked == true){GM_setValue("420refreshType", 5); document.location.href = document.location.href;}}, false);
		var tenRefresh = document.createElement("input");
		tenRefresh.type = "radio";
		tenRefresh.addEventListener('click', function(){if(this.checked == true){GM_setValue("420refreshType", 10); document.location.href = document.location.href;}}, false);
		var twentyFiveRefresh = document.createElement("input");
		twentyFiveRefresh.type = "radio";
		twentyFiveRefresh.addEventListener('click', function(){if(this.checked == true){GM_setValue("420refreshType", 25); document.location.href = document.location.href;}}, false);
		var fiftyRefresh = document.createElement("input");
		fiftyRefresh.type = "radio";
		fiftyRefresh.addEventListener('click', function(){if(this.checked == true){GM_setValue("420refreshType", 50); document.location.href = document.location.href;}}, false);
		var hundredRefresh = document.createElement("input");
		hundredRefresh.type = "radio";
		hundredRefresh.addEventListener('click', function(){if(this.checked == true){GM_setValue("420refreshType", 100); document.location.href = document.location.href;}}, false);
		
		refreshDiv.appendChild(fiveRefresh);
		refreshDiv.appendChild(document.createTextNode(" 5 times"));
		refreshDiv.appendChild(document.createElement("br"));
		refreshDiv.appendChild(tenRefresh);
		refreshDiv.appendChild(document.createTextNode(" 10 times"));
		refreshDiv.appendChild(document.createElement("br"));
		refreshDiv.appendChild(twentyFiveRefresh);
		refreshDiv.appendChild(document.createTextNode(" 25 times"));
		refreshDiv.appendChild(document.createElement("br"));
		refreshDiv.appendChild(fiftyRefresh);
		refreshDiv.appendChild(document.createTextNode(" 50 times"));
		refreshDiv.appendChild(document.createElement("br"));
		refreshDiv.appendChild(hundredRefresh);
		refreshDiv.appendChild(document.createTextNode(" 100 times"));
		wizRefreshBox.addEventListener('click', function(){if(this.checked == true){GM_setValue("420wizRefresh", true); refreshDiv.style.visibility = "visible"; GM_setValue("420refreshCounter",0);}else{GM_deleteValue("420wizRefresh"); refreshDiv.style.visibility = "hidden"; fiveRefresh.checked = false; tenRefresh.checked = false; twentyFiveRefresh.checked = false; fiftyRefresh.checked = false; hundredRefresh.checked = false; GM_deleteValue("420refreshType"); GM_setValue("420refreshCounter",0);}},false);
		wizRefresh.appendChild(wizRefreshBox);
		wizRefresh.appendChild(document.createTextNode(" Auto Refresh"));
		var counterSpan = document.createElement("span");
		wizRefresh.appendChild(counterSpan);
		wizRefresh.appendChild(document.createElement("br"));
		wizRefresh.appendChild(refreshDiv);
		content.getElementsByTagName("tr")[0].appendChild(wizRefresh);
		if(GM_getValue("420wizRefresh") != undefined && GM_getValue("420wizRefresh") == true){
			//wizRefreshBox.checked = true;
			var refreshType = GM_getValue("420refreshType");
			if(refreshType != undefined){
				var refreshCounter = GM_getValue("420refreshCounter");
				refreshCounter += 1; 
				counterSpan.appendChild(document.createTextNode(" " + refreshCounter + "x"));
					if(refreshType == 5){	
					if(refreshCounter >= 5){
						GM_deleteValue("420refreshType");
						refreshCounter = 0;
						//fiveRefresh.checked = false;
						//wizRefreshBox.checked = false;
					}else{
						wizRefreshBox.checked = true;
						fiveRefresh.checked = true;
						refreshDiv.style.visibility = "visible";
					}
				}else if(refreshType == 10){
					if(refreshCounter >= 10){
						GM_deleteValue("420refreshType");
						refreshCounter = 0;
						//tenRefresh.checked = false;
						//wizRefreshBox.checked = false;
					}else{
						wizRefreshBox.checked = true;
						tenRefresh.checked = true;
						refreshDiv.style.visibility = "visible";
					}
				}else if(refreshType == 25){
					if(refreshCounter >= 25){
						GM_deleteValue("420refreshType");
						refreshCounter = 0;
						//wizRefreshBox.checked = false;
						//twentyFiveRefresh.checked = false;
					}else{
						wizRefreshBox.checked = true;
						twentyFiveRefresh.checked = true;
						refreshDiv.style.visibility = "visible";
					}
				}else if(refreshType == 50){
					tenRefresh.checked = true;
					if(refreshCounter >= 50){
						GM_deleteValue("420refreshType");
						refreshCounter = 0;
						//wizRefreshBox.checked = false;
						//fiftyRefresh.checked = false;
					}else{
						wizRefreshBox.checked = true;
						fiftyRefresh.checked = true;
						refreshDiv.style.visibility = "visible";
					}
				}else if(refreshType == 100){
					if(refreshCounter >= 100){
						GM_deleteValue("420refreshType");
						refreshCounter = 0;
						//wizRefreshBox.checked = false;
						//hundredRefresh.checked = false;
					}else{
						wizRefreshBox.checked = true;
						hundredRefresh.checked = true;
						refreshDiv.style.visibility = "visible";
					}
				}
				GM_setValue("420refreshCounter", refreshCounter);
				if(refreshCounter != 0){
					document.location.href = document.location.href;
				}
			}
			//refreshSpan.style.visibility = "visible";
			//document.location.href = document.location.href;
			//searchForm.submit();
		}
			
	}/*else if(GM_getValue("420refreshType") != undefined){ //if page was navigated from while a refresh was in progress need to clear counter. 
		GM_deleteValue("420refreshType");
		GM_deleteValue("420refreshCounter");
		GM_deleteValue("420wizRefresh");
	}*/
	//}
	
	function shopValueAdder(shopItems){
		var value;
		var cost;
		if(shopItems != undefined && shopItems.length != 0){
			for(var i = 0; i< shopItems.length; i++){
				value = GM_getValue("420_" + shopItems[i].getElementsByTagName("b")[0].textContent.toLowerCase());
				//alert(shopItems[i].getElementsByTagName("br")[2].nextSibling.textContent);
				cost = parseInt(shopItems[i].getElementsByTagName("br")[2].nextSibling.textContent.replace(/[A-z : ,]/g,""));
				//alert(cost);
				var valueText = document.createElement("span");
				valueText.textContent = "Value : " + value + " NP";
				if(value != undefined){
					if(cost >= value){
						//print in red
						valueText.style.color = "red";
						shopItems[i].insertBefore(valueText,shopItems[i].getElementsByTagName("br")[4]);
					}else{
						//pring in green
						valueText.style.color = "green";
						shopItems[i].insertBefore(valueText,shopItems[i].getElementsByTagName("br")[4]);
					}
					//alert(shopItems[i].getElementsByTagName("br")[2].nextSibling);
				}
			}
		}
	}
	
	function shopRefresher(shopItems,insertLocation){ // will need too add insertLocation
	
		var shopType;
		if(url.indexOf("igloo") != -1){
			shopType = "igloo";
		}else{
			shopType = url.split("obj_type=")[1].split("&")[0];
			//alert(shopType);
		}
		//alert("test");
		var shopItemsLength;
		if (shopItems == undefined){
			shopItemsLength = 0;
		}else{
			shopItemsLength = shopItems.length; 
		}
		
		var shopRefreshBox = document.createElement("input");
		shopRefreshBox.type = "checkbox";
		//iglooRefreshBox.align = "right";
		shopRefreshBox.addEventListener('click', function(){if(this.checked == true){GM_setValue("420"+shopType+"Refresh", true); GM_setValue("420"+shopType+"Count",shopItemsLength); shopAlertDiv.style.visibility = "visible";document.location.href = document.location.href;}else{GM_deleteValue("420"+shopType+"Refresh"); shopAlertDiv.style.visibility = "hidden";}},false);
		var shopRefreshDiv = document.createElement("div");
		shopRefreshDiv.style.position = "absolute";
		shopRefreshDiv.style.right = "50px";
		shopRefreshDiv.style.marginTop = "15px";
		shopRefreshDiv.appendChild(shopRefreshBox);
		shopRefreshDiv.appendChild(document.createTextNode(" Auto Refresh"));
		content.insertBefore(shopRefreshDiv,insertLocation); //need to change based on insertLocation
		var shopAlertDiv = document.createElement("div");
		shopAlertDiv.style.visibility = "hidden";
		shopAlertDiv.style.marginLeft = "1.5em";
		var shopAlertBox = document.createElement("input");
		shopAlertBox.type = "checkbox";
		shopAlertBox.addEventListener('click', function(){if(this.checked == true){GM_setValue("420"+shopType+"Alert", true); }else{GM_deleteValue("420"+shopType+"Alert");}},false);
		shopAlertDiv.appendChild(shopAlertBox);
		shopAlertDiv.appendChild(document.createTextNode("Popup notification"));
		shopRefreshDiv.appendChild(shopAlertDiv);
		
		if(GM_getValue("420"+shopType+"Alert") != undefined && GM_getValue("420"+shopType+"Alert") == true){
			shopAlertBox.checked = true;
		}
		
		if(GM_getValue("420"+shopType+"Refresh") != undefined && GM_getValue("420"+shopType+"Refresh") == true){
		//alert("test!!");
			shopRefreshBox.checked = true; 
			shopAlertDiv.style.visibility = "visible";
			var oldShopCount = GM_getValue("420"+shopType+"Count");
			//alert(shopItems.length + "<=" + oldShopCount);
	
			if(shopItemsLength <= oldShopCount){
				if(shopItemsLength < oldShopCount){
					GM_setValue("420"+shopType+"Count",shopItemsLength);						//FIX!!! prolly works but doesnt need to set val when equal
				}
				document.location.href = document.location.href;
			}else{
				GM_setValue("420"+shopType+"Count",shopItemsLength);
				GM_setValue("420"+shopType+"Refresh", false);
				shopRefreshBox.checked = false; 
				shopAlertDiv.style.visibility = "hidden";
				if(shopAlertBox.checked == true){
					alert("Restock!!!");
				}
			}
		}
	
	}
	//display known cheapest know value for the items igloo ( will need to creat a diffrent shopItems for other shops)
	if(url == "http://www.neopets.com/winter/igloo2.phtml"){
		var shopItems = content.getElementsByTagName("td");
		//alert(shopItems.length);
		shopValueAdder(shopItems);
		shopRefresher(shopItems,content.firstElementChild.nextSibling);
	}
	
	if(url.indexOf("http://www.neopets.com/objects.phtml") != -1 && url != "http://www.neopets.com/objects.phtml?type=inventory"){
		
		var shopItems;
		if(content.getElementsByClassName("contentModuleContent")[1] != undefined){
			//alert("testung");
			shopItems = content.getElementsByClassName("contentModuleContent")[1].getElementsByTagName("td");
			//alert("testing 2");
		}
		//alert("this is a test");
		//alert(shopItems[0].getElementsByTagName("b")[0].textContent);
		shopValueAdder(shopItems);
		shopRefresher(shopItems,content.getElementsByTagName("form")[0]);
	}
	
	//alert("test5");
	if(url.indexOf("http://www.neopets.com/market.phtml?") != -1 && url.indexOf("type=your") != -1 || url.indexOf("http://www.neopets.com/market_your.phtml") != -1){
		//alert((content.getElementsByTagName("form").length+1)/2-1);
		//formGet();
		if(content.getElementsByTagName("form").length == 3){
			content.getElementsByTagName("form")[0].method = "get";
			content.getElementsByTagName("form")[2].method = "get";
		}
		var valueTable = document.createElement("td");
		valueTable.innerHTML = "<b>Shop Wizard Value</b>";
		valueTable.align = "center";
		valueTable.bgColor = "#dddd77";
		var shopStuff = content.getElementsByTagName("form")[(content.getElementsByTagName("form").length+1)/2-1].getElementsByTagName("tr");
		shopStuff[0].insertBefore(valueTable,shopStuff[0].lastChild.previousSibling);
		for(var i = 1; i < shopStuff.length-1; i++){
			valueTable = document.createElement("td");
			if(GM_getValue("420_" + shopStuff[i].firstChild.firstChild.textContent.toLowerCase()) != undefined){
				valueTable.textContent = GM_getValue("420_" + shopStuff[i].firstChild.firstChild.textContent.toLowerCase()) + " NP";
			}else{
				valueTable.textContent = "-";
			}
			valueTable.align = "center";
			valueTable.bgColor = "#ffffcc";
			shopStuff[i].insertBefore(valueTable,shopStuff[i].lastChild.previousSibling);
		}
		valueTable = document.createElement("td");
		valueTable.bgColor = "#dddd77";
		shopStuff[shopStuff.length-1].appendChild(valueTable);
	}
	//alert("test6");
	//alert(content.getElementsByClassName("contentModuleContent")[0].getElementsByTagName("div")[1].firstElementChild.value);
	
	if(content.getElementsByTagName("input")[7] != undefined){
		//alert(content.getElementsByClassName("contentModuleContent")[0].getElementsByTagName("div")[1].firstElementChild.value);
		if(url.indexOf("http://www.neopets.com/market.phtml") != 1 && content.getElementsByTagName("input")[7].value == "Search"){
			//formGet();
			content.getElementsByTagName("form")[0].method = "get";
			//GM_setValue("420wizSearch", content.getElementsByTagName("form")[0].toSource());
			//alert("in");
			//alert("test7"); //should not trigger
			var quickValue = document.createElement("td");
			content.getElementsByTagName("form")[0].getElementsByTagName("tr")[0].appendChild(quickValue);
			content.getElementsByTagName("form")[0].getElementsByTagName("input")[2].addEventListener("keyup", function(){ if(GM_getValue("420_" + content.getElementsByTagName("form")[0].getElementsByTagName("input")[2].value.toLowerCase()) != undefined){quickValue.textContent = GM_getValue("420_" + content.getElementsByTagName("form")[0].getElementsByTagName("input")[2].value.toLowerCase()) + " NP";}else{quickValue.textContent = "";}}, false);
		}
	}
	
	if(randomEvent != undefined){
		content.insertBefore(randomEvent,content.firstElementChild);
	}
//alert("success");
})();