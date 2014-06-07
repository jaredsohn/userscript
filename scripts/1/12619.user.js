// ==UserScript==
// @name           Resize images icon
// @namespace      http://www.danvsdan.com/
// @description    Arbitrarily resize any image with a dragging icon.
// @include        *
// @exclude        http://maps.google.tld/*
// @exclude        http://www.google.tld/maps
// ==/UserScript==

/*
 XXX: Grabber can be slightly misplaced after resizing (FF bug?)
 XXX: Stop resizing on document.mouseout to avoid resizing stickiness.
 XXX: Fix bug where the resizer sticks on mouseout (due to fading probably).
 TODO: Tidy up the code in general.
 TODO: More comments.
 TODO: Separate out resizer code from resizing code.
 */

// Adapted from Prototype's bindAsEventListener
Function.prototype.asListener = function() {
  var args = [];
  for(var i = 0; i < arguments.length; i++)
    args.push(arguments[i]);

  var __method = this, obj = args.shift();
  return function(evt) {
    return __method.apply(obj, [evt].concat(args));
  }
}

// Adapted from http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
  var style = obj.ownerDocument.defaultView.getComputedStyle(obj, null);
  var leftXtra  = parseInt(style.borderLeftWidth) + parseInt(style.paddingLeft),
       topXtra  = parseInt(style.borderTopWidth)  + parseInt(style.paddingTop);

  var curleft = curtop = 0;
  if (obj.offsetParent) {
    curleft = obj.offsetLeft
    curtop = obj.offsetTop
    while (obj = obj.offsetParent) {
      curleft += obj.offsetLeft
      curtop += obj.offsetTop
    }
  }

  return {x: curleft + leftXtra, y: curtop + topXtra};
}

function fade(elem, fade, fadeComplete) {
  var curOpacity = Number( elem.style.opacity );
  if(fade == 'in')
    elem.style.opacity = 0;

  var opVal   = ( fade == 'in' ? 0.1 : curOpacity ),
      fadeIn  =   fade == 'in';

  var fadeVal = fadeIn ? 0.05 : -0.05;

  var figId = setInterval(function() {
    // For some reason style.opacity += 0.1 doesn't work.
    opVal += fadeVal;
    if(fadeIn ? opVal < 1.0 : opVal > 0.0)
      elem.style.opacity = opVal;
    else {
      clearInterval(figId);
      if(fadeComplete)
        fadeComplete();
    }
  }, 25);
}

const RESIZER_WIDTH  = 14;
const RESIZER_HEIGHT = 14;
const ICON_WIDTH     = 12;
const ICON_HEIGHT    = 12;

function ImageResizer(img) {
  this.img = img;
  this.addResizer();
}

ImageResizer.prototype = {
  img:       null,    // <img> object
  resizer:   null,    // <div> around the resize icon
  resizeImg: null,    // Resize icon <img>

  origWidth  : 0,     // img.width when page loaded
  origHeight : 0,     // img.width when page loaded
  curWidth   : 0,     // Current img.width
  curHeight  : 0,     // Current img.height

  normalizing: false, // Is the image return to original dimensions?
  resized:     false, // Has the image been resized?
  overImage:   false, // Is the mouse over the image?

  normalizeId: 0,     // setInterval id of animateNormalize thread

  cursorStartX: 0,    // Horizontal position on cursor on at drag start
  cursorStartY: 0,    // Vertical position on cursor on at drag start

  resizeEvent: null,  // The resize event handler with correct context
  stopEvent:   null,  // The resize event handler with correct context

  addResizer: function() {
    var img = this.img;

    this.origWidth  = this.curWidth  = img.width;
    this.origHeight = this.curHeight = img.height;
    
    img.addEventListener('mouseover',
      this.imgMouseoverEvent.asListener(this), true);

    img.addEventListener('mouseout',
      this.imgMouseoutEvent.asListener(this), true);
  },

  imgMouseoverEvent: function(e) {
    if(this.normalizing)
      return;

    // Immediately add the grabber if we've already resized.
    if(this.resized && !this.resizer) {
      this.addGrabber();
      return;
    }

    if(!this.resizer) {
      var self = this;
      this.overImage = true;
      // Only display resize icon if mouse stays on the image for more than
      // half a second, it's tedious having it pop up everywhere otherwise.
      setTimeout(function() {
        if(self.overImage)
          self.addGrabber();
      }, 500);
    }
  },

  imgMouseoutEvent: function(e) {
    var img = this.img;
    delete img['GM_grabber'];
    this.overImage = false;

    var pos = findPos(img);
    var ix = pos.x, iy = pos.y; 
    var iw = ix + img.clientWidth, ih = iy + img.clientHeight;
    var ex = e.clientX + window.scrollX,
        ey = e.clientY + window.scrollY;

    // Avoid removing the grabber when mousing over it as that
    // triggers this mouseout event for the image.
    if(ex <= ix || ex >= iw || ey <= iy || ey >= ih)
      this.removeGrabber();
  },

  addGrabber: function() {
    var img = this.img;

    if(img.GM_grabber)
      return;

    var gdiv = document.createElement('div');
    var gpos = this.grabberPos();
    gdiv.id         = 'gm-resize-div';
    gdiv.style.left = gpos.x + 'px';
    gdiv.style.top  = gpos.y + 'px';
    gdiv.title      = this.resizerTitle();

    var grabber = this.createGrabber();
    gdiv.appendChild(grabber);
    // The grabber needs to be appended to the body of the document otherwise
    // it's positioning can go screwey (for reasons I have yet to discern).
    // A FF bug perhaps?
    document.body.appendChild(gdiv);

    this.resizer   = gdiv;
    this.resizeImg = grabber;

    img.GM_grabber = true;

    fade(this.resizeImg, 'in');
  },

  removeGrabber: function(forceRemove) {
    if(!forceRemove)
      if(!this.resizer || this.resizing )
        return;

    var self = this;
    var fini = function() {
      // Not sure why sometimes the resizer isn't here.
      if(!self.resizer)
        return;
      self.resizer.parentNode.removeChild(self.resizer);
      self.resizer = false;
    };

    if(this.normalizing)
      fini();
    else
      fade(this.resizeImg, 'out', fini);
  },

  createGrabber: function() {
    var grabber = document.createElement('img');

    grabber.id = 'gm-resize-icon';
    // Nabbed from TorgoX's TextareaDragResizer.
    grabber.src     = 'resource://gre/res/grabber.gif';
    grabber.height  = ICON_HEIGHT;
    grabber.width   = ICON_WIDTH;
    grabber.alt     = 'Resize Image';

    grabber.addEventListener('mousedown',
      this.grabberMousedownEvent.asListener(this), true);
    grabber.addEventListener('mouseout',
      this.grabberMouseoutEvent.asListener(this), true);
    grabber.addEventListener('mouseover',
      this.grabberMouseoverEvent.asListener(this), true);
    grabber.addEventListener('dblclick',
      this.grabberDblclickEvent.asListener(this), true);

    return grabber;
  },

  grabberMousedownEvent: function(e) {
    this.startResize( e );
    e.preventDefault();
    return false;
  },

  grabberMouseoutEvent: function(e) {
    var gpos = this.grabberPos();
    var ol = gpos.x + ICON_WIDTH;
        ot = gpos.y + ICON_HEIGHT,
        ex = e.clientX + window.scrollX,
        ey = e.clientY + window.scrollY;

    // Only remove the grabber if moving out of the image.
    if(ex >= ol || ey >= ot)
      this.removeGrabber();
  },

  grabberMouseoverEvent: function(e) {
  },

  grabberDblclickEvent: function(e) {
    var img = this.img;

    this.normalizing = true;

    // width/height boolean deciding whether to shrink or grow.
    var wDec = img.width  > this.origWidth,
        hDec = img.height > this.origHeight;

    this.removeGrabber(true);

    var rsStep = wDec ? 30 : 15;
    this.normalizeId = setInterval(
      this.animateNormalize.asListener(this, e, wDec, hDec, rsStep), 1
    );
  },

  animateNormalize: function(evt, origEvt, wDec, hDec, rsStep) {
    var img = this.img;

    var wDecAmt = Math.abs(img.width  - this.origWidth)  >= rsStep ? rsStep : false,
        hDecAmt = Math.abs(img.height - this.origHeight) >= rsStep ? rsStep : false;

    if(wDecAmt || hDecAmt) {
      var newW = wDec ? img.width  - rsStep : img.width  + rsStep,
          newH = hDec ? img.height - rsStep : img.height + rsStep;

      if(wDecAmt) img.width  = newW;
      if(hDecAmt) img.height = newH;
    } else {
      // It'd be nice to have a toggle between the last resize also.
      this.curWidth  = img.width  = this.origWidth;
      this.curHeight = img.height = this.origHeight;

      this.normalizing = false;

      clearInterval(this.normalizeId);
    }
  },

  startResize: function(evt) {
    var img = this.img;

    this.cursorStartX = evt.clientX;
    this.cursorStartY = evt.clientY;

    this.resizeEvent = this.resizeImage.asListener(this);
    this.stopEvent   = this.stopResize.asListener(this);

    document.addEventListener('mousemove', this.resizeEvent, true);
    document.addEventListener('mouseup',   this.stopEvent,   true);

    img.style.opacity = 0.5;

    this.resizing = true;

    return;
  },

  resizeImage: function(e) {
    this.doResize(e);
    e.preventDefault();
    return;
  },

  doResize: function(e) {
    var img = this.img;

    var newWidth  = e.clientX - this.cursorStartX + this.curWidth,
        newHeight = e.clientY - this.cursorStartY + this.curHeight;

    img.setAttribute('width',  newWidth);
    img.setAttribute('height', newHeight);

    var gdiv = this.resizer;
    var gpos = this.grabberPos();
    gdiv.style.left = gpos.x + 'px';
    gdiv.style.top  = gpos.y + 'px';
  },

  stopResize: function(e) {
    var img = this.img;

    document.removeEventListener('mousemove', this.resizeEvent, true);
    document.removeEventListener('mouseup',   this.stopEvent,   true);

    this.doResize(e);

    this.curHeight = img.height;
    this.curWidth  = img.width;

    this.resizing  = false;
    this.resized   = true;

    this.resizer.title = this.resizerTitle();

    img.style.opacity            = 1;
    this.resizeImg.style.opacity = 1;

    var gpos = this.grabberPos();
    var ol = gpos.x + ICON_WIDTH;
    var ot = gpos.y + ICON_HEIGHT;
    if(e.clientX > ol || e.clientY > ot)
      this.removeGrabber();

    e.preventDefault();
    return false;
  },

  resizerTitle: function() {
    return 'Click and drag to resize, double-click to revert' +
           ' [' + this.curWidth + 'w ' + this.curHeight + 'h]';
  },

  grabberPos: function() {
    var img = this.img;
    var pos = findPos(img);
    // Attempt to find the appropriate position to place the cursor.
    // This isn't always 100% correct.
    return {
      x: pos.x + img.clientWidth  - RESIZER_WIDTH,
      y: pos.y + img.clientHeight - RESIZER_HEIGHT
    };
  }
};

// Perhaps this should run at an Interval to catch new images like pictures
// dynamically loaded in a picture gallery. If only DOM mutation events were
// already implemented ...
function windowLoadEvent(e) {
  // Here's where a style-based DSL require would come in handy ...
  GM_addStyle('#gm-resize-icon {' +
    'border      : none;\n' +
    'opacity     : 0.5;\n' +
    'padding     : 0px 0px 0px 0px;\n' +
    'margin      : 0px 0px 0px 0px;\n' +
  "}\n#gm-resize-div {" +
    "position    : absolute; " +
    "border      : solid 1px black; " +
    // When getComputedStyle() is finally finished one will no longer need
    // these nasty hacks :(
    'z-index     : 9999;\n' +
    'padding     : 0px;\n' +
    'margin      : 0px;\n' +
    // Apparently these effect the size of the div :/
    'font-size   : 0px;\n' +
    'line-height : 0px;\n' +
  '}');

  // Need unsafeWindow here otherwise FF has "security" issues.
  var imgs = unsafeWindow.document.getElementsByTagName('IMG');
  for(var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    // Skip small images, NB - Make this configurable?
    if(img.width < 50 || img.height < 50)
      continue;

    new ImageResizer(img);
  }
}

// Only load when all images have finished loading to get the correct widths
// and heights and so forth.
window.addEventListener('load', windowLoadEvent, true);

/*
Copyright (c) 2007, Dan Brook. All Rights Reserved. This userscript is free software. It may be used, redistributed and/or modified under the same terms as Perl.
*/