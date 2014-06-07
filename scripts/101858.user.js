// ==UserScript==
// @name		Flickr CY Admin Check
// @namespace		http://www.flickr.com/groups/challenge_you/
// @description		A tool to check the status of challenges in the CY group
// @version		0.37
// @identifier	
// @date		03/06/2008
// @creator		Andrew Dunn (. Andrew Dunn .) 
// 
// @include		http://www.flickr.com/groups/challenge_you/discuss/
// @include		http://flickr.com/groups/challenge_you/discuss/
// ==/UserScript==
//
// Based on Check Play by KVangeel (Kris Vangeel)
//
// Solved Issues
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// After downloading you should be offered a button to install the script
//
// --------------------------------------------------------------------
//
// ToDo:
//  *Check the order of misvotes. If a player votes with a deprecated style
//   like '2 3' this doesn't get flagged as an error until the next player
//   votes afterwards. This is particularly a problem when a final '10 3'
//   vote isn't noticed
//  * Check for two challenges with the same challenge number
//  * Check for a player voting twice in a challenge
//  * Add a button to competitors names, to flag which challenges they
//   have voted in (big job).


(function CYCheck() {

var CYStartTime=new Date();
var CYCheckversion="v0.37";
// v0.1 Initial version for Challenge You group - checked vote sequence
// v0.2 Added checks on competitors
// v0.3 Mild efficiency optimisation and refactoring.
// v0.31 Improved voting regexp to avoid false 0-15 VoteError when a challenge
//        is being closed, but still has a status of TO VOTE.
// v0.32 Added function to look for closed challenges that haven't been reopened
//        after 30 min
// v0.33 Made challenge title searches case insensitive
// v0.34 Fixed a bug that flagged pure comments as a voting error
// v0.35 Fix ignoring special challenges - change colour of voting errors
//       Made recognition of challenge status more robust if theme includes words like 'open'
// v0.36 Fixed bug on recognising votes across multiple lines.
// v0.37: (Alesa Dam)	ignore UCP bump messages

var CYadminReopenTime = 30;	// Admins can reopen a challenge after 30 minutes
var CYuserReopenTime = 60;	// Users can reopen a challenge after 60 minutes
var CYisAdmin = false;			// Flag true if the user of the script is a group admin


addCYheader = function addCYheader() {

var topbar=thisdocument.getElementById("TopBar");
var tables=topbar.getElementsByTagName("table");
var trs=tables[0].getElementsByTagName("tr");
var tds=trs[0].getElementsByTagName("td");

var CYEndTime=new Date();
var CYExecutionTime=CYEndTime-CYStartTime;

tds[1].innerHTML = "CYCheck " + CYCheckversion + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[1].innerHTML;

//GM_log(tds[1].innerHTML);
}


// Skipchallenge return
//  9 - unrecognised, always skip
//  2 - always skip
//  1 - skip internal challenge parsing
//  0 - don't skip
// For efficiency, put the most common keywords first
function skipchallenge(name)
{
	if (name.search(/SPECIAL CHALLENGE/i) > -1) return 2; // Special challenge must be before false returners
	if (name.search(/-\s*TO VOTE/i) > -1) return 0;
	if (name.search(/-\s*CLOSED/i) > -1) return 1; 
	if (name.search(/-\s*ON HOLD/i) > -1) return 0;
	if (name.search(/-\s*OPEN/i) > -1) return 0;
	if (name.search(/DAILY CHAT/i) > -1) return 2; 
	if (name.search(/-\s*WAITING/i) > -1) return 0;
	if (name.search(/-\s*EXPIRED/i) > -1) return 1;
	if (name.search(/-\s*VOID/i) > -1) return 2; 

	return 9;
}


CYCheckClicked = function CYCheckClicked()
{
	if (GM_getValue("CY.auto")=="true") automode=true
		else automode=false;

	playernumber=0;

	if (automode) 
	{
		automode=false;
		GM_setValue("CY.auto","false");
		automodetxt="off";
	}
	else
	{
		automode=true;
		GM_setValue("CY.auto","true");
		automodetxt="on";
		ProcessMainDoc();
	}

	CYcheckperformed=true;

	link=document.getElementById("CYCheck");
	link.innerHTML="CYCheck " + automodetxt; // +" (" + playername +")" ;

	return true;
}


// Return an HTML color property fragment to set the color of an item
function setchlgstatuscolor(chlgstatus)
{
	if (chlgstatus=="---") return "";
	if (chlgstatus=="ToVote") return "color: Orange";
	if (chlgstatus=="ToHold") return "color: Orange";
	if (chlgstatus=="StatusError") return "color: Orange";
	if (chlgstatus=="ToClose") return "color: Orange";
	if (chlgstatus=="WaitOpen") return "color: gray";
	if (chlgstatus=="ToOpen") return "color: Orange";
	if (chlgstatus=="AllOpen") return "color: Red";
	if (chlgstatus=="VoteError") return "color: #C12283"; // Maroon3
	if (chlgstatus=="CompeteError") return "color: Red";
	if (chlgstatus=="UnrecognisedStatus") return "color: #C12283";

	return "";
}

function setchlgstatustitle(chlgstatus)
{
	if (chlgstatus=="---") return "This thread is closed or contains general information.";
	if (chlgstatus=="OK") return "Challenge status is fine and voting looks normal.";
	if (chlgstatus=="ToVote") return "This challenge needs putting TO VOTE";
	if (chlgstatus=="ToHold") return "This challenge needs putting ON HOLD";
	if (chlgstatus=="ToClose") return "This challenge needs CLOSING";
	if (chlgstatus=="WaitOpen") return "This challenge has closed and can be reopened by the winner";
	if (chlgstatus=="ToOpen") return "This challenge has closed and can be reopened by an admin";
	if (chlgstatus=="AllOpen") return "This challenge has closed and can be reopened by anyone";
	if (chlgstatus=="StatusError") return "The status title for this challenge is abnormal.";
	if (chlgstatus=="VoteError") return "There is a problem with the vote sequence in this challenge";
	if (chlgstatus=="CompeteError") return "There is a problem with the competitors in this challenge";
}

function truncate(str,len)
{
	if(str.length <= len) return str;
	
	var tstr = str.substring(0, (len>3) ? len-3 : 1) + "...";
	return tstr;
}

function loadthread(thread,chlgname)
{

//GM_log("CY: Started loading new thread (in background): " + thread + " , " + chlgname);

GM_xmlhttpRequest({
  method:"GET",
  url:thread,
  headers:{
   "User-Agent":"monkeyagent",
   "Accept":"text/monkey,text/xml"
    },
 onload:function(responseDetails) {
	
  content=responseDetails.responseText.split('<div id="DiscussTopic">')[1].split('</div>')[0];
  tables=content.split('<table');
  //chlgnum=chlgname.split('<b>')[1].split(" ")[0];
  chlgnum=chlgname.substr(0,2);

  challengetxt=tables[1].split('says:')[1].split('<small>')[0];
  tds=tables[2].split('<td class');

  var newchlgstatus="none";
  var photosposted=0;

  var lastimgplace=2;
  var photoposter="";
  var challenger="";
  var competitor="";
  var challengerisadmin = 0;
  var competitorisadmin = 0;
  var chlgextrastatus = "";

	// Try to look for users excluded from challenge - but this isn't very robust
	// since we can't be sure that the excluded name is present, or an accurate match
	// for the actual user name. At the moment we are just looking for the first
	// text in the intro enclosed by following the word 'except' and enclosed in bold 
	// and italic tags. This can work for challenges opened by administrators
	// but is not likely to work for challenges opened by users.
	challengeintro=tables[1].split("</h4>")[1].split("<small>")[0]; 
	reExcludedUser = /except\s+<b>\s*(?:<i>)?\s*([^<]+)\s*</;
	matcharray = reExcludedUser.exec(challengeintro);
	if( matcharray != null ) 
	{
		excludeduser = matcharray[1];
		excludeduser = excludeduser.replace(/^\s+|\s+$/g, '');	// trim leading and trailing space
	}
	else
	{
		excludeduser="unknown";
	}

	// Look for competing photos
	// ToDo: This fails when an admin leaves 'icon reply' messages
  for (i=2;i<tds.length;i++) {
  	replyblock=tds[i];

		if (replyblock.indexOf("says") > -1) {
			replytxt2=replyblock.split("</h4>")[1].split("<small>")[0]; //check on 2nd part because of extra img title for admins


			if (replytxt2.indexOf("img") > -1 && replytxt2.indexOf("UCPANG:bump") < 0) { // ignore UCP bump messages
				// photo found, now get username
				photosposted += 1;
				photoposter=replyblock.split("<a href")[1].split(">")[1].split("<")[0];
				photoposter=photoposter.replace(/&amp;/g,"&");
				photoposterisadmin = 0;
				challengerisadmin = 0;
				competitorisadmin = 0;
				if( replyblock.split("</h4>")[0].match(/(group administrator|group moderator)/) )
				{
					photoposterisadmin = 1;
				}
				

				if(challenger == "") 
				{ 
					challenger = photoposter;
					challengerisadmin = photoposterisadmin;
				}
				else
				{
					if(competitor == "")
					{
						competitor = photoposter;
						competitorisadmin = photoposterisadmin;
					}
				}

				if(photosposted > 2)
				{
					newchlgstatus = "CompeteError";
				}

				lastimgplace=i+1;
			}
		}
	} 
	var myplayers=thisdocument.getElementById("CYplayers."+thread);
	myplayers.innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + truncate(challenger,32) + "&nbsp; -- &nbsp;" + truncate(competitor,32);

	//GM_log( truncate(chlgname,30) + " #photos=" + photosposted + "  challenger:" + challenger + " competitor:" + competitor + " excludeduser=" + excludeduser);

	//Check that neither competitor is excluded
	// Need to use indexOf rather than match here to avoid problem with names starting with '*'
	if( challenger.indexOf(excludeduser) > -1 )
	{
		newchlgstatus = "CompeteError";
		chlgextrastatus = ": " + challenger + " excluded";
	}
	else if( competitor.indexOf(excludeduser) > -1 )
	{
		newchlgstatus = "CompeteError";
		chlgextrastatus = ": " + competitor + " excluded";	
	}
	if( excludeduser.match(/admin/i) && (challengerisadmin || competitorisadmin ) )
	{
		newchlgstatus = "CompeteError";
		chlgextrastatus = ": Admins excluded";
	}
	
	// Loop again and check the votes in replies starting after the last image
	// For each reply, vote1 is the current count of votes for the first picture and
	// vote2 is the count for the second picture.
  var highestvote = 0;
  var lastvote1 = 0;
  var lastvote2 = 0;
  var vote1 = 0;
  var vote2 = 0;
	var voter = "";	// We only need to get the voter's name if there is an error
	var votes = null;
	var chlgvoting = "";
	var reVoteMatch = /(\d+)\s*[-.=~ ]+\s*(\d+)/ig; //regexp to match votes in the style '1 - 3' or '1.3'
	var reReplaceTags = /\s*<[^>]*>\s*/g;			//regexp to replace html tags and surrounding spaces in replytxt 

	if (chlgname.indexOf("VOTE") > -1)
	{
		for (i=lastimgplace;i<tds.length;i++) {
			replyblock=tds[i];

			if (replyblock.indexOf("says") > -1) 
			{
				var ptag=replyblock.split("<p>")[1].split("<small>")[0];
				var replytxt = ptag.replace(reReplaceTags, " "); 
				lastvotes = null;
				numvotepairs = 0;
		
				if( replytxt.match(/void/i) )
				{
					// Skip replies where the vote has been voided
					continue;
				}
				// thisvotes array may have more than two elements if there are vote corrections	
				votes = null;
				thisvotes = reVoteMatch.exec(replytxt);
				while( thisvotes != null )
				{
					numvotepairs++;
					votes = thisvotes;
					thisvotes = reVoteMatch.exec(replytxt);
				}
				if( votes != null )
				{
					nvotes = votes.length - 1;
					if(nvotes >= 2)
					{
						vote1 = parseInt(votes[nvotes-1]);
						vote2 = parseInt(votes[nvotes]);
					}
					else
					{
						// No votes found in this reply
						vote1 = -1;
						vote2 = -1;
					}
					// GM_log("CY: " + chlgnum + " line:" + i + " #votes=" + numvotepairs + " v1=" + vote1 + " v2=" + vote2 + " votes=" + votes);
				}
				else
				{
					//GM_log("CY: " + chlgnum + " line:" + i + " can't parse votes. replytxt: " + replytxt);
					// No votes found in this reply
					vote1 = -1;
					vote2 = -1;
					// This reply probably contains an admin comment such as 'voting continues to 20'
					// However, if the replytxt contains a number but no words it might be a malformed vote
					if( (replytxt.search(/\d+/) > -1) && (replytxt.search(/[a-zA-Z]+/) < 0) )
					{
						newchlgstatus = "VoteError";
						chlgextrastatus += ": misvote?" + truncate(replytxt,6);
					}					
				}
				
				//GM_log("CY: " + chlgnum + " line:" + i + " " + lastvote1 + "-" + lastvote2 + " >> " + vote1 + "-" + vote2 + " ---- lastvote1 + 1 = " + (lastvote1 + 1) + ", lastvote2 + 1 = " + (lastvote2 + 1) );
								
				if(vote1 > -1) {
					// With a correct vote, either the first or second vote should be one higher
					// The simplest test would be ( vote1 + vote2 != lastvote1 + lastvote2 + 1 )
					// but that would miss voting errors such as 3-2 -> 2-4
					if(! ( ((vote1 == lastvote1) && (vote2 == (lastvote2 + 1))) ||
							((vote1 == (lastvote1 + 1)) && (vote2 == lastvote2)) ) )
					{
						// Voting error
						voter=replyblock.split("<a href")[1].split(">")[1].split("<")[0].replace(/&amp;/g,"&");
						newchlgstatus = "VoteError";
						if(chlgextrastatus == "")
						{
							chlgextrastatus += ": " + lastvote1 + "-" + lastvote2 + " >> " + vote1 + "-" + vote2 + " " + voter;
						}
					}

					lastvote1 = vote1;
					lastvote2 = vote2;
					chlgvoting = vote1 + "-" + vote2;
				}
				else
				{
					// Nothing to do with a comment reply
					;
				}
			}
		} 

		if(newchlgstatus == "none") {
			newchlgstatus = "OK"
			chlgextrastatus = ": " + chlgvoting;
		}
		
		highestvote = vote1 > vote2 ? vote1 : vote2;
		if( ((chlgnum == "12") && (highestvote >= 20)) ||
						((chlgnum != "12") && (highestvote >= 10)) )
		{
			// Probable end of voting
			if( newchlgstatus.match("OK") )
			{
				newchlgstatus = "ToClose";
				chlgextrastatus = ": " + chlgvoting;
			}
			else
			{
				// May already have flagged an error
				chlgextrastatus = chlgextrastatus + "<br \>ToClose: " + vote1 + "-" + vote2;
			}
		}
	} // end of if match vote
	
	// Flag changes in status
	if( (chlgname.indexOf("OPEN") > -1) && !(newchlgstatus == "CompeteError") )
	{
		if(photosposted == 1) newchlgstatus="ToHold";
		if(photosposted == 2) newchlgstatus="ToVote";
	}
	
	if( (chlgname.indexOf("HOLD") > -1) && !(newchlgstatus == "CompeteError") )
	{
		if(photosposted == 0) newchlgstatus="StatusError";
		if(photosposted == 2) newchlgstatus="ToVote";
	}
		
	if (newchlgstatus=="none") newchlgstatus="OK";

	// Change the update status on screen
	var anchor=thisdocument.getElementById("CY."+thread);
	anchor.innerHTML=newchlgstatus + chlgextrastatus; 

	//if (newchlgstatus=="OK") anchor.innerHTML='<img src="data:image/gif;base64,R0lGODlhIwAcALMAAALrFg3tGJD2j/3//wDnIVLxWNL5zQDoHADoHQDpGvv6+wDoHvv6/Pv7/Pz7/P///ywAAAAAIwAcAAAE//DJSau9OOttG/teI4KeIjYKaDIo6zTUgBx0nRzIsiS5rhOL3oIGHFAatFkNN0wkhgihb3fwGScO5uFGe255W6ZQSnDEooq0wWloCwTOgqAgT8gFwfdCETuUHIAJDQ4rDgmAiIeAQ4QLVxKGJC+KDIgAiIGDgYQHjw+GIgkGgJcODIqlDgBOmAiLnpEMAKOqgAOlAZYAqaANexQKgg0JAoOlCri6vGVIsAAss6S2uQ7UqrshDQMincAJ0ALSmNXjqSeGnsEfAOG149biA4Ao3VjfDdHuAwH81gG7tl4ocIAg3b181Pb9s7brEIpBKBaYmTAMGq2E/RgCZJAGhQKJ3oXWGRCRamHCVYIICUoDkuI3FidK3doFrxYKQR9aSlAHk+S0XbxUiVBwgJCCMkecOAGSYBVQoAn6FbBDZwGdAgtgUAzTVKnTpyidVBFCoOxECafEInACtmFYHlN8IKU4xAbKhkqVBllQlm/Zslp3puCYpvDgD4hPpBggTwFjeRwiS55MWUIEADs=" width="35" height="17">'; 
	//if (newchlgstatus=="VoteError") anchor.innerHTML='<img src="http://www.flickr.com/images/icon_alert_big.png" width="22" height="17" border=0>'; 

	anchor.setAttribute('style','text-decoration: none; ' + setchlgstatuscolor(newchlgstatus));
	anchor.title=setchlgstatustitle(newchlgstatus);

	//GM_log("CY: Loading new thread " + thread + " complete (" + chlgname + ")");

	}
});

}


ProcessMainDoc = function ProcessMainDoc() {

//GM_log("Processing CY main discussion page - Admin mode=" + CYisAdmin);

var chlgTimes = [0,0,0,0,0,0,0,0,0,0,0,0,0];	// Times of last activity on numbered challenges


// select main table
var main=thisdocument.getElementById("Main");
var tables=main.getElementsByTagName("table");
var trs=tables[2].getElementsByTagName("tr");

// add new table header to the table
if (!CYcheckperformed)
{
  var tds=trs[0].getElementsByTagName("th");
  tds[3].width="12%";
  myanchor=thisdocument.createElement('th');
  myanchor.innerHTML="CY-status";
  myanchor.width="8%";
  myanchor.setAttribute('style',"text-align: center");
  trs[0].appendChild(myanchor);
}

// let's loop the table and start processing
var i=0;
for (i=1;i<trs.length;i++) {
  insertstatus=true;
  
  tds=trs[i].getElementsByTagName("td");
  if (statusposition==0) statusposition=tds.length;
  
  var threadtitleanchor=tds[0].getElementsByTagName("a")[0];
  var thread=threadtitleanchor.href;
  var chlgname=threadtitleanchor.innerHTML;
  chlgname = chlgname.substr(3,chlgname.length-7); // remove <b> tags  
  
  chlgstatus = (skipchallenge(chlgname) > 0) ? "---" : "Updating";

  // add elements to hold statuses  
  // Most actual statuses are set in the loadthread function
  if(chlgstatus=="Updating") 
	{   
		if(!CYcheckperformed) 
		{
			myanchor=thisdocument.createElement('a');
			myplayers=thisdocument.createElement('small');
		}
		else
		{
			myanchor=thisdocument.getElementById("CY." + thread);
			myplayers=thisdocument.getElementById("CYplayers." + thread);
		}
		myanchor.innerHTML='<img src="http://l.yimg.com/www.flickr.com/images/pulser2.gif" ' +
											'alt="" width="21" height="10" border="0">';
		myanchor.id="CY." + thread;
		myanchor.href=thread;
		myanchor.setAttribute('style','color: gray');
		myplayers.id="CYplayers." + thread;
		myplayers.innerHTML="<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-";
		myplayers.setAttribute('style','color: gray');
	}
  else 
	{
		// Make sure that challenges that are being skipped still have consistent
		// nodes and ids.
		myanchor=thisdocument.createElement('a');
		myanchor.innerHTML=chlgstatus;
		myanchor.title=setchlgstatustitle(chlgstatus);
		myanchor.id="CY." + thread;
		myanchor.href=thread;
		myanchor.setAttribute('style','text-decoration: none');
		// The myplayers element isn't really need for challenges we are skipping
		myplayers=thisdocument.createElement('small');
		myplayers.id="";
		myplayers.innerHTML=" ";
		myplayers.setAttribute('style','color: gray');
	}
  
  if (!CYcheckperformed) //only on first pass we need to create new cells
	{
		mylink=trs[i].insertCell(statusposition);
		mylink.setAttribute('style',"text-align: center");
		mysmall=thisdocument.createElement('small');
		mysmall.appendChild(myanchor);
		mylink.appendChild(mysmall);
		//GM_log("CY-"+i+ " " + chlgname);
		//We already have the thread title anchor from earlier
		threadtitleanchor.parentNode.appendChild(myplayers);
	}
  	
	// Get the time of the last post to the thread in seconds
	// Always make sure this is 1 second or more, or logic on chlgTimes table
	// will fail
  var threadlastpost=tds[3].getElementsByTagName("small")[0].innerHTML;
  var threadtime = 0;
  if( threadlastpost.indexOf("moment ago") > -1) threadtime=1;
  else 
  {
  	reLastPostTime = /(\d+)\s+(second|minute|hour)/;
  	t = reLastPostTime.exec(threadlastpost);
  	if( t != null )
  	{
  		threadtime = t[1];
  		if( t[2].substr(0,1) == "m" ) threadtime = threadtime * 60;
  		else if( t[2].substr(0,1) == "h" ) threadtime = threadtime * 60 * 60;
  		
  	}
  }
  //GM_log(truncate(chlgname,15) + "*"+chlgname.substr(0,2)+"*"+ " time=" + threadtime);
	
	// Look for threads that are in play, or have recently closed
	var toskip = skipchallenge(chlgname);
	if( toskip <= 1 )
	{
		chlgnum = parseInt( "1" + chlgname.substr(0,2) ) - 100;	// need "1" to avoid octal parsing on 08
		//GM_log("chlgTimes["+chlgnum+"]=" + chlgTimes[chlgnum]);
		if( chlgTimes[chlgnum] == 0 )
		{
			chlgTimes[chlgnum] = threadtime;
			//GM_log(chlgnum + " . . . " + threadtime);
			
			if( chlgname.indexOf("CLOSED") > -1 )
			{
				// challenge 12 CY^2 can only be opened by an admin irrespective of the threadtime
				// so we don't need the WaitOpen or AllOpen states
				if(chlgnum == 12) 
				{
					chlgstatus="ToOpen";
				}
				else
				{
					if(threadtime < 30 * 60 ) chlgstatus="WaitOpen";
					else if(threadtime < 60 * 60 ) chlgstatus="ToOpen";
					else chlgstatus="AllOpen";
				}
				
				var anchor=thisdocument.getElementById("CY."+thread);
				anchor.innerHTML=chlgstatus; 
				anchor.setAttribute('style','text-decoration: none; ' + setchlgstatuscolor(chlgstatus));
				anchor.title=setchlgstatustitle(chlgstatus);
  			//GM_log(truncate(chlgname,15) + chlgstatus + " : " + threadtime);
			}
		}
		else if( (toskip == 1) || (toskip == 2) )
		{
			// We've seen this chlgnum already, so this challenge must be stale
			; // Do nothing
		}
		else
		{
			// skipchallenge() returned neither 0,1 or 2 so most likely a malformed challenge title
			chlgstatus="UnrecognisedStatus";
			var anchor=thisdocument.getElementById("CY."+thread);
			anchor.innerHTML=chlgstatus; 
			anchor.setAttribute('style','text-decoration: none; ' + setchlgstatuscolor(chlgstatus));
			anchor.title=setchlgstatustitle(chlgstatus);
			//GM_log("unrecognised challenge status in thread:" + chlgname);
		}
	}

  // Only start the loadthread update once we are sure that the new elements have
  // been inserted into the page
	if (chlgstatus=="Updating") loadthread(thread,chlgname);

}

CYcheckperformed=true; //we've passed here at least once

//GM_log("End of processing main discuss page");

return;

}

// *******************
// Start of processing
// *******************

if (window.name=='Log page') return; //don't process log page

//alert('start');

var thislocation=location;
var thisdocument=document;
var CYcheckperformed=false;
var playername=unsafeWindow.global_name;
var automodetxt="off";
var playernumber=0;
var statusposition=0;

// check themelist & chlgheaders
if (thisdocument.title.indexOf("discussion topics") > -1) {

  // ************************
  // main Challenge You page
  // ************************

	// check if we have GM variables
	if (GM_getValue("CY.auto")==undefined) GM_setValue("CY.auto","true");

	if (GM_getValue("CY.auto")=="true") automode=true
		else automode=false;
	if (automode) automodetxt="on";

	//add auto on/off link
	var Docmain=thisdocument.getElementById("Main");
	var Doctables=Docmain.getElementsByTagName("table");
	var Doctrs=Doctables[0].getElementsByTagName("tr");
	var Doctds=Doctrs[0].getElementsByTagName("td");
	var Docp=Doctds[1].getElementsByTagName("p");	// Group links section

	// Check to see whether the user of this script is a group admin
	// If they are there should be an Administration link at the start of the group link section
	var DocLinks = Docp[0].getElementsByTagName("a");
	if( DocLinks[0].innerHTML.indexOf("Administration") > -1 ) CYisAdmin=true;

	// subnavi_dots.gif are a small vertical line of dots that separate the links in the 
	// Pool navigation links sections
	myanchor=thisdocument.createElement('img');
	myanchor.setAttribute('src','http://l.yimg.com/www.flickr.com/images/subnavi_dots.gif');
	myanchor.setAttribute('alt','');
	myanchor.setAttribute('height','11');
	myanchor.setAttribute('width','1');
	Docp[0].appendChild(myanchor);

	// Add our own link, which is actually a button to turn CYstatus on and off
	myanchor=thisdocument.createElement('a');
	myanchor.innerHTML="CYCheck "+ automodetxt; 
	myanchor.href="#";
	myanchor.id="CYCheck";
	myanchor.setAttribute('onClick','return false;');
	myanchor.addEventListener ('click', function eventclickmain(e) {
					CYCheckClicked();}, 
					false);
	Docp[0].appendChild(myanchor);

	mydiv=thisdocument.createElement('div');
	mydiv.style.display='none';
	mydiv.id="CYCheckStatusDiv";
	Doctds[1].appendChild(mydiv);

	myanchor=thisdocument.createElement('p');
	myanchor.id="CYCheckStatus";
	myanchor.innerHTML="CYCheck statusfield";
	myanchor.setAttribute('style','text-decoration: none; color: Red');
	mydiv.appendChild(myanchor);

  if (automode) ProcessMainDoc();

	addCYheader();
}


return;

// *******************
//  End of processing
// *******************

})();
