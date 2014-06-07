// ==UserScript==
// @name           Google Reader Title
// @namespace      http://pto2k.blogspot.com
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

/*
show feed/post titles in the browser's title bar
*/

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}
function Tits(){
//alert("dd")
	feedTitle = document.getElementById("chrome-title")
	logToConsole(feedTitle)
	postTitle = xpath("//div[@id='current-entry']//a[@class='entry-title-link']")
	logToConsole(postTitle)
	if(postTitle.snapshotItem(0)){
		postTitleText = postTitle.snapshotItem(0).textContent
	}else{
		postTitle = xpath("//div[@id='current-entry']//h2[@class='entry-title']")
		logToConsole(postTitle)
		if(postTitle.snapshotItem(0)){
			postTitleText = postTitle.snapshotItem(0).textContent
		}else{
			postTitle = xpath("//h2[@class='entry-title']")
			logToConsole(postTitle)
			if(postTitle.snapshotItem(0)){
				postTitleText = postTitle.snapshotItem(0).textContent
			}else{
				postTitleText = ""
			}
		}
	}

	logToConsole(postTitleText)
	document.title = (postTitleText==""?postTitleText:(postTitleText+ " || "))+ feedTitle.textContent + "    " + origTitle
}
origTitle = document.title
document.addEventListener('click', Tits, false)
window.addEventListener('keypress', Tits, false)
setInterval(Tits, 8964)
Tits();