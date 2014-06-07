// ==UserScript==
// @name           QRCodeGenerator
// @namespace      http://blog.varunkumar.me
// @description    Generates QR codes for hyperlinks on the page
// @include        http://*
// @include        https://*
// ==/UserScript==

// Add jQuery for easy Javascripting :)
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

GM_wait();
var JQ = {};
function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
		GM_log('test');
	} else	{
		JQ = unsafeWindow.$;
		
		// jQuery is loaded. Load the cluetip plug-in
		var GM_JQ_Clue = document.createElement('script');
		GM_JQ_Clue.src = 'http://varun-scratchpad.googlecode.com/svn/trunk/static/jquery.cluetip.js';
		GM_JQ_Clue.type = 'text/javascript';
		document.body.appendChild(GM_JQ_Clue);

		GM_wait_plugin();
	}
}

function GM_wait_plugin() {
	if (typeof JQ.fn == 'undefined' || typeof JQ.fn.cluetip == 'undefined') {
		window.setTimeout(GM_wait_plugin, 100);
	} else {
		GM_init();
	}
}

function GM_init() {
	JQ.fn.cluetip.defaults.dropShadow = false;
	JQ.fn.cluetip.defaults.onActivate = function(e) {
		if (e.length > 0) {
			var anchor = e.context;
			var link = anchor.href;
			if (link.indexOf("javascript:") == 0)
				return false;
			
			JQ("#imgQR").attr("src", "http://chart.apis.google.com/chart?chf=a,s,000000&chs=200x200&chld=|2&cht=qr&chl=" + encodeURIComponent(link));
			JQ("#imgQR").attr("alt", anchor.innerText);
			return true;
		} else
			return false;
	};
	JQ("a").attr("rel", "#divQR");
	JQ("a").cluetip({local: true, hideLocal: true, showTitle: false, clickThrough: true});
	
	var myDiv = document.createElement("div");
	myDiv.setAttribute("id", "divQR");
	myDiv.setAttribute("style", "z-index:101; background-color: #D9E6F7; border:4px solid #C1D9FF; text-align:center; display:none;font-family:calibri;-moz-border-radius:5px;-webkit-border-radius: 5px;width:200px;height:380px;padding:-5px;");
	myDiv.innerHTML = '<img id="imgQR" src="" width="200" height="200" alt="" /><p align="justify" style="padding-left:15px;padding-right:15px">QR code will be shown for each link on hovering over it. Scan the QR code above using Barcode Scanner from your smart phone, and the link will be instantly accessible on your phone.</p>';
	document.body.appendChild(myDiv);
}
