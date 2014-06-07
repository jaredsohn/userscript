// ==UserScript==
// @name           The Attraction Forum Clean
// @author         http://www.socialpancake.com/
// @version        0.1
// @description    Removes ads and sponsors on TAF.
// @include        *theattractionforums.com*
// ==/UserScript==

window.addEventListener("load", function(e) {
  var elements = document.evaluate("//table[contains(@width, '120')] | //table[contains(@width, '160')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elements.snapshotLength; i++) {
    var thisElement = elements.snapshotItem(i);
    thisElement.parentNode.removeChild(thisElement);
  }
}, false);

// REMOVE ADSENSE
function init() {
iframe=document.getElementsByTagName("iframe");
var i;
for(i=0;i<iframe.length;i++){
	if(iframe[i].src.indexOf("pagead2.googlesyndication.com/pagead/ads")!=-1 || iframe[i].src.indexOf("http://pagead2.googlesyndication.com/cpa/ads")!=-1){
		iframe[i].height=0;iframe[i].width=0;
	}

//alert("Ads!"); // debug

}}
window.addEventListener('load', function() { 
     if (unsafeWindow.gmonkey) {
         unsafeWindow.gmonkey.load('1.0', function(_gmail) {
           _gmail.registerViewChangeCallback(function() {
                if (_gmail.getActiveViewType() != 'cv') return;
                 var adsArea = _gmail.getConvRhsElement();
                 var msgTitle = adsArea.parentNode.previousSibling.previousSibling.getElementsByTagName('h1')[0];
                 var msgs = msgTitle.parentNode.nextSibling;
                 adsArea.parentNode.parentNode.removeChild(adsArea.parentNode);
                 msgTitle.style.cssFloat = 'left';
                 msgs.style.clear = 'both';
                 msgs.parentNode.parentNode.parentNode.parentNode.style.width = '100%';
                 Array.forEach(msgs.getElementsByTagName('textarea'), function(textAreas) {
                     textAreas.style.width = '98%';
                 });
                 function moveNewWindowAndPrintToTitle() {
                     var newWindowAndPrint = msgTitle.parentNode.appendChild(adsArea.firstChild);
                     newWindowAndPrint.style.marginRight = '8px';
                     newWindowAndPrint.style.cssFloat = 'left';
                     Array.forEach(newWindowAndPrint.getElementsByTagName('div'), function(links) {
                         links.style.cssFloat = 'left';
                         if (links.firstChild && links.firstChild.nodeName === 'DIV') return;
                         links.style.marginLeft = '4px';
                         links.style.marginRight = '4px';
                     });
                 }
             });
         });
     }
 }, true);
init();
