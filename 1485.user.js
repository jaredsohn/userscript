// ==UserScript==
// @name          Flickr All Sizes Menu
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.flickr.com/photos/*/*
// @include       http://flickr.com/photos/*/*
// @description	  Adds menu to select which size to see when hover on the All Sizes button. Screenshot: http://xrl.us/gztt
// ==/UserScript==
// Changelog:
// - 20050923:
//   - changed menu order
//   - changed 'large' to 'original'

(function() {
  var test = document.getElementById('button_bar');
  if(!test) return;

  //get image id
  var divs, imgId;
  divs = document.getElementsByTagName('div');
  for(i = 0; i < divs.length; i++) {
    if(divs[i].hasAttribute('id') && divs[i].id.match(/photoImgDiv/)) {
      imgId = divs[i].id.match(/\d+/);
    }
  }

  //set all sizes URL
  var imgURL = new Array(
    'http://www.flickr.com/photo_zoom.gne?id=' + imgId + '&size=o',
    'http://www.flickr.com/photo_zoom.gne?id=' + imgId + '&size=m',
    'http://www.flickr.com/photo_zoom.gne?id=' + imgId + '&size=s',
    'http://www.flickr.com/photo_zoom.gne?id=' + imgId + '&size=t',
    'http://www.flickr.com/photo_zoom.gne?id=' + imgId + '&size=sq'
  )

  //make span
  var imgSizes, newSpan;
  imgSizes = document.getElementById('photo_gne_button_zoom');
  newSpan = document.createElement('span');
  imgSizes.parentNode.insertBefore(newSpan, imgSizes);
  newSpan.appendChild(imgSizes);

  //insert menu
  var sizeMenu = document.createElement('div');
      sizeMenu.setAttribute('id', 'allSizes');
      sizeMenu.innerHTML = (
        '<ul>' +
        '<li><a href="' + imgURL[0] + '">Original</a></li>' +
        '<li><a href="' + imgURL[1] + '">Medium</a></li>' +
        '<li><a href="' + imgURL[2] + '">Small</a></li>' +
        '<li><a href="' + imgURL[3] + '">Thumbnail</a></li>' +
        '<li><a href="' + imgURL[4] + '">Square</a></li>' +
        '</ul>'
      );
  newSpan.appendChild(sizeMenu);

  //add stylesheet for the menu
  var head, style;
  head = document.getElementsByTagName('head')[0];
  style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = (
    '#allSizes {' +
    '  display: none;' +
    '  background-color: #ffdeef;' +
    '  border: 2px solid #ff0185;' +
    '  -moz-border-radius: 1em;' +
    '  position: absolute;' +
    '  margin-left: -49px;' +
    '  margin-top: 24px;' +
    '  padding-left: 0;' +
    '}' +
    
    '#button_bar > span:hover > #allSizes {' +
    '  display: inline;' +
    '}' +
    
    '#allSizes ul {' +
    '  list-style: none;' +
    '  padding: 0 1em;' +
    '}' +
    
    '#allSizes a {' +
    '  display: block;' +
    '}'
  );
  head.appendChild(style);

})();

