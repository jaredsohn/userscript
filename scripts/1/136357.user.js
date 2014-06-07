// ==UserScript==
// @name        Google Docs viewer
// @description  adds a 'View in Google Docs' icon next to links to compatible filetypes  
// @namespace   mikecupcake
// @version     0.3
// @include        *
// @exclude        http*://docs.google.com/*
// @exclude        http*://mail.google.com/*
// @exclude        http*://viewer.zoho.com/*
// @exclude        http*://office.live.com/*
// @exclude        http*://*.mediafire.com/*
// ==/UserScript==

// based on Deekshith Allamaneni's Docs Online Viewer script: http://userscripts.org/scripts/show/127774

var docLinks = document.links;
var fileTypes = ["doc","docx","xls","xlsx","ppt","pps","pptx","pdf","eps","ps","tif","tiff","ai","psd","pages","dxf","ttf","xps"];
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
	viewLink.href = "https://docs.google.com/viewer?url="+encodeURI(stripQuery(link))+"&embedded=true&chrome=false";	
	viewLink.docView="checked"
	var ico = document.createElement("img");
	ico.src = "https://goo.gl/V7OVf";
	ico.style.marginLeft = "5px";
	viewLink.appendChild(ico);
	link.parentNode.insertBefore(viewLink, link.nextSibling);
    // a mix that helped me work things out http://soundcloud.com/mike-cupcake/a-breakbeat-juncture
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