// ==UserScript==
// @name          Yahoo! Buzz Stock Values
// @namespace     http://www.satchnotes.com/
// @include       http://buzz.research.yahoo.com/bk/account/index.html
// @description   Displays the total value of each stock on your Buzz Game account page
// ==/UserScript==

var allStocksQty;
var allStocksPrice;

//change "Avg. Price" to "Value"
avgPrice = document.evaluate(
    	"//div[@class='data']/table[1]//tr/td[5]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

avgPrice.snapshotItem(0).textContent = avgPrice.snapshotItem(0).textContent.replace("Average Cost", "Value");

allStocksQty = document.evaluate(
        "//div[@class='data']/table[1]//tr//td[3]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

allStocksPrice = document.evaluate(
        "//div[@class='data']/table[1]//tr//td[4]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

var i=0;
while((res = allStocksQty.snapshotItem(i)) !=null ) {   
    qtyText = res.childNodes[0].data;

    if(!isNaN(qtyText)) {
        totalValue = qtyText * allStocksPrice.snapshotItem(i).childNodes[0].data.replace("$", "");

        if(!isNaN(totalValue)) {
            intTextData = Math.round(totalValue*100)/100;
            textData = intTextData.toString();

            //format the data
            if(textData.indexOf ("\.") == -1) {
                textData += ".00"
            } else if(textData.substring(textData.indexOf("\.")).length == 2) {
                textData += "0";
            }

            totalValueDisplay = document.createTextNode("$" + textData);
            avgPrice.snapshotItem(i).textContent = avgPrice.snapshotItem(i).textContent.replace(/.*/, "$"

+ textData);
        }
    }
    i++;
}
