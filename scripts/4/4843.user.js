// ==UserScript==
// @name        digg - display friends diggs
// @namespace   http://www.npike.net
// @description Displays the list of your friends that have dugg an article under each story title.
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// ==/UserScript==


var xpath = "//div[@class='news-summary']/ul/li/a";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i = 0; i < result.snapshotLength; i++ )
	{
	
		var omo = result.snapshotItem(i).getAttribute("onmouseover");
		if (omo != null)
		{
			//return escape('<h6>Friends who dugg this</h6><img src=\'/userimages/sickaltima/small3052.jpg\'> sickaltima<br/>')"
			omo = omo.substring(omo.indexOf("/h6>")+4, omo.length-2);
			// strip <br/> tags
			omo = omo.replace(/<br\/>/g, "&nbsp;&nbsp;");
			// replace javascript escaping characters
			omo = omo.replace(/\\/g,"");
			
				var br = document.createElement("br");
				var div = document.createElement("div");
				div.setAttribute("style","color: #009900");
				div.innerHTML = omo;
				
				// locate the paragraph in the article brief containing submission info
				var elt = result.snapshotItem(i).parentNode.parentNode.parentNode.childNodes[1].getElementsByTagName("p").item(0);
				if (elt != null) {
					elt.appendChild(br);
					elt.appendChild(div);
				}
		}
		
	}