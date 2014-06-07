// ==UserScript==
// @name           Random Birthday
// @namespace      http://solitude12.deviantart.com/
// @description    Adds a Random Birthday link next to the Random Deviation/Deviant Links on deviantART!
// @include        http://*.deviantart.com/*
// @exclude        http://chat.deviantart.com/chat/*
// ==/UserScript==

/* 
 * Author: Solitude12
 * Date: Sunday November 9th, 2008
 * Version: 0.2b
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
*/

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}


GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://birthdays.24bps.com/',
    onload: function(responseDetails) {
    	var data = responseDetails.responseText;
		var whosbday = data.match(/<p class=\"mpbd\">(.*)\n<\/p>/)[1];
		whosbday=whosbday.replace(/<\/?[^>]+>/gi, '').split(", ");	
		var usersbday = whosbday[Math.floor(Math.random()*(whosbday.length-1))];
		var nodes;
		var node;
		nodes = document.evaluate("//td[@class='f']/div[@class='links']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (nodes.snapshotItem(0)){
			node = nodes.snapshotItem(0);
			node.innerHTML += '<br><a href="http://'+usersbday+'.deviantart.com/" title="It\'s '+usersbday+'\'s Birthday Today!">Random Birthday</a>';
		}
		
		//nodes = document.evaluate("//div[@class='sleekAppIcon appFolderIcon moveable fromMoreMenu otherApp']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		//if (nodes.snapshotItem(0)){
		//	node = nodes.snapshotItem(0);
		//	node.innerHTML += '<br></div><div style="display: block;" class="sleekAppIcon appFolderIcon moveable fromMoreMenu otherApp" sleekname="Birthday" fullname="Random Birthday" appid="24"><a href="http://'+usersbday+'.deviantart.com/" title="It\'s '+usersbday+'\'s Birthday Today!"><div class="sleekAppButtonIcon" style="background: transparent url(http://st.deviantart.com/minish/main/icons3.gif) no-repeat scroll -1090px -130px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;"></div><span class="sleekName">Random Birthday</span></a></div>';
		//}
		var birthdaylink = document.createElement("div");
		birthdaylink.setAttribute("style", "display: block;");
		birthdaylink.setAttribute("class", "sleekAppIcon appFolderIcon fromMoreMenu otherApp");
		birthdaylink.setAttribute("sleekname", "Birthday");
		birthdaylink.setAttribute("fullname", "Random Birthday");
		//birthdaylink.setAttribute("appid", "40"); // dA ends at 35, lets not use 36-39 just in case
		if(!document.getElementById('dAMoreApps_otherApp_AddLink')){			
			document.getElementById('appFolderScroller').appendChild(birthdaylink);
		} else {
			document.getElementById('appFolderScroller').insertBefore(birthdaylink, getElementsByAttribute(document.getElementById('appFolderScroller'), 'div', 'appid', '30')[0]);	//document.getElementById('dAMoreApps_otherApp_AddLink')
		}
		birthdaylink.innerHTML='<a href="http://'+usersbday+'.deviantart.com/" title="It\'s '+usersbday+'\'s Birthday Today!"><div class="sleekAppButtonIcon" style="background: transparent url(http://st.deviantart.com/minish/main/icons3.gif) no-repeat scroll -1090px -130px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;"></div><span class="sleekName">Random Birthday</span></a>';
		// Unfortunately, I haven't learned how to actually save the drag... :(
	}
});