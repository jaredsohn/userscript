// ==UserScript==
// @name          Sort Recipient Alphabetically in Gmail
// @namespace     http://mail.google.com/
// @description   sort multiple recipients alphabetically. 
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==
var gmailDoc;
var me = {};
me.felix = {}
var NS = me.felix;
NS.getNames = function(srcElement) {
	var reList = srcElement.value;
	var recipients = NS.parseRecipients(reList);
	var sortedRe = NS.sort(recipients);
	srcElement.value = NS.update(sortedRe);
};

NS.update = function(sortedRe) {
	var ret = '';
	for (var i = 0, l = sortedRe.length; i< l; i++) {
		var cur = sortedRe[i];
		ret += (cur.name == '' ? '' : cur.name + ' ')  + cur.mailbox + ', '
	}
	return ret.substring(0, ret.length - 1);
};

NS.sort = function(recipients) {
    var mailboxes = [];
	var temp = {};
	for (var i = 0, l = recipients.length; i < l; i++) {
	    var r = recipients[i];
		mailboxes.push(r.mailbox);
		temp[r.mailbox] = r;
	}
	mailboxes.sort();
	var result = [];
	for (var i = 0, l = mailboxes.length; i < l; i++) {
		var m = mailboxes[i];
		result.push(temp[m]);
	}
	return result;
};

NS.parseRecipients = function(toVal){
	var unQuoted = true;
	var splitIndex = [];
	for (var i = 0, l = toVal.length; i < l; i++){
		if (unQuoted && toVal[i] == ',') {
			splitIndex.push(i);
		}
		if (toVal[i] == '"')
			unQuoted = !unQuoted;
	}
	var result = [];
	var last = 0;
	for (var i = 0, l = splitIndex.length; i< l; i++) {
		var next = splitIndex[i];
		var temp = toVal.substring(last, next);
		var nameMatch = temp.match(/\".*\"/);
		var name = nameMatch == null ? '' : nameMatch[0];
		var mailbox = temp.replace(name, "").replace(/^\s+|\s+$/g,"");
		result.push({"name":name, "mailbox":mailbox});
		last = next + 1;
	}
	return result;
};

NS.handle = function(e) {
	var srcName = e.srcElement.name;
	if (!(srcName == 'to' || srcName == 'cc' || srcName == 'bcc'))
	 return;
	 
	if (e.which == 82 && e.altKey && e.ctrlKey && e.shiftKey){
		NS.getNames(e.srcElement);
	}	
};

NS.init = function() {
        try {
                gmailDoc = document.getElementById('canvas_frame').contentDocument;
        } catch(e){};
        if (gmailDoc == null) {
	        setTimeout(500, NS.init);
	} else {
	        gmailDoc.addEventListener('keydown',NS.handle);
	}
};

NS.init();