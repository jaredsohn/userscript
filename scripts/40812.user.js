// ==UserScript==
// @name Pooflinger's Mousehuntizer BETA
// @namespace		Pooflinger
// @description		Enhance Facebook discussion boards with Mousehunt Experience!
// @include        	http://*.facebook.com/*
// @include        	http://furoma.com/*

// ==/UserScript==
//===============================================================================

// a google document is used to store the latest version number (If the version in that file does not match the your_version variable, an update will be triggered)
// var version_holder = "http://docs.google.com/View?docid=dcx7x8x7_0gzz33cgh"; //normal version
// var CONFIG_URL='http://furoma.com/mousehuntizer' //normal version

var version_holder = "http://docs.google.com/View?docid=0AZRLQUEm_qKAZGNqNm16bXJfNmM1M2YzYmht"; //BETA version
var CONFIG_URL='http://furoma.com/mousehuntizer/beta.html' //beta version

var your_version = '0.2.0';

var usr_chk_fr = GM_getValue('usr_chk_fr', false);
var usr_chk_pt = GM_getValue('usr_chk_pt', false);
var usr_chk_rk = GM_getValue('usr_chk_rk', false);
//var usr_chk_k = GM_getValue('usr_chk_k', true);
var usr_chk_k = true;
var usr_ld_msg = GM_getValue('usr_ld_msg', true);

var usr_chk_ls = GM_getValue('usr_chk_ls', false);
var usr_chk_lp = GM_getValue('usr_chk_lp', false);
var usr_chk_bs = GM_getValue('usr_chk_bs', false);
var usr_chk_cr = GM_getValue('usr_chk_cr', false);
var usr_chk_bl = GM_getValue('usr_chk_bl', false);
var usr_chk_tp = GM_getValue('usr_chk_tp', false);

var usr_chk_tm_mh = GM_getValue('usr_chk_tm_mh', true);
var usr_chk_tm_fb = GM_getValue('usr_chk_tm_fb', false);
var usr_rm_fb = GM_getValue('usr_rm_fb', true);
var usr_mh_mn = GM_getValue('usr_mh_mn', true);

var usr_chk_tm_alarm = GM_getValue('usr_chk_tm_alarm', false);
var usr_chk_tm_alarm_cnfm = GM_getValue('usr_chk_tm_alarm_cnfm', true);
var usr_chk_tm_alarm_file = GM_getValue('usr_chk_tm_alarm_file', 'dingdongmale.wav');

function str2xml(strXML) { 
		//create a DOMParser
		var objDOMParser = new DOMParser();
		//create new document from string
		var objDoc = objDOMParser.parseFromString(strXML, "text/xml");
		return objDoc;
	}

var is_config_page = (document.location.href.indexOf('/mousehuntizer')!=-1 && 
document.location.href.indexOf('rev.html')==-1)

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

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
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

setHTML (0, "mh_info"+fb_id, "");

//CASE 1: CHECK NOTHING*************************************************
if (!usr_chk_pt && !usr_chk_rk && !usr_chk_fr)
	return;

//CASE 2: CHECK FRIENDS ONLY*************************************************
else if (!usr_chk_pt && !usr_chk_rk && usr_chk_fr)
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: 'http://www.facebook.com/addfriend.php?id='+fb_id,
   	 headers: {
        	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Content-type':'application/x-www-form-urlencoded',
    		},
    	onload: function(responseDetails) {
       		var res = responseDetails.responseText;

		if (res.indexOf('<h2 class="main_message" id="standard_error">')==-1)
			{
			
			setHTML (1, "mh_info"+fb_id, " <A href=http://www.facebook.com/addfriend.php?id="+fb_id+"><FONT color=grey>(not friend)</FONT></A>");
			setHTML (0, "mh_friend"+fb_id, ""); //CANNOT SEND SUPPLIES
				
			
			}
		else
			setHTML (1, "mh_info"+fb_id, " <FONT color=darkblue>(friend)</FONT>");

		}
	});


//CASE 3: CHECK POINTS OR RANK *************************************************
else
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
			//var mh_start_date = res.match(/<li><span class=["]label["]>Hunting Since<[/]span>: (.+)<[/]li>/)[1];
			var mh_title = res.match(/<li><span class=["]label["]>Hunter&rsquo;s Title<[/]span>: (.+)<[/]li>/)[1].replace(/ /g,"");
			var mh_pure_title = mh_title.match(/(.+)[(]/)[1].toLowerCase().replace('/','');

			var mh_point = res.match(/<li><span class=["]label["]>Points<[/]span>: (.+)<[/]li>/)[1];
			var mh_gold = res.match(/<li><span class=["]label["]>Gold<[/]span>: (.+)<[/]li>/)[1];

			if (usr_chk_rk)
			setHTML (0, "fb_link"+fb_id, "<IMG src=http://mousehunt.hitgrab.com/mousehunt/images/icons/titles/" +
						mh_pure_title+ ".gif alt=" +mh_pure_title+ " border=0> " + link_objekt.innerHTML);
			if (usr_chk_pt)
			setHTML (0, "mh_info"+fb_id, " ("+mh_point+" pts)");

			}
			

		
	///////////////////////////////// friend check

	if (usr_chk_fr)

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
		
		if (res.indexOf('<h2 class="main_message" id="standard_error">')==-1)
			{
			if (is_MHer)
				{
				setHTML (1, "mh_info"+fb_id, " <A href=http://www.facebook.com/addfriend.php?id="+fb_id+"><FONT color=grey>(not friend)</FONT></A>");
				setHTML (0, "mh_friend"+fb_id, ""); //CANNOT SEND SUPPLIES
				}
			else // CANNOT INVITE!!!!!
				{
				setHTML (0, "mh_info"+fb_id, " (<FONT color=red>not MHer</FONT>) <A href=http://www.facebook.com/addfriend.php?id="+fb_id+"><FONT color=grey>(not friend)</FONT></A>");
				setHTML (0, "mh_only"+fb_id, "");
				}

			}
		else
			setHTML (1, "mh_info"+fb_id, " <FONT color=darkblue>(friend)</FONT>");

		}
	});

	//////////////////////////////

		}
	});

	
	}


function poo_party()
{

	
	
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

	if (allDivs.snapshotLength != 0)
		{
		allDivs = allDivs.snapshotItem(0);


		for (var i=1; i<allDivs.childNodes.length; i++)	
		allDivs.childNodes[i].innerHTML = allDivs.childNodes[i].innerHTML.replace(/onclick=(.+)[']>/g,'>');
		
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


			if (usr_ld_msg)
				load_msg= "<I><FONT color=grey>"+action_pt[Math.floor(Math.random()*action_pt.length)]+" you.</FONT></I>";
			else
				load_msg = "<I><FONT color=grey>loading...</FONT></I>";


			allDivs.snapshotItem(i).innerHTML = 
				allDivs.snapshotItem(i).innerHTML.replace(/(^<a)(.+)(<\/a> )(.+)/,"<a id=fb_link"+fb_id+" onmouseover=document.getElementById('poo"+i+"').style.display='inline';$2</a>" +
					" <span id=mh_info" +fb_id+">"+load_msg+"</span> $4<BR><span class=poo id=poo"+i+"></span>");
			

			//alert(allDivs.snapshotItem(i).childNodes.length+'\n'+allDivs.snapshotItem(i).innerHTML);
			//alert(tmp+"\n"+allDivs.snapshotItem(i).innerHTML);
			
			// ********** BUILD POO LINKS // FORMERLY POO OBJECT

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

if (!usr_chk_k) // && usr_chk_fr)

	{
	for (var i=0; i<allDivs.snapshotLength; i++)
			{
			if (allDivs.snapshotItem(i).childNodes.length<5)
				continue;

			var link_objekt = allDivs.snapshotItem(i).childNodes[0];
			var fb_id = gup(link_objekt.href,"id");

			var objekt = allDivs.snapshotItem(i).childNodes[2];
			poo_link(link_objekt,objekt,fb_id,i);

			}
	}

else
	{
	/*
	GM_xmlhttpRequest({
    	method: 'GET',
		//url: 'http://apps.facebook.com/mousehunt/',
    url: 'http://apps.facebook.com/mousehunt/hunterprofile.php',
	//url: 'http://apps.facebook.com/mousehunt/soundthehorn.php',
   	 headers: {
        	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Content-type':'application/x-www-form-urlencoded',
    		},
    	onload: function(responseDetails) {
       		var res = responseDetails.responseText;
	

		if (usr_chk_tm_fb && MsgObj==null && sMsg==null)
			{
			//res.match(/<li><span class=["]label["]>Hunting Since<[/]span>: (.+)<[/]li>/)[1];
			sMsg = res.match(/<input type=["]hidden["] id=["].+hornWaitValue.+["] value=["](.+)["] fbcontext=["].+["] [/]>/)[1];
			
			if (sMsg <0)
				sMsg=0;
			printMsg();
			}


		if (res.indexOf("Claim a King&#039;s Reward!</title>")!=-1)
			{
			is_King = true;
			
			}
	*/
		
		
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
			else
			poo_link(link_objekt,objekt,fb_id,i);

			}
		
		}


	//});


}


var is_King;

var currentLocation = "";
var fb_id_array = new Array();





//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
// http://userscripts.org/scripts/show/22372
//===============================================================================

var script_title = "Pooflinger's Mousehunt Facebook Enhancer";
var source_location = "http://userscripts.org/scripts/source/37906.user.js";

var latest_version = " ";
var gm_updateparam = "pooflinger_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");





CheckForUpdate();



//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("MH - Check for Pooflinger updates!", CheckVersion);

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

					if(your_version != latest_version && latest_version != "undefined" && !is_config_page)
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?\n\n(please uninstall the old version before installing the new one.)"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(your_version == latest_version && !is_config_page)
						alert("You have the latest version of " + script_title + ".");
					else if(is_config_page)
						{
						if (latest_version == your_version)
							{
							document.getElementById('chk_latest_version').innerHTML = 'OK';
							//document.getElementById('update_link').style.display='none';
							}
						else
							{
							document.getElementById('chk_latest_version').innerHTML = '';
							document.getElementById('update_link').style.display='inline';
							
							if (document.location.href.indexOf('beta')!=-1)
								document.getElementById('update_link').href=
								'http://userscripts.org/scripts/show/58005';
							}
						}
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

/************************************************************************************/


function test_mh(res)
{
	if(res.indexOf("Claim a King&#039;s Reward!</title>")!=-1)
		return "Please claim the King's reward and try again.";

	if(res.indexOf("Build Your First Mouse Trap")!=-1)
		return "Please log in to Facebook and try again.";
		
	if(res.indexOf("Error while loading page from")!=-1)
		return "MouseHunt server is down or in maintenance.";
	
	return '';
}

function to_summarizer()
{
/*
var oMsgBox = document.createElement("textarea");
oMsgBox.style.width = '500px';
oMsgBox.style.height = '500px';
document.body.appendChild(oMsgBox);*/



if (document.getElementById('shit')==null)
	{
	alert('Error: could not find a pooflinging box in the log summarizer!');
	return;
	}
document.getElementById('shit').value="importing data from facebook...";
var journal_entry = new Array();
var journal_cnt=0;


var fail=false;
var max_journal_cnt=10;
var journal_run=0;


for (var i=0;i<10;i++)
GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://apps.facebook.com/mousehunt/index.php?p='+i,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
			if(fail)
				return;
		
			if (responseDetails.status != 200)
				{
				alert('Error incurred. Please log in to MouseHunt and/or check Kings reward.');
				fail = true;
				return false;
				}
			
			var res = responseDetails.responseText.replace(/\n/g,'ZZZ');

	fail=test_mh(res);
	
	if(fail!='')
		{
		document.getElementById('shit').value=fail;
		fail=true;
		return false;
		}
	else
		fail=false;
	
	if(i==0 && res.indexOf('journalbody')==-1)
		{
		fail = true;	
		document.getElementById('shit').value="There are unknown problems downloading your data. Please try reloading the page.";
		return;
		}


	journal_run++;

	if (res.indexOf('journalbody')==-1)
		{
		journal_entry[i]='';
		}
	else
		{
		var k = res.match(/<li>\[ Page (.+) of (.+) \]<\/li>/)[1];
		max_journal_cnt= res.match(/<li>\[ Page (.+) of (.+) \]<\/li>/)[2];

		//alert(max_journal_cnt);

		res=res.match(/<div class="journalbody">(.+)<div class="journalbottom">/)[1];
		res=res.replace(/ZZZ/g,'\n').replace(/</g,'\n<').replace(/>/g,'>\n').replace(/\t/g,'');
	
		res=res.replace(/<div class="journaldate">/g,'ZZZ').replace(/<\/div>/g,' <\/div>');
		res=res.replace(/<.+>/g,'').replace(/\n/g,'');
		res=res.replace(/ZZZ/g,'\n');

		document.getElementById('shit').value="importing data from facebook...\n"+ Math.floor((++journal_cnt)*100/max_journal_cnt) +' % complete';
		journal_entry [k-1]=res;
		}

	if (journal_run==10)
		{
		document.getElementById('shit').value='';

		if (document.location.href.indexOf('furoma.com/mousehunt_log_summarizer')!=-1)
			for(var j=0;j<max_journal_cnt;j++)
				document.getElementById('shit').value+='***from page '+(j+1)+'**'+journal_entry [j]+'\n\n';
		else
			for(var j=0;j<max_journal_cnt;j++)
				document.getElementById('shit').value+=journal_entry [j]+'\n\n';
		
		}

			}
});


	

}


function show_rev()
{

	if (Math.random()>0.0999)
		return;
		
	//UIStandardFrame_Container
	//"//div[@class='adcolumn']",
	//"//div[@id='sidebar_ads']",

	var rev=document.createElement("span");
	var allDivs = xpathFirst("//div[@class='UIStandardFrame_Container clearfix']");
	/*if (allDivs==null)
		{
		allDivs = xpathFirst("//div[@class='right_column_container clearfix']");
		rev.innerHTML=
		'<span style=float:right;width:180px;height:0px;><span style="float:left;padding:5px 0px 0px 35px;"><iframe src=http://furoma.com/mousehuntizer/mousehuntizer_rev.html style="border: 0px none #ffffff;" width="140" height="620" scrolling="no" frameborder="0"></iframe></span></span>';
		//{float:right;width:180px} width:180px;font-size:11px;padding:47px 0 0 17px;text-align:left"
		}
	else */if (!allDivs)
		return;
		
	rev.innerHTML=
	'<span style=position:relative;top:55px;left:35px;><iframe src=http://furoma.com/mousehuntizer/mousehuntizer_rev.html style="border: 0px none #ffffff;" width="140" height="620" scrolling="no" frameborder="0"></iframe></span>';

	//allDivs.appendChild(rev);
	allDivs.insertBefore(rev, allDivs.childNodes[0]);
	
}

function Remove_All_Facebook_Ads() // Credit: http://userscripts.org/scripts/review/13787
{
	/*
	var sidebar_ads = document.getElementById('sidebar_ads');
	if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook sidebar ads.");
		sidebar_ads.style.visibility = 'hidden';
	} */
	
	if (document.getElementById('sidebar_ads'))
		{
		document.getElementById('sidebar_ads').style.visibility='hidden';
		document.getElementById('sidebar_ads').style.height='0px';
		}
  	var elements = document.evaluate(
		// "//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad_advert')] | //div[contains(@class, 'social_ad')] | //div[contains(@class, 'sponsor')] | //div[contains(@id, 'sponsor')]  | //div[contains(@class, 'banner_ad')]",
		"//div[contains(@class, 'social_ad_advert')] | //div[contains(@class, 'banner_ad')] |  //div[contains(@class, 'social_ad_image')] | //div[contains(@id, 'adcolumn_advertise')] | //a[contains(@class, 'more_ads')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
		//GM_log("Removing Facebook ad element with class='" + thisElement.className + "' and id='" + thisElement.id + "'.");
    	thisElement.parentNode.removeChild(thisElement);
	}
	//alert('dd');
}

function to_best_setup()
{
	//alert($('input_area').innerHTML);
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://apps.facebook.com/mousehunt/inventory.php',
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var res=responseDetails.responseText;
				var k=test_mh(res);
				if (k!='')
					{
					alert(k);
					return false;
					}

				
				// Lucky Shield
				if(res.indexOf('header_logo_donator.gif')!=-1)
					{
					if ($('shield_1'))	//best setup
						$('shield_1').checked=true;
					else if ($('shield')) //best location
						$('shield').selectedIndex=1;
					}
				else
					{
					if ($('shield_2'))
						$('shield_2').checked=true;
					}
					
				// Hunter's Title
				k = res.match(/Title:<\/span>&nbsp;&nbsp;(.+) \(/)[1].toLowerCase();
				var titleObj = ($('title'))? $('title'):$('huntertitle'); 
					//title for best setup; huntertitle for best location
				for (var i=0; i<titleObj.options.length; i++)
					{
					if(titleObj.options[i].text.toLowerCase().indexOf(k)!=-1)
						{
						titleObj.selectedIndex=i;
						break;
						}
					}
				//alert(k+'///'+$('title').options[6].value);
				
				if (document.location.href.indexOf('best_setup')!=-1)
					{
					k = res.match(/<div class=\"itemname\">(.+)&nbsp;&nbsp;/g);
					var q = document.getElementsByTagName('label');
						// <input onclick="your_trap=18; genOutput();" 
						// name="form_trap" id="form_trap18" type="checkbox">Mouse Deathbot<br> 
					var cid, cname, qj;
					
					for (var i=0; i<k.length; i++)
						{
						k[i] = k[i].replace(/<div class=\"itemname\">/,'').replace(/&nbsp;&nbsp;/,'').toLowerCase();
						for (var j=0; j<q.length; j++)
							{
							qj=q[j].innerHTML.toLowerCase();
							if (qj.indexOf('type="checkbox"')==-1)
								continue;
							cname = qj.match(/>(.+)<br>/)[1];
							if (cname!=k[i])
								continue;
							cid = qj.match(/id=\"(.+)\" type=/)[1];
							$(cid).checked=true;
							}
						}
					}
				else
					{
					k = res.match(/<div class=\"itemname\">(.+)&nbsp;&nbsp;/g);
					var q = document.getElementsByTagName('label');
						// <input onclick="your_trap=18; genOutput();" 
						// name="form_trap" id="form_trap18" type="checkbox">Mouse Deathbot<br> 
					var cid, cname;
					
					for (var i=0; i<k.length; i++)
						{
						k[i] = k[i].replace(/<div class=\"itemname\">/,'').replace(/&nbsp;&nbsp;/,'').toLowerCase();
						for (var j=0; j<q.length; j++)
							{							
							if (q[j].id.indexOf('_label')==-1)
								continue;
							cname = q[j].innerHTML.toLowerCase();
							if (cname!=k[i])
								continue;
							cid = q[j].getAttribute('for'); //q[j].id.replace('_label','');
							$(cid).checked=true;//*/
							}
						}
					//alert(k);
					//alert(q[20].id);  location_label20
					//alert(q.length); //96
					}

			}
		}); //*/
}

function to_catch_rates()
{
	
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://apps.facebook.com/mousehunt/inventory.php',
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var res=responseDetails.responseText;
				var k=test_mh(res);
				if (k!='')
					{
					alert(k);
					return false;
					}
				var cid, cname, qj;
				var q = document.getElementsByTagName('select');

				// golden shield
				for (var i=0; i<q.length; i++)
					if (q[i].id.indexOf('shield')==0)
						q[i].selectedIndex= (res.indexOf('header_logo_donator.gif')!=-1)? 1:2;
				
				k = res.match(/<span class=\"hudstatlabel\">(.+):<\/span>&nbsp;&nbsp;(.+)<\/li>/g);
				for (var i=0; i<k.length; i++)
					{
					k[i] = k[i].match(/<span class=\"hudstatlabel\">(.+):<\/span>&nbsp;&nbsp;(.+)<\/li>/)[2].toLowerCase();
					k[i] = k[i].replace(/ \((.+)\)/,'');
					for (var j=0; j<q.length; j++)
						{
						for (var l=0; l<q[j].options.length; l++)
							if (k.indexOf(q[j].options[l].value.toLowerCase())!=-1)
								{
								q[j].selectedIndex=l;
								break;
								}
						}
					}
				//alert(k); //lagoon,hero (41%),polar base,digby drillbot,4,352,45,624,7,761,450,gnarled (2)
				//alert(q[0].options[10].value); //Digby Drillbot

			}
		}); //*/
}

function to_travel_planner()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://apps.facebook.com/mousehunt/inventory.php?'+Math.random(),
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var res=responseDetails.responseText;
				var k=test_mh(res);
				if (k!='')
					{
					alert(k);
					return false;
					}
				var cid, cname, titlefound=false;
				var q = document.getElementsByTagName('label');

				// TITLE 
				k = res.match(/Title:<\/span>&nbsp;&nbsp;(.+) \(/)[1].toLowerCase();
				for (var i=0; i<q.length; i++)
					if (q[i].getAttribute('for').indexOf('form_rank')==0)
						{
						cid=q[i].getAttribute('for');
						if (q[i].innerHTML.toLowerCase().indexOf(k)!=-1)
							{
							titlefound=true;
							//$(cid).checked=true;
							$(cid).click();
							//alert(q[i].getAttribute('for'));
							break;
							}
						}//*/
				if (!titlefound) //higher than hero
					//$(cid).checked=true;
					$(cid).click();
				
				// WHERE_FROM LOCATION
				k = res.match(/Location:<\/span>&nbsp;&nbsp;(.+)<\/li>/)[1].toLowerCase();
				for (var i=0; i<q.length; i++)
					if (q[i].getAttribute('for').indexOf('form_source')==0)
						{
						cid=q[i].getAttribute('for');
						if (q[i].innerHTML.toLowerCase().indexOf(k)!=-1)
							{
							//$(cid).checked=true;
							$(cid).click();
							//alert(q[i].getAttribute('for'));
							break;
							}
						}//*/

				
				
				// MAP
				var r=document.getElementsByTagName('input');
				for (var i=0; i<r.length; i++)
					if (r[i].id.indexOf('form_map')==0)
						{
						//r[i].checked=false;
						r[i].click();
						}
						
				k = res.match(/<div class=\"itemname\">(.+)&nbsp;&nbsp;/g);
				for (var i=0; i<k.length; i++)
					{
					k[i] = k[i].replace(/<div class=\"itemname\">/,'').replace(/&nbsp;&nbsp;/,'').toLowerCase();
					
					if (k[i].indexOf('bazaar')!=-1)
						k[i]='bazaar ticket';
					else if (k[i].indexOf('whisker woods')!=-1)
						k[i]='whisker woods map';
					else if (k[i].indexOf('ship')==0)
						k[i]='ship (rodentia)';
					
					for (var j=0; j<q.length; j++)
						{
						cid=q[j].getAttribute('for');
						if (cid.indexOf('form_map')!=0)
							continue;
						if (k[i].indexOf(q[j].innerHTML.toLowerCase())!=-1)
							{
							//$(cid).checked=true;
							$(cid).click();
							//alert(q[j].innerHTML.toLowerCase());
							}
						}
					}//*/
				
					
				//alert(q[7].innerHTML); //15=Enable Acolyte Realm Travel
				//alert(k[15]);
				//super brie,brie,swiss,marble,cheddar,nvmrc forcefield trap,polar base,stone base,
				//wooden base with target,wooden base,radioactive blue cheese curd potion,
				//greater radioactive blue cheese curd potion,brie alchemy potion,stale cheese,
				//gnawnia map piece,burroughs laboratory map piece,key to the town of digby,tattered mousoleum map
				
				//alert(k); 
				/*Super Brie,Moon,Radioactive Blue,Glutter,Susheese,Gouda,Brie,Swiss,White Cheddar,
				Cheddar,Digby DrillBot,Ambush,DeathBot (Chrome Edition),Snow Barrage,Ambrosial 
				Portal,Sinister Portal,Explosive Base,Dehydration Base,Polar Base,Birthday Cake Base,
				Stone Base,Wooden Base with Target,Radioactive Blue Cheese Curd Potion,
				Greater Brie Alchemy Potion,Greater Radioactive Blue Cheese Curd Potion,Brie Alchemy Potion,
				Gnarled Cheese Curd Potion,Ambush Trap Blueprints,Burroughs Salmon,Cheesy Fluffs,
				Coal,Curds and Whey,Invisi-glu,Ionized Salt,Master Claw Shard,Nori,Onyx Stone,Paint-brand Paint,
				Salt,Scrap Metal,Splintered Wood,Stale Cheese,Token of the Cheese Belt,Token of the Cheese Claw,
				Token of the Cheese Fang,Gnawnia Map Piece,Burroughs Laboratory Map Piece,
				Key to the Town of Digby,Tattered Mousoleum Map,Shredded Furoma Map Piece,Furoma Map Stitch,
				Ticket to the Burroughs Bazaar,Gnarled Tree Map Piece,Whisker Woods Clearing Map Piece,
				Map of the Lagoon*/

			}
		}); //*/
}

var MHizerSec=5;
var go_url;
function MHizer_travel_GO ()
{

	if(MHizerSec==-1)
		return;
	if(MHizerSec==0)
		{
		document.location.href=go_url;
		return;
		}
	
	$('MHizerSec').innerHTML = MHizerSec--;
	setTimeout(MHizer_travel_GO, 1000);
}
	
if (document.location.href.indexOf("facebook.com")!=-1)
	{
	if (usr_rm_fb)
		{
		if (document.getElementById('sidebar_ads'))
			{
			//document.getElementById('sidebar_ads').style.display='none';
			document.getElementById('sidebar_ads').style.visibility='hidden';
			document.getElementById('sidebar_ads').style.height='0px';
			}
		/*if ($('profile_sidebar_ads'))
			{
			$('profile_sidebar_ads').style.visibility='hidden';
			$('profile_sidebar_ads').style.height='0px';
			}*/
		document.addEventListener("DOMNodeInserted", Remove_All_Facebook_Ads, true);
		}
	show_rev();
	}

if (document.location.href.indexOf("topic.php?")!=-1 || document.location.href.indexOf("board.php?")!=-1 )
	{
	document.addEventListener('click', function() { window.setTimeout(poo_party, 5000);}, true);

	poo_party();
	}
else if (document.location.href.indexOf("facebook.com/mousehunt")!=-1)
	{
	//xxx.insertBefore(obj, xxx.childNodes[0]);
	
	if (usr_mh_mn)
		{
		var mmenubar = xpathFirst("//div[@id='app10337532241_mainnav']");
		//var menubar = xpathFirst("//ul[@id='app10337532241_nav.inventory']");
		var menubar = mmenubar.childNodes[1].childNodes[1];//.parentNode.childNodes[0];
		menubar.addEventListener("mouseover", function() {
		//fbjs_dom.eventHandler.call([fbjs_dom.get_instance(this,10337532241),function(a10337532241_event) {a10337532241_javascript:a10337532241_toggleNavCategory('nav.travel', 'visible');},10337532241],new fbjs_event(event));
		$('app10337532241_nav.travel').style.visibility='visible';
		},
		false);
		menubar.addEventListener("mouseout", function() {
		//fbjs_dom.eventHandler.call([fbjs_dom.get_instance(this,10337532241),function(a10337532241_event) {a10337532241_javascript:a10337532241_toggleNavCategory('nav.travel', 'visible');},10337532241],new fbjs_event(event));
		$('app10337532241_nav.travel').style.visibility='hidden';
		},
		false);
		var obj = document.createElement('span');
		obj.innerHTML = '<ul id="app10337532241_nav.travel" style="left: 140px; width: 120px;" >'+
		'<li><a href="http://apps.facebook.com/mousehunt/travel.php">Travel Now</a></li>'+
		'<li><a href="http://furoma.com/mousehunt_travel_planner.html">PF Travel Planner</a></li>'+
		'<li><a href="http://furoma.com/best_location.html">PF Best Location</a></li>'+
		'<li><a href="http://furoma.com/forbidden_grove_timer.html">PF FG Timer</a></li>'+
		'<li><a href="http://furoma.com/game_zone.html">PF Game Zone</a></li>'+
		'</ul>';
		menubar.appendChild(obj);
		
		
		
		menubar = xpathFirst("//ul[@id='app10337532241_nav.inventory']");
		menubar.style.width='100px';
		obj = document.createElement('li');
		obj.innerHTML = 
		'<a href="http://furoma.com/catch_rates_estimates.html">PF Catch Rates</a>';
		menubar.appendChild(obj);
		obj = document.createElement('li');
		obj.innerHTML = 
		'<a href="http://furoma.com/best_setup.html">PF Best Setup</a>';
		menubar.appendChild(obj);

		

		menubar = xpathFirst("//ul[@id='app10337532241_nav.friends']");
		obj = document.createElement('li');
		obj.innerHTML = 
		'<a href="http://furoma.com/mousehunt_tariff_calculator.html">PF Tariff Calculator</a>';
		menubar.appendChild(obj);
		
		menubar = xpathFirst("//ul[@id='app10337532241_nav.lore']");
		obj = document.createElement('li');
		obj.innerHTML = 
		'<a href="http://furoma.com/mhwiki/">PF MH Uncyclopedia</a>';
		menubar.appendChild(obj);
		

		menubar = mmenubar.childNodes[1].childNodes[13];
		menubar.addEventListener("mouseover", function() {
		$('app10337532241_nav.news').style.visibility='visible';
		},
		false);
		menubar.addEventListener("mouseout", function() {
		$('app10337532241_nav.news').style.visibility='hidden';
		},
		false);
		var obj = document.createElement('span');
		obj.innerHTML = '<ul id="app10337532241_nav.news" style="left: 606px; width: 100px;" >'+
		'<li><a href="http://apps.facebook.com/mousehunt/news.php">Official News</a></li>'+	
		'<li><a href="http://www.facebook.com/pooflinger">PF Facebook Page</a></li>'+
		'<li><a href="http://furoma.com/guide">PF Sean\'s Guide</a></li>'+
		'<li><a href="http://furoma.com/analytics">PF MH Analytics</a></li>'+
		'<li><a href="http://furoma.com/mhsearch/">PF MH Search</a></li>'+
		'</ul>';
		menubar.appendChild(obj);
		
		menubar = xpathFirst("//div[@class='journalcontent']");
		if (menubar)
			{
			var obj = document.createElement('span');
			obj.innerHTML='<SPAN style=position:relative;left:80px>Analyze it! <A href=http://furoma.com/mousehunt_log_summarizer.php>PF Log Summarizer</A> | <A href=http://furoma.com/log_parser.html>PF Log Parser</A></SPAN>';
			menubar.insertBefore(obj, menubar.childNodes[0]);
			}
		}


	
	if (document.location.href.indexOf("facebook.com/mousehunt/supplies.php")!=-1)
		{
		var allDivs = xpathFirst("//select[@name='trade_recipient']");
		allDivs.value=gup(document.location.href,'trade_recipient');
		}
		
	else if (document.location.href.indexOf("facebook.com/mousehunt/travel.php")!=-1)
		{
		var route = gup(document.location.href,'route');
		if (route==null || route=='')
			return;
		
		route = route.split(',');
		var hash = unsafeWindow.a10337532241_submithash;
		//alert(hash);
		var stop = (route[0].indexOf('MHizer')==0)? 1:0;
		var new_route = new Array();
		
		for (var i=stop+1; i<route.length;i++)
			new_route[i-stop-1]=route[i].replace(',','').replace(/%20/g,' ');
		stop = route[stop].replace(/%20/g,' ');
		
		var objw = document.createElement('div');
		objw.style.position='absolute';
		objw.style.left='100px';
		objw.style.top='100px';
		objw.style.width='600px';
		objw.style.height='200px';
		objw.style.background='lightblue';
		objw.style.zIndex='9999';
		objw.style.verticalAlign='center';
		objw.style.textAlign='center';

		var atag = document.getElementsByTagName('a');
		var afound = false;
		
		for (var i=0; i<atag.length;i++)
			if (atag[i].innerHTML==stop)
				{
				afound=true;
				go_url = atag[i].href + '&hash=' +hash+ '&route='+new_route;
				break;
				}
		
		objw.innerHTML='<span style=color:brown><span style=font-size:20pt;><BR>Traveling to '+stop+' in <SPAN id=MHizerSec>5</SPAN> seconds.<BR></SPAN>'
		+'<span style=font-size:14pt>And then: '+ ((new_route.length==0)? 'done!':new_route)
		+'<br><br>'
		+'<A href="'+go_url+'" style=font-size:12pt;font-weight:bold;>Click here to travel NOW</A> | '
		+'<A href=# id=MHizerStop style=font-size:12pt;font-weight:bold;>Click here to STOP</A><span>';
		document.body.insertBefore(objw,document.body.childNodes[0]);
		
		$('MHizerStop').addEventListener("click", function () {objw.style.display='none';MHizerSec=-1;}, true );
		
		MHizer_travel_GO();
		
		/*
		http://apps.facebook.com/mousehunt/travel.php?route=MHizer-Town%20of%20Gnawnia,Town%20of%20Digby,Meadow,Mountain,Meadow,Town%20of%20Gnawnia,Meadow,Town%20of%20Gnawnia
		*/
		//alert(new_route);
		}
		
	}
else if (document.location.href.indexOf('furoma.com/mousehunt_log_summarizer')!=-1)
	{
	var newbutt=xpathFirst("//input[@value='Reset']");
	var obj = document.createElement('span');
	obj.innerHTML='<input style=background:brown type=button class=button value="Post log entries from MH" id="MHizerButt" />';
	newbutt.parentNode.insertBefore(obj, newbutt.parentNode.childNodes[10]);
	
	$('MHizerButt').addEventListener("click", function () {to_summarizer();}, true );

	
	if (usr_chk_ls)
		to_summarizer();
	}
else if (document.location.href.indexOf('furoma.com/log_parser')!=-1)
	{
	var newbutt=xpathFirst("//input[@value='Reset']");
	var obj = document.createElement('span');
	obj.innerHTML='<input style=background:brown type=button class=button value="Post log entries from MH" id="MHizerButt" /><BR />';
	newbutt.parentNode.insertBefore(obj, newbutt.parentNode.childNodes[6]);
	
	$('MHizerButt').addEventListener("click", function () {to_summarizer();}, true );
	if (usr_chk_lp)
		to_summarizer();
	}
else if (document.location.href.indexOf('furoma.com/best_setup')!=-1)
	{
	var newbutt=xpathFirst("//a[@href='javascript:addAllTraps()']");
	var obj = document.createElement('span');
	obj.innerHTML=' <a id=MHizerButt href=# class="a-button" style="background:brown">Post inventory from MH</a>';
	newbutt.parentNode.insertBefore(obj, newbutt.parentNode.childNodes[1]);
	$('MHizerButt').addEventListener("click", function () {to_best_setup();}, true );
	if (usr_chk_bs)
		to_best_setup();
	}
else if (document.location.href.indexOf('furoma.com/best_location')!=-1)
	{
	var newbutt=$('input_body');
	var obj = document.createElement('span');
	obj.innerHTML=' <a id=MHizerButt href=# class="a-button" style="background:brown">Post inventory from MH</a>';
	newbutt.parentNode.insertBefore(obj, newbutt.parentNode.childNodes[0]);
	$('MHizerButt').addEventListener("click", function () {to_best_setup();}, true );
	if (usr_chk_bs)
		to_best_setup();
	}
else if (document.location.href.indexOf('furoma.com/catch_rates')!=-1)
	{
	var newbutt=xpathFirst("//button[@onclick='switch_display()']");
	var obj = document.createElement('span');
	obj.innerHTML=' <button id=MHizerButt style="background:brown;border:black 1pt grove;color:white;">Post settings from MH</button> ';
	newbutt.parentNode.insertBefore(obj, newbutt);
	$('MHizerButt').addEventListener("click", function () {to_catch_rates();}, true );
	if (usr_chk_cr)
		to_catch_rates();
	}

else if (document.location.href.indexOf('furoma.com/mousehunt_travel_planner')!=-1)
	{
	var newbutt=xpathFirst("//th[@colspan='2']");
	var obj = document.createElement('span');
	obj.innerHTML=' <button id=MHizerButt style="background:brown;border:black 1pt grove;color:white;">Prefill form with MHizer</button> ';
	newbutt.appendChild(obj, newbutt);
	$('MHizerButt').addEventListener("click", function () {to_travel_planner();}, true );
	
	newbutt=xpathFirst("//input[@onclick='swaploc();calculate();']");
	obj = document.createElement('span');
	obj.innerHTML=' <button id=MHizerButt2 style="background:brown;border:black 1pt grove;color:white;">MHizer Chauffeur</button> (one-click traveling)';
	newbutt.parentNode.appendChild(obj, newbutt);
	$('MHizerButt2').addEventListener("click", function () {
		var route = document.getElementsByTagName('blockquote');
		if (route.length==0)
			{
			alert('Something went wrong. Iternary not calculated yet.')
			return;
			}
		route=route[0].innerHTML.replace(/ -&gt; /g,',');
		document.location.href='http://apps.facebook.com/mousehunt/travel.php?route=MHizer-'+route;
	}, true );
	
	if (usr_chk_tp)
		to_travel_planner();
	}
else if (is_config_page)
	{

	document.getElementById('chk_install').innerHTML = 'OK';
	document.getElementById('chk_version').innerHTML = your_version;
	document.getElementById('chk_latest_version').innerHTML = '(checking)';
	document.getElementById('update_link').style.display='none';
	document.getElementById('outputtext').style.display='';

	if (latest_version == " ")
		CheckVersion();


	//document.getElementById('usr_chk_k_yes').checked=usr_chk_k;
	//document.getElementById('usr_chk_k_no').checked=!usr_chk_k;
	document.getElementById('usr_chk_fr_yes').checked=usr_chk_fr;
	document.getElementById('usr_chk_fr_no').checked=!usr_chk_fr;
	document.getElementById('usr_chk_pt_yes').checked=usr_chk_pt;
	document.getElementById('usr_chk_pt_no').checked=!usr_chk_pt;
	document.getElementById('usr_chk_rk_yes').checked=usr_chk_rk;
	document.getElementById('usr_chk_rk_no').checked=!usr_chk_rk;
	document.getElementById('usr_chk_ls_yes').checked=usr_chk_ls;
	document.getElementById('usr_chk_ls_no').checked=!usr_chk_ls;
	document.getElementById('usr_chk_lp_yes').checked=usr_chk_lp;
	document.getElementById('usr_chk_lp_no').checked=!usr_chk_lp;
	document.getElementById('usr_chk_cr_yes').checked=usr_chk_cr;
	document.getElementById('usr_chk_cr_no').checked=!usr_chk_cr;
	document.getElementById('usr_chk_bl_yes').checked=usr_chk_bl;
	document.getElementById('usr_chk_bl_no').checked=!usr_chk_bl;
	document.getElementById('usr_chk_bs_yes').checked=usr_chk_bs;
	document.getElementById('usr_chk_bs_no').checked=!usr_chk_bs;
	document.getElementById('usr_chk_tp_yes').checked=usr_chk_tp;
	document.getElementById('usr_chk_tp_no').checked=!usr_chk_tp;
	
	
	document.getElementById('usr_chk_tm_mh_yes').checked=usr_chk_tm_mh;
	document.getElementById('usr_chk_tm_mh_no').checked=!usr_chk_tm_mh;
	document.getElementById('usr_chk_tm_fb_yes').checked=usr_chk_tm_fb;
	document.getElementById('usr_chk_tm_fb_no').checked=!usr_chk_tm_fb;
	document.getElementById('usr_ld_msg_yes').checked=usr_ld_msg;
	document.getElementById('usr_ld_msg_no').checked=!usr_ld_msg;
	document.getElementById('usr_rm_fb_yes').checked=usr_rm_fb;
	document.getElementById('usr_rm_fb_no').checked=!usr_rm_fb;	
	document.getElementById('usr_mh_mn_yes').checked=usr_mh_mn;
	document.getElementById('usr_mh_mn_no').checked=!usr_mh_mn;
	
	document.getElementById('usr_chk_tm_alarm_yes').checked=usr_chk_tm_alarm;
	document.getElementById('usr_chk_tm_alarm_no').checked=!usr_chk_tm_alarm;
	document.getElementById('usr_chk_tm_alarm_cnfm_yes').checked=usr_chk_tm_alarm_cnfm;
	document.getElementById('usr_chk_tm_alarm_cnfm_no').checked=!usr_chk_tm_alarm_cnfm;
	
	for (var i=0; i<document.getElementById("usr_chk_tm_alarm_file").options.length; i++)
		if (document.getElementById("usr_chk_tm_alarm_file").options[i].value==usr_chk_tm_alarm_file)
			{
			document.getElementById("usr_chk_tm_alarm_file").selectedIndex=i;
			break;
			}

	
	//document.getElementById('usr_chk_k_yes').addEventListener('click', function () {usr_chk_k=true;chk_valid();}, true);
	//document.getElementById('usr_chk_k_no').addEventListener('click', function () {usr_chk_k=false;chk_valid();}, true);
	document.getElementById('usr_chk_fr_yes').addEventListener('click', function () {usr_chk_fr=true;chk_valid();}, true);
	document.getElementById('usr_chk_fr_no').addEventListener('click', function () {usr_chk_fr=false;chk_valid();}, true);
	document.getElementById('usr_chk_pt_yes').addEventListener('click', function () {usr_chk_pt=true;chk_valid();}, true);
	document.getElementById('usr_chk_pt_no').addEventListener('click', function () {usr_chk_pt=false;chk_valid();}, true);
	document.getElementById('usr_chk_rk_yes').addEventListener('click', function () {usr_chk_rk=true;chk_valid();}, true);
	document.getElementById('usr_chk_rk_no').addEventListener('click', function () {usr_chk_rk=false;chk_valid();}, true);
	document.getElementById('usr_chk_ls_yes').addEventListener('click', function () {usr_chk_ls=true;chk_valid();}, true);
	document.getElementById('usr_chk_ls_no').addEventListener('click', function () {usr_chk_ls=false;chk_valid();}, true);
	document.getElementById('usr_chk_lp_yes').addEventListener('click', function () {usr_chk_lp=true;chk_valid();}, true);
	document.getElementById('usr_chk_lp_no').addEventListener('click', function () {usr_chk_lp=false;chk_valid();}, true);
	document.getElementById('usr_chk_cr_yes').addEventListener('click', function () {usr_chk_cr=true;chk_valid();}, true);
	document.getElementById('usr_chk_cr_no').addEventListener('click', function () {usr_chk_cr=false;chk_valid();}, true);
	document.getElementById('usr_chk_bs_yes').addEventListener('click', function () {usr_chk_bs=true;chk_valid();}, true);
	document.getElementById('usr_chk_bs_no').addEventListener('click', function () {usr_chk_bs=false;chk_valid();}, true);
	document.getElementById('usr_chk_bl_yes').addEventListener('click', function () {usr_chk_bl=true;chk_valid();}, true);
	document.getElementById('usr_chk_bl_no').addEventListener('click', function () {usr_chk_bl=false;chk_valid();}, true);
	document.getElementById('usr_chk_tp_yes').addEventListener('click', function () {usr_chk_tp=true;chk_valid();}, true);
	document.getElementById('usr_chk_tp_no').addEventListener('click', function () {usr_chk_tp=false;chk_valid();}, true);
	
	
	document.getElementById('usr_chk_tm_mh_yes').addEventListener('click', function () {usr_chk_tm_mh=true;chk_valid();}, true);
	document.getElementById('usr_chk_tm_mh_no').addEventListener('click', function () {usr_chk_tm_mh=false;chk_valid();}, true);
	document.getElementById('usr_chk_tm_fb_yes').addEventListener('click', function () {usr_chk_tm_fb=true;chk_valid();}, true);
	document.getElementById('usr_chk_tm_fb_no').addEventListener('click', function () {usr_chk_tm_fb=false;chk_valid();}, true);
	document.getElementById('usr_ld_msg_yes').addEventListener('click', function () {usr_ld_msg=true;chk_valid();}, true);
	document.getElementById('usr_ld_msg_no').addEventListener('click', function () {usr_ld_msg=false;chk_valid();}, true);

	document.getElementById('usr_rm_fb_yes').addEventListener('click', function () {usr_rm_fb=true;chk_valid();}, true);
	document.getElementById('usr_rm_fb_no').addEventListener('click', function () {usr_rm_fb=false;chk_valid();}, true);
	document.getElementById('usr_mh_mn_yes').addEventListener('click', function () {usr_mh_mn=true;chk_valid();}, true);
	document.getElementById('usr_mh_mn_no').addEventListener('click', function () {usr_mh_mn=false;chk_valid();}, true);
	
	document.getElementById('usr_chk_tm_alarm_yes').addEventListener('click', function () {usr_chk_tm_alarm=true;chk_valid();}, true);
	document.getElementById('usr_chk_tm_alarm_no').addEventListener('click', function () {usr_chk_tm_alarm=false;chk_valid();}, true);
	document.getElementById('usr_chk_tm_alarm_cnfm_yes').addEventListener('click', function () {usr_chk_tm_alarm_cnfm=true;chk_valid();}, true);
	document.getElementById('usr_chk_tm_alarm_cnfm_no').addEventListener('click', function () {usr_chk_tm_alarm_cnfm=false;chk_valid();}, true);

	document.getElementById('usr_chk_tm_alarm_file').addEventListener('change', function () {usr_chk_tm_alarm_file=document.getElementById('usr_chk_tm_alarm_file').value;soundAlarm();chk_valid();}, true);
	

	document.getElementById('reset_on').addEventListener('click', function () {usr_chk_fr=usr_chk_pt=usr_chk_rk=usr_chk_ls=usr_chk_lp=usr_chk_cr=usr_chk_bs=usr_chk_bl=usr_chk_tp=usr_ld_msg=usr_chk_tm_mh=usr_chk_tm_fb=usr_rm_fb=usr_mh_mn=usr_chk_tm_alarm=usr_chk_tm_alarm_cnfm=true;chk_valid();chk_reset();}, true);
	document.getElementById('reset_off').addEventListener('click', function () {usr_chk_fr=usr_chk_pt=usr_chk_rk=usr_chk_ls=usr_chk_lp=usr_chk_cr=usr_chk_bs=usr_chk_bl=usr_chk_tp=usr_ld_msg=usr_chk_tm_mh=usr_chk_tm_fb=usr_rm_fb=usr_mh_mn=usr_chk_tm_alarm=usr_chk_tm_alarm_cnfm=false;chk_valid();chk_reset();}, true);
	document.getElementById('reset_perf').addEventListener('click', function () {usr_chk_fr=usr_chk_pt=usr_chk_rk=usr_chk_ls=usr_chk_lp=usr_chk_cr=usr_chk_bs=usr_chk_bl=usr_chk_tp=usr_chk_tm_fb=usr_chk_tm_alarm=false;usr_chk_tm_mh=usr_rm_fb=usr_ld_msg=usr_chk_tm_alarm_cnfm=usr_mh_mn=true;chk_valid();chk_reset();}, true);

	}

GM_registerMenuCommand("MH - Pooflinger Options", function () {document.location.href=CONFIG_URL;});
function chk_reset()
{
	//document.getElementById('usr_chk_k_yes').checked=usr_chk_k;
	//document.getElementById('usr_chk_k_no').checked=!usr_chk_k;
	document.getElementById('usr_chk_fr_yes').checked=usr_chk_fr;
	document.getElementById('usr_chk_fr_no').checked=!usr_chk_fr;
	document.getElementById('usr_chk_pt_yes').checked=usr_chk_pt;
	document.getElementById('usr_chk_pt_no').checked=!usr_chk_pt;
	document.getElementById('usr_chk_rk_yes').checked=usr_chk_rk;
	document.getElementById('usr_chk_rk_no').checked=!usr_chk_rk;
	document.getElementById('usr_ld_msg_yes').checked=usr_ld_msg;
	document.getElementById('usr_ld_msg_no').checked=!usr_ld_msg;

	document.getElementById('usr_chk_ls_yes').checked=usr_chk_ls;
	document.getElementById('usr_chk_ls_no').checked=!usr_chk_ls;
	document.getElementById('usr_chk_lp_yes').checked=usr_chk_lp;
	document.getElementById('usr_chk_lp_no').checked=!usr_chk_lp;
	document.getElementById('usr_chk_cr_yes').checked=usr_chk_cr;
	document.getElementById('usr_chk_cr_no').checked=!usr_chk_cr;
	document.getElementById('usr_chk_bs_yes').checked=usr_chk_bs;
	document.getElementById('usr_chk_bs_no').checked=!usr_chk_bs;
	document.getElementById('usr_chk_bl_yes').checked=usr_chk_bl;
	document.getElementById('usr_chk_bl_no').checked=!usr_chk_bl;
	document.getElementById('usr_chk_tp_yes').checked=usr_chk_tp;
	document.getElementById('usr_chk_tp_no').checked=!usr_chk_tp;
	
	document.getElementById('usr_chk_tm_mh_yes').checked=usr_chk_tm_mh;
	document.getElementById('usr_chk_tm_mh_no').checked=!usr_chk_tm_mh;
	document.getElementById('usr_chk_tm_fb_yes').checked=usr_chk_tm_fb;
	document.getElementById('usr_chk_tm_fb_no').checked=!usr_chk_tm_fb;
	
	document.getElementById('usr_chk_tm_alarm_yes').checked=usr_chk_tm_alarm;
	document.getElementById('usr_chk_tm_alarm_no').checked=!usr_chk_tm_alarm;
	document.getElementById('usr_chk_tm_alarm_cnfm_yes').checked=usr_chk_tm_alarm_cnfm;
	document.getElementById('usr_chk_tm_alarm_cnfm_no').checked=!usr_chk_tm_alarm_cnfm;

	document.getElementById('usr_rm_fb_yes').checked=usr_rm_fb;
	document.getElementById('usr_rm_fb_no').checked=!usr_rm_fb;
	document.getElementById('usr_mh_mn_yes').checked=usr_mh_mn;
	document.getElementById('usr_mh_mn_no').checked=!usr_mh_mn;

	GM_setValue("MSG_POSITION", "35px_750px");
}
function chk_valid()
{

	/*
	if(!usr_chk_k && (usr_chk_pt || usr_chk_rk || usr_chk_tm_fb))
		{
		alert('King\'s reward is turned on for you.\nBecause you need it in order to display points, rank, or timer on FB webboards!');
		document.getElementById('usr_chk_k_yes').checked = usr_chk_k =  true;
		
		}
	*/
	
	//GM_setValue('usr_chk_k',usr_chk_k);
	GM_setValue('usr_chk_pt',usr_chk_pt);
	GM_setValue('usr_chk_rk',usr_chk_rk);
	GM_setValue('usr_chk_fr',usr_chk_fr);
	GM_setValue('usr_chk_ls',usr_chk_ls);
	GM_setValue('usr_chk_lp',usr_chk_lp);
	GM_setValue('usr_chk_cr',usr_chk_cr);
	GM_setValue('usr_chk_bs',usr_chk_bs);
	GM_setValue('usr_chk_bl',usr_chk_bl);
	GM_setValue('usr_chk_tp',usr_chk_tp);

	GM_setValue('usr_chk_tm_mh',usr_chk_tm_mh);
	GM_setValue('usr_chk_tm_fb',usr_chk_tm_fb);
	GM_setValue('usr_ld_msg',usr_ld_msg);
	GM_setValue('usr_rm_fb',usr_rm_fb);
	GM_setValue('usr_mh_mn',usr_mh_mn);
	
	GM_setValue('usr_chk_tm_alarm',usr_chk_tm_alarm);
	GM_setValue('usr_chk_tm_alarm_cnfm',usr_chk_tm_alarm_cnfm);
	GM_setValue('usr_chk_tm_alarm_file',usr_chk_tm_alarm_file);
}

