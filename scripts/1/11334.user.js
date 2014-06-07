// Az iwiw oldalain átlalkítja a képeket: sima linkekként működnek, és új tab-ba is lehet őket nyitni (Firefox: kattintás középső gombbal, vagy Ctrl+kattintás).
// Az egyes képeket megjelnítő oldalakon megszünteti az ablak átméretezését, és elhelyez egy Többi kép linket.
//
// ==UserScript==
// @name          Iwiw image links
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Opens the iwiw pictures in new tabs, instead of opening all in the same window
// @include       *iwiw*
// @author		  Kovianyo
// ==/UserScript==


function log(line)
{
/*
var curdate = new Date();
var times = curdate.toGMTString();

GM_log("\n" + times + ";  " + line);
*/
console.log(line);
}


if (location.pathname == "/pages/main/imageview.jsp")
	imagewindow();
else
	otherwindow();


// described here: http://www-xray.ast.cam.ac.uk/~jgraham/mozilla/xpath-tutorial.html
function NSResolver(prefix) {
  if(prefix == 'html') {
    return 'http://www.w3.org/1999/xhtml';
  }
  else  {
  //this shouldn't ever happen
    return null;
  }
}


// Az egyes képeket megjelnítő oldalakon megszünteti az ablak átméretezését, és elhelyez egy Többi kép linket.
function imagewindow()
{

// getting user id from image src
var allElements, thisElement;
var id;
var img;

allElements = document.evaluate(
    "//html:img",
//    "/html/body/div/img",
    document,
    NSResolver, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

//log(allElements.snapshotLength);

for (var i = 0; i < allElements.snapshotLength; i++) {
thisElement = allElements.snapshotItem(i);
// do something with thisDiv
if (thisElement.getAttribute("src").indexOf("iwiw")>-1)
	{

	src = thisElement.getAttribute("src");

//log(src);

	srca = src.split("_");
	id = srca[1];

	// maybe not necessary
	thisElement.setAttribute("border","0");
	}
}
	

// adding new link

var lastimg, newElement;
var newbr;
lastimg = thisElement.parentNode;
if (lastimg) {
    newbr = document.createElement('br');
	insertAfter(lastimg, newbr);

    newElement = document.createElement('a');
    newElement.innerHTML = "Tobbi kep";
    newElement.setAttribute("href","/pages/user/userdata.jsp?tab=images&userID="+id);
	insertAfter(newbr, newElement);
}

// inserts object "newElement" after object "after"
function insertAfter(after, newElement)
{
    after.parentNode.insertBefore(newElement, after.nextSibling);
}


// disabling resize window
// imported from /pages/main/imageview.jsp
unsafeWindow.fit = 
function fit() {
   		var myImg = document.images[0];
   		var rate = 0;
   		unsafeWindow.origWidth = myImg.width;
   		unsafeWindow.origHeight = myImg.height;
 		document.images[0].border=0;

  		
			iWidth = (unsafeWindow.NS)?unsafeWindow.innerWidth:document.body.clientWidth;	
			iHeight = (unsafeWindow.NS)?unsafeWindow.innerHeight:document.body.clientHeight;   

		  	if (unsafeWindow.origWidth < 800 & unsafeWindow.origHeight < 800) {
		  		if (unsafeWindow.origWidth < 200) {
		  			unsafeWindow.iWidth = 200 - unsafeWindow.iWidth;
		  		} else {
		  			unsafeWindow.iWidth = unsafeWindow.origWidth - unsafeWindow.iWidth;
		  		}
		  		unsafeWindow.iHeight = unsafeWindow.origHeight - unsafeWindow.iHeight; 
		  	} else {
				
				
				minWidth = document.images[0].width;
				if (minWidth < 200) minWidth = 200;
				unsafeWindow.iWidth = minWidth - unsafeWindow.iWidth;
		  		unsafeWindow.iHeight = document.images[0].height - unsafeWindow.iHeight; 
		  	
	  			unsafeWindow.canZoomIn = true;
				if (document.getElementById("imageaction") != null) document.getElementById("imageaction").style.cursor="move";
		  	}
		  	
// disabled			
//		 		window.resizeBy(iWidth, iHeight+30);
			
//  		self.focus();

}

}

// Az iwiw oldalain átlalkítja a képeket: sima linkekként működnek, és új tab-ba is lehet őket nyitni (Firefox: kattintás középső gombbal, vagy Ctrl+kattintás).
function otherwindow()
{
window.addEventListener( 'load', function( e ) {  chgLinks();  } ,false); //to be run on load of the page

//window.addEventListener( 'mousedown', function( e ) {  chgLinks();  } ,false); //to be run on load of the page


function chgLinks()
{
// other windows code



allElements = document.evaluate(
//    "//html:a[@class='user_image']",
    "//html:a",
    document,
    NSResolver, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	//console.log(allElements.snapshotLength);

	for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);

    if (thisElement.hasAttribute("onclick"))
	if (thisElement.getAttribute("onclick").indexOf("popUp")>-1)
//	if (thisElement.getAttribute("onclick"))
	{
    oc = thisElement.getAttribute("onclick");
	oca = oc.split("'");
    thisElement.setAttribute("href",oca[1]);
//    thisElement.setAttribute("target","_blank");
    thisElement.setAttribute("onclick","");
    //console.log(thisDiv.className + ": " + thisDiv.getAttribute("onclick"));
    }
}

}

chgLinks();

unsafeWindow.chgLinks = chgLinks;


// imported from ajax_general.js
// added chgLinks() at the end, functions called through unsafeWindow
unsafeWindow.updateHTML =
function updateHTML(request) {
 var body = request.responseXML.getElementsByTagName("body").item(0);
 var nodes = body.childNodes[0];
 var tId = nodes.getAttribute("id");
 var _target = document.getElementById(tId);

 


 if (document.importNode) {


 var range = document.createRange();
 range.selectNodeContents(_target);
 range.deleteContents();


 for (i=0; i<nodes.childNodes.length; i++) {
 var imported = document.importNode(nodes.childNodes.item(i), true);


 //safari hack
 _target.appendChild(imported);
 }
 
/*
 if (isSafari()) {
 _target.innerHTML=_target.innerHTML;
 }
*/

 } else {
 _target.innerHTML = request.responseXML.getElementsByTagName("body").item(0).childNodes.item(0).xml;

 }


 unsafeWindow.doHourglass(false);


 unsafeWindow.Form.enable('mainForm');
 unsafeWindow.Element.scrollTo(tId);

 // added function call
 chgLinks();
}

}
