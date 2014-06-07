// ==UserScript==
// @name           Parse ESPN Madden NFL Ratings
// @namespace      maddenultimate.com
// @include        http://espn.go.com/espn/thelife/videogames/madden12ratings*
// ==/UserScript==

var dataString = '';

var data;
var data2;

var datas = document.evaluate("//tr/td",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 0; i < datas.snapshotLength; i++) {

	data = datas.snapshotItem(i);
	data2 = data.textContent;


		if(data2.indexOf('.') != -1){

			dataString += '\r\n' + data2;

		}
		else
		{

			dataString += ',' + data2;

		}

}

textareaLocations = document.evaluate("//table[@id='CBtable']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var textareaLocation = textareaLocations.snapshotItem(0);

var newTextarea = document.createElement('text');

newTextarea.innerHTML = '<textarea style="width:95%;" rows=20 name="card1" id="1" type="text"  WRAP=OFF />'+ dataString+'</textarea>';

textareaLocation.parentNode.insertBefore(newTextarea, textareaLocation.nextSibling);
