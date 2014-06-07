/**
* @authors: boro84
* @created: 14 March 2010
*/

// ==UserScript==
// @name           Manager League Auto Friendly
// @namespace      managerleague
// @description    auto grab ML open challenges by boro84
// @include        http://www.managerleague.com/ml/friendlies.pl?*
// @version        1.0.00
// @build          1
// ==/UserScript==
// Last Updated: 16 March 2010

// What this script does:
//      Auto grabs open challenges until fitness falls below 'fitnessThreshHold'

var fitnessThreshHold = 91;
var refreshFrequency = 3000;
window.setInterval(
	function() 
	{
		// Method 1: Directly call update function instead of click
		//updateAllFriendliesInfo();
		
		// Method 2
		// Check for getElementById support 
		if( document.getElementById ) 
		{
			var fitnessElement = document.getElementById("lowest_fitness"), fitnessN;
						
			if( fitnessElement && ( fitnessN = fitnessElement.firstChild ) )
			{
				//GM_log(fitnessN.data);		
				
				// Accept Friendlies as long as minimum fitness > threshold
				if( fitnessN.data > fitnessThreshHold )
				{
					var refreshBtn = document.getElementById("refresh_button");
					clickElement(refreshBtn);
										
					// Get list of accept buttons
					var acceptBtnList = document.evaluate("//img[@class='acceptbutton']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					
					if( acceptBtnList )
					{
						GM_log(acceptBtnList.snapshotLength);
				
						for (var i = 0; i < acceptBtnList.snapshotLength; i++) 
						{
							clickElement(acceptBtnList.snapshotItem(i));
						}
					}
				}				
			}
		}
	}, refreshFrequency);

	
function clickElement(elt) 
{
  if (!elt) 
  {
    GM_log("BUG DETECTED: Null element passed to clickElement().");
    return;
  }

  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}