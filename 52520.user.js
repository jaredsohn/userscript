// ==UserScript==
// @name           Replace Gmail Logo with your Photo
// @namespace      For non technical person
// @description    // ==UserScript== 
// @name          Change Gmail Logo even by Non Technical person 
// @description   Changes default gmail logo to your photo 
// @author        BLSharma 
// @version       1 
// @include       http://mail.google.com/* 
// @include       https://mail.google.com/* 
// ==/UserScript==   
// you need to convert your image to a base64 representation. There are many online sites which offer bse64 conversion.  
// eg. http://www.opinionatedgeek.com/dotnet/tools/Base64Encode/Default.aspx   
function onLoadHandler(){
   if(window.parent!=null && window.parent.parent!=null && window.parent.parent.document.getElementById("canvas_frame")!=null)
{ 	
frmDocument= window.parent.parent.document.getElementById("canvas_frame").contentDocument;
   	var gLogo=frmDocument.getElementById(":rc");
 	 	if(gLogo!=null && gLogo.tagName=="DIV") 	 	
/* this is where you need to enter the base64 representation of your image. Just go to above site and  upload your JPG photo of 94*60 pixels and encode there as directed on the web site then copy the entire code and past over the red word as under and save the script	 	
*/ 	
gLogo.style.setProperty("background-image","url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCqRXhpZgAATU0AKgAAAAgAAgExAAIAAAALAAAAJodpAAQAAAABAAAAMgAAAABQaWNhc2EgMy4wAAAAA5AAAAcAAAAEMDIxMKAF…………………………………………………………………………………………………………………………….SKoaM4UDkD86+ulVad7n5zOjCceW1z4h+Ov/BB3wH4+0S8X4eeKvE3wvu5wWS3gZdW0sMAcAwz4ljGeojmGQGwAcV8D/tFf8ETf2svhBq0S+GbrTPirpk7lUuPD97/AGfdQgDgz215IgQEd45ZBk444r945G8lAuDlecA8GmyW5MKNIyyA8jcgOM+1YKhhZSftKad/LX8CZU6sUlSqP56r/P8AE//Z)","important"); 	 	 	 
}
}
 window.addEventListener('load',onLoadHandler,true);
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
