// ==UserScript==
// @name           Webtools Sizer
// @namespace      Lakros
// @description    Show the size of a Currencyonline WebTool
// @include        http://webtools.currencyonline.com/Tools/WebToolWizard.aspx
// @include        http://vm-webtools.lakros.com/Tools/WebToolWizard.aspx
// ==/UserScript==

var selectElem = document.getElementById("ctl00_ContentPlaceHolder1_SelectLayout");

if ( selectElem )
{
	selectElem.addEventListener("click", ShowWidgetSize, true);	   
}
ShowWidgetSize();

function ShowWidgetSize()
{
	var snapResults  = document.evaluate("//*[@class='widgetWidth']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var widgetDiv = snapResults.snapshotItem(i);
		// only the current widget has a valid className
		if ( widgetDiv.className )
	    {
			var msg = 'WebtoolsSizer: width = ' + widgetDiv.clientWidth +  ',height = ' + widgetDiv.clientHeight + '\n( Click above button to get javascript)';			
			// display it in the script box
			var textElem = document.getElementById("ctl00_ContentPlaceHolder1_txt_cccode");
			textElem.value = msg;			
			GM_log(msg);
		}
		else
		{
			GM_log("Couldn''t find widgetDiv" );
		}
	}
}
