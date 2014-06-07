// ==UserScript==
// @name          360blastUpdater
// @description	  automatic post blast to yahoo!360
// @include       http://*
// @exclude       http://*360.yahoo.com/*
// ==/UserScript==

function blast() {
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://360.yahoo.com/ws/blast/V2/newBlast.html',
    headers: { "Content-type" : "application/x-www-form-urlencoded" },
    onload: function(responseDetails) {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(responseDetails.responseText, "application/xml");
        var session = xmlDoc.getElementsByTagName("WSSID")[0].textContent;
		if(session != ''){
			//
			GM_xmlhttpRequest({
			    method: 'POST',
			    url: 'http://360.yahoo.com/ws/blast/V2/newBlast.html?wssid='+ session,
				headers: { "Content-type" : "application/x-www-form-urlencoded" },
				data: 'wssid='+ session + '&output=xml' + '.crumb=&blst=' + encodeURI(document.title) + '&btype=2&burl=' + encodeURI(window.location.href) + '&cancelbutton=Cancel&form_submitted=ws_blast_ywidget&form_submitted=ws_blast_ywidget&submitbutton=Save',
			    onload: function(responseDetails) {
					var parser = new DOMParser();
					var xmlDoc = parser.parseFromString(responseDetails.responseText, "application/xml");
			        var status = xmlDoc.getElementsByTagName("STATUS")[0].textContent;
					if(status == 0){
						//alert("OK");
					} else {
						//alert("ERROR");
					}
			    }
			});
			//
		} else {
			//alert("ERROR 2");
		}
    }
});
}

setTimeout(blast, 30000);
