// ==UserScript==
// @name           Facebook - Skip Facebook Scam Sites
// @namespace      Facebook - Skip Facebook Scam Sites
// @include        *
// @exclude        http*://www.facebook.*
// ==/UserScript==

if(document.getElementById("fm-content")){
	var toPage = document.getElementById("fm-content").action;
	GM_setValue("skipPage",toPage);
	document.location = toPage;
}

if(GM_getValue("skipPage")){
	if(document.location == GM_getValue("skipPage")){
		var redirect = document.getElementsByTagName("body")[0].innerHTML.split("window.open(\"");

		if(redirect.length>1){
			redirect = redirect[1].split("\"")[0]
		}else{
			redirect = null;
		}
		
		if(redirect){
			var page = redirect;
			var path = document.location.pathname;
			var dir = document.location.href.replace(path,"");
			pathURL = document.location.href = dir + "/" + page;
			//GM_deleteValue("skipPage");
		}else if(unsafeWindow.OpenWindow){
			document.location = unsafeWindow.OpenWindow;
			//GM_deleteValue("skipPage");
		}else if(unsafeWindow.performProcess){
			unsafeWindow.performProcess();
			//GM_deleteValue("skipPage");
		}else{
			var as = document.getElementsByTagName("a");
			for(i=0; i<as.length; i++){
				if(as[i].href.indexOf(".php")>-1){
					document.location = as[i].href;
					break;
				}
			}
		
		}

	}
}