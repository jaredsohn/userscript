// ==UserScript==
// @name           ZigZagAcademy Offline
// @namespace      Ben Lisbakken
// @description    This script allows you to use ZigZagAcademy offline.  NOTE: It is REQUIRED that you click "Always allow" to the security dialogs on Zigzag pages!!!  Written by Ben Lisbakken
// @include        http://www.zigzagacademy.com/*
// @include        http://upload.wikimedia.org/*
// ==/UserScript==

// TODO make it so that when the download completes it depends on upload AND www.zigzagacademy downloads not just one of the two
// TODO make storage through DB instead of through LocalServer
// TODO Maybe a queue of downloaded pages
// TODO color links based on online/offline
// TODO grab 1 link depth on a page
// TODO Export Feature for articles that are downloaded
// TODO Look at size of image, only download ones that are small
// TODO Offline editor (big for early adopters, early patch)
// Benchmarking -- performance gain -- securty holes -- code reviews
// TODO MAKE ZigZagAcademy ACCOUNT AND PROFILE :)
// for information on this: instaview
// # of articles we're expecting users to have between 100's and 1000's


// -------------------------------------------------------
// Global variables
// -------------------------------------------------------
var console= unsafeWindow.console || {log: function(){}};
var errorMsgs = document.body.innerHTML;
var totalDownloads = 0;
var currentDownload = 0;
var server = null;
var store = null;
var workerPool = null;
var db = null;
var imgLinks = null;
var iFrameDownloads = 0;
var downloaded = 0;
var timerID = null;

// -------------------------------------------------------
// This is where the www.zigzagacademy.com functions are
// -------------------------------------------------------

// insertIFrame is used in 3 cases:
// 1.  When a page is loaded, need to insert an iFrame to check if 
// upload.wikimedia.org has been allowed
// 2.  When the user wants to cache a page, need to insert an iFrame to cache 
// the media files (pictures etc.)
// 3.  When the user wants to remove a page from cache, we need to insert an 
// iFrame so we can remove the items from the upload.wikimedia.org resource 
// store
function insertIFrame(imgLinks) {
	var offlineControlsDiv = document.getElementById('offlineControlsDiv');
	var iFrame = document.createElement('iframe');
	var iFrameSRC = "http://upload.wikimedia.org/";
	iFrame.width = '1px';
	iFrame.height = '1px';
	iFrame.frameBorder = 0;
	iFrame.style.overflow = "hidden";
	iFrame.style.align = "left";
	iFrame.style.display = "block";
	iFrame.style.fontSize = "10px";
	if(imgLinks != ""){
    iFrame.name = 'grabPictures';
		iFrameSRC += "#" + imgLinks;
		iFrame.src = iFrameSRC;
	}else{
		iFrame.src = iFrameSRC;
	}
	offlineControlsDiv.appendChild(iFrame);
}

// Used for debugging
function printDB() {
	var rs = db.execute('select TransactionID,Article,' +
		'URL from ZigzagOffline order by Article asc');
	while (rs.isValidRow()) {
		rs.next();
	}
}

// This is called if the user hasn't allowed www.zigzagacademy.com to use Gears
function triggerAllowZigzagacademyDialog(){
	window.addEventListener("load", 
  function(){
    unsafeWindow.GearsFactory().create('beta.localserver', '1.0');
    location.href = location.href;
    return false;
    }, true);
}

// This is called if the user hasn't allowed upload.wikimedia.org to use Gears
function triggerAllowWikimediaDialog(){ 
  window.addEventListener("load", 
  function(){
    unsafeWindow.GearsFactory().create('beta.localserver', '1.0');
    return false;
    }, true);
}

// Inserts the DIV into the header of the page that says Zigzagacademy Offline
function createOfflineControlDiv() {
	var offlineControlsDiv = document.createElement("div");
	var links = document.getElementsByTagName('h2');
	offlineControlsDiv.style.backgroundColor = "#CFEBF7";
	offlineControlsDiv.style.border = "1px solid #ddd";
	offlineControlsDiv.style.padding = "5px";
	offlineControlsDiv.style.cssFloat = "right";
	offlineControlsDiv.style.styleFloat = "right";
	offlineControlsDiv.id = "offlineControlsDiv";
	var title = document.createElement("h6");
	title.style.fontSize = 'small';
	title.innerHTML = "Offline Zigzagacademy";
	offlineControlsDiv.appendChild(title);
	var holder = document.createElement("div");
	holder.id = 'cachedPagesHolder';
	offlineControlsDiv.appendChild(holder);
  links[0].insertBefore(offlineControlsDiv, links[0].firstChild);
}

// If the user has allowed www.zigzagacademy.com then we put the [Cache Page] or 
// [Page Cached] in the offlineControlDiv
function insertCacheLink(){ 
	var links= document.getElementsByTagName('h2');
	var link = null;
	var offlineControlsDiv = document.getElementById('offlineControlsDiv');
	offlineControlsDiv.style.width = '144px';
	if(store.isCaptured(location.href)){
		link = document.createElement("p");
		link.style.fontSize = "10px";
		link.innerHTML = "[ این برگه بایگانی شد ]";
		offlineControlsDiv.appendChild(link);
	} else if(!doesPageExist()) {
    var cssURLs = getCSSLinks();
    cssURLs[cssURLs.length] = "http://www.zigzagacademy.com/themes/elearning/images/logo.gif";
    cssURLs[cssURLs.length] = "http://en.wikipedia.org/w/extensions/OggHandler/OggPlayer.js"
    cssURLs[cssURLs.length] = 
    location.href.toString().substring(0,location.href.length);
    iFrameDownloads = imgLinks.length;
    insertIFrame(imgLinks);
    saveInCacheHistory(cssURLs,imgLinks);
    capture(cssURLs);
  } else {
    pageDownloaded = true;
  }
  return false;
}

// Insert the cache history box into the right side of the page.  It contains 
// all of the links to the articles that have been 'offlined'
function insertCacheHistory() {
	var insertPoint = document.getElementById('cachedPagesHolder');
	var cacheTable = document.createElement('table');

	cacheTable.style.backgroundColor = "#CFEBF7";
	cacheTable.style.color = "black";
	cacheTable.style.fontSize = "small";
	cacheTable.style.fontFamily = "sans-serif";

	cacheTable.innerHTML = '<tbody id="gearsCacheList"></tbody>';
	var clearBR = document.createElement("br");
	insertPoint.insertBefore(clearBR, insertPoint.firstChild);
	insertPoint.insertBefore(cacheTable, insertPoint.firstChild);
	populateCacheTable();
}

// Creates a string of all URLs of media files on the page that will be 
// captured.  String is separated by | character
function getImageLinks() {
	var bodyHTML = 
	    document.getElementsByTagName('body')[0].innerHTML.toString();
	var currentIMGPos = 0;
	var imgURLs = [];
	while(bodyHTML.indexOf("upload.wikimedia.org",currentIMGPos) != -1){
		var nextIMG = bodyHTML.indexOf("upload.wikimedia.org",currentIMGPos+1);
		var quoteBefore = bodyHTML.indexOf('wikipedia/',nextIMG)+9;
		var quoteAfter = bodyHTML.indexOf('"',nextIMG);
		imgURLs[imgURLs.length] = bodyHTML.substring(quoteBefore,quoteAfter);
		currentIMGPos = nextIMG + 1;
	};
	imgURLs = imgURLs.join("|");
	
	return imgURLs;
}

// Creates an array of all CSS file URLs on the page that will be captured
function getCSSLinks() {
	var headHTML = 
		document.getElementsByTagName('head')[0].innerHTML.toString();
	var currentCSSPos = 0;
	var cssURLs = [];
	while(headHTML.indexOf(".css",currentCSSPos) != -1){
		var nextCSS = headHTML.indexOf(".css",currentCSSPos+1);
		var quoteBefore = headHTML.lastIndexOf('"',nextCSS)+1;
		var quoteAfter = headHTML.indexOf('"',nextCSS);
		cssURLs[cssURLs.length] = location.protocol + "//" + location.host + 
		headHTML.substring(quoteBefore,quoteAfter);
		currentCSSPos = nextCSS + 1;
	};

	return cssURLs;
}

// The Gears init function for www.zigzagacademy.com
function initEnGears() {
  // If we're on www.zigzagacademy.com then we're in the main window
	createOfflineControlDiv();
	if(errorMsgs.indexOf('Uncheck "Work Offline" in the File menu') == -1 &&
		errorMsgs.indexOf('Server not found') == -1) {	

    if (!unsafeWindow.google) unsafeWindow.google= {};
    if (!unsafeWindow.google.gears){
      try {
        unsafeWindow.google.gears = {};
        unsafeWindow.google.gears.factory = unsafeWindow.GearsFactory();
      } catch(e) {
        alert("Problem in initializing Gears: " + e.message)
      }
    } try {
      server = 
      unsafeWindow.google.gears.factory.create('beta.localserver');
      store = server.createStore("zigzagacademy_offline");
      db = unsafeWindow.google.gears.factory.create('beta.database');
      if (db) {
        db.open('wikpedia_offline');
        db.execute('create table if not exists ZigzagOffline' +
                   ' (Article varchar(255), URL varchar(255), TransactionID int)');
      }
      imgLinks = getImageLinks();
    } catch(e) {}
		if (!server){
			triggerAllowZigzagacademyDialog();
		} else {
		  var pageDownloaded = false;
			insertCacheHistory();
			insertCacheLink();
		}
		insertIFrame("");
	}
}

// The Gears init function for upload.wikimedia.org
function initUploadGears(){
  hideHTML();
	if(errorMsgs.indexOf('Uncheck "Work Offline" in the File menu') == -1 
	   && errorMsgs.indexOf('Server not found') == -1) {
	  if (!unsafeWindow.google) unsafeWindow.google= {};
    if (!unsafeWindow.google.gears){
      unsafeWindow.google.gears = {};
      unsafeWindow.google.gears.factory = unsafeWindow.GearsFactory();
    } try {
      server = 
        unsafeWindow.google.gears.factory.create('beta.localserver');
      store = server.createStore("zigzagacademy_offline");
    } catch(e){}
	  if (!server){
	    triggerAllowWikimediaDialog();
	  } else{
	    if ( location.hash.length > 5 && location.hash != "#undefined") {
	      var parameters = location.hash.substring(1,location.hash.length);
	      var removeLoc = parameters.indexOf("||remove||");
	      if(removeLoc == -1) {
	        addToStore(parameters);
	      } else {
	        parameters = parameters.substring(0,removeLoc);
	        removeFromStore(parameters);
	      }
	    }
	  }
	}
}

// Removes a page from the store.  This function must remove all links 
// associated with a page from the Gears DB as well as from the ResourceStore.  
// To remove them all from the ResourceStore it must create an iFrame to remove 
// the links from upload.wikimedia.org since it is in a different origin
function removeRecord(removeID) {
	// Remove from localstore
	try {
		var rs = db.execute('select TransactionID,URL from ZigzagOffline ' +
			'where TransactionID=?',[removeID]);
		var mediaCache = [];
		while (rs.isValidRow()) {
			if(rs.field(1).indexOf("www.zigzagacademy.com") != -1){
				store.remove(rs.field(1));
				console.log("REMOVED1: " + rs.field(1));
			} else {
				mediaCache[mediaCache.length] = rs.field(1);
			}
			rs.next();
		}
		rs.close();
	} catch (e) {
		alert(e.message);
	}

	mediaCache = mediaCache.join("|");
	mediaCache += "||remove||"; 
	insertIFrame(mediaCache);

	// Remove from DB
	try {
		var ss = db.execute('delete from ZigzagOffline where TransactionID=?',
			[removeID]);
		ss.close();
	} catch (e) {
		alert(e.message);
	}
}

// This function is not currently used.  It might be used to refresh the page 
// after a user adds/deletes a page from cache, so that the list is updated to 
// reflect that change
function refreshPage() {
	var hashMark = location.href.indexOf("#")
	if(hashMark != -1){
		location.href = location.href.substring(0,hashMark);
	}else{
		location.href = location.href;
	}
}

// Once insertCacheHistory() is called, this function is called.  It populates 
// the table with links to all of the articles stored offline.
function populateCacheTable() {
	var insertHere = document.getElementById('gearsCacheList');
	insertHere.innerHTML = "<td style='color: #999'>برگه‏های بایگانی شده</td>";
	try {
		var rs = db.execute('select TransactionID,Article,' +
			'URL from ZigzagOffline order by Article asc');

		while (rs.isValidRow()) {
			if(rs.field(1) != "") {
        insertEntry(rs.field(0), rs.field(1), rs.field(2), 
                    {downloading: false});
			}
			rs.next();
		}
		rs.close();
	} catch (e) {
		throw new Error(e.message);
	}
}

function getArticleTitle() {
  return location.href.toString().substring(0,location.href.length);
}

function doesPageExist() {
  var articleTitle = getArticleTitle();
  var exists = true;
  try {
    var rs = db.execute('select * from ZigzagOffline where Article=?',
                        [articleTitle]);
    exists = rs.isValidRow();
    
  } finally {
    rs.close();
  }
  
  return exists;
}

// This function is called when the user hits the [Cache Page] button.  It will 
// add all of the CSS URLs, media file URLs, and static page URLs to the DB, 
// then capture them in the ResourceStore
function saveInCacheHistory(cssURLs, imgLinks) {
	var docTitle = document.title.substring
    	(0,document.title.indexOf(" | ZigZag Academy"));
	var docLink = getArticleTitle();
	var tempImgLinks = imgLinks.split("|");
	var maxTID = 0;
	var rowID = null;
  
	try {
		var rs = db.execute('select MAX(TransactionID) from ZigzagOffline');
    if (rs.isValidRow() && rs.field(0) != null) {
      console.log("ISVALID how many times?");
      maxTID = rs.field(0);
    }
	} finally {
    rs.close();
	}
	maxTID++;

	// Add the current URL
	var rs = db.execute('insert into ZigzagOffline values (?, ?, ?)', 
		[docTitle, cssURLs[cssURLs.length-1], maxTID]);
  try {
    rs = db.execute('SELECT MAX(rowid) from ZigzagOffline');
    if(rs.isValidRow()) {
      rowID = rs.field(0);
    }    
  } finally {
    rs.close();
  }

	// Add the media captures
	for (var i=0; i < tempImgLinks.length; i++) {
		db.execute('insert into ZigzagOffline values (?, ?, ?)', 
			["",tempImgLinks[i],maxTID]);
	};
  insertEntry(rowID, docTitle, cssURLs[cssURLs.length-1],{downloading:true})
}

function insertEntry(rowID, articleTitle, articleURL, args) {
  var insertHere = document.getElementById('gearsCacheList');
  var newRow = document.createElement('tr');
	var newTD = document.createElement('td');
	var newElement = null;
	
	articleLink = document.createElement('a');
  articleLink.href = articleURL;
  articleLink.innerHTML = "> " + articleTitle + "&nbsp;";
  
  if(!args.downloading) {
    newElement = document.createElement('a');
    newElement.href = "#" + rowID;
    newElement.addEventListener("click", 
    function(){
      var transID = this.href.substring(this.href.indexOf("#") + 1);
      removeRecord(transID);
      document.getElementById('tr' + 
      this.href.substring(this.href.indexOf("#") + 1)).innerHTML = '';
      return false;
    }
    , true);
    newElement.innerHTML = "[x]";	
  } else {
    newElement = document.createElement('img');
    newElement.src = 'http://www.lisbakken.com/GearsMonkey/zigzag_offline/off-connected-syncing.gif';
  }
	
	newRow.id = "tr" + rowID;
	newRow.style.lineHeight = '1.2em';
	newTD.appendChild(articleLink);
	newTD.appendChild(newElement);
	newRow.appendChild(newTD);
	
	if(!args.downloading) {
	  insertHere.appendChild(newRow);
	} else {
	  insertHere.insertBefore(newRow, insertHere.childNodes[1]);
	  unsafeWindow.beginDownloadCompleteCheck();
	}
}

unsafeWindow.beginDownloadCompleteCheck = function() {
  var whichFrame;
  if (this.frames['grabPictures'] && this.frames['grabPictures'].frames.length > 0) {
    pageDownloaded = true;
    populateCacheTable();
    unsafeWindow.clearTimeout(timerID);
  } else {
    timerID = unsafeWindow.setTimeout("beginDownloadCompleteCheck();", 100);
  }
}



// This is the general Capture function that is called by saveInCacheHistory and 
// addToStore
function capture(url) {
	if (!store) {
		return;
	}
	store.capture(url, 
		function(url, success, captureId){
			  console.log(url);      
		}
	);
}

// -------------------------------------------------------
// This is where the upload.wikimedia.org functions start
// -------------------------------------------------------

// Check if the current page is upload.wikimedia.org origin
function isMediaPage() {
	if (location.href.indexOf('upload.wikimedia.org') != -1) {
		return true;
	} else {
		return false;
	}
}

// Check if the current page is www.zigzagacademy.com origin
function isEnPage() {
	if (location.href.indexOf('www.zigzagacademy.com') != -1) {
		return true;
	} else {
		return false;
	}
}

// Add all of the media files to the upload.wikimedia.org ResourceStore
function addToStore(parameters) {
  var imgURLs = parameters.split("|");
  for (var i=0; i < imgURLs.length; i++) {
    imgURLs[i] = "http://upload.wikimedia.org/wikipedia" + imgURLs[i];
  };
  imgURLs[imgURLs.length] = location.href.substring(0,location.href.indexOf("#"));
  server1 = unsafeWindow.google.gears.factory.create('beta.localserver');
  store1 = server1.createStore("zigzagacademy_offline");
  iFrameDownloads = imgURLs.length;
  if(iFrameDownloads == 0) {
    // console.log("ALL DONE!");
    var newIframe = document.createElement('iframe');
    newIframe.src = 'http://www.lisbakken.com/GearsMonkey/zigzag_offline/fakepage.html';
    unsafeWindow.document.getElementsByTagName('body')[0].appendChild(newIframe);
    // console.log(this.frames[0]);
  } else {
    for(var i=0; i < imgURLs.length; i++) {
      store1.capture(imgURLs[i], function(url, success, captureId){
        downloaded++;
        console.log(url + " - " + downloaded + "/" + iFrameDownloads);
        if(downloaded == iFrameDownloads) {
          // console.log("ALL DONE!");
          var newIframe = document.createElement('iframe');
          newIframe.src = 'http://www.lisbakken.com/GearsMonkey/zigzag_offline/fakepage.html';
          unsafeWindow.document.getElementsByTagName('body')[0].innerHTML = '<iframe src="http://www.lisbakken.com/GearsMonkey/zigzag_offline/fakepage.html"></iframe>';
          
          // console.log(this.frames[0]);
        }
      });
    }
  }
  return false;
}

// Remove all media files for a given article from the upload.wikimedia.org 
// ResourceStore
function removeFromStore(parameters) {
  var imgURLs = parameters.split("|");
  for (var i=0; i < imgURLs.length; i++) {
    imgURLs[i] = "http://upload.wikimedia.org/wikipedia" + imgURLs[i];
    store.remove(imgURLs[i]);
    console.log("REMOVED2: " + imgURLs[i]);
  };
  document.getElementsByTagName('body')[0].innerHTML = 
      'Article removed from Gears cache.';
  return false;
}

// When the iFrame loads upload.wikimedia.org there is text in it -- this 
// function sets the body html to == nothing so that we don't see that on the 
// page.
function hideHTML() {
  var links = document.getElementsByTagName('body');
  links[0].innerHTML = "";  
}

function addLoadEvent(func) {
  var oldonload = unsafeWindow.onload;
  if (typeof unsafeWindow.onload != 'function') {
    unsafeWindow.onload = func;
  } else {
    unsafeWindow.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

// -------------------------------------------------------
// This is where the main calls are made to the functions
// There is a big if() for if we are on wikimedia and
// a big if() for if we are on www.zigzagacademy
// -------------------------------------------------------

// If we're on upload.wikimedia.org we're in the iFrame
if (isMediaPage()) {
  addLoadEvent(initUploadGears);
} else {
  addLoadEvent(initEnGears);
};
