// ==UserScript==
// @name Modified Pooflinger's Mousehunt Facebook Enhancer 0.0.2b
// @namespace		Pooflinger
// @description		Enhance Facebook discussion boards with Mousehunt Experience!
// @include        	http://*.facebook.com/*
// ==/UserScript==
//===============================================================================


function str2xml(strXML) { 
		//create a DOMParser
		var objDOMParser = new DOMParser();
		//create new document from string
		var objDoc = objDOMParser.parseFromString(strXML, "text/xml");
		return objDoc;
	}


//******************************************************
//The gup function is copied from http://www.netlobo.com/url_query_string_javascript.html
//******************************************************

function gup(str, name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( str );
  if( results == null )
    return "";
  else
    return results[1];
}


function setHTML(is_append, ele_id, text)
{
/*
	var allLinks;
	allLinks = document.evaluate(
    	'//*[@id='+ele_id+']',
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	for (var i = 0; i < allLinks.snapshotLength; i++) 
    		allLinks.snapshotItem(i).innerHTML = text;
*/
	var tag2search = (ele_id.indexOf('fb_link')==-1)? 'span':'a';

	var obj = document.getElementsByTagName(tag2search); 
	// use document.getElementsByTagName('*'); also works but slower

	for (var i=0; i<obj.length; i++)
		if (obj[i].getAttribute('id')==ele_id)
			obj[i].innerHTML = (is_append)? obj[i].innerHTML+text:text;

}

function poo_link(link_objekt, objekt, fb_id, link_id)
	{


	for (i=0; i<link_id; i++)
		if (fb_id_array[i]==fb_id)
			return;

	var is_MHer;

	/**************************************************/
	// poo_objekt id="poo"+link_id (contains green links)

	// link_objekt id="fb_link"+fb_id (contains badge and name)
	// objekt id="mh"+fb_id (contains point and friend info)
	// id="mh_only"+fb_id (within poo_objekt) 
	/**************************************************/
	
	
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: 'http://apps.facebook.com/mousehunt/hunterprofile.php?snuid='+fb_id,
   	 headers: {
        	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Content-type':'application/x-www-form-urlencoded',
    		},
    	onload: function(responseDetails) {
       		var res = responseDetails.responseText;

		is_MHer = true;		
		if (!is_King)
		{
		//alert("displaying "+fb_name);

		if (res.indexOf("Hunting Since")==-1)
			{
			is_MHer = false;
			setHTML (0, "mh_info"+fb_id, " (<A href=http://apps.facebook.com/mousehunt/invite.php title=Invite><FONT color=red>not MHer</FONT></A>)");
			setHTML (0, "mh_only"+fb_id, "<A href=http://apps.facebook.com/mousehunt/invite.php>invite</A> | ");
			
			setHTML (0, "mh_friend"+fb_id, "");
			}
		else
			{
			var mh_start_date = res.match(/<li><span class=["]label["]>Hunting Since<[/]span>: (.+)<[/]li>/)[1];
			var mh_title = res.match(/<li><span class=["]label["]>Hunter&rsquo;s Title<[/]span>: (.+)<[/]li>/)[1].replace(/ /g,"");
			var mh_pure_title = mh_title.match(/(.+)[(]/)[1].toLowerCase();
			var mh_point = res.match(/<li><span class=["]label["]>Points<[/]span>: (.+)<[/]li>/)[1];
			var mh_gold = res.match(/<li><span class=["]label["]>Gold<[/]span>: (.+)<[/]li>/)[1];

			setHTML (0, "fb_link"+fb_id, "<IMG src=http://mousehunt.hitgrab.com/mousehunt/images/icons/titles/" +
						mh_pure_title+ ".gif alt=" +mh_pure_title+ " border=0> " + link_objekt.innerHTML);
			setHTML (0, "mh_info"+fb_id, " ("+mh_point+" pts)");

			}
			

		}
	///////////////////////////////// friend check
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: 'http://www.facebook.com/addfriend.php?id='+fb_id,
   	 headers: {
        	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Content-type':'application/x-www-form-urlencoded',
    		},
    	onload: function(responseDetails) {
       		var res = responseDetails.responseText;

		//if (res.indexOf("You are already friends with")==-1) only for English localizations
		
		if (res.indexOf('<h2 name="standard_error" id="standard_error">')==-1)
			{
			if (is_MHer)
				{
				setHTML (1, "mh_info"+fb_id, " (<A href=http://www.facebook.com/addfriend.php?id="+fb_id+"><FONT color=red>not friend</FONT></A>)");
				setHTML (0, "mh_friend"+fb_id, ""); //CANNOT SEND SUPPLIES
				}
			else // CANNOT INVITE!!!!!
				{
				setHTML (0, "mh_info"+fb_id, " (<FONT color=red>not MHer</FONT>) (<A href=http://www.facebook.com/addfriend.php?id="+fb_id+"><FONT color=red>not friend</FONT></A>)");
				setHTML (0, "mh_only"+fb_id, "");
				}

			}
		else
			setHTML (1, "mh_info"+fb_id, " (friend)");

		}
	});

	//////////////////////////////

		}
	});

	
	}


function poo_party()
	{


	if (document.location.href.indexOf("facebook.com/mousehunt/supplies.php")!=-1)
		{

		var allDivs;
		allDivs = document.evaluate(
		"//select[@name='trade_recipient']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

		//alert(allDivs.snapshotItem(0).value);
		
		allDivs.snapshotItem(0).value=gup(document.location.href,'trade_recipient');
		return;
		}

	if (document.location.href.indexOf("topic.php?")==-1)
		return;
	
	if (document.location.href == currentLocation)
		return;



	is_King = false; // King's reward check
	currentLocation = document.location.href;

	var newElement=document.createElement('style'); 
	newElement.innerHTML = ".poo {color:brown; display:none} .poo a {color:green}";
	document.body.appendChild(newElement);

	
	
	//************************* REMOVE FACEBOOK AJAX

	var allDivs;
	allDivs = document.evaluate(
	"//ul[@class='pagerpro']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	//*
	for (var i=0; i<allDivs.snapshotLength; i++)
		{

		//for (var j=0; j<allDivs.snapshotItem(i).childNodes.length; j++)
			//allDivs.snapshotItem(i).childNodes[j].addEventListener('click', function() { window.setTimeout(poo_party, 5000);}, true);

		allDivs.snapshotItem(i).innerHTML =
		allDivs.snapshotItem(i).innerHTML.replace(/onclick=.+[']>/g,'>');
		
		
		//var allLinks, thisTextarea;
		//allLinks = allDivs.snapshotItem(i).getElementsByTagName('a');
		//for (var j=0; j<allLinks.length; j++) 
   			//allLinks[j].addEventListener('click', poo_party, true);

		//alert(allDivs.snapshotItem(i).innerHTML);
		
		//for (var j=0; j<allDivs.snapshotItem(i).childNodes.length; j++)
			//allDivs.snapshotItem(i).childNodes[j].addEventListener('click', poo_party, true);
		}	
	
	//*/



	//************************* INSERT NODES

		allDivs = document.evaluate(
		//"//a[@class='author_post']",
		"//span[@class='author_header']",

		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		 

		for (var i=0; i<allDivs.snapshotLength; i++)
			{
			fb_id_array[i] = -99;

			if (allDivs.snapshotItem(i).childNodes.length<2)
				continue;

			var link_objekt = allDivs.snapshotItem(i).childNodes[0];
			var fb_id = gup(link_objekt.href,"id");

			fb_id_array[i] = fb_id;
			
			
			//tmp=allDivs.snapshotItem(i).innerHTML;



	



			var action_pt = ["MouseHunts"];




			allDivs.snapshotItem(i).innerHTML = 
				allDivs.snapshotItem(i).innerHTML.replace(/(^<a)(.+)(<\/a> )(.+)/,"<a id=fb_link"+fb_id+" onmouseover=document.getElementById('poo"+i+"').style.display='inline';$2</a>" +
					" <span id=mh_info" +fb_id+"><I><FONT color=grey>"+action_pt[Math.floor(Math.random()*action_pt.length)]+" you.</FONT></I></span> $4<BR><span class=poo id=poo"+i+"></span>")
				;

			//alert(allDivs.snapshotItem(i).childNodes.length+'\n'+allDivs.snapshotItem(i).innerHTML);
			//alert(tmp+"\n"+allDivs.snapshotItem(i).innerHTML);
			
			//********** BUILD POO LINKS // FORMERLY POO OBJECT

			if (allDivs.snapshotItem(i).childNodes.length<5)
				continue;

			var newStr;

			
			var fb_name = link_objekt.innerHTML;


			newStr = "[ ";

			newStr += "<SPAN id=mh_only"+ fb_id +">";
			newStr += "<A href=http://apps.facebook.com/mousehunt/hunterprofile.php?snuid=";
			newStr += fb_id+">MH profile</A> | ";
			newStr += "<A href=http://apps.facebook.com/mousehunt/traderequest.php?snuid=";
			newStr += fb_id+">trade SB</A> | </SPAN>";

			newStr += "<SPAN id=mh_friend"+ fb_id +">";
			newStr += "<A href=http://apps.facebook.com/mousehunt/supplies.php?trade_recipient=";
			newStr += fb_id+">give supplies</A> | </SPAN>";
		
			newStr += "<A href=http://www.facebook.com/inbox/?compose&id=";
			newStr += fb_id+">message</A> | ";
			newStr += "<A href=\"http://www.facebook.com/s.php?q="+ escape(fb_name) +"&a=4\">block</A>";
			newStr += " ]";

			document.getElementById("poo"+i).innerHTML = newStr;

			//********** YELLOW BG MOUSEOVER

			var grandparent = allDivs.snapshotItem(i).parentNode;

			grandparent.setAttribute('onmouseover', 'style.backgroundColor="#FFFFAA"');
			grandparent.setAttribute('onmouseout', 'style.backgroundColor="white"');
			//grandparent.setAttribute('onmouseout', 'document.getElementById("poo'+link_id+'").style.display="none";');





			}

	//************************* CHECK MH PROFILE

	GM_xmlhttpRequest({
    	method: 'GET',
    	url: 'http://apps.facebook.com/mousehunt/hunterprofile.php',
	//url: 'http://apps.facebook.com/mousehunt/soundthehorn.php',
   	 headers: {
        	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Content-type':'application/x-www-form-urlencoded',
    		},
    	onload: function(responseDetails) {
       		var res = responseDetails.responseText;
		if (res.indexOf("Claim a King&#039;s Reward!</title>")!=-1)
			{
			is_King = true;
			
			}
		/*else
			{
			var journal = document.createElement("poo");

			journal.innerHTML = res;
			journal_div = journal.getElementsByTagName("div");
			//alert(journal_div.length);

			for (var i=0; i<journal_div.length; i++)
				//alert(journal_div[i].getAttribute("class"));
			
				 if (journal_div[i].getAttribute("class")=="journalbody")
					{
					journal_last = journal_div[i].innerHTML;
					break;
					}
			

			var logo = document.createElement("div");
			logo.innerHTML = '<div id=logo_div style="margin: 0 auto 0 auto; ' +
    				'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    				'font-size: small; background-color: #000000; ' +
    				'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    				'Your latest hunt:' + 
				'<blockquote style="background:lightyellow;color:black; margin:10px; border:5px solid white;">' +
				journal_last+
				'<BR>[ <A href=# onclick=document.getElementById("logo_div").style.display="none";>Hide</A> | '+
				'<A href=http://apps.facebook.com/mousehunt/>Read more</A> ]'+
    				'</blockquote></p></div>';
			document.body.insertBefore(logo, document.body.firstChild);
			}*/	



		for (var i=0; i<allDivs.snapshotLength; i++)
			{
			if (allDivs.snapshotItem(i).childNodes.length<5)
				continue;

			var link_objekt = allDivs.snapshotItem(i).childNodes[0];
			var fb_id = gup(link_objekt.href,"id");

			var objekt = allDivs.snapshotItem(i).childNodes[2];

			//********** KINGS REWARD
			if (is_King)
			objekt.innerHTML = "reminds ya to <A href=http://apps.facebook.com/mousehunt><FONT color=red>claim King&#039;s Reward</FONT></A>";


			//********** RUN BATCH CHECKS
				
			poo_link(link_objekt,objekt,fb_id,i);

			}
		
		}


	});


	}

var is_King;

var currentLocation = "";
var fb_id_array = new Array();

document.addEventListener('click', function() { window.setTimeout(poo_party, 5000);}, true);
//window.addEventListener('load', poo_party, true);
/*
var newloc = window.location.href.replace(/.+#[/]topic.php[?]/, "http://www.facebook.com/topic.php?")
if (newloc != window.location.href)
	window.location.href = newloc;
*/

poo_party();





//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
// http://userscripts.org/scripts/show/22372
//===============================================================================

var script_title = "Pooflinger's Mousehunt Facebook Enhancer";
var source_location = "http://userscripts.org/scripts/source/37906.user.js";
var current_version = "0.0.1";
var latest_version = " ";
var gm_updateparam = "pooflinger_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");


CheckForUpdate();

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://docs.google.com/View?docid=dcx7x8x7_0gzz33cgh";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("Check for Pooflinger updates!", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?\n\n(please uninstall the old version before installing the new one.)"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
						alert("You have the latest version of " + script_title + ".");
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author <mousehunt@peterstrategy.com>.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
