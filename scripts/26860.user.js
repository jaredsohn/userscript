// 2009-03-01
//
// ==UserScript==
// @name           Vkontakte: quick remove your tag from photo
// @namespace      http://schmerz.ru/
// @description    Remove yourself from photo with single click
// @include        http://vkontakte.ru/photos.php*
// ==/UserScript==

function removeLinkClick() {
  var showPageUrl = this.parentNode.getElementsByTagName('a')[0].getAttribute('href');
  
  var objThrobber = document.createElement('img');
  objThrobber.setAttribute('src', 'http://vkontakte.ru/images/progressbar.gif');
  objThrobber.style.border='none';
  
  this.parentNode.replaceChild(objThrobber, this);
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://vkontakte.ru/'+showPageUrl,
    onload: function(response) {
      var showPageContent = response.responseText;
      
      var removeTagMatches = showPageContent.match("<a href=\"javascript:tagger.removeTag\\(([0-9]+), '([0-9_]+)'\\);hide\\('msg'\\);\">");
      
      GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://vkontakte.ru/photos.php?act=put',
        headers: {
          'Referer': showPageUrl,
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: 'tag_id='+removeTagMatches[1]+'&pid='+removeTagMatches[2],
        onload: function(response) {
          objThrobber.parentNode.getElementsByTagName('img')[0].style.opacity = 0.2;
          objThrobber.parentNode.removeChild(objThrobber);
        },
        onerror: function(response) {
          alert("Error: "+response.statusText);
        }
      });
    },
    onerror: function(response) {
      alert("Error: "+response.statusText);
    }
  });
}

function addRemoveLinkToList() {
  var xpathResult = document.evaluate('//a[starts-with(@href,"photos.php?act=show")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  for (var i=0; i<xpathResult.snapshotLength; i++) {
    var objA = xpathResult.snapshotItem(i); 
    var objA_href = objA.getAttribute('href');
    
    var objRemove = document.createElement('a');
    objRemove.innerHTML = "Удалить";
    objRemove.setAttribute('href', 'javascript:;');
    objRemove.style.display='block';
    
    objRemove.addEventListener('click', removeLinkClick, true);
    if (window.opera) { objCloseBtn.onclick = removeLinkClick; }
    
    objA.parentNode.appendChild(objRemove);
  }
}

function addRemoveLinkToSingle() {
  var objRotating = document.getElementById('rotating');
  var objRemoveMe = document.createElement('a');


  var xpathResult = document.evaluate('//a[starts-with(@onclick,"return removeTag")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  if (xpathResult.snapshotLength > 0) {
    var objRemoveFound = xpathResult.snapshotItem(0);

    objRemoveMe.setAttribute('onclick', objRemoveFound.getAttribute('onclick'));
    objRemoveMe.innerHTML = "Удалить меня";
    objRemoveMe.setAttribute('href', '#');
    objRotating.appendChild(objRemoveMe);  
  }
}

function getUID() {
  var m = document.cookie.match('remixmid=([0-9]+);');
  if (!m) return 0;
  return m[1];
}

if (window.location.href.match('.*photos.php\\?act=(added|user).*')) {
  var m = window.location.href.match('.*id=([0-9]+).*');
  if (!m || getUID() == m[1]) {
    addRemoveLinkToList();
  }
} else if (window.location.href.match('.*photos.php\\?act=show.*')) {
  addRemoveLinkToSingle();  
}