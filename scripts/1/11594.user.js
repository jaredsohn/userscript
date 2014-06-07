// ==UserScript==
// @name           NG Extreme StumbleUpon Exporter
// @namespace      http://www.ngtech.gr/blog/en/my-programs/ng-extreme-stumbleupon-exporter
// @description    A GreaseMonkey Script to export StumbleUpon Favorites in various formats including CSV,XML,Firefox Bookmarks
// @include        http://*.stumbleupon.com/*
// @exclude	   http://www.stumbleupon.com*
// @exclude	   http://*.group.stumbleupon.com*
// @author         Nick Georgakis <grease_monkey@ngtech.gr>
// @license        This software is licensed under the GNU GPL License <http://creativecommons.org/licenses/GPL/2.0/>
// @credit         GUI Based on a SU2Bookmarks script by Nathan Blume(thlayli.detrave.net) & Code Parts Based on original bookmarklet by cowface.stumbleupon.com (http://web.archive.org/web/20050208084151/www.mediarule.com/su_bookmarklet.js.html)
// @version        0.6
//
// ==/UserScript==

var my_ver = '0.6';
var max_AJAX_retries = 10; //Increase to avoid interruptions
var max_AJAX_timeout = 10000; //(ms: 1sec = 1000 ms)Increase when having slow connections 
var use_CORAL_CDN = 1; //Leave this to 1 to reduce SU server load! - set to 0 to retrieve always from SU
var AJAX_retries = 0;

//This greasemonkey script will work with a better user interface without pop-ups
//Using a div element
GM_log("Ultimate StumbleUpon Exporter v"+my_ver);

// Margin, top, left, width and height center the iframe horizontally and vertically:
var css = 'position:fixed; z-index:9999; border:1px solid black; ' +
          'top:25%; left:12.5%; width:75%; height:50%;';

//create cover div
//Cover div creates the "lightbox effect"
cd = document.createElement('div');
cd.style.background = document.bgColor;
cd.style.MozOpacity = '0.75';
cd.style.position = 'absolute';
cd.style.top = '0';
cd.style.left = '0';
cd.style.width = window.screen.availWidth + 'px';
cd.style.height = window.innerHeight + window.scrollMaxY + 'px';

//create modal div
md = document.createElement('div');
md.style.background = document.bgColor;
md.style.padding = '5px';
md.style.border = '2px solid';
md.style.position = 'fixed';
md.style.top = '12.5%';
md.style.left = '10%';
md.style.width = '80%';
md.style.height = '75%';
md.style.overflow = 'auto';

//Output buffers
var obuf_1 = new Array();
var obuf_2 = new Array();
var obuf_3 = new Array();   

//User infor vars
var sPass = '';
var sName = '';
var sID = '';
var sStatus ='';

//Insert Open link
var newSUUI = -1;
base_td = 0;

//Set status mode
wait_factor = 10; //;-)
sStatus='Logged Off';

var hrefs = document.getElementsByTagName('a');
for(i=0;i<hrefs.length;i++){
	//Old Interface
	if(hrefs[i].text=='Preferences'){
		var new_link = document.createElement('div');
		base_td = hrefs[i].parentNode;
		newSUUI = 0;
	}
	//New Interface
	if(hrefs[i].text==' Preferences'||hrefs[i].text==' Her Friends'||hrefs[i].text==' His Friends'){
		var new_link = document.createElement('li');
		base_td = hrefs[i].parentNode.parentNode;
		newSUUI = 1;	
	}
	//Check if we are logged on
	if(hrefs[i].href=='http://www.stumbleupon.com/login.php?logout=1'||hrefs[i].href.match('.stumbleupon.com/inbox/')!=null){
		sStatus='Logged On';
		wait_factor = 0; //;-)
	}
}

//Add link
new_link.innerHTML = '<a href="javascript:void(0);" id="ngsuexex"><img alt="" src="http://www.stumbleupon.com/images/icon_add.png"/><b>Export :-)</b></a>';
base_td.appendChild(new_link);
unsafeWindow.document.getElementById('ngsuexex').onclick = showModal;


//Get User Info
var AllInputTags = document.getElementsByTagName('INPUT');

for(i=0;i<AllInputTags.length;i++){
	if(AllInputTags[i].name=='auth_pass'){sPass=AllInputTags[i].value}
	if(AllInputTags[i].name=='stumbler'){sName=AllInputTags[i].value}
	if(AllInputTags[i].name=='auth_user'){sID=AllInputTags[i].value}
}

//If all the above are empty we are logged off or using old interface
if(sPass==''&&sName==''&&sID==''){
	if(newSUUI == 0){
		sStatus='Logged Off';
		//Need to Get User Ifo via alternate means
		var DocLinks = document.links;
		sName='';
		for(i=0;i<DocLinks.length;i++){
			if(DocLinks[i].pathname=='/syndicate.php'){
				spos1=DocLinks[i].search.indexOf('=');
				spos2=DocLinks[i].search.indexOf('&');
				//Get Stumbler ID
				if(spos2==-1){sID=DocLinks[i].search.substring(spos1+1)}
			}
			//Get Stumbler Name
			if(DocLinks[i].host!='www.stumbleupon.com'&&(spos3=DocLinks[i].host.indexOf('.stumbleupon.com'))>0){
				sName = DocLinks[i].host.substring(0,spos3);
			}
			//Set Password to Unknown
			sPass='**UNKNOWN**';
			wait_factor = 10; //;-)
		}
	}else{
		//New UI -- sPass has been handled above!
		sPass='**UNKNOWN - Revovery Possible only in OLD Mode ;-)**';

		//Get sName & sID
		var DocLinks = document.getElementsByTagName('link');
		for(i=0;i<DocLinks.length;i++){
			if(DocLinks[i].href.search(/syndicate.php\?stumbler=/)){
				spos1=DocLinks[i].href.indexOf('=');
				spos2=DocLinks[i].href.indexOf('&');
				//Get Stumbler ID
				if(spos2==-1){sID=DocLinks[i].href.substring(spos1+1)}
				//Get Stumbler name
				if(DocLinks[i].baseURI!='www.stumbleupon.com'&&(spos3=DocLinks[i].baseURI.indexOf('.stumbleupon.com'))>0){
					sName = DocLinks[i].baseURI.substring(7,spos3);
				}
			}
		}
	}
}else{
	sStatus='Logged On';
	wait_factor = 0; //;-)
}

//GM_log("Stumble Upon Information\nUser Status=[" + sStatus + "]\nUser Name = [" + sName + "]\nUser ID = ["+sID+"]\nUser Pass = ["+sPass+"]");

//Add Export Option

function showModal(){
	//fill modal div
	md.innerHTML = '<div style="top:10px;left:90%;position:absolute"><a href="#" id="close_cp" title="Cancel/Close CP">[X - Close]</a></div><div style="margin:3px 0 10px 5px;float:none;width:97%;"><h2 style="font-size: 24px;" id="exp_main"><img src="http://www.stumbleupon.com/images/logo_su_36x36.png" style="vertical-align: bottom;"><a href="http://www.ngtech.gr/blog/en/my-programs/ng-extreme-stumbleupon-exporter" target="_blank" title="Visit the script homepage for feedback,updates and don\'t forget to give us a thumbs up!">Nick Georgakis Extreme SU Exporter v'+my_ver+'</a></h2></div>';
	md.innerHTML += '<p style="padding: 0 5px;" id="notes_su2b">&nbsp;&nbsp;Welcome! This script will scan your favorites and generate <b> full source code</b> for <a href="#the_csv"><u>a comma delimited (.csv) file</u></a>, <a href="#the_xml"><u> a valid xml file </u></a> and <a href="#the_bmarks"><u>a valid bookmarks.html</u></a> Firefox/Netscape bookmark file, including <b>in all formats every piece of available information (dates,tags,titles,urls & descriptions)</b>.</p>'+
	'<p>&nbsp;&nbsp;After <b>copying</b> the produced output,from the boxes below, <b>to the clipboard</b>, <b>pasting</b> them to <b>3 new seperate blank files</b> inside your favorite <b>text editor</b>(<a href="http://www.crimsoneditor.com/" title="I highly recommend this excelent Freeware/Open Source program - Crimson/Emerald Editor" target="_new">*</a>) and saving them with <b>appropriate extensions (.csv,.xml,.html)</b> you can use them, to import your favorites automatically into almost all Web Browsers, Spreadsheets,Databases, WYSIWYG editors and many internet services/applications.</p>'+
	'<p>&nbsp;&nbsp;You can also <b>easily utilize the XML output (or the .csv if you like) to further manipulate favorites in any imaginable way</b> by writing custom proccessor scripts/programs. I am planning to create a custom PHP powered WordPress plugin that will consume and pre-proccess the XML to create blog posts but <b>I am sure that here are many more, more talented (and experienced) SU Community members than me, so I am eagerly waiting your feedback including , but not limited to,other solutions,suggestions new ideas and source code contributions</b>.</p>'+
	'<p>&nbsp;&nbsp;&nbsp;&nbsp;<i>Notes:<ol><li>&nbsp;&nbsp;The export operation can last a while,<b>do not close this window and save/close important documents until this conversion is completed</b>.</li>'+
	'<li style="color:red">&nbsp;&nbsp;This export operation puts an ubnormaly large load on SU servers so <u>behave responsibly and  do not run it frequently</u></li>'+
	'<li>&nbsp;&nbsp;This script <b>is</b> compatible with <b>both new & old</b> SU interfaces (Switch to: <a href="http://www.stumbleupon.com/promo_userv2.php?optin">NEW</a>|<a href="http://www.stumbleupon.com/promo_userv2.php?optout&return">OLD</a>)</li>'+
  '<li>&nbsp;&nbsp;The export proccess is <b>much more faster</b> when using the old SU interface! You can switch interfaces using the OLD/NEW links above!</li>'+
	'<li>&nbsp;&nbsp;This script is released under the <a href="http://www.gnu.org/copyleft/gpl.html" target="_new"><u>GNU GPL license</u></a>.</li></ol></i></p>';
	md.innerHTML += '<p class="listPagination" style="margin-left:5px;font-size:12px;">' +
	'</p></td></tr></tbody></table>' +
	'<center><h2 id="st1">Loading</h2><hr /><small>**** Patience is a virtue ;-) ****<br />'+
	'While you are waiting , if you consider this script and my (time consuming & quite straining efforts) worthy enough, you can show your support/appreciation by donating (a small gift/treat) via Paypal. I have spent many days writing and testing this GreaseMonkey script and tried my best to provide advanced features,adequate stability, and an marginally ;-) usable GUI!<br />'+
	'<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_new">' + 
	'<input type="hidden" name="cmd" value="_s-xclick">' +
	'<input type="image" src="http://www.ngtech.gr/blog/img_src/donate.png?&v='+my_ver+'" border="0" name="submit" alt="Donate via PayPal - it is fast, free and secure!">'+
	'<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">' +
	'<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">'+
	'</form>'+
	'</small><hr /><p id="st2">Please Wait...</p>'+
	'<input type="button" name="btstart" value="Start" id="btstart">'+
	'&nbsp;&nbsp;<input type="button" name="btcancel" value="Cancel" id="btcancel">'+
	'&nbsp;&nbsp;<input type="button" name="btuinfo" value="User Info" id="btuinfo">'+
	'&nbsp;&nbsp;<input type="button" name="btexit" value="Exit" id="btexit">'+
	'<hr />Copyright 2006-07 Nick Georgakis (<a href=\'http://www.ngtech.gr\' target=\'_blank\'>www.ngtech.gr</a>)<hr />\n'+
	'<input type="checkbox" name="chk_exp_csv" value="1" checked="checked" id="chk_exp_csv">-Output&nbsp;CSV&nbsp;&nbsp;<input type="checkbox" name="chk_exp_xml" value="1" checked="checked" id="chk_exp_xml">-Output&nbsp;XML,<input type="checkbox" name="chk_exp_bmarks" value="1" checked="checked" id="chk_exp_bmarks">-Output&nbsp;bookmarks.html<br /><h6 id="the_csv" >CSV File Output: <a href="#exp_main">Top</a></h6>'+
	'<textarea id="txtout_csv" style="width:95%;height:160px;background:white;overflow:scroll;text-align:left;font-size: 0.8em;visibility:hidden"></textarea>\n'+
	'<h6 id="the_xml">XML File Output: <a href="#exp_main">Top</a></h6>'+
	'<textarea id="txtout_xml" style="width:95%;height:160px;background:white;overflow:scroll;text-align:left;font-size:0.8em;visibility:hidden"></textarea>\n'+
	'<h6 id="the_bmarks">bookmarks.html file Output: <a href="#exp_main">Top</a></h6>'+
	'<textarea id="txtout_bmark" style="width:95%;height:160px;background:white;overflow:scroll;text-align:left;font-size:0.8em;visibility:hidden"></textarea></center>\n'+
	'<div style="visibility:hidden;width:99%;height:10px;overflow:scroll;" id="thedata" align="center">'+
	'</div><hr />' + "<p><i>Stumble Upon Information\nUser Status=[" + sStatus + "]\nUser Name = [" + sName + "]\nUser ID = ["+sID+"]\nUser Pass = ["+sPass+"]</i></p>"+
	'<hr />';

	document.body.appendChild(cd);
	document.body.appendChild(md);
	loadHandler();
}

function hideModal(){
	document.body.removeChild(cd);
	document.body.removeChild(md);
}

//showModal();

function loadHandler(){
	//Function to be called on document load
	document.getElementById('st1').innerHTML = 'Welcome';
	document.getElementById('st2').innerHTML = 'Click the [Start] button below to begin the export process.';
	document.getElementById('btcancel').disabled = true;
	
	//Add onclick functions
	unsafeWindow.document.getElementById('btstart').onclick = BtnClick_btstart_Handler;
	unsafeWindow.document.getElementById('btcancel').onclick = BtnClick_btcancel_Handler;
	unsafeWindow.document.getElementById('btuinfo').onclick = BtnClick_btuinfo_Handler;
	unsafeWindow.document.getElementById('btexit').onclick = BtnClick_btexit_Handler;
	unsafeWindow.document.getElementById('close_cp').onclick = BtnClick_btexit_Handler;
}

var saTags_IDs = Array();
var saTags_Names = Array();
var saTags_Counts = Array();

var iState = 0;
var iStateTimeout = 500;
var iStateTimeoutKey;
var StateVar_cTag=0;
var StateVar_cPage=0;
var StateVar_cBookMarksPerPage=10;

function decodeSUTimeStamp(sDate){
	var aMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var theDate = new Date();
	//Check if it is Today 
	var s2=sDate;
	if(sDate.indexOf(':') < 4){
		//GetTime 
		s2=sDate;
	}else{
		//Get Month & Day 
		var s1 = sDate.substring(0,3);
		for(n=0;n<12;n++){if(s1==aMonths[n]){theDate.setMonth(n)}};
		//Get Time & Year 
		var spos1 = sDate.indexOf(',') + 2;
		var spos2 = sDate.indexOf(',',spos1) + 1;
		var spos3 = sDate.indexOf(' ') + 1;
		theDate.setDate(parseInt(sDate.substring(spos3,spos1)));
		if(spos2 != 0){s2=sDate.substring(spos1,spos2);theDate.setYear(parseInt(sDate.substring(spos2)));}else{s2=sDate.substring(spos1);};
	}
	//Parse Time 
	var spos3 = s2.indexOf(':');
	var iHours = parseInt(s2.substring(0,spos3));
	var iMins = parseInt(s2.substring(spos3+1,s2.length-2));
	theDate.setMinutes(iMins);
	if(s2.substring(s2.length-2)=='pm'){theDate.setHours(iHours + 12);}else{theDate.setHours(iHours);};
	return theDate;
}

function decodeSUTimeStampNEW(sDate){
	var aMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var theDate = new Date();
  //Try to get Year & Month & Day & Time
  var aRres = /(.{3})(?:\s)(\d+)(?:\,\s)(\d{4})(?:\s)(\d+)(?::)(\d+)(am|pm)/.exec(sDate); 
	sAmPm='';
	var iHours = 0;
	var iMins = 0;
	if(aRres==null){
		//Try to Get Month & Day & Time
		aRres = /(.{3})(?:\s)(\d+)(?:\,\s)(\d+)(?::)(\d+)(am|pm)/.exec(sDate);
		if(aRres==null){
			//Then todays date
			aRres = /(\d+)(?::)(\d+)(am|pm)/.exec(sDate);
			//Date object has already cuurent Month & Day & year
			//Parse Time 
			iHours = parseInt(aRres[1]);
			iMins = parseInt(aRres[2]);
			sAmPm = aRres[3];
		}else{
			//Date inside current year
			//Date object has already current year
		  //Get Month
			for(n=0;n<12;n++){if(aRres[1]==aMonths[n]){theDate.setMonth(n)}};
			//Get Day
			theDate.setDate(parseInt(aRres[2]));
			//Parse Time 
			iHours = parseInt(aRres[3]);
			iMins = parseInt(aRres[4]);
			sAmPm = aRres[5];
		}	
	}else{
	  //Get Month
		for(n=0;n<12;n++){if(aRres[1]==aMonths[n]){theDate.setMonth(n)}};
		//Get Day & Year 
		theDate.setDate(parseInt(aRres[2]));
		theDate.setYear(parseInt(aRres[3]));
		//Parse Time 
		iHours = parseInt(aRres[4]);
		iMins = parseInt(aRres[5]);
		sAmPm = aRres[6];
	}
	theDate.setMinutes(iMins);
	if(sAmPm=='pm'){theDate.setHours(iHours + 12);}else{theDate.setHours(iHours);};
	return theDate;
}

function BtnClick_btuinfo_Handler(){
	//Function to be called on User Info Button Click
	alert("Stumble Upon Information\n - User Status = [" + sStatus + "]\n - User Name = [" + sName + "]\n - User ID = ["+sID+"]\n - User Pass = ["+sPass+"]");
}

function BtnClick_btcancel_Handler(){
	//Function to be called on Cancel Button Click
	document.getElementById('btcancel').disabled = true;
	document.getElementById('btuinfo').disabled = false;
	document.getElementById('btexit').disabled = false;
	iState = -1;
}

function ProcState_6(){
	//Got Tags in new SU Interface
	document.getElementById('st2').innerHTML = 'Scanning Tags...';
	
		var MyTagsList = document.getElementById('fullTagCloud').childNodes[1];
		var TheTags = MyTagsList.getElementsByTagName('li');
		var cTag = TheTags.length -1;
		for(i=0;i<=cTag;i++){
				saTags_Names[i] = TheTags[i].firstChild.text;
				saTags_IDs[i] = ''; //Not Available - used in new UI
				saTags_Counts[i] = TheTags[i].firstChild.title.match(/\d+/)
		}
		document.getElementById('st2').innerHTML = 'Loaded <b>' + cTag + '</b> tags/categories.<br><small>Initializing please wait...</small>';
		if(cTag <=0){
			iState = -2;
			iStateTimeout = 100;
		}else{
			iState = 7;
			iStateTimeout = 1000;		
		}		
}

function ProcState_7(){
	//Loaded tags - start output

	//Reset buffers
	obuf_1 = new Array();
	obuf_2 = new Array();
	obuf_3 = new Array();
	  	
	var theDate = new Date();
	document.getElementById('txtout_csv').value = '';
	obuf_3.push('<!-- Generated by Nick Georgakis Extreme SU Exporter v'+my_ver+' (http://www.ngtech.gr/) on ' + Date() + ' -->\n');
	//Add root document elements
	obuf_1.push('<?xml version="1.0" encoding="utf-8"?>\n' +
	'<!-- Generated by Nick Georgakis Extreme SU Exporter v'+my_ver+' (http://www.ngtech.gr/) on ' + Date() + ' -->\n'+
	'<favorites>\n');//+
	//'\t<category id="'+ saTags_IDs[StateVar_cTag] + '" name="' + saTags_Names[StateVar_cTag] + '" count="' + saTags_Counts[StateVar_cTag] + '">\n');
	document.getElementById('txtout_xml').value = '';		
	obuf_2.push('<!DOCTYPE NETSCAPE-Bookmark-file-1>\n'+
					'<TITLE>SU Bookmarks</TITLE>\n'+
					'<!-- Generated by Nick Georgakis Extreme SU Exporter v'+my_ver+' (http://www.ngtech.gr/) on ' + Date() + ' -->\n'+
					'<META HTTP-EQUIV="Content-Type= CONTENT="text/html; charset=UTF-8">\n'+
					'<H1 LAST_MODIFIED="'+Math.floor(theDate.getTime()/1000)+'">Bookmarks</H1>\n'+
					'\n'+
					'<DL><p>\n'+
    			'\t<DT><H3 ADD_DATE="'+Math.floor(theDate.getTime()/1000)+'" LAST_MODIFIED="'+Math.floor(theDate.getTime()/1000)+'">'+ sName +'\'s SU favorites</H3>\n'+
    			'\t<DD>Import generated by Nick Georgakis Extreme SU Exporter! Visit www.ngtech.gr for more ...\n'+
    			'\t<DT><A HREF="http://www.ngtech.gr" ADD_DATE="' + Math.floor(theDate.getTime()/1000) + '">Visit www.ngtech.gr !</A>\n'+
    			'\t<DD>Nick Georgakis is guilty of adding this ;-) for www.ngtech.gr</A>\n'+
    			'\t<DL><p>\n');
  document.getElementById('txtout_bmark').value = '';									

  //Start Proccessing First Tag
	StateVar_cTag = 0;
	iState = 1;
	iStateTimeout = 100;
}

function ProcState_0(){
	//GM_log('State 0');
	//Begin Export
	document.getElementById('btcancel').disabled = false;
	document.getElementById('btuinfo').disabled = true;
	document.getElementById('btexit').disabled = true;
	
	//Get Tags
	document.getElementById('st1').innerHTML = 'Processing';
	if(newSUUI == 0){
		var MyTagsList = document.getElementById('changetag');
		var TheTags = MyTagsList.getElementsByTagName('OPTION');
		var cTag = 0;
		for(i=0;i<TheTags.length;i++){
			if((spos=TheTags[i].text.indexOf("\xB7"))!=-1){
				//This is executed only if it is a tag
				saTags_Names[cTag] = TheTags[i].text.substring(0,spos);
				saTags_IDs[cTag] = TheTags[i].id;
				saTags_Counts[cTag] = TheTags[i].text.substring(spos+1);
				cTag++;
			}
		}
		
		document.getElementById('st2').innerHTML = 'Loaded <b>' + cTag + '</b> tags/categories.';
		
		if(cTag <=0){
			iState = -2;
		}else{
			iStateTimeout = 1000;
			iState = 7;		
		}
	}else{
		//New SU Interface
		GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://' + sName + '.stumbleupon.com/tags/',
	    headers: {
	        'User-agent': 'User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6',
	        'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
	    },
	    onload: function(responseDetails) {
		    document.getElementById('thedata').innerHTML = responseDetails.responseText;
				if(iState != -1){
					iState = 6;
					iStateTimeout = 100;
					clearTimeout(iStateTimeoutKey);
					setTimeout(BtnClick_btstart_Handler,iStateTimeout);
				}
			}
		});
		document.getElementById('st2').innerHTML = 'Retrieving Tags...';
		//Setting Max Timeout
		iStateTimeout = max_AJAX_timeout*2;
		iState = -2;
		return;
	}	
}

function ProcState_1(){
	//GM_log('State 1');
	//Start Proccessing Tag marked in : StateVar_cTag
	if(StateVar_cTag < (saTags_IDs.length - 1)){
		StateVar_cPage=0;
		iState = 2;
		iStateTimeout = 20 + Math.floor(Math.random()*4000*wait_factor);
		document.getElementById('st2').innerHTML = 'Processing Tag (' + StateVar_cTag + '/' + (saTags_IDs.length - 1) + ' - ' + ((StateVar_cTag*100)/(saTags_IDs.length - 1) + ' ').substring(0,5) + '%)<br><b>' + saTags_IDs[StateVar_cTag] + ' - ' + saTags_Names[StateVar_cTag] + '</b><br><small>Waiting ' + iStateTimeout + ' ms to avoid server overload</small>';
		if(StateVar_cTag > 0){
			if (document.getElementById('chk_exp_xml').checked){obuf_1.push('\t</category>\n');}
			if (document.getElementById('chk_exp_bmarks').checked){obuf_2.push('\t</DL><p>\n');}	
		}
		//Add new XML Category tag
		if (document.getElementById('chk_exp_xml').checked){obuf_1.push('\t<category id="' + saTags_IDs[StateVar_cTag] + '" name="' + saTags_Names[StateVar_cTag] + '" count="' + saTags_Counts[StateVar_cTag] + '">\n');}
		var theDate = new Date();
		if (document.getElementById('chk_exp_bmarks').checked){obuf_2.push('\t\t<DT><H3 ADD_DATE="'+ Math.floor(theDate.getTime()/1000) +'" LAST_MODIFIED="'+Math.floor(theDate.getTime()/1000)+'">'+ saTags_Names[StateVar_cTag] +'</H3>\n\t\t<DL><p>\n');}
	}else{
		//Finished !
		StateVar_cTag=0;
		iState = 100;
		iStateTimeout = 100;
		//Close XML document elements
		if (document.getElementById('chk_exp_xml').checked){obuf_1.push('\t</category>\n</favorites>\n');}
		if (document.getElementById('chk_exp_bmarks').checked){obuf_2.push('\t</DL><p>\n</DL><p>');}
	}	
}
	
function ProcState_2(){
	//GM_log('State 2');
	//Download the current page for the current tag: StateVar_cTag
	//Generate dots ... 
	sDots='';
	sUrl='';
	sVars='';
	for(i=0;i<(StateVar_cPage+1);i++){sDots+='.';}		//Update Status
	document.getElementById('st1').innerHTML = 'Processing'; 
	document.getElementById('st2').innerHTML = 'Processing Tag (' + StateVar_cTag + '/' + (saTags_IDs.length - 1) + ' - ' + ((StateVar_cTag*100)/(saTags_IDs.length - 1) + ' ').substring(0,5) + '%) ' + sDots + '<br><b>' + saTags_IDs[StateVar_cTag] + ' - ' + saTags_Names[StateVar_cTag] +' (' + saTags_Counts[StateVar_cTag] + ' items)</b><br><small>Downloading Page '+(StateVar_cPage+1)+'</small> ';
	//Generate URL 
	if(newSUUI == 0){	
		if(StateVar_cPage==0){
			sUrl='http://'+sName+'.stumbleupon.com/display_urls.php';
			sVars='id='+sID+'&mode=3&tagid=' + saTags_IDs[StateVar_cTag] ;
		}else{
			sUrl='http://'+sName+'.stumbleupon.com/display_urls.php';
			sVars='id='+sID+'&mode=3&offset='+ (StateVar_cPage * StateVar_cBookMarksPerPage) +'&tagid=' + saTags_IDs[StateVar_cTag];
		}
		sUrl+='?'+sVars;
	}else{
		if(use_CORAL_CDN){
			if(StateVar_cPage==0){
				sUrl='http://'+sName+'.stumbleupon.com/tag/' + saTags_Names[StateVar_cTag]+ '/';
			}else{
				sUrl='http://'+sName+'.stumbleupon.com/tag/' + saTags_Names[StateVar_cTag]+ '/' + (StateVar_cPage * StateVar_cBookMarksPerPage) + '/';	
			}
		}else{
			if(StateVar_cPage==0){
				sUrl='http://'+sName+'.stumbleupon.com.nyud.net/tag/' + saTags_Names[StateVar_cTag]+ '/';
			}else{
				sUrl='http://'+sName+'.stumbleupon.com.nyud.net/tag/' + saTags_Names[StateVar_cTag]+ '/' + (StateVar_cPage * StateVar_cBookMarksPerPage) + '/';	
			}
		}
	}		
	GM_xmlhttpRequest({
    method: 'GET',
    url: sUrl,
    headers: {
        'User-agent': 'User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6',
        'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
    },
    onload: function(responseDetails) {
	    document.getElementById('thedata').innerHTML = responseDetails.responseText;
			if(iState > 0){
				iState = 4;
				iStateTimeout = 100;
				clearTimeout(iStateTimeoutKey);
				setTimeout(BtnClick_btstart_Handler,iStateTimeout);
			}
		}
	});

	//Setting Max Timeout
	iStateTimeout = max_AJAX_timeout;
	iState = 3;
}

function ProcState_3(){
	//GM_log('State 3');
	//AJAX Call Failed Notify & Bail Out ...
	document.getElementById('st1').innerHTML = ':-( Error';
	document.getElementById('st2').innerHTML = 'AJAX Call Failed while processing Tag (' + StateVar_cTag + '/' + (saTags_IDs.length - 1) + ' - ' + ((StateVar_cTag*100)/(saTags_IDs.length - 1) + ' ').substring(0,5) + '%)<br><b>' + saTags_IDs[StateVar_cTag] + ' - ' + saTags_Names[StateVar_cTag] + '</b><br>';
	if(AJAX_retries > max_AJAX_retries){
		StateVar_cTag=0;
		iStateTimeout = -1;
		iState = -1;
	}else{
		iStateTimeout = 1000;
		iState = 5;
		AJAX_retries++;
	}	
}

function TrimStr(text){
	//Trim NewLines & Whitespaces
	return text.replace(/^[\s\n]+|[\s\n]+$/g, '');
}
function ProcState_4(){
	//GM_log('State 4');
	AJAX_retries = 0;
	//AJAX Call Succeded Generate BookMark Source Code
	document.getElementById('st2').innerHTML = 'Processing Tag (' + StateVar_cTag + '/' + (saTags_IDs.length - 1) + ' - ' + ((StateVar_cTag*100)/(saTags_IDs.length - 1) + ' ').substring(0,5) + '%)<br><b>' + saTags_IDs[StateVar_cTag] + ' - ' + saTags_Names[StateVar_cTag] + ' (' + saTags_Counts[StateVar_cTag] + ' items)</b><br><small>Extracting links ...</small>';
	//Getting the links
	var tmp1 = document.getElementById('thedata').getElementsByTagName('a');
	var sOut  = '';
	var sOut2 = '';
	var sOut3 = '';
	var sOut3a = '';
	var sOut3b = '';
	var tmp3 = '';
	var mval = new Array();
	for(i=0;i<tmp1.length;i++){
	  //Find those who have the rel='nofollow' attribute
		if(tmp1[i].rel=='nofollow'){
			sOut+= saTags_IDs[StateVar_cTag]+ ',\''+ saTags_Names[StateVar_cTag]+ '\',';
			sOut+= '\''+ TrimStr(tmp1[i].text) + '\',\''+ tmp1[i].href+ '\'';
			//Add new XML favorite tag
			sOut2+= '\t\t<favorite title="'+TrimStr(tmp1[i].text) +'" url="' + tmp1[i].href + '"';
			sOut3a= '\t\t\t<DT><A HREF="' + tmp1[i].href + '"';
			sOut3b ='';
			
			if(newSUUI == 0){			 
				var tmp2 = tmp1[i].parentNode.parentNode.parentNode.getElementsByTagName('span');
				for(j=0;j<tmp2.length;j++){
					//Get the link Date 
					if(tmp2[j].className=='date'){
						sOut+= ',\'' + tmp2[j].innerHTML + '\'';
						//Continue XML favorite element 
						sOut2 += ' date_su="' +  tmp2[j].innerHTML + '" ';
						var jDate = decodeSUTimeStamp(tmp2[j].innerHTML);
						sOut+= ',' + jDate.getTime() + ',\''+ jDate.toLocaleString() +'\'';
						//Continue XML favorite element 
						sOut2 += 'date_unix="' + jDate.getTime() + '" date_local="' + jDate.toLocaleString()+'" ';
						sOut3a += ' ADD_DATE="' + Math.floor(jDate.getTime()/1000) + '"';
					}
					//Get other link tags skip empty ones
					if(tmp2[j].firstChild!=null && tmp2[j].className=='mini' && tmp2[j].firstChild.localName=='A'){;
						sOut+= ',\'';
						sOut3b+=''; 
						//Continue XML favorite element 
						sOut2 += 'tags="'; 					
						var tmp3 = tmp2[j].childNodes;
						for(k=0;k<tmp3.length;k++){
							if(tmp3[k].localName=='A'){
								//Continue XML favorite element 
								sOut2+= tmp3[k].text +',';
								sOut3b+= tmp3[k].text +',';
								sOut+=tmp3[k].text + ';'
							}
						}
						sOut=sOut.substring(0,sOut.length-1) + '\'';
						//Continue XML favorite element
						sOut2= sOut2.substring(0,sOut2.length-1);
						sOut3b = sOut3b.substring(0,sOut3b.length-1)
					}
				}
			}else{
				//TODO: Add Description support
				var tmp2 = tmp1[i].parentNode.parentNode.childNodes[3];
				//Get the link Date,Review Count and Tags
				//mval = /(<img.+>)(?:\s+)(.+)(?:\s+)(?:<img.+>\s+.+">)(\d+)(?:.+)(?:<\/a>)(?:\s+)(?:<img.+>\s+.+">)([.\,]+)(?:<\/a>)/.exec(tmp2.innerHTML);
				GM_log(tmp2.innerHTML);
				//Regexp for all except todays stumble
				mval = /(?:<img.+>)(?:\s+)(.+)(?:\s+)(?:[.\s]+)(?:.+\s+)(?:<img.+>)(?:\s+)(?:.+">)(\d+)/.exec(tmp2.innerHTML);
				if((mval==null)||(typeof(mval)=="undefined")){
					//Todays stumble
					mval = /(?:\s+)(.+)(?:\s+)(?:[.\s]+)(?:.+\s+)(?:<img.+>)(?:\s+)(?:.+">)(\d+)/.exec(tmp2.innerHTML);
				}	
				//mval[1] = Date 
				sOut+= ',\'' + mval[1] + '\'';
				//Continue XML favorite element 
				sOut2 += ' date_su="' +  mval[1] + '" ';
				var jDate = decodeSUTimeStampNEW(mval[1]);
				sOut+= ',' + jDate.getTime() + ',\''+ jDate.toLocaleString() +'\'';
				//Continue XML favorite element 
				sOut2 += 'date_unix="' + jDate.getTime() + '" date_local="' + jDate.toLocaleString()+'" ';
				sOut3a += ' ADD_DATE="' + Math.floor(jDate.getTime()/1000) + '"';
				sOut += ','+mval[2]+',\'';
				//mval[2] = Number of reviews
				tmp3 = tmp2.getElementsByTagName('a');
				sOut3b+=''; 
				//Continue XML favorite element 
				sOut2 += ' revno="'+ mval[2] + '" tags="'; 		
				for(k=0;k<tmp3.length;k++){
					if(tmp3[k].href.substring(0,31)=='http://www.stumbleupon.com/tag/'){
						//Continue XML favorite element 
						sOut2+= tmp3[k].text +',';
						sOut3b+= tmp3[k].text +',';
						sOut+=tmp3[k].text + ','
					}
				}
				sOut=sOut.substring(0,sOut.length-1) + '\'';
				//Continue XML favorite element
				sOut2= sOut2.substring(0,sOut2.length-1);
				sOut3b = sOut3b.substring(0,sOut3b.length-1)				
			  sOut+= '\n';
			  //Continue XML favorite element
			  sOut2+= '" />\n';
			  sOut3+=sOut3a + '>' + TrimStr(tmp1[i].text) + '</A>\n'+
			  '\t\t\t<DD> '+mval[2]+' Reviews Tags: (' + sOut3b + ')\n'; 					 					
		  }	
		}
	}

	if (document.getElementById('chk_exp_csv').checked){obuf_3.push(sOut);}	
	if (document.getElementById('chk_exp_xml').checked){obuf_1.push(sOut2);}
	if (document.getElementById('chk_exp_bmarks').checked){obuf_2.push(sOut3);}
	//Check if there are any more pages 
	if(saTags_Counts[StateVar_cTag] > ((StateVar_cPage + 1) * StateVar_cBookMarksPerPage)){
		//More pages to get for the current tag
		StateVar_cPage++;
		iStateTimeout = 10 + Math.floor(Math.random()*2000*wait_factor);
		iState = 2;
		document.getElementById('st2').innerHTML = 'Processing Tag (' + StateVar_cTag + '/' + (saTags_IDs.length - 1) + ' - ' + ((StateVar_cTag*100)/(saTags_IDs.length - 1) + ' ').substring(0,5) + '%)<br><b>' + saTags_IDs[StateVar_cTag] + ' - ' + saTags_Names[StateVar_cTag] + ' (' + saTags_Counts[StateVar_cTag] + ' items)</b><br><small>Links OK! - Waiting ' + iStateTimeout + ' ms to avoid server overload</small>';		
	}else{
		//No more pages left - Get next tag
		StateVar_cTag++;
		StateVar_cPage=0;
		iStateTimeout = 10;
		iState = 1;
	}
}

function ProcState_5(){
	//GM_log('State 5');
	//Retry last AJAX Call ...
	document.getElementById('st1').innerHTML = 'Retrying ('+AJAX_retries+'/'+ max_AJAX_retries+')';
	document.getElementById('st2').innerHTML = 'Restarting on tag (' + StateVar_cTag + '/' + (saTags_IDs.length - 1) + ' - ' + ((StateVar_cTag*100)/(saTags_IDs.length - 1) + ' ').substring(0,5) + '%)<br><b>' + saTags_IDs[StateVar_cTag] + ' - ' + saTags_Names[StateVar_cTag] + '</b><br>';
	iStateTimeout = 1000;
	iState = 2;
}

function BtnClick_btstart_Handler(){
	//Function to be called on Start Button Click
	clearTimeout(iStateTimeoutKey);		//document.getElementById('txtout').value += 'State '+iState+'\n';
	switch(iState)
	{
	case 0:
		ProcState_0();
	break;
	case 1:
		ProcState_1();
	break;
	case 2:
		ProcState_2();
	break;
	case 3:
		ProcState_3();
	break;
	case 4:
		ProcState_4();
		break;		
	case 5:
		ProcState_5();		
		break;
	case 6:
		ProcState_6();		
		break;
	case 7:
		ProcState_7();		
		break;				
	case 100:
		document.getElementById('st1').innerHTML = 'Creating Output';
		document.getElementById('st2').innerHTML = 'We have almost finished ! :-)<br />Preparing final output for display and freeing memory ...';
		document.getElementById('txtout_csv').value = obuf_3.join('');
		obuf_3 = '';
		document.getElementById('txtout_csv').style.visibility = 'visible';		
		document.getElementById('txtout_xml').value = obuf_1.join('');
		obuf_1 = '';
		document.getElementById('txtout_xml').style.visibility = 'visible';
		document.getElementById('txtout_bmark').value = obuf_2.join('');
		obuf_2 = '';
		document.getElementById('txtout_bmark').style.visibility = 'visible';		
		document.getElementById('st1').innerHTML = 'Finished';
		document.getElementById('st2').innerHTML = 'Use Right Click -> Select all Right Click -> Copy to select all text below  and copy it to clipboard and then paste it to your favorite text editor.<br />Save them as a csv xml or html files and enjoy ...';
		iState=0;
		iStateTimeout = -1;
		document.getElementById('btcancel').disabled = true;
		document.getElementById('btuinfo').disabled = false;
		document.getElementById('btexit').disabled = false;
		document.getElementById('btstart').disabled = true;
	break;
	case -1:
	  document.getElementById('st1').innerHTML = 'Canceled';
		document.getElementById('st2').innerHTML = 'Click the [Start] button below to start again';
		iState=0;
		iStateTimeout = -1;
	break;
	case -2:
	  document.getElementById('st1').innerHTML = 'Aborting';
		document.getElementById('st2').innerHTML = 'No Tags Found !!! - Click the [Start] button below to start again';
	default:
		iState=0;
		iStateTimeout = -1;
	}
	if (iStateTimeout > 0){iStateTimeoutKey = setTimeout(BtnClick_btstart_Handler,iStateTimeout);}
}

function BtnClick_btexit_Handler(){
		hideModal();
}
