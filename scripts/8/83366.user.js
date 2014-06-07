// ==UserScript==
// @name		  medialinkplayer
// @namespace	 
// @description   点击链接播放媒体
// @include	   *
// ==/UserScript==

var aposi=vposi=0;

function xpath(query) {
	 return document.evaluate(query, document, null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function playaudio(surl) {
	document.body.appendChild(p);
	if (aposi==0)
	p.setAttribute('style', 'width: 210px; height: 75px; top: 20%; left:0%; position: fixed; color: black; background: white; border: 1px solid black; ');
	p.setAttribute('style', p.attributes.getNamedItem("style").value.replace(/height.*?;/g,"height: 75px;"));
	show(50,210,surl);
	aposi=1;
}

function playvideo(surl) {
	document.body.appendChild(p);
	if (vposi==0)
	p.setAttribute('style', 'width: 210px; height: 175px; top: 20%; left:0%; position: fixed; color: black; background: white; border: 1px solid black; ');
	p.setAttribute('style', p.attributes.getNamedItem("style").value.replace(/height.*?;/g,"height: 175px;"));
	show(150,210,surl);
	vposi=1;
}

function show(h,w,surl) {
	document.getElementById("bofangqi").innerHTML="<embed src='"+surl+"' hidden=false height="+h+" width="+w+" autostart=true loop=false><br>&nbsp;&nbsp;<a style=color:blue;text-decoration:none;font-size:11pt  href=javascript:mymove(3);>←</a>&nbsp;<a style=color:red;text-decoration:none;font-size:11pt href='"+surl+"'>下载</a>&nbsp;&nbsp;<a style=color:blue;text-decoration:none;font-size:11pt  href=javascript:mymove(1);>↑</a>&nbsp;&nbsp;<a style=color:red;text-decoration:none;font-size:11pt  href=javascript:myhide();>隐藏</a>&nbsp;&nbsp;<a style=color:blue;text-decoration:none;font-size:11pt  href=javascript:mymove(2);>↓</a>&nbsp;&nbsp;<a style=color:red;text-decoration:none;font-size:11pt  href=javascript:myclose();>关闭</a>&nbsp;<a style=color:blue;text-decoration:none;font-size:11pt  href=javascript:mymove(4);>→</a>";
}

function hide() {
	p.setAttribute('style', 'visibility:hidden');
}

function move(dire) {
	switch (dire){
	case 1:
	p.setAttribute('style', p.attributes.getNamedItem("style").value.replace(/top.*?;/g,"top:0%;"));
	p.setAttribute('style', p.attributes.getNamedItem("style").value.replace(/bottom.*?;/g,"top:0%;"));
	break;
	case 2:
	p.setAttribute('style', p.attributes.getNamedItem("style").value.replace(/top.*?;/g,"bottom:0%;"));
	break;
	case 3:
	p.setAttribute('style', p.attributes.getNamedItem("style").value.replace(/right.*?;/g,"left:0%;"));
	break;
	case 4:
	p.setAttribute('style', p.attributes.getNamedItem("style").value.replace(/left.*?;/g,"right:0%;"));
}}

function close() {
	document.body.removeChild(p);
}

function creatediv() {
	unsafeWindow.myplayaudio=playaudio;
	unsafeWindow.myplayvideo=playvideo;
	unsafeWindow.myhide=hide;
	unsafeWindow.myclose=close;
	unsafeWindow.mymove=move;
	p = document.createElement('div');
	p.setAttribute('ID', 'bofangqi');
	p.innerHTML = '播放器';
}

(function(){
	creatediv();
	var allLinks, thisLink;
	allLinks = xpath("//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.MP3']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.WMA']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.WAV']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.MID']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.OGG']");
	if (allLinks.snapshotLength){
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.href = "javascript:myplayaudio('"+thisLink.href+"')";
}
	creatediv();
}
	allLinks = xpath("//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.AVI']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.WMV']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.MOV']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.MKV']|//a[translate(substring(@href,string-length(@href)-4,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.RMVB']|//a[translate(substring(@href,string-length(@href)-2,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.RM']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.MP4']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.FLV']|//a[translate(substring(@href,string-length(@href)-4,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.3GP']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.MPG']|//a[translate(substring(@href,string-length(@href)-4,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.MPEG']|//a[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.ASF']");
	if (allLinks.snapshotLength){
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.href = "javascript:myplayvideo('"+thisLink.href+"')";
}
	creatediv();
}})();