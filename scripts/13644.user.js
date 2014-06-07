// ==UserScript==
// @name           jbidwatcherDirectSnipe
// @namespace      none
// @description    replaces the bid-textfield on ebay item pages by one that sets a snipe in jbidwatcher instead
// @include        http://cgi*.ebay.*
// ==/UserScript==

var username, password;	// you may set those to the appropriate values, so you won't have to enter them on every new FF-session
var msgTag;
var item;
var urlPrefix = "http://" + (username === undefined || password === undefined ?
	       	"" : username+":"+password+"@") + "localhost:9099/";

var form = document.forms.namedItem("PlaceBidForm1");
if (form == null) return;
var dcbt = document.evaluate("following-sibling::*//span[@id='DetailsCurrentBidText']", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
dcbt.textContent = "jbidwatcher snipe-amount:";
dcbt = dcbt.parentNode.parentNode.nextSibling;
msgTag = document.evaluate(".//span[@class='help']", dcbt, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue

form.action = "http://localhost:9099/addAuction";	// useless, in fact; needs to be caught anyway
for (var i = 0; i < form.elements.length; i++){
	var formEl = form.elements[i];
	if (formEl.name == "maxbid" || formEl.name == "maxbidTop"){
		formEl.name = "snipeamount";
		if (msgTag == null) {
			msgTag = document.createElement("SPAN");
			formEl.parentNode.appendChild(msgTag);
		}
		msgTag.id = "DSMsg";
	} else if (formEl.name == "item"){
		formEl.name = "id";
		item = formEl.value;
	} else if (formEl.name == "input_bid"){
		document.evaluate(".//text()", formEl, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.nodeValue = "set snipe";
	} else {
		formEl.parentNode.removeChild(formEl);
		i--;
	}
}
form.addEventListener("submit", function (event) {
	var form = event.target;
	msgTag.textContent = "adding...";

	GM_xmlhttpRequest({method: "GET",
		url: urlPrefix+"addAuction?id="+item,
		onload: function(responseDetails){
			if (responseDetails.responseText != null &&
			responseDetails.responseText.indexOf("HREF=\"\/"+item+"\"") != -1) {
				msgTag.textContent = "added! setting snipe...";
					
				GM_xmlhttpRequest({method: "GET",
					url: urlPrefix+"activateSnipe?id="+item+"&action=snipe&snipeamount="+
						form.elements.namedItem("snipeamount").value,
					onload: function(responseDetails){
						if (responseDetails.responseText != null &&
						responseDetails.responseText.indexOf("Remote-controlled snipe activated on: "+item) != -1) {
							msgTag.textContent = "snipe set!";
						} else {
							msgTag.textContent = "setting snipe failed?";
						}
					}
				});
			} else {
				msgDiv.textContent = "not added?";
			}
		}
	});
	event.stopPropagation();
	event.preventDefault();
}, true);

