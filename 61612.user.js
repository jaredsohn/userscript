var fileMETA = parseHeaders(<><![CDATA[
// ==UserScript==
// @name           Facebook PhoneBooks
// @author         Carboni
// @version        0.9.6
// @uso_script     61612
// @namespace      FacebookPhoneBooks
// @description    PhoneBooks your friends, Adds a bulk add form in message threads.
// @include        http://*.facebook.com/*?filter=pfp*
// @resource       mdata http://userscripts.org/scripts/source/61612.meta.js
// @require        http://userscripts.org/scripts/source/52251.user.js
// ==/UserScript==
]]></>.toString());

String.prototype.trim = function() { return ( this.replace(/^\s+|\s+$/g, '') ); }
String.prototype.left = function(n) { return this.substr(0, n); }
String.prototype.right = function(n) { return this.substr(this.length - n, n); }
var bolLogConsole = false;

var strFriendsPage_Container = "UIObjectListing clearfix";
var FriendsPage_Container=document.getElementsByClassName(strFriendsPage_Container);

var FBPhoneBook = [];	// for right now, it's just a global container
function FBPhoneBookEntry(){	// custom constructor, will add more details later when I figure out how to get to [INFO] in profile
	this.WebSite= "";
	this.FullName = "";
	this.SubTitle = "";
	this.SubText = "";
	this.PhonebookCell = "";
	this.PhonebookLand = "";
};

function ParseNodes(obj_nodedata, obj_nodename) {
	if (obj_nodedata.length > 0) {
		var objTextArea = document.getElementById("BulkPhnBkData");
		objTextArea.innerHTML = "FullName	WebSite	SubTitle	SubText	PhonebookCell	PhonebookLand\r\n";
		for (var i = 0; i < obj_nodedata.length; i++) {
			FBPhoneBook[i] = DigNodes(obj_nodedata[i].childNodes, obj_nodename + ".[" + i + "]");
			FBPhoneBook[i].FullName = FBPhoneBook[i].FullName.replace(/^\s+|\s+$/g, '');
			FBPhoneBook[i].WebSite = FBPhoneBook[i].WebSite.replace(/^\s+|\s+$/g, '');
			FBPhoneBook[i].SubTitle = FBPhoneBook[i].SubTitle.replace(/^\s+|\s+$/g, '');
			FBPhoneBook[i].SubText = FBPhoneBook[i].SubText.replace(/^\s+|\s+$/g, '');
			FBPhoneBook[i].PhonebookCell = FBPhoneBook[i].PhonebookCell.replace(/^\s+|\s+$/g, '');
			FBPhoneBook[i].PhonebookLand = FBPhoneBook[i].PhonebookLand.replace(/^\s+|\s+$/g, '');
			objTextArea.innerHTML += FBPhoneBook[i].FullName + "	" + FBPhoneBook[i].WebSite + "	" + FBPhoneBook[i].SubTitle + "	" + FBPhoneBook[i].SubText + "	" + FBPhoneBook[i].PhonebookCell + "	" + FBPhoneBook[i].PhonebookLand + "\r\n";
		}
	}
};

function DigLog (logText) {
	if (bolLogConsole) {GM_log(new Date().getTime() + "DigNodes:*" + logText);}
};

function DigNodes (obj_nodedata, obj_nodename) {
	var phnbk = new FBPhoneBookEntry;
	var tmp_gm_log = "";
	DigLog("*****************************************************************************************************");

	DigLog("UIObjectListing_Title.href{" + obj_nodedata[3].childNodes[1].href + "}");
	phnbk.WebSite = obj_nodedata[3].childNodes[1].href;
	DigLog("UIObjectListing_Title{" + obj_nodedata[3].childNodes[1].childNodes[0].nodeValue + "}");
	phnbk.FullName = obj_nodedata[3].childNodes[1].childNodes[0].nodeValue;
	tmp_gm_log = "UIObjectListing_Subtitle{";
	if (obj_nodedata[3].childNodes[3].childNodes[1].childNodes.length > 0) {
		tmp_gm_log += obj_nodedata[3].childNodes[3].childNodes[1].childNodes[0].nodeValue;
		phnbk.SubTitle = obj_nodedata[3].childNodes[3].childNodes[1].childNodes[0].nodeValue;
	}
	tmp_gm_log += "}";
	DigLog(tmp_gm_log);
	tmp_gm_log = "UIObjectListing_Subtext{";
	if (obj_nodedata[3].childNodes[3].childNodes[3].childNodes.length > 0) {
		tmp_gm_log += obj_nodedata[3].childNodes[3].childNodes[3].childNodes[0].nodeValue;
		phnbk.SubText = obj_nodedata[3].childNodes[3].childNodes[3].childNodes[0].nodeValue;
	}
	tmp_gm_log += "}";
	DigLog(tmp_gm_log);
	switch (obj_nodedata[5].childNodes[0].className.right(4)) {
		case "Both":
			DigLog("FriendsPage_PhonebookCell{" + obj_nodedata[5].childNodes[0].childNodes[0].childNodes[1].nodeValue + "}");
			phnbk.PhonebookCell = obj_nodedata[5].childNodes[0].childNodes[0].childNodes[1].nodeValue;
			DigLog("FriendsPage_PhonebookLand{" + obj_nodedata[5].childNodes[0].childNodes[1].childNodes[1].nodeValue + "}");
			phnbk.PhonebookLand = obj_nodedata[5].childNodes[0].childNodes[1].childNodes[1].nodeValue;
			DigLog("got both");
			break;
		default:
			DigLog("got only one");
			switch (obj_nodedata[5].childNodes[0].childNodes[0].className) {
				case "FriendsPage_PhonebookCell":
					DigLog("FriendsPage_PhonebookCell{" + obj_nodedata[5].childNodes[0].childNodes[0].childNodes[1].nodeValue + "}");
					phnbk.PhonebookCell = obj_nodedata[5].childNodes[0].childNodes[0].childNodes[1].nodeValue;
					break;
				case "FriendsPage_PhonebookLand":
					DigLog("FriendsPage_PhonebookLand{" + obj_nodedata[5].childNodes[0].childNodes[0].childNodes[1].nodeValue + "}");
					phnbk.PhonebookLand = obj_nodedata[5].childNodes[0].childNodes[0].childNodes[1].nodeValue;
					break;
			}
			break;
	}
	DigLog("****************************************************************************************************");
	return phnbk;
};


FacebookPhoneBooks={

BulkPhnBk:function() {
	var waitMillis=150;
	var error=document.getElementById('error');
	if(error && !this.bulkAddOptions.ignoreErrors) {
		var visible=true;
		while(error.tagName!="BODY") {
			if(error.style.display=="none") {
				visible=false;
				break;
			}
			error=error.parentNode;
		}
		if(visible) {
			
			GM_log('Error found, bulk add aborted');
			this.SetAutoBulkAdd(false);
			return;
		}
	}
	var captcha=document.getElementById('captcha_session');
	var popDialog=document.getElementById("pop_content");
	DigLog(ParseNodes(FriendsPage_Container, strFriendsPage_Container));

},

PhnBkLinkAnyPage:function() {
	if(document.getElementById("PhnBkLinkDiv")) { return; }
	var pbl=document.getElementById('FriendsPage_ContentContainer').childNodes[0]
	var newdiv=document.createElement('div');
	newdiv.id='PhnBkLinkDiv';
	newdiv.innerHTML="<form id='BulkPhnBk'><textarea id='BulkPhnBkData' name='comment' cols='105' rows='5' wrap='off'/></textarea>"+
		"<center><input type='button' id='BulkPhnBkButton' value='Begin Extracting All Friends Listed On This Page & Place Tab Delimited TextBOX Above' /></center>"+
		"</form>";
	newdiv.style.border='1px solid #000';
	newdiv.style.padding='10px';
	pbl.parentNode.insertBefore(newdiv,pbl);

	var BulkPhnBkButton=document.getElementById('BulkPhnBkButton');
	BulkPhnBkButton.addEventListener('click',function() {
		FacebookPhoneBooks.StartBulkPhnBk();
	},false);
},

StartBulkPhnBk:function() {
	this.PhnBkUpto=0;
	this.BulkPhnBk();
},

CheckPage:function() {
	autoUpdate(fileMETA["uso_script"], fileMETA["version"]);
	if(unsafeWindow.top.joinRecentLoadedLink!=undefined && unsafeWindow.joinRecentLoadedLink==undefined) {
		window.setTimeout(function() {unsafeWindow.top.joinRecentLoadedLink();},5000);return;
	}

	var href=document.location.href+document.location.hash;
	var findthis = "?filter=pfp";
//	var findthis = "riends";
	if(href.indexOf(findthis)>=0) {
		FacebookPhoneBooks.PhnBkLinkAnyPage();
	}
}

// #####################################
// THIS IS THE FINAL }, DO NOT REMOVE IT
};
// THIS IS THE FINAL }, DO NOT REMOVE IT
// #####################################

GM_registerMenuCommand('FB PhoneBooks - Show Bulk import friends dialog',function() {
	FacebookPhoneBooks.PhnBkLinkAnyPage();
});

window.addEventListener("load", function(e) {
	window.GetFacebookPhoneBooks = function() {
		return FacebookPhoneBooks;
	}
	FacebookPhoneBooks.CheckPage();
}, false);


//**********************************************************************
// the following function is courtesy of greasespot.net
// and can be found @ http://wiki.greasespot.net/Metadata_block#Examples
//**********************************************************************
function parseHeaders(metadataBlock) {
  var headers = {};
  var line, name, prefix, header, key, value;

    var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
    for each (line in lines) {
      [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

      switch (name) {
        case "licence":
          name = "license";
          break;
      }

      [key, prefix] = name.split(/:/).reverse();

      if (prefix) {
        if (!headers[prefix]) 
          headers[prefix] = new Object;
        header = headers[prefix];
      } else
        header = headers;

      if (header[key] && !(header[key] instanceof Array))
        header[key] = new Array(header[key]);

      if (header[key] instanceof Array)
        header[key].push(value);
      else
        header[key] = value;
    }

    headers["licence"] = headers["license"];

  return headers;
};
