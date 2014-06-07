// ==UserScript==
// @name           Matrix Stats extractor
// @namespace      http://www.simplysensibleconsulting.ca/gmscripts
// @description    Extract some stats from the Matrix thumbnail page
// @include        http://www.victoriamls.ca/Matrix/Public/Portal.aspx*
// ==/UserScript==

String.prototype.normalize_space = function() {
// Replace repeated spaces, newlines and tabs with a single space
return this.replace(/^\s*|\s(?=\s)|\s*$/g, "");
}

String.prototype.formatNumber = function() {
    return this.replace(/,/g, "");
}

var listingTables = document.evaluate("/html/body/form[@id='Form1']/div[@id='m_divPortal']/div[@id='m_divPortalContent']/div[@class='Portal_Page']/div[@id='_ctl0_m_pnlDisplay']/div[@class='multiLineDisplay clickableDisplay']/table[@id='wrapperTable']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var output = document.createElement('textarea');
output.setAttribute("cols", "170");

document.body.insertBefore(output, document.body.firstChild);

var salesList = [];

//console.log("Found listings: "+listingTables.snapshotLength);
for ( var i=0 ; i < listingTables.snapshotLength; i++ )  
{

    var cell = "/html/body/form[@id='Form1']/div[@id='m_divPortal']/div[@id='m_divPortalContent']/div[@class='Portal_Page']/div[@id='_ctl0_m_pnlDisplay']/div[@class='multiLineDisplay clickableDisplay']["+(i+1)+"]/table[@id='wrapperTable']/tbody/tr/td[@class='d31m1']/table[@class='d31m2']";

    var mlsNumber = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[1]/td[@class='d31m18']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    mlsNumber = mlsNumber.textContent;
    //GM_log("MLS number "+mlsNumber);
    
    var address =   document.evaluate(cell+"/tbody/tr[3]/td[@class='d31m5']/table[@class='d31m2']/tbody/tr/td[@class='d31m7']/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    address = address.textContent.trim();
    //GM_log("Address: "+address);

    var assessment = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[5]/td[@class='d31m18']/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    assessment = assessment.textContent.trim().formatNumber();
//    GM_log("Assessment: "+assessment);
    
    var currentPrice = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[3]/td[@class='d31m18']/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    currentPrice = currentPrice.textContent.trim().formatNumber();
    
    var salePrice = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[4]/td[@class='d31m18']/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    salePrice = salePrice.textContent.trim().formatNumber();
//    GM_log("Sale Price: "+salePrice);
    
    var saleDate = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[2]/td[@class='d31m22']/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    saleDate = saleDate.textContent.trim();
    
    var interiorSpace = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[4]/td[@class='d31m21'][1]/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    interiorSpace = interiorSpace.textContent.trim().formatNumber();
    
    var exteriorSpace = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[6]/td[@class='d31m21'][1]/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    exteriorSpace = exteriorSpace.textContent.trim().formatNumber();
    
    var yearBuilt = document.evaluate(cell+"/tbody/tr[4]/td[@class='d31m15']/table[@class='d31m16']/tbody/tr[5]/td[@class='d31m22']/span[@class='field']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    yearBuilt = yearBuilt.textContent.trim();
    
    if(salePrice.length > 0) {
	    // check the box for this listing
	    //var checkbox = document.evaluate(cell+"/tbody/tr[3]/td[@class='d31m5']/table[@class='d31m2']/tbody/tr/td[@class='d31m6']/span[@class='field NoPrint']/input", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    //checkbox.checked = true;
		salesList.push(saleDate+ "\t"+ address +"\t"+ mlsNumber +"\t"+ interiorSpace +"\t"+ exteriorSpace +"\t"+ yearBuilt +"\t"+assessment+"\t"+currentPrice +"\t"+salePrice);
    }
}
output.setAttribute("rows", ""+salesList.length);
salesList.sort();
for(var i = 0; i < salesList.length; i++) {
	output.textContent += (salesList[i]+"\n");
}
output.select();
