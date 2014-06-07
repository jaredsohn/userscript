// ==UserScript==
// @name           Insert QR on every Page
// @namespace      Snowman25
// @description    Inserts QR-Code for current Site in one of the 4 corners and enlargens it on hovering. Generates the code from http://qrcode.kaywa.com.
// @include        *
// @exclude        about:*
// @exclude        chrome:*
// @exclude        *doubleclick.net/*
// ==/UserScript==

// ------------- START USERSETTINGS -------------
	var corner				=	0;			//define in which corner the QRCode should be inserted.				Standard is 0	  (bottom left going counterclockwise)
	var enlarge				=	true;	 	//define behaviour on Mouseover. TRUE = Enlarges on Mouseover.		Standard is true  (enlarge)
	var small_size			=	1;			//defines size of small image from 1 to 12							Standard is 1	  (codepixels are actual pixels)
	var big_size			=	3;			//defines size of big image from 1 to 12							Standard is 3	  (each codepixel is 3x3 pixel big)
// -------------- END USERSETTINGS --------------


	function qr_image() {
		var image			=	'http://qrcode.kaywa.com/img.php?s=' + small_size + '&d='+escape(document.URL);
		return image;
	}
	
	function qr_image_big() {
		var image_big		=	'http://qrcode.kaywa.com/img.php?s=' + big_size + '&d='+escape(document.URL);
		return image_big;
	}
		
	function buildDiv() {
		var completeDiv		=	'<div id="injected_QR_DIV"><p id="injected_QR_DIV_p">&nbsp;</p></div>';
		return completeDiv;
	}
	
	function buildCSS(edge) {
		if (edge==1) {
			var part1		=	'#injected_QR_DIV		{ position:fixed; right:0px; bottom:0px; height:auto; width:auto; margin:0px; padding:0px; border:0px; }';
		} else if (edge==2){
			var part1		=	'#injected_QR_DIV		{ position:fixed; right:0px; top:0px; height:auto; width:auto; margin:0px; padding:0px; border:0px; }';
		} else if (edge==3) {
			var part1		=	'#injected_QR_DIV		{ position:fixed; left:0px; top:0px; height:auto; width:auto; margin:0px; padding:0px; border:0px; }';
		} else {
			var part1		=	'#injected_QR_DIV		{ position:fixed; left:0px; bottom:0px; height:auto; width:auto; margin:0px; padding:0px; border:0px; }';
		}
		
		var part2			=	'#injected_QR_DIV_p		{ margin:0px; padding:0px; border:0px; }';
		var part3			=	'#injected_QR_DIV_p:before	{ content: url(\'' + qr_image() + '\')}';
		
		if (enlarge==true) {
			var part4		=	'#injected_QR_DIV_p:hover:before	{ content: url(\'' + qr_image_big() + '\')}';
			var completeCSS	=	part1 + '\n' + part2 + '\n' + part3 + '\n' + part4;
		} else {
			var completeCSS	=	part1 + '\n' + part2 + '\n' + part3;
		}
		return completeCSS;
	}
	
	function inject_div() {
		var myDiv			=	document.createElement('div');
		myDiv.innerHTML		=	buildDiv();
		
		document.body.appendChild(myDiv);
	}
	
	function inject_style() {
		var myCSS			=	document.createElement('style');
		myCSS.innerHTML		=	buildCSS(corner);
		
		document.getElementsByTagName("head")[0].appendChild(myCSS);
	}
	
	inject_style();
	inject_div();