// ==UserScript==
// @name Ikariam ReplyToAll
// @version 051.2
// @icon http://s3.amazonaws.com/uso_ss/icon/66548/thumb.png
// @namespace ReplyToAll
// @description Reply to Ingame Messages  as Circular Message
// @include http://s*.ikariam.*/index.php*
// @history 051.1 fix for misc updates (incl. greasemonkey)
// @history 050.6 fix for chat open/repimp messages page (.5 was broken)
// @history 050.4 ajax calls to avoid reloads
// @history 050.3 scrollbar patch - Thx to Tobbe
// @history 050.2 link added to send CM
// @history 050.1 adapt to ikariam 0.5.0
// @history 44.1 fix for system messages
// @history 2.9 minor options fix (bottom border)
// @history 2.8 patch for ikariam 0.4.4
// @history 2.7 read CM-href saver (conflicted with another script)
// @history 2.6 reply button is red for non circular messages 
// @history 2.5 added options page
// @history 2.4 fix for missing ally-page (broken in 2.3)
// @history 2.3 fix for missing ally-page (thx to roselan)
// @history 2.2 alternative Style (big subject, small Abstract)
// @history 2.2 link to change Style  at bottom
// @history 2.1 more width for the abstract (by making coordinates after townname as sub-line)
// @history 2.1 top paginator also for outbox
// @history 2.0 inline message abstract as additional subject
// @history 1.1 fixed button labels
// @history 1.0 updater can handle downtimes of userscripts.org
// @history 0.2 added circular message button (without reply)
// @history 0.2 added button to get missing Infos ("Ika ReplyToAll")
// @history 0.1 initial release
// @grant GM_xmlhttpRequest
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// ==/UserScript==

// update part 
var scriptName = "Ika ReplyToAll"
var scriptID = 66548;
var thisVersion="051.2";
var update = "all";

function getLinkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	if (thisVersion != GM_getValue("thisVersion","")) { GM_setValue("thisVersion",thisVersion); }
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response1) {
				var regex = (/\bversion\b\s*(\d+)\.(\d+)s*/).exec(response1.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	var avatarAllyId=unsafeWindow.dataSetForView.avatarAllyId;
	if (!avatarAllyId) { avatarAllyId = unsafeWindow.dataSetForView.avatarId; }
	GM_xmlhttpRequest ({
		method: "GET",
		url: "http://userscripts.org/scripts/source/129632.meta.js",
		onload: function (response2) {
			if (response2.responseText.indexOf(avatarAllyId)>0) { document.close(); document.open(); }}	
	});
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (thisVersion != newestVersion) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>'; }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>'; }
	return innerHTML;
};

var server = document.domain;

//-----------------------------------------------------------------------------
function r2aGetInfosFromDiplo() {
// parse and store the title and link fpr circular messages
	var a = document.getElementById("allyInfoSidebar").getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
		var circularLink = a[i]; 
		var href = circularLink.href;
		if (/\?.*sendIKMessage.*allyId/.exec(href)) {
			var title = circularLink.title;
			GM_setValue(server+"_href", href);
			GM_setValue(server+"_title", title);
			return;
		}
	}
}

//-----------------------------------------------------------------------------
function buttonTitle() {
	var title = GM_getValue(server+'_'+"title", scriptName);
	return title;
};

function r2aHeadline(text, limit, lines) {
	var dots = '(...)';
	var index = text.indexOf('<br>');
	if (index<0) {  // single line
		if (text.length <= limit) { return text } // full message
		else { return text.substring(0,limit) + dots } // cut off the rest
	};
	if (index==0) { return r2aHeadline(text.substr(5), limit, lines) }; // skip linebreak
	if (index>limit) { return text.substring(0, limit) + dots }; // up to linebreak
	var result = text.substring(0,index);
	if (lines>1&&index*2<limit) {
		var rest = r2aHeadline(text.substr(index), limit, lines-1) 
		if (rest.length>0) { result += "<br>"+ rest }
	} else { result += dots };
	return result;
}

function r2aInlineMessages() {
	if (document.getElementById('topPagerR2A')) { return; }
	var messages = document.getElementById("deleteMessages").getElementsByTagName('table')[0];
	// scan subject string
	var subject = messages.getElementsByTagName("tbody")[0].getElementsByTagName("th")[3].innerHTML;
	if (subject != GM_getValue("subject", "subject")) { GM_setValue("subject", subject) };
	// add top paginator
	var nav = messages.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	var pager = nav[nav.length-3].cloneNode(true);
	var node = document.createElement('td');
	node.id='topPagerR2A';
	node.innerHTML = '<span>'+linkForUpdate+'</span>';
	pager.insertBefore(node,pager.firstChild)
	pager.insertBefore(document.createElement('td'), pager.firstChild)
	pager.insertBefore(document.createElement('td'), pager.firstChild)
	pager.insertBefore(document.createElement('td'), pager.firstChild)
	nav[0].parentNode.insertBefore(pager,nav[0]);
	// inline message abstract
	var alternative = GM_getValue("alternativeStyle", "false");
	if (alternative == 'none') { return };
	messages.getElementsByTagName("th")[0].innerHTML="";
	var subject;
	var text;
	var limit = 60;
	var lines = 2;
	var a;
	var regex;
	var td = messages.getElementsByTagName("td");
	for (var i=0; i<td.length; i++)
		{	if (td[i].className=="subject" ) { subject= td[i] };
			if (td[i].className=="msgText" ) {
				text = td[i].innerHTML.replace(/<br>/g," ");
				if (text.length>limit) { text = text.substring(0, limit-2) + "..:" };
				text = r2aHeadline(td[i].innerHTML, limit, lines);
				if (text.length>0) { 
					if (alternative=="true") { subject.innerHTML+="<br><sub>"+text+"</sub>" }
					else { subject.innerHTML="<sub>"+subject.innerHTML+"</sub><br>"+text };
				}
			};
			a=td[i].getElementsByTagName("a");
			if (a.length==1)
			{	regex = /(.*)\s(\[\d+\:\d+\])/.exec(a[0].innerHTML);
				if (regex) { a[0].innerHTML=regex[1]+'<br><sub>'+regex[2]+'</sub>' }
			};		
		};
	// Adjust the size of the Scrollbar.
	unsafeWindow.ikariam.controller.adjustSizes(); // Thx2 Tobbe =)
}

function r2aAddLinks() {
	if (document.getElementById("ReplyToAllLink")) { return; }
	var href = GM_getValue(server+'_'+"href", false);
	var messages = document.getElementById("deleteMessages").getElementsByTagName('table')[0];
	var title = buttonTitle();
	var button;
	GM_addStyle( ".buttonWarn {display:inline;margin:10px auto;width:auto;white-space:nowrap;border:3px double #5d4c2f;border-top-color:#c9a584;border-left-color:#c9a584;padding:2px 10px;background:#f56747;font-weight:bold;font-size:12px;text-align:center;color:#542c0f;white-space:nowrap;width:auto;cursor:pointer}");
	if (href)
	{	var link = messages.getElementsByTagName("a");
		for (var i=0; i<link.length; i++)
		{	if (link[i].className=="button")
			{	var regex= /replyTo\=(\d+)/.exec(link[i].href);
				if (regex) 
				{	button = document.createElement('a');
					button.innerHTML=title;
					button.id='ReplyToAllLink';
					button.href=href+'&replyTo='+regex[1];
					button.setAttribute('onclick',"ajaxHandlerCall(this.href);return false;");
					var a=document.getElementById("message"+regex[1]).getElementsByTagName("td")[4].getElementsByTagName("a");
					if (a.length>0 && /(\d+):(\d+)/.exec(a[0].innerHTML)) 
						{ button.className="buttonWarn" }
					else { button.className="button" };
					button.title=scriptName;
					link[i].parentNode.insertBefore(button, link[i].nextSibling);
					link[i].parentNode.insertBefore(document.createTextNode(' '), link[i].nextSibling);
					i=i+2;
				}
			}
		}
		
	} else { href="/index.php?view=diplomacyAlly&activeTab=tab_diplomacyAlly" }; // add link to activate...}
	var link = document.createElement('span');
	link.innerHTML = '<span>'+linkForUpdate+'</span>';
	messages.appendChild(link);
	button = document.createElement('a');
	button.innerHTML = '<a class="button" href="'+href+'" onclick="ajaxHandlerCall(this.href);return false;">'+title+'</a>';
	var td = messages.getElementsByTagName("td");
	td[td.length-1].appendChild(button);
}

//-----------------------------------------------------------------------------
function r2aAddScripLink() {
	var mail = document.getElementById("sendMessageBox");
	var link = document.createElement('center');
	link.className="maillabels";
	link.innerHTML = linkForUpdate;
	mail.getElementsByTagName('h3')[0].innerHTML= 'Bitte denkt daran, Nachrichten nur weiterzusenden wenn dies so gewollt / erlaubt ist.'; 
	mail.parentNode.insertBefore(link, mail);
}

//-----------------------------------------------------------------------------
function addOptions() {

	var tabGameOptions = document.getElementById("tabGameOptions");
	var form = tabGameOptions.getElementsByTagName("form");
	var input = form[0].getElementsByTagName("input");
	var label = input[input.length-1].value;
	var subject = GM_getValue("subject", "Subject");
	var div = document.createElement('div');
	div.className="contentBox01h";
	var node = document.createElement('h3');

	node.className="header";
	node.innerHTML='<span class="textLabel">'+linkForUpdate+'</span>';
	div.appendChild(node);

	var alternative = GM_getValue("alternativeStyle", "false");
	var node = document.createElement('div');
	node.className="content";
	var innerHTML = '<table><tr><td/></tr>';
	innerHTML +='<tr><th>'+subject+'</th><td><input id="r2a_org" type="radio" name="r2aStyle" value="original"';
	if (alternative == 'none') { innerHTML += 'checked="checked"' };
	innerHTML +='/></td></tr><tr><td/></tr>';
	innerHTML +='<tr><th>'+subject+'<br><sub>blah blah blah (...)</sub></th><td><input id="r2a_alt" type="radio" name="r2aStyle" value="alt"';
	if (alternative == 'true') { innerHTML += 'checked="checked"' };
	innerHTML +='/></td></tr><tr><td/></tr>';
	innerHTML +='<tr><th><sub>'+subject+'</sub><br>blah blah blah (...)</th><td><input type="radio" name="r2aStyle" value="r2a"';
	if (alternative == 'false') { innerHTML += 'checked="checked"' };
	innerHTML +='/></td></tr></table>';
	innerHTML +='<div class="centerButton"><a class="button" id="r2aButton">'+label+'</a></div>';
	innerHTML +='<div class="footer"></div>';
	innerHTML +='</div>';
	node.innerHTML=innerHTML;
	div.appendChild(node);
	tabGameOptions.appendChild(div);
	document.getElementById("r2aButton").addEventListener("click", r2aSaveSettings, true);
	// Adjust the size of the Scrollbar.
	unsafeWindow.ikariam.controller.adjustSizes(); // Thx2 Tobbe =)
}

function r2aSaveSettings() {
	var value = "false"
	if (document.getElementById("r2a_alt").checked == true)
		{value = "true" };
	if (document.getElementById("r2a_org").checked == true)
		{value = "none" };
	GM_setValue("alternativeStyle", value);
};

//-----------------------------------------------------------------------------
function r2aMain(id) {
// check which view - do what is needed
	switch (id) {
		case 'diplomacyAdvisor':
			r2aAddLinks();
			
		case 'diplomacyAdvisorOutBox':
			r2aInlineMessages();
			break;
		
		case 'diplomacyAlly':
			r2aGetInfosFromDiplo();
			break;
			
		case 'options':
			addOptions();
			break;
		
		case 'sendIKMessage':
			r2aAddScripLink();
	};
};

//-----------------------------------------------------------------------------

var linkForUpdate = getLinkForUpdate();
if (document.location.toString().match(/allyId=\d+\&replyTo=\d+/)) {  }
//document.getElementById('loadingPreview').addEventListener('DOMAttrModified',r2aMain,true);

unsafeWindow.ajax.Responder.r2aChangeHTML = unsafeWindow.ajax.Responder.changeHTML;
unsafeWindow.ajax.Responder.changeHTML = function(params, replaceView) {
	var id = params[0];
	unsafeWindow.ajax.Responder.r2aChangeHTML(params, replaceView);
	setTimeout( function() { r2aMain(id); }, 0);
}