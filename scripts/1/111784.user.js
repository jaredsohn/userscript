// ==UserScript==
// @name           Beta 2
// @namespace      IMH Beta 2
// @include        https://imh.s1.exacttarget.com/hub/
// @include        https://app.s1.exct.net/Campaigns/Dashboard/*
// @include        https://app.s1.exct.net/AutomationStudio/Dashboard/default.html
// @include        http://hub.exacttarget.com/hub/Home/App?a=6
// @include        http://hub.exacttarget.com/hub/Home/App?a=2
// @include        https://app.s1.exct.net/AutomationStudio/Definition/*
// @include        https://imh.s4.exacttarget.com/hub/*
// @include        http://app.s4.exct.net/AutomationStudio/*
// @include        https://app.s4.exct.net/Campaigns/Dashboard/*
// ==/UserScript==

  

	var errorM = document.getElementById('SendErrorMessage');
			if (errorM) {
			    errorM.parentNode.removeChild(errorM);
			}

	
//This calls the 'removeBanner' function on initial page load 
window.setTimeout(removeBanner,0);


//This calls the 'AB' function on intial page load
window.setTimeout(AB,0);





//This calls the 'timer' function when the window is resized.  The Hub will reset the screen and add the 'Coming Soon' banners back when the window is resized, this stops that.
 if (! timer()) {
        window.addEventListener ("resize", function(){timer("1000")}, false);

  }
      
      
//This calls the 'removeBanner' function on page final load 
   if (! removeBanner()) {
        window.addEventListener ("load", removeBanner, false);
  }

 //This calls the 'Reports' function on page final load 
   if (! removeBanner()) {
        window.addEventListener ("load", Reports, false);
  }


 //This calls the 'ungrey' function on page final load 
 if (! ungrey()) {
        window.addEventListener ("load", ungrey, false);
  }



//This calls the 'timer' function on a 7 second loop.
window.setTimeout(function(){timer("3000")},0);





//This is the 'timer' function, it calls the 'removeBanner' and 'ungrey' functions on a loop for a amount of time that is passed in the 'timetick' variable.  This is used to stop the 'Coming Soon' banner from flashing on the HUB screens that take time to load and do not respons to Greasemonkey functions 'onload'
function timer(timetick) {                                                                 
		for (var n1 = timetick; n1--> 0;) {
			 window.setTimeout(removeBanner,n1);
			
			 	
					}
				 	window.setTimeout(ungrey,400);
				 	 window.setTimeout(Reports,800);
					
}   




//This is the 'AB' function, it adds the 'Audience Builder' and 'Mobile'menu options, removes the 'Soulja Boy' recent itmes. 
function AB(){


       


		//These two chuncks of code change the 'Interactive Marketing Hub' item on the app drop down menu in the 'Audience Builder' and 'Mobile' screens to point to the Beta2 version of the IMH.  It's all very confusing.
				var hub2 = document.getElementById('JsImhHeaderInteractive<br>MarketingHubLink');
			if (hub2) {
			    hub2.setAttribute('href', 'https://imh.s1.exacttarget.com/hub/');
			}


				var hubswitch1 = document.getElementById('JsImhHeaderBranding');
			if (hubswitch1) {
			    hubswitch1.setAttribute('href', 'https://imh.s1.exacttarget.com/hub/');
			}




		//These two chuncks of code add 'Audience Builder' to the left menu on the home page and to the app drop down menu

		var navbar = document.getElementById('currentAppList');
				if (navbar) {
		  var logo = document.createElement("div");
		  logo.setAttribute('class', 'navigation_appList_current'); 
		logo.innerHTML = '<ul id="currentAppList"><li><a style="background-image: url(http://dl.dropbox.com/u/8998240/Keith%27s%20Folder/AB.png);" class="navigation_appList_link automationstudio" href="http://hub.exacttarget.com/hub/Home/App?a=6"><span class="title">Audience Builder</span></a></li></ul>';
		    navbar.parentNode.insertBefore(logo, navbar.nextSibling);
			}



		var navbar2 = document.getElementById('appSwitcherList');
				if (navbar2) {  
		  var logo2 = document.createElement("ul");
		  logo2.setAttribute('id', 'appSwitcherList'); 
		logo2.innerHTML = '<li id="app_123"><a class="navigation_appList_link" style="background-image: url(http://dl.dropbox.com/u/8998240/Keith%27s%20Folder/AB.png);" href="http://hub.exacttarget.com/hub/Home/App?a=6"><span class="title">Audience Builder</span></li>';
		    navbar2.parentNode.insertBefore(logo2, navbar2.nextSibling);
			}



		//This code adds 'Mobile' to the app drop down menu

			var navbar3 = document.getElementById('appSwitcherList');
				if (navbar3) {   
		  var logo3 = document.createElement("ul");
		  logo3.setAttribute('id', 'appSwitcherList'); 
		logo3.innerHTML = '<li id="app_1234"><a class="navigation_appList_link" style="background-image: url(http://dl.dropbox.com/u/8998240/Keith%27s%20Folder/AB.png);" href="http://hub.exacttarget.com/hub/Home/App?a=2"><span class="title">Mobile</span></li>';
		    navbar3.parentNode.insertBefore(logo3, navbar3.nextSibling);
			}






		//This gets rid of the 'feedback' button
		var feedback = document.getElementById('feedbackPanel');
			if (feedback) {
			    feedback.parentNode.removeChild(feedback);
			}
			
}




//This is the 'Reports' function, it adds the real looking 'Reports' window. 
function Reports(){

	//These two chunks of code swap out the greyed out 'Reports' with live looking functionality
		var reportsOL = document.getElementById('reportsOverlay');
			if (reportsOL) {
			    reportsOL.parentNode.removeChild(reportsOL);
			}



			var newReport = document.getElementById('reports_content');
			if (newReport) {
		 newReport.setAttribute('style', 'height: 370px; background-color: #ffffff;'); 
		 //newRecent.setAttribute('style', 'background-color: #ffffff;'); 
		 var html4 = document.createElement("td");
		 newReport.innerHTML = '<div class="containerBody" style="padding-bottom:0px; -webkit-border-bottom-left-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomleft: 0px; -moz-border-radius-bottomright: 0px;"> <img src="http://hub.exacttarget.com/hub/Content/images/reports_content.png"> </div> <div class="containerBody" style="margin-top:-8px; padding:0px; -webkit-border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topleft: 0px; -moz-border-radius-topright: 0px;"> <iframe id="report_frame" scrolling="no" frameborder="0" style="width:100%; height:200px; border:none" src="http://hub.exacttarget.com/hub/reports.html"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <title>Reports</title> <style type="text/css"> body{ width:250px; } .head { margin:10px 0 0 10px; padding-bottom:10px; font-weight:bold; font-family:Arial; font-size:12px; color:#666; } a { color:#4e8abe; font-family:Arial; text-decoration:none; font-size:12px; font-weight:normal; } img{ vertical-align:top; } p{ font-size:10px; color:#999; margin-top:0px; font-family:Arial; } td { border-bottom: 1px dashed #999;padding-top:5px; } table { border-top:1px dashed #999; } </style> </head> <body> <div class="head">Available Reports</div> <table width="100%" style="margin-left:-6px;"> <tbody> <tr> <td style="width:25px; vertical-align:top;"> <img alt="" src="Content/images/report_icon.png"> </td> <td> <a target="_blank" title="Description" href="http://adhoc.exacttarget.com/AdHocReporting/rdPage.aspx?rdReport=ahReport4&FirstTime=True">Audience Growth over Time</a> <p>A graphical view of an audience size over time.</p> </td> </tr> <tr> <td style="width:25px; vertical-align:top;"> <img alt="" src="Content/images/report_icon.png"> </td> <td> <a target="_blank" title="Description" href="http://adhoc.exacttarget.com/AdHocReporting/rdPage.aspx?rdReport=ahReport7&FirstTime=True">Channel Overview</a> <p>A comparison of conversion by channel.</p> </td> </tr> <tr> <td style="width:25px; vertical-align:top;"> <img alt="" src="http://hub.exacttarget.com/hub/Content/images/report_icon.png"> </td> <td> <a target="_blank" title="Description" href="http://adhoc.exacttarget.com/AdHocReporting/rdPage.aspx?rdReport=ahReport8&FirstTime=True">Email Send Summary</a> <p>Aggregate view of email metrics for the account.</p> </td> </tr> </tbody> </table> </body> </html> </iframe> </div>';
		  newReport.parentNode.insertBefore(html4, newReport.nextSibling);
			}


	
	//This gets rid of the 'Recent Items'
		var newRecent = document.getElementById('recentItems_content');
			if (newRecent) { 
		 
		  newRecent.setAttribute('class', ''); 
		  newRecent.setAttribute('style', 'background-color: #ffffff; overflow:auto; height: 370px;'); 
		 		 
		 newRecent.innerHTML = '<table class="recentItems_table"> <tbody> <tr class="recentItems_table_itemRow"> <td colspan="5"> <span class="type"><b><font color="#B0B1CE">EMAIL</font></span> <span class="date">9/12/10 2:30 PM</span> </td> </tr> <tr class="recentItems_table_descRow bottomBorder"> <td class="recentItems_table_imgCol"> <img class="descImage" src="" alt="EMAIL"> </td> <td class=""> <h1><font color="#4D8ABE">Promo Email</font></h1> <h2><font color="#B0B1CE">Subject</h2> <p><font color="#606164">Your NTO Weekly Deal</p> </td> <td class="recentItems_table_smallCol"></td> <td class="recentItems_table_smallCol"> <h2><font color="#B0B1CE">Status</h2> <p><font color="#606164">Scheduled</p> </td> <td class="recentItems_table_smallCol outerRight"> <img class="" src="http://hub.exacttarget.com/hub/Content/images/recent_details_on.png" alt="settings"> </td> </tr> <tr class="recentItems_table_itemRow"> <td colspan="5"> <span class="type"><font color="#B0B1CE">TWITTER</font></span> <span class="date">9/12/10 2:30 PM</span> </td> </tr> <tr class="recentItems_table_descRow bottomBorder"> <td class="recentItems_table_imgCol"> <img class="descImage" src="http://hub.exacttarget.com/hub/Content/images/recent_items_60x60_twitter.png" alt="TWITTER"> </td> <td class="recentItems_table_bigCol"> <h1><font color="#4D8ABE">New Twiiter Post</font></h1> <h2><font color="#B0B1CE">Content</h2> <p><font color="#606164">Promotional NTO Twitter Post</p> </td> <td class="recentItems_table_smallCol"></td> <td class="recentItems_table_smallCol"> <h2><font color="#B0B1CE">Status</h2> <p><font color="#606164">Scheduled</p> </td> <td class="recentItems_table_smallCol outerRight"> <img class="" src="http://hub.exacttarget.com/hub/Content/images/recent_details_on.png" alt="settings"> </td> </tr> <tr class="recentItems_table_itemRow"> <td colspan="5"> <span class="type"><font color="#B0B1CE">FACEBOOK</font></span> <span class="date">9/12/10 2:30 PM</span> </td> </tr> <tr class="recentItems_table_descRow bottomBorder"> <td class="recentItems_table_imgCol"> <img class="descImage" src="http://hub.exacttarget.com/hub/Content/images/recent_items_60x60_facebook.png" alt="FACEBOOK"> </td> <td class="recentItems_table_bigCol"> <h1><font color="#4D8ABE">New Facebook Post</font></h1> <h2><font color="#B0B1CE">Content</h2> <p><font color="#606164">Promotional NTO Facebook Post</p> </td> <td class="recentItems_table_smallCol"></td> <td class="recentItems_table_smallCol"> <h2><font color="#B0B1CE">Status</h2> <p><font color="#606164">Scheduled</p> </td> <td class="recentItems_table_smallCol outerRight"> <img class="" src="http://hub.exacttarget.com/hub/Content/images/recent_details_on.png" alt="settings"> </td> </tr> <tr class="recentItems_table_itemRow"> <td colspan="5"> <span class="type"><font color="#B0B1CE">SMS</span> <span class="date">9/12/10 2:30 PM</span> </td> </tr> <tr class="recentItems_table_descRow bottomBorder"> <td class="recentItems_table_imgCol"> <img class="descImage" src="/hub/gadgets/recentitems/images/img4.png" alt="SMS"> </td> <td class="recentItems_table_bigCol"> <h1><font color="#4D8ABE">New SMS Campaign</h1> <h2><font color="#B0B1CE">Keywords</h2> <p><font color="#606164">NTO SMS Promotion</p> </td> <td class="recentItems_table_smallCol"></td> <td class="recentItems_table_smallCol"> <h2><font color="#B0B1CE">Status</h2> <p><font color="#606164">Scheduled</p> </td> <td class="recentItems_table_smallCol outerRight"> <img class="" src="http://hub.exacttarget.com/hub/Content/images/recent_details_on.png" alt="settings"> </td> </tr> <tr class="recentItems_table_itemRow"> <td colspan="5"> <span class="type"><font color="#B0B1CE">AUDIENCE</span> <span class="date">9/12/10 2:30 PM</span> </td> </tr> <tr class="recentItems_table_descRow bottomBorder"> <td class="recentItems_table_imgCol"> <img class="descImage" src="http://hub.exacttarget.com/hub/Content/images/recent_items_60x60_audience.png" alt="AUDIENCE"> </td> <td class="recentItems_table_bigCol"> <h1><font color="#4D8ABE">Soulja Boy ATL Launch Party</h1> <h2><font color="#B0B1CE">Segment</h2> <p><font color="#606164">Socially Engaged, CD Buyers, Mobile Fans, Twitter Army</p> </td> <td class="recentItems_table_smallCol"></td> <td class="recentItems_table_smallCol"> <h2><font color="#B0B1CE">Status</h2> <p><font color="#606164">Scheduled</p> </td> <td class="recentItems_table_smallCol outerRight"> <img class="" src="http://hub.exacttarget.com/hub/Content/images/recent_details_on.png" alt="settings"> </td> </tr> <tr class="recentItems_table_itemRow"> <td colspan="5"> <span class="type"><font color="#B0B1CE">AUTOMATIONS</span> <span class="date">9/12/10 2:30 PM</span> </td> </tr> <tr class="recentItems_table_descRow bottomBorder"> <td class="recentItems_table_imgCol"> <img class="descImage" src="http://hub.exacttarget.com/hub/Content/images/recent_items_60x60_automation.png" alt="AUTOMATIONS"> </td> <td class="recentItems_table_bigCol"> <h1><font color="#4D8ABE">Import, Group and Send</h1> <h2><font color="#B0B1CE">Select File</h2> <p><font color="#606164">vips.csv</p> </td> <td class="recentItems_table_smallCol"></td> <td class="recentItems_table_smallCol"> <h2><font color="#B0B1CE">Status</h2> <p><font color="#606164">Scheduled</p> </td> <td class="recentItems_table_smallCol outerRight"> <img class="" src="http://hub.exacttarget.com/hub/Content/images/recent_details_on.png" alt="settings"> </td> </tr> </tbody> </table>';
		 // newRecent.parentNode.insertBefore(htmlRecent, newRecent.nextSibling);
			}


}





//This function 'ungreys' the 'Automation Studio' and 'Campaigns' panels
function ungrey(){

	//This removes the grey shadowing from 'div' with class='al-banner-mask' on the Automation Studio page
	var panels = document.getElementsByTagName('div');
	for (var x = panels.length; x--> 0;) {
		  var div = panels[x];
				  


					if (div.getAttribute("class") == "recentItems_table") {
					  div.parentNode.removeChild(div);
						}  
						



				  if (div.getAttribute("class") == "al-banner-mask") {
					  div.setAttribute("class", "");
						}


				 	if (div.getAttribute("class") == "as-comingSoon-campaigns") {
	  					div.setAttribute("class", "");
						}

			//This removes the grey shadowing from 'div' with class='banner-wrapper banner-wrapper-dither' on the Campaigns page
			 	if (div.getAttribute("class") == "banner-wrapper banner-wrapper-dither") {
					  div.setAttribute("class", "");
						}

	if (div.getAttribute("class") == "al-banner-corner") {
					   div.parentNode.removeChild(div);
						}

						

			}

				var errorM = document.getElementById('SendErrorMessage');
			if (errorM) {
			    errorM.parentNode.removeChild(errorM);
			}
}






//This function creates an array of all the images on the screen and then goes through and removes all 'Coming Soon' banner images by doing a wild card search on the image 'src'.  Had to do a wild card because the banner 'src' on some screens are dynamically created and have variable names.  
function removeBanner(){


	var images = document.getElementsByTagName('img');
		for (var n = images.length; n--> 0;) {
		  var img = images[n];
		  if (img.getAttribute("src").search('comingsoon') > -1) {
		  	//alert(img2.getAttribute("src"));
			  img.setAttribute("src", "");
			  img.setAttribute("alt", "");
			}
		}

	var images2 = document.getElementsByTagName('img');
		for (var n2 = images2.length; n2--> 0;) {
		  var img2 = images2[n2];
		  if (img2.getAttribute("src").search('base64') > -1) {
		  	//alert(img2.getAttribute("src"));
			  img2.setAttribute("src", "");
			}
}

	var images3 = document.getElementsByTagName('img');
		for (var n3 = images3.length; n3--> 0;) {
		  var img3 = images3[n3];
		  if (img3.getAttribute("src").search('images/icon.png') > -1) {
		  	//alert(img2.getAttribute("src"));
			  img3.setAttribute("src", "");
			}

		}






	var banners = document.getElementsByTagName('div');
	for (var x = banners.length; x--> 0;) {
		  var div = banners[x];
				  


	if (div.getAttribute("class") == "al-banner-corner") {
					   div.parentNode.removeChild(div);
						}

						

			}







	var panels = document.getElementsByTagName('div');
	for (var x = panels.length; x--> 0;) {
		  var div = panels[x];
				  


						if (div.getAttribute("class") == "recentItems_table") {
					  div.parentNode.removeChild(div);
						}



						

			}

	var reportsOL = document.getElementById('reportsGadget');
			if (reportsOL) {
			    reportsOL.parentNode.removeChild(reportsOL);
			}




var newRecent = document.getElementById('recentItems_content');
		if (newRecent) { 
		
		 		 
		newRecent.innerHTML = '';
		 
			}


	var campaignAct = document.getElementById('gadget1');
			if (campaignAct) {
			    campaignAct.parentNode.removeChild(campaignAct);
			}


				var csBtn = document.getElementById('comingSoonBtn');
			if (csBtn) {
			    csBtn.parentNode.removeChild(csBtn);
			}



	var errorM = document.getElementById('SendErrorMessage');
			if (errorM) {
			    errorM.parentNode.removeChild(errorM);
			}
			

}