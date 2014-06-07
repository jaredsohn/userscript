// ==UserScript==
// @name           Clean MoneyControl
// @namespace      amol.bakare
// @include        http://www.moneycontrol.com/bestportfolio/*
// ==/UserScript==

new function (){
	window.addEventListener("load", clean , false);
	function clean () {
		//top bar //div[@class='nav']
		removeIfFound("//div[@class='nav']")
		
		//left top 
		removeIfFound("//div[div[@title='http://img1.moneycontrol.com/images/promo/mytv_banner_2.swf']]")
		
		//right top /html/body/center[2]/div/div/div[5]
		removeIfFound("//div[@class='contr1 MT10']/table")
		
		removeIfFound("//div[@id='capdet_div']")
		removeIfFound("//div[@class='PB10']")
		
	}
	
	function removeIfFound(elementXPath){
		var elementToBeRemoved = document.evaluate( elementXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		//alert(elementToBeRemoved.snapshotLength)
		for(i=0; i<elementToBeRemoved.snapshotLength; i++){
			elementToBeRemoved=elementToBeRemoved.snapshotItem(i);
			elementToBeRemoved.innerHTML=""
		}
	}

}