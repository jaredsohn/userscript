// ==UserScript==
// @name GOMbro
// @author Mittens
// @version 0.10b
// @include http://www.gomtv.net/2010gslopens1/vod/*
// @include http://www.gomtv.net/2010gslopens2/vod/*
// @include http://www.gomtv.net/2010gslopens3/vod/*
// @exclude http://www.gomtv.net/2010gslopens1/vod/
// @exclude http://www.gomtv.net/2010gslopens2/vod/
// @exclude http://www.gomtv.net/2010gslopens3/vod/
// @exclude http://www.gomtv.net/2010gslopens3/vod/?
// @exclude http://www.gomtv.net/2010gslopens2/vod/?
// @exclude http://www.gomtv.net/2010gslopens1/vod/?
// @description  Removes premium requirement from GOM GSL vods
// ==/UserScript==

unsafeWindow.number = function()
{
return randomnumber=Math.floor(Math.random()*3);
}
unsafeWindow.memberid = 0;
unsafeWindow.baselocation = unsafeWindow.location.href.substr(0, unsafeWindow.location.href.length - 8);
unsafeWindow.straw = unsafeWindow.number();

unsafeWindow.setmem = function(derp)
{
unsafeWindow.memberid = derp;
}

GM_xmlhttpRequest({
    method: 'POST',
    url: "http://www.mittans.com/Main/lividlout.aspx",
data: "loc=" + unsafeWindow.baselocation + "&straw=" + 
unsafeWindow.straw,
	headers: {
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	'Content-type': 'application/x-www-form-urlencoded'
	},
    onload: function(responseDetails) {
        unsafeWindow.memberid = responseDetails.responseText;
		if (unsafeWindow.straw == 0)
{		
var myHaxMenu = document.createElement("div");
myHaxMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#myhaxlayer #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+'-->'
+'</style>'
+'<div style="position: fixed; z-index: 100; right; top: 10pt; left: 0pt" id="myhaxlayer">'
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'
+'<tr><td>Sorry, you drew a short straw<br/>So you\'ll get a random ID to try<br/>See if video loads, then click a button<br/><br/>All Set 1 videos in SQ work<br/>So don\'t click if you\'ve only tried that</td></tr><br/><tr><td><p align="left" style="font-size: 12px">'
+'<a href="javascript:void(0);" onclick="javascript:workwork(\'1\');"><img src="http://www.mittans.com/img/tick-icon.png"/></a>Worked<br/></p><hr style="padding: 1px 0px 1px 0px"/>'
+'<p align="left" style="font-size: 12px"><a href="javascript:void(0);" onclick="javascript:workwork(\'0\');"><img src="http://www.mittans.com/img/block-icon.png"/></a>Broken'
+'</p></td></tr></table></div>'
document.body.insertBefore(myHaxMenu, document.body.firstChild);
}
else
{
var myHaxMenu = document.createElement("div");
myHaxMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#myhaxlayer #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+'-->'
+'</style>'
+'<div style="position: fixed; z-index: 100; right; top: 10pt; left: 0pt" id="myhaxlayer">'
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'
+'<tr><td>You drew a long straw.<br/>So you\'ll get an ID that should work<br/>If the video is broken click the button<br/></td></tr><br/><tr><td>'
+'<p align="left" style="font-size: 12px"><a href="javascript:void(0);" onclick="javascript:workwork(\'0\');"><img src="http://www.mittans.com/img/block-icon.png"/></a>Broken'
+'</p></td></tr></table></div>'
document.body.insertBefore(myHaxMenu, document.body.firstChild);
}	
		}});
unsafeWindow.workwork = function(works) {
setTimeout(function(){GM_xmlhttpRequest({
    method: 'POST',
	url: "http://www.mittans.com/Main/lividlout.aspx",
	data: "?mem=" + unsafeWindow.memberid + "&loc=" + unsafeWindow.baselocation + "&works=" + works,
	headers: {
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	'Content-type': 'application/x-www-form-urlencoded'
	},
onload: function(response) {
var Node1 = document.body.firstChild;
Node1.parentNode.removeChild(Node1);
	 if(works == 0)
{
var repond = document.createElement("div");
repond.innerHTML = "Thanks for helping! Page will reload shortly.";
	document.body.insertBefore(repond, document.body.firstChild);
setTimeout("document.location.reload()", 2500)}
else {
var repond = document.createElement("div");
repond.innerHTML = "Thanks for helping! You can continue watching, etc.";
	document.body.insertBefore(repond, document.body.firstChild);
	unsafeWindow.straw = 1;
}
	}
})}, 0);
}

unsafeWindow.play = function(seq, vid, sets, vseq) {
		var url	= 'http://www.mittans.com/Main/gigglinggoat.aspx?bid='+vid+'&vseq='+vseq + '&vq=' + unsafeWindow.setVQ + '&mem=' + unsafeWindow.memberid;
		if(unsafeWindow.setVQ == 'SQ'){
			unsafeWindow.playerSwf.addGoxUrl(url);
		} else if (unsafeWindow.setVQ == 'HQ'){
			unsafeWindow.playerSwf960.addGoxUrl(url);
		}
		unsafeWindow.playInfo[0] = seq;
		unsafeWindow.playInfo[1] = vid;
		unsafeWindow.playInfo[2] = sets;
		unsafeWindow.playInfo[3] = vseq;
		var btnVQ = document.getElementById('btnVQ');
		setTimeout(function() {
			if(btnVQ) btnVQ.style.display = 'block';
		}, 1000);
		unsafeWindow.isFlvPlay = true;
    }
unsafeWindow.callSetInfo = function(isCC, bid, setid, sets, vseq)
{
	var pSets2 = unsafeWindow.pSets;

if(pSets2 == 0){
		unsafeWindow.$('setsTxt_'+sets).style.display = 'block';
		unsafeWindow.$('setBtn_'+sets).removeClassName('set_off').addClassName('set_on');	
		} else {
		unsafeWindow.$('setsTxt_'+pSets2).style.display = 'none';
		unsafeWindow.$('setBtn_'+pSets2).removeClassName('set_on').addClassName('set_off');
		unsafeWindow.$('setsTxt_'+sets).style.display = 'block';
		unsafeWindow.$('setBtn_'+sets).removeClassName('set_off').addClassName('set_on');
	unsafeWindow.upSetsView(setid, sets);
			unsafeWindow.stopPlayer('1');
			unsafeWindow.play(isCC, bid, sets, vseq);
		}
unsafeWindow.pSets = sets;
	}