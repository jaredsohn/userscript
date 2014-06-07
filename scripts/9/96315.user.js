// ==UserScript==
// @name           ARRL News Cleanup
// @namespace      http://www.blogspot.com
// @description    I like the new ARRL website, execept for the format of the news articles.  I would rather have the pictures floated in the text, instead of in a bar at the bottom.  This quick script does that.
// @include        http://www.arrl.org/news/*
// ==/UserScript==

  // set up css for the picture float
  var css=document.createElement('style');
  css.setAttribute('type','text/css');
  var cssText='.picture {background-color:#F9F9F9;border:1px solid #CCCCCC;padding:3px;font:11px/1.4em Arial, sans-serif;} .picture img {border:1px solid #CCCCCC;vertical-align:middle;margin-bottom:3px;} .right {margin:0.5em 0pt 0.5em 0.8em;float:right;} .left {margin:0.5em 0.8em 0.5em 0; float:left;}';
  css.appendChild(document.createTextNode(cssText));
  document.getElementsByTagName("head")[0].appendChild(css);
  var head=document.getElementsByTagName('head');
  head[0].appendChild(css);

  // Get the gallery from the bottom row
  var gallery=document.getElementById('f-gallery');
  var image_hrefs=gallery.getElementsByTagName('a');

  // Insert each picture into the text's div.
  var articlediv=document.getElementById('content').getElementsByTagName('div')[1];
  var image_number=0;

  while(image_number<image_hrefs.length){
    // Set up the picture's div float.
    var imgdiv=document.createElement('imgdiv');
    imgdiv.setAttribute('class','picture right');
    imgdiv.setAttribute('style','width:278px;');

    // Load find the image.
    var image=document.createElement('img');
    image.setAttribute('src',image_hrefs[image_number].getAttribute('href'));

    // Set up the image's dimensions
    var ratio=image.height / image.width;
    image.setAttribute('width','276');
    image.setAttribute('height',276*ratio);

    // Set up the caption
    image.setAttribute('alt',image_hrefs[image_number].getAttribute('title'));
    var caption=document.createTextNode(image_hrefs[image_number].getAttribute('title'));

    // Insert the new div
    imgdiv.appendChild(image);
    imgdiv.appendChild(document.createElement('br'));
    imgdiv.appendChild(caption);
    imgdiv.appendChild(document.createElement('br'));
    articlediv.insertBefore(imgdiv,articlediv.firstChild);
    image_number=image_number+1;
  }

  // Take out the gallery
  document.getElementById('content').removeChild(gallery);
