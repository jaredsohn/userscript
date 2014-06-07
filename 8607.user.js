// ==UserScript==
// @name        FavoriteSoup
// @namespace   http://www.bitsoup.org
// @description Provides a link to add to favorites from torrent description page.
// @include http://*bitsoup.org/details.php*
// @exclude http://*bitsoup.org/details.php*&page=*
// ==/UserScript==

//BitSoup FaveURL: http://bitsoup.org/bookmarks.php?op=add&id=[torrent_id]

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


//==========================================================//
//	Create Variables and construct the URL's and containers	//

var url_vars = window.location.href.split("?")[1];
var torrent_id = url_vars.match(/id=([^(\&|$)]*)/)[1];
var soup_url = 'http://bitsoup.org/bookmarks.php?op=add&id=';
var fave_url = soup_url + torrent_id;

var target_table = getInfoTable();
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


//insert a row in the table under the torrent download link

var x_row = target_table.insertRow(1);
var cell_1 = x_row.insertCell(0);
var cell_2 = x_row.insertCell(1);
cell_1.innerHTML = '<p align="right"><b>Wish List</b></p>';
cell_2.innerHTML = '<a href="' + fave_url + '"><img src="'+ book_img_data + '" alt="Bookmark" width="16" height="16" border="0"> <b>- Add torrent to Wish List</b></a>';

