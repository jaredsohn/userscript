// ==UserScript==
// @name          Gmail aguis b Logo
// @description   Changes default gmail logo to aguis b logo. Great for using together with the "Minimalist" theme.
// @author        Joe
// @version       1.0
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==


// You need to convert your image to a base64 representation.  There are many online sites which offer base64 conversion. 
// eg. http://www.opinionatedgeek.com/dotnet/tools/Base64Encode/Default.aspx


function onLoadHandler(){


if(window.parent!=null && window.parent.parent!=null && window.parent.parent.document.getElementById("canvas_frame")!=null)
{
	frmDocument= window.parent.parent.document.getElementById("canvas_frame").contentDocument;


	var gLogo=frmDocument.getElementById(":rc");
	
	if(gLogo!=null && gLogo.tagName=="DIV")
	
	/* this is where you need to enter the base64 representation of the image.
	gLogo.style.setProperty("background-image","url(data:image/image_type;base64,base64_representation)","important");
	
	replace image_type  with the type of the image eg.gif,jpeg,png
	replace base64_representation with the base64 representation of the image
	
	*/
	gLogo.style.setProperty("background-image","url(data:image/jpeg;base64,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)","important");		
}
	
	
}

	



window.addEventListener('load',onLoadHandler,true);