// ==UserScript==
// @name          Slicker GoogleReader
// @namespace     http://www.madhusudhan.info/userscripts
// @description   Removes the redundant boxes selectors-box and add-box in the navigation pane from reader.google.com
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// @include       http://reader.google.com/*
// @include       https://reader.google.com/*
// ==/UserScript==
                                                                                                                                                             
/*
  Author: Madhusudhan Rao - http://www.madhusudhan.info/
  Created to get more room for the tag-labels navigation treebox

  Modified by:
  Jeetu - http://www.cse.iitb.ac.in/~jeetu
*/

(function() {
	var count=0;
        function removeRedundantElements() {
		if (hasElements()) {
			//var parentDiv = document.getElementById('selectors-container').parentNode;
			var ids=["overview-selector","reading-list-selector","star-selector","trends-selector","broadcast-selector"];
			for(var i in ids){
				document.getElementById(ids[i]).style.display="none";
			}
			document.getElementById("add-box").style.display="none";
			if(!document.getElementById("_extra_div_jeetu")){
				var extraDiv=document.createElement("div");
				extraDiv.id="_extra_div_jeetu";
				var container=document.getElementById("selectors-container");
				container.parentNode.insertBefore(extraDiv,container);
				var html="";
				//html+="<table cellpadding=0 cellspacing=0><tr><td>";
				html += "<a href=http://www.google.com/reader/view/?page=overview>H</a> &nbsp;|&nbsp; ";
				html += "<a href=/reader/view/user/-/state/com.google/reading-list>All";
				if(document.getElementById("reading-list-unread-count")){
					html += document.getElementById("reading-list-unread-count").innerHTML;
				}
				html += "</a> &nbsp;|&nbsp; "
				html += "<a href=/reader/view/user/-/state/com.google/starred><img class=selector-icon src=/reader/ui/575937951-star_active.png></a> &nbsp;|&nbsp; ";
				html += "<a href=http://www.google.com/reader/view/?page=trends><img class=selector-icon src=/reader/ui/854926177-icon-trends.gif></a> &nbsp;|&nbsp; ";
				html += "<a href=/reader/view/user/-/state/com.google/broadcast><img class=selector-icon src=/reader/ui/3178074291-icon-broadcast.png></a>";
				extraDiv.innerHTML=html;
			}
		}else{
		}
	}
        function hasElements() {
                return document.getElementById('nav').clientHeight > 0;
        }
        setTimeout(removeRedundantElements,  5000);
        setTimeout(removeRedundantElements,  25000);
})();

