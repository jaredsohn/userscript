// ==UserScript==
// @name           starlogqfactors
// @namespace      http://websiteoninternet.com
// @include        http://*.war-facts.com/starlog.php
// ==/UserScript==



//alert(messages.join('\n\n'));
var rfeff = new Array();
var ingenuity = 0;
var rffetch = new Array();

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://'+window.location.hostname+'/science.php',
	async: false,
	onload: function(data2) {
		// Find out the player's ingenuity
		var ingentext=data2.responseText.match(/Ingenuity([^]+?)\<strong\>([^]+?)points/m);
		//alert(ingentext.join('\n\n\n'));
		ingenuity = Number(ingentext[2]);
	}
});


unsafeWindow.getqvalue = function(datshit) {
		var projects = document.evaluate("//a[text() = 'View']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
		// Get budget, scientists
		var numbers = projects.snapshotItem(datshit).parentNode.parentNode.childNodes[3].childNodes[0].innerHTML;
		numbers = numbers.match(/\d+/g);
		var budget = Number(numbers[1]);
		var totalsci = 0;
		for (var j=3;j<numbers.length-1;j++) {
			totalsci += Number(numbers[j]);	
		}

		// Find out the quality
		var qualtext = projects.snapshotItem(datshit).parentNode.parentNode.childNodes[0].innerHTML;
		qual = qualtext.match(/quality was ([^\[]+)\%/);
		var quality = Number(qual[1]);

		// Find what colony it's from so we can grab that rfeff
		var coltext = qualtext.match(/\?colony\=([^\[]+)\"([^\[]+)/);
		var colony = Number(coltext[1]);
							
		// Q-value formula: quality / sqrt(scientists)*sqrt(RF)*sqrt(sqrt(budget))/200+sqrt(Ingen)
		// Test:
		//var quality = 240;
		//var totalsci = 9;
		//var budget = 100;
		//var ingenuity = 175;
		//var rfeff = 139;
		
		//alert("i: "+datshit+"\nQuality: "+quality+"\nScientists: "+totalsci+"\nBudget: "+budget+"\nIngenuity: "+ingenuity+"\nRF Efficiency: "+rfeff[colony]);
		var qvalue = quality/(((Math.sqrt(totalsci)*Math.sqrt(rfeff[colony])*Math.sqrt(Math.sqrt(budget))/200)+Math.sqrt(ingenuity)));
		var qvalue = qvalue.toFixed(2);
		//messages[i].getElementsByTagName('span')[1].innerHTML=messages[i].getElementsByTagName('span')[1].innerHTML+"<br>q-value: "+qvalue;
		//science[1].innerHTML=qvalue;
		alert(qvalue);
		//var update = messages[i].getElementsByTagName('span');

}
	
	var projects = document.evaluate("//a[text() = 'View']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i=0 ; i < projects.snapshotLength; i++ ) {
		projects.snapshotItem(i).parentNode.parentNode.childNodes[3].childNodes[0].innerHTML+="<br><a href=\"javascript:getqvalue("+i+")\">get q-value</a>";
		
		var coltext = projects.snapshotItem(i).parentNode.parentNode.childNodes[0].innerHTML;
		coltext = coltext.match(/\?colony\=([^\[]+)\"([^\[]+)/);
		var colony = Number(coltext[1]);
		if (!rffetch[colony]) {
			rffetch[colony]=1;
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://'+window.location.hostname+'/extras/colony_buildings.php?colony='+colony,
				onload: function(data) {
					// Find out the RF efficiency of the labs there
					var colo2=data.responseText.match(/colony\=([^]+?)\"/);
					colo2 = Number(colo2[1]);
					var text=data.responseText.match(/Research Facility([^]+?)Effectiveness\:\<\/td\>\<td\>([^]+?)\%\<\/td\>([^]+?)/);
					rfeff[colo2] = Number(text[2]);			
				}
			});
		} 
		
	}


