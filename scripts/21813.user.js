// ==UserScript==
// @name          yahoo groups sorter & cleaner
// @description   changes photo & file sort order to newest first, or whatever you want. also strips some ads & junk. optionally view images large, not medium. optionally scroll over links at top of screen
// @include       http://*ph.groups.yahoo.com/group/*/photos*
// @include       http://*groups.yahoo.com/group/*/files/
// @include       http://*groups.yahoo.com/group/*/files/*/
// ==/UserScript==

// Set these 4 values to your preferences:
var viewlarge = true; 	// make default view of photos "large", not "medium"
var scrolling = true;	// scroll past links at top of screen
var minFileSize = 3;	// filter out files smaller than this size
var noHTMfiles = false; 	// exclude files with htm or html extension from files view

// to add more sort orderings, add to this table & also to the switch statement in doSort
var fileOrders = [
'name',
'size (big-small), name',
'size (big-small), date (new-old)',
'date (new-old), size (big-small)',
'date (new-old), name ',
'date (old-new), size (big-small)',
'date (old-new), name',
'size (small-big), name'
];

var fSortOrder, order1, order2;
var t,A;
var FSO = 'FSO';		//files sort order key

function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

function StripJunk () {
  a = document.getElementById("ygmalogo");
  if (a) 
    a.parentNode.removeChild(a);
  a = document.getElementById("ygrp-gtips");
  if (a)
    a.parentNode.removeChild(a);
  a = document.getElementById("ygrp-mgl-promo");
  if (a)
    a.parentNode.removeChild(a);
  a = document.getElementById("ygrp-sponsored-links");
  if (a)
    a.parentNode.removeChild(a);
}

// ******************************* FILES **********************************

function addFilesMenu () {
  var span = $n("span");
  $t("Sort by: ",span);
  var sel = $n("select",span);
  for (var i = 0; i < fileOrders.length; i++) {
    var opt = $n("option",sel);
    opt.value = i;
    if (i == fSortOrder) opt.selected = true;
    opt.innerHTML = fileOrders[i];
  }
  sel.addEventListener("change",function() {
                         fSortOrder = sel.value - 0;
                         GM_setValue(FSO,fSortOrder);
                         doSort();
                       },true);
  t.parentNode.insertBefore(span,t);
}

function mySortBy (a,b,order) {
// 1 = sort by date (oldest to newest)
// 2 = sort by date (newest to oldest)
// 3 = sort by size (smallest to biggest)
// 4 = sort by size (biggest to smallest)
// 5 = sort by file name (A to Z)
// 6 = sort by file name (Z to A)
  size1 = a.cells[3].innerHTML;
  size2 = b.cells[3].innerHTML;
  if ((size1==0) && (size2>0)) return -1;			// folders before files
  if ((size2==0) && (size1>0)) return 1;
  column = Math.floor ((order + 3) / 2);		// 1 or 2 = 2, 3-4=3, 5-6=4
  var sd1 = a.cells[column].innerHTML;
  var sd2 = b.cells[column].innerHTML;
  switch (order) {
    case 1: return sd1 - sd2;
    case 2: return sd2 - sd1;
    case 3: return sd1 - sd2;
    case 4: return sd2 - sd1;
    case 5: return sd1.localeCompare(sd2);
    case 6: return sd2.localeCompare(sd1);
  }
}

function mySort (a,b) {
  result = mySortBy (a,b,order1);
  if ((result == 0) && (order2 > 0))
    result = mySortBy (a,b,order2);
  return result;
}

function doSort () {
  switch (fSortOrder) {
    case 0: order1 = 5; order2 = 0; break; 	// see mySortBy for code values
    case 1: order1 = 4; order2 = 5; break; 
    case 2: order1 = 4; order2 = 2; break; 
    case 3: order1 = 2; order2 = 4; break; 
    case 4: order1 = 2; order2 = 5; break; 
    case 5: order1 = 1; order2 = 4; break; 
    case 6: order1 = 1; order2 = 5; break; 
    case 7: order1 = 3; order2 = 5; break; 
  }
  hdr = A.shift();					// toss row 0, the header
  A.sort(mySort);						// sort it
  A.unshift(hdr);						// put it back

  len = t.rows.length;
  for (var i = 1; i < len; i++) {			
    t.deleteRow(1);
  }
  for (var i = 1; i < A.length; i++) {	
    t.insertRow(i);
    t.rows[i].innerHTML=A[i].innerHTML;
    t.rows[i].cells[2].innerHTML = "&nbsp;";
    t.rows[i].cells[3].innerHTML = "&nbsp;";
    t.rows[i].cells[4].innerHTML = "&nbsp;";
  }
}

function SortFiles() {
  var tables;
  var s, sz;
  StripJunk();
  if (scrolling) scrollTo (130,200);
  tables = document.evaluate(
    "//table[@class='datatable']", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  t = tables.snapshotItem(0);
  if ((t.id="ygrp-clipboard") && (tables.snapshotLength > 1))
    t = tables.snapshotItem(1);
  addFilesMenu();
  A = new Array();
  j = 1;
  for (var i = 1; i < t.rows.length; i++) {
    var tr = t.rows[i];
    sz = tr.cells[5].innerHTML;			// size: a string, not a number
    sz = sz.split("&nbsp")[0]; 			// lose the "&nbsp;KB"
    sz = sz - 0;						// convert to a number
    if ((sz > 0) && (sz < minFileSize)) 		// sz=0 means we have a folder
      continue;
    if ((noHTMfiles) && (tr.cells[1].innerHTML.match(/\.htm(l?)<\/a>/i)))
      continue;
    A[j] = tr;				// use empty columns 2, 3 & 4 to store the sort data
    A[j].cells[3].innerHTML = sz;			// size
    s = tr.cells[8].innerHTML;			// date: a string
    s = s.replace ("&nbsp;",' ');
    s = s.replace ("&nbsp;",' ');
    A[j].cells[2].innerHTML = Date.parse(s);
    s = tr.cells[1].innerHTML;			// file name
    s = s.toLowerCase();
    s = s.split("<a href")[1];			// lose the html tags
    s = s.split(">")[1];	
    s = s.split("<")[0];	
    A[j].cells[4].innerHTML = s;
    j++;
  }
  doSort();
}

// ************************* PHOTOS ***********************************************

var allLinks, a;		// links
var p, q, s; 		// strings
var GI = 'GI';
var getInfo;
var PSO = 'PSO';		// photos sort order key
var pSortOrder;	 	// 1 = oldest first
				// 2 = newest first
				// 3 = sort by creator name
				// 4 = reverse sort by creator name
				// 5 = sort by album name (yahoo default)
				// 6 = reverse sort by album name
var photoOrders = [
'date (old-new)','date (new-old)',
'creator (A-Z)','creator (Z-A)',
'name (A-Z)','name (Z-A)'];

function SortPage() {
  s = window.location.href;
  q = window.location.search;
  if (q == '')
    s += '?o=' + pSortOrder
  else if (! q.match('o='))
    s += '&o=' + pSortOrder
  else 
    s = s.slice(0,-1) + pSortOrder;
  window.location.replace (s);
  // When the browser loads the new URL, Greasemonkey will reload this script,
  // and we will start all over
}

function addInfo () {
  if ((!(p.match(/\/browse/))) || (p.match(/\/browse$/)) || (p.match(/\/browse\/$/))) {
    allLinks = document.evaluate(
        '//a[contains(@href, "/photos/browse/")]',
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
      a = allLinks.snapshotItem(i);
      if (!(a.href.match("m=l"))) {			// avoid the "list" links
        if (a.firstChild.nodeName == "DIV") {
          a.firstChild.setAttribute('class','smalltype');
          a.firstChild.firstChild.style.paddingBottom = "5px";	// the image
          getAlbumDate (a);
        }
      }
    }
  }
  else {
    allLinks = document.evaluate(
        '//a[contains(@href, "/photos/view/")]',
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
      a = allLinks.snapshotItem(i);
      if (a.firstChild.nodeName == "IMG")
        getPicInfo (a);
    }
  }
}

function addPhotosMenu () {
  table1 = document.evaluate(
    "//table[@class='formtable']", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  var span = $n("span");
  span.style.whiteSpace = "pre";				
  table1.parentNode.insertBefore(span,table1);
  if (span.previousSibling.nodeValue.length > 1)	// if there's a sub-heading
    $t("        ",span);					// spaces will separate it from the menu

  $t("Sort by: ",span);
  var sel = $n("select",span);
  for (var i = 0; i < photoOrders.length; i++) {
    var opt = $n("option",sel);
    opt.value = i + 1;
    if (opt.value == pSortOrder) opt.selected = true;
    opt.innerHTML = photoOrders[i];
  }
  sel.addEventListener("change",function() {
                         pSortOrder = sel.value - 0;
                         GM_setValue(PSO,pSortOrder);
                         SortPage();
                       },true);

  $t("  Get info? ",span);
  var check = $n("input",span);
  check.type = "checkbox";
  if (getInfo) check.checked = "1";
  check.addEventListener("change",function() {
                         getInfo = check.checked;
                         GM_setValue(GI,getInfo);
                         if (getInfo) addInfo();
                       },true);
}

function getAlbumDate (albLink) {
  var request = new XMLHttpRequest();
  var u = albLink.href;
  albLink.href = albLink.href.replace('browse','view');
  albLink.href = albLink.href.slice(0,-1);	// delete last character, the sort order
  albLink.href += '2&b=1';   			// and set it to newest-oldest, get the 1st one
  request.onreadystatechange = function () {
    if ((request.readyState == 4) && (request.status == 200)) {
      d = request.responseText.split('Posted: ')[1];
      d = d.split('<br>')[0];
      albLink.firstChild.innerHTML += d;
    }
  }
  request.open("GET",albLink);
  albLink.href = u;
  request.send(null);
}

function FixAlbumLinks() {
  addPhotosMenu();
  allLinks = document.evaluate(
      '//a[contains(@href, "/photos/browse/")]',
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    a = allLinks.snapshotItem(i);
    if (!(a.href.match("m=l"))) {			// avoid the "list" links
      a.href += ('?o=' + pSortOrder); 		// just do the album links
      if (getInfo && (a.firstChild.nodeName == "DIV")) {
        a.firstChild.setAttribute('class','smalltype');
        a.firstChild.firstChild.style.paddingBottom = "5px";	// the image
        getAlbumDate (a);
      }
    }
  }
  StripJunk();
  if (scrolling) {
    scrollTo (0,200);
  }
}

function getHdr (picLink) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if ((request.readyState == 4) && (request.status == 200)) {
      GM_log(request.getResponseHeader('modified'));
      GM_log(request.getAllResponseHeaders());
    }
  }
  request.open("HEAD",picLink);
  request.send(null);
}

function getPicInfo (picLink) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if ((request.readyState == 4) && (request.status == 200)) {
      //GM_log(request.responseXML);
      info = request.responseText.split('Posted: ')[1];
      info = info.split('Size: ')[0];
      info = info.replace("<br>"," - ");
      info = info.replace("Resolution: ","");
      info = info.replace(" x ","x");
      picLink.innerHTML += "<br>" + info;
      picLink.setAttribute('class','smalltype');
    }
  }
  request.open("GET",picLink);
  request.send(null);
}

function FixPicLinks() {
  allLinks = document.evaluate(
      '//a[contains(@href, "/photos/view/")]',
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    a = allLinks.snapshotItem(i);
    if (viewlarge) {
      a.href += ('&m=f');
    } 		
    a.href += ('&o=' + pSortOrder);   
    if (getInfo && (a.firstChild.nodeName == "IMG"))
      getPicInfo (a);
  }
  StripJunk();
  if (scrolling) {
    scrollTo (0,200);
  }
}

function FixPic () {
  var table1, table2;
  table1 = document.evaluate(
    "//table[@class='headview headnav']", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  table2 = document.evaluate(
    "//table[@class='formtable']", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  document.body.innerHTML = "";
  document.body.appendChild(table1.snapshotItem(0));
  document.body.appendChild(table2.snapshotItem(0));
}

var p = window.location.pathname;
var q = window.location.search;
fSortOrder = GM_getValue(FSO,2);		// default to size, date
pSortOrder = GM_getValue(PSO,2);		// default to date
getInfo = GM_getValue(GI,true);		// default to get info
if (p.match("/files/"))				// we're in the files section
  SortFiles()
else 							// we're somewhere in the photos section
if (q.match("m=l") || q.match("m=s")) 	// we're in list or slideshow mode, don't sort
  StripJunk()
else if (p.match("/view/")) 			// we're looking at a photo
  FixPic()
else if (!(q.match("o=")))			// looking at unsorted thumbnails
  SortPage()
else if (!(p.match(/\/browse/))) 		// no "/browse", looking at sorted album thumbnails
  FixAlbumLinks()
else if (p.match(/\/browse$/)) 		// "/browse", looking at sorted album thumbnails
  FixAlbumLinks()
else if (p.match(/\/browse\/$/)) 		// "/browse/", looking at sorted album thumbnails
  FixAlbumLinks()
else							// looking at sorted photo thumbnails
  FixPicLinks();

