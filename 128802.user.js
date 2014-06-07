// ==UserScript==
// @name           Remove garbage form exbii.com threads and diplay only images
// @version		   1.0
// @author		   dirnthelord
// @license		   GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @icon		   http://i56.tinypic.com/2wqtk00.png
// @namespace      http://www.exbii.com/
// @description    Remove stupid content
// @include        http://www.exbii.com/*
// @include        http://www.elakiri.com/*
// ==/UserScript==

// Get the images
//var imgs = document.getElementsByTagName('img');
var images;
var linksList = new Array();
var anchors = new Array();
var body = document.getElementsByTagName('body')[0];

// Create images container
var imgContainer = document.createElement("div");
imgContainer.id = "myDiv";
imgContainer.class = "image";

var aContainer = document.createElement("div");
aContainer.id = "ancDiv";

function checkimages() {
	var j = 0;
    var images = document.images;
    for (var i = 0; i < images.length; i++) {
        if (images[i].parentNode.tagName.toLowerCase() == 'a') {
            var lnk = images[i]; //.parentNode.innerHTML;//.replace(/\/v\//g,"/i/");
            if (images[i].src.match(/exbii.com/i) == null) {
                linksList[i] = lnk;
                //WriteToFile(lnk.parentNode.href.replace(/\/v\//g,"/i/"));
				if(lnk.parentNode != undefined){
					anchors[j] = lnk.parentNode;
					j++;
				}
                //alert(lnk.parentNode.href);
            }
        }
    }
    document.getElementsByTagName('body')[0].innerHTML = "";
    i = 0;
    for (x in linksList) {
		imgContainer.appendChild(getAnchorTag(linksList[x].src,anchors[i]));
        document.documentElement.appendChild(imgContainer);
        i++;
    }
}

function getOriginalImageFromPZY(l){
	return l.replace(/\/v\//g,"/i/");
}

function WriteToFile(textToWrite) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
	var s = fso.CreateTextFile("F:\\Test.txt", true);
    s.writeline(textToWrite);
    s.writeline("-----------------------------");
    s.Close();
 }

function getAnchorTag(imageSrc,href){
	var img = document.createElement("img");
		img.src = imageSrc;
		img.style.padding = '10px';
        img.style.border = '1px solid #333333';
        img.style.margin = '5px';
		
	var a = document.createElement("a");
        a.setAttribute("href", href);
        a.appendChild(img);
	
	return a;
}

function Start(pagesToProcess){
	var url ="http://www.exbii.com/showthread.php?t=336931" ; // document.location.href;
	for(i=1;i<pagesToProcess;i++){
		document.body.appendChild(createIFrame(i,url + "&page=" + i));
		//LoadImages(document);
		LoadImages(document.getElementById('ifrm' + i).contentDocument);
	}
}

function createIFrame(iid,url){
	var el = document.createElement("iframe");
		el.setAttribute('id', 'ifrm'+ iid);
		el.setAttribute('name', 'ifrmName'+ iid);
		el.setAttribute('src', url);
	return el;
}

// Load Images in a document and display only them
function LoadImages(doc) {
    var j = 0;
    var images = doc.images;
    var imgC = document.createElement("div");
    imgC.id = "myDiv";
    imgC.class = "image";
    var ibody = document.getElementsByTagName('body')[0];
    var links = new Array();
    var ancs = new Array();

    for (var i = 0; i < images.length; i++) {
        if (images[i].parentNode.tagName.toLowerCase() == 'a') {
            var lnk = images[i];

            if (images[i].src.match(/pzy.be/i) != null) {

                alert(links[i]);
                if (lnk.parentNode != undefined) {
                    ancs[j] = lnk.parentNode;
                    j++;
                }
            }
        }
    }
    //ibody.innerHTML = "";
    i = 0;
    for (x in links) {
        imgC.appendChild(getAnchorTag(links[x].src, ancs[i]));
        body.appendChild(imgContainer);
        i++;
    }
}

// /\(s\)/ matches '(s)' while /(\s)/
    // Original:         http://pzy.be/i/1/98Meb.jpg
    // xbii:             http://pzy.be/t/1/98Meb.jpg
 
// Load the first page  "http://www.exbii.com/showthread.php?t=336931"
// Second page: 		"http://www.exbii.com/showthread.php?t=336931&page=2"
// ==> Append "&page=?" to the URL
//     Load it in a new <iFrame>

// Get images in the <iframe>
// Check for "src" value
// if its from "http://srv.eXBii.com/*" then ignore it/remove it
// if its not,

	// Parent Link : 	http://pzy.be/v/1/gdUVR8ZqO
	// Original: 		http://pzy.be/i/1/98Meb.jpg
	// xbii:     		http://pzy.be/t/1/98Meb.jpg
	// Replace "i" with "t" in "*/pzy.be/*"

// Add the images to  a new DIV
// add the iframes to a new div
// remove the body content
// Add the new iframes container to document


//===> gett the HREF of <a> Last </a>
// get the pages count...
// loop!

checkimages();
LoadImages(document.getElementById('ifrm').contentDocument);
//Start(3);