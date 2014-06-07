// ==UserScript==
// @name           Cloud Docs Viewer
// @version        3.0.4
// @author         Deekshith Allamaneni
// @namespace      http://www.deekshith.in/
// @description    Open documents and files directly in your browser using online services.
// @include        *
// @exclude        http://docs.google.com/*
// @exclude        https://docs.google.com/*
// @exclude        http://www.mediafire.com/*
// ==/UserScript==

//This is a development version of Docs Online Viewer. This script is not intended for productive use.
// based on Deekshith Allamaneni's Docs Online Viewer script: http://userscripts.org/scripts/show/127774
//Contributor: Mikecupcake


var docLinks = document.links;
var fileTypes = ["doc","docx","xls","xlsx","ppt","pps","pptx","pdf","eps","ps","tif","tiff","ai","psd","pages","dxf","ttf","xps","zip","rar"];
var doCheck = true;

checkLinks();
setupListener();

function checkLinks(){
  for (var i = 0; i < docLinks.length; ++i) {
       if (docLinks[i].host != "docs.google.com" && docLinks[i].docView != "checked"){
	    for (var i2 = 0; i2 < fileTypes.length; i2++) {
	        var url = stripQuery(docLinks[i]); 
 		if (endsWith(url, '.' + fileTypes[i2])) {
		   changeLink(docLinks[i]);
                   break;
 		}
	    }
        }
   docLinks[i].docView="checked";
   }

// console.log("...............................................................................");

}

function stripQuery(link) {   // remove any ?query in the URL	    
 return link.protocol + '//' + link.hostname + link.pathname; 
}


function endsWith(str, suffix) {  //  check if string has suffix 
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


function changeLink(link) { 
	var viewLink = document.createElement('a');
	viewLink.href = "https://docs.google.com/viewer?url="+encodeURI(stripQuery(link))+"&embedded=false&chrome=false";	
	viewLink.docView="checked"
	var ico = document.createElement("img");
	ico.src = "https://goo.gl/V7OVf";
	ico.style.marginLeft = "5px";
	viewLink.appendChild(ico);
        viewLink.setAttribute("target", "_blank");
        viewLink.title="View with Docs Online Viewer\nURL: "+encodeURI(stripQuery(link))+"\n- ForSupport: www.deekshith.in";
	link.parentNode.insertBefore(viewLink, link.nextSibling);
}

function setupListener(){
  document.addEventListener('DOMNodeInserted',function(e){
     if (doCheck) {
      doCheck = false;
      setTimeout(function(){
        checkLinks();
	doCheck = true;
      }, 1000);
     } 
    //  GM_log("Event target nodeName="+e.target.nodeName+", id="+e.target.id+", className="+e.target.className);
  },false);
}