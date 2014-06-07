// ==UserScript==
// @name           Play All BangExtreme Videos By DemianGod (Inluding Premium Links!)
// @namespace      BangExtreme.com
// @description    Play All WWW.BangExtreme.com Videos By DemianGod (Inluding Premium Links!)
// @include        http://*bangextreme.com/*
// ==/UserScript==

unsafeWindow.pop = function(url){newwin=window.open(url,'vid','height=509,width=640,location=1,resizable=1');};

var lnk = document.links;
for (var u=0; u<lnk.length; u++)
{

var index = lnk[u].href.indexOf("http://www.bangextreme.com/viewVideo.php?video_id=");
if (index > -1) {

var vidid = lnk[u].href
var vidid = vidid.split("&");
var vidid = vidid[0];
var vidid = vidid.split(',');
var vidid = vidid[0];
var vidid = vidid.split('=');
var vidid = vidid[1];

var vidid = "http://www.bangextreme.com/flvplayer.swf?config=http://www.bangextreme.com/videoConfigXmlCode.php?pg=video_" + vidid;

lnk[u].href = "javascript:pop('"+vidid+"')";
}


}