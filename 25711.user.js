// ==UserScript==
// @name          Madigan Library Lookup
// @namespace     http://www.pct.edu/library
// @description	  Search Madigan Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();


(function() {
var browser = BrowserDetect.browser

if (browser != "Firefox"){
	mainmatch = document.location.href.match(/\/(\d{9}[\d|X])\//);
}
else{
	mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
}

if (mainmatch){
	var isbn = mainmatch[1];
	var urlSearch 
	/*************  Edit this Section ONLY  *************/
	urlSearch = "http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/123?searchdata1=" 
	urlSearch += isbn //Do not edit this section!
	urlSearch += "&srchfield1=GENERAL^SUBJECT^GENERAL^^words or phrase"
	var urlCat = "http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/60/502/X"
	var library = "Madigan Library" /*try (if possible) to keep this to no more then 15 characters*/
	var loading = "<img src='http://www.pct.edu/library/images/misc/loading.gif'>"
	/****************  End Section Edit  ****************/
    var flagME = false;
	if (browser == "Firefox"){
		var boldsans = document.evaluate(
		"//div[@class='buying']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
		)
		var originalDIV = boldsans.snapshotItem(0).innerHTML;
		
		//alert("ok, we've looked for the spot at amazon.com to drop content");

		if (boldsans.snapshotLength) {
			if (isbn)  {
				// search all locations and find the book 
				// Step 1: find the book (do they ahve it anywhere)
				var table_content = '';
	
				table_content = "<BR>\
						<div class='buying' stlye='padding-top:5px;'>\
						<table border='0' cellspacing='0' cellpadding='0' class='moreBuyingChoices' width='215'>\
						<tr>\
						<td width='190' class='topLeft'>\
						<table cellspacing='0' cellpadding='0' width='100%'><tr><td>\
						<div style='text-align: center;  font-weight: bold; padding-bottom: 5px;'>" + library + " Availability</div>\
						<div id='more-buying-choice-content-div'>\
						<div class='extendedBuyBox' id='secondaryUsedAndNew'>\
						<table cellpadding='0' cellspacing='0' border='0' width='100%'>\
						";
						
				var this_row = '<TR>';
				this_row = this_row + "<TD align='center'>" + loading + "</td>";
				//this_row = this_row + "<TD align='right'>" + "</td>";
				this_row = this_row + "</tr>";
				var rows = this_row;
				var table_content2 = table_content + rows;
				table_content2 = table_content2 + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='"+ urlCat + "'>Go To The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";	
				
				boldsans.snapshotItem(0).innerHTML = originalDIV + table_content2
				rows = ''
				this_row = ''
				
				GM_xmlhttpRequest( { 
					method:"POST", 
					url:urlSearch,
					data:'',
							onload:function(responseDetails) {
						var content = responseDetails.responseText;
						var arrContent = content.split("<table");
						//arrContent = arrContent.split("tbody")
						//arrContent = arrContent.split("tr")
						//arrContent = arrContent.split("td")
						
						for (var i=0; i < arrContent.length; i++) {
							//alert(arrContent[i])
							if (arrContent[i].match(/Location/)) {
								arrContent2 = arrContent[i].split("<tr")
								for (var j=0; j < arrContent2.length; j++) {
									if (arrContent2[j].match(/Location/)) {
										arrContent3 = arrContent2[j].split("<td")
										for (var k=0; k < arrContent3.length; k++) {
											if (arrContent3[k].match(/Location/)) {
												arrContent4 = arrContent2[j+1].split("<td")
												var position = new Array()
												m = 0;
												position[m] = arrContent4[k].split(">")[1].split("<")[0].replace(/^\s+|\s+$/g,"")
												var holdLocal = k
												var runOnce = true
												k = arrContent3.length
											}
										}
									}
									else if(runOnce){
										arrContent4 = arrContent2[j].split("<td")
										position[m++] = arrContent4[holdLocal].split(">")[1].split("<")[0].replace(/^\s+|\s+$/g,"")
									}
									i = arrContent.length
								}
								// inside a TR entry right now
								var found=0;
								var rows = '';
										var this_row = ''
											for(n=0; n < position.length; n++){
												this_row += '<TR>';
												if((position.length > 1) && (n == 0)){
												this_row = this_row + "<TD align='center'><hr noshade='noshade' size='1' class='EBBdivider' style='margin-bottom:5px;'/>" + position[n] + "</td>";
												}
												else if((position.length > 1) && (n > 0)){
												this_row = this_row + "<TD align='center'><hr noshade='noshade' size='1' class='EBBdivider' style='margin-bottom:5px; margin-top:5px;'/>" + position[n] + "</td>";
												}
												else{
												this_row = this_row + "<TD align='center'>" + position[n] + "</td>";
												}
												//this_row = this_row + "<TD align='right'>" + "</td>";
												this_row = this_row + "</tr>";
											}
										rows = rows + this_row;
									i = arrContent.length;
									flagME = true;
								table_content = table_content + rows;
							}
						}
						if(!flagME){
							var this_row = '<TR>';
							this_row = this_row + "<TD align='center'>Title Not Available</td>";
							//this_row = this_row + "<TD align='right'>" + "</td>";
							this_row = this_row + "</tr>";
							rows = this_row;
							table_content = table_content + rows;
							table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='"+ urlCat + "'>Go To The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";
						table_content = table_content + '</table>';
						boldsans.snapshotItem(0).innerHTML = originalDIV + table_content;
						}
						else{
						table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='" + urlSearch + "'>Go To The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";
						table_content = table_content + '</table>';
						boldsans.snapshotItem(0).innerHTML = originalDIV + table_content;
						}
						}			});
			}	
		}
	}
	else{
		var boldsans = document.getElementById('buyboxTable').tBodies[0];
		var originalDIV = document.getElementById('buyboxDivId').innerHTML;
		
			//alert("ok, we've looked for the spot at amazon.com to drop content");
		if (boldsans.rows.length) {
			if (isbn)  {
				// search all locations and find the book 
				// Step 1: find the book (do they ahve it anywhere)
				var table_content = '';
				
				table_content = "<BR>\
						<div class='buying' stlye='padding-top:5px;'>\
						<table border='0' cellspacing='0' cellpadding='0' class='moreBuyingChoices' width='215'>\
						<tr>\
						<td width='190' class='topLeft'>\
						<table cellspacing='0' cellpadding='0' width='100%'><tr><td>\
						<div style='text-align: center;  font-weight: bold; padding-bottom: 5px;'>" + library + " Availability</div>\
						<div id='more-buying-choice-content-div'>\
						<div class='extendedBuyBox' id='secondaryUsedAndNew'>\
						<table cellpadding='0' cellspacing='0' border='0' width='100%'>\
						";
						
				var this_row = '<TR>';
				this_row = this_row + "<TD align='center'><img src='http://www.pct.edu/library/images/misc/loading.gif'></td>";
				//this_row = this_row + "<TD align='right'>" + "</td>";
				this_row = this_row + "</tr>";
				var rows = this_row;
				var table_content2 = table_content + rows;
				table_content2 = table_content2 + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='"+ urlCat + "'>Go To The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";						
				
				document.getElementById('buyboxDivId').innerHTML = originalDIV + table_content2
				rows = ''
				this_row = ''
				
				GM_xmlhttpRequest( {
					method:"POST", 
					url:urlSearch,
					data:'',
							onload:function(responseDetails) {
						var content = responseDetails.responseText;
						var arrContent = content.split("<table");
	
						for (var i=0; i < arrContent.length; i++) {
							if (arrContent[i].match(/Location/)) {
								arrContent2 = arrContent[i].split("<tr")
								for (var j=0; j < arrContent2.length; j++) {
									if (arrContent2[j].match(/Location/)) {
										arrContent3 = arrContent2[j].split("<td")
										for (var k=0; k < arrContent3.length; k++) {
											if (arrContent3[k].match(/Location/)) {
												//alert(content.split("<tr")[0].split("<td"))
												arrContent4 = arrContent2[j+1].split("<td")
												var position = new Array()
												m = 0;
												position[m] = arrContent4[k].split(">")[1].split("<")[0].replace(/^\s+|\s+$/g,"")
												var holdLocal = k
												var runOnce = true
												k = arrContent3.length
											}
										}
									}
									else if(runOnce){
										arrContent4 = arrContent2[j].split("<td")
										position[m++] = arrContent4[holdLocal].split(">")[1].split("<")[0].replace(/^\s+|\s+$/g,"")
									}
									i = arrContent.length
								}
								// inside a TR entry right now
								var found=0;
								var rows = '';
										var this_row = ''
											for(n=0; n < position.length; n++){
												this_row += '<TR>';
												if((position.length > 1) && (n == 0)){
												this_row = this_row + "<TD align='center'><hr noshade='noshade' size='1' class='EBBdivider' />" + position[n] + "</td>";
												}
												else if((position.length > 1) && (n > 0)){
												this_row = this_row + "<TD align='center'><hr noshade='noshade' size='1' class='EBBdivider' />" + position[n] + "</td>";
												}
												else{
												this_row = this_row + "<TD align='center'>" + position[n] + "</td>";
												}
												//this_row = this_row + "<TD align='right'>" + "</td>";
												this_row = this_row + "</tr>";
											}
										rows = rows + this_row;
									i = arrContent.length;
									flagME = true;
								table_content = table_content + rows;
							}
						}
						if(!flagME){
							var this_row = '<TR>';
							this_row = this_row + "<TD align='center'>Title Not Available</td>";
							//this_row = this_row + "<TD align='right'>" + "</td>";
							this_row = this_row + "</tr>";
							rows = this_row;
							table_content = table_content + rows;
							table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='"+ urlCat + "'>Go To The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";
						table_content = table_content + '</table>';
						document.getElementById('buyboxDivId').innerHTML = originalDIV + table_content
						}
						else{
						table_content = table_content + "</table></div><hr noshade='noshade' size='1' class='EBBdivider' /><div class='extendedBuyBox' align='center' id='SDPBlock'><a href='" + urlSearch + "'>Go To The " + library + "</a></div></td></tr></table></td><td width='13' class='topRight'>&nbsp;</td></tr><tr><td class='bottomLeft'>&nbsp;</td><td class='bottomRight' height='12'>&nbsp;</td></tr></table></div>";
						table_content = table_content + '</table>';
						document.getElementById('buyboxDivId').innerHTML = originalDIV + table_content
						
						}
						}			});
			}	
		}
	}
}

})();

