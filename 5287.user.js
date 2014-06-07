// ==UserScript==
// @name           YahooCalAd
// @namespace      http://mywebsite.com/myscripts
// @description    A yahoo calendar advert destroyer
// @include        http://calendar.mail.yahoo.com/*
// ==/UserScript==

// see if we're in daydataview
function deleteNode(node){
	nodeparent=node.parentNode;
	oldnode=nodeparent.removeChild(node);
	return nodeparent;
}

function pixtoint(pix){
	if (pix.length == 0 ) return 0;
	if ( pix.substring(pix.length - 2, pix.length) != "px" ) return pix;
	return (parseInt(pix.toString().substring(0,pix.length - 2 )));
}
function addpix(pix1, pix2){
	return (pixtoint(pix1)+pixtoint(pix2));
}
// this is the day table
var daydatatbl=parent.document.getElementById('daydata'); 
// this is the week div tag
var wkdatadiv=parent.document.getElementById('weekdataview'); 
// this is the year div tag
var yrdatadiv=parent.document.getElementById('yeardataview'); 
if (daydatatbl == null && wkdatadiv == null  && yrdatadiv==null) {

return;
}

if ( daydatatbl != null ){
	daydata_td= daydatatbl.parentNode;
	daydata_td.width='100%';
	// find next td, this is the one with the ad
	ad_td= daydata_td;
	ad_td= ad_td.nextSibling;
	ad_td= ad_td.nextSibling;
	junk=deleteNode(ad_td);
}
if ( wkdatadiv != null ){
	wkdata_td = wkdatadiv.parentNode;
	ad_td=wkdata_td;
	ad_td= ad_td.nextSibling;
	ad_td= ad_td.nextSibling;
	junk=deleteNode(ad_td);
}
if ( yrdatadiv != null ){
//not at all a good way to do this
	yrdiv_child=yrdatadiv.childNodes;
// look for a table in here
	for(i=0;i< yrdiv_child.length ; i++){
		if ( yrdiv_child.item(i).nodeName=="TABLE") {
			tblnode=yrdiv_child.item(i);
			break
		}
	}
	// table -> tbody -> tr
	
	yr_tr=tblnode.childNodes.item(1).childNodes.item(0); 
	
	ad_td=yr_tr.childNodes.item(3);
	junk=deleteNode(ad_td);
}
