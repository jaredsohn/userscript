// ==UserScript==
// @namespace     http://nimai.smugmug.com/greasemonkey/nocrop
// @name          SmugMug Pro Pricing No-Crop
// @description   Adds a "No Crop" button to the pro pricing page for images in SmugMug which will set the price to zero (hide from sale) all print sizes that would require cropping
// @include       http://*.smugmug.com/photos/tools.mg*tool=proprices
// ==/UserScript==

function getElementsByClass(searchClass,node,tag,text) {
  var classElements = new Array();
  if (node == null) node = document;
  if (tag == null) tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  var textPattern = null;
  if (text) textPattern = new RegExp(text);
  for (i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className) ) {
      if (textPattern==null || textPattern.test(els[i].textContent) ) {
        classElements[j] = els[i];
        j++;
      }
    }
  }
  return classElements;
}

function calcAspect( width, height ) {
  return (width>height)?(width/height):(height/width);
}

function makeNoCrop() {
  var image = getElementsByClass('imgBorder')[0];
  var imageAspect = calcAspect( image.width, image.height );
  var getDimensions = new RegExp('([0-9\.]+) [xX] ([0-9\.]+)');
  var isWallet = new RegExp('4 Wallets.*');
  var tds = document.getElementsByTagName('td');
  var itemDim, itemAspect;
  for( var i=0; i<tds.length; ++i ) {
    var item = tds[i].textContent;
    if( isWallet.test(item) )
      itemAspect = 3.5/2.5;
    else {
      itemDim = getDimensions.exec( item );
      itemAspect = itemDim ? calcAspect(itemDim[1],itemDim[2]) : null;
    }
    if( itemAspect ) {
      if( Math.abs(itemAspect-imageAspect) > 0.05 ) {
        var priceBox = tds[i].parentNode.getElementsByTagName('input')[0];
        priceBox.value = '0';
      }
    }
  }
}

if( getElementsByClass('title',null,null,'image') ) {
  var toolsbox = getElementsByClass('toolsbox')[0];
  var newRow = toolsbox.insertRow(1);
  newRow.insertCell(0);
  var newCell = newRow.insertCell(1);
  newCell.setAttribute('align','left');
  newRow.insertCell(2);
  var noCropBut = document.createElement('input');
  noCropBut.setAttribute('type','button');
  noCropBut.setAttribute('class','smbuttons');
  noCropBut.addEventListener('click', makeNoCrop, true);
  noCropBut.value = 'No Crop';
  newCell.appendChild( noCropBut );
}
