// ==UserScript==
// @name          Amazon Book Reader
// @version		1.0
// @description   opens the selected book image in a new tab
// @include       http://www.amazon.*/gp/reader*
// ==/UserScript==

/*
  DESCRIPTION
  In Firefox & IE the Amazon book reader disables the right-click context menu
    This is what prevents you from saving a cover (and other) image/s.
  This script sidesteps Amazons image blocking
  International site:
    Amazon pre-loads 3 images into the reader document
    all other images - are loaded into the document on demand.

    If the image is not already in the document tree, Amazon makes a server request and inserts it into the document
    An image request may result in a batch of images being sent by the server, so we need
      to monitor for any node insertions and create a menu link for the newly inserted book image(s)

    Amazon uses transparent gif's as image address placeholders.
    After the image(s) are inserted, the image source address is changed to the REAL url
    So watch for this event happening rather than just a node being inserted.

    An added wrinkle is that as more images are viewed, amazon will do some src address swapping.
      An image with an existing valid src address may be exchanged for a placeholder gif, and if it's
      requested again, swapped back in, so we have to trap for this to reject image menu duplications.


  country specific sites: i.e. [.ca .uk] etc.
    Insert an "Open Image" button
    country specific sites only load one image at a time into the reader document
    so only require a single button linked to the current image
*/

/** changelog
2007-01-08
  Fix:
    added an extra img-src location test "sitb-images.amazon." to the existing img-src "lookinside" test. Amazon must have changed their source tree for images?
2007-10-23
  New:
    Think it is now worthy of a version 1.0 release.
    as it's now cross-browser - Firefox, Opera, IE7
    Note: Because of the method I used to get IE to perform similarly to FF & Opera
        it (IE) can be slightly buggy in it's reporting of (and menu display of) new images.
        Tried all sorts of event captures - only one I could get to respond was
          "on propertychange". Some ActiveX stuff going on here that I don't yet understand.
2007-10-18
  New:
    added links for all possible image menu items
      you can now view/save any book image from the reader
    made the international links less obtrusive - more visually appealing(??)
2007-10-15
  New:
    added country sites: UK, Canada, France, Germany
    initial release
2007-10-14
  first version - international site
*/

var isIE = (document.attachEvent && !window.opera) ? true : false;
var isOpera = (window.opera) ? true : false;

var debug = false;
function LOG(msg) {if(isIE){PRO_log('IE7PRO:'+msg)}else if(!isOpera){GM_log('GM:'+msg)}else{alert(msg)}}

/**
* main function
*/
function reader_init(e) {

  if (debug) LOG('load event');
  // load some styles for our buttons
  reader_injectCSS();
  
  // check which site to create button(s) for
  if (window.location.host.match(/(\.com)$/)) {
    // the parent node for the international sites book images
    var imageTree = document.getElementById('viewer');
    // watch for changes to child nodes OR attributes
    if (!isIE) { // FF or Opera
      try {
        if (debug) LOG('adding "DOMAttrModified" listener');
        imageTree.addEventListener("DOMAttrModified", reader_attrChanged, true);
      } 
      catch(e) {
        alert("For some reason 'addEventListener' failed, try reloading the document.");
        return;
      }
    }
    else {
      try {
        if (debug) LOG('adding "onpropertychange" listener');
        imageTree.attachEvent("onpropertychange", reader_attrChanged);
      } 
      catch(e) {
        alert("For some reason the IE 'attach event' failed, try reloading the document.");
        return;
      }
    }
  }
  else {
    // create link
    var link = document.createElement('a');
    link.innerHTML = 'Open Image';
    link.className = 'image_button';
    link.href = document.getElementById('magicImg').src;

    // find the insertion point
    var mn = []; // menu nodes
    var n = document.getElementsByTagName('div');
    for (var i = 0, j = 0; i < n.length ; i++) {
      if (n[i].className == 'tiny') {
        if (n[i].getElementsByTagName('div').length == 0) {
          mn[j] = n[i];
          j++;
        }
      }
    }
    mn[mn.length - 1].appendChild(link);
    mn[mn.length - 2].appendChild(link.cloneNode(true));
  }
}


/**
* watch for any changes in node attributes
*	- only interested in the IMAGE src attribute, specifically a modification of the src address
* once we get it, remove the event listener and send the images parent container to the menu builder
*/
function reader_attrChanged(e) {

  if (isIE)
    var target = window.event ? window.event.srcElement : null;
  else
    var target = e ? e.target : null;
  
  if (!target)
    return;

  if (isIE) {
    var evt = window.event;
    if (debug) LOG('event:'+ evt.propertyName);
    if (evt.propertyName && (/height|width/i.test(evt.propertyName))) {
      var divn = target.getElementsByTagName('div');
      for (i = 0; i < divn.length; i++) {
        if (divn[i].id) {
          if (debug) LOG('img src:'+divn[i].firstChild.src);
          // reject any image to placeholder swapping
          if (/lookinside/.test(divn[i].firstChild.src) || /sitb-images.amazon./.test(target.src)) {
            if (debug) LOG('sending '+divn[i].nodeName+' '+divn[i].id+' to menu.');
            reader_buildMenuLink(divn[i]);
          }
        }
      }
    }
  }
  else {
    if (debug) LOG('event:'+ e.type);
    if (target.nodeName == 'IMG' && e.attrName == 'src' && e.attrChange == 1) {
      if (debug) LOG('img src:'+ target.src);
      // reject any image to placeholder swapping
      if (/lookinside/.test(target.src) || /sitb-images.amazon./.test(target.src)) {
        if (debug) LOG('sending '+target.nodeName+' '+target.parentNode.id+' to menu.');
        reader_buildMenuLink(target.parentNode);
      }
    }
  }
}


/**
* Creates the menu for the international site
*
* Receives the DIV container of an image
* Pick out the containers ID and traverse Amazons menu looking for a match
* Create a seperator image and hyperlink to the image
*/
function	reader_buildMenuLink(divNode) {

  // image id - only interested in the xxxx from "Page xxxx"
  var imageID = divNode.id.replace(/.*\s/, '');
  // list of amazon menu nodes
  var mlinks = document.getElementById('tabbedContentTOC').getElementsByTagName('a');
  // step thru amazons list and look for our image ID
  for (var i = 0; i < mlinks.length; i++) {
    if (mlinks[i].getAttribute('onclick')	
    && mlinks[i].getAttributeNode('onclick').nodeValue.indexOf(imageID) > -1) {
      // found it - have we handled this menu item previously?
      if (mlinks[i].parentNode.getElementsByTagName('img').length > 0) {
        // this item already exists, reject it - some image swapping must be going on
        if (debug) LOG('rejected:'+divNode.id);
        return;
      }
      // start building a link to the book image
      if (debug) LOG('building:'+divNode.id);
      // adjust style of surrounding elements so they 'play nice' with our gif's
      mlinks[i].parentNode.parentNode.style.lineHeight = '20px';
//			mlinks[i].style.verticalAlign = 'top';
      mlinks[i].style.marginRight = '10px';
      // insert a seperator
      var gif = document.createElement('img');
      gif.className  = 'gif_arrow';
      // an embedded image source
      gif.src = 'data:image/gif;base64,R0lGODlhCgAKAKIAADMzM93d3bCwsGZmZv%2FM%2F%2F%2F%2F%2FwAAAAAAACH5BAEHAAQALAAAAAAKAAoAAAMfSLrcM22NAtW7gZIRus%2BPIIqdAAEoGghANLARgcZRAgA7';
      // insert into doc
      mlinks[i].parentNode.appendChild(gif);
      // create a link
      var link = document.createElement('a');
      link.title = 'Open "' + mlinks[i].parentNode.title + '", imageID:'+divNode.id;
      link.className = 'gif_button';
      link.href = divNode.firstChild.src;
      // create a clickable file icon for the link
      gif = document.createElement('img');
      gif.align = 'top';
      // an embedded image source
      gif.src = 'data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAHnA24CAgHZsaf%2F%2F%2F2RFQZmZmbHm%2BU00M2l%2BpZqkwau71jIoHLCnp%2BDg4GZmZo2BkmWkxJay5HR3hkxMTLrY%2FbfEx4CyyGxTWSgZC1mTtaKDhYKKmJHT6s2ytT00PFxofc7h%2FmtaZ0ZFR3GJjI%2BKhVxJQp2%2BxXuKq4S21sjs%2F3WqvGxeXg0JAkw9REAoI3FiZJuEkZjW9KKapq%2B73GFJSHp5hqWhuHpsclZOUKOJjF1TTri933zI34q1xICLmmtaa8%2Fs%2F2pmXv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAEMALAAAAAAQABAAAAeMgEOCg4SFhAaIiYiGQwIOj5AOBAaGjpGPBJOFjgoKNAs0PJmagwIECRI2MyEViQ%2BEpig3GQNBMhEaDgKwBBAbDCQqHQEpBLulBBgmQicHPRccxrwuIw0WPis%2FNdLIIjEeJQ82MC%2FcgqYfLDo7OTgFCOaNBAAtLBQgEzUY8aaj%2FpnHBj0YSLAgo4OEAgEAOw%3D%3D';
      // insert into doc
      link.appendChild(gif);
      mlinks[i].parentNode.appendChild(link);
      if (debug) LOG(divNode.id + ' link done.');
      // done with this item, return & wait for next event
      return;
    }
  }
}


/**
* styles to make the buttons look beautiful??
*/
function reader_injectCSS() {

  if (debug) LOG('injecting CSS');
  var cssNode = document.createElement('style');
  cssNode.type = 'text/css';
  cssNode.rel = 'stylesheet';
  cssNode.media = 'screen';
  cssNode.title = 'dynamicSheet';
  document.getElementsByTagName("head")[0].appendChild(cssNode);
  var sheet = document.styleSheets[document.styleSheets.length-1]

  if (window.location.host.match(/(\.com)$/)) {
      // intl style links
    var gif_arrow = 'margin-right: 10px;';
    var gif_button = 'padding: 1px 5px; cursor: pointer;';
    var gif_button_image = 'padding-top: 2px; border-style: none;';
    var gif_buttonHover = 'border: 1px dotted red; padding: 0px 4px;';
    var gif_buttonFocus = 'border-style: none;';
    var gif_buttonActive = 'border: 1px dotted black; padding: 0px 4px;';

    if (sheet.insertRule) {	// isIE == false
      sheet.insertRule('.gif_arrow {' + gif_arrow + '}',sheet.cssRules.length);
      sheet.insertRule('.gif_button {' + gif_button + '}',sheet.cssRules.length);
      sheet.insertRule('.gif_button img {' + gif_button_image + '}',sheet.cssRules.length);
      sheet.insertRule('.gif_button:hover {' + gif_buttonHover + '}',sheet.cssRules.length);
      sheet.insertRule('.gif_button:focus {' + gif_buttonFocus + '}',sheet.cssRules.length);
      sheet.insertRule('.gif_button:active {' + gif_buttonActive + '}',sheet.cssRules.length);
    }
    else {
      sheet.addRule('.gif_arrow', gif_arrow );
      sheet.addRule('.gif_button', gif_button );
      sheet.addRule('.gif_button img', gif_button_image + 'padding: 0;');
      sheet.addRule('.gif_button:hover', gif_buttonHover );
      sheet.addRule('.gif_button:focus', gif_buttonFocus );
      sheet.addRule('.gif_button:active', gif_buttonActive );
    }
  }
  else {
    // country specific style buttons
    var image_button = 'text-decoration: none; width: 8em; display: block; border: 2px outset black; background-color: #006400; margin: 1em 0; padding: 2px 5px; font-size: 12px; font-weight: bold; cursor: pointer;';
    var image_buttonLink = 'color: #FFCC99;';
    var image_buttonVisited = image_buttonLink;
    var image_buttonHover = 'text-decoration: underline; color: #FFCC99; background-color: maroon;';
    var image_buttonActive = 'border: 2px inset black;';
      
    if (sheet.insertRule) {	// isIE == false
      sheet.insertRule('.image_button {' + image_button + '}', sheet.cssRules.length);
      sheet.insertRule('a.image_button:link {' + image_buttonLink + '}', sheet.cssRules.length);
      sheet.insertRule('a.image_button:visited {' + image_buttonVisited + '}', sheet.cssRules.length);
      sheet.insertRule('a.image_button:hover {' + image_buttonHover + '}', sheet.cssRules.length);
      sheet.insertRule('a.image_button:active {' + image_buttonActive + '}', sheet.cssRules.length);
    }
    else {
      sheet.addRule('.image_button', image_button );
      sheet.addRule('a.image_button:link', image_buttonLink );
      sheet.addRule('a.image_button:visited', image_buttonVisited );
      sheet.addRule('a.image_button:hover', image_buttonHover );
      sheet.addRule('a.image_button:active', image_buttonActive );
    }
  }
  if (debug) LOG('CSS injected');
}


if (debug) LOG('Amazon Reader started');
reader_init();
