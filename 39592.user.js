// ==UserScript==
// @name           Thumb & Thumber
// @namespace      TERTle Dude
// @description    Adds thumbnails to server index pages
// @include        http://*
// ==/UserScript==
var googleImageSearch = "http://images.google.com/images?q=";
var titleList = document.getElementsByTagName("title");
if(titleList && titleList.length > 0) {
	var title = document.getElementsByTagName("title")[0].innerHTML;

	if(title && title.toUpperCase().match("^INDEX OF"))
	{

		var anchors = document.getElementsByTagName("a");
		
		for(var i in anchors) {
			
			if(!/NAME|SIZE|DESCRIPTION|LAST MODIFIED|PARENT DIRECTORY/.test(anchors[i].innerHTML.toUpperCase())) {
				var anchor = anchors[i];
				var link = googleImageSearch + anchors[i].innerHTML.split(".")[0];

				var tokens = title.replace(/INDEX OF/i,"").split("/");
				
				for(var j in tokens) {
					link += " " + tokens[j];
				}
				
				anchor.innerHTML = "<img />" + anchors[i].innerHTML;
			
				if(/(jpg|jpeg|gif|png)$/i.test(anchor.href)) {
				
					anchor.firstChild.src = anchor.href;
					anchor.firstChild.height = "50";
					anchor.firstChild.width = "50";
				} 
				else {
					if(anchor.id == "")
						anchor.id = "thumbAnchor" + i;
						
					
					GrabFirstGoogleImage(anchor.id, link);
				}
				
				
			}
		}
	}
}

function GrabFirstGoogleImage(id, href)
{
	var xmlURL = href;
	
	GM_xmlhttpRequest({
		method:"GET",
		url: xmlURL,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/xml,text/xml'
		},
		onload:function(result) {
			var elementID = id;
			var html = result.responseText;
			var start = html.indexOf("id=ImgCont");
			html = html.substr(start);
			
		
			var link = document.getElementById(id);
			link.firstChild.src = /src=\S+/gi.exec(html)[0].substr(4);
		}
	});
}

