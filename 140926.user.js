// ==UserScript==
// @name           Docs Online Viewer
// @namespace      http://goo.gl/WnIV
// @version        2.0.1
// @author         Deekshith Allamaneni
// @description    Open online PDF,DOC,DOCX,XLS,PPT,RTF,ODT,ODS,ODP,CSV etc. files using Google Docs & Zoho Viewer.
// @include        *
// @exclude        http://docs.google.com/*
// @exclude        https://docs.google.com/*
// @exclude        http://www.mediafire.com/*
// ==/UserScript==


//I will be thankful if you can contribute improvements to this script.
/*
Log
8. bug fix: did not replace zip file adf.ly masking link with deekshithallamaneni.tk
7. Changes to tooltip.
_________________
6. adf.ly links replaced with deekshithallamaneni.tk which is my own domain. But it can be blanked out as it is a free domain.
   Need some donations for this.
_______________
5. Zip and Rar files opens with an option to download when clicked on the icon.
_____________
4. Removed auto update code so as to provide Google Chrome Compatibility.
3. Added more file formats to both Google docs as well as for Zoho docs.
	Added for Google docs: zip, rar, eps, ps
	Added for Zoho Docs: wpd, txt
2. Removed opening in new tab for default open links.
1. Both the Tooltips improved
*/

var patramulu = document.links;
var gbandhams = ["doc","docx","xls","xlsx","ppt","pps","pptx","pdf","eps","ps","tif","tiff","ai","psd","pages","html","php","com","jpg","ttf","xps"];
var dchudusd = new RegExp('^[^\\?#]+\\.(' + gbandhams.join('|') + ')((#|\\?).*)?$', 'i');
var zbandhams  = ["rtf","odt","sxw","csv","sxc","ods","sxi","odp","wpd"];
var dinnidchudusd = new RegExp('^[^\\?#]+\\.(' + zbandhams.join('|') + ')((#|\\?).*)?$', 'i');
var goddu  = ["zip","rar"];
var godduchudu  = new RegExp('^[^\\?#]+\\.(' + goddu.join('|') + ')((#|\\?).*)?$', 'i');


var dpatrnilipy = 'deekshithallamaneni.tk,adf.ly,docs.google.com,viewer.zoho.com,mediafire.com,office.live.com,springerlink.com,ziddu.com,rapidshare.com,ieee.org,easy-share.com,asaha.com,issuu.com,pdfanddownload.info,downarchive.com,topsy.com,jerslater.com,4shared.com,uploading.com,filepost.com';

var nilipeyalsinaband=0;


function strstr (haystack, needle) {
    var pos = 0;
    haystack += '';
    pos = haystack.indexOf(needle);

    return (pos == -1) ? false : haystack.slice(pos);
}

dpatrnilipy = dpatrnilipy.split(',');


if (patramulu && document.location.host != "docs.google.com" && document.location.host != "viewer.zoho.com" && document.location.host != "office.live.com") {

 marchesey(); 
 var lekkey = true;
 document.addEventListener('DOMNodeInserted',function(e){
    if (lekkey){
      setTimeout(function(){
	marchesey();
        lekkey = true;
	}, 1000);
      lekkey = false;
    }
  },true);
}


function marchesey(){
  for (var i = 0; i < patramulu.length; ++i) {
	nilipeyalsinaband=0;
        if (patramulu[i].host != "docs.google.com" && patramulu[i].host != "viewer.zoho.com"){
	    for(var i2=0; i2<dpatrnilipy.length; i2++) {
		if(strstr(patramulu[i].href, dpatrnilipy[i2])) {
			nilipeyalsinaband=1;
			break;
		}
	    }

         if (dchudusd.test(patramulu[i].href)){

		if(nilipeyalsinaband!=1){
			var naabanhdas = document.createElement('a');						
			naabanhdas.href = "https://docs.google.com/viewer?url="+encodeURI(patramulu[i].href)+"&embedded=true&chrome=false";
			patramulu[i].title = "Download/Open link without using Docs Online Viewer:\nURL: "+patramulu[i].href;
			naabanhdas.title="View with Google Docs Viewer\nURL: "+patramulu[i].href+"\n- Docs Online Viewer by Deekshith Allamaneni";
			patramulu[i].href = "http://deekshithallamaneni.tk/docsonlineviewer/docsonlineviewerdirector.php?dovurl="+encodeURI(patramulu[i].href);
/*
Masking original links with "adf.ly" domain. This can be masked with any other domain too. I will soon get a custom domain for masking instead of adf.ly. Leaving the links without masking will form an infinite loop and may lead to browser crash.
*/
			var ico = document.createElement("img");
			ico.src = "http://goo.gl/pUWUj";
			naabanhdas.appendChild(ico);
			naabanhdas.setAttribute("target", "_blank");
			patramulu[i].setAttribute("target", "_blank");
			patramulu[i].parentNode.insertBefore(naabanhdas, patramulu[i]);
			nilipeyalsinaband=1;
		}

         }
         else if (dinnidchudusd.test(patramulu[i].href)){
	
		if(nilipeyalsinaband!=1){
			var naabanhdas = document.createElement('a');
			naabanhdas.href = "https://viewer.zoho.com/api/urlview.do?url="+encodeURI(patramulu[i].href)+"&cache=true";
			patramulu[i].title = "Download/Open link without using Docs Online Viewer:\nURL: "+patramulu[i].href;
			naabanhdas.title="View with Zoho Viewer\nURL: "+patramulu[i].href+"\n- Docs Online Viewer by Deekshith Allamaneni";
			patramulu[i].href = "http://deekshithallamaneni.tk/docsonlineviewer/docsonlineviewerdirector.php?dovurl="+encodeURI(patramulu[i].href);
			var ico = document.createElement("img");
			ico.src = "http://goo.gl/pUWUj";
			naabanhdas.appendChild(ico);
			naabanhdas.setAttribute("target", "_blank");
			patramulu[i].setAttribute("target", "_blank");
			patramulu[i].parentNode.insertBefore(naabanhdas, patramulu[i]);
			nilipeyalsinaband=1;
		}

         }
		 
		 else if (godduchudu.test(patramulu[i].href)){
	
		if(nilipeyalsinaband!=1){
			var naabanhdas = document.createElement('a');						
			naabanhdas.href = "https://docs.google.com/viewer?url="+encodeURI(patramulu[i].href)+"&embedded=false&chrome=true";
			patramulu[i].title = "Download/Open link without using Docs Online Viewer:\nURL: "+patramulu[i].href;
			naabanhdas.title="View with Google Docs Viewer\nURL: "+patramulu[i].href+"\n- Docs Online Viewer by Deekshith Allamaneni";
			patramulu[i].href = "http://deekshithallamaneni.tk/docsonlineviewer/docsonlineviewerdirector.php?dovurl="+encodeURI(patramulu[i].href);
/*
Masking original links with "adf.ly" domain. This can be masked with any other domain too. I will soon get a custom domain for masking instead of adf.ly. Leaving the links without masking will form an infinite loop and may lead to browser crash.
*/
			var ico = document.createElement("img");
			ico.src = "http://goo.gl/pUWUj";
			naabanhdas.appendChild(ico);
			naabanhdas.setAttribute("target", "_blank");
			patramulu[i].setAttribute("target", "_blank");
			patramulu[i].parentNode.insertBefore(naabanhdas, patramulu[i]);
			nilipeyalsinaband=1;
		}

         }
          
      }
   }
}