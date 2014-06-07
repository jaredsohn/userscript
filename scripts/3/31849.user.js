// ==UserScript==
// @name           coppermine - direct to image!
// @namespace      PH
// @description    rewrites links to pages for a specific image in a
//                 Coppermine gallery to the link of the image file itself.
// @include        http://cpg-contrib.org/*
// ==/UserScript==
// <This script takes 95% of its code from 'ImageFAP direct images++'>
// ImageFAP direct images++
// http://userscripts.org/scripts/show/3923
// based on ImageCASH direct images : http://userscripts.org/scripts/show/1792


//--------------------------------------------------------------------------

//CONFIGURATION : 


//include wget script?
var wgetScriptInclude = false;
//sleep between files
var wgetScriptSleep = '30';

//command line for minimized download
// var wgetCommand = "start /MIN \"\" wget -O image-xxx.ext \"file\"";
//command line background download
var wgetCommand = "start /b \"\" wget -O image-xxx.ext \"file\"";

//--------------------------------------------------------------------------

GM_registerMenuCommand( "generate wget script", wgetScriptMenuCommand);
changeGalleryDisplay();   


function changeGalleryDisplay() {

	//obsolete...
	// var decrypt = function(x, xk) {
		// var td=x.split("%");
		// var k = "";
		// for(i=0;i<td.length;i++)
			// k+=String.fromCharCode(xk^parseInt(td[i]));
		// return k;
	// }

	//osolete... 
	// if (cleanDisplay && location.href.search(/gallery\.php\?gid=[^\&|$]*/) != -1) //redirect first page
		// location.replace(location.href.replace(/gallery\.php/,"ajax_gallery_display.php"));
	// else { 
		

		//replace links
		var Anchors = document.getElementsByTagName("a");
		for (var i = 0; i < Anchors.length; i++) {

/*
			// gallery links
			var StrOnClick = Anchors[i].getAttribute("onClick");
			if (StrOnClick && StrOnClick.indexOf("requestGallery") != -1) {  
				if (cleanDisplay)
					Anchors[i].href = StrOnClick.split("'")[1].replace(/pgid=&/,"ajax_gallery_display.php?");
				else 
					Anchors[i].href = StrOnClick.split("'")[1].replace(/pgid=&/,"gallery.php?");
					Anchors[i].removeAttribute("onClick");
			}
			else
*/		
			//picture links

			if (Anchors[i].href.search(/forum\/displayimage\.php\?album=[^\&|$]*/) != -1 
					&&	Anchors[i].childNodes.length > 0)
				Anchors[i].href = Anchors[i].childNodes[0].src.replace(/thumb_/,"");
		// }
	}
    
	if (wgetScriptInclude){
	    var body = document.getElementsByTagName("body")[0];
		element = document.createElement("div"); 
		element.style.padding = '20px';
		element.style.margin = 'auto';
		element.style.border = '1px solid';
		element.style.width = '750px';
		element.innerHTML = wgetScriptContent();
		body.appendChild(element); 
	}

}

function I(u){
	var t=u.split('.'),e=t[t.length-1].toLowerCase();
	return {gif:1,jpg:1,jpeg:1,png:1,mng:1}[e]
}

function ext(u){
	var t=u.split('.'),e=t[t.length-1].toLowerCase();
	return e
}

function hE(s){
	return s.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/%22/g,'&quot;');
}

function numb(u){
	if (u<10) 
		return '00'+u; 
	else if (u<100) 
		return '0'+u;
	else return u;
}

function wgetScript_popup(){
	var z=open().document;
	z.write('<html><body>');
	z.write(wgetScriptContent());
	z.write('</body></html>');
	z.close();
}

function wgetScriptMenuCommand(){
	var newBody = '<html><body>';
	newBody = newBody + wgetScriptContent();
	newBody = newBody + '</body></html>';
	document.body.innerHTML = newBody;
}

function wgetScriptContent(){
	var newBody = '';
	var q,h,i;
	var p=0;
	for(i=0;q=document.links[i];++i){
		h=q.href;
		if(h&&I(h)){
			// newBody = newBody + ' start /min "" wget -O image-'+ numb(++p) +'.'+ext(h)+' "'+hE(h)+'"<br>';
			newBody = newBody + wgetCommand.replace(/xxx/,numb(++p)).replace(/ext/,ext(h)).replace(/file/,hE(h)) + '<BR>';
			if (wgetScriptSleep != '0')
					newBody = newBody + 'sleep ' + wgetScriptSleep + ' <br>';
		}
	}
	return newBody;
}
