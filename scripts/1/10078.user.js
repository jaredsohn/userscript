// CopyLeft by Ibrahim Tekin, July 2007 , No right reserved.
// Inspired by Andrin von Rechenberg's Advanced Google Keys User Script
// ==UserScript==
// @name          Milliyet Gallery by Keyboard
// @namespace     mersis@gmail.com
// @description   Use keys to browse Milliyet Gallery images. todo: preloads next image.
// @include       http://www.milliyet.com.tr/content/galeri/yeni/*
// ==/UserScript==

var imageLinks=new Array();
var currentImage = "";
var req;
var zoom = GM_getValue("zoom",false);;

window.addEventListener("load", function(e) {
    currentImage = getParamValue(window.location.search, "id");
    fields=document.links;
    var inum = 0;
     for(i=0;i<fields.length;i++) {
     
        if(isImageLink(fields[i].href)){
            
            imageLinks[inum++] = fields[i].href;
        }
     }

     if(currentImage == 1){
        loadXMLDoc(imageLinks[currentImage]);
     }else{
        next = currentImage;
        next++;
        loadXMLDoc(imageLinks[next++]);
     }
     var divs = document.getElementsByTagName('div');
             for(i=0;i<divs.length;i++) {
                if(divs[i].className=="photo") {
                    doZoom(divs[i].getElementsByTagName("img")[0]);
                }
     }
   
}, false);

window.addEventListener("keydown",function(e) {
    if(e.keyCode==65) {//a
        if(currentImage>1 )
            document.location.href = imageLinks[--currentImage];
    }
    if(e.keyCode==83) {//s
        if (currentImage == 1) {
            document.location.href = imageLinks[currentImage]; 
        } else if(currentImage<imageLinks.length)
            document.location.href = imageLinks[++currentImage]; 
    }
    if (e.keyCode==90) {
			zoom = !zoom;
			GM_setValue("zoom",zoom);
			var divs = document.getElementsByTagName('div');
             for(i=0;i<divs.length;i++) {
                if(divs[i].className=="photo") {
                    doZoom(divs[i].getElementsByTagName("img")[0]);
                }
             }
			//showImg(i);
	}
    

}, false);

function isImageLink(link) {
    if(link.indexOf("goster.asp?prm=") >= 0)
        return true;
	else
	    return false;
}

function getParamValue(search, targetvar) {
    var param=(search.slice(1));
    var searchstring = 1;
    var pairs = param.split("&") 
    for(var i = 0; i < pairs.length; i++)
    {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0,pos);
        var value = pairs[i].substring(pos+1);
        if (argname == targetvar)
        {
            searchstring = value;
            {break;}
        }
    }
    return searchstring;
}

// resize the image if we are in zoom mode
function doZoom(img) {
	if (!img.owidth) {
		img.owidth=img.width;
		img.oheight=img.height;
	}
	if (zoom) {
		img.style.display='block';
	    img.style.position='absolute';
	    img.style.zIndex = 100;
		var sw = window.innerWidth;
		var sh = window.innerHeight;
		if (img.owidth/sw < img.oheight/sh) {
			img.style.height = sh+"px";
			img.style.width = 'auto';
		} else {
			img.style.width = sw+"px";
			img.style.height = 'auto';
		}
	} else {
		img.style.width = 'auto';
		img.style.height = 'auto';
	}
	centerScreen(img);
}

// display the image at the center of the screen
var centerScreen = function(img) {
	var sx = window.pageXOffset;
	var sy = window.pageYOffset;
	var sw = window.innerWidth;
	var sh = window.innerHeight;
	var iw = img.width;
	var ih = img.height;
	var top = sy + (sh-ih)/2;
	var left = sx + (sw-iw)/2;
	img.style.top = ((top>=0)?top:0)+"px";
	img.style.left = ((left>=0)?left:0)+"px";
}

function loadXMLDoc(url) {
	req = false;
    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
    	try {
			req = new XMLHttpRequest();
        } catch(e) {
			req = false;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
       	try {
        	req = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		req = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		req = false;
        	}
		}
    }
	if(req) {
	
	    req.overrideMimeType('text/xml');
	    req.onreadystatechange = processReqChange;
		req.open("GET", url, true);
		req.send("");
	}
}

function processReqChange() {
    // only if req shows "loaded"
    if (req.readyState == 4) {
        // only if "OK"
        if (req.status == 200) {
            // ...processing statements go here...
            //alert(req.responseText);
            var container = document.createElement('div');
            container.innerHTML = req.responseText;
            var divs = container.getElementsByTagName('div');
             for(i=0;i<divs.length;i++) {
                if(divs[i].className=="photo") {
                    loadXMLImage(divs[i].getElementsByTagName("img")[0].src);
                }
             }
        } else {
            alert("There was a problem retrieving the XML data:\n" +
                req.statusText);
        }
    }
}

function loadXMLImage(url) {
	req = false;
    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
    	try {
			req = new XMLHttpRequest();
        } catch(e) {
			req = false;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
       	try {
        	req = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		req = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		req = false;
        	}
		}
    }
	if(req) {
		req.onreadystatechange = null;
		req.open("GET", url, true);
		req.send("");
	}
}