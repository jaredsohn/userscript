// ==UserScript==
// @name MafiaWarsInvite
// @description MafiaWars AutoInvite
// @namespace facebook
// @version 0.3
// @include http://apps.facebook.com/inthemafia/*
// ==/UserScript==


if (document.body.innerHTML.indexOf('<label class="clearfix"><input class="inputcheckbox" id="ids[]" name="ids[]" value="') != -1)
{

var allDivs, thisDiv;
allDivs = document.evaluate(
  "//input[@class='inputcheckbox']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null
);



for (var i = 0; i < allDivs.snapshotLength; i++) {
  thisDiv = allDivs.snapshotItem(i);

url = "http://mwdirectfb10.zynga.com/mwfb/remote/html_server.php?xw_controller=friendbar&xw_action=send_add&fid="+thisDiv.value;

GM_xmlhttpRequest({
  method:"GET",
  url: url,
  headers:{
    "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
    "Accept":"text/xml"
  }
});

//window.location = url;
//alert(url);

//  alert(thisDiv.value);
}
		

window.location = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=recruit&xw_action=view";

}