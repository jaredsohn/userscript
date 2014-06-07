// THIS CURRENTLY ONLY WORKS IN FIREFOX.
//
// ==UserScript==
// @name        Savior by Pegasus Epsilon
// @namespace   http://pegasus.pimpninjas.org/nileonline/PE-NO-savior.user.js
// @description Saves/restores scrolls
// @include 	http://*.playnileonline.com/*
// ==/UserScript==

// (C)'09 Pegasus Epsilon.
// Distribute Unmodified.
// http://pegasus.pimpninjas.org/license

// don't run on login page
if (document.getElementById('header')) {
	// escape firefox' greasemonkey scope
	var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
	script.setAttribute('type', 'text/javascript');
	script.textContent = PEsaviorScript();
}

function PEsaviorScript() { // begin script for window scope
	return PEsaviorScript.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1"); // clean this wrapper off

	var PEsavior = {}

	PEsavior.loadDrafts = function() {
		try {
			if (localStorage &&
				localStorage.savedDrafts !== undefined &&
				localStorage.savedDrafts !== null &&
				localStorage.savedDrafts != 'null'
			) {
				var savedDrafts = new String(localStorage.savedDrafts).evalJSON();
			} else { savedDrafts = []; }
			return savedDrafts;
		} catch(e) {
			alert(e+'\nThis function is not supported by this version of this browser.\nUpgrade, or try firefox.\nSorry.');
			return null;
		}
	}

	PEsavior.deleteDraft = function(draftid) {
		var drafts;
		if ((drafts = PEsavior.loadDrafts()) === null) { return; }
		drafts.splice(draftid, 1);
		localStorage.savedDrafts = drafts.toJSON()
		PEsavior.showDrafts();
	}

	PEsavior.editDraft = function(draftid) {
		var drafts;
		if ((drafts = PEsavior.loadDrafts()) === null) { return; }
		PEsavior.editingDraft = draftid;
		composeMail(drafts[draftid].address);
	}

	PEsavior.viewDraft = function(draftid) {
		if (draftid.match(/^draft_/) === null) { return false; }
		var drafts;
		if ((drafts = PEsavior.loadDrafts()) === null) { return; }
		$(draftid).innerHTML = drafts[draftid.replace(/^draft_/, '')].message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />');
		return true;
	}

	PEsavior.showDrafts = function(e) {
		var drafts;
		if ((drafts = PEsavior.loadDrafts()) === null) { return; }
		var draftList = document.createElement('div');
		var header = draftList.appendChild(document.createElement('div'));
		header.className = 'h3line';
		header.innerHTML = '<a style="float:right" href="http://userscripts.org/scripts/show/181362">Savior v09.05.07</a>Saved Drafts';
		for (var i = drafts.length; i--;) {
			var data = drafts[i];
			var draft = draftList.appendChild(document.createElement('div'));
			draft.id = "parent_"+i;
// Sending requires serialize magic. maybe I'll bother one day.
//				'<!--a href="#bot" class="txtbuttonPos" title="Send Draft" onclick="PEsavior.sendDraft('+i+')">Send</a--> '+
			draft.innerHTML = '<div class="right" style="margin-top: 6px;">'+
				'<a href="#bot" class="txtbutton" title="Edit Draft" onclick="PEsavior.editDraft('+i+')">Edit</a> '+
				'<a href="#bot" class="txtbuttonNeg" title="Delete Draft" onclick="PEsavior.deleteDraft('+i+');">Delete</a> '+
				'</div><div class="item_toggle" onclick="PEsavior.viewDraft('+i+')">'+
				'<img src="images/icon_msg_reg.png" width="27" height="27" style="vertical-align: middle;" alt="" />'+
				'[To: '+data.name+'] '+data.subject+' <span class="smboldfade">['+data.time+']</span></div>'+
				'<div class="item_content"><p id="draft_'+i+'"></p></div>'
		}
		document.getElementById('mail').innerHTML = draftList.innerHTML;
		new accordion('mail');
	}

	PEsavior.saveDraft = function(e) {
		var drafts;
		if ((drafts = PEsavior.loadDrafts()) === null) { return; }
		var date = new Date();
		var draft = {}
		draft.name = document.getElementsByTagName('legend')[0].lastChild.textContent.replace(/^ /,'');
		draft.subject = document.getElementById('subject').value;
		draft.message = document.getElementById('message');
		draft.address = draft.message.parentNode.nextSibling.nextSibling.value;
		draft.message = draft.message.value;
		var hours = date.getHours() % 12;
		hours = hours == 0 ? 12 : hours;
		var minutes = date.getMinutes();
		if ((''+minutes).length < 2) minutes = '0'+minutes;
		var month = date.getMonth() + 1;
		if ((''+month).length < 2) month = '0'+month;
		var day = date.getDate();
		if ((''+day).length < 2) day = '0'+day;
		draft.time = month+'/'+day+' @ '+hours+':'+minutes+' '+(hours > 12 ? 'PM' : 'AM');
		if (PEsavior.saveAs !== undefined) { drafts[PEsavior.saveAs] = draft; delete PEsavior.saveAs; } else drafts.push(draft);
		localStorage.savedDrafts = drafts.toJSON();
		alert('Draft Saved!');
	}

	// showMail hook
	PEsavior.showMail = function(REQ, which, id, toggle) {
		try {
			var whichBar = REQ.dom.childNodes[3];
			whichBar.innerHTML = whichBar.innerHTML.match(/.*\[/)+
				' <a href="#" onclick="showMail(\'in\');">Received</a> | '+
				'<a href="#" onclick="showMail(\'out\');">Sent</a> | '+
				'<a href="#" onclick="PEsavior.showDrafts()">Drafts</a> ]';
		} catch (e) { alert(e) }
		return REQ;
	}
	// end showMail hook

	// composeMail hook
	PEsavior.composeMail = function(REQ, to, id) {
		try {
			var sendButton = REQ.dom.getElementsByTagName('a')[2];
			var saveButton = sendButton.parentNode.insertBefore(document.createElement('a'), sendButton.nextSibling.nextSibling);
			saveButton.textContent = 'Save!';
			saveButton.setAttribute('onclick', 'PEsavior.saveDraft()');
			saveButton.id = 'saveButton';
			saveButton.className = 'txtbutton';
			saveButton.title = 'Save Message';
			delete PEsavior.saveAs;
			if (PEsavior.editingDraft !== undefined) {
				var drafts;
				if ((drafts = PEsavior.loadDrafts()) === null) { return; }
				PEsavior.saveAs = PEsavior.editingDraft;
				REQ.dom.getElementsByTagName('input')[0].setAttribute('value', drafts[PEsavior.editingDraft].subject);
				REQ.dom.getElementsByTagName('textarea')[0].textContent = "\n"+drafts[PEsavior.editingDraft].message;
				delete PEsavior.editingDraft;
			}
		} catch (e) { alert(e) }
		return REQ;
	}
	// end composeMail hook

	// hookable showMail replacement
	function showMail(which,id,toggle) {
		var url = '/nile.php?what=showMail&which='+which+'&id='+id+'';
		var ajax = new Ajax.Request(url,{ onComplete: display });
		function display(REQ){
			REQ = runHooks('showMail', REQ, which, id, toggle);
			if (toggle == 1) {
				Effect.toggle('scrollsbox','appear',{duration:0.3});
			}
			$('scrollsbox').innerHTML = REQ.responseText;
		}
	}
	// end hookable showMail replacement

	// hookable composeMail replacement
	function composeMail(to,id) {
		var url = '/nile.php?what=composeMail&toid='+to+'&id='+id+'';
		var ajax = new Ajax.Request(url,{ onComplete: display });
		function display(REQ){
			REQ = runHooks('composeMail', REQ, to, id);
			Effect.Appear('scrollsbox',{duration:0.3});
			$('scrollsbox').innerHTML = REQ.responseText;
		}
	}
	// end hookable composeMail replacement

	// new API presents for ArmEagle -- probably not the ideal, but I need this. we shall collaborate further, yes? :)
	function interceptCall(key, p1, p2, p3) {
		try {
			if ( window.INTERCEPT !== undefined && window.INTERCEPT.get(key) !== undefined )
				for(i = 0; i < window.INTERCEPT.get(key).length; i++)
					if (window.INTERCEPT.get(key)[i](p1,p2,p3)) return true;
		} catch (exc) { AEG.debugHandleException('interceptCall', exc); }
	}
	// end new API presents

	// hookable getMsgBody replacement -- allows mangling AND interception!
	function getMsgBody(mailid) {
		$(mailid).innerHTML = '<img src="/images/loading.gif" width="43" height="11" alt="" title="Loading" />';
		if (interceptCall('getMsgBody', mailid)) return;
		var url = '/nile.php?what=showMailBody&updateelem='+mailid+'';
		var ajax = new Ajax.Request(url,{ onComplete: display });
		function display(REQ){
			REQ = runHooks('getMsgBody', REQ, mailid);
			$(mailid).innerHTML = REQ.responseText;
		}
	}
	// end hookable getMsgBody replacement

	// set up interceptors if they're not already set up
	if ( window.INTERCEPT === undefined ) { window.INTERCEPT = $H({}); }
	// install getMsgBody interceptor
	if ( window.INTERCEPT.get('getMsgBody') === undefined ) { window.INTERCEPT.set('getMsgBody', []); }
	window.INTERCEPT.get('getMsgBody').push(PEsavior.viewDraft);
	// only one interceptor for now...

	// setup hooks if they're not already set up
	if ( window.HOOK === undefined ) { window.HOOK = $H({}); }
	// install composeMail hook
	if ( window.HOOK.get('composeMail') === undefined ) { window.HOOK.set('composeMail', []); }
	window.HOOK.get('composeMail').push(PEsavior.composeMail);
	// install sendMail hook
	if ( window.HOOK.get('showMail') === undefined ) { window.HOOK.set('showMail', []); }
	window.HOOK.get('showMail').push(PEsavior.showMail);
	// that's all she wrote...
}
