// ==UserScript==
// @name           Feedly LastModified Tweak
// @version        0.0.3.2
// @description    Replace the original relative date with absolute published/received date on Feedly
// @author         nodaguti
// @license        MIT License
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @run-at         document-end
// @note           This script is based on Feedly LastModified Fix (http://userscripts.org/scripts/show/292592) by ark4951.
// @grant          GM_addStyle
// ==/UserScript==

(function(){

// --- config ---

// Show received date instead of published date.  true/false (Default: false)
var USE_RECEIVED = false;

// Always show full date string.  true/false (Default: false)
// ** This option works on Title Only view only. **
var ALWAYS_FULL_DATE = false;

// Hide seconds if an article was published today  true/false (Default: false)
var HIDE_SECONDS = false;

// --- /config ---


function init(){
	var mo = new MutationObserver(function(){
		Array.prototype.slice.call(document.querySelectorAll("div.lastModified > span, div.metadata > span[title*='GMT']")).forEach(function(item){
			fixLastModified(item);
		});
	});

	mo.observe(document.getElementById("box"), { childList:true, subtree:true });

	GM_addStyle("\
		.lastModified{\
			/* Remove width limitation of div.lastModified */\
			width: auto !important;\
			overflow: auto !important;\
		}\
		.lastModifiedStr{\
			display: none;\
		}\
		.u0Entry .lastModifiedStr{\
			display: inline;\
		}\
		.u0Entry .lastModifiedFullStr{\
			display: none;\
		}\
		.u0Entry:hover .lastModifiedFullStr{\
			display: inline;\
		}\
		.u0Entry:hover .lastModifiedStr{\
			display: none;\
		}\
	");

	if(ALWAYS_FULL_DATE){
		GM_addStyle("\
			.u0Entry .lastModifiedFullStr{\
				display: inline;\
			}\
			.u0Entry .lastModifiedStr{\
				display: none;\
			}\
		");
	}
}


function fixLastModified(item){
	if(item.dataset.lastModified) return;

	var fixedDateString = USE_RECEIVED ?
		(item.title.match(/Received:(.+?GMT)/i) || [])[1] :
		(item.title.match(/published:(.+?GMT)/i) || [])[1];

	if(!fixedDateString) return;

	var fixedDate = new Date(fixedDateString);

	if((new Date()).getDate() === fixedDate.getDate()){
		item.innerHTML = "<span class='lastModifiedStr'>" +
			(
				HIDE_SECONDS ? ("0" + fixedDate.getHours()).slice(-2) + ":" + ("0" + fixedDate.getMinutes()).slice(-2) :
							   fixedDate.toLocaleTimeString()
			) + "</span>";
	}else{
		item.innerHTML = "<span class='lastModifiedStr'>" + fixedDate.toLocaleDateString() + "</span>";
	}

	item.dataset.lastModified = fixedDate.toLocaleString();
	item.innerHTML += "<span class='lastModifiedFullStr'>" + fixedDate.toLocaleString() + "</span>";
}


init();

})();
