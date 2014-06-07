// ==UserScript==
// @name           Yahoo Mail New Ad Remover
// @namespace      
// @description    A yahoo mail new adver destroyer
// @include        http://*mail.yahoo.com/*
// ==/UserScript==
// Author: Narayan Natarajan
// email: venkman 69 at yahoo dot com 
//       (you know what to do to get the email addy from above)
//========
// change log:
// Version 0.6
// Modified it to work with the new Yahoo mail
// Firefox extensions adblock and noscript can block the ad but this 
// script allows you to reclaim the lost sidebar space!
// Version 0.5
// modified it to work with new yahoo advert hidebar name change
// Version 0.4
// changed behaviour of ads to "hide" rather than move them.
// thought maybe that would be more efficient
// also took care of the new yahoo "hide" button (so cheesy of yahoo!)
// Version 0.3
// Added width modifier to message panes that are popped into another tab
// Version 0.2
// Changed the name to something a bit more recognizable
// Version 0.1
// Adbeta released
//========
// Bugs
// not perfect, sometimes yahoo does not reload the page and does 
// some optimization by redrawing stuff around
// it does not recognize this and will not modify the width of such
// message panes.
//=========
function deleteNode(node){
	return node.parentNode.removeChild(node);;
}
function pixtoint(pix){
	return (parseInt(pix.toString().substring(0,pix.length - 2 )));
}
function addpix(pix1, pix2){
	return (pixtoint(pix1)+pixtoint(pix2));
}

function childsetwidth(node, width){
// first set the current node's width to width
// makes no sense for child nodes to be a different width
	if (node.style.width != 0 ) node.style.width=width;
	children=node.childNodes;
	for (i=0; i < children.length ; i++ ){
		childitem=children.item(i);
		if (childitem.style.width != 0 )
			childitem.style.width=width;
	}
}

function adnew(){
	// get largePane width
	if (parent == null ) return;
	//largepane is advert 
	var hidebar=parent.document.getElementById('theAd');
	var msgfrm=parent.document.getElementById('shellcontent');
	var navbar=parent.document.getElementById('shellnavigation');
//	navbar.style.width='300px';
	if ( hidebar != null ) {
//		deleteNode(hidebar);
		hidebar.style.visibility='hidden';
	//alert('sidebar ad is hidden');
		
	}
	if ( msgfrm == null ){
	//alert('msgfrm not found');
		return;
	}

	// size of page width
	windowinner=top.innerWidth;
	// width of folder area
	//foldwidth=pixtoint(parent.document.getElementById('foldersPane').style.width);
	// width of folder separator
	//fsepwidth=pixtoint(parent.document.getElementById('folderMsgResizer').style.width);
	mb_style=msgfrm.style;
	mb_style.width=(windowinner - navbar.offsetWidth)+"px";
	//alert(windowinner);
}
adnew();


