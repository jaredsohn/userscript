// ==UserScript==
// @name        Bb Learn Error Log Analyser
// @namespace   uk.co.cumquat.www
// @include     https://bbpilot.cc.ic.ac.uk/*
// @version     1
// ==/UserScript==
//Create button
var btn = document.createElement('input');

btn.innerHTML = 'Evaluate';
btn.setAttribute('value','Evaluate');
btn.setAttribute('type','button');

btn.onclick = function(){
	onCheck();
}

var errorDiv = document.getElementById('100');
if(errorDiv != null)
{
	errorDiv.insertBefore(btn, errorDiv.firstChild);
}


function onCheck(){
	
if(errorDiv != null)
{
		var warnings = document.evaluate('//div[contains(@id,"logItem")]',
			errorDiv, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for (var i = warnings.snapshotLength - 1; i >= 0; i--) {
			var warning = warnings.snapshotItem(i);
			
			var result1 = warning.innerHTML.match(/Links to content items in this will not work until the area is made visible/);
			var result2 = warning.innerHTML.match(/Therefore the content item will be saved to the root folder within its course area instead/);
			var result3 = warning.innerHTML.match(/Invalid Vista Grade Center column type was found for column: End of Block1 Quiz/);
			var result4 = warning.innerHTML.match(/Invalid Vista Grade Center column type was found for column: End of Block2 Quiz/);
			var result5 = warning.innerHTML.match(/Invalid Vista Grade Center column type was found for column: End of Block3 Quiz/);
			var result6 = warning.innerHTML.match(/Invalid Vista Grade Center column type was found for column: End of Block4 Quiz/);
			var result7 = warning.innerHTML.match(/Links to content items in this will not work until the area is made visible/);
			var result8 = warning.innerHTML.match(/Invalid Calculated Formula was found for calculated Grade Center column: Midterm/);
			var result9 = warning.innerHTML.match(/Invalid Calculated Formula was found for calculated Grade Center column: Final/);
			var result10 = warning.innerHTML.match(/Invalid Vista Grade Center column type was found for column:/);
			var result11 = warning.innerHTML.match(/no IMS manifest file/);
			
			
			if(result1 || result2 || result3 || result4 ||result5 || result6 || result7 || result8 || result9 || result10 || result11){
				processNode(warning);
			}		
		}
	}
}

function processNode(node){
	
	var txt = 'Ignore';
	node.innerHTML = txt;
	
}
//alert(errorDiv.innerHTML);
