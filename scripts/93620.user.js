// ==UserScript==
// @name           Facebook - History Expander
// @namespace      Facebook - History Expander
// @include        http*://www.facebook.com/*
// ==/UserScript==


start();

function start()
{

    var c;
    var t;
    if (c = document.getElementById('content')) {
    	check();
		//if(document.location.href.indexOf(".facebook.com/external")>-1){
		//}else{
			c.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout(check, 1); }, false);
		//}
	}

    delete c;
    return false;


}

function check(){
	var history = document.getElementsByClassName("uiStreamMessage uiStreamPassive ministoryMessage");
	for(e=0; e<history.length; e++){
		if(history[e].innerHTML.indexOf("...\"")>-1){
			history[e].innerHTML = history[e].innerHTML.replace("...\" on","&nbsp;<a class='historyEtc' href='#'>...</a>\" on");
		}
	}
	
	var historyEtc = document.getElementsByClassName("historyEtc");
	for(e=0; e<historyEtc.length; e++){
		historyEtc[e].addEventListener('click', function (event) {
				expandHistory(this);
		},true);
	}

}

function expandHistory(historyEtc){
	var as = historyEtc.parentNode.getElementsByTagName("a");
	var link = as[as.length-1].href;
	sendRequest(link,historyEtc);
}


function sendRequest(url,historyEtc){
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },
        onload: function (response) {
            if ((response.readyState == 4) && (response.status == 200)) handleEtc(response.responseText,historyEtc);
        }
    });
}

function handleEtc(response,historyEtc){
	var start = historyEtc.parentNode.innerHTML.split("\"")[1].split("&nbsp;<a class")[0];
	
	response = response.replace(/&#039;/gi,"'");
	
	var end = response.split(start)[1].split("</span>")[0];
	var historyItem = historyEtc.parentNode;
	historyEtc.parentNode.removeChild(historyEtc);
	historyItem.innerHTML = historyItem.innerHTML.replace(start, start+end);
}