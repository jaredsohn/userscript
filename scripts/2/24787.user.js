// ==UserScript==
// @name        MyFavoriteSoup
// @namespace   http://www.bitsoup.org
// @version		2.0
// @description Improves on BitSoup's bookmarking system, adding ajax bookmarks on the browse, details, and wish list pages, and download links in the wish list view.
// @include http://*bitsoup.org/browse.php*
// @include http://*bitsoup.org/details.php*
// @include http://bitsoup.org/bookmarks.php*

// @exclude http://*bitsoup.org/details.php*&page=*
// ==/UserScript==

//BitSoup FaveURL: http://bitsoup.org/bookmarks.php?op=add&id=[torrent_id]

//<!------- GREASEKIT COMPATABILITY FUNCTIONS --------->//

if(typeof GM_xmlhttpRequest === "undefined") {
	GM_xmlhttpRequest = function(/* object */ details) {
		details.method = details.method.toUpperCase() || "GET";
		
		if(!details.url) {
			throw("GM_xmlhttpRequest requires an URL.");
			return;
		}
		
		// build XMLHttpRequest object
		var oXhr, aAjaxes = [];
		if(typeof ActiveXObject !== "undefined") {
			var oCls = ActiveXObject;
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"};
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"};
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"};
		}
		if(typeof XMLHttpRequest !== "undefined")
			 aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined};
	
		for(var i=aAjaxes.length; i--; )
			try{
				oXhr = new aAjaxes[i].cls(aAjaxes[i].arg);
				if(oXhr) break;
			} catch(e) {}
		
		// run it
		if(oXhr) {
			if("onreadystatechange" in details)
				oXhr.onreadystatechange = function() { details.onreadystatechange(oXhr) };
			if("onload" in details)
				oXhr.onload = function() { details.onload(oXhr) };
			if("onerror" in details)
				oXhr.onerror = function() { details.onerror(oXhr) };
			
			oXhr.open(details.method, details.url, true);
			
			if("headers" in details)
				for(var header in details.headers)
					oXhr.setRequestHeader(header, details.headers[header]);
			
			if("data" in details)
				oXhr.send(details.data);
			else
				oXhr.send();
		} else
			throw ("This Browser is not supported, please upgrade.")
	}
}

if(typeof GM_addStyle === "undefined") {
	function GM_addStyle(/* String */ styles) {
		var oStyle = document.createElement("style");
		oStyle.setAttribute("type", "text\/css");
		oStyle.appendChild(document.createTextNode(styles));
		document.getElementsByTagName("head")[0].appendChild(oStyle);
	}
}

if(typeof GM_log === "undefined") {
	function GM_log(log) {
		if(console)
			console.log(log);
		else
			alert(log);
	}
}

//<!------- END GREASEKIT FUNCTIONS --------->//


//<!------- GLOBAL FUNCTIONS ---------->//

//usage getElementsByClassName(class name, tag name, parent)
function getElementsByClassName(strClass, strTag, objContElm) {
  strTag = strTag || "*";
  objContElm = objContElm || document;    
  var objColl = objContElm.getElementsByTagName(strTag);
  if (!objColl.length &&  strTag == "*" &&  objContElm.all) objColl = objContElm.all;
  var arr = new Array();                              
  var delim = strClass.indexOf('|') != -1  ? '|' : ' ';   
  var arrClass = strClass.split(delim);    
  for (var i = 0, j = objColl.length; i < j; i++) {                         
    var arrObjClass = objColl[i].className.split(' ');   
    if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
    var c = 0;
    comparisonLoop:
    for (var k = 0, l = arrObjClass.length; k < l; k++) {
      for (var m = 0, n = arrClass.length; m < n; m++) {
        if (arrClass[m] == arrObjClass[k]) c++;
        if ((delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
          arr.push(objColl[i]); 
          break comparisonLoop;
        }
      }
    }
  }
  return arr; 
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

function getInfoTable() {
	var main_td = getElementsByClassName('main', 'td')[0];
	var info_table = main_td.getElementsByTagName('table')[0];
	
	var isPMTable = info_table.innerHTML.indexOf("viewmailbox");
	if(isPMTable>=0){
		info_table = main_td.getElementsByTagName('table')[1];
	}
	return info_table;	
}

function ajaxClick(event) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: this.href,
      onload: clickSuccess(this.rel, this.id),
      onerror: clickError
    });
    event.preventDefault();
}

function clickSuccess(rel, id){
	var add = "a";
	var action = id.split("-")[0].toLowerCase().indexOf(add.toLowerCase());

	switch(action)
	{
		case -1:
			// alert(rel + '\nhas been removed from your wishlist');
			var row =id.split("-")[1]			
			bookmarksModule.removeBookmarkRow(row);
			break;
		case 0:
			alert(rel +'\nhas been added to your wish list');
			break;
		default:
			alert("Not Found");
			break;
	}
}

function clickError(){
	alert('Error completing your request. Check your error log for details');
	GM_log("Click error...");
}

function getTorrentID(torrentURL){
	var url_vars = torrentURL.split("?")[1];
	var id = url_vars.match(/id=([^(\&|$)]*)/)[1];
	return id;
}

function getTorrentIDFromLink(strLink){
	var torrentID = strLink.match(/id=([^(\&|$)]*)/)[1];
	return torrentID;
}

//<!-------- END GLOBAL FUNCTIONS ------->//

//<!------- GLOBAL VARIABLES -------->//

//	Create Variables and construct the URL's and containers	//
	
var add_url = 'http://bitsoup.org/bookmarks.php?op=add&id=';
var book_img_data = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0' +
'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJcSURBVDjLbZPfa85xFMdf36/nebbGBcLa' +
'MmtM2DybElsjQm5c+PEnoKSQCzfEnZtduLRdSJFc4UK5sEizSLtQNCYXJMXKlMeG7fv5cc5x8X02' +
'w06dzqdPn/M673M6n8TM2H/6WruZ3TaoYPQYhhlgRh5s1lUCwU18GLpxfjVAgfzBMYP15bZVyfjX' +
'CcxmkiCHKabwfeIX085QK7RQtRwAO8ptTcmujiZWNZSxnICa5lU1r758cR11tQW2HTjOXwDMlpTb' +
'm7n//B2VyhSmCoDOqDDD1Pg+OUXmPHOt2gJJoVRg7cZmWuuXIgJmiqohYogqUY3pLHDrzuP5AIaI' +
'8nF8klJaJMsygvNEze8jCygUSyxbWIOazQMAVJQoAecch7a25vJzdZgZ1wffEmqL/JP/R0EQRUIk' +
'SsrNx29wIRLFkKhEEoqlEj7mQ50XEKPiQ8ArWFpDUixCamiiqCpeErz8D0irQyREIWYRF4QsClkQ' +
'XIi4KDgvuKlnfP50iZZ1A5R3j7PvXOeFvxWIElzABcnbEcOLEkWR6ac01r9h84YuVi5dy+DoXYZf' +
'P7nYfbJxcTq3heBzgI/KdBB8EFxUpn48YtP6TiQVOhv2Ikmgu9wDcCKdWRgfhegiLihZEELQXL4T' +
'Kj+/UEwWsX/DKQDO7LnCmhUdALWzMxAxxAsu5J6FiHOK98q3yQqjY8/ofXgYgN4Hh3k/PgKQzc6A' +
'NGVLVweWJIgYUQytxsQdZHhkgJ6O7dx71U8pKfD05RBAX2Jm7DzSd9WMo/nPm7P/GFTP1A5BzQtI' +
'PMAPoH/48tjZ3wRCz4QMKdc8AAAAAElFTkSuQmCC';

var detailsModule = { //Sets the site alteration to the details page//	
	
	insertLinks: function(){ //insert a row in the table under the torrent download link
		var torrent_name = document.getElementsByTagName('h1')[0].innerHTML;
		var target_table = getInfoTable();
		var torrent_id = getTorrentID(window.location.href);
		var fave_url = add_url + torrent_id;
		
		
		var x_row = target_table.insertRow(1);
		var cell_1 = x_row.insertCell(0);
		var cell_2 = x_row.insertCell(1);

		var link = document.createElement('a');
		link.href = fave_url;
		link.rel = torrent_name;
		link.title = 'Add ' + link.rel +' to your wishlist';
		link.id = "a-0";

		var label = document.createElement("b");
		var text = document.createTextNode(" - Add torrent to Wish List");

		label.appendChild(text);
		var bookimg = document.createElement('img');
		bookimg.src = book_img_data;
		bookimg.style.border = 'none';


		link.appendChild(bookimg);
		link.appendChild(label);

		cell_1.innerHTML = '<p align="right"><b>Wish List</b></p>';
		cell_2.appendChild(link);
		link.addEventListener('click', ajaxClick, false);
	},
	
	init: function(){
		GM_log("Details Module Initializing");
		this.insertLinks();
	},
	
	
}

var browseModule = { //Sets the site alteration to the browse page//
	
	replaceBookmarks: function(){
		var main_table = getElementsByClassName('koptekst')[0];
		var rows = main_table.rows.length;
		var current;
		var torrent_name;
		for (var i=1; i < rows; i++) {
			current = main_table.rows[i];
			torrent_name = current.getElementsByTagName('td')[1].getElementsByTagName('b')[0].childNodes[0].data;
			
			var cell = current.getElementsByTagName('td')[2];
			var link = cell.getElementsByTagName('a')[0].href;
			var img = document.createElement('img');
			var newLink = document.createElement('a');
			
			cell.removeChild(cell.childNodes[0]);
			
			img.src = book_img_data;
			img.style.border = 'none';
						
			newLink.href = link;
			newLink.title = "Add " + torrent_name + " to your wishlist";
			newLink.rel = torrent_name;
			newLink.id= "a-" + i;
			newLink.appendChild(img);
			cell.appendChild(newLink);
			newLink.addEventListener('click', ajaxClick, false);
		};
		
	},
	
	init: function(){
		GM_log("Browse Module Initializing");
		this.replaceBookmarks();
	}
}

var bookmarksModule = { //Sets the site alteration to the wishlist page//
	
	
	iframe:'',
	
	book_delete_img:
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK' +
	'6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJhSURBVDjL' +
	'dZPda85hGMc/v+f5Pc8e2wE2QtiMyZh5K4RSpCkHxJnkSElOxJFy4kDyF3DopR15' +
	'yUst2pRpJw4cSJLETCTb0mxre57f775eHPyevdBcdXfV3X19ru/36rojd+fwuZtt' +
	'7n7PYQRnt+O4A+5kyaePaSAko19e3rm0GiAme3DaobV9Q2M0NDyK+1QRZDDDDX6P' +
	'TlBOHPO4mWpkANjbvmFltG/TShqXteMZAXPLulrWffGCWmpLMXuOnOEvAO4L29ua' +
	'ePr6EyMjk7gZADalwh035/fYJJUkZXZULRDFxZi1G5toWVKPKrgbZo6qo2aIOeVK' +
	'4O793rkAjqrxdWiMYq5ApVIhJCli2b2QJy4UWVRXg7nPAQBMDdFAkiQc3dGSyc/U' +
	'4e7cevGBUCrwT/2MgqCGBkE0R2fve5IgiDoqhhBRKBZJJRvqnAARIw2B1MBzNUSF' +
	'AuQciwwzI9WIVP8LgCCKVIQkKKJGUKvmDL5+4BFrPj5g29AAv4olujviix3dcm1G' +
	'gRohCSRBMzvqpFVIa/9jdiV9tJ48Q01zG+W33bzv67nSc6AwkZttIaQZIBWjHJQ0' +
	'KIkYy991sm7fMUqfe4luH6e2/yGrmhryHvn5eGphUlEkEZJgBDNUnGBKCM788UFK' +
	'S5vh0IUZ75eXkbdo1fQMVB1NNbNghogh4og4Y7UNTL7pou7JWZLyTyaB8bE8mufH' +
	'9AzI5di+cxMeRag6oo5V8+iWE7x71UVj/TzifIHxYWFgMFLHr08Bep51vTqV/bxZ' +
	'+4+Dw3NfwX7byuZvPTSkYPncd8dvHOyWq38AFgvYQWlFsCQAAAAASUVORK5CYII=',
	
	addDownloadLinks: function() {
		//var faveTable = getElementsByClassName('tableb', 'table')[0];
		var faveTable = getElementsByClassName('tableb')[0];
		if(faveTable)
		{
		var count = faveTable.rows.length;
		var dlImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0' +
		'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABbSURBVCjPY/jPgB8yDCkFB/7v+r/5/+r/' +
		'i/7P+N/3DYuC7V93/d//fydQ0Zz/9eexKFgtsejLiv8b/8/8X/WtUBGrGyZLdH6f8r/sW64cTkdW' +
		'SRS+zpQbgiEJAI4UCqdRg1A6AAAAAElFTkSuQmCC';
		
		for (var i = 1; i < count; i++){
			var torrentCell = faveTable.getElementsByTagName('tr')[i].getElementsByTagName('td')[1];
			var torrentLink = torrentCell.getElementsByTagName('a')[0].href;
			var torrentName = torrentCell.getElementsByTagName('a')[0].getElementsByTagName('b')[0].innerHTML;
			torrentCell.innerHTML = '<a href="http://www.bitsoup.org/download.php/' + getTorrentIDFromLink(torrentLink) +'/' + escape(torrentName) + '.torrent"><img src="' + dlImg +'" alt="download" border="0" title="Download ' + torrentName +'.torrent"></a> - <a href="' + torrentLink + '"><b>' + torrentName + '</b></a>';
		}
	}
	},
	
	replaceDelete: function() {
		var faveTable = getElementsByClassName('tableb')[0];
		var deleteURL; //'http://bitsoup.org/bookmarks.php?id=497988[torrentID]&op=delete'
		if(faveTable)
		{
		var rows = faveTable.rows.length;
		var current;
		var torrent_name;
		for (var i = 1; i < rows; i++){
			current = faveTable.rows[i];
			
			torrent_name = current.getElementsByTagName('td')[1].getElementsByTagName('b')[0].childNodes[0].data;
			
			var cell = current.getElementsByTagName('td')[(current.cells.length-1)];
			var link = cell.getElementsByTagName('a')[0].href;
			var img = document.createElement('img');
			var newLink = document.createElement('a');
			
			cell.removeChild(cell.childNodes[0]);

			img.src = this.book_delete_img;
			img.style.border = 'none';
			
			newLink.href = link;
			newLink.title = 'Remove ' + torrent_name + ' from your wishlist';
			newLink.rel = torrent_name;
			newLink.id = "r-" + i; 
			newLink.target = this.iframe.name;
			newLink.appendChild(img);
			cell.appendChild(newLink);
			newLink.addEventListener('click', ajaxClick, false); 
		}
	}
		
	},
	
	removeBookmarkRow: function(row){
		var faveTable = getElementsByClassName('tableb')[0];
		faveTable.rows[row].style.display = 'none';
	},
	
	init:function(){
		GM_log("Bookmarks Module Initializing");
		this.iframe.id = "dumpster";
		this.iframe.name = "IFRAME";
		this.iframe.style ="width:0px; height:0px; border: 0px; display:none;";
		this.iframe.src= "about:config";
		//insert our download links
		this.addDownloadLinks();
		//replace the delete buttons with spiffy ajax ones
		this.replaceDelete();
		
	},
}
	
//<!--------- FIRE IT UP ------------->//
function start(){
	var isBrowsing = window.location.href.indexOf('/browse.php');
	var isDetails = window.location.href.indexOf('/details.php');
	var isBookmarks = window.location.href.indexOf('/bookmarks.php');
	if (isBrowsing>=0) 
	{
		browseModule.init();
	}else if (isDetails>=0)
	{
		detailsModule.init();
	}else if (isBookmarks>=0)
	{
		bookmarksModule.init();
	};
	
}

start();

