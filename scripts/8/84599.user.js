// ==UserScript==
// @name           SSW Buy Doppelpets
// @namespace      http://www.secretsocietywars.com/crashnburn11
// @description    Buy all doppelpets
// @include        *secretsocietywars.com/index.php?p=quests&a=quest*
// ==/UserScript==

page = document.evaluate('//tr//text()[contains(., "Laxloo DoppelPet Manufactory")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
GM_log(page.snapshotLength);
var buying = GM_getValue("buying",false);


links = document.evaluate('//a/text()[contains(., "Buy")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
GM_log(links.snapshotLength);
for(var i = 1; i<links.snapshotLength+1; i++){
buy_link = find_parent(links.snapshotItem(i-1), "A");
//GM_get(buy_link, function(responseText));
GM_log(buy_link)
}
var browse = document.evaluate('//a[contains(., "BROWSE PETS")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

buy_but = document.createElement('a');
if (buying == false) {
buy_but.innerHTML = "BUY ALL DOPPELPETS | ";
} else {
buy_but.innerHTML = "DONT BUY ALL DOPPELPETS | ";
}
buy_but.setAttribute("style", browse.getAttribute("style"));
buy_but.style.color = "White";
buy_but.style.cursor = "pointer";
buy_but.style.fontSize = "10px";
buy_but.href = document.location.href;
browse.parentNode.insertBefore(buy_but,browse)
buy_but.addEventListener('click', set_buy, false);

if (links.snapshotLength == 0) {
GM_setValue("buying",false);
buy_but.innerHTML = "BUY ALL DOPPELPETS | ";
}
if (buying) {
setTimeout(buy_pet,3000);
}
function buy_pet(){
window.location.href = buy_link;
}

function set_buy(){
if (buying == true) {
buying == false;
GM_setValue("buying",false);
buy_but.innerHTML = "BUY ALL DOPPELPETS | ";
} else {buying == true;
GM_setValue("buying",true);
buy_but.innerHTML = "DONT BUY ALL DOPPELPETS | ";
}
}



function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}