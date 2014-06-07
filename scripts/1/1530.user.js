/*
    Adds a little AJAX to the WebMail
    Vivek Jishtu, vivekjishtu@vasacorp.com
    http://viamatic.com

    Copy, use, modify, spread as you see fit.
	Incase you want to add AJAX to your site 
	contact vivekjishtu@vasacorp.com
	
	If you are from yahoo.. and want to hear about 
	other ideas that can completely transform the
	website do get in touch and I will be glad to share 
	my ideas with you.
	
	Version: 0.2
	
	1) Support for Instant Mail
	2) Remove global namespace pollution
	3) Spell Checker if possible :)
*/

// ==UserScript==
// @name          AJAX Yahoo! Mail (Viamatic Webmail++)
// @namespace     http://firefox.viamatic.com/
// @description	  Adds AJAX support to the current Yahoo! mail and makes it more usable
// @include       http://*.mail.yahoo.*/*
// ==/UserScript==


/*  Viamatic Http Class
 *  Copyright (c) 2005 Viamatic Softwares Inc.
 */
function ViamaticHTTP()
{
	var m_xmlHttp = new XMLHttpRequest(); // Change this to make it cross platform
	var thisObject = this;
	
	this.CallBack 	  = function() {}	
	this.readyState   = function() { return m_xmlHttp.readyState; }
	this.status		  = function() { return m_xmlHttp.status; }
	this.responseText = function() { return m_xmlHttp.responseText; }
	this.XmlHttp      = function() { return m_xmlHttp; }
	
	this.Get = function(sUrl)
	{	
		m_xmlHttp.onreadystatechange = thisObject.CallBack;
		m_xmlHttp.open("GET", sUrl, true);
		m_xmlHttp.send(null);
	}
	
	this.Post = function(sUrl, sPostData)
	{
		if (sPostData == undefined) sPostData = "";
		m_xmlHttp.onreadystatechange = thisObject.CallBack;
		m_xmlHttp.open("POST", sUrl, true);
		m_xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
		m_xmlHttp.send(sPostData);
	}
	
	this.Abort = function()
	{
		m_xmlHttp.abort();
	}
}

/*
 *  Do not use the ViamaticLibrary class in your projects without
 *  permission. For more information goto http://viamtic.com/
 *  Copyright (c) 2005 Viamatic Softwares Inc.
 */
function ViamaticLibrary()
{

//public: 
	// *************************************************************************
	// getElementByClassName (sClassName) - Returns element with the class name
	// *************************************************************************
	this.getElementByClassName = function(sClassName, doc)
	{
		if(!doc) doc = document;
		var alltags = doc.getElementsByTagName("*");
		
		for (var i=0; i<alltags.length; i++)
		{
			if (alltags[i].className == sClassName) 
			{
				return alltags[i];
				break;
			}
		}
	}
	
	// *************************************************************************
	// selectNodes(doc, context, xpath) - Returns array of elements
	// *************************************************************************
	this.selectNodes = function(doc, context, xpath) 
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	   {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}
	
	this.Trim = function(str) 
	{ 
		return str.replace(/^\s*|\s*$/g,""); 
	}

	this.GetStringBetween = function(sSource, sStart, sEnd)
	{
		var nStart = sSource.indexOf(sStart);
		var nEnd = sSource.indexOf(sEnd, nStart + sStart.length);
		
		if(nStart == -1 || nEnd == -1) return "";
		
		return sSource.substring(nStart + sStart.length , nEnd);	
	}
	
	//
	// This code is from http://jaffa.sourceforge.net/documentation/presentation/howto/crossBrowser.html
	//
	/*
	this.innerText(el)
	{
		var str = ""
		for (var i=0; i<el.childNodes.length; i++) 
		{
		  switch (el.childNodes.item(i).nodeType) 
		  {
			case 1: //ELEMENT_NODE
			  str += getInnerText(el.childNodes.item(i));
			  break;
			case 3: //TEXT_NODE
			   str += el.childNodes.item(i).nodeValue;
			   break;
		  }
		}
		return str;
	}
	*/
	
	//
	// Original source http://radio.javaranch.com/pascarello/2005/01/14/1105721395000.html
	//
	this.innerText = function(xStr)
	{
		xStr = xStr.innerHTML;
		var regExp = /<\/?[^>]+>/gi;
        xStr = xStr.replace(regExp,"");
        return xStr;
    }
	
	// ====================================================================
	//       URLEncode and URLDecode functions
	//
	// Copyright Albion Research Ltd. 2002
	// http://www.albionresearch.com/
	//
	// You may copy these functions providing that 
	// (a) you leave this copyright notice intact, and 
	// (b) if you use these functions on a publicly accessible
	//     web site you include a credit somewhere on the web site 
	//     with a link back to http://www.albionresarch.com/
	//
	// If you find or fix any bugs, please let us know at albionresearch.com
	// ====================================================================
	this.URLEncode = function(plaintext)
	{
		// The Javascript escape and unescape functions do not correspond
		// with what browsers actually do...
		var SAFECHARS = "0123456789" +					// Numeric
						"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
						"abcdefghijklmnopqrstuvwxyz" +
						"-_.!~*'()";					// RFC2396 Mark characters
		var HEX = "0123456789ABCDEF";
	
		var encoded = "";
		for (var i = 0; i < plaintext.length; i++ ) {
			var ch = plaintext.charAt(i);
			if (ch == " ") {
				encoded += "+";				// x-www-urlencoded, rather than %20
			} else if (SAFECHARS.indexOf(ch) != -1) {
				encoded += ch;
			} else {
				var charCode = ch.charCodeAt(0);
				if (charCode > 255) {
					alert( "Unicode Character '" 
							+ ch 
							+ "' cannot be encoded using standard URL encoding.\n" +
							  "(URL encoding only supports 8-bit characters.)\n" +
							  "A space (+) will be substituted." );
					encoded += "+";
				} else {
					encoded += "%";
					encoded += HEX.charAt((charCode >> 4) & 0xF);
					encoded += HEX.charAt(charCode & 0xF);
				}
			}
		} // for
	
		return encoded;		
	};
	var thisObject = this;
}

Viamatic = new Object();
//Viamatic.Folders = new Array();
Viamatic.Folder = new Object();
Viamatic.StringTable = new Object();
Viamatic.Globals = new Object();
Viamatic.Timers = new Object();
Viamatic.Util = new Object();
Viamatic.StdLib = new ViamaticLibrary();

function ViamaticWebMail()
{	
	var thisObject = this;
	
	// Add a few HTML content tags for telling the user what is hapenning
	Viamatic.Folder.ExtraHTML = function()
	{
		var statusLabel = document.createElement('div'); 		
		statusLabel.setAttribute('style', "background-color: #FFFFE1; visibility:hidden; display:inline; position:fixed; top:0px; right:0px; padding: 1px; text-align:center; z-index:0; font-size:11px; border: 1px solid #AFAFAF;");
		statusLabel.setAttribute('id', "divStatus");
		window.document.body.appendChild(statusLabel);
		
		//Viamatic.Util.CreateRSHost("rsHost");
		Viamatic.Util.CreateRSHost("rsQuickMail");     // Remote Scripting Host for Quick Mail
		Viamatic.Util.CreateRSHost("rsOpenFolder");    // Remote Scripting Host to change folders
		Viamatic.Util.CreateRSHost("rsGeneral");       // Remote Scripting Host for general stuff like deleting mails
		
		Viamatic.XmlHttp = new ViamaticHTTP();  // TOP Secret XmlHttp used for ShowImages() for silent download.
	}
	
	function ShowFolderMain()
	{
		if(window.parent.rsGeneral != undefined) return;
		// Fill the string table 
		Viamatic.StringTable.OLD_MSG_COLOR = "rgb(246, 246, 246)";
		Viamatic.StringTable.ERROR_MSG_VIEW = "<h2>Message Viewing Error</h2>";
		Viamatic.StringTable.STATUS_MSG_SENT = "<h2>Message Sent</h2>";
		//Global Variables <<-- Try and get rid of them
		//Viamatic.Globals.mainContentArea = Viamatic.StdLib.getElementByClassName("content");
		//Viamatic.Globals.folderListArea = window.document.getElementById("folderlist");	
		//Viamatic.Timers.errorMessageTimer = null;  // A variable to check how long we wish to show the error message.
		
		/* 
		//Need to add auto refresh to the code
		Viamatic.Timers.refreshWindowTimer = window.setTimeout("Viamatic.Timers.RefreshMail", 1000 * 60 * 4);
		*/

		// Add some Extra HTML elements into the page.
		Viamatic.Folder.ExtraHTML();
		Viamatic.Folder.ChangePageContent();
		
	}
	
	/* The entry point for our application.
	 * public static void main() 
	 */
	function main()
	{
		if(window.location.href.indexOf("ym/ShowFolder") != -1) ShowFolderMain();
	}
	
	/*
	 *  Create a remote scripting host (basically a IFRAME)
	 */
	Viamatic.Util.CreateRSHost = function(iframeName)
	{
		var myWindow=document.createElement('iframe');
		myWindow.setAttribute('id',iframeName);
		myWindow.setAttribute('name',iframeName);
		myWindow.style.border='0px';
		myWindow.style.width='0px';
		myWindow.style.height='0px';
		//myWindow.style.position = "absolute";
		return document.body.appendChild(myWindow);
	}
	
	Viamatic.Folder.ModifyDataTable = function()
	{
		var datatable = document.getElementById("datatable");
		if(datatable) 
		{
			var quickView = document.getElementById("ViamaticQuickView");
			if(!quickView)
			{
				var listviewTHs = datatable.getElementsByTagName("th");
				var headerTR = listviewTHs[0].parentNode;
				quickView = document.createElement('th');
				quickView.innerHTML = "";
				quickView.setAttribute('id', "ViamaticQuickView");
				headerTR.insertBefore(quickView, listviewTHs[0]);
			}
			var letterLinks = Viamatic.StdLib.selectNodes(window.document, window.document.body, "//A[contains(@href,'/ShowLetter')]");					
			for (var x=0; x<letterLinks.length; x++) Viamatic.Folder.CreateQuickViewLink(letterLinks[x]);
		}
	}
	
	Viamatic.Folder.ChangePageContent = function()
	{
		if(document.getElementById("datatable")) Viamatic.Folder.ModifyDataTable();
		Viamatic.Folder.ModifyFolderTags();
		
		var deleteButtonTop = document.getElementById("deletetop");
		var deleteButtonBottom = document.getElementById("deletebottom");
		if (deleteButtonTop) deleteButtonTop.onclick = Viamatic.Folder.DeleteMail; 
		if (deleteButtonBottom) deleteButtonBottom.onclick = Viamatic.Folder.DeleteMail; 
	}
	
	Viamatic.Folder.CreateQuickViewLink = function(letterLink)
	{
		var parentTR = letterLink.parentNode.parentNode;
		var checkboxs = parentTR.getElementsByTagName("input");
		
		if (checkboxs.length  == 0) return; 
		
		var quickView = document.getElementById(checkboxs[0].value);
	
		if(!quickView)
		{
			quickView = document.createElement('a');
			if(letterLink.href.indexOf("#attachments")) quickView.href = letterLink.href.replace("#attachments", "")
			else quickView.href = letterLink.href;
			quickView.setAttribute('id', checkboxs[0].value);
			quickView.innerHTML = " <img src='http://us.i1.yimg.com/us.yimg.com/i/us/plus/csp/cn/norgie_closed_dna.gif' border=0 />  ";
	
			var quickViewTD = document.createElement('td');
			quickViewTD.appendChild(quickView);
			checkboxs[0].parentNode.parentNode.insertBefore(quickViewTD, checkboxs[0].parentNode);
		}
		quickView.onclick = Viamatic.Folder.OpenQuickMail;
		
	}
	

	
	Viamatic.OpenMail = function()
	{
		Viamatic.Globals.selectedTR = this.parentNode.parentNode;
		Viamatic.Globals.openMailURL = this.href;		
		var rsHost = document.getElementById("rsHost");
		rsHost.onload = Viamatic.OpenMail_OnLoad;
		rsHost.src = this.href;
		Viamatic.ShowBusy();
		return false;
	}
	
	Viamatic.OpenMail_OnLoad = function()
	{
		if (Viamatic.Globals.selectedTR.className == "msgnew") Viamatic.MarkMessageAsRead();
		
		Viamatic.SetStatusVisible(false);
		var rsHost = document.getElementById("rsHost");
			
		if(rsHost.contentDocument.body.innerHTML.indexOf(Viamatic.StringTable.ERROR_MSG_VIEW) != -1) 
		{
			Viamatic.MessageViewingError();
			return false;
		}
				
		if(Viamatic.Timers.errorMessageTimer) Viamatic.HideErrorMessage();
				
		Viamatic.Globals.selectedTR.className = "";
		Viamatic.Globals.messageCache = rsHost.contentDocument.body.innerHTML;
				
		Viamatic.Globals.folderView = Viamatic.Globals.mainContentArea.innerHTML;
		Viamatic.SyncViews(rsHost); 
		var selectedFolder = Viamatic.StdLib.getElementByClassName("selected");
		selectedFolder.getElementsByTagName("a").item(0).onclick = Viamatic.BackToEmails;
		Viamatic.Folder.MakeDomChanges();
		Viamatic.SetStatusVisible(false);
		
		var content = Viamatic.StdLib.getElementByClassName(className);
		
		Viamatic.UpdateOpenMailForm();
		
		/*function Delete_Click(p_oSender) 	 
			{ 	 
				var oForm = p_oSender.form; 	 
				oForm.DEL.value = "Delete";
				oForm.submit(); 	 
			}; */
		window.scroll(0,0);
	}
	
	
	Viamatic.UpdateOpenMailForm = function()
	{
		//var 
		
	}
	
	Viamatic.Folder.CreateComposer = function(sUniqueID)
	{
		var sComposer = "rsCompose" + sUniqueID;
		var sReturn;
		sReturn = '<form action="" onsubmit="" id="ViamaticComposer' + sUniqueID + '"><table width="100%"><tr><td align="right">To: </td><td><textarea name="To" rows="1" cols="40" style="width:100%; overflow-y:auto; font-family:sans-serif,monospace; font-size:inherit;" tabindex="1" id="tofield" ></textarea></td>';
		sReturn += '</tr><tr><td align="right">CC:</td><td><textarea name="Cc" rows="1" cols="40" style="width:100%; overflow-y:auto; font-family: sans-serif,monospace; font-size:inherit;" tabindex="2" id="ccfield" ></textarea></td>';
		sReturn += '</tr><tr><td align="right">BCC:</td><td><textarea name="Bcc" rows="1" cols="40" style="width:100%; overflow-y:auto; font-family:sans-serif,monospace; font-size:inherit;" tabindex="3" id="bccfield" ></textarea></td>';
		sReturn += '</tr><tr><td align="right">Subject:</td><td><input name=Subj id="subjectfield" value="" type=text size=40 style="width:100%" tabindex=4  ></td>';
		sReturn += '</tr><tr><td></td><td></td></tr><tr><td></td><td><textarea name="Body" id="bodyfield" rows=15 cols=55  wrap=virtual tabindex=5 style="width:100%;"></textarea>';
		sReturn += '</td></tr><tr><td></td><td align="center"><input type="button" disabled value="Send" name="btnSend" onclick="Viamatic.Folder.SendQuickMail(this,\'' + sUniqueID +'\')" tabindex=5 /> <input type="button" value="Cancel" onclick="Viamatic.Folder.CancelQuickMail(this,\'' + sUniqueID +'\')" tabindex=6/></td></tr></table>  </form>';
		sReturn += '<iframe style="width:0px; height=0px; border=0px; position:absolute; visibility:hidden;" name="' + sComposer + '" id="' + sComposer + '"><iframe>'; 
		return sReturn;
	}
		
	Viamatic.UpdateLinks = function()
	{
		Viamatic.ChangeFunction('deletetop', Viamatic.DeleteMail);
		Viamatic.ChangeFunction('spamtop', Viamatic.SpamMail);
		//Viamatic.ChangeFunction('marktop', Viamatic.MarkMail);
		Viamatic.ChangeFunction('movetop', Viamatic.MoveMail);
		Viamatic.ChangeFunction('deletebottom', Viamatic.DeleteMail);
		Viamatic.ChangeFunction('spambottom', Viamatic.SpamMail);
		//Viamatic.ChangeFunction('markbottom', Viamatic.MarkMail);
		Viamatic.ChangeFunction('movebottom', Viamatic.MoveMail);
		
		
		var oMoveTop = new MenuButton('movetop',Move_Click,'movemenu',DestinationFolder_Click);
		var oMarkTop = new MenuButton('marktop','markmenu', Viamatic.MarkMail);
		var oMoveBottom = new MenuButton('movebottom',Move_Click,'movemenu',DestinationFolder_Click);
		var oMarkBottom = new MenuButton('markbottom','markmenu', Viamatic.MarkMail);
		var oMessageViewSelector = new MenuButton('messageviewselector','messageviewmenu',MessageViewMenu_Click);
	}
	
	
	Viamatic.Folder.ModifyFolderTags = function()
	{
		var folderlist = window.document.getElementById("folderlist");
		if(!folderlist) return;
		var alltags = folderlist.getElementsByTagName("a");
		
		for (var i=0; i<alltags.length; i++)
		{
			if(alltags[i].href.indexOf("/ym/ShowFolder") != -1)
			{
				alltags[i].onclick = Viamatic.Folder.OpenFolder;
			}
		}
	}
	
	// Refresh the mail after 4 minutes 
	Viamatic.Timers.RefreshMail = function()
	{
	}
	

	
	
//Public functions

	Viamatic.Folder.DeleteMail = function()
	{
		var oForm = document.messageList;
		var result = oForm.elements;
		var noCheckBoxes = 0;
		
		for (var x=0; x<result.length; x++) 
	    {
			if(result[x].type == "checkbox" && result[x].checked == true && result[x].name == "Mid") noCheckBoxes++; 
	    }
		
		if(noCheckBoxes == 0) { Viamatic.ShowErrorMessage("There was a problem:", "No message(s) selected. Please select at least one message and try again."); return; }
		
		var rsGeneral = document.getElementById("rsGeneral");
		
			
		rsGeneral.onload = Viamatic.Folder.DeleteMail_OnLoad;
		
		Viamatic.ShowBusy();
		oForm.DEL.value = '1'; 
		oForm.target = "rsGeneral";
		oForm.submit();		
		
		return false;		
	}
	
	Viamatic.Folder.DeleteMail_OnLoad = function()
	{	
		var oForm = document.messageList;
		oForm.target = "";
		oForm.DEL.value = "";
		Viamatic.SetStatusVisible(false);		
		var rsGeneral = document.getElementById("rsGeneral");
		Viamatic.Folder.SyncViews(rsGeneral);
		Viamatic.Folder.YahooSpecific();
		Viamatic.Folder.ChangePageContent();
		Viamatic.Util.SyncViewsById("movemenu", rsOpenFolder);
			
		
	}
	
	Viamatic.Util.SyncViewsById = function(elementId, rsHost)
	{
		var remote = rsHost.contentDocument.getElementById(elementId);
		var actual = document.getElementById(elementId)
		if( actual && remote) {	actual.innerHTML = remote.innerHTML;}
		
	}
	
	Viamatic.Util.SyncViewsByClass = function(className, rsHost)
	{
		var content = Viamatic.StdLib.getElementByClassName(className);
		var contentRemote = Viamatic.StdLib.getElementByClassName(className, rsHost.contentDocument);
		if( content && contentRemote) content.innerHTML = contentRemote.innerHTML;
	}
	
	Viamatic.Folder.SyncViews = function(rsHost)
	{
		Viamatic.Util.SyncViewsById('northbanner', rsHost);
		Viamatic.Util.SyncViewsById('folderlist', rsHost);
		Viamatic.Util.SyncViewsByClass('content', rsHost);		
		//Viamatic.ChangeContentOnPage();
		//Viamatic.YahooSpecific();
	}	
	
	Viamatic.MarkMail = function()
	{
		
		var aMarkOptions = new Array('unread','read','flag','unflag');
		var oLI = this.Sender.tagName == "LI" ? this.Sender : this.Sender.parentNode;
		var sFlag = aMarkOptions[oLI.value];
				
		var ml = document.messageList;
		ml.flags.value = sFlag;
		ml.FLG.value = '1';
		ml.DEL.value = "";
		
		var oForm = document.messageList;
		var result = oForm.elements;
		var sReturn = "";
		var sCurrentItem = "";
		var noCheckBoxes = 0;
		for (var x=0; x<result.length; x++) 
	    {
			if(sReturn == "") sCurrentItem = result[x].name + "=" + result[x].value;
			else sCurrentItem = "&" + result[x].name + "=" + Viamatic.StdLib.URLEncode(result[x].value);
			if(sCurrentItem == "&FLG=") sCurrentItem = "&FLG=1"; 
	    	if(result[x].type == "checkbox" && result[x].checked == true && result[x].name == "Mid") {noCheckBoxes++; sCurrentItem = ""; }
			if(result[x].name == "") sCurrentItem = "";
		  	sReturn = sReturn + sCurrentItem;			
	    }
		
		if(noCheckBoxes == 0) 
		{
			Viamatic.ShowErrorMessage("There was a problem:", "No message(s) selected. Please select at least one message and try again.");
			return;
		}
		
		Viamatic.XmlHttp.CallBack = Viamatic.MarkMail_StateChange;
		Viamatic.XmlHttp.Post(oForm.action, sReturn);
		Viamatic.ShowBusy();
		return false;		
		
	}
	
	Viamatic.MarkMail_StateChange = function()
	{
		if (Viamatic.XmlHttp.readyState() == 2 && Viamatic.XmlHttp.status() == 200) 
		{
			Viamatic.XmlHttp.Abort();
			var ml = document.messageList;
					
			Viamatic.SetStatusVisible(false);
			Viamatic.UpdateListViewMark();
			ml.FLG.value = '';
		}
	
	}
	
	Viamatic.UpdateListViewMark = function()
	{
		var oForm = document.messageList;
		var result = oForm.elements;
		var tr;
		
		for (var x=0; x<result.length; x++) 
	    {			
			if(result[x].type == "checkbox" && result[x].checked == true && result[x].name == "Mid") 
			{
				result[x].checked = false;
				tr = result[x].parentNode.parentNode;
				if(oForm.flags.value == "read")
				{
					tr.className = "msgold"; 
					tr.style.backgroundColor = Viamatic.StringTable.OLD_MSG_COLOR;					
				}
				
				if(oForm.flags.value == "unread")
				{
					tr.className = "msgnew"; 
					tr.style.backgroundColor = "";				
				}
				//tableNode.removeChild(trNode);
				//test.document.write(result[x].type  + " " + result[x].checked + " " + result[x].name + " <br />" );
			}
		}
		
	}
	
	Viamatic.ChangeFunction = function(id, functionName)
	{
		var element = document.getElementById(id);
		if(element) element.onclick = functionName;		
	}
	
	Viamatic.Folder.OpenFolder = function()
	{
		var rsOpenFolder = document.getElementById("rsOpenFolder");
		rsOpenFolder.src = this.href;
		rsOpenFolder.onload = Viamatic.Folder.OpenFolder_OnLoad;
		Viamatic.ShowBusy();
		return false;
	}
	
	Viamatic.Folder.OpenFolder_OnLoad = function()
	{
		Viamatic.SetStatusVisible(false);
		var rsOpenFolder = document.getElementById("rsOpenFolder");
		Viamatic.Folder.SyncViews(rsOpenFolder);
		Viamatic.Folder.ChangePageContent();
		Viamatic.Util.SyncViewsById("movemenu", rsOpenFolder);
		Viamatic.Folder.YahooSpecific();
		
	}
	
	Viamatic.UpdateListView = function()
	{
		var oForm = document.messageList;
		var result = oForm.elements;
		//var test = window.open("","test");
		//test.document.open();
		var oDelete = new Array();
		var y = 0;
		for (var x=0; x<result.length; x++) 
	    {			
			if(result[x].type == "checkbox" && result[x].checked == true && result[x].name == "Mid") 
			{
				//oDelete[result[x].value]
				oDelete[y] = result[x].parentNode.parentNode;
				y++;
				//tableNode.removeChild(trNode);
				//test.document.write(result[x].type  + " " + result[x].checked + " " + result[x].name + " <br />" );
			}
		}
		
		var tn;
		for(x=0; x<oDelete.length; x++)
		{
			tn = oDelete[x].parentNode;
			tn.removeChild(oDelete[x]);
		}
		//test.document.close();
	}
	
	Viamatic.DeleteMail_StateChange = function() 
	{
		if (Viamatic.XmlHttp.readyState() == 2 && Viamatic.XmlHttp.status() == 200) 
		{
			Viamatic.XmlHttp.Abort();
			Viamatic.ShowErrorMessage("", "The selected message(s) were deleted.");			
			Viamatic.SetStatusVisible(false);
			Viamatic.UpdateListView();
		}
	}
	
	Viamatic.Folder.ShowImages = function(emailURL, contentID)
	{
		Viamatic.Globals.openMailURL = emailURL; // <---- Check this
		Viamatic.Globals.contentID = contentID;
		Viamatic.XmlHttp.CallBack = Viamatic.Folder.ShowImages_StateChange;
		Viamatic.XmlHttp.Get(emailURL);
		Viamatic.ShowBusy();
		return false;		
	}
	
	Viamatic.Folder.ShowImages_StateChange = function() 
	{
    	if (Viamatic.XmlHttp.readyState() == 4 &&  Viamatic.XmlHttp.status() == 200) 
		{
			var contentArea = document.getElementById(Viamatic.Globals.contentID);
			if(!contentArea) return;
			Viamatic.Folder.CheckMailValidity();
			
			var rawHTML = Viamatic.XmlHttp.responseText();			
			contentArea.innerHTML = rawHTML.substring(rawHTML.indexOf("</table>") + 8 , rawHTML.indexOf("</body>"));
			Viamatic.Folder.MakeDomChanges();
			Viamatic.SetStatusVisible(false);
		}
	}
	
	Viamatic.Folder.OpenQuickMail = function()
	{
		// Check if already loading a message
		// Stop it
		var quickViewLoading = Viamatic.Globals.quickViewLoading;
		if(quickViewLoading)
		{
			quickViewLoading.parentNode.parentNode.parentNode.removeChild(quickViewLoading.parentNode.parentNode.nextSibling);
			quickViewLoading.innerHTML = " <img src='http://us.i1.yimg.com/us.yimg.com/i/us/plus/csp/cn/norgie_closed_dna.gif' border=0 />  ";
			quickViewLoading.onclick = Viamatic.Folder.OpenQuickMail;
		}
		
		var emailURL = this.href + "&PRINT=1";
		
		Viamatic.Globals.selectedTR = this.parentNode.parentNode;
		Viamatic.Globals.openMailURL = this.href;		

		var rsQuickMail = document.getElementById("rsQuickMail");
		rsQuickMail.src = emailURL;
		rsQuickMail.onload = Viamatic.OpenQuickMail_OnLoad;
		
		//Viamatic.ShowBusy();
		
		var currentTR = Viamatic.Globals.selectedTR;
		var parentTable = currentTR.parentNode;
		
		var quickViewTR = document.createElement('tr');
		var quickViewTD = document.createElement('td');
		quickViewTR.appendChild(document.createElement('td'));
		quickViewTR.appendChild(quickViewTD);
		quickViewTD.setAttribute('colspan', currentTR.getElementsByTagName("td").length - 1);
		
		var checkboxs = currentTR.getElementsByTagName("input");		
		if (checkboxs.length  == 0) return; 		
		var quickView = document.getElementById(checkboxs[0].value);
		quickViewTD.setAttribute("id", "content" + checkboxs[0].value);
		Viamatic.Globals.contentID = "content" + checkboxs[0].value;
		
		var beforeChild = currentTR.nextSibling;
		if(beforeChild) parentTable.insertBefore(quickViewTR, beforeChild);
		else parentTable.appendChild(quickViewTR);
		
		quickViewTD.innerHTML = '<div class="alertbox"><h3>Please wait... <br /><span> Your message is being downloaded.</span></h3></div>';
		
		
		if(quickView)
		{
			quickView.innerHTML = " <img src='http://us.i1.yimg.com/us.yimg.com/i/us/plus/csp/cn/norgie_open_dna.gif' border=0 />  ";
			quickView.onclick = Viamatic.Folder.CloseQuickMail;
		}
		
		Viamatic.Globals.quickViewLoading = quickView;
		return false;
	}
	
	Viamatic.OpenQuickMail_OnLoad = function()
	{
		Viamatic.Globals.quickViewLoading = null;
		if (Viamatic.Globals.selectedTR.className == "msgnew") Viamatic.MarkMessageAsRead();
		var currentTR = Viamatic.Globals.selectedTR;
		var parentTable = currentTR.parentNode;
		
		var checkboxs = currentTR.getElementsByTagName("input");		
		if (checkboxs.length  == 0) return; 		
		var quickView = document.getElementById(checkboxs[0].value);
		Viamatic.Globals.contentID = "content" + checkboxs[0].value;
		
		//Viamatic.SetStatusVisible(false);
		var rsQuickMail = document.getElementById("rsQuickMail");
		
		if(rsQuickMail.contentDocument.body.innerHTML.indexOf(Viamatic.StringTable.ERROR_MSG_VIEW) != -1) 
		{
			Viamatic.MessageViewingError();	
			
			quickView.parentNode.parentNode.parentNode.removeChild(quickView.parentNode.parentNode.nextSibling);
			quickView.innerHTML = " <img src='http://us.i1.yimg.com/us.yimg.com/i/us/plus/csp/cn/norgie_closed_dna.gif' border=0 />  ";
			quickView.onclick = Viamatic.Folder.OpenQuickMail;
			return false;
		}
				
		if(Viamatic.Timers.errorMessageTimer) Viamatic.HideErrorMessage();
		
		Viamatic.Globals.messageCache = rsQuickMail.contentDocument.body.innerHTML;
		
		var cloneBody = rsQuickMail.contentDocument.body.cloneNode(true);
		cloneBody.removeChild(cloneBody.getElementsByTagName("table")[0]);
		
		var showImages = "";
		var infoBar = "";

		if(cloneBody.innerHTML.indexOf("spc_eee1.gif") != -1) showImages =  " <a href='" +  Viamatic.Globals.openMailURL + "' onClick='return Viamatic.Folder.ShowImages(\"" + Viamatic.Globals.openMailURL + "&ShowImages=1&PRINT=1\", \"" + Viamatic.Globals.contentID +"\")'>Show Images</a>"; 
		infoBar = "<div style='background-color:#F9F9F9; border-top: 1px solid #F2F2F2; border-bottom: 1px solid #F2F2F2;' id='infoBar" +  Viamatic.Globals.contentID + "'><div class='contentnav'><span class='first'>" + showImages + "</span><span class='last'><a href='javascript:Viamatic.Folder.InstantReply(\"infoBar" +  Viamatic.Globals.contentID + "\")'>Instant Reply</a></span></div></div>";

		var contentArea = document.getElementById(Viamatic.Globals.contentID);
		if(!contentArea) return;
		contentArea.innerHTML = cloneBody.innerHTML + infoBar;
		
		Viamatic.Folder.MakeDomChanges();
			
	}

	Viamatic.Folder.CloseQuickMail = function()
	{
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.nextSibling);
		this.innerHTML = " <img src='http://us.i1.yimg.com/us.yimg.com/i/us/plus/csp/cn/norgie_closed_dna.gif' border=0 />  ";
		this.onclick = Viamatic.Folder.OpenQuickMail;
		return false;
	}
	
	Viamatic.Folder.OpenComposer = function(contentID)
	{
		var rsCompose = document.getElementById("rsCompose" + contentID);
		rsCompose.src = "/ym/Compose";
		rsCompose.onload = new Function("Viamatic.Folder.EnableSend(\"" + contentID + "\");");
	}
	
	Viamatic.Folder.EnableSend = function(contentID)
	{
		var mainDiv = document.getElementById(contentID);
		var inputs = mainDiv.getElementsByTagName("input");
		inputs[1].disabled = false;		
	}
	
	Viamatic.Folder.QuickMailSent = function(contentID)
	{
		var mainDiv = document.getElementById(contentID);
		var rsCompose = document.getElementById("rsCompose" + contentID);
		
		if(rsCompose.contentDocument.body.innerHTML.indexOf(Viamatic.StringTable.STATUS_MSG_SENT) != -1)
		{
			mainDiv.innerHTML = "<div class='contentnav'><span class='first'>&nbsp;</span><span class='last'><a href='javascript:Viamatic.Folder.InstantReply(\"" +  contentID + "\")'>Instant Reply</a></span></div>";
			Viamatic.ShowErrorMessage("Your message has been sent", "");
		}
		else
		{
			Viamatic.ShowErrorMessage("Your message could not be sent", " You can try to resend it again");
			var inputs = mainDiv.getElementsByTagName("input");
			inputs[1].value = "Send";
			rsCompose.src = "/ym/Compose";
			rsCompose.onload = new Function("Viamatic.Folder.EnableSend(\"" + contentID + "\");");	
		}
	}
	
	Viamatic.Folder.CancelQuickMail = function(objSender, sUniqueID)
	{
		objSender.parentNode.parentNode.parentNode.parentNode.innerHTML = "<div class='contentnav'><span class='first'>&nbsp;</span><span class='last'><a href='javascript:Viamatic.Folder.InstantReply(\"" +  sUniqueID + "\")'>Instant Reply</a></span></div>";
		
	}
	
	Viamatic.Folder.SendQuickMail = function(objSender, sUniqueID)
	{
		var myForm = objSender.form;
		var rsCompose = document.getElementById("rsCompose" + sUniqueID);
		rsCompose.onload = new Function("Viamatic.Folder.QuickMailSent(\"" + sUniqueID + "\");");
		var oForm = rsCompose.contentDocument.Compose;
		oForm.Subj.value =  myForm.Subj.value;
		oForm.To.value =  myForm.To.value;
		oForm.Cc.value =  myForm.Cc.value;
		oForm.Bcc.value =  myForm.Bcc.value;
		oForm.Body.value =  myForm.Body.value;
		myForm.btnSend.disabled = true;
		myForm.btnSend.value = "Please wait..";		
		oForm.SEND.value = "1";
        oForm.submit();
		return false;
	}
	
	Viamatic.StdLib.HTMLCleaner = function(sText)
	{
		sText = sText.replace(/&lt;/g, "<"); 
		sText = sText.replace(/&gt;/g, ">"); 
		sText =  Viamatic.StdLib.Trim(sText.replace(/&nbsp;/g, " ")); 
		return sText;
	}
	
	Viamatic.Folder.InstantReply = function(contentID)
	{
		var composer = document.getElementById(contentID);
		if(composer)
		{
			composer.innerHTML = Viamatic.Folder.CreateComposer(contentID);
			//Viamatic.StdLib.innerText(composer.parentNode.getElementsByTagName("div")[0]);
			var textBody = composer.parentNode.getElementsByTagName("textarea")[3];
			var msgProp = composer.parentNode.getElementsByTagName("table")[0];
			var messageHeader = Viamatic.StdLib.innerText(msgProp);
			messageHeader = Viamatic.StdLib.HTMLCleaner(messageHeader);			
			var originalMessage = Viamatic.StdLib.innerText(composer.parentNode.getElementsByTagName("div")[0]);
			originalMessage = Viamatic.StdLib.HTMLCleaner(originalMessage);
			
			var headers = msgProp.getElementsByTagName("tr");
			var msgFrom, msgSubject, msgCC, msgTo;
			
			for(var x=0; x<headers.length; x++)
			{
				if(headers[x].firstChild.innerHTML == "From:") msgFrom = headers[x].firstChild.nextSibling;
				if(headers[x].firstChild.innerHTML == "CC:") msgCC = headers[x].firstChild.nextSibling;
				if(headers[x].firstChild.innerHTML == "Subject:") msgSubject = headers[x].firstChild.nextSibling;
			} 
			
			composer.parentNode.getElementsByTagName("textarea")[0].value = Viamatic.StdLib.HTMLCleaner(Viamatic.StdLib.innerText(msgFrom));
			var subjectString = Viamatic.StdLib.innerText(msgSubject);
			if(subjectString.toLowerCase().indexOf("re:") == -1) subjectString = "Re:" + subjectString;
			composer.parentNode.getElementsByTagName("input")[0].value = subjectString;
			textBody.value = "\n\n------- Original Message ------ \n\n" + messageHeader + "\n\n" + originalMessage;
			composer.parentNode.getElementsByTagName("textarea")[0].focus();
		}
		Viamatic.Folder.OpenComposer(contentID);
		
	}
	
	Viamatic.Folder.MakeDomChanges = function()
	{
		Viamatic.CheckAttachments();
		var selectallrows = document.getElementById("selectallrows");
		var checkall = document.getElementById("checkall");
		var clearall = document.getElementById("clearall");
		if(selectallrows) selectallrows.onclick = Viamatic.Util.SelectAllRows;
		if(checkall) checkall.onclick = Viamatic.Util.CheckAll;
		if(clearall) clearall.onclick = Viamatic.Util.ClearAll;
		
	}
	
	Viamatic.Util.SelectAllRows = function()
	{
		//alert(this.checked);
		//return;
		if(this.checked == true) Viamatic.Util.CheckAll();
		else Viamatic.Util.ClearAll();
	}
	
	Viamatic.Util.CheckAll = function()
	{
		var datatable = document.getElementById("datatable");
		if(!datatable) return;
		var checkboxes = datatable.getElementsByTagName("input");
		for(var x = 0; x < checkboxes.length; x++)
		{
			if(checkboxes[x].type = "checkbox") checkboxes[x].checked = true; 
		}		
	}
	
	Viamatic.Util.ClearAll = function()
	{
		var datatable = document.getElementById("datatable");
		if(!datatable) return;
		var checkboxes = datatable.getElementsByTagName("input");
		for(var x = 0; x < checkboxes.length; x++)
		{
			if(checkboxes[x].type = "checkbox") checkboxes[x].checked = false; 
		}		
	}
	
	
	Viamatic.CheckAttachments = function()
	{
		var filespanel = Viamatic.StdLib.getElementByClassName("filespanel");
		
		if(filespanel)
		{			
			var alltags = filespanel.getElementsByTagName("a"); 
			var attachmentDiv;
			var anchorTag;
			for (var i=0; i<alltags.length; i++)
			{
				alltags[i].onclick = Viamatic.Folder.OpenAttachment;
				if(alltags[i].innerHTML.indexOf("img") == -1)
				{
					attachmentDiv=document.createElement('span');    	
					alltags[i].parentNode.appendChild(attachmentDiv);					
				}
			}
		}
	}
	
	Viamatic.Folder.OpenAttachment = function()
	{
		Viamatic.attachmentHref = this.href.replace("&VScan=1");
		Viamatic.XmlHttp.CallBack = Viamatic.Folder.OpenAttachment_StateChange;
		Viamatic.XmlHttp.Get(this.href);
		Viamatic.SetStatusText("<img src=\"http://us.a1.yimg.com/us.yimg.com/a/sy/symantec/102004_nav2005_79x22.gif\" align=center /> Please wait while the attachment is being scanned for viruses..");
		return false;
	}
	
	Viamatic.Folder.OpenAttachment_StateChange = function()
	{
		if (Viamatic.XmlHttp.readyState() == 4 &&  Viamatic.XmlHttp.status() == 200) 
		{
			Viamatic.SetStatusVisible(false);
			if(Viamatic.XmlHttp.responseText().indexOf("No virus threat detected") == -1)
			{
				Viamatic.ShowErrorMessage("Virus Detected", "This file could be infected. If you still wish to download it, <a href=\"" + Viamatic.attachmentHref + "\">click here</a> to download.");
				return false;
			}
			window.location.href = Viamatic.attachmentHref;
			
		}
	}
	
	Viamatic.Folder.CheckMailValidity = function() 
	{
		if(Viamatic.XmlHttp.responseText().indexOf(Viamatic.StringTable.ERROR_MSG_VIEW) != -1) 
		{
			Viamatic.MessageViewingError();
			return false;
		}
	}
	
	Viamatic.OpenQuickMail_StateChange = function() 
	{
		if (Viamatic.XmlHttp.readyState() == 2 && Viamatic.XmlHttp.status() == 200) 
			if (Viamatic.Globals.selectedTR.className == "msgnew") Viamatic.MarkMessageAsRead();
				
    	if (Viamatic.XmlHttp.readyState() == 4) 
		{
        	if (Viamatic.XmlHttp.status() == 200) 
			{
				Viamatic.Folder.CheckMailValidity();
				
				if(Viamatic.Timers.errorMessageTimer) Viamatic.HideErrorMessage();
				
				var selectedFolder = Viamatic.StdLib.getElementByClassName("selected");
				selectedFolder.getElementsByTagName("a").item(0).onclick = Viamatic.BackToEmails;
								
				Viamatic.Globals.selectedTR.className = "";
				Viamatic.Globals.messageCache = Viamatic.XmlHttp.responseText();
				
				if(Viamatic.Globals.folderView == "") Viamatic.Globals.folderView = Viamatic.Globals.mainContentArea.innerHTML;
				Viamatic.Globals.mainContentArea.innerHTML = Viamatic.Folder.FormatMail(Viamatic.XmlHttp.responseText());
				Viamatic.Folder.MakeDomChanges();
				Viamatic.SetStatusVisible(false);
				window.scroll(0,0);
				
			} 
			else 
			{
            alert("There was a problem retrieving the XML data:\n" +
                Viamatic.XmlHttp.statusText);
        	}
    	}
	}
	
	Viamatic.MarkMessageAsRead = function() 
	{
		var selectedFolder = Viamatic.StdLib.getElementByClassName("selected");
		var noOfMails = parseInt(Viamatic.StdLib.GetStringBetween(selectedFolder.getElementsByTagName("a").item(0).innerHTML, "(", ")"));
		if(isNaN(noOfMails)) return;
		if(noOfMails == 1) selectedFolder.innerHTML = selectedFolder.innerHTML.replace("(" + noOfMails + ")", "");
		else selectedFolder.innerHTML = selectedFolder.innerHTML.replace("(" + noOfMails + ")", "(" + (noOfMails - 1) + ")");
		
		Viamatic.Globals.selectedTR.className = "msgold"; 
		Viamatic.Globals.selectedTR.style.backgroundColor = Viamatic.StringTable.OLD_MSG_COLOR;
	}
	
	Viamatic.ShowPrintView = function()
	{
		var previewWindow=window.open("",'name','resizable=yes,scrollbars=yes,toolbar=no,status=yes');
		previewWindow.document.write(Viamatic.Globals.messageCache);
		return false;
	}
	
	
	
	Viamatic.Folder.PrintFunctionHeader = function(nType)
	{
		var showImages = "";
		if(Viamatic.Globals.messageCache.indexOf("spc_eee1.gif") != -1) showImages =  " <a href='" +  Viamatic.Globals.openMailURL + "' onClick='return Viamatic.ShowImages(\"" + Viamatic.Globals.openMailURL + "&ShowImages=1&PRINT=1\", \"" + Viamatic.Globals.contentID +"\")'>Show Images</a>"; 
		var showFullHeaders = " <a href='" +  Viamatic.Globals.openMailURL + "' onClick='return Viamatic.Folder.ShowImages(\"" + Viamatic.Globals.openMailURL + "&Nhead=f&PRINT=1\", \"" + Viamatic.Globals.contentID +"\")'>Full Headers</a>"; 
		var sReturn = "<div style='background-color:#F9F9F9; border-top: 1px solid #F2F2F2; border-bottom: 1px solid #F2F2F2;'><div class='contentnav'><span class='first'>" + showImages + "</span><span class='last'>" + showFullHeaders + "</span></div></div>";
		
		return sReturn;
	}
	
	Viamatic.ShowErrorMessage = function(sTitle, sMessage)
	{
		var errorMessageDiv, contentNavTop;
		 
		var sResult = '<h3>' + sTitle + '</h3>';
		sResult += '<p>' + sMessage + '</p>';
		
		errorMessageDiv = document.getElementById("errorMessageDiv");
		if (errorMessageDiv == null)
		{
			contentNavTop = document.getElementById('contentnavtop');
			errorMessageDiv=document.createElement('div');    	
			errorMessageDiv.setAttribute('class','alertbox error'); 
			errorMessageDiv.setAttribute('id', "errorMessageDiv");
			contentNavTop.parentNode.insertBefore(errorMessageDiv, contentNavTop);
		}
		
		errorMessageDiv.style.visibility = "visible";
		errorMessageDiv.style.position = "relative";
		errorMessageDiv.innerHTML = sResult;
		
		window.scroll(0,0);
		if(Viamatic.Timers.errorMessageTimer == null) window.clearTimeout(Viamatic.Timers.errorMessageTimer);
		Viamatic.Timers.errorMessageTimer = window.setTimeout("Viamatic.HideErrorMessage()", 1000 * 60);
		
	}
	
	Viamatic.HideErrorMessage = function() 
	{
		window.clearTimeout(Viamatic.Timers.errorMessageTimer);
		var errorMessageDiv;
		errorMessageDiv = document.getElementById("errorMessageDiv");
		if(errorMessageDiv != null) 
		{
			errorMessageDiv.style.visibility = "hidden";
			errorMessageDiv.style.position = "absolute";
		}
	}
	
	Viamatic.MessageViewingError = function() 
	{
		Viamatic.ShowErrorMessage("Message Viewing Error", "The was a problem getting the message <a href='" + Viamatic.Globals.openMailURL + "'>click here</a> to try again.");
		Viamatic.SetStatusVisible(false);
	}
		
	Viamatic.DownloadAttachment = function(downloadURL)
	{
	}
	
	Viamatic.Folder.FormatMail = function(rawHTML)
	{
		return  rawHTML.substring(rawHTML.indexOf("</table>") + 8 , rawHTML.indexOf("</body>"));
	}
	
	Viamatic.Folder.YahooSpecific = function()
	{
		init();
		DataTable_Init();
		LHCol_Init();
		var oMoveTop = new MenuButton('movetop',Move_Click,'movemenu',DestinationFolder_Click);
		var oMarkTop = new MenuButton('marktop','markmenu',MarkMenu_Click);
		var oMoveBottom = new MenuButton('movebottom',Move_Click,'movemenu',DestinationFolder_Click);
		var oMarkBottom = new MenuButton('markbottom','markmenu',MarkMenu_Click);
		var oMessageViewSelector = new MenuButton('messageviewselector','messageviewmenu',MessageViewMenu_Click);
	}
	
	Viamatic.BackToEmails = function()
	{
		if (Viamatic.Globals.folderView == "") return false;
		Viamatic.Globals.mainContentArea.innerHTML = Viamatic.Globals.folderView;
		Viamatic.Globals.folderView = "";
		Viamatic.ChangeContentOnPage();		
		Viamatic.YahooSpecific();
		
		var selectedFolder = Viamatic.StdLib.getElementByClassName("selected");
		selectedFolder.getElementsByTagName("a").item(0).onclick = "";
		
		return false;
	}
	
		
	// Set the status text on top	
	Viamatic.SetStatusText = function(sText)
	{
		var divStatus = window.document.getElementById('divStatus');
		divStatus.innerHTML = sText;
		Viamatic.SetStatusVisible(true);
		//document.documentElement.onmousemove =  Viamatic.SetStatusPosition;
	}
	
	Viamatic.SetStatusVisible = function(bVisible)
	{
		var divStatus = window.document.getElementById('divStatus');
		
		if(bVisible == true) 
		{	
			divStatus.style.visibility = "visible";
			Viamatic.Timers.statusTimer = window.setTimeout("Viamatic.SetStatusVisible(false)", 1000 * 60 * 2);
		}
		else 
		{
			if(Viamatic.Timers.statusTimer) Viamatic.Timers.statusTimer = null;
			divStatus.style.visibility = "hidden";
		}
		//document.documentElement.onmousemove = "";		
	}
	
	Viamatic.SetStatusPosition = function(events)
	{
		if(document.all)events = event;
		var divStatus = window.document.getElementById('divStatus');
		divStatus.style.left =  events.clientX + 15 + "px";
		divStatus.style.top = events.clientY + 15 + "px";
		return false;
    }
	
	Viamatic.ShowBusy = function()
	{
		Viamatic.SetStatusText("<img src='http://us.i1.yimg.com/us.yimg.com/i/us/my/bn/menudocact.gif' align='center' /> Please wait..");
	}
	
	main();	
}

(function() {
	Viamatic.WebMail = new ViamaticWebMail();	
})();