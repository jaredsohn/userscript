// ==UserScript==
// @name			Orignal KingsAge Minimap
// @namespace		Ehh
// @description		Changes the ugly maximap back to the fine minimap we once had
// @include			http://*.kingsage.*/map.php*
// ==/UserScript==

window.setTimeout(function() {
var click = document.getElementsByClassName('click')
var minimap = document.getElementById('minimap');
minimap.style.height = '300px';
minimap.style.width = '500px';
var image = document.getElementById('image_minimap');
image.style.height = '300px';
image.style.width = '500px';
var marker = document.getElementById('minimap_marker');
marker.style.width = Math.floor(marker.style.width.replace("px", "") / 1.5) + 'px';
marker.style.height = Math.floor(marker.style.height.replace("px", "") / 1.5) + 'px';
marker.style.top = Math.floor(marker.style.top.replace("px", "") / 1.5) + 'px';
marker.style.left = Math.floor(marker.style.left.replace("px", "") / 1.5) + 'px';
 }, 60);
 
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var minilink = xpath('/html/body/div[2]/div'), place = xpath('/html/body/div[2]/div[2]/table'), map = xpath('/html/body/div[2]/div[2]/table/tbody/tr/td/div/img[2]'), coords = xpath('/html/body/div[2]/div[2]/map/area');
minilink.snapshotItem(0).style.left = '720px';
minilink.snapshotItem(1).style.left = '285px';
place.snapshotItem(0).style.width = '500px';
map.snapshotItem(0).style.width = '500px';
map.snapshotItem(0).style.height = '300px';
for (var i = 0; i < coords.snapshotLength; i++) {
    thisElement = coords.snapshotItem(i);
    switch (thisElement.nodeName.toUpperCase()) {
        case 'AREA':
		thisElement.coords = thisElement.coords.replace(/500/g,"333");
		thisElement.coords = thisElement.coords.replace(/400/g,"266");
		
		thisElement.coords = thisElement.coords.replace(/700/g,"466");
		thisElement.coords = thisElement.coords.replace(/650/g,"433");
		thisElement.coords = thisElement.coords.replace(/550/g,"366");
		thisElement.coords = thisElement.coords.replace(/350/g,"233");
		thisElement.coords = thisElement.coords.replace(/250/g,"166");
		thisElement.coords = thisElement.coords.replace(/200/g,"133");
		thisElement.coords = thisElement.coords.replace(/100/g,"66");
		
		thisElement.coords = thisElement.coords.replace(/150/g,"100");
		thisElement.coords = thisElement.coords.replace(/300/g,"200");
		thisElement.coords = thisElement.coords.replace(/450/g,"300");
		thisElement.coords = thisElement.coords.replace(/600/g,"400");
		thisElement.coords = thisElement.coords.replace(/750/g,"500");
		thisElement.coords = thisElement.coords.replace(/50/g,"33");
		thisElement.coords = thisElement.coords.replace(/330/g,"500");
		break;
   }
}