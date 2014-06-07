// ==UserScript==
// @name           OGame Messges and Resources
// @namespace      http://uni*.ogame.*/game/*
// @include        http://uni*.ogame.*/game/index.php?page=resources*
// @include        http://uni*.ogame.*/game/index.php?page=messages*
// @include        http://uni*.ogame.*/game/index.php?page=flotten3*
// @version        1.2
// ==/UserScript==
/*
//  03.26.2010  v1.2
//  * revised the delete all displayed messages functionality
//  * revised:  added none - all resources - DCM functionality to the flotten3 (3rd fleet) screen **Written by Vess**
//
//  Note:  It was an honor to receive assistance from Vess as he was a very big help in properly coding the resources functionality on the 3rd fleet screen!
//
//  03.22.2010  v1.1 
//	+  Includes (per request from Vess)
//	-  Removed hard coded "Delete All Displayed Messages" (per request from Vess)
//  +  Added code to pull text for "Delete All Displayed Messages" to help support multi-lingual implementation (per request from Vess)
//  +  Added "no resources" link to 3rd fleet page setting all resources to zero and calling calculateTransportCapacity(); (per request from Vess)
//  +  Added all resources to zero prior to setting DCM and calling calculateTransportCapacity(); (per request from Vess)
//  *  Fixed layout of links with breaks after "all resources" links so as to not improperly break on expedition type missions (per request from Vess)
//
//  03.21.2010  v1.0
//	Initial release
*/
// Adds 2 resource buttons - 1 to set all resources to 100% and 1 to set all resources to 0%
if(location.href.split("page=resources").length == 2){
	var addContent = "<br /><input type='submit' value='  100%  ' onClick='"
	addContent += "document.all.last1.selectedIndex=0;";
	addContent += "document.all.last2.selectedIndex=0;";
	addContent += "document.all.last3.selectedIndex=0;";
	addContent += "document.all.last4.selectedIndex=0;";
// Uncomment the next line to include fusion reactor
//	addContent += "document.all.last12.selectedIndex=0;";
	addContent += "document.all.last212.selectedIndex=0;";
	addContent += "' />";
	addContent += "&nbsp;&nbsp;<input type='submit' value='  0%  ' onClick='";
	addContent += "document.all.last1.selectedIndex=10;";
	addContent += "document.all.last2.selectedIndex=10;";
	addContent += "document.all.last3.selectedIndex=10;";
	addContent += "document.all.last4.selectedIndex=10;";
// Uncomment the next line to include fusion reactor
//	addContent += "document.all.last12.selectedIndex=10;"
	addContent += "document.all.last212.selectedIndex=10;"
	addContent += "' /><br /><br />";
	document.getElementById('ressourcen').innerHTML = addContent + document.getElementById('ressourcen').innerHTML;	
};
// Adds a button to delete all displayed messages
//
// Checks to see if we are on the messages page
//   Sets the first forms ID tag for accessing with the document.getElementById() function
//   Sets the buttonText variable to the appropriate text, language localized 
//   Sets the addContent variable to add a centered button
//   Sets the innerHTML of the form to include the additional content
//
if(location.href.split("page=messages").length == 2){
	document.forms[0].setAttribute('id','messagesform');
	var buttonText = document.getElementById('deletemessages').options[2].text;
	var addContent = "<center><input type=\"submit\" value=\"" + buttonText + "\" onClick=\"javascript:document.getElementById(\'deletemessages\').selectedIndex=\'2\'\"; /></center><br /><br />";
	document.getElementById('messagesform').innerHTML = addContent + document.getElementById('messagesform').innerHTML;
};
// Adds links to set resources to zero and reverse the order of all resources so it maxes deut, crystal and then metal (written by Vess)
//
// Checks to see if we are on the 3rd fleet screen
//   establishes the location of the <th> node the links will be added to
//   adds the 'none' link with recalculate transport capacity
//   adds the 'all resources' link back in with recalculate transport capacity
//   adds the 'DCM' link with recalculate transport capacity
//   
if (location.href.split ("page=flotten3").length == 2)
{
    var thShortcuts = document.getElementById ('remainingresources').parentNode.parentNode.nextSibling.nextSibling.childNodes [1];
    thShortcuts.innerHTML = "<a href=\"javascript:void (0);\" onclick=\"document.getElementsByName ('resource1') [0].value='0'; document.getElementsByName ('resource2') [0].value='0'; document.getElementsByName ('resource3') [0].value='0'; calculateTransportCapacity ();\">none</a> - " +
                thShortcuts.innerHTML +
                " - <a href=\"javascript:void (0);\" onclick=\"document.getElementsByName ('resource1') [0].value='0'; document.getElementsByName ('resource2') [0].value='0'; document.getElementsByName ('resource3') [0].value='0'; maxResource ('3'); maxResource ('2'); maxResource ('1'); calculateTransportCapacity ();\">DCM</a>";
}