// ==UserScript==
// @name           MFCTools
// @description    MFCTools.
// @namespace      p69n320
// @version         2012-Sep-11
// @include        http://www.myfreecams.com/*
// ==/UserScript==


unsafeWindow.mfctools_bootloader_version = 20130619;


var match2 = "http://webchat.freenode.net/";
if(document.location.href.substr(0, match2.length) == match2)
{
	document.body.onload = function() {
		
		var store = localStorage.getItem('MFCToolsChatStorage');
		if(store == null)
		{
			store = {};
			store.user = "";
			store.channel = "#mfctools";
			localStorage.setItem('MFCToolsChatStorage', JSON.stringify(store));
		}
		else
			store = JSON.parse(localStorage.getItem('MFCToolsChatStorage'));
	
		var name_input = unsafeWindow.document.getElementsByTagName('input')[0];
		name_input.value = store.user;
		name_input.onchange = function() {
			store.user = this.value;
			localStorage.setItem('MFCToolsChatStorage', JSON.stringify(store));
		};
	
		var channel = document.getElementsByTagName('input')[1];
		channel.value = store.channel;
		channel.disabled = true;
	}
	return;
}

var match = "http://www.myfreecams.com/mfc2/static/top.html";
if(document.location.href.substr(0, match.length) != match)
{
	return;
}

if(typeof GM_xmlhttpRequest == 'undefined')
{
    alert("In order for MFCTools script to work it is necessary either of the following extensions are installed in your browser:\nGreaseMonkey (Firefox)\nTamperMonkey (Chrome)");
    return;
}

window = unsafeWindow;

console.log('Started MFCTools2');

// alert("MFC Tools script is still under active development. When pressing any model a new \
// window/tab should open with a fancy menu and the pressed model video preview. Please let me know \
// if you have any problems either by Tweeting to myself (p69n320) or leaving a comment at \
// userscripts.org");
now = new Date();
	
function reload_page() {
	
	GM_xmlhttpRequest({
	  method: "GET",
	  headers: {
		'Pragma': 'no-cache', 
		'Expires': '0',
		'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
	  },
	  url: "https://dl.dropbox.com/s/bn3bzgrp7b646ig/MfcTools.html?dl=1",
	  onload: function(response) {
	    unsafeWindow.serverPageContent = response.responseText;
	  }
	});
}
reload_page();
unsafeWindow.reload_page = reload_page;


function loadWindow() {
	if(typeof unsafeWindow.hack_child == 'undefined' || unsafeWindow.hack_child.closed == true)
	{
		var child = unsafeWindow.open();
		if(typeof child.opener == "undefined" || !child.opener) 
			child.opener = this.window;
		child.document.write(unsafeWindow.serverPageContent);
		child.document.close();
		unsafeWindow.hack_child = child;
	}
}

function loadModel(model_id, count) {
	count = (count == undefined) ? 10 : count;
	if(typeof unsafeWindow.child_add_model == 'undefined')
	{
		if(count > 0)
		{
			setTimeout(function() { loadModel(model_id, count-1); }, 100);
		}
	}
	else
		unsafeWindow.child_add_model(model_id);
}

var prv_Load = unsafeWindow.Load;
unsafeWindow.Load = function(action, options, element) {
	if(action == 'player' && options['style'] == "text-decoration:none;")
	{
		loadWindow();
		loadModel(options.broadcaster_id);
	}
	else
		prv_Load(action, options);
}
