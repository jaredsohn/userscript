/*
Geocaching True Totals - v1.0 2005-10-20
(c) 2005, Prime Suspect Software

Greasemonkey user script: see http://greasemonkey.mozdev.org

Function:
 Copies 'Show All Logs' link above the logs. When all logs are 
 displayed, a breakdown of totals by log type is shown
 above the logs.
 
Usage:
 When link to show all logs is clicked, after loading, the page 
 will be repositioned to the start of the logs. 'Show All Logs' 
 link will be replaced by the type totals. If there are 5 or fewer 
 logs for a cache, the totals by type will automatically be show.

*/

// ==UserScript==
// @name           GC True Totals
// @namespace      http://home.earthlink.net/~prime.suspect/gms/
// @description    Shows breakdown of totals by log type.
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

(function() {

	var SpanData = '';
	var ImgCount;
	var ImgFile = new Array();
	var ImgDesc = new Array();

	//  Check URL. If Printer Frindly mode, exit script.
	if (UrlParm('pf') == 'y') {return}

	//  If specific number of logs set to be displayed, exit script.
	if (UrlParm('numlogs') != '') {return}

	//  See if 'MoreLogs' link is present.
	var e_LogWarning = document.getElementById("LogWarning");
	var e_MoreLogs = document.getElementById("MoreLogs");
	
	if (e_MoreLogs) {
		
		// Add anchor tag to link, to position page at start of logs.
		var e_WarnURL = e_MoreLogs.childNodes[0].childNodes[0].childNodes[1];
		e_WarnURL.href += '#NumVisits';

		//  Copy 'more logs' link above the logs.
		dup_MoreLogs = e_MoreLogs.cloneNode(true);
		var LogWarnBR = document.createElement("br");
		e_LogWarning.parentNode.insertBefore(LogWarnBR, e_LogWarning.nextSibling);
		LogWarnBR.parentNode.insertBefore(dup_MoreLogs, LogWarnBR.nextSibling);
		

	} else {

		//  Log types and image icons to be counted.
		ImgDesc[ 0] = 'Will Attend';
		ImgFile[ 0] = 'icon_rsvp.gif';
		ImgDesc[ 1] = 'Attended';
		ImgFile[ 1] = 'icon_attended.gif';
		ImgDesc[ 2] = 'Webcam Photo Taken';          
		ImgFile[ 2] = 'icon_camera.gif';      
		ImgDesc[ 3] = 'Found Cache';          
		ImgFile[ 3] = 'icon_smile.gif';       
		ImgDesc[ 4] = 'Did Not Find';         
		ImgFile[ 4] = 'icon_sad.gif';         
		ImgDesc[ 5] = 'Note';                 
		ImgFile[ 5] = 'icon_note.gif';        
		ImgDesc[ 6] = 'Review Note';          
		ImgFile[ 6] = 'big_smile.gif';        
		ImgDesc[ 7] = 'Retraction';           
		ImgFile[ 7] = 'icon_redlight.gif';    
		ImgDesc[ 8] = 'Published';            
		ImgFile[ 8] = 'icon_greenlight.gif';  
		ImgDesc[ 9] = 'Disabled';             
		ImgFile[ 9] = 'icon_disabled.gif';    
		ImgDesc[10] = 'Enabled';              
		ImgFile[10] = 'icon_enabled.gif';     
		ImgDesc[11] = 'Needs Archive';       
		ImgFile[11] = 'icon_remove.gif';     
		ImgDesc[12] = 'Archived/Unarchived';             
		ImgFile[12] = 'traffic_cone.gif';     
		
		//  Get count of each image type. Build display string.
		for (var i = 0; i < ImgFile.length; i++) {
			ImgCount = GetCount(ImgFile[i])
			if (ImgCount > 0) {
				SpanData += ' &nbsp; <img src="http://www.geocaching.com/images/icons/' +
						ImgFile[i] +'" align="absmiddle" title="' + ImgDesc[i] + '">' +
						'=' + ImgCount;
			}
		}
	
		//  If display string not blank, insert into document.
		if (SpanData > '') {
			if (e_LogWarning) {
				CountSpan = document.createElement("span");
				CountSpan.innerHTML = '<br>Totals by log type:' + SpanData;
				e_LogWarning.parentNode.insertBefore(CountSpan, e_LogWarning.nextSibling);
			}
		}
		
		//  Reposition to log anchor.
		var docloc = document.location + '';
		if (docloc.search(/#NumVisits$/) >= 0) {
			document.location = document.location;
		}
		
	}



// ---------------------------------- Functions ---------------------------------- //


	//  Returns a URL parameter.
	function UrlParm(SeekParm) {
		var RegRslt, RtnVal = '';
		var PageUrl = document.location + '';
		var ParmString = PageUrl.substring(PageUrl.indexOf('?') + 1);
		var RegEx1 = new RegExp('(^|&)' + SeekParm + '=(.*?)(&|#|$)');
		RegRslt = RegEx1.exec(ParmString);
		if (RegRslt) {
			RtnVal = RegRslt[2];
		}
		return RtnVal;
	}


	//  Returns number of images.
	function GetCount(img) {
		var ic = 0;
		//  Build search path.
		var xPathSearch = "//img[@src='http://www.geocaching.com/images/icons/" + img + "']";
		//  Execute xpath query to get a collection of images.
		var ImgList = document.evaluate(
			xPathSearch,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		//  If not the smile icon, just get image collection count.
		if (img != 'icon_smile.gif') {
			var ic = ImgList.snapshotLength;
		//  Smile icon can also be used within a log, so have to check each one.
		} else {
			for (var i = 0; i < ImgList.snapshotLength; i++) {
				//  Only icons that are a child of a STRONG node are log types.
				if (ImgList.snapshotItem(i).parentNode.nodeName == 'STRONG') {ic++}
			}
		}
		return ic;
	}

})();
