// ==UserScript==
// @id             github.com-e8e04ac8-5360-4af4-8964-0199d3c6388a@meh
// @name           Historious script for github
// @version        1.2
// @namespace      meh
// @author         Yansky
// @description    Allows you to save github pages to your historious account.
// @include        https://github.com/*
// @run-at         document-end
// @noframes
// @updateURL		http://userscripts.org/scripts/source/183155.user.js
// @resource 	historiousIcon 	http://historio.us/media/images/icon.png
// ==/UserScript==

function firstRun(){

	if(!GM_getValue("historious_APIKey", false)){

		var promptValue = prompt('Please enter your Historious API key for the historious userscript.\nYour Historious API key can be found here: https://historio.us/settings/ ');
		
		if(!promptValue){
			
			return;
			
		}
		
		GM_setValue("historious_APIKey", promptValue.toString() );

	}

}

firstRun();

function initScript() { 

	if(!GM_getValue("historious_APIKey", false)){
	
		return;
	
	}
	
	GM_addStyle("#historious_notify>p {margin: 20px 0 0 70px; text-align: center;} #historious_notify>p>a {color: white; text-decoration:underline;}");
	
	var notifyBox = document.createElement('div');
	notifyBox.setAttribute('id','historious_notify');
	notifyBox.setAttribute('style','top:0; '+
									'right:0; '+
									'position:fixed; '+
									'height:80px; '+
									'z-index: 10000000;  '+
									'margin: 0;  '+
									'padding: 0;  '+
									'background-color: #bf1b2c; '+
									'color: white; '+
									'width: 370px;'
									);
									
	var hisLogo = document.createElement('img');
	hisLogo.src = GM_getResourceURL("historiousIcon");
	hisLogo.setAttribute('style','float:left; margin:8px 0 0 8px;');
	
	notifyBox.appendChild(hisLogo);
	
	var notifyP = document.createElement('p');
	notifyP.setAttribute('id','historious_notify_p');
	notifyP.innerHTML = "We are indexing the page, please don't close this window yet...";
	
	notifyBox.appendChild(notifyP);
	
	document.body.insertBefore(notifyBox, document.body.firstChild);
	
	var myData = new FormData();
	myData.append("acceptCharset", "utf8");
	myData.append("source", "<html>" + document.getElementsByTagName('html')[0].innerHTML + "</html>");
	myData.append("url", window.location.href);
	myData.append("tags", "");
	myData.append("public", "1");
	myData.append("title", "");

	var ret = GM_xmlhttpRequest({
		method: "POST",
		data: myData,
		url: "http://historio.us/" + "post/" + GM_getValue("historious_APIKey") + "/?v=1",
		onload: function(res) {
			
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument('','', dt);
			var html = doc.createElement('html');
			html.innerHTML = res.responseText;
			var newDoc = doc.appendChild(html);  
		
			notifyP.innerHTML = newDoc.querySelector('p').innerHTML;
			
			window.setTimeout(function(){
			
				document.body.removeChild(notifyBox);
			
			},3000);
			
		},
		onerror: function(res) {
		
			var msg = "An error occurred."
					+ "\nresponseText: " + res.responseText
					+ "\nreadyState: " + res.readyState
					+ "\nresponseHeaders: " + res.responseHeaders
					+ "\nstatus: " + res.status
					+ "\nstatusText: " + res.statusText
					+ "\nfinalUrl: " + res.finalUrl;
			
			GM_log(msg);
			
			notifyP.innerHTML = 'An error occurred, please try again.';
			
			window.setTimeout(function(){
			
				document.body.removeChild(notifyBox);
			
			},3000);			
			
		}
	});
	
}

GM_registerMenuCommand("Save page to Historious", initScript);