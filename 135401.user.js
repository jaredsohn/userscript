// ==UserScript==
// @name        GooglePlayAppSnaps
// @namespace   http://userscripts.org/users/470857
// @include     https://play.google.com/store/apps/details?id=*
// @version     1.1
// ==/UserScript==
  var allSnaps, thisSnap, rightButton;
  var logging = true;
  allSnaps = document.evaluate("//img[contains(@class, 'doc-screenshot-img lightbox goog-inline-block')]",
  document, 
  null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
  null);

  for(var i=0; i < allSnaps.snapshotLength; i++ ){
  thisSnap = allSnaps.snapshotItem(i);
  thisSnap.src=thisSnap.src.replace('=h230','');
  document.getElementsByClassName("doc-screenshot-section")[0].style.overflow="visible";
  }
  document.getElementsByClassName("screenshot-carousel-right-fade")[0].style.display="hidden";
  rightButton = document.getElementsByClassName("screenshot-carousel-button-next")[0];
  rightButton.parentNode.removeChild(rightButton);	


    document.getElementsByClassName = function(cl) {
        var retnode = [];
        var myclass = new RegExp('\\b' + cl + '\\b');
        var elem = this.getElementsByTagName('*');
        for (var j = 0; j < elem.length; j++) {
            var classes = elem[j].className;
            if (myclass.test(classes)) retnode.push(elem[j]);
        }
        return retnode;
    }