// Music India Online Hack - Opens SMIL directly on clicking on music links
// version 0.3 BETA!
// --------------------------------------------------------------------
//
//
// ==UserScript==
// @name          Music India Online Player
// @namespace     http://www.musicindiaonline.com/hackforlinux/
// @description   Bypasses the musicindia triden player and creates a link to play the songs directly in real player
// @include       http://www.musicindiaonline.com/*
// ==/UserScript==
function playSMIL2(){playSMIL(this.title);}
function playSMIL(moi_uri){
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: moi_uri,
	  headers:{'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.3) Gecko/20070309 Firefox/2.0.0.3', 'Accept': 'application/atom+xml,application/xml,text/xml' },
	  onload: function(responseDetails){
		var re = /<frame name="player" .* src="(.*?)"/;
		if (re.test(responseDetails.responseText)){
		var uri = 'http://www.musicindiaonline.com' + re.exec(responseDetails.responseText)[1];
		GM_xmlhttpRequest({
			method: 'GET',
			url: uri,
			headers:{ 'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.3) Gecko/20070309 Firefox/2.0.0.3', 'Accept': 'application/atom+xml,application/xml,text/xml'},
			onload: function(responseDetails){
			var re = /playerh\.start\('(.*?)'\);/;
			var smil = '';
			if (re.test(responseDetails.responseText)){smil = re.exec(responseDetails.responseText)[1];}
			var win= window.open(smil,'music indiaonline',"menubar=no,toolbar=no,location=no,directories=no,personalbar=no,status=no,dependent=yes,width=640,height=480");
			}
		});
	   }
	}
       });
  }
function moi_subo() {
var l='/cg/';
var w = 'sls';
var n = 'scx';
var frm = document.getElementsByName(w)[0];
u=l;did=0;for(i=0;i<frm.elements.length;i++){
if(frm.elements[i].name==n && frm.elements[i].checked){
did=1;
u += frm.elements[i].value+'/';
}}
if(did){
	this.title = 'http://www.musicindiaonline.com' + u;
	playSMIL(this.title);
}else{alert("Please select atleast one song to play")}
}
try {
	var allLinks;
	allLinks = document.evaluate( '//a[contains(@href,"/p/x/") or contains(@href,"/p/xx/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0;i< allLinks.snapshotLength;i++){
		var thisLink = allLinks.snapshotItem(i);
		var parentLink = thisLink.parentNode;
		parentLink.removeChild(thisLink);
		var myLink = document.createElement('a');
		myLink.title = thisLink.href;
		myLink.href="#";
		myLink.innerHTML = thisLink.innerHTML;
		myLink.addEventListener('click', playSMIL2 ,true);
 		parentLink.insertBefore(myLink,parentLink.firstChild);	
	}
	var playSelected = document.getElementsByName('pss')[0];
	if (playSelected) {
		var pssParent = playSelected.parentNode; var pssValue = playSelected.value;
		pssParent.removeChild(playSelected);
		playSelected = document.createElement('input'); playSelected.type  = 'button'; playSelected.value = pssValue;
		playSelected.addEventListener('click', moi_subo,true);
		pssParent.appendChild(playSelected);
	}
	
	allLinks = document.evaluate( '//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0;i< allLinks.snapshotLength;i++){
		var thisLink = allLinks.snapshotItem(i);
		thisLink.parentNode.removeChild(thisLink);
	}
	allLinks = document.evaluate( '//img[contains(@src,"728x90")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0;i< allLinks.snapshotLength;i++){
		var thisLink = allLinks.snapshotItem(i);
		thisLink.parentNode.removeChild(thisLink);
	}

	
} catch(e){
	GM_log(e);
}
