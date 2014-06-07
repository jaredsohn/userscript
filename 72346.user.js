// ==UserScript==
// @name           HDChinaRateLimit
// @namespace      http://pto2k.blogspot.com
// @include        http://hdchina.org/*
// @include        https://hdchina.org/*
// ==/UserScript==

//alert("hi")

/*
2010-03-11
first version
*/

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
/*控制log显示*/
function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}

fontItem = xpath("//font")


upSize = fontItem.snapshotItem(3).innerHTML.replace(/[ A-Za-z]/g,'')*1
logToConsole(upSize)

downSize = fontItem.snapshotItem(5).innerHTML.replace(/[ A-Za-z]/g,'')*1
logToConsole(downSize)

toGo = (upSize/0.7-downSize+"").substring(0,5)
logToConsole(toGo)

temp = fontItem.snapshotItem(5).innerHTML
logToConsole(temp)
fontItem.snapshotItem(5).innerHTML = temp + " + [" + toGo + " GB]"