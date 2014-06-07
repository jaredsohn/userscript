// ==UserScript==
// @name           Facebook Wall Writers
// @namespace      http://www.facebook.com/home.php
// @description    Changes the picture alongside wall posts in news feeds to be the person writing, not the person whose wall it is.
// @include        http://www.facebook.com/home.php*
// ==/UserScript==

function getPage(url){
  var xmlHttp = new XMLHttpRequest();
  if (xmlHttp==null) { throw new Error('Could not create XMLHttpRequest'); return; }
  xmlHttp.open("GET",url,false);
  xmlHttp.send(null);
  if (xmlHttp.status==200) return xmlHttp.responseText;
  return null;  
}

function getWallPosts(){
  var divs = document.getElementsByTagName('div');
  var array = new Array();
  var pattern = /(?:^|\s)wall_post(?:\s|$)/;
  for each (div in divs)
    if (pattern.test(div.className)) array.push(div);
  return array;
}

function smallImage(src){
  return src.replace(/(\/profile[0-9]*\/[0-9]+\/[0-9]+\/)[a-z]/,'$1t');
}

function getProfileImage(uid){
  var src = 'http://www.google.co.uk/intl/en_uk/images/logo.gif';
  var html = getPage('http://www.facebook.com/profile.php?id='+uid);
  div = /<div [^>]*id="profileimage"[^>]*>(.+?)<\/div>/.exec(html);
  if (!div) div = /<div [^>]*class="image"[^>]*>(.+?)<\/div>/.exec(html);
  if (!div) {
    throw new Error('Unable to retrieve profile image');
    return null;
  }
  match = /img src="([^"]+)"/.exec(div[1]);
  if (!match) { throw new Error('image not found'); return null; }  
  src = smallImage(match[1]);
  GM_setValue('profile_image'+uid,src);
  return src;
}

function replaceImages(){
  var posts = getWallPosts();
  var images = new Array();
  var fshPattern = /(?:^|\s)feed_story_header(?:\s|$)/;
  var fprPattern = /(?:^|\\s)feed_picture_right(?:\\s|$)/;
  var uidPattern = /^http:\/\/[a-z]+.facebook.com\/profile.php\?id=([0-9]+)/i;
  for each (post in posts){
    var h2s = post.getElementsByTagName('h2');
    
    var name = '';
    var href = '';
    var uid = -1;
    // Get posts's name from header
    for each (h2 in h2s) 
      if (fshPattern.test(h2.className)) {
        var anchors = h2.getElementsByTagName('a');
        var fullname = anchors[0].childNodes[0].nodeValue;
        var names = fullname.split(' ');
        name = names[0];
        href = anchors[0].href;
        if (match = uidPattern.exec(href)) uid = match[1];
        break;
      }
    if (name=='') continue;  
    // Find images and cache available thumbnails
    var subdivs = post.getElementsByTagName('div');
    for each (subdiv in subdivs) 
      if (fprPattern.test(subdiv.className)) {      
        var anchors = subdiv.getElementsByTagName('a');
        var imga = anchors[0];
        var image = imga.childNodes[0];
        if (match = uidPattern.exec(imga.href)) GM_setValue('profile_image'+match[1],image.src);  
        
        imga.href = href;        
        image.uid = uid;
        images.push(image);
        
        var texta = anchors[1];        
        texta.removeChild(texta.childNodes[0]);
        texta.appendChild(document.createTextNode(name));
        texta.href = href;
        break;
      }            
  }
  // actually replace the images
  for each (image in images){
    var thumb = GM_getValue('profile_image'+image.uid);
    if (!thumb) thumb = getProfileImage(image.uid); 
    image.src = thumb;
  }
}

function cacheProfileImage(){
  match = /id=([0-9]+)/.exec(here);
  if (match){
    var uid = match[1];
    var div = document.getElementById('profileimage');
    var imgs = div.getElementsByTagName('img');
    GM_setValue('profile_image'+uid,smallImage(imgs[0].src));
  }
}

var here = window.location.href;
if (here.indexOf('profile.php')!=-1)
  cacheProfileImage();
else if (here.indexOf('home.php')!=-1)
  replaceImages();