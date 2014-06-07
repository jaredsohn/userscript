// ==UserScript==
// @name           eBay PST2EST
// @date           02/03/2006
// @namespace      http://www.milnergroup.net
// @description    Shows end of auction in Eastern Standard Time (EST). Also shows how many minutes left .
// @version        0.61
// @include        http*://*.ebay.*
// @creator        Anatoly Milner (The Milner Group, Inc.) <greasemonkeyscript@milnergroup.net>
//
// ==/UserScript==



(function() {

function conv(inTime) {
var hh = inTime.substring(1,3);
var mm = inTime.substring(4,6);
var ss = inTime.substring(7,9);
var ampm = "AM";
if (hh >= 12) ampm = "PM";
if (hh > 12) hh -= 12;                 // Convert 24-hour format to 12-hour.
if (hh == 0) hh = 12;                  // Convert 0 o'clock to midnight.
return(hh+ ':' +mm+ ':' +ss+ ' ' +ampm);// Put it all together.
};


	var dateVar;
	var startStr = 0;
	var endStr = 0;
	var txtDate;
	var tDate = new Date();
	var EST;
	var tLeft;
	var ampmTime;
	var vPSTPDT;
	textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < textnodes.snapshotLength; i++) 
		{  		
		        node = textnodes.snapshotItem(i);  // This text node
			s = node.data;  // Its contents
			if (s.indexOf("end time") > -1) 
			{
				vPSTPDT = "PST";
				startStr = s.indexOf("end time") + 8;
				endStr = s.indexOf("PST");
				
				if (endStr == -1) {
					endStr = s.indexOf("PDT");
					vPSTPDT = "PDT";
				}
				txtDate = s.substring(startStr,endStr);			
				dateVar = new Date(txtDate.substring(0,4) + " " + txtDate.substring(5,7) + ", " + String(2000 + parseInt(txtDate.substring(8,10))) + " " + txtDate.substring(11,23) + " " + vPSTPDT);
				tLeft = (dateVar - tDate) / 60000

				ampmTime = conv(dateVar.toString().substring(15,24));

				EST = '<br><font color="red">Closing Date:</font> ' + dateVar.toString().substring(0,15) + ' ' + ampmTime + '<br><font color="red">Minutes Left (approx):</font> ' + String(parseInt(tLeft)) + '<br><br>'; 
			}
			
			if ((s.indexOf('End time:') > -1) || (s.indexOf('Time left:') > -1))
			{
				var inText = document.createElement("div");
				inText.innerHTML = EST;
				textnodes.snapshotItem(i + 1).parentNode.insertBefore(inText, node.nextSibling);
			}
		}

})();




