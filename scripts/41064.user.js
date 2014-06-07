// ==UserScript==
// @name           Divxplanet'tan cok hizli indir
// @description    Divxplanet'tan cok hizli indirmek icin. Her altyazi icin ayri ayri sayfa acmaya gerek kalmadan cok hizli bir sekilde indirmek icin.Alt yazi linklerinin yanina Download linki ekler.
// @author         talo pien
// @version        1.1.3
// @include        http://www.divxplanet.com/sub/*
// @include        http://divxplanet.com/sub/*

// ==/UserScript==

// Special thanks to Nitec

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

function insertAfter(new_node, existing_node) 
{
if (existing_node.nextSibling) 
	existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
else 
	existing_node.parentNode.appendChild(new_node);
} 

// These codes was written by Talo Pien
// talopien@gmail.com
//
var suburl="http://divxplanet.com/sub/s/";
var downurl="http://divxplanet.com/indir.php?id=";
var objects = document.body.getElementsByTagName('A');
for(var no=0;no<objects.length;no++)
{	
	var urlhref=objects[no].href;

	var devam=0;
	if (objects[no].parentNode.nodeName == 'TD' &&
		objects[no].parentNode.getAttribute('align') == 'left' &&
		objects[no].parentNode.getAttribute('valign') == 'top' &&
		objects[no].parentNode.getAttribute('width') == 150) 
	{
		devam=1;
	}
	else
	{
		devam=0;
	}
	
	if (urlhref.substring(0,suburl.length) == suburl && devam==1)
	{
		var spl = urlhref.split('/');
		var link = document.createElement('a');
		link.setAttribute('href',downurl + encode64("DP" + spl[5]));
		link.innerText='Download';
		myImg=document.createElement('IMG');
		myImg.setAttribute('src','/_img/download.gif');
		myImg.setAttribute('border','0');
		myImg.setAttribute('title','Direct Download. Subtitle ID=' + spl[5]) ;
		link.appendChild(myImg);
		insertAfter(link, objects[no]);
	}
	 
}
