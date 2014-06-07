// ==UserScript==
// @name Uncoiled - Widescreen
// @namespace 
// @description Widescreen version of Uncoiled, a gallery enhancement for the CF community.
// @include http://coiledfist.org/gallery/*
// @include http://www.coiledfist.org/gallery/*
// @exclude 
// ==/UserScript==




//Check if user is browsing last updated
if (location.href.indexOf("statsUpdatedIndiv") != -1){
//Get Rid of the Sidebar
var GalSidebar = document.getElementById('sideBarCell');
if (GalSidebar) {
    GalSidebar.parentNode.removeChild(GalSidebar);
}
var CommentsHead = document.getElementById('commentForm');
if (CommentsHead) {
    CommentsHead.parentNode.removeChild(CommentsHead);
}

//Get rid of comments
var i = 0;
while (i < 150) {
var GalComments = document.getElementById('commentBlock');
if (GalComments) {
    GalComments.parentNode.removeChild(GalComments);
    GalComments.Id = 'altComments' + i;
}
i++;
}

//Remove banner material
i=0;
while (i < 2) {
RemoveTable = document.getElementsByTagName('table')[0];
if (RemoveTable) {
    RemoveTable.parentNode.removeChild(RemoveTable);
}
i++;
}

//Create the preview window
var iframe;
if (document.createElement && (iframe = document.createElement('iframe'))) {
iframe.id = '_prev';
iframe.name = '_prev';
document.body.appendChild(iframe);
    iframe.style.top = 0;
    iframe.style.left = (75+'%');
    iframe.style.border = "none";
    iframe.height = 100+'%';
    iframe.width = 25+'%';
    iframe.style.position = "fixed";
}


//Declare the table
var newTab = document.createElement('table');
document.getElementsByTagName('table')[1].appendChild(newTab); 
var tr    = document.createElement('TR');
var tr2    = document.createElement('TR');
var td1   = document.createElement('TD');
var td2   = document.createElement('TD');
var td3   = document.createElement('TD');
var td4   = document.createElement('TD');
var td5   = document.createElement('TD');
var totalCount = 0;
var imgLocation = 1;
var imgCopy = document.getElementById('statsTable').getElementsByTagName('img')[0];


//and so it begins. Wait a sec, did I just divide by zero? oh shi-!
while (totalCount < 150) {
	var tr    = document.createElement('TR');
	var td1   = document.createElement('TD');
	var td2   = document.createElement('TD');
	var td3   = document.createElement('TD');
	var td4   = document.createElement('TD');
	var td5   = document.createElement('TD');

	newTab.appendChild(tr);
	tr.appendChild(td1);
	tr.align="center"
	imgCopy = document.getElementById('statsTable').getElementsByTagName('img')[0].parentNode;
	td1.appendChild(imgCopy);
	imgCopy = td1.getElementsByTagName('img')[0].parentNode;
	imgCopy.target="_prev";

	tr.appendChild(td2);
	imgCopy = document.getElementById('statsTable').getElementsByTagName('img')[0].parentNode;
	td2.appendChild(imgCopy);
	imgCopy = td2.getElementsByTagName('img')[0].parentNode;
	imgCopy.target="_prev";

	tr.appendChild(td3);
	imgCopy = document.getElementById('statsTable').getElementsByTagName('img')[0].parentNode;
	td3.appendChild(imgCopy);
	imgCopy = td3.getElementsByTagName('img')[0].parentNode;
	imgCopy.target="_prev";

	tr.appendChild(td4);
	imgCopy = document.getElementById('statsTable').getElementsByTagName('img')[0].parentNode;
	td4.appendChild(imgCopy);
	imgCopy = td4.getElementsByTagName('img')[0].parentNode;
	imgCopy.target="_prev";

	tr.appendChild(td5);
	imgCopy = document.getElementById('statsTable').getElementsByTagName('img')[0].parentNode;
	td5.appendChild(imgCopy);
	imgCopy = td5.getElementsByTagName('img')[0].parentNode;
	imgCopy.target="_prev";


	totalCount=(totalCount+5);


}

//Clean up the rest of the page
imgCopy = document.getElementById('statsTable')
imgCopy.parentNode.removeChild(imgCopy);
imgCopy = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1];
imgCopy.parentNode.removeChild(imgCopy);











//Sidebar
} else{

//Only run this script if the gallery is in a frame
if (top.location.href == self.location.href) {
}else {



//Remove the image location information to allow the page to shrink
var i = 0
while (i < 3) {
var imgLocat = document.getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].getElementsByTagName('span')[0];
if (imgLocat) {
    imgLocat.parentNode.removeChild(imgLocat);
}
i++
}


//Resize the image
imgLocat = document.getElementById('galleryImage');
var curSize = imgLocat.getAttribute('width');
var sizeDiff = (300 / curSize);
if (imgLocat) {
    imgLocat.style.width = 300+'px';
    curSize = imgLocat.getAttribute('height');
    imgLocat.style.height = (curSize * sizeDiff)+'px';
}
var imgLink
imgLink = document.getElementById('photo_url').getAttribute('href');
imgLocat.parentNode.target="_blank";
imgLocat.parentNode.href=imgLink;

//Remove clutter
imgLocat = document.getElementsByTagName('table')[1];
if (imgLocat) {
    imgLocat.parentNode.removeChild(imgLocat);
}
imgLocat = document.getElementsByTagName('center')[0];
if (imgLocat) {
    imgLocat.parentNode.removeChild(imgLocat);
}
imgLocat = document.getElementsByTagName('table')[0];
if (imgLocat) {
    imgLocat.parentNode.removeChild(imgLocat);
}
imgLocat = document.getElementById('adminbox');
if (imgLocat) {
    imgLocat.parentNode.removeChild(imgLocat);
}

//Close framecheck
}












}