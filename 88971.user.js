// ==UserScript==
// @name           Work in the Back Defaults
// @namespace      Ren Po Ken
// @description    Presets Megabribe and max number of rides
// @include        http://www.animecubed.com/billy/bvs/pizzawitchgarage.html
// @version        1.1
// @history        1.1 WorldKai Rides enabled
// @history        1.0 Initial Release - Work in the Back enabled
// ==/UserScript==

function doShift (event)
	{if (event.keyCode == 13)
		document.forms.namedItem("doshift").wrappedJSObject.submit();
	}
	
function wkRides (event)
	{if (event.keyCode == 13)
		document.forms.namedItem("wkride").wrappedJSObject.submit();
	}

var form = document.getElementsByName("doshift")[0];		//Work in the Back Moduel
if (form)
	{var megaBribe = document.getElementsByName("shiftbribe")[2];
	if (!megaBribe.disabled)
		megaBribe.setAttribute("checked", "checked");
	deliveries = document.evaluate("//form [contains (.,'Perform a Shift >')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	deliveries = deliveries.snapshotItem(0).innerHTML;
	deliveriesStart = deliveries.indexOf("Delivery (")+10*1;
	deliveriesEnd = deliveries.indexOf(" Remaining)");
	deliveries = deliveries.substring(deliveriesStart, deliveriesEnd);
	var shifts = document.getElementsByName("shiftcount")[0];
	if (shifts)
		shifts.value=(deliveries*1);
	window.addEventListener("keyup", doShift, false);		//End Work in the Back Moduel
	}
else form = document.getElementsByName("wkride")[0];		//WorldKai Rides Moduel
	{if (form)
		{var allRides = document.getElementsByName("wkrideall")[0];
		allRides.setAttribute("checked", "checked");
		window.addEventListener("keyup", wkRides, false);	//End WorldKai Rides Moduel
		}
	}