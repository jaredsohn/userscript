// ==UserScript==
// @name           Wykopalisko Fix BETA
// @author	   maros (http://www.wykop.pl/ludzie/maros/)
// @description	   Skrypt umozliwia wlasnoreczne usuniecie pozycji z listy na wykopalisku, tak aby wiecej sie nie pojawil przy kolejnych odslonach.
// @namespace      http://userstyles.org
// @include        http://www.wykop.pl/wykopalisko/*
// ==/UserScript==

(function() {

   var cookieId = [];
   var cookies = document.cookie.split('; ');
   var c = 0;

   for (var i=0; i < cookies.length; i++) {
      if (cookies[i].split('=')[0].match(/^wykopfix/)) {
	 cookieId[c] = cookies[i].split('=')[1];
	 c++;
      }
   }

function getRandomString() {
   var a = '';
   for (var i=0; i<10; i++) { 
      var numI = getRandomNum();
      while (checkPunc(numI)) { numI = getRandomNum(); }
      a += String.fromCharCode(numI);
   }
   return a;
}

function getRandomNum() { return (parseInt(Math.random()*1000)%94)+33; }

function checkPunc(num) {
    if ((num >=33) && (num <=47)) { return true; }
    if ((num >=58) && (num <=64)) { return true; }    
    if ((num >=91) && (num <=96)) { return true; }
    if ((num >=123) && (num <=126)) { return true; }
    return false;
}

   var insertScript = document.createElement("script");

   insertScript.innerHTML = 
      'function removeEntry(token, id) { var entry = document.evaluate("//ol[contains(@class, \'entry\')]/li[not(contains(@class, \'sponsoredby\'))]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); ' +
      'for (var i=0 ; i < entry.snapshotLength; i++) { var cCount = entry.snapshotItem(i).children[0].childElementCount; if (cCount > 2) { var c = cCount - 2 } else { var c = cCount - 1 } var eId = entry.snapshotItem(i).children[0].children[c].children[0].classList[1]; var rexp = /\{id\:(.*)\}/; var thisEId = rexp.exec(eId)[1];' +
      'if (thisEId == id) { entry.snapshotItem(i).parentNode.removeChild(entry.snapshotItem(i)); ' +
      'var date = new Date(); date.setTime(date.getTime()+86400000); document.cookie = "wykopfix_" +token+ "=" +id+ ";expires=" +date.toGMTString(); } } }';

   document.body.insertBefore(insertScript, document.body.firstChild);

   var itemList = document.evaluate("//ol[contains(@class, 'entry')]/li[not(contains(@class, 'sponsoredby'))]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var entryList = document.evaluate("//ol[contains(@class, 'entry')]/li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

   for (var i=0 ; i < itemList.snapshotLength; i++)
   {
	var childCount = itemList.snapshotItem(i).children[0].childElementCount;
	if (childCount > 2) { var child = childCount - 2 } else { var child = childCount - 1 } 
	var thisElement = itemList.snapshotItem(i).children[0].children[child].children[2].children[0];
	var entryId = itemList.snapshotItem(i).children[0].children[child].children[0].classList[1];

	var regexp = /\{id\:(.*)\}/;
	var thisEntryId = regexp.exec(entryId)[1];

	for (var j=0; j < cookieId.length; j++) {
	   if (thisEntryId == cookieId[j]) {
	      itemList.snapshotItem(i).parentNode.removeChild(itemList.snapshotItem(i));
	      GM_log('Nie wyswietlono elementu: ' + cookieId[j]);
	   }
	}

	newElement = document.createElement('li');
	newElement.setAttribute('class', 'group');
	newElement.innerHTML = '<a class="button-bl" href="#" onClick="removeEntry(\''+getRandomString()+'\',\''+thisEntryId+'\'); return false"><span><em>Usuń</em></span></a>';
	thisElement.parentNode.insertBefore(newElement, thisElement.lastSibling);
  }

})();