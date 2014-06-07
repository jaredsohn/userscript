// ==UserScript==
// @name           GC This-n-That
// @namespace      http://userscripts.org/users/201960
// @description    This-n-That tricks to add easier navigation on Geocaching.com
// @require 	   http://sizzlemctwizzle.com/updater.php?id=88990&uso
// @version        1.2.0
// @include        http*.geocaching.com/my/*
// @include	   http*.geocaching.com/track/*
// ==/UserScript==

//-----------------------------------------------------------------------
//		
//					Settings
//					Place "true" or "false" next to each as desired
//
var settings_EditLink = true;			//Place "[edit]" link next to all owned caches
var settings_TBnumber_logbtn = true;	//Remember TB trk # and place Log button
var settings_findbreakdown = true;		//Show break down of finds (last 30 days and all geocaching logs
//
//					End Settings
//------------------------------------------------------------------------

//------------------------------------------------------------------------
//
//					***Program Below, Edit at own risk***
//
var siteURL = document.location.toString();
if (settings_EditLink){	// Add '[edit]' link next to all caches owned in My Profile and Owned cache listings
if (/\/my\//.test(siteURL) && !/\/my\/owned/.test(siteURL) && !/\/my\/log/.test(siteURL)){
	var cacheListElement = document.getElementsByTagName('h3');
	var List = cacheListElement.item(0).nextElementSibling;
	var cacheElement = List.getElementsByTagName('a');
	l=cacheElement.length-1;
	for(var i=l; i >= 0; i--){
		var editLink = cacheElement[i].toString();
		editLink = editLink.substring(editLink.indexOf('=') + 1);
		var newSpan = document.createElement('span');

		newSpan.style.fontWeight = 'normal';
		newSpan.innerHTML = ' [<a href="http://www.geocaching.com/hide/report.aspx?guid=' + 
							editLink + '" target="_blank">edit</a>]';
		cacheElement[i].parentNode.insertBefore(newSpan, cacheElement[i].nextElementSibling);
	}
} 
if (/\/my\/owned\.aspx/.test(siteURL)){
	var headerID = document.getElementById('ctl00_ContentBody_lbHeading');
	var tableList = headerID.parentNode.nextElementSibling;
	if(tableList.nodeName == 'TABLE'){
		for(i=1; i<tableList.rows.length; i++){
			var cacheElement = tableList.rows[i].cells[0].getElementsByTagName('a');
			cacheElement = cacheElement[0];
			var editLink = cacheElement.toString();
			editLink = editLink.substring(editLink.indexOf('=') + 1);
			
			var newSpan = document.createElement('span');
			newSpan.style.fontWeight = 'normal';
			newSpan.innerHTML = ' [<a href="http://www.geocaching.com/hide/report.aspx?guid=' + 
								editLink + '" target="_blank">edit</a>]';
			cacheElement.parentNode.insertBefore(newSpan, cacheElement.nextSibling);
		}
	}
}
}	//end [edit] link

if (settings_TBnumber_logbtn){ //Travel Bug Section
//FUNCTIONS
function saveTBNumber1(){ GM_setValue('bugtrkno',document.getElementById('ctl00_ContentBody_txtTrackingNumber').value);}
function saveTBNumber2(){ GM_setValue('bugtrkno',document.getElementById('ctl00_ContentBody_txtTBCode').value);}

//Insert Log Button
function place_logbutton(trackbutton, saveTBNumber_function){
	var logbutton = document.createElement('input');
	logbutton.id = "ctl00_ContentBody_btnlogTB";
	logbutton.type = "submit";
	logbutton.value = "Log";
	logbutton.addEventListener('click', saveTBNumber_function, false);
	logbutton.addEventListener('click', get_tblogURL, false);
	trackbutton.parentNode.insertBefore(logbutton, trackbutton.nextSibling);	
}
function get_tblogURL(){
	trackURL = 'http://www.geocaching.com/track/details.aspx?tracker=' + GM_getValue('bugtrkno');
	GM_xmlhttpRequest({
		method:	'GET',
		url: trackURL,
		onload: function(request) {
			var holder = document.createElement('div');
			holder.innerHTML = request.responseText;
			var link = holder.getElementsByTagName('a');
			//var header = holder.getElementsByTagName('h');
			//for(var i = 0; i < header.length; i++){//GM_log(header[i]);}
			window.location.href = link[7];
			//return
		}
	});
}

//	SITES
if(/\/track\/default\.aspx/.test(siteURL)){
	document.getElementById('ctl00_ContentBody_btnLookupCode').addEventListener('click', saveTBNumber1, true);
	place_logbutton(document.getElementById('ctl00_ContentBody_btnLookupCode'), saveTBNumber1);
}
//TB Home
if(/\/track\/travelbugs\.aspx/.test(siteURL)){
	document.getElementById('ctl00_ContentBody_btnTBLookup').addEventListener('click', saveTBNumber2, true);
	place_logbutton(document.getElementById('ctl00_ContentBody_btnTBLookup'), saveTBNumber2);
}
//Coin Home
if(/\/track\/geocoin\.aspx/.test(siteURL)){
	document.getElementById('ctl00_ContentBody_btnLookupCode').addEventListener('click', saveTBNumber1, true);
	place_logbutton(document.getElementById('ctl00_ContentBody_btnLookupCode'), saveTBNumber1);
}
//TB Logging Pages
if(/\/track\/log\.aspx/.test(siteURL)){
	if(GM_getValue('bugtrkno')){
		document.getElementById('ctl00_ContentBody_LogBookPanel1_tbCode').value = GM_getValue('bugtrkno');
		GM_deleteValue('bugtrkno');
	}
	var inputs = document.getElementsByTagName('input');
	var i = inputs.length;
	inputs[i-2].id = 'ctl00_ContentBody_txtTrackingNumber';	//add ID to Text box
	inputs[i-1].addEventListener('click',saveTBNumber1,true);
	place_logbutton(inputs[i-1], saveTBNumber1);
}
}	// End TB section


//Parts below were taken from GC True Totals by Prime Suspect
if(settings_findbreakdown){//Log Breakdown Count
if(/\/my\//.test(siteURL) && !/\/my\/owned/.test(siteURL) && !/\/my\/log/.test(siteURL) || /\/my\/logs\.aspx\?s=1/.test(siteURL)){	//main home
	
	//---------------Functions------------
	function GetCount(img){
		var ic = 0;
		// Execute xpath query to get a collectoin of images.
		if(/\/my\/logs\.aspx\?s=1/.test(siteURL))
			var xPathSearch = "//img[@src='/images/icons/" + img + "']";
		else
			var xPathSearch = "//img[@src='http://www.geocaching.com/images/icons/" + img + "']";
		//  Execute xpath query to get a collection of images.
		var ImgList = document.evaluate(
			xPathSearch,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		var ic = ImgList.snapshotLength;
		return ic;
	}
	
	var tbllog = document.getElementsByTagName('table');
	var Data = '';
	
	var Img = new Array();
	var Ttl = new Array();
	
	Ttl[0]  = 'Archive';
	Img[0]  = 'traffic_cone.gif';
	Ttl[1]  = 'Attended';
	Img[1]  = 'icon_attended.gif';
	Ttl[2]  = 'Didnt find it';
	Img[2]  = 'icon_sad.gif'
	Ttl[3]  = 'Enable Listing';
	Img[3]  = 'icon_enabled.gif';
	Ttl[4]  = 'Found it';
	Img[4]  = 'icon_smile.gif';
	Ttl[5]  = 'Needs Archived';
	Img[5]  = 'icon_remove.gif';
	Ttl[6]  = 'Needs Maintenance';
	Img[6]  = 'icon_needsmaint.gif';
	Ttl[7]  = 'Owner Maintenance';
	Img[7]  = 'icon_maint.gif';
	Ttl[8]  = 'Post Reviewer Note';
	Img[8]  = 'big_smile.gif';
	Ttl[9]  = 'Temporarily Disable Listing';
	Img[9]  = 'icon_disabled.gif';
	Ttl[10] = 'Update Cooridnates';
	Img[10] = 'coord_update.gif';
	Ttl[11] = 'Webcam Photo Taken';
	Img[11] = 'icon_camera.gif';
	Ttl[12] = 'Will Attend';
	Img[12] = 'icon_rsvp.gif';
	Ttl[13] = 'Write note';
	Img[13] = 'icon_note.gif';
	
	//  Get count of each image type. Build display string.
	for (var i = 0; i < Ttl.length; i++) {
		ImgCount = GetCount(Img[i])
		GM_log(ImgCount);
		if (ImgCount > 0) 
			Data = Data + '  &nbsp; <img src="http://www.geocaching.com/images/icons/' +
				Img[i] +'" align="absmiddle" title="' + Ttl[i] + '">' +
				'=' + ImgCount;
	}
	if (Data){
		CountSpan = document.createElement('span')
		CountSpan.innerHTML = '<br>Totals by log type:' + Data;
		tbllog[0].parentNode.insertBefore(CountSpan, tbllog[0].previousSibling);		
	}
}
}	//End Log Breakdown Count