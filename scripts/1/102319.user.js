// ==UserScript==
// @name           Meme Generator
// @namespace      http://memegenerator.net/
// @description    A 'caption' button will appear when hovering over images in 4chan or *chan imageboards, allowing to caption the image Advice Dog style or as a motivational poster.
// @include       *
// @exclude       http://memegenerator.net/*
// ==/UserScript==

function jqfrmeme_btimage_main() {
	minImgWidth=20;  
	minImgHeight=20; 
	if ( ! document.getElementById("jqfrmeme_objInj") ) {
		var divElement=document.createElement('div');
		divElement.innerHTML="<a target='_blank' href=''><span id='jqfrmeme_objInj' style='opacity: 0.8; background-color: #ff0;color:#fff;border: 1px solid black;border-radius: 6px;font-family: Verdana;font-size: 11px;left: 170px;padding: 0 5px 2px;position: absolute;top: 773px;visibility: hidden;'>caption</span>"
		divElement.id="jqfrmeme_objdiv";
		document.body.appendChild(divElement);
		document.getElementById("jqfrmeme_objInj").addEventListener("mouseover",function() { this.style.visibility="visible"; this.style.opacity = 1; },false); 
		document.getElementById("jqfrmeme_objInj").addEventListener("mouseout",function() { this.style.opacity = 0.6; },false); 
	}
	buttonTemp=document.getElementById("jqfrmeme_objInj");
	if (buttonTemp.clientHeight > minImgHeight ) { minImgHeight=buttonTemp.clientHeight; }
	if (buttonTemp.clientWidth  > minImgWidth ) { minImgWidth=buttonTemp.clientWidth; }	
	var aElmts=document.getElementsByTagName('img');
	for(i=0;i<aElmts.length;i++) {
		var aImgElmt=aElmts[i];
		if (aImgElmt.clientWidth>minImgWidth && aImgElmt.clientHeight>minImgHeight ) {   // check minimum size
			var aparent=aImgElmt.parentNode;
			if (aparent.tagName.toLowerCase() =="a"){ // check if image is a child of a anchor link
				if ( /\.(?:jpe?g|gif|png|bmp)$/i.test( aparent.href ) ){ // check if the parent link href string, ends with .jpg .jpeg .gif .png .bmp (the most used image formats)
					// here is an image that require insert mouseover event
					aImgElmt.addEventListener("mouseover",jqfrmeme_btimage_mouseOverHandler,false); 
					aImgElmt.addEventListener("mouseout",jqfrmeme_btimage_mouseOutHandler,false);
					
}}}}}

function jqfrmeme_btimage_mouseOverHandler(){	
	generalMargin=5; // bottom and right margin of image to insert the button
	var buttonTemp=document.getElementById("jqfrmeme_objInj");
	buttonTemp.style.top=(this.y + this.clientHeight - buttonTemp.clientHeight - generalMargin) +'px';
	buttonTemp.style.left=(this.x + this.clientWidth - buttonTemp.clientWidth - generalMargin) + 'px';
	buttonTemp.style.visibility="visible";
	buttonTemp.parentNode.href = "http://memegenerator.net/create/caption-top-bottom/image/0?image=" + escape(this.parentNode.href) + "&source=extension/firefox"; // insert a different link here if you need it. Examples: "http://www.google.com";  or "http://www.tttttt.com/catchimage?link=" + elemento.parentNode.href;
}
function jqfrmeme_btimage_mouseOutHandler(){
	document.getElementById("jqfrmeme_objInj").style.visibility="hidden"; 
}

jqfrmeme_btimage_main();
setInterval(jqfrmeme_btimage_main,10000); // change here the time period to recheck the page. remove this line if you only one load the links on load.







