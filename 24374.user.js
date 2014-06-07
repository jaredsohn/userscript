// ==UserScript==
// @name        DownloadFavoriteSoup
// @namespace   http://www.bitsoup.org
// @description Provides a link to download a torrent from the Wish List page.
// @include http://*bitsoup.org/bookmarks.php?*&op=view

// ==/UserScript==

// http://bitsoup.org/download.php/82867/the%20unsaid.torrent
// http://bitsoup.org/bookmarks.php?id=181881&op=view
//BitSoup FaveURL: http://bitsoup.org/bookmarks.php?op=add&id=[torrent_id]
// 
// 
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

function getTorrentIDFromLink(strLink){
	var torrentID = strLink.match(/id=([^(\&|$)]*)/)[1];
	return torrentID;
}

function getTorrents() {
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
	var torrentCell = faveTable.getElementsByTagName('td')[0]
}


var faveTable = getElementsByClassName('tableb', 'table')[0];

getTorrents();