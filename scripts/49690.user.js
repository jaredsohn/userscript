// ==UserScript==
// @name        BSAutoDescription
// @namespace   http://www.bitsoup.org
// @version		1.0
// @description Removes the -:CliCK Here for Description:- link on torrent pages and just shows description
// @include http://*bitsoup.org/browse.php*
// @include http://*bitsoup.org/details.php*
// @include http://bitsoup.org/bookmarks.php*

// @exclude http://*bitsoup.org/details.php*&page=*
// ==/UserScript==


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

function makeItBetter(){
	var main_table = getElementsByClassName('koptekst')[0];
	var rows = main_table.rows.length;
	var current;
	var torrent_name;
	for (var i=1; i < rows; i++) {
		current = main_table.rows[i].getElementsByTagName('td')[1];
		
		var torrentID = getTorrentIDFromLink(current.getElementsByTagName('a')[0].href);
		var torrentLink = '/details.php?id='+torrentID+'&tdesc=1';
		var torrentName = current.getElementsByTagName('a')[0].getElementsByTagName('b')[0].innerHTML;
		
		current.innerHTML ='<a href="' + torrentLink + '"><b>' + torrentName + '</b></a>';
	
	};
		
}

makeItBetter();