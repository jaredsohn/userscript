(
 function(){

// ==UserScript==
// @name           Kdenlive Forum Ban User
// @namespace      KdenliveForumBanUser
// @description    One click Button/link to delete user and delete posts page on Kdenlive forums
// @version 0.8
// @date 2013-06-10
// @include        http://*.kdenlive.org/forum/*
// @include        http://*.kdenlive.org/tracker*
// @include        http://*.kdenlive.org/user/*/delete
// @include        http://*.kdenlive.org/users/*    
// ==/UserScript==
// /home/ttguy/.mozilla/firefox/1eh9rggu.default/gm_scripts/Kdenlive_Forum_Ban_User
// User Script to make moderating spam in the kdenlive forums a bit easier.
//  Adds direct links/buttons to the ban/delete user page onto forum pages and recent posts page
// The script parses the forum pages to find users with only one post and adds a ban user button underneath that
// users name.
// The script parses the recent posts page to find threads with zero replies and adds a ban user link next the
// username of the starter of the thread.
// The links/buttons do not instantly delete the user. You need to Ok the delete on the Delete user page. 
//
// Need to have Greasemonkey installed in firefox.
// see https://addons.mozilla.org/firefox/addon/748
// May also work in other browsers with appropriate add ins installed - eg Tampermonkey for Chrome
//  Userscripts on Safari on Macs http://wiki.greasespot.net/Cross-browser_userscripting#Safari
//  Userscripts on IOS devices http://ioscomplex.blogspot.com.au/2013/04/introducing-userscripts-to-ios.html
// 
// Note: You need to have delete user privlidges granted to you by j-b-m before this will work
// 
// kdenlive_ban_user.user.js
// 
// URLs it kicks in for are 
  // http://kdenlive.org/forum/*        - adds a ban user button for users with only 1 post 
//                                   (see vTargetPostCount var which you could change to make it add button 
//                                   if user has a different number of posts or less) 
//                                  This button takes you to the delete user page for the user. It does not instantly ban them with one click
//                                       You have to OK the delete from the delete user page
  // http://kdenlive.org/tracker     - adds a ban user link to threads with zero replies. This link takes you to the
//                                     delete user page for the starter of the thread.
//                                        It does not instantly ban them with one click
//                                       You have to OK the delete from the delete user page
//                                         Eases the deletion of users
//                              that create  spam threads that are obvious from the recent posts page. 
//                         You can customise the trigger count for replies with vTargetReplyCount
//   http://*.kdenlive.org/user/*/delete  - On this page the script changes the default radio
//                                       button selections to "Disable the account and unpublish all content"
//                                        and report as "Spam, unsolicited advertising" 
//                                        Customise this by changing which vDefaultDeleteOption  and vDefaultReportOption
//                                       is commented in or out
//
// User script webcomic reader has a method for injecting http://userscripts.org/scripts/show/59842
// his user script into IOS (and any browser for that matter)
// see http://userscripts.org/topics/70361
// You set up a special bookmark that contains some Java script. Then you browse to your comic page
// and while on the page you invoke the bookmark. It worked for me in firefox on the desktop
// Version 0.3 is modified along the same lines as the webcomic reader. This  loads
// using the bookmark technique. 
// create a bookmark as 
//   javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://home.exetel.com.au/ttguy/KFBU.user.js';})(); 
//
//   that is referencing a copy hosted at 
//  http://home.exetel.com.au/ttguy/KFBU.user.js  
// 
// Then when you are on one of the include pages in a browser that does not have greasemonkey installed
// you can envoke this scripts functionality by accessing the bookmark. The bookmark will
// append the script the current pages html and execute.
// Not an ideal solution because you have to invoke it each time the page loads.
//
// ver 0.4 Has better performance as I have attempted to abort the load of the user pages as soon as the user
// number is visible.
//         This means that the page loads and then as member numbers are found the ban user links are added
//       one by one as each fetch completes. Much better performance.
//
// ver 0.5 puts ban links against all users posts in comments on blog posts like JBMs kdenlive release
//    blog posts are used to host spam too. It does not do any attempt to predict if the post is a spam post
//    all users get a ban link which takes you to the delete the user page ready for you to confrim or cancel
//   the ban.
// ver 0.6 7/6/2013 - take account of new delete user page structure
//                  start development of logging ip addresses to database at home.exetel.com.at/ttguy
//            Can now send some info to http://home.exetel.com.au/ttguy/del_kdenlive_user_action.php
//            when the user is deleted. The del_kdenlive_user_action.php logs data in a database
//            and then automatically submits the form to actually delete the user.
//            
// ver 0.7 9/6/2013 This version extracts the IP address of the user to be deleted from the  "Track page visits" page
//                There is not allways data on that page so we will not allways find this data.
//               Durring the scan to create the ban links this version extracts the website listed on the users page - spammers often put a spam website in that
//                It also scans the users age of membership - ie how long they have been a member.
//               Some of this info is saved in cookies so that the delete page can get them.
//                The membership age is displayed on the delete page as some feedback for user to decide
//                 if they are delete worthy.
//               The IP address and website data extracted is now also submitted to the ttguys database 
//            This version introduces a slight bug where sometimes the user gets two ban links next to their name
//            when the new posts page is listed. Not sure why. Does not seem to be a real problem.
//        Stats can be viewed at http://home.exetel.com.au/ttguy/forum_spammer_stats.php
//
// 0.8  fix bug in Membership age display and in capturing the spammers website 

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var c_value = document.cookie;
	//GM_log ("getCookie " +  c_value);
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	{
	  c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1)
	{
	  c_value = null;
	}
	else
	{
	  c_start = c_value.indexOf("=", c_start) + 1;
	  var c_end = c_value.indexOf(";", c_start);
	  if (c_end == -1)
	  {
	     c_end = c_value.length;
	  }
	  c_value = unescape(c_value.substring(c_start,c_end));
	}
        return c_value;
}



                                             
  function trim(str)
  {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//return ( str.replace(/^\s+|\s+$/g, ''))
  }

/*
  GetUserNumberAddBanLink(pUserPageURL, pPageNode,pAddButton)
 Pass a URL of the form http://www.kdenlive.org/users/<username_urlsafe>
where <username_urlsafe> is the url safe string version of the user name that the web site 
serves up and which the main program needs to extract from the page it is parsing
 eg user ben_jhawk has <username_urlsafe> of benjhawk  - it cuts out the underscore
This function loads up that userpage into memory and then extracts the user number from that page.
This user number can them be used to construct the url for the delete user page

pPageNode = element in the page were we will add the link/form when usernumber is found
pAddButton - if true the link to the ban user will be a button. if false it will be a hyperlink
*/

  function GetUserNumberAddBanLink(pUserPageURL,pPageNode,pAddButton)

  {
   	var vUserNumber,vStart, vEnd,vResponse, vMembershipAge, vUserWebsite;
	var xmlhttp, linkadded;
	vUserWebsite="";
 	//GM_log('begin GetUserNumberAddBanLink:' + pUserPageURL);
	linkadded = false;	
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	} 
        xmlhttp.addEventListener("progress", updateProgress1, false);
	xmlhttp.addEventListener("load", transferComplete1, false);
	//xmlhttp.open("GET", pUserPageURL,false);// false to async - so it waits here to load
	xmlhttp.open("GET", pUserPageURL,true);// true to async - so it does not wait here
	xmlhttp.send();

    	//return vUserNumber;

	// updateProgress1  is registered as a listner function on the load and is envoked by 
	//         the browser as it loads the user details page. 
        // 
	// this function is local to the GetUserNumberAddBanLink() function so it sees its variables  and parameters
	//	eg  it sees pPageNode parameter
	//         This function checks if the user number data has already been loaded from the xmtlhtmp.get
	// and if it has it updates the pPageNode inner html on the page to have the link or button to the delete page
	// 
	function updateProgress1 (oEvent) 
	{
		var BanUserForm;
		vResponse=xmlhttp.responseText;
		//GM_log('updateProgress1'+ vResponse.length);
		//GM_log(vResponse.substring(vResponse.length - 20, vResponse.length));
		if (vResponse.indexOf('Sorry, this page is not available on Kdenlive web site') > -1 )// we did not find the user details page
		{
 			xmlhttp.abort();
			vUserNumber = -1;
			pPageNode.innerHTML  += "failed to find user page for " + pUserPageURL ;
			
		}
		else
		{

		//  <dt>Member for</dt>
		//<dd>4 years 28 weeks</dd>
			vStart=vResponse.indexOf('<dt>Member for</dt>') + 24;
			vEnd=vResponse.indexOf('</dd>',vStart);
			if (vStart!=23 && vEnd !=-1)
			{
			
				xmlhttp.abort();// we have loaded up to the history off the user page. 
					// so we should have the user number data and the website date (if they have a website)
				vMembershipAge = vResponse.substring(vStart, vEnd);
			//	GM_log ('updateProgress1 - vMembershipAge:' + vMembershipAge) ;
				
			}
			vStart=vResponse.indexOf('class="profile-user_website"><a href="') + 38;
			
			//GM_log ('updateProgress1 outer vStart = ' + vStart + ' vEnd='+vEnd );			
			//if (vStart!=37 && vEnd !=-1)
			if (vStart!=37)
			{
				vEnd=vResponse.indexOf('">',vStart);
				//GM_log ('updateProgress1 inner vStart = ' + vStart + ' vEnd='+vEnd );
				if (vEnd !=-1)
				{				
				vUserWebsite=vResponse.substring(vStart, vEnd);
				//GM_log ('updateProgress1 - vUserWebsite:' + vUserWebsite) ;
				}
				
			}
			vStart=vResponse.indexOf('a href="/user/') + 14;
			vEnd=vResponse.indexOf('/edit">Edit',vStart);
			if (vStart!=13 && vEnd !=-1)
			{
			  vUserNumber=vResponse.substring(vStart, vEnd);
			  //GM_log ('updateProgress1 - vUserNumber:' + vUserNumber) ;
			  if (vUserWebsite !="" )
                          {
			    //GM_log("updateProgress1 vUserNumber: " + vUserNumber + "setting website cookie: " + vUserWebsite);
			    setCookie("kdenlive_delete_user_website" + vUserNumber,vUserWebsite,1);
			  }
			  setCookie("kdenlive_delete_user_msp_age" + vUserNumber,vMembershipAge,1);
			  // xmlhttp.abort();// 
			  // setCookie("kdenlive_delete_user" + vUserNumber,"ghagae" + vUserNumber,1);
		    	  //class="profile-user_website"><a href="

			  // vTrackUrl ="http://www.kdenlive.org/user/" + vUserNumber  + "/track/navigation";
//                	  go to vTrackUrl and find <a href="/admin/reports/access/40841196">details</a>
//                	  go to the  /admin/reports/access/40841196 page and find
//                	  <tr class="even"><th>Hostname</th><td>31.33.144.218</td> </tr>
//			  GM_log(" vTrackUrl: " + vTrackUrl);
			  if (!linkadded)
			  {			 
				  if (pAddButton )
				  {
					BanUserForm = " <p>    <form action='/user/" + vUserNumber + "/delete' method='post'>\n";

					BanUserForm += "<input value='Ban User' name='BanUser' type='submit' /></form></p> \n";
					
				    pPageNode.innerHTML  +=BanUserForm;
				  }
				  else
				  {
				    pPageNode.innerHTML  += ' (<a href="/user/' + vUserNumber + '/delete">ban</a>)';
				  }
				  linkadded = true;
				 // GM_log ('updateProgress1 - link added');
			  }
			}
		}
		
	  
	}//end function updateProgress1

	// transferComplete1 this will execute once the load from the Get member page info has complete
	// this will normally not happen because we will find the member number before the data loads to completion
        // and the  updateProgress1 function will have already done its job and aborted the load
	function transferComplete1(evt) 
	{
  		vResponse=xmlhttp.responseText;
		//GM_log('transferComplete1'+	vResponse.length);
		if (vResponse.indexOf('Sorry, this page is not available on Kdenlive web site') > -1 )// we did not find the user details page
		{
 			xmlhttp.abort();
			vUserNumber = -1;
			pPageNode.innerHTML  += "failed to find user page for " + pUserPageURL ;
		}
		else
		{

			vStart=vResponse.indexOf('<dt>Member for</dt>') + 24;
			vEnd=vResponse.indexOf('</dd>',vStart);
			if (vStart!=23 && vEnd !=-1)
			{
			
				
				vMembershipAge = vResponse.substring(vStart, vEnd);
				//GM_log ('vMembershipAge:' + vMembershipAge) ;
				
			}
			vStart=vResponse.indexOf('class="profile-user_website"><a href="') + 38;
			vEnd=vResponse.indexOf('">',vStart);
			if (vStart!=37 && vEnd !=-1)
			{
				vUserWebsite=vResponse.substring(vStart, vEnd);
			//	GM_log ('vUserWebsite:' + vUserWebsite) ;
				
			}
			vStart=vResponse.indexOf('a href="/user/') + 14;
			vEnd=vResponse.indexOf('/edit">Edit',vStart);
			if (vStart!=13 && vEnd !=-1 && !linkadded )
			{
			  vUserNumber=vResponse.substring(vStart, vEnd);
			  setCookie("kdenlive_delete_user_msp_age" + vUserNumber,vMembershipAge,1);
			  if (vUserWebsite !="" )
                          {
			//	GM_log("transferComplete1 vUserNumber: " + vUserNumber + "setting website cookie: " + vUserWebsite);
			    setCookie("kdenlive_delete_user_website" + vUserNumber,vUserWebsite,1);
			  }
		    	  //GM_log(" vUserNumber: " + vUserNumber);
			  if (pAddButton )
			  {
				BanUserForm = " <p>    <form action='/user/" + vUserNumber + "/delete' method='post'>\n";

				BanUserForm += "<input value='Ban User' name='BanUser' type='submit' /></form></p> \n";
					
			    pPageNode.innerHTML  +=BanUserForm;
			  }
			  else
			  {
			    pPageNode.innerHTML  += ' (<a href="/user/' + vUserNumber + '/delete">ban</a>)';
			  }
			 // GM_log ('transferComplete1 - link added');
			}
			else
			{
				vUserNumber = -2;
				pPageNode.innerHTML  += "failed to find member number for " + pUserPageURL ;	
			}
		}

	}
   
  }// end function GetUserNumberAddBanLink

// called from main when it is on the delete user page.
// Job is to a syncronsly go and look up the IP address of the spammer
// It loads http://www.kdenlive.org/user/<UserNumber>/track/navigation
// and has two event listners that listen to see if the url for tracking page visits has appeared
//  (/admin/reports/access/<DetailID>). These two event listeners are local to the PopulateDeleteFormData function
  function PopulateDeleteFormData (pForm ,pDeletedUser, pElems,pDefaultReportOption, pDelButton,pUserNumber,pPageNode, pHeadingElement)
  {
	var vIpAddress,vSpamSite;//, atribs;
	var vUserNumber,vStart, vEnd,vResponse;
	var xmlhttp, vPageVisitsURl,vDetailID,vDetailUrl;
	vPageVisitsURl="http://www.kdenlive.org/user/" + pUserNumber + "/track/navigation"
/*
	vIpAddress='666.666.666';// dummy one for now
	vSpamSite='http://kitchens.com/';// dummy one for now
	
	atribs=pForm.attributes;//returns a collection of the specified node's attributes, as a NamedNodeMap.
	//GM_log(atribs['action'].value + 'id:' + atribs['id'].value);	
	//GM_log(h1s[0].innerHTML);		
	pForm.innerHTML += "<input name='final_dest' id='final_dest' value='" + atribs['action'].value + "' type='hidden'></input>"	;
	pForm.innerHTML += "<input name='IP_address_spammer' id='IP_address_spammer' value='" + vIpAddress + "' type='hidden'></input>"	;
	pForm.innerHTML += "<input name='Deleted_User_Name' id='IP_address_spammer' value='" + pDeletedUser + "' type='hidden'></input>"	;
	pForm.innerHTML += "<input name='Spam_Site' id='Spam_Site' value='" + vSpamSite + "' type='hidden'></input>"	;	
	
	atribs['action'].value='http://home.exetel.com.au/ttguy/del_kdenlive_user_action.php';

	pElems[pDefaultReportOption ].checked =true;
*/
	//pDelButton.disabled=false;// does not work


 	//GM_log('begin PopulateDeleteFormData:' + pUserPageURL);
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	} 
        xmlhttp.addEventListener("progress", updateProgress2, false);
	xmlhttp.addEventListener("load", transferComplete2, false);

	//xmlhttp.open("GET", vPageVisitsURl,false);// false to async - so it waits here to load
	xmlhttp.open("GET", vPageVisitsURl,true);// true to async - so it does not wait here
	xmlhttp.send();
	//GM_log("vPageVisitsURl:" + vPageVisitsURl);
    	

	// updateProgress2  is registered as a listner function on the load and is envoked by 
	//        
        // 
	// this function is local to the PopulateDeleteFormData() function so it sees its variables  and parameters
	//	eg  it sees vPageVisitsURl var
	//         This function checks if the user number data has already been loaded from the xmtlhtmp.get
	// and if it has it updates the pPageNode inner html on the page to have the link or button to the delete page
	// 
	function updateProgress2 (oEvent) 
	{
		
		vResponse=xmlhttp.responseText;
		//GM_log('updateProgress2'+ vResponse.length);
		//GM_log(vResponse.substring(vResponse.length - 20, vResponse.length));
		if (vResponse.indexOf('Sorry, this page is not available on Kdenlive web site') > -1 )// we did not find the user details page
		{
 			xmlhttp.abort();
			
			pPageNode.innerHTML  += "failed to find track user page for " + vPageVisitsURl ;
			
		}
		else
		{
			vStart=vResponse.indexOf('<a href="/admin/reports/access/') + 31;
			vEnd=vResponse.indexOf('">details</a></td>',vStart);
			//GM_log("vStart:" + vStart + " vEnd:" + vEnd); 
			if (vStart!=30 && vEnd !=-1)
			{
			  vDetailID=vResponse.substring(vStart, vEnd);
			  
			  vDetailUrl = "http://www.kdenlive.org/admin/reports/access/" + vDetailID;
			//  GM_log("vDetailUrl:" + vDetailUrl );
			  xmlhttp.abort();// we have found the data - we can abort the rest of the loading of the page 
			  getSpammerIP (vDetailUrl);
			  
		    	  // success continue to ...
			
			//               
			//                /admin/reports/access/40841196 page and find
			//		<th>Hostname</th><td>180.254.34.168</td>
			//                <tr class="even"><th>Hostname</th><td>31.33.144.218</td> </tr>
			 			 
			 
			}

		}
		
	  
	}//end function updateProgress2

	// transferComplete2 this will execute once the load from the vPageVisitsURl page info has complete
	// this will normally not happen because we will find the data we need before the data loads to completion
        // and the  updateProgress2 function will have already done its job and aborted the load
	function transferComplete2(evt) 
	{
  		vResponse=xmlhttp.responseText;
		//GM_log('transferComplete1'+	vResponse.length);
		if (vResponse.indexOf('Sorry, this page is not available on Kdenlive web site') > -1 )// we did not find the user details page
		{
 			xmlhttp.abort();
			
			pPageNode.innerHTML  += "failed to find track navigation page for " + vPageVisitsURl ;
		}
		else
		{
			vStart=vResponse.indexOf('<a href="/admin/reports/access/') + 31;
			vEnd=vResponse.indexOf('">details</a></td>',vStart);
			//GM_log("vStart:" + vStart + " vEnd:" + vEnd); 
			if (vStart!=30 && vEnd !=-1)
			{
			 
			  xmlhttp.abort();// we have found the vDetailID - we can abort the rest of the loading of the page 
		    	  //GM_log(" vUserNumber: " + vUserNumber);
			  vDetailID=vResponse.substring(vStart, vEnd);
			  
			  vDetailUrl = "http://www.kdenlive.org/admin/reports/access/" + vDetailID;
			  //GM_log("vDetailUrl:" + vDetailUrl );
			  getSpammerIP (vDetailUrl);
			}
			else
			{
				
				//pPageNode.innerHTML  += "failed to find page visit data on " + vPageVisitsURl + "<br>" ;	
				updateFormNoIp();
			}
		}

	}// end transferComplete2
       function updateFormNoIp()
       {
		vIpAddress='not found';// dummy one for now
		vSpamSite=getCookie("kdenlive_delete_user_website" + pUserNumber);// 
	
		atribs=pForm.attributes;//returns a collection of the specified node's attributes, as a NamedNodeMap.
		
//		GM_log('pSpammerIP: '+  vIpAddress);
//		GM_log('final dest: '+  atribs['action'].value);
//		GM_log('pDeletedUser: '+  pDeletedUser);
//		GM_log('pUserNumber: '+  pUserNumber);
		
		//GM_log(h1s[0].innerHTML);		
		pForm.innerHTML += "<input name='final_dest' id='final_dest' value='" + atribs['action'].value + "' type='hidden'></input>"	;
		pForm.innerHTML += "<input name='IP_address_spammer' id='IP_address_spammer' value='" + vIpAddress + "' type='hidden'></input>"	;
		pForm.innerHTML += "<input name='Deleted_User_Name' id='Deleted_User_Name' value='" + pDeletedUser + "' type='hidden'></input>"	;
		pForm.innerHTML += "<input name='Spam_Site' id='Spam_Site' value='" + vSpamSite + "' type='hidden'></input>"	;	
		pForm.innerHTML += "<input name='User_Number' id='User_Number' value='" + pUserNumber + "' type='hidden'></input>"	;	

		atribs['action'].value="http://home.exetel.com.au/ttguy/del_kdenlive_user_action.php";
		pPageNode.innerHTML  += " failed to find page visit data on " + vPageVisitsURl + "<br>" ;
		pPageNode.innerHTML  += " IP address: " + vIpAddress; // doing this here is ok
		//pHeadingElement.innerHTML  += " ( member for " + getCookie("kdenlive_delete_user_msp_age" + pUserNumber)+ ")";		
		//pPageNode.innerHTML  += " member for " + getCookie("kdenlive_delete_user_msp_age" + pUserNumber);
		if (vSpamSite != null)
		{ 
		
			pPageNode.innerHTML  += " website: " + vSpamSite;
		}
		pElems[pDefaultReportOption ].checked =true;
		
		//pDelButton.disabled=false;// does not work
	}// end updateFormNoIp
	function getSpammerIP (pDetailUrl)
	{
             	var atribs;
		var xmlhttp2;
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp2=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
		} 
		xmlhttp2.addEventListener("progress", updateProgress3, false);
		xmlhttp2.addEventListener("load", transferComplete3, false);

		//xmlhttp.open("GET", vPageVisitsURl,false);// false to async - so it waits here to load
		xmlhttp2.open("GET", pDetailUrl,true);// true to async - so it does not wait here
		xmlhttp2.send();
		// Should see
		// pForm ,pDeletedUser, pElems,pDefaultReportOption, pDelButton,pUserNumber,pPageNode
		//pPageNode.innerHTML  += "pDetailUrl: " + pDetailUrl;// doing this here makes it forget the 
		//                                        change I make below to the action .value

		//GM_log('getSpammerIP atribs action 2 .value: '+  atribs['action'].value);

		function updateProgress3 (oEvent) 
		{
		
			vResponse=xmlhttp2.responseText;
			//GM_log('updateProgress2'+ vResponse.length);
			//GM_log(vResponse.substring(vResponse.length - 20, vResponse.length));
			if (vResponse.indexOf('Sorry, this page is not available on Kdenlive web site') > -1 )// we did not find the user details page
			{
	 			xmlhttp2.abort();
			
				pPageNode.innerHTML  += "failed to find detail page for " + pDetailUrl ;
			
			}
			else
			{
				vStart=vResponse.indexOf('<th>Hostname</th><td>') + 21;
				vEnd=vResponse.indexOf('</td> </tr>',vStart);
				//GM_log("vStart:" + vStart + " vEnd:" + vEnd); 
				if (vStart!=20 && vEnd !=-1)
				{
				  vIpAddress=vResponse.substring(vStart, vEnd);
				  
				 
				 // GM_log("vIpAddress:" + vIpAddress );
				  xmlhttp2.abort();// we have found the data - we can abort the rest of the loading of the page 
				  updateForm(vIpAddress);			  
			    	  				 			 
				 
				}
			}
		
		  
		}//end function updateProgress3

		// transferComplete3 this will execute once the load from the vPageVisitsURl page info has complete
		// this will normally not happen because we will find the data we need before the data loads to completion
		// and the  updateProgress2 function will have already done its job and aborted the load
		function transferComplete3(evt) 
		{
	  		vResponse=xmlhttp2.responseText;
			//GM_log('transferComplete3'+	vResponse.length);
			if (vResponse.indexOf('Sorry, this page is not available on Kdenlive web site') > -1 )// we did not find the user details page
			{
	 			xmlhttp2.abort();
			
				pPageNode.innerHTML  += "failed to find detail page for " + pDetailUrl ;
			}
			else
			{
				vStart=vResponse.indexOf('<th>Hostname</th><td>') + 21;
				vEnd=vResponse.indexOf('</td> </tr>',vStart);
				//GM_log("vStart:" + vStart + " vEnd:" + vEnd); 
				if (vStart!=20 && vEnd !=-1)
				{
				 
				  xmlhttp2.abort();// we have found the IP address - we can abort the rest of the loading of the page 
				  vIpAddress=vResponse.substring(vStart, vEnd);
				  updateForm(vIpAddress);
				  
				 
				//  GM_log("vIpAddress:" + vIpAddress );
				}
				else
				{
				
					pPageNode.innerHTML  += "failed to find data for " + vPageVisitsURl ;	
				}
			}

		}// end transferComplete3
	    function updateForm(pSpammerIP)
	    {
		//vIpAddress='666.666.666';// dummy one for now
		
		vSpamSite=getCookie("kdenlive_delete_user_website" + pUserNumber);
	
		atribs=pForm.attributes;//returns a collection of the specified node's attributes, as a NamedNodeMap.
		//GM_log('pSpammerIP: ' +  pSpammerIP);
		//GM_log('final dest: ' +  atribs['action'].value);
		//GM_log('pDeletedUser: ' +  pDeletedUser);
		//GM_log('pUserNumber: ' +  pUserNumber);
		//GM_log('vSpamSite: ' +  vSpamSite);
	
		//GM_log(h1s[0].innerHTML);		
		pForm.innerHTML += "<input name='final_dest' id='final_dest' value='" + atribs['action'].value + "' type='hidden'></input>"	;
		pForm.innerHTML += "<input name='IP_address_spammer' id='IP_address_spammer' value='" + pSpammerIP + "' type='hidden'></input>"	;
		pForm.innerHTML += "<input name='Deleted_User_Name' id='Deleted_User_Name' value='" + pDeletedUser + "' type='hidden'></input>"	;
		pForm.innerHTML += "<input name='Spam_Site' id='Spam_Site' value='" + vSpamSite + "' type='hidden'></input>"	;	
		pForm.innerHTML += "<input name='User_Number' id='User_Number' value='" + pUserNumber + "' type='hidden'></input>"	;	

		atribs['action'].value="http://home.exetel.com.au/ttguy/del_kdenlive_user_action.php";
		
		pPageNode.innerHTML  += "pDetailUrl: " + pDetailUrl + " IP address: " + pSpammerIP; // doing this here is ok
		
		//pHeadingElement.innerHTML  += " (member for " + getCookie("kdenlive_delete_user_msp_age" + pUserNumber) + ")";		
		if (vSpamSite != null)
		{ 
		
			pPageNode.innerHTML  += " website: " + vSpamSite;
		}
		pElems[pDefaultReportOption ].checked =true;
	    }// end updateForm	
	}// end getSpammerIP
	
  }//end PopulateDeleteFormData



function run_script()
{
	/*****************************************************

		Main

	*******************************************************/
	  var vTargetPostCount=1;   // Users with this number of post counts or less will get a Ban User button on the forum pages
		                  // Should be 1 in prod
	  var vTargetReplyCount=0;// threads with this number of replies will get a ban user link next to the topic starter link on the tracker/recent posts page

	// default delete option

	 var vDefaultDeleteOption = 'edit-user-delete-action-user-delete-block-unpublish';// make the default radio button for delete options on the delete page
	//                                                                               = "Disable the account and unpublish all content"
	//                                               I choose this one because we will have a record of the IP addresses of the spammer and their websites on file then

	// other options for Delete action are  
	//var vDefaultDeleteOption =  'edit-user-delete-action-user-delete-reassign';// Delete the account and make all content belong to the Anonymous user.
	//var vDefaultDeleteOption =  'edit-user-delete-action-user-delete-block';//  Disable the account and keep all content.
	//var vDefaultDeleteOption =  'edit-user-delete-action-user-delete-delete';// Delete the account and all content

	// default report option
	var vDefaultReportOption = 'edit-mollom-feedback-spam';//  make the default radio button on report section on the delete page = report as "Spam, unsolicited advertising" 
	// other options for report
	//var vDefaultReportOption =  'edit-mollom-feedback-profanity'; // Obscene, violent, profane
	//var vDefaultReportOption =  'edit-mollom-feedback-quality';//Low-quality
	//var vDefaultReportOption =  'edit-mollom-feedback-unwanted';//Unwanted, taunting, off-topic
	//var vDefaultReportOption =  'edit-mollom-feedback-';// Do not report
	var matchClass,BanUserForm,vResponse, vUserNumber,vStart,vEnd ,subdivs;
	var iPostCount, vReplyCount; 

	var patt1=new RegExp("/user/.*/delete");
	var patt2=new RegExp("/tracker");
	var patt3=new RegExp("/users/.*");
	var elems, i, j=0, anchs, atribs,vTDs, iTd,forms;
        var h1s,ems,vDeletedUser,DelButton,vUserNumber,vPageNode, vStart, vEnd;






	if (patt1.test( location.pathname ))
	{ // we are on the user delete page http://*.kdenlive.org/user/*/delete
	// after we submit this form it takes us to http://www.kdenlive.org/discover/0.7.8
	// with this text 
	//     The content was successfully reported as inappropriate.
	//    User record deleted. All submitted content from gosip has been deleted.
	// could be handy to go straight back to the recent posts page for the next delete
	// - Dunno if that is possible

		DelButton=document.getElementById("edit-submit");
		//DelButton.disabled=true; // can't get re-enabling this button to work
		matchClass='form-radio';
		//GM_log('match: ' + location.pathname);
		elems = document.getElementsByTagName('input');
		//GM_log(elems['edit-mollom-feedback-spam'].nodeName);
	
		// elems[vDefaultDeleteOption].checked=true; //new version of page - all deletes are delete. No block or reassign or unpublish 
	

		//GM_log ('location.pathname: ' + location.pathname);
		forms = document.getElementsByTagName('form');
		h1s = document.getElementsByTagName('h1');
		
		ems=h1s[0].getElementsByTagName('em');
		vDeletedUser=ems[0].innerHTML;
              //  http://www.kdenlive.org/user/1006936/delete  location.pathname
		vStart=location.pathname.indexOf('/user/')  + 6 ;
		vEnd=location.pathname.indexOf('/delete',vStart);
		vUserNumber=location.pathname.substring(vStart, vEnd);
		h1s[0].innerHTML  += " (member for " + getCookie("kdenlive_delete_user_msp_age" + vUserNumber) + ")";	
		//GM_log('vUserNumber: ' + vUserNumber);
		vPageNode=document.getElementById("content-area");
/*
		for (i in ems) 
		{
		//	if((' ' + forms[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) 
		//	{
				GM_log(i + ': ' + ems[i].innerHTML );
		//	}
		}

*/		
 		PopulateDeleteFormData(forms['user-confirm-delete'], vDeletedUser, elems,vDefaultReportOption, DelButton, vUserNumber,vPageNode, h1s[0]);
/* 
		vIpAddress='666.666.666';// dummy one for now
		vSpamSite='http://kitchens.com/';// dummy one for now
		
		atribs=forms['user-confirm-delete'].attributes;//returns a collection of the specified node's attributes, as a NamedNodeMap.
		//GM_log(atribs['action'].value + 'id:' + atribs['id'].value);	
		//GM_log(h1s[0].innerHTML);		
		forms['user-confirm-delete'].innerHTML += "<input name='final_dest' id='final_dest' value='" + atribs['action'].value + "' type='hidden'></input>"	;
		forms['user-confirm-delete'].innerHTML += "<input name='IP_address_spammer' id='IP_address_spammer' value='" + vIpAddress + "' type='hidden'></input>"	;
		forms['user-confirm-delete'].innerHTML += "<input name='Deleted_User_Name' id='IP_address_spammer' value='" + vDeletedUser + "' type='hidden'></input>"	;
		forms['user-confirm-delete'].innerHTML += "<input name='Spam_Site' id='Spam_Site' value='" + vSpamSite + "' type='hidden'></input>"	;	
		
		atribs['action'].value='http://home.exetel.com.au/ttguy/del_kdenlive_user_action.php';

		elems[vDefaultReportOption ].checked =true;
*/
		

	/*
		GM_log(atribs.length);

		for (i in atribs) 
		{
			
		}
	*/

	//	GM_log(atribs.getNamedItem("checked").textContent);
	/*

	*/

	}
	else if (patt2.test( location.pathname ))
	{ //  http://kdenlive.org/tracker  - recent posts page
	matchClass='replies';
	// GM_log("tracker page")	;
		elems = document.getElementsByTagName('tr');// table rows
		for (i in elems) 
		{
		//GM_log(i);

		  vTDs = elems[i].cells; // cells in each table row
		  for (iTd in vTDs)
		  {
			if ((' ' + vTDs[iTd].className + ' ').indexOf(' ' + matchClass + ' ') > -1)  // cell is a replies cell
			{
			
				vReplyCount = parseInt(vTDs[iTd].innerHTML);
				//GM_log(i + ' reply count: ' + vReplyCount)
				if( vReplyCount== vTargetReplyCount)
				{
					anchs=vTDs[2].getElementsByTagName("a");// cell number 2 has the links ("a" for anchor elements)
					//GM_log(iTd  + ': ' + vTDs[iTd].innerHTML + ': '+ anchs[0].href);
					vUserNameUrlified= anchs[0].href;
					//vUserNumber=GetUserNumberAddBanLink(vUserNameUrlified,vTDs[2]);
					GetUserNumberAddBanLink(vUserNameUrlified,vTDs[2], false);// this is going to start asyncrhnous load of the members details page
						// for each post it is finding where reply count is = target reply count
						// and when the load returns the member number the updateProgress1 function will add the link
						// to the vTDs[2]  - cell number 2

				
				
				}
			}
		   }
	
		}
	}
	else if (patt3.test( location.pathname ))
	{//# kdenlive blog pages like JBMs http://www.kdenlive.org/users/j-b-m/kdenlive-094-released
	//GM_log("blog");

		elems = document.getElementsByTagName('div');
		matchClass='submitted';
	 	// GM_log('no match: ' + location.pathname);



		for (i in elems) 
		{
			if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) 
			{
				anchs=elems[i].getElementsByTagName("a");
				vUserNameUrlified =  anchs[0].href  ;
 				//GM_log("vUserNameUrlified=" + vUserNameUrlified );
				//elems[i].innerHTML += " (ban ) "	;
				//                                               false to add button. We are adding a simple ban link
				GetUserNumberAddBanLink(vUserNameUrlified,elems[i],false);// this is going to start asyncrhnous load of the members details page
			}
		}

	}
	else// we are on a forum page http://*.kdenlive.org/forum/*
	{
		elems = document.getElementsByTagName('div');
		matchClass='author-pane-section author-pane-general';
	 	// GM_log('no match: ' + location.pathname);



		for (i in elems) 
		{
			if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) 
			{
				j++;
			 	subdivs=elems[i].getElementsByTagName('div');
				vPostCount=subdivs[3].textContent ;
				vPostCount=trim(vPostCount.replace("Posts:",""));
				iPostCount=parseInt(vPostCount) ;
				//GM_log(vPostCount);
			    	if (iPostCount <= vTargetPostCount)
				{
					anchs=subdivs[0].getElementsByTagName("a");
					//anchs=elems[i].getElementsByTagName("a");
					//elems[i].innerHTML  +=  " div #" + j + ' l= ' + subdivs[0].className ;
					//elems[i].innerHTML  +=  " div #" + j + ' l= ' + anchs[0].innerHTML;
					vUserName =  anchs[0].innerHTML;
					vUserNameUrlified =  anchs[0].href  ;

				

					//GM_log(subdivs[0].className);
					//GM_log('forum page' + vUserNameUrlified);// logs to Error console. see http://www.ehow.com/how_8414595_javascript-errors-firefox.html
					//vUserNumber=GetUserNumberAddBanLink(vUserNameUrlified,elems[i]);
					GetUserNumberAddBanLink(vUserNameUrlified,elems[i],true);// this is going to start asyncrhnous load of the members details page
						// for each post it is finding where iPostCount <= vTargetPostCount
						// and when the load returns the member number the updateProgress1 function will add the link
						// to the elems[i] 
					/*
					GM_log( 'forum page vUserNumber:' + vUserNumber);
					if (vUserNumber==-1)
					{
						 elems[i].innerHTML += "user page '" +  vUserNameUrlified + "' not found";
					}
					else if (vUserNumber==-2)
					{
						elems[i].innerHTML += "Could not find the user number on the user page '" +  vUserNameUrlified + "'";
					}
					else
					{
						BanUserForm = " <p>    <form action='/user/" + vUserNumber + "/delete' method='post'>\n";

						BanUserForm += "<input value='Ban User' name='BanUser' type='submit' /></form></p> \n";
						elems[i].innerHTML += BanUserForm;
					}
					*/
			
				}// end if target post count
				else
				{
					// elems[i].innerHTML  += 'no match to target post count';
				}
			}
		}
	}
}
run_script();
}
)
();
 

  



