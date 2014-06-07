// ==UserScript==
// @id             steamcommunity.com-3c4db819-2724-404f-813d-b08e6986f67b@scriptish
// @name           Link2Steam
// @version        1.0
// @namespace      http://github.com/deltaburnt
// @author         deltaburnt
// @description    Open Steam community and Steam store links in your Steam client
// @include        http://steamcommunity.com/*
// @include        http://store.steampowered.com/app/*
// @run-at         document-end
// ==/UserScript==

var loc = window.location.href;

//Store Button
var urlmatch = loc.match("http:\\/\\/store\\.steampowered\\.com\\/app\\/(\\d*)(\\/)?.*");
if(urlmatch !== null)
{
    var appid = urlmatch[1];
    var btncontainer = document.querySelector("div.apphub_OtherSiteInfo");
    var btn = '<a class="btn_darkblue_white_innerfade btn_medium" href="steam://store/'+appid+'">';
		btn += '<span>Open in Steam</span>'
		btn += '</a>';
    var btndom = htmlToDomNode(btn);
    
    btncontainer.insertBefore(btndom, btncontainer.firstChild);
}

//Specific Community Page Buttons
urlmatch = loc.match("http:\\/\\/steamcommunity\\.com\\/sharedfiles\\/filedetails\\/\\?id=(\\d*)(.*)?");
if(urlmatch !== null)
{
    var fileid = urlmatch[1];
    var btncontainer = document.querySelector("div#ItemControls");
    var btn = '<span class="general_btn share tooltip" data-tooltip-content="Open this link in your steam client">';
        btn += 'Steam Link';
		btn += '</span>';
	var btndom = htmlToDomNode(btn);
	
	btndom.addEventListener("click", function () {
	   window.location.assign('steam://url/CommunityFilePage/'+fileid);
	});
	
	btncontainer.insertBefore(btndom, btncontainer.querySelector("div.share_controls"));
}

function htmlToDomNode(html) {
  var container = document.createElement('div');
  container.innerHTML = html;
  return container.firstChild;
}