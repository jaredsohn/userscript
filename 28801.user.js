// ==UserScript==
// @name           doublePost
// @namespace      zarg/kds/doublePost
// @include        http://club.pchome.net/topic_1_15_*_.html
// @description    v1.0 by zarg
// ==/UserScript==


var cPage

if(!location.href.match(/15_\d{1,}_\d{1,}(_)?_\.html/g)){
	
	cPage=1	
	
}

else{
	
	cPage=(parseInt(location.href.match(/\d{1,}(?=(_)?_\.html)/g),10))
	
}

var pages = document.evaluate(
    "//a[@class='page']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);  
    
if (parseInt(pages.snapshotItem(pages.snapshotLength/2-1).textContent,10)>cPage){
	
	getPost()
	
}
	
function getPost(){

	GM_xmlhttpRequest({
		method: 'GET',
		url: location.href.match(/.*[\d]{4}/g)+'_'+(cPage+1).toString()+'__.html',
		overrideMimeType:'text/plain;charset=gb2312',
		onload: function(responseDetails) {
				
			var c =responseDetails.responseText.match(/<!--\s楼\s-->(\n|.)*<!--\s\/楼\s-->/g)
			
			var	logo = document.createElement("div");
			
			var links = document.evaluate(
			    "//div[@class='item odd']",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);
	
			var b=links.snapshotItem(24)
				
			logo.innerHTML = c
				
			b.parentNode.insertBefore(logo, b.nextSibling);
			
		}
	});

}

