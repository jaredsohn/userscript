// ==UserScript==
// @name           Freeporndumpster
// @namespace      freporndumpster.com
// @description    Creates a strip of thumbnailed pictures from http://www.freeporndumpster.com/latest.php, and enables you to load them in full size. navigate the strip of pictures with keys 'n' and 'p', 'up arrow' and 'down arrow' moves the image strip, 'left arrow' and 'right arrow' loads next and previous image, 'v' key opens the current image in a new tab
// @include        http://*.freeporndumpster.com/latest.php
// @include        http://freeporndumpster.com/latest.php

// ==/UserScript==
//global variables
var globalLinks = Array();
var previewDiv = null;
var imgStrip = null;
var scrollerDiv = null;
var prevButton = null;
var nextButton = null;
var canvas = null;
var currentImage = 0;
var pagerDiv = null;
var span = null;
var currentOffset = 0;
var imgsToDisplay = 10;



window.addEventListener(
  'load',
  function() {
    document.body.setAttribute('style', 'margin:0; padding:0;');
    getLinks();
    //quitando toda la mierda
    while(document.body.childNodes.length > 0) {
      document.body.removeChild(document.body.firstChild);
    }
    setDivs();
    setPager();
    //preloadNextImages(currentOffset-imgsToDisplay);
    setImages(imgsToDisplay, currentOffset);
  },
  true
);

function setPager() {
  span = document.createElement('span');
  span.setAttribute('id', 'currPage');
  span.setAttribute('style', 'font-weight:bold; color:#f00; margin-right:2em;');
  span.innerHTML = 0;
  pagerDiv.appendChild(span);
  for ( i = 0; i < (globalLinks.length / 10) ; i++ ) {
    var a = document.createElement('a');
    a.innerHTML = i+1;
    a.setAttribute('href','#block-'+i);
    a.setAttribute('number', i);
    a.setAttribute('style', 'margin:0 5px 0 0; padding:0;');
    // a.addEventListener('click',
    //                    function() {
    //                      setImages(10, this.getAttribute('number')*10);
    //                      currentOffset = this.getAttribute('number') * 10;
    //                    },
    //                    true
    //                   );
    pagerDiv.appendChild(a);
  }
}

function getLinks() {
  var links = document.getElementsByTagName('a');
  var reg = /show.php/i;
  for ( var i = 0; i < links.length ; i++ ) {
    if ( reg.test(links[i].href) ) {
      var link    = links[i].href;
      var matches = link.match(/l=(\d+)&f=(\w+.\w+)/);
      if ( matches !== null ) {
        var obj = {
          'thumb' : 'http://www.freeporndumpster.com/'+matches[1]+'/thumbs/'+matches[2],
          'original':'http://www.freeporndumpster.com/images/'+matches[1]+'/'+matches[2]
        };
        globalLinks.push(obj);
      }
    }
  }
}

function setDivs() {
  var mHeight = window.innerHeight - 15;
  var mWidth  = window.innerWidth - 15;
  canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'canvas');
  //  canvas.setAttribute('style', 'width:'+mWidth-180+'px; height:'+mHeight+'px; border:1px solid;');
  canvas.setAttribute('width', mWidth-169);
  canvas.setAttribute('height', mHeight);

  imgStrip = document.createElement('div');
  imgStrip.setAttribute('style', 'float:left; width:169px; max-height:'+mHeight+'px; overflow-y:auto; padding:0; margin:0;');
  imgStrip.setAttribute('id', 'imgStrip');

  scrollerDiv = document.createElement('div');
  scrollerDiv.setAttribute('style', 'padding:0; margin:0; text-align:center;');
  scrollerDiv.setAttribute('id', 'scrollerDiv');

  pagerDiv = document.createElement('div');
  pagerDiv.setAttribute('style', 'width:100%; height:1.2em; text-align:center; padding:0; margin:0; border-bottom:1px solid;');

  window.addEventListener(
    'keydown',
    function(evt) {
      switch(evt.keyCode) {
        //     case 78:
        //       if ( currentOffset <  (globalLinks.length-imgsToDisplay) ) {
        //         currentOffset += imgsToDisplay;
        //         setImages(imgsToDisplay , currentOffset);
        //       }
        //       break;
        //     case 80:
        //       if ( currentOffset >= imgsToDisplay ) {
        //         currentOffset -= imgsToDisplay;
        //         setImages(imgsToDisplay , currentOffset);
        //       }
        //       break;
        //     case 38:
        //       imgStrip.scrollTop -= 100;
        //       break;
        //     case 40:
        //       imgStrip.scrollTop += 100;
        //       break;
        //     case 37:
        //       if ( currentImage > 0 ) {
        //         currentImage -= 1;
        //         setImage(currentImage);
        //       }
        //       break;
        //     case 39:
        //       if ( currentImage < (globalLinks.length - 1) ) {
        //         currentImage += 1;
        //         setImage(currentImage);
        //       }
        //       break;
      case 86:
        window.open(globalLinks[currentImage].original, globalLinks[currentImage].original);
        window.focus();
        break;
      }
    },
    true
  );
  imgStrip.appendChild(scrollerDiv);
  imgStrip.addEventListener(
    'scroll',
    function() {
      if ( this.scrollTop == (this.scrollHeight - this.clientHeight) ) {
        if ( currentOffset <  (globalLinks.length-imgsToDisplay) ) {
          currentOffset += imgsToDisplay;
          setImages(imgsToDisplay , currentOffset);
        }
      }
    },
    true
  );

  document.body.insertBefore(canvas, document.body.firstChild);
  document.body.insertBefore(imgStrip, document.body.firstChild);
  document.body.insertBefore(pagerDiv, document.body.firstChild);
}

function setImages(quantity, offset) {
  //scrollerDiv.innerHTML = null;
  var anchor = document.createElement('a');
  anchor.setAttribute('href', 'javascript:void(0);');
  anchor.setAttribute('name', 'block-'+parseInt(offset/10));
  scrollerDiv.appendChild(anchor);
  span.innerHTML = parseInt(offset/10)+1;
  for ( var i = offset; i < offset+quantity; i++ ) {
    var div = document.createElement('div');
    div.setAttribute('style','border:1px solid #32D500; margin:5px 1px; padding:0; background-color:#111;');

    var img = new Image();
    img.src = globalLinks[i].thumb;
    img.setAttribute('style','cursor:pointer; margin:0; padding:0;');
    img.setAttribute('numImage', i);
    try {
      img.addEventListener(
        'click',
        function(){
          setImage(this.getAttribute('numImage'));
        },
        true
      );
    } catch ( e ) {
      console.log(e);
    }

    div.appendChild(img);
    div.appendChild(document.createElement('div'));
    var a = document.createElement('a');
    a.innerHTML = 'view original';
    a.setAttribute('href', globalLinks[i].original);
    a.setAttribute('style', 'padding:0; font-weight:bold; font-size:xx-small;');
    a.setAttribute('target', '_blank');
    div.appendChild(a);

    div.appendChild(document.createTextNode(' | '));

    var tineye = document.createElement('a');
    tineye.innerHTML = 'search more';
    tineye.setAttribute('href', 'http://tineye.com/search/?pluginver=0.5&url='+encodeURIComponent(globalLinks[i].original));
    tineye.setAttribute('style', 'padding:0; font-weight:bold; font-size:xx-small;');
    tineye.setAttribute('target', '_blank');
    div.appendChild(tineye);
    scrollerDiv.appendChild(div);
  }
  //  preloadNextImages(currentOffset);
}

function setImage(numImage) {
  currentImage = parseInt(numImage);
  var img = new Image();
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  img.addEventListener(
    'load',
    function(){
      var cwidth = canvas.width-30;
      var cheight = canvas.height-30;
      var width = 0;
      var height = 0;
      if ( (this.width <= cwidth) && (this.height <= cheight) ){
        width = this.width;
        height = this.height;
      } else {
        if ( this.width > this.height ) {
          width = cwidth;
          height = (cwidth / (this.width - 30)) * (this.height-30);
        } else {
          height = cheight;
          width = (cheight / (this.height - 30)) * (this.width-30);
        }
      }
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(this, ((canvas.width - width) / 2) , ((canvas.height - height) / 2), width, height);
    },
    true
  );

  img.addEventListener(
    'error',
    function() {
      img.src = globalLinks[numImage].original;
    },
    true
  );

  img.addEventListener(
    'abort',
    function() {
      img.src = globalLinks[numImage].original;
    },
    true
  );
  img.src = globalLinks[numImage].original;
}

function preloadNextImages(start) {
  var next = start+imgsToDisplay;
  for ( var i = next; i < next+imgsToDisplay; i++ ) {
    var img = new Image();
    img.src = globalLinks[i].original;
    if ( i == globalLinks.length) break;
  }
}