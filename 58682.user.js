// ==UserScript==
// @name			Blackboard Forum Participantion counter
// @namespace		https://ol.baker.edu
// @description	Count participation within Blackboard
// @include		https://ol.baker.edu/webapps/discussionboard/do/forum*
// @include		https://ol.baker.edu/webapps/discussionboard/do/message*
// ==/UserScript==
alert('start');
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; script_load(); }
    }
    GM_wait();
alert($);	
var student = {
	FirstName: 'Jay',
	LastName: 'McKinney',
	DisplayName: function() {
		return this.FirstName.toUpperCase() + ' ' + this.LastName.toUpperCase();
	},
	PostCount: 0,
	ID: -1
};
var formumLinks = [],
	lnkIndex = 0,
	scriptMode = '',
	rootUrl= 'https://ol.baker.edu/webapps/discussionboard/do/';
function setLabelValue(msg) {
	//$('#divScriptLabelPostCount').html(msg);
	alert(msg);
}
function getStoredLinks() {
     var arr = [];
     var test = GM_getValue('formumLinks', '');
     if(test !== '') {
          arr = test.split(',');
     }
     return arr;
}
function getThreads() {
	$('.dbheading a').each(function() {
		var href = $(this).attr('href');
		formumLinks.push(href);
	});
        GM_setValue("formumLinks", formumLinks.join(','));
}
function processThread(index) {
	if(index < formumLinks.length) {
		GM_setValue("lnkIndex", index);
		window.location.href = rootUrl + formumLinks[index];
	}
}
function executeStep() {
	if(lnkIndex < formumLinks.length) {
		lnkIndex++;
		GM_setValue("lnkIndex", lnkIndex);
		processThread(lnkIndex);
	} else {
		scriptMode = 'WAIT';
		GM_setValue("scriptMode", scriptMode);
	}
	setLabelValue(student.PostCount);
}
function executePostCounter() {
	$('#treeForm table td[width="30%"]').each(function(i) {
		if(this.innerHTML.indexOf(student.DisplayName()) > -1) {
			student.PostCount++;
			GM_getValue("PostCount", student.PostCount);
			setLabelValue(student.PostCount);
		}
	});
	executeStep();
}
function start_click() {
    forumLinks = getStoredLinks();
	student.FirstName = GM_getValue('FirstName', 'Jay');
	student.LastName = GM_getValue('LastName', 'McKinney');
	student.ID = GM_getValue('ID', -1);
	scriptMode = GM_getValue('scriptMode', null);
	lnkIndex = GM_getValue('lnkIndex', 0);
	student.PostCount = parseInt(GM_getValue('PostCount', 0));
	setLabelValue(student.PostCount);
	if(scriptMode === null) {
		scriptMode = "INITIAL";
		GM_setValue("scriptMode", scriptMode);
	}
	if(student.DisplayName() !== '') {
		if(scriptMode === 'INITIAL') {
			var test = GM_getValue("formumLinks", null);
			if(test === null){
				getThreads();
				scriptMode = 'PROCESS';
				GM_setValue("scriptMode", scriptMode);
				executeStep();
			}
		} else {
			scriptMode = 'PROCESS';
			GM_setValue("scriptMode", scriptMode);
			executeStep();
		}
	}
}
function clear_click() {
     GM_setValue('scriptMode', null);
     GM_setValue('formumLinks', null);
     document.forms[0].submit();
}
function promptUser() {
	var bClear = confirm('Clear variables?');
	var bStart = confirm('Start counter?');
	if(bClear) {
		clear_click();
	}
	if(bStart) {
		start_click();
	}
}
function script_load() {
	promptUser();
}