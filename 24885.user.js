// ==UserScript==
// @name           XBMC File Browser
// @namespace      http://rebel-it.com.au/
// @description    Use XBMC web command interface to make the drives browseable.  To start, point your browser at http://xbox/xbmcCmds/xbmcHttp?command=GetShares and go from there.
// @include        http://*/xbmcCmds/xbmcHttp?command=GetDirectory*
// @include        http://*/xbmcCmds/xbmcHttp?command=FileDownload*
// @include        http://*/xbmcCmds/xbmcHttp?command=GetShares*
// ==/UserScript==

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function decode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}

// make it render nicely
// perhaps should use urlencode
function in2html(txt) {
 if (!txt) {
  return ''
 }
 var txthtml = txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 return (txthtml);
}

var allListItems,thisListItem,thisListItemText,path;
var href,hreftext;

var search=window.location.search;

if (search.match('command=FileDownload')) {
	// we want to set the content type to something that will
	// download, as well as be auto-decoded by the browser
	// but not sure if it's possible, so we just decode and
	// escape ourselves, and user can cut-paste what's on-screen
	document.body.innerHTML=
		// testing http-equiv to maybe change the char-encoding
		// to base64
		'<meta http-equiv="refresh" content="1;url=http://www.google.com/">'+
		"<pre>"+
		in2html(decode64(document.body.innerHTML))+
		"</pre>";
} else if (search.match('command=GetShares')) {
	// markup the drive letters
	allListItems=document.getElementsByTagName('li');
	for (var i=0; i<allListItems.length; i++) {
		thisListItem=allListItems[i];
		thisListItemText=thisListItem.childNodes[0];
		if (thisListItemText) {
			// get the path as a string
			longpath=thisListItemText.nodeValue;
			if (longpath.match(/ Drive;[A-Z]:\\/)) {
				var path=longpath.substr(longpath.length-4);
				// construct an <A HREF=...> tag
				href=document.createElement("a");
				href.setAttribute("href",'xbmcHttp?command=GetDirectory&parameter='+path);
				hreftext=document.createTextNode(longpath);
				href.appendChild(hreftext);

				// replace the text with the new <A HREF=...> tag
				thisListItemText.parentNode.replaceChild(href,thisListItemText);
			} else {
				// not a drive share, don't want it showing
				// (this is not working reliably)
				//thisListItem.parentNode.removeChild(thisListItem);
			};
		};
	};


} else if (search.match('command=GetDirectory')) {
	// getdirectory

	if (!search.match('parameter=.')){
		// we completely construct our own page here
		document.body.innerHTML=
			'No drive specified.  Click <a href=xbmcHttp?command=GetShares&parameter=files>here</a> for a list of drives.';
	} else {
		// get all the list items and hotlink them
		allListItems = document.getElementsByTagName('li');
		for (var i=0; i < allListItems.length; i++) {
			thisListItem = allListItems[i];
			thisListItemText = thisListItem.childNodes[0];
			if (thisListItemText) {
				// get the path as a string
				path=thisListItemText.nodeValue;

				// we construct an <A HREF=...> tag
				href=document.createElement("a");
				if (path.substr(path.length-2,1)=="\\") {
					// directory
					href.setAttribute("href",'xbmcHttp?command=GetDirectory&parameter='+path);
				} else {
					// file?
					href.setAttribute("href",'xbmcHttp?command=FileDownload&parameter='+path);
				};
				hreftext=document.createTextNode(path);
				href.appendChild(hreftext);

				// replace the text with the <A HREF=...> tag
				thisListItemText.parentNode.replaceChild(href,thisListItemText);
			};
		};
	};
};

